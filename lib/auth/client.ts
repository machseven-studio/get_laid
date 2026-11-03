import { createAuthClient, SupabaseAuthAdapter } from "@neondatabase/auth";

const authUrl = process.env.NEXT_PUBLIC_NEON_AUTH_URL;

if (!authUrl) {
  throw new Error("Missing NEON_AUTH_BASE_URL. Add it to the Render environment variables and redeploy.");
}

// SupabaseAuthAdapter keeps Cherry's existing signUp/signInWithPassword UI API
// while authenticating against Neon Auth.
export function createClient() {
  return createAuthClient(authUrl, {
    adapter: SupabaseAuthAdapter(),
  });
}
