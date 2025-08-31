// app/privacy/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const CANONICAL_ORIGIN =
  process.env.NEXT_PUBLIC_CANONICAL_ORIGIN || "https://theschoolofoptions.com";

export const metadata: Metadata = {
  title: "Privacy Policy - The School of Options",
  description:
    "Privacy Policy explaining how The School of Options collects, uses, and protects your personal information in accordance with Indian law.",
  metadataBase: new URL(CANONICAL_ORIGIN),
  alternates: {
    canonical: "/privacy",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-navy mb-8">
          Privacy Policy
        </h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">
            <strong>Last updated:</strong> August 31, 2025
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <p className="text-blue-800 font-semibold mb-2">
              🔒 Privacy Notice
            </p>
            <p className="text-blue-700">
              The School of Options (“we,” “our,” or “us”) values your privacy.
              This Privacy Policy explains how we collect, use, store, share,
              and protect personal information when you use{" "}
              <a
                href="https://theschoolofoptions.com"
                target="_blank"
                rel="noreferrer"
              >
                theschoolofoptions.com
              </a>{" "}
              and our services (“Services”). This Policy is designed to comply
              with the Information Technology Act, 2000, the Information
              Technology (Reasonable Security Practices and Procedures and
              Sensitive Personal Data or Information) Rules, 2011 (“SPDI
              Rules”), and the Digital Personal Data Protection Act, 2023 (“DPDP
              Act”).
            </p>
          </div>

          {/* 1. Who We Are */}
          <section id="who-we-are" className="mb-10">
            <h2 className="text-2xl font-bold text-navy mb-4">
              1) Who We Are & Contact Information
            </h2>
            <p className="text-gray-700 mb-4">
              The School of Options is an educational platform providing
              training and mentorship in options trading. For privacy-related
              queries, you may contact:
            </p>
            <ul className="list-disc pl-6">
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
              <li>
                <strong>Postal Address:</strong> Corporate office: 1203, 12th
                FLOOR, Arcadia, South City II, Sector 49, Gurugram,Haryana
                122018
              </li>
              <li>
                <strong>Grievance Officer (as per IT Rules, 2021):</strong>
                Name: Kundan Kishore Email: kundan@theschoolofoptions.com
              
              </li>
            </ul>
          </section>

          {/* 2. Scope */}
          <section id="scope" className="mb-10">
            <h2 className="text-2xl font-bold text-navy mb-4">2) Scope</h2>
            <p className="text-gray-700">
              This Privacy Policy applies to personal information collected
              through our Site and Services. It does not apply to third-party
              websites, tools, or services that we do not control.
            </p>
          </section>

          {/* 3. Information We Collect */}
          <section id="info-we-collect" className="mb-10">
            <h2 className="text-2xl font-bold text-navy mb-4">
              3) Information We Collect
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Basic identifiers:</strong> name, email, phone, postal
                address.
              </li>
              <li>
                <strong>Account & transaction data:</strong> enrollment details,
                payment details (processed by secure third-party payment
                gateways).
              </li>
              <li>
                <strong>Sensitive personal data (as per SPDI Rules):</strong>{" "}
                passwords, financial information (bank account/card numbers, if
                provided), and other information classified under Indian law.
              </li>
              <li>
                <strong>Device & usage data:</strong> IP address, browser type,
                device information, and website interaction data via cookies.
              </li>
            </ul>
          </section>

          {/* 4. Purpose */}
          <section id="use-of-info" className="mb-10">
            <h2 className="text-2xl font-bold text-navy mb-4">
              4) Purpose of Use
            </h2>
            <p className="text-gray-700 mb-3">
              We process your personal information for:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Providing and improving our Services.</li>
              <li>Processing transactions and maintaining accounts.</li>
              <li>Sending educational material, updates, and newsletters.</li>
              <li>Complying with legal obligations under Indian law.</li>
              <li>
                Ensuring security, fraud prevention, and dispute resolution.
              </li>
              <li>Marketing, with your explicit consent where required.</li>
            </ul>
          </section>

          {/* 5. Disclosure */}
          <section id="sharing" className="mb-10">
            <h2 className="text-2xl font-bold text-navy mb-4">
              5) Disclosure of Information
            </h2>
            <p className="text-gray-700">
              We do not sell or rent your personal information. We may disclose
              information:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                To service providers (payment gateways, cloud hosting, email
                services) bound by confidentiality.
              </li>
              <li>
                To comply with legal or regulatory requirements under Indian
                law.
              </li>
              <li>
                In case of mergers, acquisitions, or restructuring, subject to
                confidentiality.
              </li>
            </ul>
          </section>

          {/* 6. Data Security */}
          <section id="security" className="mb-10">
            <h2 className="text-2xl font-bold text-navy mb-4">
              6) Data Security
            </h2>
            <p className="text-gray-700">
              In accordance with Section 43A of the IT Act and the SPDI Rules,
              we implement reasonable security practices (such as ISO/IEC 27001
              compliance or equivalent standards) to protect your personal data.
              However, no system is entirely secure, and we cannot guarantee
              absolute protection.
            </p>
          </section>

          {/* 7. Data Retention */}
          <section id="retention" className="mb-10">
            <h2 className="text-2xl font-bold text-navy mb-4">
              7) Data Retention
            </h2>
            <p className="text-gray-700">
              We retain personal information only as long as necessary for the
              purposes outlined above, or as required under applicable Indian
              law (e.g., tax or regulatory requirements).
            </p>
          </section>

          {/* 8. Your Rights under Indian Law */}
          <section id="rights" className="mb-10">
            <h2 className="text-2xl font-bold text-navy mb-4">
              8) Your Rights
            </h2>
            <p className="text-gray-700 mb-3">
              Under the DPDP Act, 2023 and SPDI Rules, you have the following
              rights:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Right to access your personal data.</li>
              <li>
                Right to correction and erasure of inaccurate information.
              </li>
              <li>
                Right to withdraw consent for processing (does not affect prior
                lawful processing).
              </li>
              <li>
                Right to nominate another individual to exercise rights in case
                of incapacity or death (as per DPDP Act).
              </li>
              <li>
                Right to grievance redressal by contacting our Grievance
                Officer.
              </li>
            </ul>
          </section>

          {/* 9. Children’s Privacy */}
          <section id="children" className="mb-10">
            <h2 className="text-2xl font-bold text-navy mb-4">
              9) Children’s Privacy
            </h2>
            <p className="text-gray-700">
              We do not knowingly collect personal information from children
              below 18 years, in line with the DPDP Act, 2023. If you are a
              parent/guardian and believe your child has provided data, please
              contact us for deletion.
            </p>
          </section>

          {/* 10. Changes */}
          <section id="changes" className="mb-10">
            <h2 className="text-2xl font-bold text-navy mb-4">
              10) Changes to this Policy
            </h2>
            <p className="text-gray-700">
              We may update this Privacy Policy periodically. Material changes
              will be notified via email or on this page with the revised date.
            </p>
          </section>

          {/* 11. Contact */}
          <section id="contact" className="mb-10">
            <h2 className="text-2xl font-bold text-navy mb-4">
              11) Contact & Grievance Redressal
            </h2>
            <p className="text-gray-700">
              If you have any questions about this Policy, or wish to file a
              complaint regarding personal data handling, please contact our
              Grievance Officer at:{" "}
              <a href="mailto:kundan@theschoolofoptions.com">
                kundan@theschoolofoptions.com
              </a>
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
