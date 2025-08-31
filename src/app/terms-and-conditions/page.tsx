// app/terms/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const CANONICAL_ORIGIN =
  process.env.NEXT_PUBLIC_CANONICAL_ORIGIN || "https://theschoolofoptions.com";

export const metadata: Metadata = {
  title: "Terms of Service - The School of Options",
  description:
    "Terms and conditions governing access to The School of Options educational content and services (India).",
  metadataBase: new URL(CANONICAL_ORIGIN),
  alternates: {
    canonical: "/terms",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <Link
            href="/"
            className="inline-flex items-center text-navy hover:text-accent transition-colors text-sm sm:text-base"
          >
            <ArrowLeftIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-navy mb-8">
          Terms of Service
        </h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">
            <strong>Last updated:</strong> August 31, 2025
          </p>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <p className="text-yellow-800 font-semibold mb-2">
              ⚠️ Important Disclosures (India)
            </p>
            <ul className="list-disc pl-6 text-yellow-900">
              <li>
                <strong>Educational Purpose Only.</strong> The School of Options
                (“we”, “our”, “us”) provides general, impersonal educational
                content and training. We do <em>not</em> provide investment
                advice, portfolio management, research analyst services, or
                broking services.
              </li>
              <li>
                <strong>SEBI Compliance.</strong> We are <em>not</em> registered
                with the Securities and Exchange Board of India (“SEBI”) as an
                investment adviser or research analyst. Nothing on the Site
                constitutes “investment advice” or “recommendations” under the
                SEBI (Investment Advisers) Regulations, 2013 or the SEBI
                (Research Analysts) Regulations, 2014.
              </li>
              <li>
                <strong>Trading Risk.</strong> Options/derivatives are high risk
                and may result in loss of capital. Past performance is not
                indicative of future results. Seek advice from a SEBI-registered
                professional before making investment decisions.
              </li>
            </ul>
          </div>

          {/* TOC */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
            <h2 id="toc" className="text-xl font-semibold text-navy mb-3">
              Table of Contents
            </h2>
            <ol className="list-decimal pl-6 space-y-1">
              <li>
                <Link href="#acceptance">Agreement & Acceptance</Link>
              </li>
              <li>
                <Link href="#about">About Us & Contact</Link>
              </li>
              <li>
                <Link href="#eligibility">Eligibility & Account</Link>
              </li>
              <li>
                <Link href="#educational">Educational Content; No Advice</Link>
              </li>
              <li>
                <Link href="#conduct">Acceptable Use</Link>
              </li>
              <li>
                <Link href="#subscriptions">
                  Subscriptions, Pricing, Taxes & Refunds
                </Link>
              </li>
              <li>
                <Link href="#payments">Payments & Billing</Link>
              </li>
              <li>
                <Link href="#ip">Intellectual Property & Licence</Link>
              </li>
              <li>
                <Link href="#ugc">User Content & Takedowns</Link>
              </li>
              <li>
                <Link href="#thirdparty">Third-Party Services & Links</Link>
              </li>
              <li>
                <Link href="#privacy">Privacy & Data Protection (India)</Link>
              </li>
              <li>
                <Link href="#disclaimers">Disclaimers</Link>
              </li>
              <li>
                <Link href="#liability">Limitation of Liability</Link>
              </li>
              <li>
                <Link href="#indemnity">Indemnity</Link>
              </li>
              <li>
                <Link href="#suspension">Suspension & Termination</Link>
              </li>
              <li>
                <Link href="#law">
                  Governing Law; Dispute Resolution; Arbitration
                </Link>
              </li>
              <li>
                <Link href="#changes">Changes to Services or Terms</Link>
              </li>
              <li>
                <Link href="#misc">Miscellaneous</Link>
              </li>
              <li>
                <Link href="#grievance">Grievance Officer (IT Rules)</Link>
              </li>
              <li>
                <Link href="#contact">Contact Us</Link>
              </li>
            </ol>
          </div>

          <section id="acceptance" className="mb-10">
            <h2 className="text-2xl font-bold text-navy mb-4">
              1) Agreement & Acceptance
            </h2>
            <p className="text-gray-700">
              These Terms constitute a legally binding agreement under the
              Indian Contract Act, 1872 between you and The School of Options
              governing access to{" "}
              <a
                href="https://theschoolofoptions.com"
                target="_blank"
                rel="noreferrer"
              >
                theschoolofoptions.com
              </a>{" "}
              and our related content, courses, mentorship and tools
              (collectively, the “Services”). By accessing or using the Services
              (including by clicking “I Agree”, creating an account, enrolling
              in a course, or continuing to use the Site), you accept and agree
              to be bound by these Terms and our Privacy Policy. If you do not
              agree, do not use the Services.
            </p>
          </section>

          <section id="about" className="mb-10">
            <h2 className="text-2xl font-bold text-navy mb-4">
              2) About Us & Contact
            </h2>
            <ul className="list-disc pl-6 text-gray-700">
              <li>
                <strong>Entity:</strong> WEALTHIAN PVT. LTD
              </li>
              <li>
                <strong>CIN :</strong> U74140HR2021PTC093753
              </li>
              <li>
                <strong>Registered Office:</strong> Corporate office: 1203, 12th
                FLOOR, Arcadia, South City II, Sector 49, Gurugram,Haryana
                122018
              </li>
              <li>
                <strong>Email:</strong>{" "}
                <a href="mailto:support@theschoolofoptions.com">
                  support@theschoolofoptions.com
                </a>
              </li>
              <li>
                <strong>Website:</strong>{" "}
                <a
                  href="https://theschoolofoptions.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  theschoolofoptions.com
                </a>
              </li>
            </ul>
          </section>

          <section id="eligibility" className="mb-10">
            <h2 className="text-2xl font-bold text-navy mb-4">
              3) Eligibility & Account
            </h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>
                You must be at least 18 years old (or the age of majority in
                your state) and legally competent.
              </li>
              <li>
                You are responsible for your account, credentials, and all
                activities under it; keep them confidential.
              </li>
              <li>
                Provide accurate, current information and update it as needed.
              </li>
              <li>
                We may refuse, suspend, or terminate accounts at our discretion
                as permitted by law.
              </li>
            </ul>
          </section>

          <section id="educational" className="mb-10">
            <h2 className="text-2xl font-bold text-navy mb-4">
              4) Educational Content; No Advice (SEBI)
            </h2>
            <p className="text-gray-700">
              The Services are for general education. We do not consider your
              objectives, financial situation, or needs. Content does not
              constitute investment advice, research reports, order execution,
              or portfolio management. We do not solicit or facilitate trades.
              Before acting, consult licensed/SEBI-registered advisers.
            </p>
          </section>

          <section id="conduct" className="mb-10">
            <h2 className="text-2xl font-bold text-navy mb-4">
              5) Acceptable Use
            </h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>
                No unlawful, harmful, defamatory, obscene, or infringing
                content.
              </li>
              <li>
                No attempts to circumvent security, scrape, reverse engineer, or
                overload the Services.
              </li>
              <li>
                No unauthorised commercial use, reselling, or redistribution of
                our content.
              </li>
              <li>
                Comply with applicable law (including SEBI, RBI, income tax, and
                exchange laws).
              </li>
            </ul>
          </section>

          <section id="subscriptions" className="mb-10">
            <h2 className="text-2xl font-bold text-navy mb-4">
              6) Subscriptions, Pricing, Taxes & Refunds
            </h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>
                Pricing and features are listed on the Site and may change
                prospectively.
              </li>
              <li>
                Taxes (including GST) are additional unless expressly stated.
                Tax invoices will be issued where required.
              </li>
              <li>
                Auto-renewing subscriptions (if offered) renew for successive
                terms unless cancelled before renewal.
              </li>
              <li>
                Refunds: Unless a specific course/promo page states otherwise,
                fees are non-refundable once access is granted. We may offer
                discretionary credits consistent with the Consumer Protection
                Act, 2019, and our refund policy page.
              </li>
            </ul>
          </section>

          <section id="payments" className="mb-10">
            <h2 className="text-2xl font-bold text-navy mb-4">
              7) Payments & Billing
            </h2>
            <p className="text-gray-700">
              Payments are processed by third-party payment gateways compliant
              with applicable RBI regulations (e.g., tokenisation/PCI DSS). You
              authorise us and our processors to charge your selected payment
              method for all purchases and renewals. You represent you are
              authorised to use that method.
            </p>
          </section>

          <section id="ip" className="mb-10">
            <h2 className="text-2xl font-bold text-navy mb-4">
              8) Intellectual Property & Limited Licence
            </h2>
            <p className="text-gray-700">
              The Services, including text, videos, course materials, logos, and
              software, are owned by us or our licensors and protected by Indian
              copyright, trademark and other laws. We grant you a limited,
              non-exclusive, non-transferable, revocable licence for personal,
              non-commercial educational use only. Any other use requires our
              prior written consent.
            </p>
          </section>

          <section id="ugc" className="mb-10">
            <h2 className="text-2xl font-bold text-navy mb-4">
              9) User Content & Takedowns
            </h2>
            <p className="text-gray-700 mb-2">
              If you submit content (comments, assignments, testimonials), you
              grant us a worldwide, royalty-free, sublicensable licence to use,
              reproduce, display, and create derivative works for operating and
              improving the Services and for marketing (with your consent where
              required). Do not upload others’ copyrighted or illegal content.
              We may remove content alleged to infringe the Copyright Act, 1957
              or violate law/these Terms. You can send takedown requests to the
              Grievance Officer.
            </p>
          </section>

          <section id="thirdparty" className="mb-10">
            <h2 className="text-2xl font-bold text-navy mb-4">
              10) Third-Party Services & Links
            </h2>
            <p className="text-gray-700">
              Third-party tools (e.g., video hosting, analytics, email) and
              external links are provided for convenience. We are not
              responsible for their availability, accuracy, or practices. Their
              terms and privacy policies govern your use of those services.
            </p>
          </section>

          <section id="privacy" className="mb-10">
            <h2 className="text-2xl font-bold text-navy mb-4">
              11) Privacy & Data Protection (India)
            </h2>
            <p className="text-gray-700">
              Our handling of personal data is described in our{" "}
              <Link href="/privacy-policy" className="text-accent underline">
                Privacy Policy
              </Link>
              , drafted to align with the Information Technology Act, 2000, the
              SPDI Rules 2011, and the Digital Personal Data Protection Act,
              2023 (when brought into force). By using the Services, you consent
              to processing in accordance with that policy.
            </p>
          </section>

          <section id="disclaimers" className="mb-10">
            <h2 className="text-2xl font-bold text-navy mb-4">
              12) Disclaimers
            </h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>
                Services are provided on an “as is” and “as available” basis
                without warranties of any kind.
              </li>
              <li>
                We do not warrant accuracy, completeness, or timeliness of
                content, or that results will meet your needs.
              </li>
              <li>
                We do not guarantee uninterrupted, secure, or error-free
                operation.
              </li>
            </ul>
          </section>

          <section id="liability" className="mb-10">
            <h2 className="text-2xl font-bold text-navy mb-4">
              13) Limitation of Liability
            </h2>
            <p className="text-gray-700">
              To the maximum extent permitted by applicable law, in no event
              will we be liable for any indirect, incidental, special,
              consequential, exemplary or punitive damages, or for loss of
              profits, revenue, data, goodwill, or business interruption,
              arising from or related to the Services or these Terms, even if
              advised of the possibility. Our aggregate liability for all claims
              arising in a contract year will not exceed the fees you paid to us
              for the Services during the twelve (12) months prior to the event
              giving rise to the claim. Some limitations may not apply to you
              under certain laws.
            </p>
          </section>

          <section id="indemnity" className="mb-10">
            <h2 className="text-2xl font-bold text-navy mb-4">14) Indemnity</h2>
            <p className="text-gray-700">
              You agree to indemnify and hold us, our directors, employees, and
              affiliates harmless from claims, damages, liabilities, costs, and
              expenses (including reasonable legal fees) arising out of your
              breach of these Terms, violation of law, or
              infringement/misappropriation of third-party rights.
            </p>
          </section>

          <section id="suspension" className="mb-10">
            <h2 className="text-2xl font-bold text-navy mb-4">
              15) Suspension & Termination
            </h2>
            <p className="text-gray-700">
              We may suspend or terminate access (with or without notice) for
              violations of these Terms, unlawful conduct, or to protect users
              or our systems. Upon termination, licences cease and you must
              discontinue use. Sections intended to survive (e.g., IP, payments
              due, disclaimers, liability limits, indemnity, dispute resolution)
              will survive.
            </p>
          </section>

          <section id="law" className="mb-10">
            <h2 className="text-2xl font-bold text-navy mb-4">
              16) Governing Law; Dispute Resolution; Arbitration
            </h2>
            <p className="text-gray-700 mb-3">
              These Terms are governed by the laws of India. Prior to formal
              proceedings, the parties shall attempt good-faith resolution by
              written notice and a 30-day negotiation period.
            </p>
            <p className="text-gray-700 mb-3">
              Any dispute not resolved shall be referred to binding arbitration
              under the Arbitration and Conciliation Act, 1996. The tribunal
              shall consist of a sole arbitrator appointed in accordance with
              the said Act. The
              <strong> seat and venue</strong> of arbitration shall be{" "}
              <strong>Bengaluru, Karnataka, India</strong>. The proceedings
              shall be conducted in English. The award shall be final and
              binding.
            </p>
            <p className="text-gray-700">
              Courts at <strong>Bengaluru, Karnataka</strong> shall have
              exclusive jurisdiction for applications under the Act and for
              injunctive or equitable relief. Nothing prevents either party from
              seeking interim relief from competent courts.
            </p>
          </section>

          <section id="changes" className="mb-10">
            <h2 className="text-2xl font-bold text-navy mb-4">
              17) Changes to Services or Terms
            </h2>
            <p className="text-gray-700">
              We may modify the Services or these Terms prospectively. Material
              changes will be notified on this page (and/or by email where
              feasible). Continued use after changes constitutes acceptance of
              the revised Terms.
            </p>
          </section>

          <section id="misc" className="mb-10">
            <h2 className="text-2xl font-bold text-navy mb-4">
              18) Miscellaneous
            </h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>
                <strong>Entire Agreement.</strong> These Terms and referenced
                policies are the complete agreement.
              </li>
              <li>
                <strong>Severability.</strong> If any provision is
                unenforceable, the remainder remains in effect.
              </li>
              <li>
                <strong>No Waiver.</strong> Failure to enforce is not a waiver.
              </li>
              <li>
                <strong>Assignment.</strong> You may not assign without our
                consent; we may assign in connection with a reorganisation or
                sale.
              </li>
              <li>
                <strong>Force Majeure.</strong> We are not liable for
                delays/failures due to events beyond reasonable control.
              </li>
              <li>
                <strong>Electronic Communications.</strong> You consent to
                receive communications electronically.
              </li>
            </ul>
          </section>

          <section id="grievance" className="mb-10">
            <h2 className="text-2xl font-bold text-navy mb-4">
              19) Grievance Officer (IT Rules)
            </h2>
            <p className="text-gray-700">
              In accordance with the Information Technology (Intermediary
              Guidelines and Digital Media Ethics Code) Rules, 2021 and other
              applicable IT Rules, the Grievance Officer is:
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>
                <strong>Name:</strong> Kundan Kishore
              </li>
              <li>
                <strong>Email:</strong>{" "}
                <a href="mailto:kundan@theschoolofoptions.com">
                  kundan@theschoolofoptions.com
                </a>
              </li>
              <li>
                <strong>Address:</strong> Corporate office: 1203, 12th FLOOR,
                Arcadia, South City II, Sector 49, Gurugram,Haryana 122018
              </li>
              <li>
                <strong>Response Timelines:</strong> We acknowledge complaints
                within 24–48 hours and aim to resolve within 15 days, subject to
                law.
              </li>
            </ul>
          </section>

          <section id="contact" className="mb-10">
            <h2 className="text-2xl font-bold text-navy mb-4">
              20) Contact Us
            </h2>
            <p className="text-gray-700">
              For any questions about these Terms, write to{" "}
              <a href="mailto:support@theschoolofoptions.com">
                support@theschoolofoptions.com
              </a>{" "}
              or the postal address listed above.
            </p>
          </section>

         
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="text-center">
            <Link
              href="/"
              className="inline-flex items-center bg-navy text-white px-6 py-3 rounded-lg font-semibold hover:bg-navy-light transition-colors"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
