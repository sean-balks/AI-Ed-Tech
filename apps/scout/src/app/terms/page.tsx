import Link from "next/link";

export const metadata = {
  title: "Terms of Service | Scout",
  description: "Terms governing your use of Scout, operated by Superday LLC.",
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <nav className="border-b border-gray-100 px-6 py-4 flex items-center justify-between max-w-4xl mx-auto">
        <Link href="/" className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/scout-logo-192x192.png" alt="Scout" className="w-7 h-7 rounded-md" />
          <span className="font-bold text-gray-900">scout</span>
        </Link>
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">← Back to home</Link>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Terms of Service</h1>
        <p className="text-sm text-gray-400 mb-12">Last updated: May 26, 2026</p>

        <div className="space-y-10 text-gray-700 leading-relaxed">

          <p className="text-sm">
            These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of <strong>Scout</strong> (the &ldquo;Service&rdquo;), operated by Superday LLC (&ldquo;Superday,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). By accessing or using the Service, you agree to be bound by these Terms. If you do not agree, do not use the Service.
          </p>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">1. Eligibility</h2>
            <p className="text-sm mb-3">
              <strong>You must be at least 13 years of age to use the Service.</strong> We do not knowingly permit children under 13 to create accounts or use the Service, in compliance with the Children&apos;s Online Privacy Protection Act (COPPA).
            </p>
            <p className="text-sm">
              If you are between 13 and 17 years of age, you may only use the Service with the consent and involvement of a parent or legal guardian, who agrees to these Terms on your behalf and accepts responsibility for your use of the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">2. User Accounts</h2>
            <p className="text-sm mb-3">You may be required to create an account to access certain features. You agree to:</p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Provide accurate and complete information when creating your account.</li>
              <li>Keep your login credentials confidential.</li>
              <li>Be responsible for all activity that occurs under your account.</li>
              <li>Notify us immediately at <a href="mailto:superday.outreach@gmail.com" className="text-teal-600 underline">superday.outreach@gmail.com</a> if you suspect unauthorized access.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">3. Subscriptions and Payment</h2>
            <p className="text-sm mb-3">
              Scout is offered on a subscription basis at <strong>$79/month</strong>. By subscribing, you authorize Superday to charge your payment method on a recurring monthly basis until you cancel.
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>You may cancel your subscription at any time. Cancellation takes effect at the end of the current billing period.</li>
              <li>All fees are non-refundable except as required by applicable law.</li>
              <li>We reserve the right to change pricing with reasonable advance notice.</li>
              <li>Payment processing is handled by Stripe. By providing payment information, you also agree to <a href="https://stripe.com/legal" className="text-teal-600 underline" target="_blank" rel="noopener noreferrer">Stripe&apos;s Terms of Service</a>.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">4. Acceptable Use</h2>
            <p className="text-sm mb-3">You agree not to:</p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Use the Service if you are under 13 years of age.</li>
              <li>Use the Service for any unlawful purpose or in violation of any applicable laws.</li>
              <li>Attempt to reverse engineer, scrape, copy, or resell any part of the Service.</li>
              <li>Share your account credentials with any third party.</li>
              <li>Interfere with or disrupt the Service or servers or networks connected to the Service.</li>
              <li>Infringe on any third party&apos;s intellectual property or privacy rights.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">5. Intellectual Property</h2>
            <p className="text-sm">
              All content, features, and functionality of the Service — including but not limited to text, graphics, logos, AI-generated content, and software — are owned by Superday LLC and are protected by applicable copyright, trademark, and other intellectual property laws. You may not copy, reproduce, distribute, or create derivative works from any part of the Service without our prior written consent.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">6. Disclaimers and No Guarantees</h2>
            <p className="text-sm mb-3 uppercase font-medium text-gray-500 text-xs tracking-wide">Please read this section carefully.</p>
            <p className="text-sm mb-3">
              THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED OR ERROR-FREE.
            </p>
            <p className="text-sm mb-4 font-medium text-gray-800">
              Scout is an educational support tool and AI-assistance platform. It is not a licensed tutoring service, school, or accredited educational institution.
            </p>
            <p className="text-sm mb-3">Superday LLC makes no guarantee, representation, or warranty — express or implied — regarding:</p>
            <ul className="list-disc pl-6 space-y-1.5 text-sm mb-4">
              <li><strong>Standardized test scores.</strong> Use of the Service does not guarantee any improvement in MCAT scores or any other standardized test scores.</li>
              <li><strong>Academic performance.</strong> The Service does not guarantee improved grades, GPA, class rank, or any other measure of academic achievement.</li>
              <li><strong>Admissions outcomes.</strong> The Service does not guarantee admission to any medical school, graduate program, professional school, or other academic program of any kind.</li>
              <li><strong>Employment opportunities.</strong> The Service does not guarantee any employment outcome, job offer, career advancement, or professional opportunity.</li>
            </ul>
            <p className="text-sm text-gray-600">
              Any testimonials, score improvements, or student outcomes referenced on our website reflect individual experiences and are not typical or guaranteed results. Individual results will vary based on effort, prior preparation, time invested, and many other factors outside our control.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">7. Limitation of Liability</h2>
            <p className="text-sm">
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, SUPERDAY LLC SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES (INCLUDING LOSS OF PROFITS, DATA, OR GOODWILL) ARISING OUT OF OR RELATED TO YOUR USE OF OR INABILITY TO USE THE SERVICE. IN NO EVENT SHALL OUR TOTAL AGGREGATE LIABILITY EXCEED THE GREATER OF (A) THE AMOUNTS YOU PAID US IN THE TWELVE MONTHS PRIOR TO THE CLAIM OR (B) ONE HUNDRED DOLLARS ($100).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">8. Indemnification</h2>
            <p className="text-sm">
              You agree to indemnify, defend, and hold harmless Superday LLC and its officers, directors, employees, and agents from any claims, liabilities, damages, losses, and expenses (including reasonable attorney&apos;s fees) arising out of your use of the Service, your violation of these Terms, or your violation of any third-party rights.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">9. Governing Law and Dispute Resolution</h2>
            <p className="text-sm">
              These Terms are governed by and construed in accordance with the laws of the State of New York, without regard to its conflict of law principles. Any dispute arising under or related to these Terms shall be resolved exclusively in the state or federal courts located in New York, and you consent to the personal jurisdiction of such courts.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">10. Changes to These Terms</h2>
            <p className="text-sm">
              We reserve the right to modify these Terms at any time. We will notify you of material changes by updating the &ldquo;Last updated&rdquo; date above and, where appropriate, by email. Continued use of the Service following the effective date of any changes constitutes your acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">11. Contact Us</h2>
            <p className="text-sm">If you have questions about these Terms, please contact us:</p>
            <div className="mt-3 text-sm bg-gray-50 rounded-xl p-5">
              <p className="font-semibold text-gray-900">Superday LLC</p>
              <p className="text-gray-600">New York, NY</p>
              <p><a href="mailto:superday.outreach@gmail.com" className="text-teal-600 underline">superday.outreach@gmail.com</a></p>
            </div>
          </section>

        </div>
      </main>

      <footer className="border-t border-gray-100 py-8 px-6">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-bold text-gray-900">scout</span>
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
