import { createAuthClient, SupabaseAuthAdapter } from "@neondatabase/auth";

const authUrl = process.env.NEXT_PUBLIC_NEON_AUTH_URL;

if (!authUrl) {
  throw new Error("Missing NEON_AUTH_BASE_URL. Add it to Render and redeploy.");
}

// Supabase-compatible adapter keeps the existing email/password sign-in call.
export function createClient() {
  return createAuthClient(authUrl, {
    adapter: SupabaseAuthAdapter(),
  });
}

// Use the native Better Auth API for sign-up so email-verification flows can
// return successfully even when no session is issued until the email is verified.
export function createNeonAuthClient() {
  return createAuthClient(authUrl);
}
