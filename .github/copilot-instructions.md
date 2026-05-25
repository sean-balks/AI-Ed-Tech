# AI-Ed-Tech Monorepo — Global Context

## Repo Structure
Four validation landing pages under apps/: lumio, apex, scout, axiom.
Each is an independent Next.js app deployed separately on Vercel.

## Stack (all apps)
- Next.js App Router + TypeScript
- Tailwind CSS v4
- Supabase (shared project, waitlist table with `site` column to distinguish apps)
- Vercel deployment
- GA4 + Meta Pixel (pre-ads requirement)

## Shared Supabase Schema
table: waitlist — id, email, site (text), created_at
Always insert the app's name as the `site` value.

## Coding Conventions
- "use client" at top of page.tsx
- All content in page.tsx (validation phase — no component splitting needed)
- Tailwind only, no CSS modules or UI libraries
- Inline SVGs, no icon libraries
- No free trials — waitlist only

## Env Vars (each app has its own .env.local + Vercel config)
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- NEXT_PUBLIC_GA_ID
- NEXT_PUBLIC_META_PIXEL_ID

## Current Phase
Pre-launch validation. Goal: capture waitlist emails, run Facebook ads, measure conversion before building product.