"use server";

import { revalidatePath } from "next/cache";
import { deleteSubmission } from "@/lib/admin/data";
import { getAdminUser } from "@/lib/admin/auth";
import { createServiceClient } from "@/lib/supabase/admin";

export interface DeleteResult {
  ok: boolean;
  error?: string;
}

export const deleteSubmissionAction = async (
  id: string
): Promise<DeleteResult> => {
  const admin = await getAdminUser();
  if (!admin) return { ok: false, error: "Not signed in as an admin." };

  if (typeof id !== "string" || !id) {
    return { ok: false, error: "Missing submission id." };
  }

  try {
    await deleteSubmission(id);
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Could not delete.",
    };
  }

  revalidatePath("/admin");
  return { ok: true };
};

export const retryContactNotificationAction = async (
  id: string
): Promise<DeleteResult> => {
  const admin = await getAdminUser();
  if (!admin) return { ok: false, error: "Not signed in as an admin." };

  if (typeof id !== "string" || !/^[0-9a-f-]{36}$/i.test(id)) {
    return { ok: false, error: "Invalid submission id." };
  }

  const webhookSecret = process.env.NOTIFY_WEBHOOK_SECRET;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabase = createServiceClient();
  if (!webhookSecret || !supabaseUrl || !supabase) {
    return { ok: false, error: "Email retry is not configured on this deployment." };
  }

  const { data: submission, error: readError } = await supabase
    .from("contact_submissions")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (readError || !submission) {
    return { ok: false, error: "Could not find that contact submission." };
  }

  if (submission.owner_email_sent === true && submission.acknowledgement_email_sent === true) {
    return { ok: false, error: "Both email notifications are already marked as sent." };
  }

  try {
    const response = await fetch(`${supabaseUrl.replace(/\/$/, "")}/functions/v1/notify-contact`, {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        "x-webhook-secret": webhookSecret,
      },
      body: JSON.stringify({
        type: "INSERT",
        table: "contact_submissions",
        schema: "public",
        record: submission,
      }),
    });

    const result = await response.json().catch(() => ({})) as { duplicate?: boolean; skipped?: boolean };
    revalidatePath("/admin");
    if (!response.ok) {
      return {
        ok: false,
        error: "One or more emails could not be delivered. Check the delivery status and SMTP configuration.",
      };
    }
    if (result.duplicate || result.skipped) {
      return {
        ok: false,
        error: "A notification retry is already running or has already completed. Refresh the inbox in a moment.",
      };
    }
    return { ok: true };
  } catch {
    return {
      ok: false,
      error: "Could not reach the notification service. Check its deployment and configuration.",
    };
  }
};
