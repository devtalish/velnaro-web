import { createHmac } from "node:crypto";
import { NextResponse } from "next/server";
import { createServiceClient, isServiceSupabaseConfigured } from "@/lib/supabase/admin";
import { CONTACT_EMAIL } from "@/constants/portfolio-constants";
import { BUDGET_OPTIONS } from "@/constants/contact-constants";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_REGEX = /^[A-Z0-9.!#$%&'*+/=?^_{}|~-]+@[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?(?:\.[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?)+$/i;
const MAX_BODY_BYTES = 16_000;
const ALLOWED_BUDGETS = new Set<string>(BUDGET_OPTIONS.map((option) => option.value));
const fallbackRateLimits = new Map<string, number[]>();

const errorResponse = (error: string, status: number) =>
  NextResponse.json({ error }, { status });

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character] ?? character);

function allowFallbackRequest(ip: string): boolean {
  const now = Date.now();
  const recent = (fallbackRateLimits.get(ip) ?? []).filter((timestamp) => now - timestamp < 10 * 60 * 1000);
  if (recent.length >= 5) return false;
  recent.push(now);
  fallbackRateLimits.set(ip, recent);
  return true;
}

export async function POST(req: Request) {
  const contentType = req.headers.get("content-type")?.split(";")[0].trim().toLowerCase();
  if (contentType !== "application/json") {
    return errorResponse("Content-Type must be application/json.", 415);
  }

  const declaredLength = Number(req.headers.get("content-length") ?? 0);
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return errorResponse("Request body is too large.", 413);
  }

  let raw: unknown;
  try {
    const reader = req.body?.getReader();
    if (!reader) return errorResponse("Request body is required.", 400);
    const chunks: Uint8Array[] = [];
    let totalBytes = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      totalBytes += value.byteLength;
      if (totalBytes > MAX_BODY_BYTES) {
        await reader.cancel();
        return errorResponse("Request body is too large.", 413);
      }
      chunks.push(value);
    }
    const bytes = new Uint8Array(totalBytes);
    let offset = 0;
    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.byteLength;
    }
    raw = JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    return errorResponse("Invalid JSON.", 400);
  }

  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return errorResponse("A valid contact form payload is required.", 400);
  }

  const input = raw as Record<string, unknown>;
  const keys = ["name", "email", "budget", "message", "website"] as const;
  if (Object.keys(input).some((key) => !keys.includes(key as (typeof keys)[number]))) {
    return errorResponse("Unexpected contact form field.", 400);
  }
  if (keys.some((key) => input[key] !== undefined && typeof input[key] !== "string")) {
    return errorResponse("All contact fields must be text.", 400);
  }

  // Quietly accept honeypot submissions without sending or storing anything.
  if (typeof input.website === "string" && input.website.trim()) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const name = (input.name as string | undefined)?.trim() ?? "";
  const email = (input.email as string | undefined)?.trim().toLowerCase() ?? "";
  const budget = (input.budget as string | undefined)?.trim() ?? "";
  const message = (input.message as string | undefined)?.trim() ?? "";

  if (!name || !email || !message) return errorResponse("Name, email and message are required.", 400);
  if (!EMAIL_REGEX.test(email)) return errorResponse("Please provide a valid email address.", 400);
  if (name.length > 120 || email.length > 200 || budget.length > 100 || message.length > 5000) {
    return errorResponse("One or more fields exceed the allowed length.", 413);
  }
  if (budget && !ALLOWED_BUDGETS.has(budget)) {
    return errorResponse("Please select a valid project budget option.", 400);
  }
  if (/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(name + email + budget + message)) {
    return errorResponse("Fields contain unsupported control characters.", 400);
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  if (!resendApiKey || !fromEmail) {
    return errorResponse(
      `Email delivery is not configured yet. Please email ${CONTACT_EMAIL} directly.`,
      503
    );
  }

  const supabase = isServiceSupabaseConfigured ? createServiceClient() : null;
  const ip = req.headers.get("cf-connecting-ip")?.trim()
    || req.headers.get("x-real-ip")?.trim()
    || "unknown";

  if (supabase && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const ipHash = createHmac("sha256", process.env.SUPABASE_SERVICE_ROLE_KEY).update(ip).digest("hex");
    const { data: allowed, error: rateError } = await supabase.rpc("consume_contact_rate_limit", { p_ip_hash: ipHash });
    if (rateError) {
      console.error("Contact rate-limit check failed:", rateError.message);
      return errorResponse("The contact form is temporarily unavailable. Please try again shortly.", 503);
    }
    if (allowed !== true) {
      return NextResponse.json(
        { error: "Too many messages were sent from this connection. Please try again in 10 minutes." },
        { status: 429, headers: { "Retry-After": "600" } }
      );
    }
  } else if (!allowFallbackRequest(ip)) {
    return NextResponse.json(
      { error: "Too many messages were sent from this connection. Please try again in 10 minutes." },
      { status: 429, headers: { "Retry-After": "600" } }
    );
  }

  const safeName = name.replace(/[\r\n]+/g, " ").trim();
  const safeEmail = email.replace(/[\r\n]+/g, "");
  const safeBudget = budget || "Not specified";
  const subject = `New VELNARO project enquiry — ${safeName}`;
  const text = [
    "A new project enquiry was submitted through velnaro.agency.",
    "",
    `Name: ${safeName}`,
    `Email: ${safeEmail}`,
    `Project budget: ${safeBudget}`,
    "",
    "Project details:",
    message,
  ].join("\n");
  const html = `<div style="font-family:Arial,sans-serif;line-height:1.6;color:#17252b;max-width:640px;margin:auto">
    <p style="font-size:12px;letter-spacing:2px;color:#2e7775;font-weight:700">VELNARO · NEW PROJECT ENQUIRY</p>
    <h1 style="font-size:24px">A new website enquiry</h1>
    <p><strong>Name</strong><br />${escapeHtml(safeName)}</p>
    <p><strong>Email</strong><br /><a href="mailto:${escapeHtml(safeEmail)}">${escapeHtml(safeEmail)}</a></p>
    <p><strong>Project budget</strong><br />${escapeHtml(safeBudget)}</p>
    <p><strong>Project details</strong></p>
    <div style="white-space:pre-wrap;background:#f3f1ea;padding:18px;border-radius:12px">${escapeHtml(message)}</div>
  </div>`;

  let emailResponse: Response;
  try {
    emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [CONTACT_EMAIL],
        reply_to: safeEmail,
        subject,
        text,
        html,
      }),
      cache: "no-store",
    });
  } catch (error) {
    console.error("Contact email provider request failed:", error);
    return errorResponse(`We couldn't send your enquiry. Please email ${CONTACT_EMAIL} directly.`, 502);
  }

  if (!emailResponse.ok) {
    const providerError = await emailResponse.text().catch(() => "Unknown provider error");
    console.error("Contact email provider rejected the message:", emailResponse.status, providerError.slice(0, 500));
    return errorResponse(`We couldn't send your enquiry. Please email ${CONTACT_EMAIL} directly.`, 502);
  }

  // Keep the private admin inbox in sync when Supabase is configured. Mark the
  // owner notification as sent so the existing webhook cannot send a duplicate.
  if (supabase) {
    const { error: insertError } = await supabase.from("contact_submissions").insert({
      name,
      email,
      budget: budget || null,
      message,
      source: "website-contact-form",
      user_agent: (req.headers.get("user-agent") ?? "").slice(0, 500) || null,
      ip_address: null,
      email_sent: true,
      owner_email_sent: true,
      owner_email_error: null,
    });

    if (insertError) {
      console.error("Email was sent, but contact submission could not be stored:", {
        code: insertError.code,
        message: insertError.message,
      });
    }
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
