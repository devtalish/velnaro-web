import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { CONTACT_EMAIL } from "@/constants/portfolio-constants";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_REGEX = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
const MAX_BODY_BYTES = 16_000;

interface Body {
  name: string;
  email: string;
  budget: string;
  message: string;
}

const errorResponse = (error: string, status: number) =>
  NextResponse.json({ error }, { status });

export async function POST(req: Request) {
  const contentLength = Number(req.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return errorResponse("Request body is too large.", 413);
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return errorResponse("Invalid JSON.", 400);
  }

  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return errorResponse("A valid contact form payload is required.", 400);
  }

  const input = raw as Record<string, unknown>;
  const fields = ["name", "email", "budget", "message"] as const;
  if (fields.some((field) => input[field] !== undefined && typeof input[field] !== "string")) {
    return errorResponse("All contact fields must be text.", 400);
  }

  const body: Body = {
    name: (input.name as string | undefined)?.trim() ?? "",
    email: (input.email as string | undefined)?.trim() ?? "",
    budget: (input.budget as string | undefined)?.trim() ?? "",
    message: (input.message as string | undefined)?.trim() ?? "",
  };
  const { name, email, budget, message } = body;

  if (!name || !email || !message) {
    return errorResponse("Name, email and message are required.", 400);
  }
  if (!EMAIL_REGEX.test(email)) {
    return errorResponse("Please provide a valid email address.", 400);
  }
  if (name.length > 120 || email.length > 200 || budget.length > 100 || message.length > 5000) {
    return errorResponse("One or more fields exceed the allowed length.", 413);
  }

  if (!isSupabaseConfigured) {
    return errorResponse(
      `The contact form is not connected on this deployment. Please email ${CONTACT_EMAIL} directly.`,
      503
    );
  }

  const supabase = await createClient();
  if (!supabase) {
    return errorResponse(`Please email ${CONTACT_EMAIL} directly.`, 503);
  }

  const forwarded = req.headers.get("x-forwarded-for") ?? "";
  const ip = forwarded.split(",")[0]?.trim() || null;
  const userAgent = (req.headers.get("user-agent") ?? "").slice(0, 500) || null;

  const { error: dbError } = await supabase.from("contact_submissions").insert({
    name,
    email,
    budget: budget || null,
    message,
    user_agent: userAgent,
    ip_address: ip,
  });

  if (dbError) {
    console.error("Supabase insert failed:", {
      message: dbError.message,
      code: dbError.code,
      hint: dbError.hint,
    });

    const tableMissing =
      dbError.code === "42P01" ||
      dbError.code === "PGRST205" ||
      /relation .* does not exist/i.test(dbError.message || "") ||
      /could not find the table/i.test(dbError.message || "");

    return errorResponse(
      tableMissing
        ? "The database is connected but not set up yet. Run the Supabase migrations in order."
        : "Could not save your message. Please try again.",
      500
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
