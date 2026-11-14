export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? "";
export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ?? "";

export const isValidSupabaseUrl = (value: string): boolean => {
  try {
    const parsed = new URL(value);
    const isSecure = parsed.protocol === "https:";
    const isLocalDevelopment =
      parsed.protocol === "http:" &&
      ["localhost", "127.0.0.1", "[::1]"].includes(parsed.hostname);
    return (isSecure || isLocalDevelopment) && !parsed.username && !parsed.password;
  } catch {
    return false;
  }
};

export const isSupabaseConfigured: boolean =
  isValidSupabaseUrl(SUPABASE_URL) &&
  Boolean(SUPABASE_ANON_KEY) &&
  !SUPABASE_ANON_KEY.startsWith("your-");
