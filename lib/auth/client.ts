import { createAuthClient } from "better-auth/react";

const authUrl = process.env.NEXT_PUBLIC_NEON_AUTH_URL;

if (!authUrl) {
  throw new Error("Missing NEON_AUTH_BASE_URL. Add it to Render and redeploy.");
}

// Neon Auth is powered by Better Auth. Use its browser client directly;
// this avoids the Neon Next.js adapter's Next.js 16 peer dependency.
export function createClient() {
  return createAuthClient({
    baseURL: authUrl,
  });
}

export function createNeonAuthClient() {
  return createClient();
}
