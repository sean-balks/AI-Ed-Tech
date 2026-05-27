# SCOUT — Project State Handoff

## Project Purpose
Scout is a validation landing page for an AI-powered MCAT prep product targeting pre-med undergrads and post-bacc students. The MCAT market is massively underserved by AI — traditional prep costs $1,500–$6,700 for courses, $150–$300/hour for private tutoring. Scout positions as a smarter, faster alternative. Email waitlist capture only — no product built yet. Price point: $79/month.

## Monorepo Context
- GitHub: github.com/sean-balks/AI-Ed-Tech
- One of four sites: Lumio ($19 SAT/ACT), Apex ($99 SAT/ACT), **Scout ($79 MCAT)**, Axiom ($59 LSAT)
- Lives at `apps/scout/` in the monorepo
- Root `package.json` uses npm workspaces
- Lumio is already built — use it as the reference for setup and conventions

## Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS v4
- Supabase (same project as all 4 sites — shared waitlist table, `site` column differentiates)
- Vercel (separate project, same repo, root directory: `apps/scout`)
- GA4 + Meta Pixel (add before running ads)

## Setup Steps (starting from scratch)
```bash
cd apps
npx create-next-app@latest scout --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd scout
npm install @supabase/supabase-js
```

Create `apps/scout/.env.local`:
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

**Tagline:** Score higher on the MCAT. Study less than you think.

**Target:** Pre-med undergrads (junior/senior year), post-bacc students, gap year students — all self-paying, high stakes, high willingness to pay

**Price:** $79/month

**Hero headline:**
"Score higher on the MCAT. Study less than you think."

**Subheadline:**
"The first AI tutor built specifically for the MCAT. It finds what you don't know, teaches it in a way that clicks, and stops wasting your time on what you already understand."

**3 Value Props:**
1. Diagnoses your weakest content areas automatically
2. Teaches concepts — doesn't just quiz you
3. Adapts every session to where you actually are

**Competitive framing:** "Traditional MCAT prep courses cost $1,500–$6,700. Private tutoring runs $150–$300/hour. Scout is $79/month."

**Urgency angle:** Mean matriculant MCAT score is 512.1 — one point can make the difference between hitting a school's median or falling below it. Competition is intense.

**CTA:** Join the Waitlist → email capture

## Design Direction
- **Color accent:** Deep teal/green (#0d9488 / teal-600) — medical, trustworthy, serious
- **Tone:** Serious, outcome-driven, empathetic to the pressure pre-med students feel
- **Aesthetic:** Clean and clinical but not cold — white background, teal accents, professional
- **Hero:** Two-column — copy left, mock UI card right (show MCAT-specific content: Bio/Biochem, CARS, Chem/Physics, Psych/Soc section breakdowns)
- **Social proof:** Medical school logos — Harvard Medical, Johns Hopkins, UCSF, Mayo Clinic School of Medicine, NYU Grossman (use Wikipedia SVG seals, grayscale)
- **Testimonials:** Student voices — pre-med students with score improvement stories. Include specific section score improvements (e.g. "My CARS went from 124 to 129")
- **Stats to include:** Mean matriculant score 512.1, 54,699 applicants for 23,440 spots (2025 cycle), traditional prep costs

## MCAT-Specific Content for Mock UI Card
Show a section breakdown card:
- Biological & Biochemical Foundations: 127/132
- Chemical & Physical Foundations: 124/132 ← needs work
- Psychological & Social Foundations: 128/132
- CARS: 122/132 ← biggest opportunity

AI message: "Your CARS score is your biggest opportunity. Most students gain 4–6 points here with targeted passage practice. Let's start there."

## Supabase Integration
Same Supabase project as all other sites. Insert `site: 'scout'`.

```tsx
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// inside handleSubmit:
const { error } = await supabase
  .from('waitlist')
  .insert([{ email, site: 'scout' }])
```

## Supabase Schema (shared with all 4 sites)
```sql
table: waitlist
- id: int8, primary key, auto-increment
- email: text, not null
- site: text, not null  ← insert 'scout' for this site
- created_at: timestamptz, default now()
```

## Analytics
- Fire `fbq('track', 'Lead')` and `gtag('event', 'sign_up')` on successful form submit
- Add GA4 and Meta Pixel scripts to `layout.tsx`

## Page Sections (in order)
1. Navbar — white, teal CTA button "Get Early Access"
2. Hero — two column, copy + MCAT mock UI card
3. Social proof bar — medical school logos (5 schools, grayscale)
4. Value props — 3 cards (teal accent icons)
5. Competitive pricing callout — show cost comparison table (traditional courses vs tutoring vs Scout)
6. Testimonials — 3 pre-med student testimonials
7. Pricing section — $79/month, teal background
8. Footer

## Unique Section: Cost Comparison Table
This site should include a comparison table not present on other sites:

| Option | Cost |
|--------|------|
| Kaplan/Princeton Review Course | $1,500–$2,500 |
| Private MCAT Tutor | $150–$300/hr |
| **Scout** | **$79/month** |

This is a high-impact conversion element for this market.

## Key Differences from Lumio/Apex
- Buyer IS the user (self-paying student, not parent)
- Much higher stakes test — 7+ hours, covers 4 major science disciplines
- Longer study timeline (3–6 months typical)
- More sophisticated audience — pre-med students respond to data and specifics
- Include actual MCAT statistics to establish credibility
- Four-section score breakdown is the natural UI metaphor

## Coding Conventions (same as Lumio)
- All content in single `page.tsx`
- `"use client"` at top
- Tailwind only
- No external UI libraries
- Inline SVG icons

## Deployment
- Separate Vercel project from other sites
- Same GitHub repo, root directory set to `apps/scout`
- All env vars set in Vercel dashboard

## Unresolved Questions
- Domain name (scoutmcat.com? meetscout.ai? scoutprep.com?)
- Whether to include a "What the MCAT tests" explainer section
- Whether the $79 price point is right or should be $99 given the market's willingness to pay
