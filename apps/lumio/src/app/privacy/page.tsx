import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Lumio",
  description: "How Lumio and Superday LLC collect, use, and protect your information.",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <nav className="border-b border-gray-100 px-6 py-4 flex items-center justify-between max-w-4xl mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-blue-600 flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <span className="font-bold text-gray-900">lumio</span>
        </Link>
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">← Back to home</Link>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-400 mb-12">Last updated: May 26, 2026</p>

        <div className="prose prose-gray max-w-none space-y-10 text-gray-700 leading-relaxed">

          <p>
            This Privacy Policy describes how Superday LLC (&ldquo;Superday,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses, and shares information when you use <strong>Lumio</strong> (the &ldquo;Service&rdquo;). By using the Service, you agree to the practices described below.
          </p>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>

            <h3 className="text-base font-semibold text-gray-800 mb-2">Information you provide directly</h3>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li><strong>Email address</strong> — collected when you join our waitlist or create an account.</li>
              <li><strong>Payment information</strong> — collected when you subscribe to a paid plan. Card processing is handled by Stripe; we do not store full card numbers on our servers.</li>
              <li><strong>Profile information</strong> — name and other details you provide when setting up an account.</li>
            </ul>

            <h3 className="text-base font-semibold text-gray-800 mt-5 mb-2">Information collected automatically</h3>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li><strong>Usage data</strong> — pages visited, features used, session duration, and referring URLs.</li>
              <li><strong>Device and browser data</strong> — IP address, browser type, and operating system.</li>
              <li><strong>Cookies and tracking technologies</strong> — used by Google Analytics (GA4) and Meta (Facebook) Pixel to measure traffic and advertising effectiveness.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Operate, maintain, and improve the Service.</li>
              <li>Communicate with you about your account, updates, and offerings.</li>
              <li>Process payments and prevent fraud.</li>
              <li>Analyze usage patterns to improve user experience.</li>
              <li>Deliver and measure the effectiveness of advertising campaigns.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">3. How We Share Your Information</h2>
            <p className="text-sm mb-3">We do not sell your personal information. We share data only with:</p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li><strong>Supabase</strong> — database hosting and backend infrastructure.</li>
              <li><strong>Stripe</strong> — payment processing, subject to <a href="https://stripe.com/privacy" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">Stripe&apos;s Privacy Policy</a>.</li>
              <li><strong>Google</strong> — analytics via GA4, subject to <a href="https://policies.google.com/privacy" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">Google&apos;s Privacy Policy</a>.</li>
              <li><strong>Meta</strong> — advertising and analytics via Meta Pixel, subject to <a href="https://www.facebook.com/privacy/policy/" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">Meta&apos;s Privacy Policy</a>.</li>
              <li><strong>Law enforcement or government authorities</strong> — when required by applicable law or valid legal process.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">4. Children Under 13 — COPPA Notice</h2>
            <p className="text-sm mb-3">
              The Service is <strong>not directed to children under 13 years of age</strong>, and we do not knowingly collect personal information from anyone under 13. If you are a parent or guardian and believe your child under 13 has provided us with personal information, please contact us immediately at <a href="mailto:superday.outreach@gmail.com" className="text-blue-600 underline">superday.outreach@gmail.com</a>. We will delete that information promptly.
            </p>
            <p className="text-sm">
              Users between 13 and 17 years of age may use the Service only with verified parental or guardian consent.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">5. Data Retention</h2>
            <p className="text-sm">
              We retain your personal information for as long as your account is active or as needed to provide the Service. You may request deletion of your data at any time by contacting us (see Section 9). We may retain certain information as required by law or for legitimate business purposes such as fraud prevention.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">6. Your Privacy Rights</h2>
            <p className="text-sm mb-3">Depending on your jurisdiction, you may have the right to:</p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Access the personal information we hold about you.</li>
              <li>Correct inaccurate or incomplete information.</li>
              <li>Request deletion of your personal information.</li>
              <li>Opt out of marketing communications at any time (use the unsubscribe link in any email or contact us directly).</li>
            </ul>
            <p className="text-sm mt-3">To exercise any of these rights, contact us at <a href="mailto:superday.outreach@gmail.com" className="text-blue-600 underline">superday.outreach@gmail.com</a>.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">7. Security</h2>
            <p className="text-sm">
              We implement reasonable technical and organizational safeguards to protect your information. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">8. Third-Party Links</h2>
            <p className="text-sm">
              The Service may contain links to third-party websites. We are not responsible for the content or privacy practices of those sites and encourage you to review their privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">9. No Guarantees — Educational Support Tool Only</h2>
            <p className="text-sm mb-3">
              Lumio is an educational support tool and AI-assistance platform. Superday LLC makes no guarantee, representation, or warranty — express or implied — that use of the Service will result in any improvement in standardized test scores (including SAT or ACT scores), academic performance, admission to any educational program, or employment opportunities. See our <a href="/terms" className="text-blue-600 underline">Terms of Service</a> for the full disclaimer.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">10. Changes to This Policy</h2>
            <p className="text-sm">
              We may update this Privacy Policy periodically. We will notify you of material changes by updating the &ldquo;Last updated&rdquo; date at the top of this page or by sending an email to the address associated with your account. Continued use of the Service after changes are posted constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">11. Contact Us</h2>
            <p className="text-sm">
              If you have questions or concerns about this Privacy Policy, please contact us:
            </p>
            <div className="mt-3 text-sm bg-gray-50 rounded-xl p-5">
              <p className="font-semibold text-gray-900">Superday LLC</p>
              <p className="text-gray-600">New York, NY</p>
              <p><a href="mailto:superday.outreach@gmail.com" className="text-blue-600 underline">superday.outreach@gmail.com</a></p>
            </div>
          </section>

        </div>
      </main>

      <footer className="border-t border-gray-100 py-8 px-6">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-bold text-gray-900">lumio</span>
          <div className="flex gap-6 text-sm text-gray-400">
            <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
            <Link href="/privacy" className="hover:text-gray-600 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-600 transition-colors">Terms of Service</Link>
          </div>
          <p className="text-sm text-gray-400">© 2026 Superday LLC</p>
        </div>
      </footer>
    </div>
  );
}
