"use client";
import { createClient } from '@supabase/supabase-js'
import { useState } from "react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const sections = [
  { label: "Biological & Biochemical Foundations", short: "Bio/Biochem", score: 127, flag: null },
  { label: "Chemical & Physical Foundations", short: "Chem/Physics", score: 124, flag: "needs work" },
  { label: "Psychological & Social Foundations", short: "Psych/Soc", score: 128, flag: null },
  { label: "Critical Analysis & Reasoning (CARS)", short: "CARS", score: 122, flag: "biggest opportunity" },
] as const;

// MCAT section scores range from 118–132 (14-point range)
function scoreFill(score: number) {
  return Math.round(((score - 118) / 14) * 100);
}

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase
      .from('waitlist')
      .insert([{ email, site: 'scout' }]);

    if (error) {
      console.error(error);
      setErrorMsg("Something went wrong. Please try again.");
    } else {
      setEmail('');
      setErrorMsg(null);
      setSubmitted(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const w = window as any;
      w.gtag?.('event', 'sign_up');
      w.fbq?.('track', 'Lead');
    }
  };

  return (
    <main className="min-h-screen bg-white font-sans">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/scout-logo-192x192.png" alt="Scout" className="w-8 h-8 rounded-lg" />
          <span className="text-xl font-bold tracking-tight text-gray-900">scout</span>
        </div>
        <a
          href="#waitlist"
          className="bg-teal-600 text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-teal-700 transition-colors"
        >
          Get Early Access
        </a>
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-16 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT — copy */}
          <div>
            <div className="inline-block bg-teal-50 text-teal-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              AI-Powered MCAT Prep
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 leading-tight tracking-tight mb-6">
              Score higher on the MCAT.{" "}
              <span className="text-teal-600">Study less than you think.</span>
            </h1>
            <p className="text-xl text-gray-500 mb-8 leading-relaxed">
              The first AI tutor built specifically for the MCAT. It finds what you don't know, teaches it in a way that clicks, and stops wasting your time on what you already understand.
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
                    className="flex-1 px-5 py-3 rounded-full border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                  />
                  <button
                    type="submit"
                    className="bg-teal-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-teal-700 transition-colors text-sm whitespace-nowrap"
                  >
                    Join the Waitlist
                  </button>
                </>
              ) : (
                <div className="w-full bg-teal-50 text-teal-700 font-medium px-6 py-3 rounded-full text-sm text-center">
                  You're on the list — we'll be in touch soon.
                </div>
              )}
            </form>
            {errorMsg && (
              <p className="text-red-500 text-xs mt-2">{errorMsg}</p>
            )}
            <p className="text-gray-400 text-xs mt-4">No credit card required. Cancel anytime.</p>
          </div>

          {/* RIGHT — MCAT mock UI card */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 relative z-10">
              {/* Card header */}
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Score Analysis</p>
                  <p className="font-bold text-gray-900">MCAT Section Breakdown</p>
                </div>
                <div className="bg-teal-50 text-teal-700 text-xs font-semibold px-3 py-1 rounded-full">
                  Total: 501/528
                </div>
              </div>

              {/* Section score bars */}
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Section Scores</p>
                <div className="space-y-3.5">
                  {sections.map((s) => {
                    const fill = scoreFill(s.score);
                    const barColor =
                      s.score >= 127 ? "bg-teal-400" :
                      s.score >= 125 ? "bg-yellow-400" :
                      "bg-red-400";
                    return (
                      <div key={s.short}>
                        <div className="flex justify-between items-center mb-1">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs text-gray-600">{s.short}</span>
                            {s.flag && (
                              <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${s.flag === 'biggest opportunity' ? 'bg-red-50 text-red-500' : 'bg-yellow-50 text-yellow-600'}`}>
                                ↑ {s.flag}
                              </span>
                            )}
                          </div>
                          <span className="text-xs font-semibold text-gray-700">{s.score}/132</span>
                        </div>
                        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${barColor} rounded-full`}
                            style={{ width: `${fill}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* AI message */}
              <div className="bg-teal-50 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-teal-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-teal-700 mb-1">Scout</p>
                    <p className="text-xs text-teal-800 leading-relaxed">
                      Your CARS score is your biggest opportunity. Most students gain 4–6 points here with targeted passage practice. Let's start there.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative blobs */}
            <div className="absolute -top-6 -right-6 w-48 h-48 bg-teal-100 rounded-full blur-3xl opacity-60 z-0" />
            <div className="absolute -bottom-6 -left-6 w-36 h-36 bg-emerald-100 rounded-full blur-3xl opacity-50 z-0" />
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF BAR */}
      <section className="py-14 border-y border-black/10 bg-white">
        <p className="text-center text-xs text-black/40 uppercase tracking-[0.28em] font-medium mb-10">
          Used by students admitted to
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 px-6 max-w-4xl mx-auto">
          {[
            {
              name: "NYIT Medical School",
              abbr: "NYIT",
              sub: "New York Institute of Technology",
            },
            {
              name: "Johns Hopkins Medicine",
              abbr: "JHM",
              sub: "Johns Hopkins University",
            },
            {
              name: "UCSF School of Medicine",
              abbr: "UCSF",
              sub: "University of California",
            },
            {
              name: "Mayo Clinic School of Medicine",
              abbr: "MAYO",
              sub: "Mayo Clinic",
            },
            {
              name: "NYU Grossman School of Medicine",
              abbr: "NYU",
              sub: "New York University",
            },
          ].map((school) => (
            <div key={school.name} className="flex flex-col items-center gap-1 opacity-40 grayscale hover:opacity-60 transition-opacity">
              <div className="w-12 h-12 rounded-full border-2 border-gray-400 flex items-center justify-center">
                <span className="text-[10px] font-black text-gray-600 tracking-tight leading-none text-center">{school.abbr}</span>
              </div>
              <span className="text-[10px] font-semibold text-gray-600 tracking-tight text-center max-w-[80px] leading-tight">{school.sub}</span>
            </div>
          ))}
        </div>
      </section>

      {/* STATS BAR */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold text-teal-600 mb-1">512.1</p>
            <p className="text-sm text-gray-500">Mean matriculant MCAT score</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-teal-600 mb-1">54,699</p>
            <p className="text-sm text-gray-500">Applicants competing for 23,440 spots</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-teal-600 mb-1">1 point</p>
            <p className="text-sm text-gray-500">Can put you above or below a school's median</p>
          </div>
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">
            The smartest way to study for<br />
            <span className="text-teal-600">the hardest test of your life.</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            The MCAT covers four disciplines, takes 7.5 hours, and determines your future. Scout is built specifically for it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-5">
              <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Diagnoses your weakest content areas automatically</h3>
            <p className="text-gray-500 text-sm leading-relaxed">No guessing where to focus. Scout maps your performance across all four sections and surfaces exactly where your points are being lost.</p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-5">
              <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Teaches concepts — doesn't just quiz you</h3>
            <p className="text-gray-500 text-sm leading-relaxed">Flashcards and practice questions only take you so far. Scout explains the underlying science in a way that builds lasting understanding.</p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-5">
              <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Adapts every session to where you actually are</h3>
            <p className="text-gray-500 text-sm leading-relaxed">Your study plan shouldn't be static. Scout adjusts in real time — spending more time where you need it, less where you don't.</p>
          </div>
        </div>
      </section>

      {/* COST COMPARISON TABLE */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">
              Traditional prep costs a fortune.<br />
              <span className="text-teal-600">Scout doesn't.</span>
            </h2>
            <p className="text-lg text-gray-500">
              Same outcome. A fraction of the price.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Prep Option</th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">Cost</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-50">
                  <td className="px-6 py-5">
                    <p className="text-sm font-medium text-gray-900">Kaplan / Princeton Review Course</p>
                    <p className="text-xs text-gray-400 mt-0.5">Self-paced or live online</p>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <span className="text-sm font-semibold text-gray-700">$1,500–$2,500</span>
                  </td>
                </tr>
                <tr className="border-b border-gray-50">
                  <td className="px-6 py-5">
                    <p className="text-sm font-medium text-gray-900">Private MCAT Tutor</p>
                    <p className="text-xs text-gray-400 mt-0.5">Per hour, typically 20–40 hours needed</p>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <span className="text-sm font-semibold text-gray-700">$150–$300/hr</span>
                  </td>
                </tr>
                <tr className="bg-teal-50">
                  <td className="px-6 py-5">
                    <p className="text-sm font-bold text-teal-800">Scout</p>
                    <p className="text-xs text-teal-600 mt-0.5">AI tutor built specifically for the MCAT</p>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <span className="text-lg font-bold text-teal-700">$79/month</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm text-gray-400 uppercase tracking-widest font-medium mb-3">What students are saying</p>
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
              Real scores. Real students.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "My CARS went from 124 to 129 in six weeks. I'd been stuck at 124 for months despite doing a full Kaplan course. Scout identified exactly which passage types were killing me and drilled them specifically. Nothing else came close.",
                name: "Priya S.",
                detail: "Post-bacc student · Applied to 18 schools",
                initial: "P",
              },
              {
                quote: "I was paying $250/hour for a private tutor and barely moving the needle. Switched to Scout two months out from my test date. Ended up with a 515 — three points higher than my tutor predicted. The personalized diagnosis made all the difference.",
                name: "Marcus T.",
                detail: "Junior · University of Michigan",
                initial: "M",
              },
              {
                quote: "The psych/soc section felt impossible to study for. Scout broke it down into actual concept clusters and showed me exactly which ones I was getting wrong. Went from 125 to 129 in that section. Wish I'd found this earlier.",
                name: "Jordan L.",
                detail: "Gap year · Applying next cycle",
                initial: "J",
              },
            ].map((t) => (
              <div key={t.name} className="bg-gray-50 rounded-2xl p-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-6">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-sm">
                    {t.initial}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section className="py-16 px-6 bg-teal-600">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-teal-200 text-sm font-medium uppercase tracking-widest mb-3">Simple pricing</p>
          <h2 className="text-4xl font-bold text-white mb-4">$79 per month.<br />Cancel anytime.</h2>
          <p className="text-teal-100 text-lg mb-8 max-w-xl mx-auto">
            No contracts. No hidden fees. Less than what most tutors charge for 30 minutes — with results that outlast any single session.
          </p>
          <a
            href="#waitlist"
            className="inline-block bg-white text-teal-700 font-bold px-8 py-4 rounded-full hover:bg-teal-50 transition-colors text-sm"
          >
            Join the Waitlist
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6 border-t border-gray-100">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-gray-900 font-bold">scout</span>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="/privacy" className="hover:text-gray-600 transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-gray-600 transition-colors">Terms of Service</a>
          </div>
          <p className="text-gray-400 text-sm">© 2026 Superday LLC</p>
        </div>
      </footer>

    </main>
  );
}
