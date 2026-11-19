import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import "server-only";
import { isValidSupabaseUrl } from "./config";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? "";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ?? "";

const hasConfiguredServiceKey =
  Boolean(serviceRoleKey) &&
  !/^(your-|replace[-_ ]|placeholder)/i.test(serviceRoleKey);
const hasConfiguredProjectUrl =
  isValidSupabaseUrl(url) && !/your-project|your-project-ref/i.test(url);

export const isServiceSupabaseConfigured =
  hasConfiguredProjectUrl && hasConfiguredServiceKey;

export const createServiceClient = () => {
  if (!isServiceSupabaseConfigured) return null;
  return createSupabaseClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false },
    global: { headers: { "X-Client-Info": "velnaro-contact-api" } },
  });
};
