import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  if (!code) return NextResponse.redirect(new URL("/login?error=missing_code", url.origin));
  const response = NextResponse.redirect(new URL("/discover", url.origin));
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !anonKey) return NextResponse.redirect(new URL("/login?error=missing_config", url.origin));
  const supabase = createServerClient(supabaseUrl, anonKey, {
    cookies: {
      getAll() { return request.headers.get("cookie")?.split(";").map(v => { const i=v.indexOf("="); return {name:v.slice(0,i).trim(),value:decodeURIComponent(v.slice(i+1).trim())}; }) ?? []; },
      setAll(cookies) { cookies.forEach(({name,value,options}) => response.cookies.set(name,value,options)); }
    }
  });
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) return NextResponse.redirect(new URL("/login?error=confirmation_failed", url.origin));
  return response;
}
