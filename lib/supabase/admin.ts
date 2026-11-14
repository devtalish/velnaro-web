import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import "server-only";
import { isValidSupabaseUrl } from "./config";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? "";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ?? "";

export const isServiceSupabaseConfigured = isValidSupabaseUrl(url) && Boolean(serviceRoleKey);

export const createServiceClient = () => {
  if (!isServiceSupabaseConfigured) return null;
  return createSupabaseClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false },
    global: { headers: { "X-Client-Info": "velnaro-contact-api" } },
  });
};
