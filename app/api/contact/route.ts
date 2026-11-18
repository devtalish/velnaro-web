import { createHmac } from "node:crypto";
import { NextResponse } from "next/server";
import { createServiceClient, isServiceSupabaseConfigured } from "@/lib/supabase/admin";
import { BUDGET_OPTIONS } from "@/constants/contact-constants";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_REGEX = /^[A-Z0-9.!#$%&'*+/=?^_{}|~-]+@[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?(?:\.[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?)+$/i;
const MAX_BODY_BYTES = 16_000;
const ALLOWED_BUDGETS = new Set<string>(BUDGET_OPTIONS.map((option) => option.value));

const errorResponse = (error: string, status: number) =>
  NextResponse.json({ error }, { status });

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

  // Quietly accept honeypot submissions without storing them.
  if (typeof input.website === "string" && input.website.trim()) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const name = (input.name as string | undefined)?.trim() ?? "";
  const email = (input.email as string | undefined)?.trim().toLowerCase() ?? "";
  const budget = (input.budget as string | undefined)?.trim() ?? "";
  const message = (input.message as string | undefined)?.trim() ?? "";

  if (!name || !email || !message) {
    return errorResponse("Name, email and message are required.", 400);
  }
  if (!EMAIL_REGEX.test(email)) {
    return errorResponse("Please provide a valid email address.", 400);
  }
  if (name.length > 120 || email.length > 200 || budget.length > 100 || message.length > 5000) {
    return errorResponse("One or more fields exceed the allowed length.", 413);
  }
  if (budget && !ALLOWED_BUDGETS.has(budget)) {
    return errorResponse("Please select a valid project budget option.", 400);
  }
  if (/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(name + email + budget + message)) {
    return errorResponse("Fields contain unsupported control characters.", 400);
  }

  // The form must never claim success unless the private database write succeeds.
  if (!isServiceSupabaseConfigured) {
    return errorResponse(
      "The contact form is not connected yet. Please try again later or contact VELNARO directly.",
      503
    );
  }

  const supabase = createServiceClient();
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!supabase || !serviceKey) {
    return errorResponse("The contact form is temporarily unavailable. Please try again later.", 503);
  }

  const forwardedFor = req.headers.get("x-forwarded-for");
  const ip = req.headers.get("cf-connecting-ip")?.trim()
    || req.headers.get("x-real-ip")?.trim()
    || forwardedFor?.split(",").at(-1)?.trim()
    || "unknown";
  const ipHash = createHmac("sha256", serviceKey).update(ip).digest("hex");

  const { data: allowed, error: rateError } = await supabase.rpc(
    "consume_contact_rate_limit",
    { p_ip_hash: ipHash }
  );

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

  const { error: insertError } = await supabase.from("contact_submissions").insert({
    name,
    email,
    budget: budget || null,
    message,
    source: "website-contact-form",
    user_agent: (req.headers.get("user-agent") ?? "").slice(0, 500) || null,
    ip_address: null,
    email_sent: false,
    email_error: null,
    owner_email_sent: false,
    owner_email_error: null,
    acknowledgement_email_sent: false,
    acknowledgement_email_error: null,
  });

  if (insertError) {
    console.error("Contact submission could not be stored:", {
      code: insertError.code,
      message: insertError.message,
    });
    return errorResponse("We couldn't save your enquiry. Please try again shortly.", 503);
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
