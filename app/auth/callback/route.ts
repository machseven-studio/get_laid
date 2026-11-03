import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Neon Auth completes email verification on its own endpoint and then
  // redirects back here. There is no Supabase code-exchange step.
  return NextResponse.redirect(new URL("/discover", request.url));
}
