import { createClient } from "jsr:@supabase/supabase-js@2.106.2";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";
import {
  buildAlertHtml, buildAlertSubject, buildAlertText,
  buildReplyHtml, buildReplySubject, buildReplyText,
  type Submission,
} from "./email-template.ts";

interface WebhookPayload {
  type: "INSERT" | "UPDATE" | "DELETE";
  table: string;
  schema: string;
  record: Submission | null;
}

const env = (key: string): string | undefined => Deno.env.get(key);
const json = (body: unknown, status = 200): Response =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
const safeHeader = (value: string) => value.replace(/[\r\n\u0000-\u001f\u007f]/g, " ").trim().slice(0, 120);

Deno.serve(async (req: Request): Promise<Response> => {
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const expectedSecret = env("NOTIFY_WEBHOOK_SECRET");
  if (!expectedSecret) return json({ error: "Webhook secret not configured" }, 503);
  if (req.headers.get("x-webhook-secret") !== expectedSecret) return json({ error: "Unauthorized" }, 401);

  const raw = await req.text();
  if (new TextEncoder().encode(raw).byteLength > 64_000) return json({ error: "Payload too large" }, 413);

  let payload: WebhookPayload;
  try { payload = JSON.parse(raw) as WebhookPayload; }
  catch { return json({ error: "Invalid JSON" }, 400); }

  if (payload?.type !== "INSERT" || payload?.table !== "contact_submissions" || payload?.schema !== "public" || !payload.record) {
    return json({ skipped: true });
  }

  const submission = payload.record;
  if (!submission.id || !submission.email || !submission.name || !submission.message) {
    return json({ error: "Invalid submission record" }, 400);
  }

  const host = env("SMTP_HOST");
  const user = env("SMTP_USER");
  const pass = env("SMTP_PASS");
  const port = Number(env("SMTP_PORT") ?? "465");
  const recipient = env("CONTACT_RECIPIENT_EMAIL") ?? user;
  if (!host || !user || !pass || !recipient || !Number.isInteger(port) || port < 1 || port > 65535) {
    await recordResult(submission.id, false, "SMTP is not configured", false, "SMTP is not configured");
    return json({ ok: false, reason: "smtp-not-configured" }, 503);
  }

  const ownerName = safeHeader(env("OWNER_NAME") ?? "VELNARO") || "VELNARO";
  const siteUrl = env("SITE_URL");
  let acknowledgementSent = false;
  let acknowledgementError: string | null = null;
  let ownerSent = false;
  let ownerError: string | null = null;
  let client: SMTPClient | undefined;

  try {
    client = new SMTPClient({
      connection: { hostname: host, port, tls: port === 465, auth: { username: user, password: pass } },
    });

    try {
      await client.send({
        from: `${ownerName} <${user}>`,
        to: submission.email,
        replyTo: recipient,
        subject: buildReplySubject(ownerName),
        content: buildReplyText(submission, ownerName),
        html: buildReplyHtml(submission, ownerName, siteUrl),
      });
      acknowledgementSent = true;
    } catch (error) {
      acknowledgementError = (error instanceof Error ? error.message : String(error)).slice(0, 300);
      console.error("Acknowledgement email failed:", acknowledgementError);
    }

    try {
      await client.send({
        from: `VELNARO <${user}>`,
        to: recipient,
        replyTo: `${safeHeader(submission.name)} <${submission.email}>`,
        subject: buildAlertSubject(submission),
        content: buildAlertText(submission),
        html: buildAlertHtml(submission, env("ADMIN_INBOX_URL")),
      });
      ownerSent = true;
    } catch (error) {
      ownerError = (error instanceof Error ? error.message : String(error)).slice(0, 300);
      console.error("Owner notification failed:", ownerError);
    }

    await recordResult(submission.id, ownerSent, ownerError, acknowledgementSent, acknowledgementError);
    return json({ ok: ownerSent, acknowledgement: acknowledgementSent ? "sent" : "failed" }, ownerSent ? 200 : 502);
  } catch (error) {
    ownerError = (error instanceof Error ? error.message : String(error)).slice(0, 300);
    await recordResult(submission.id, ownerSent, ownerError, acknowledgementSent, acknowledgementError);
    return json({ ok: false, error: "Email delivery failed" }, 502);
  } finally {
    await client?.close().catch(() => {});
  }
});

async function recordResult(
  id: string,
  ownerSent: boolean,
  ownerError: string | null,
  acknowledgementSent: boolean,
  acknowledgementError: string | null,
): Promise<void> {
  const url = env("SUPABASE_URL");
  const serviceKey = env("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !serviceKey) {
    console.error("Cannot persist email delivery state: service credentials are missing.");
    return;
  }
  try {
    const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });
    const { error } = await supabase.from("contact_submissions").update({
      email_sent: ownerSent,
      email_error: ownerError,
      owner_email_sent: ownerSent,
      owner_email_error: ownerError,
      acknowledgement_email_sent: acknowledgementSent,
      acknowledgement_email_error: acknowledgementError,
    }).eq("id", id);
    if (error) console.error("Could not persist email delivery state:", error.message);
  } catch (error) {
    console.error("Could not persist email delivery state:", error);
  }
}
