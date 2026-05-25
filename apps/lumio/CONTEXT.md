# LUMIO — Project State Handoff

## Project Purpose
Lumio is a validation landing page for an AI-powered SAT/ACT prep product targeting parents of high school students. The goal is to capture email waitlist signups, run Facebook ads, and measure conversion before building the actual product. Price point: $19/month.

## Monorepo Context
- GitHub: github.com/sean-balks/AI-Ed-Tech
- This is one of four sites in the monorepo: Lumio, Apex, Scout, Axiom
- All sites live under `apps/` in the repo root
- Root `package.json` uses npm workspaces

## Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS v4
- Supabase (email capture storage)
- Vercel (deployment)
- GA4 + Meta Pixel (to be added before ads — NOT YET DONE)

## File Structure
```
apps/lumio/
├── src/app/
│   ├── page.tsx        ← main landing page (all content lives here)
│   ├── layout.tsx      ← sets metadata, imports Geist font + globals.css
│   └── globals.css     ← @tailwind base/components/utilities only
├── tailwind.config.ts  ← content paths configured
├── postcss.config.mjs
├── .env.local          ← NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY
└── package.json
```

## Current Status
**IN PROGRESS** — Landing page UI is complete. Supabase is set up but NOT yet wired into the form. Next immediate task is connecting the email form to Supabase.

## Completed Work
- Full landing page built in `page.tsx` with all sections:
  - Navbar (fixed, backdrop blur, "Get Early Access" CTA)
  - Hero (two-column: copy left, mock UI card right with skill breakdown bars + AI message)
  - College logos bar ("Beta students have been accepted to" — Harvard, Stanford, MIT, Yale, Duke SVG logos from Wikipedia CDN, grayscale)
  - Value props (3 cards: Finds gaps automatically, Teaches not just quizzes, Available 24/7)
  - Testimonials (3 placeholder cards: Sarah M. Chicago, David R. Austin, Michelle K. Seattle)
  - Pricing callout (blue background, $19/month, Join Waitlist CTA)
  - Footer
- Supabase project created, `waitlist` table exists with columns: id, email, site, created_at
- `.env.local` has NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
- `@supabase/supabase-js` installed

## Pending Tasks (in order)
1. **Wire Supabase into the email form** — install client, update `handleSubmit` to insert `{email, site: 'lumio'}` into the `waitlist` table
2. **Add GA4 + Meta Pixel** — both go in `layout.tsx` as script tags; fire `fbq('track', 'Lead')` and `gtag('event', 'sign_up')` inside `handleSubmit` on successful submission
3. **Deploy to Vercel** — connect GitHub repo, set env vars in Vercel dashboard, deploy
4. **Buy domain** — connect to Vercel deployment (suggested: lumioprep.com or similar)
5. **Test end-to-end** — submit email, confirm it appears in Supabase, confirm analytics fire

## Supabase Schema
```sql
table: waitlist
- id: int8, primary key, auto-increment
- email: text, not null
- site: text, not null  ← always insert 'lumio' for this site
- created_at: timestamptz, default now()
```

## Supabase Wiring (next code task)
Add this to `page.tsx`:
```tsx
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// inside handleSubmit:
const { error } = await supabase
  .from('waitlist')
  .insert([{ email, site: 'lumio' }])
```

## Design Decisions
- Color: Blue (#2563eb / blue-600 in Tailwind) as primary accent
- Typography: Geist Sans (loaded via next/font)
- Hero layout: two-column on desktop, stacked on mobile
- Mock UI card shows skill breakdown bars (Linear Equations 91%, Systems 74%, Quadratic 43%, Exponential Growth 28%) + AI message bubble
- Testimonials are placeholder/fabricated — replace with real ones once available
- College logos: grayscale, opacity-40, hover to opacity-70
- Social proof framing: "Beta students have been accepted to" (intentionally modest given early stage)
- No free trial offered — waitlist only for validation phase
- Price shown twice (hero subheadline + pricing section) — intentional, filters serious signups

## Analytics Plan (pre-ads checklist)
- GA4: add `gtag.js` script to `layout.tsx`
- Meta Pixel: add pixel script to `layout.tsx`
- Conversion event: fire on form submit success, not just button click
- Both IDs stored as env vars: `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_META_PIXEL_ID`

## Deployment Notes
- Deploy via Vercel, connect to GitHub repo
- Set these env vars in Vercel dashboard (not just .env.local):
  - NEXT_PUBLIC_SUPABASE_URL
  - NEXT_PUBLIC_SUPABASE_ANON_KEY
  - NEXT_PUBLIC_GA_ID (when ready)
  - NEXT_PUBLIC_META_PIXEL_ID (when ready)
- Each app (lumio, apex, scout, axiom) will be a separate Vercel project pointing to the same repo with different root directories

## Coding Conventions
- All page content in a single `page.tsx` for simplicity (validation phase — no need for components)
- `"use client"` directive at top of page.tsx (uses useState)
- Tailwind only — no CSS modules or styled components
- No external UI libraries
- SVG icons inline (no icon library)
- Placeholder data clearly commented

## Unresolved Questions
- Final domain name for Lumio (lumioprep.com? lumioai.com? heylumic.com?)
- Whether to add a "How it works" section before testimonials in v2
- Whether placeholder testimonials need a disclaimer or are fine as-is for validation
