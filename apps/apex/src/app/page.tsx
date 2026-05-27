"use client";
import { createClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";

const LOGO_COUNT = 5;
const TICKER_LOOP_PX = LOGO_COUNT * 160;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const scoreData = [
  { week: "W1", score: 1210 },
  { week: "W3", score: 1270 },
  { week: "W5", score: 1340 },
  { week: "W7", score: 1400 },
  { week: "W9", score: 1460 },
  { week: "W11", score: 1520 },
];

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => (prev + 1) % TICKER_LOOP_PX);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase
      .from("waitlist")
      .insert([{ email, site: "apex" }]);

    if (error) {
      console.error(error);
      setErrorMsg("Something went wrong. Please try again.");
    } else {
      setEmail("");
      setErrorMsg(null);
      setSubmitted(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const w = window as any;
      w.gtag?.("event", "sign_up");
      w.fbq?.("track", "Lead");
    }
  };

  const minScore = 1200;
  const maxScore = 1600;
  const chartH = 100;
  const chartW = 280;
  const pts = scoreData.map((d, i) => {
    const x = (i / (scoreData.length - 1)) * chartW;
    const y = chartH - ((d.score - minScore) / (maxScore - minScore)) * chartH;
    return `${x},${y}`;
  });

  return (
    <main className="min-h-screen bg-[#0d0d1a] font-sans text-white">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0d0d1a]/90 backdrop-blur-sm border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/apex-logo-192x192.png" alt="Apex" className="w-8 h-8 rounded-lg" />
          <span className="text-xl font-bold tracking-tight text-white">apex</span>
        </div>
        <a
          href="#waitlist"
          className="bg-amber-500 text-[#0d0d1a] text-sm font-bold px-5 py-2 rounded-lg hover:bg-amber-400 transition-colors"
        >
          Get Early Access
        </a>
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-16 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT — copy */}
          <div>
            <div className="inline-block bg-amber-500/10 text-amber-400 text-sm font-medium px-4 py-1.5 rounded-lg mb-6 border border-amber-500/20">
              Elite AI SAT & ACT Prep
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold leading-tight tracking-tight mb-6">
              Your AI tutor for the SAT.{" "}
              <span className="text-amber-400">Built like the best human tutors.</span>{" "}
              Priced like software.
            </h1>
            <p className="text-xl text-white/60 mb-8 leading-relaxed">
              Elite SAT and ACT prep used to cost $200/hour. Now it&apos;s an AI that knows your weaknesses better than any tutor could, adapts in real time, and never runs out of patience.
            </p>
            <form
              onSubmit={handleSubmit}
              id="waitlist"
              className="flex flex-col sm:flex-row gap-3 max-w-md"
            >
              {!submitted ? (
                <>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-5 py-3 rounded-lg bg-white/5 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                  />
                  <button
                    type="submit"
                    className="bg-amber-500 text-[#0d0d1a] font-bold px-6 py-3 rounded-lg hover:bg-amber-400 transition-colors text-sm whitespace-nowrap"
                  >
                    Join the Waitlist
                  </button>
                </>
              ) : (
                <div className="w-full bg-amber-500/10 text-amber-400 font-medium px-6 py-3 rounded-lg text-sm text-center border border-amber-500/20">
                  You&apos;re on the list — we&apos;ll be in touch soon.
                </div>
              )}
            </form>
            {errorMsg && (
              <p className="text-red-400 text-xs mt-2">{errorMsg}</p>
            )}
          </div>

          {/* RIGHT — mock analytics UI */}
          <div className="relative">
            <div className="bg-[#13132b] rounded-2xl border border-white/10 p-6 relative z-10 shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-widest mb-1">Score Trajectory</p>
                  <p className="font-bold text-white">SAT Composite · 11 Weeks</p>
                </div>
                <div className="bg-amber-500/10 text-amber-400 text-xs font-semibold px-3 py-1 rounded-lg border border-amber-500/20">
                  +310 pts
                </div>
              </div>

              {/* Line chart */}
              <div className="bg-[#0d0d1a] rounded-xl p-4 mb-4">
                <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full h-24" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <polyline
                    points={pts.join(" ")}
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <polygon
                    points={`0,${chartH} ${pts.join(" ")} ${chartW},${chartH}`}
                    fill="url(#scoreGrad)"
                  />
                  {scoreData.map((d, i) => {
                    const x = (i / (scoreData.length - 1)) * chartW;
                    const y = chartH - ((d.score - minScore) / (maxScore - minScore)) * chartH;
                    return <circle key={i} cx={x} cy={y} r="3" fill="#f59e0b" />;
                  })}
                </svg>
                <div className="flex justify-between mt-2">
                  {scoreData.map((d) => (
                    <span key={d.week} className="text-[10px] text-white/30">{d.week}</span>
                  ))}
                </div>
              </div>

              {/* Section breakdown */}
              <div className="bg-[#0d0d1a] rounded-xl p-4 mb-4">
                <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-3">Section Breakdown</p>
                <div className="space-y-3">
                  {[
                    { label: "Math", score: 780, max: 800, pct: 97 },
                    { label: "Reading & Writing", score: 740, max: 800, pct: 92 },
                  ].map((s) => (
                    <div key={s.label}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-white/60">{s.label}</span>
                        <span className="text-xs font-semibold text-white">{s.score} / {s.max}</span>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-lg overflow-hidden">
                        <div
                          className="h-full bg-amber-500 rounded-lg"
                          style={{ width: `${s.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI insight */}
              <div className="bg-amber-500/5 border border-amber-500/15 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-amber-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3.5 h-3.5 text-[#0d0d1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-amber-400 mb-1">Apex</p>
                    <p className="text-xs text-white/60 leading-relaxed">
                      You&apos;ve gained 310 points in 11 weeks. Your Reading score has the most upside — focus on evidence-based questions this week to push past 1540.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative blur */}
            <div className="absolute -top-8 -right-8 w-56 h-56 bg-amber-500 rounded-lg blur-3xl opacity-10 z-0" />
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-indigo-600 rounded-lg blur-3xl opacity-15 z-0" />
          </div>
        </div>
      </section>

      {/* SCROLLING COLLEGE TICKER */}
      <section className="py-14 border-y border-white/10 overflow-hidden">
        <p className="text-center text-xs text-white/35 uppercase tracking-[0.28em] font-medium mb-10">
          Used by students admitted to
        </p>

        <div className="relative overflow-hidden">
          <div
            className="flex items-center gap-18 whitespace-nowrap transition-none"
            style={{ transform: `translateX(-${offset}px)` }}
          >
            {[...Array(3)].flatMap((_, rep) =>
              [
                { src: "/college_logos/cornell_logo.png", alt: "Cornell" },
                { src: "/college_logos/duke_logo.png", alt: "Duke" },
                { src: "/college_logos/gtech_logo.svg", alt: "Georgia Tech" },
                { src: "/college_logos/mit_logo.png", alt: "MIT" },
                { src: "/college_logos/northeastern_logo.png", alt: "Northeastern" },
                { src: "/college_logos/nyu_logo.png", alt: "NYU" },
                { src: "/college_logos/stanford_logo.png", alt: "Stanford" },
                { src: "/college_logos/michigan_logo.png", alt: "Michigan" },
                { src: "/college_logos/usc_logo.png", alt: "USC" },
                { src: "/college_logos/ucla_logo.png", alt: "USC" },
                
              ].map((logo, i) => (
                <div
                  key={`${rep}-${i}`}
                  className="h-16 flex-shrink-0 flex items-center justify-center"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="max-h-14 max-w-[120px] object-contain grayscale opacity-100 contrast-125 brightness-125"
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            What Revolution Prep charges{" "}
            <span className="text-amber-400">$2,000 for.</span>
            <br />Available for $99/month.
          </h2>
          <p className="text-lg text-white/50 max-w-xl mx-auto">
            Elite tutoring built a business around scarcity and scheduling. We built an AI that never sleeps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: (
                <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              ),
              title: "Learns your error patterns across every session",
              body: "Apex doesn't just track right and wrong. It identifies the exact reasoning mistakes you make — and targets them until they're gone.",
            },
            {
              icon: (
                <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              ),
              title: "Teaches strategy, not just content",
              body: "The best tutors don't just drill problems — they teach you how to think about them. Apex does the same, adapting its explanations to how your brain actually works.",
            },
            {
              icon: (
                <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              ),
              title: "Score improvement or your money back",
              body: "We're confident enough in the results to back them. If your score doesn't improve, you don't pay. That's a guarantee no $200/hour tutor will give you.",
            },
          ].map((card) => (
            <div key={card.title} className="bg-[#13132b] border border-white/10 rounded-2xl p-8">
              <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center mb-5">
                {card.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 px-6 bg-[#0a0a18]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm text-white/30 uppercase tracking-widest font-medium mb-3">Student results</p>
            <h2 className="text-4xl font-bold tracking-tight">
              Real scores. Real students.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "I went from a 1280 to a 1540 in 10 weeks. I'd been stuck at that score with two different tutors for a year. Apex found the exact patterns I was missing and drilled them until they were gone.",
                name: "Jordan T.",
                detail: "Junior · 1280 → 1540",
                initial: "J",
              },
              {
                quote: "My tutor was $180/hour and I was seeing her twice a week. I cancelled after my first month with Apex. The progress tracker alone showed me more about my weaknesses than six months of tutoring did.",
                name: "Maya S.",
                detail: "Senior · 1310 → 1500",
                initial: "M",
              },
              {
                quote: "I was targeting a 1500+ for Princeton. Apex got me to a 1560. The strategy coaching is what did it — I stopped making careless errors because I actually understood why I was making them.",
                name: "Aiden K.",
                detail: "Junior · 1390 → 1560",
                initial: "A",
              },
            ].map((t) => (
              <div key={t.name} className="bg-[#13132b] border border-white/10 rounded-2xl p-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-6">&quot;{t.quote}&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-bold text-sm">
                    {t.initial}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-white/30">{t.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING CALLOUT */}
      <section className="py-20 px-6 bg-[#13132b] border-y border-white/10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-amber-400 text-sm font-medium uppercase tracking-widest mb-3">Transparent pricing</p>
          <h2 className="text-4xl font-bold mb-4">
            $99/month.<br />
            <span className="text-white/50">What elite tutors charge per hour.</span>
          </h2>
          <p className="text-white/50 text-lg mb-4 max-w-xl mx-auto">
            The average elite SAT tutor charges $150–$250/hour. Apex gives you unlimited sessions, real-time adaptation, and a score improvement guarantee — for less than one hour of their time.
          </p>
          <p className="text-white/30 text-sm mb-10">
            Score improvement guaranteed or your money back.
          </p>
          <a
            href="#waitlist"
            className="inline-block bg-amber-500 text-[#0d0d1a] font-bold px-8 py-4 rounded-lg hover:bg-amber-400 transition-colors text-sm"
          >
            Join the Waitlist
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-white font-bold">apex</span>
          <div className="flex gap-6 text-sm text-white/30">
            <a href="/privacy" className="hover:text-white/60 transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-white/60 transition-colors">Terms of Service</a>
          </div>
          <p className="text-white/30 text-sm">© 2026 Superday LLC</p>
        </div>
      </footer>

    </main>
  );
}
