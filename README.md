# Cherry — by Harsh and Sam

A mobile-first dating app prototype built with Next.js 14, TypeScript, Tailwind CSS, Framer Motion and Supabase. The product direction is voice-first discovery: profiles, prompts, interests, likes, mutual matches and conversations.

## Routes
- `/` — branded landing page
- `/signup`, `/login`, `/auth/callback` — Supabase Auth entry points
- `/discover` — profile discovery and like/pass demo
- `/reels` — full-screen profile feed
- `/likes`, `/matches`, `/chat/[matchId]` — prototype likes, matches and chat
- `/profile`, `/onboarding` — profile and onboarding
- `/privacy`, `/terms` — legal drafts (not approved for launch)

## Run locally
Requires Node.js 18.17+.
```bash
npm install
cp .env.example .env.local
npm run dev
```

Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` for Supabase Auth. These are public client values; never place a service-role key in a `NEXT_PUBLIC_*` variable or commit secrets.

## Render
- Build command: `npm install && npm run build`
- Start command: `npm start`
- Add the two Supabase public environment variables in Render.
- In Supabase Auth, configure the production site URL and allowed redirect URL ending in `/auth/callback`.
- Apply migrations to a staging project first, inspect policies and test with two separate accounts, then plan production rollout.

## Database notes
`supabase/schema.sql` is the initial schema. The migration `supabase/migrations/20261028_market_foundation.sql` adds profile fields, likes, blocks, reports and server-validated RPCs for mutual matching and message creation. Review SQL and run it in staging before production. Existing tables may need reconciliation if your live database has drifted from this repository.

## Release checklist — do not skip
This repository is still a **pitch-ready prototype, not yet a verified production dating service**. The UI includes demo profiles and some local-only state; those screens are not automatically backed by the database. Before accepting real members:
1. Wire every discover/likes/matches/chat/profile action to Supabase and remove demo fallbacks from production.
2. Build and test account/profile creation, age gating, email confirmation, password reset, session expiry and account deletion.
3. Add media upload/storage policies, image validation, explicit audio-recording consent, and user-controlled deletion.
4. Add report/block UI, moderation queues, rate limits, abuse detection, and an incident-response owner.
5. Review and test every RLS policy and RPC using separate user accounts; add automated tests and CI.
6. Replace draft Terms/Privacy with jurisdiction-appropriate legal review; document retention, consent, safety and data deletion.
7. Add error monitoring, backups, analytics consent, accessibility checks, performance testing and an operational support process.
8. Complete end-to-end tests on mobile and desktop and verify the Render production build before launch.

Do not advertise fake member counts, verified identities, live activity or working real-time messaging unless those features are genuinely implemented and tested.
