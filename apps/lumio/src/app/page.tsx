"use client";
import { createClient } from '@supabase/supabase-js'
import { useState, useEffect } from "react";

const colleges = [
  "Harvard University", "Duke University",
  "Northwestern University", "Johns Hopkins",
  "UCLA", "UC Berkeley", "University of Michigan", "NYU", "Boston College",
  "Tulane University",
];

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => (prev + 1) % (colleges.length * 200));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const { error } = await supabase
      .from('waitlist')
      .insert([{ email, site: 'lumio' }])

    if (error) {
      console.error(error)
      setErrorMsg("Something went wrong. Please try again.")
    } else {
      setEmail('')
      setErrorMsg(null)
      setSubmitted(true)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const w = window as any
      w.gtag?.('event', 'sign_up')
      w.fbq?.('track', 'Lead')
    }
  }

  return (
    <main className="min-h-screen bg-white font-sans">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/lumio-logo-192x192.png" alt="Lumio" className="w-8 h-8 rounded-lg" />
          <span className="text-xl font-bold tracking-tight text-gray-900">lumio</span>
        </div>
        
          <a href="#waitlist"
          className="bg-blue-600 text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-blue-700 transition-colors"
        >
          Get Early Access
        </a>
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-16 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT — copy */}
          <div>
            <div className="inline-block bg-blue-50 text-blue-600 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              AI-Powered SAT & ACT Prep
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 leading-tight tracking-tight mb-6">
              Better SAT scores.<br />
              Less than the cost of{" "}
              <span className="text-blue-600">one tutoring hour.</span>
            </h1>
            <p className="text-xl text-gray-500 mb-8 leading-relaxed">
              Lumio is an AI tutor that finds exactly what your child is missing, teaches it in a way that clicks, and adapts every session automatically — for $19/month.
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
                    className="flex-1 px-5 py-3 rounded-full border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-blue-700 transition-colors text-sm whitespace-nowrap"
                  >
                    Join the Waitlist
                  </button>
                </>
              ) : (
                <div className="w-full bg-blue-50 text-blue-700 font-medium px-6 py-3 rounded-full text-sm text-center">
                  You're on the list — we'll be in touch soon.
                </div>
              )}
            </form>
            {errorMsg && (
              <p className="text-red-500 text-xs mt-2">{errorMsg}</p>
            )}
            <p className="text-gray-400 text-xs mt-4">No credit card required. Cancel anytime.</p>
          </div>

          {/* RIGHT — mock UI */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 relative z-10">
              {/* Mock header */}
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Today's Session</p>
                  <p className="font-bold text-gray-900">SAT Math · Algebra</p>
                </div>
                <div className="bg-green-50 text-green-600 text-xs font-semibold px-3 py-1 rounded-full">
                  Active
                </div>
              </div>

              {/* Mock diagnostic */}
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Skill Breakdown</p>
                <div className="space-y-3">
                  {[
                    { label: "Linear Equations", pct: 91, color: "bg-green-400" },
                    { label: "Systems of Equations", pct: 74, color: "bg-blue-400" },
                    { label: "Quadratic Functions", pct: 43, color: "bg-yellow-400" },
                    { label: "Exponential Growth", pct: 28, color: "bg-red-400" },
                  ].map((skill) => (
                    <div key={skill.label}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-gray-600">{skill.label}</span>
                        <span className="text-xs font-semibold text-gray-700">{skill.pct}%</span>
                      </div>
                      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${skill.color} rounded-full`}
                          style={{ width: `${skill.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mock AI message */}
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-blue-700 mb-1">Lumio</p>
                    <p className="text-xs text-blue-800 leading-relaxed">
                      Exponential growth is your biggest opportunity right now. Let's work through the core concept before your next practice test — you can gain 40+ points here alone.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative blur blobs */}
            <div className="absolute -top-6 -right-6 w-48 h-48 bg-blue-100 rounded-full blur-3xl opacity-60 z-0" />
            <div className="absolute -bottom-6 -left-6 w-36 h-36 bg-indigo-100 rounded-full blur-3xl opacity-50 z-0" />
          </div>
        </div>
      </section>

      {/* SCROLLING COLLEGE TICKER */}
      <section className="py-10 border-y border-gray-100 overflow-hidden">
        <p className="text-center text-xs text-gray-400 uppercase tracking-widest font-medium mb-6">
          Students using Lumio have been accepted to
        </p>
        <div className="relative flex overflow-hidden">
          <div
            className="flex gap-12 whitespace-nowrap transition-none"
            style={{ transform: `translateX(-${offset}px)` }}
          >
            {[...colleges, ...colleges, ...colleges].map((college, i) => (
              <span key={i} className="text-gray-400 font-medium text-sm flex-shrink-0">
                {college}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">
            Everything a tutor does.<br />
            <span className="text-blue-600">At a fraction of the cost.</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            The average SAT tutor charges $80/hour. Lumio costs $19/month. Here's what you get.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-5">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Finds the gaps automatically</h3>
            <p className="text-gray-500 text-sm leading-relaxed">Lumio diagnoses exactly which concepts your child is missing — no lengthy intake form, no guessing. It knows within minutes.</p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-5">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Teaches, doesn't just quiz</h3>
            <p className="text-gray-500 text-sm leading-relaxed">Most prep apps throw questions at students. Lumio explains the concept, walks through the reasoning, and makes sure it actually sticks.</p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-5">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Available 24/7, not just Tuesdays</h3>
            <p className="text-gray-500 text-sm leading-relaxed">Your child can study at 10pm the night before a practice test. Lumio is always ready, never booked, never running late.</p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm text-gray-400 uppercase tracking-widest font-medium mb-3">What parents are saying</p>
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
              Real results for real families.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "My daughter was stuck at a 1180 for months. After 6 weeks with Lumio she scored a 1340. I genuinely didn't expect results this fast — and we were paying less than one session with her old tutor.",
                name: "Sarah M.",
                location: "Chicago, IL",
                initial: "S",
              },
              {
                quote: "We tried two different tutors before Lumio. Both were fine but neither could tell me exactly where Jake was struggling. Lumio showed me a breakdown after the first session. That alone was worth it.",
                name: "David R.",
                location: "Austin, TX",
                initial: "D",
              },
              {
                quote: "The ACT math section was killing my son's composite score. Lumio zeroed in on his weak areas in the first week. His math score went from a 24 to a 30 in two months. I tell every parent I know about this.",
                name: "Michelle K.",
                location: "Seattle, WA",
                initial: "M",
              },
            ].map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-6">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                    {t.initial}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-400">Parent · {t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING CALLOUT */}
      <section className="py-16 px-6 bg-blue-600">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-blue-200 text-sm font-medium uppercase tracking-widest mb-3">Simple pricing</p>
          <h2 className="text-4xl font-bold text-white mb-4">$19 per month.<br />Cancel anytime.</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
            No contracts. No hidden fees. Less than what most tutors charge for 15 minutes.
          </p>
          
            <a href="#waitlist"
            className="inline-block bg-white text-blue-600 font-bold px-8 py-4 rounded-full hover:bg-blue-50 transition-colors text-sm"
          >
            Join the Waitlist
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6 border-t border-gray-100">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-gray-900 font-bold">lumio</span>
          <p className="text-gray-400 text-sm">© 2026 Lumio. All rights reserved.</p>
        </div>
      </footer>

    </main>
  );
}