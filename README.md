# Spark & Vouch

A mobile-first, voice-first dating app concept built with Next.js 14, TypeScript, Tailwind CSS, Framer Motion, and Supabase.

## Pages
- `/` — editorial landing page
- `/onboarding` — three-step profile setup flow
- `/discover` — profile discovery, like/pass actions, voice-intro demo
- `/reels` — vertical snap-scrolling profile feed with likes, comments, save, and share controls
- `/likes` — liked profiles
- `/matches` — search and match list
- `/chat/[matchId]` — interactive demo chat
- `/profile` — editable demo profile

## Run locally
1. Use Node.js 18.17+.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local` and configure Supabase values if testing Supabase features.
4. Run `npm run dev`.

## Render
Build command: `npm install && npm run build`
Start command: `npm start`
Deploy branch: `feat/spark-vouch-starter` until the pull request is reviewed.

## Prototype limitations
This is a pitch/demo prototype. Profile data, likes, matches, and chat are demo/local state, not a live dating service. Authentication, moderation, reporting/blocking, privacy controls, real-time messaging, database write RPCs, audio storage policies, consent/safety flows, and automated tests are required before a public launch. `supabase/schema.sql` is an initial scaffold and must be reviewed and tested in a non-production project first.

Never commit `.env.local`, service-role keys, or private credentials.
