# Spark & Vouch

A Next.js starter for a voice-first social discovery experience.

## Stack
- Next.js 14 / React / TypeScript
- Tailwind CSS
- Framer Motion
- Supabase (auth and database)

## Getting started
1. Install Node.js 18.17 or later.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local` and configure the Supabase URL and anon key.
4. Run `npm run dev`.

## Database
Review `supabase/schema.sql` and test it in a non-production Supabase project before applying it. This is a starter scaffold, not a production security review. Matching, messaging, storage permissions, and authorization RPCs must be fully implemented and tested before launch.

Never commit `.env.local` or Supabase service-role keys.