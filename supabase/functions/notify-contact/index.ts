import { createClient, type SupabaseClient } from "jsr:@supabase/supabase-js@2.119.0";
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
const safeHeader = (value: string) =>
  value.replace(/\r/g, " ").replace(/\n/g, " ").replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim().slice(0, 120);
const safeMailboxName = (value: string) => safeHeader(value).replace(/[<>"]/g, "").slice(0, 80);

Deno.serve(async (req: Request): Promise<Response> => {
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const expectedSecret = env("NOTIFY_WEBHOOK_SECRET");
  if (!expectedSecret) return json({ error: "Webhook secret not configured" }, 503);
  if (req.headers.get("x-webhook-secret") !== expectedSecret) return json({ error: "Unauthorized" }, 401);

  const contentType = req.headers.get("content-type")?.split(";")[0].trim().toLowerCase();
  if (contentType !== "application/json") return json({ error: "Expected application/json" }, 415);

  let raw = "";
  try {
    const reader = req.body?.getReader();
    if (!reader) return json({ error: "Request body is required" }, 400);
    const decoder = new TextDecoder();
    let totalBytes = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      totalBytes += value.byteLength;
      if (totalBytes > 64_000) {
        await reader.cancel();
        return json({ error: "Payload too large" }, 413);
      }
      raw += decoder.decode(value, { stream: true });
    }
    raw += decoder.decode();
  } catch {
    return json({ error: "Could not read request body" }, 400);
  }

  let payload: WebhookPayload;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return json({ error: "Invalid webhook payload" }, 400);
    }
    payload = parsed as WebhookPayload;
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  if (payload?.type !== "INSERT" || payload?.table !== "contact_submissions" || payload?.schema !== "public" || !payload.record) {
    return json({ skipped: true });
  }

  const submission = payload.record;
  const validEmail = typeof submission.email === "string"
    && submission.email.length <= 200
    && /^[A-Z0-9.!#$%&'*+/=?^_{}|~-]+@[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?(?:\.[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?)+$/i.test(submission.email);
  if (
    typeof submission.id !== "string" || !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(submission.id)
    || typeof submission.name !== "string" || !submission.name.trim() || submission.name.length > 120
    || !validEmail
    || typeof submission.message !== "string" || !submission.message.trim() || submission.message.length > 5000
    || (submission.budget !== null && typeof submission.budget !== "string")
    || (typeof submission.budget === "string" && submission.budget.length > 100)
  ) {
    return json({ error: "Invalid submission record" }, 400);
  }

  const supabaseUrl = env("SUPABASE_URL");
  const serviceKey = env("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceKey) {
    console.error("Notification service credentials are missing.");
    return json({ error: "Notification service is not configured" }, 503);
  }
  const supabase = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });

  const { data: claimed, error: claimError } = await supabase.rpc("claim_contact_notification", {
    p_submission_id: submission.id,
  });
  if (claimError) {
    console.error("Could not claim notification:", claimError.message);
    return json({ error: "Could not claim notification" }, 503);
  }
  if (claimed !== true) return json({ skipped: true, duplicate: true });

  const { data: previous, error: readError } = await supabase
    .from("contact_submissions")
    .select("owner_email_sent, owner_email_error, acknowledgement_email_sent, acknowledgement_email_error")
    .eq("id", submission.id)
    .maybeSingle();

  if (readError || !previous) {
    console.error("Could not read notification state:", readError?.message ?? "Submission not found");
    await finishNotification(supabase, submission.id, false);
    return json({ error: "Could not read notification state" }, 503);
  }

  let ownerSent = previous.owner_email_sent === true;
  let ownerError: string | null = previous.owner_email_error ?? null;
  let acknowledgementSent = previous.acknowledgement_email_sent === true;
  let acknowledgementError: string | null = previous.acknowledgement_email_error ?? null;

  const host = env("SMTP_HOST");
  const user = env("SMTP_USER");
  const pass = env("SMTP_PASS");
  const port = Number(env("SMTP_PORT") ?? "465");
  const recipient = env("CONTACT_RECIPIENT_EMAIL") ?? user;

  if (!host || !user || !pass || !recipient || !Number.isInteger(port) || port < 1 || port > 65535) {
    ownerError = ownerSent ? ownerError : "SMTP is not configured";
    acknowledgementError = acknowledgementSent ? acknowledgementError : "SMTP is not configured";
    await persistResult(supabase, submission.id, ownerSent, ownerError, acknowledgementSent, acknowledgementError);
    return json({ ok: false, reason: "smtp-not-configured" }, 503);
  }

  const ownerName = safeHeader(env("OWNER_NAME") ?? "VELNARO") || "VELNARO";
  const siteUrl = env("SITE_URL");
  let client: SMTPClient | undefined;

  try {
    client = new SMTPClient({
      connection: { hostname: host, port, tls: port === 465, auth: { username: user, password: pass } },
    });

    if (!acknowledgementSent) {
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
        acknowledgementError = null;
      } catch (error) {
        acknowledgementError = (error instanceof Error ? error.message : String(error)).slice(0, 300);
        console.error("Acknowledgement email failed:", acknowledgementError);
      }
    }

    if (!ownerSent) {
      try {
        await client.send({
          from: `VELNARO <${user}>`,
          to: recipient,
          replyTo: `${safeMailboxName(submission.name)} <${submission.email}>`,
          subject: buildAlertSubject(submission),
          content: buildAlertText(submission),
          html: buildAlertHtml(submission, env("ADMIN_INBOX_URL")),
        });
        ownerSent = true;
        ownerError = null;
      } catch (error) {
        ownerError = (error instanceof Error ? error.message : String(error)).slice(0, 300);
        console.error("Owner notification failed:", ownerError);
      }
    }

    await persistResult(supabase, submission.id, ownerSent, ownerError, acknowledgementSent, acknowledgementError);
    const complete = ownerSent && acknowledgementSent;
    return json({ ok: complete, ownerNotification: ownerSent ? "sent" : "failed", acknowledgement: acknowledgementSent ? "sent" : "failed" }, complete ? 200 : 502);
  } catch (error) {
    const detail = (error instanceof Error ? error.message : String(error)).slice(0, 300);
    console.error("Notification handler failed:", detail);
    await persistResult(supabase, submission.id, ownerSent, ownerError ?? detail, acknowledgementSent, acknowledgementError);
    return json({ error: "Email delivery failed" }, 502);
  } finally {
    try {
      await client?.close();
    } catch (closeError) {
      console.error("Could not close SMTP connection:", closeError);
    }
  }
});

async function persistResult(
  supabase: SupabaseClient<any, "public", "public", any, any>,
  id: string,
  ownerSent: boolean,
  ownerError: string | null,
  acknowledgementSent: boolean,
  acknowledgementError: string | null,
): Promise<void> {
  const { error } = await supabase.from("contact_submissions").update({
    email_sent: ownerSent,
    email_error: ownerError,
    owner_email_sent: ownerSent,
    owner_email_error: ownerError,
    acknowledgement_email_sent: acknowledgementSent,
    acknowledgement_email_error: acknowledgementError,
  }).eq("id", id);

  if (error) {
    console.error("Could not persist email delivery state:", error.message);
    await finishNotification(supabase, id, false);
    return;
  }
  await finishNotification(supabase, id, ownerSent && acknowledgementSent);
}

async function finishNotification(
  supabase: SupabaseClient<any, "public", "public", any, any>,
  id: string,
  completed: boolean,
): Promise<void> {
  const { error } = await supabase.rpc("finish_contact_notification", {
    p_submission_id: id,
    p_completed: completed,
  });
  if (error) console.error("Could not finish notification claim:", error.message);
}
