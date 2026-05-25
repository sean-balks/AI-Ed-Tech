# APEX — Project State Handoff

## Project Purpose
Apex is a validation landing page for a premium AI-powered SAT/ACT prep product targeting high school students (not parents) who are self-motivated and aiming for elite schools. The goal is to test whether the high-ticket price point ($99/month) converts vs. the low-ticket Lumio ($19/month). Email waitlist capture only — no product built yet.

## Monorepo Context
- GitHub: github.com/sean-balks/AI-Ed-Tech
- One of four sites: Lumio ($19 SAT/ACT), **Apex ($99 SAT/ACT)**, Scout ($79 MCAT), Axiom ($59 LSAT)
- Lives at `apps/apex/` in the monorepo
- Root `package.json` uses npm workspaces
- Lumio is already built — use it as the reference for setup and conventions

## Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS v4
- Supabase (same project as Lumio — shared waitlist table, `site` column differentiates)
- Vercel (separate project, same repo, root directory: `apps/apex`)
- GA4 + Meta Pixel (add before running ads)

## Setup Steps (starting from scratch)
```bash
cd apps
npx create-next-app@latest apex --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd apex
npm install @supabase/supabase-js
```

Create `apps/apex/.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=same_url_as_lumio
NEXT_PUBLIC_SUPABASE_ANON_KEY=same_key_as_lumio
NEXT_PUBLIC_GA_ID=your_ga4_id
NEXT_PUBLIC_META_PIXEL_ID=your_pixel_id
```

Replace `globals.css` with:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Positioning & Copy Direction

**Tagline:** Your AI tutor for the SAT. Built like the best human tutors. Priced like software.

**Target:** Self-motivated high school juniors/seniors, students targeting elite schools, students whose parents have already spent money on tutoring

**Price:** $99/month

**Hero headline:** 
"Your AI tutor for the SAT. Built like the best human tutors. Priced like software."

**Subheadline:**
"Elite SAT and ACT prep used to cost $200/hour. Now it's an AI that knows your weaknesses better than any tutor could, adapts in real time, and never runs out of patience."

**3 Value Props:**
1. Learns your error patterns across every session
2. Teaches strategy, not just content
3. Score improvement or your money back

**Competitive framing:** Position against elite tutoring — "What Revolution Prep charges $2,000 for. Available for $99/month."

**CTA:** Join the Waitlist → email capture

## Design Direction
- **Color accent:** Charcoal (#1a1a2e or similar dark navy) with gold (#f59e0b / amber-500) as the accent — premium, elite feel
- **Tone:** Confident, ambitious, student-facing (not parent-facing like Lumio)
- **Aesthetic:** Darker, more premium than Lumio — think AdeptLR's dark sections combined with Fennie's typographic sophistication
- **Hero:** Two-column like Lumio — copy left, mock UI card right (show a more advanced analytics dashboard — score trajectory over time, section breakdowns)
- **Social proof:** "Used by students accepted to [same 5 schools as Lumio]" — same Wikipedia SVG logos
- **Testimonials:** Student voices, not parent voices. Score improvement stories. e.g. "I went from a 1280 to a 1540 in 10 weeks."
- **No mention of price in hero subheadline** — lead with outcome, reveal price in dedicated pricing section to test willingness to pay

## Supabase Integration
Same Supabase project as Lumio. Insert `site: 'apex'` to differentiate signups.

```tsx
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// inside handleSubmit:
const { error } = await supabase
  .from('waitlist')
  .insert([{ email, site: 'apex' }])
```

## Supabase Schema (shared with all 4 sites)
```sql
table: waitlist
- id: int8, primary key, auto-increment
- email: text, not null
- site: text, not null  ← insert 'apex' for this site
- created_at: timestamptz, default now()
```

## Analytics
- Fire `fbq('track', 'Lead')` and `gtag('event', 'sign_up')` on successful form submit
- Add GA4 and Meta Pixel scripts to `layout.tsx`

## Page Sections (in order)
1. Navbar — dark background, gold CTA button "Get Early Access"
2. Hero — two column, copy + mock UI card
3. Social proof bar — college logos (same 5 as Lumio)
4. Value props — 3 cards (dark card style)
5. Testimonials — 3 student testimonials with score improvements
6. Pricing callout — dark background, $99/month, emphasize value vs. tutors
7. Footer

## Key Differences from Lumio
- Student-facing not parent-facing (copy voice changes significantly)
- Dark/premium aesthetic vs. Lumio's clean blue/white
- Price is $99 not $19 — lean into "worth it" framing not "affordable" framing
- Testimonials are students not parents
- Mock UI should show more sophisticated analytics (score over time graph)
- No "cancel anytime" soft language — lean into commitment and results

## Coding Conventions (same as Lumio)
- All content in single `page.tsx`
- `"use client"` at top
- Tailwind only
- No external UI libraries
- Inline SVG icons

## Deployment
- Separate Vercel project from Lumio
- Same GitHub repo, root directory set to `apps/apex`
- All env vars set in Vercel dashboard

## Unresolved Questions
- Domain name (apexprep.ai? apexsat.com? meetapex.ai?)
- Whether to show $99 price in hero or only in pricing section
- Whether to offer a "free diagnostic" as the CTA instead of just waitlist
