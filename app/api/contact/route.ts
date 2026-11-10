import { createHmac } from "node:crypto";
import { NextResponse } from "next/server";
import { createServiceClient, isServiceSupabaseConfigured } from "@/lib/supabase/admin";
import { CONTACT_EMAIL } from "@/constants/portfolio-constants";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_BODY_BYTES = 16_000;

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
  const keys = ["name", "email", "budget", "message"] as const;
  if (keys.some((key) => input[key] !== undefined && typeof input[key] !== "string")) {
    return errorResponse("All contact fields must be text.", 400);
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
  if (/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(name + email + budget + message)) {
    return errorResponse("Fields contain unsupported control characters.", 400);
  }

  if (!isServiceSupabaseConfigured) {
    return errorResponse(`The contact form is not connected. Please email ${CONTACT_EMAIL} directly.`, 503);
  }
  const supabase = createServiceClient();
  if (!supabase) return errorResponse(`Please email ${CONTACT_EMAIL} directly.`, 503);

  // Prefer the platform-provided client IP. The app is intended for Vercel;
  // x-forwarded-for is a fallback for deployments behind a trusted proxy.
  const ip = req.headers.get("x-real-ip")?.trim()
    || req.headers.get("x-forwarded-for")?.split(",").at(-1)?.trim();
  if (!ip) return errorResponse("We could not verify this connection. Please try again.", 503);
  const userAgent = (req.headers.get("user-agent") ?? "").slice(0, 500) || null;

  const rateLimitSecret = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!rateLimitSecret) return errorResponse("The contact form is temporarily unavailable.", 503);
  const ipHash = createHmac("sha256", rateLimitSecret).update(ip).digest("hex");
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

  const { error: insertError } = await supabase.from("contact_submissions").insert({
    name, email, budget: budget || null, message,
    source: "website-contact-form", user_agent: userAgent,
    // Raw IPs are not retained; the keyed fingerprint is stored in the rate-limit table.
    ip_address: null,
  });

  if (insertError) {
    console.error("Contact submission insert failed:", { code: insertError.code, message: insertError.message });
    return errorResponse("Could not save your message. Please try again.", 500);
  }
  return NextResponse.json({ ok: true }, { status: 200 });
}
