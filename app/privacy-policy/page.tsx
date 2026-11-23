import { type Metadata } from "next";
import Link from "next/link";
import {
  OG_IMAGES,
  OG_LOCALE,
  SITE_NAME,
  absoluteUrl,
} from "@/constants/seo-constants";

const TITLE = "Privacy Policy";
const DESCRIPTION =
  "Privacy policy for VELNARO, covering how we collect, use, and protect your information.";

export const metadata: Metadata = {
  title: { absolute: `${TITLE} | ${SITE_NAME}` },
  description: DESCRIPTION,
  alternates: {
    canonical: "/privacy-policy",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: absoluteUrl("/privacy-policy"),
    siteName: SITE_NAME,
    title: `${TITLE} | ${SITE_NAME}`,
    description: DESCRIPTION,
    locale: OG_LOCALE,
    images: OG_IMAGES,
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | ${SITE_NAME}`,
    description: DESCRIPTION,
    images: OG_IMAGES,
  },
};

export default function PrivacyPolicy(): React.ReactElement {
  return (
    <section className="py-24 md:py-32 bg-ivory text-graphite">
      <div className="max-w-4xl mx-auto px-4">
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 text-sm text-muted hover:text-deep-teal"
        >
          <span aria-hidden>←</span> Back to VELNARO
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-graphite mb-12">Privacy Policy</h1>

        <h2 className="text-2xl font-semibold text-graphite mb-8">Operator Identity</h2>
        <p className="mb-4">
          VELNARO (we, us, our) is a digital agency brand offering software development, AI automation and AI search visibility services. The legal name and business address of the person or entity responsible for this website must be confirmed and published before the site launches publicly. Until a business mailbox is configured, privacy requests can be submitted through the website contact form.
        </p>

        <h2 className="text-2xl font-semibold text-graphite mb-8">Information We Collect</h2>
        <h3 className="text-xl font-medium text-graphite mb-4">Contact Form Data</h3>
        <p className="mb-4">
          When you contact us through the contact form on our website, we collect the following information:
        </p>
        <ul className="list-disc pl-5 mb-4">
          <li className="mb-2">Name — provided voluntarily</li>
          <li className="mb-2">Email address — provided voluntarily</li>
          <li className="mb-2">Optional budget range — Under $1k, $1k-$5k, $5k-$15k, $15k+, or hourly</li>
          <li className="mb-2">Message content — the text of your inquiry</li>
        </ul>

        <h3 className="text-xl font-medium text-graphite mb-4">Automatically Collected Data</h3>
        <p className="mb-4">
          The contact form processes limited technical information to protect the form and keep an accurate submission record:
        </p>
        <ul className="list-disc pl-5 mb-4">
          <li className="mb-2">A keyed, one-way connection fingerprint derived from the client IP and used only for rate limiting; the raw IP address is not stored in contact records</li>
          <li className="mb-2">User agent string, truncated to 500 characters</li>
          <li className="mb-2">Timestamp of submission</li>
          <li className="mb-2">Form source identifier</li>
        </ul>

        <h2 className="text-2xl font-semibold text-graphite mb-8">Purposes of Collection</h2>
        <p className="mb-4">
          The information we collect is used to:
        </p>
        <ul className="list-disc pl-5 mb-4">
          <li className="mb-2">Respond to inquiries and contact requests</li>
          <li className="mb-2">Maintain records of communications</li>
          <li className="mb-2">Detect and limit spam or abusive contact-form submissions</li>
          <li className="mb-2">Improve our services</li>
        </ul>

        <h2 className="text-2xl font-semibold text-graphite mb-8">Cookies and Tracking</h2>
        <p className="mb-4">
          Google Analytics 4 may be enabled on this website. It is not loaded unless a visitor explicitly chooses “Allow analytics” in the consent notice. If consent is declined, analytics remains disabled. The consent choice is stored in browser local storage. Visitors can change this choice later using Privacy settings. We do not use advertising pixels or cross-site behavioural advertising. The rate-limit fingerprint is held separately from contact records. On a later contact-form request, the rate limiter removes fingerprints that have been inactive for more than one day. Contact records include the user agent, submission timestamp and form source. The private admin area uses essential Supabase authentication cookies for sign-in and session maintenance.
        </p>

        <h2 className="text-2xl font-semibold text-graphite mb-8">Service Providers</h2>
        <p className="mb-4">
          Supabase is used to store contact submissions and manage administrator authentication. The production website hosting provider and any future email-delivery provider must be identified in this policy before public launch. The current contact form stores enquiries in Supabase and does not send automatic email notifications. When a live project preview is embedded, your browser loads that third-party website directly. Its provider may receive connection and browser information, set its own cookies, and process data under its own privacy policy.
        </p>

        <h2 className="text-2xl font-semibold text-graphite mb-8">Data Sharing</h2>
        <p className="mb-4">
          We do not sell or rent your personal information to third parties. We may share your data only in the following circumstances:
        </p>
        <ul className="list-disc pl-5 mb-4">
          <li className="mb-2">With Supabase to store contact enquiries and manage administrator authentication; the production hosting provider will be identified before launch</li>
          <li className="mb-2">With authorized personnel who need the information to respond to your inquiry</li>
          <li className="mb-2">If required by law or valid government request</li>
        </ul>

        <h2 className="text-2xl font-semibold text-graphite mb-8">Data Security</h2>
        <p className="mb-4">
          We take reasonable technical and organizational measures to protect your information. Contact form submissions are stored in Supabase. Database policies restrict browser access to authorized admins; public visitors cannot read submissions or insert directly into the database. The server validates submissions and applies a database-backed rate limit. Transmission of data via the contact form occurs over HTTPS.
        </p>

        <h2 className="text-2xl font-semibold text-graphite mb-8">Data Retention</h2>
        <p className="mb-4">
          Contact form submissions are currently retained until an authorized admin deletes them or a verified deletion request is processed. There is no automatic retention/deletion schedule currently implemented. You may request access to or deletion of a submission through the website contact form. Authorized administrators can also delete submissions through the private admin dashboard.
        </p>

        <h2 className="text-2xl font-semibold text-graphite mb-8">Individual Rights</h2>
        <p className="mb-4">
          You have the following rights regarding your personal data:
        </p>
        <ul className="list-disc pl-5 mb-4">
          <li className="mb-2">Access — you may request a copy of the data we hold about you</li>
          <li className="mb-2">Rectification — you may request that inaccurate data be corrected</li>
          <li className="mb-2">Erasure — you may request that your data be deleted</li>
          <li className="mb-2">Restriction — you may request that processing of your data be restricted</li>
          <li className="mb-2">Portability — you may request your data in a structured format</li>
          <li className="mb-2">Objection — you may object to certain processing activities</li>
        </ul>

        <h2 className="text-2xl font-semibold text-graphite mb-8">International Data Transfers</h2>
        <p className="mb-4">
          Supabase may process or store information in a region that differs from your country of residence. The project&apos;s actual region and any applicable transfer safeguards must be confirmed and documented before the website accepts production enquiries.
        </p>

        <h2 className="text-2xl font-semibold text-graphite mb-8">Contact and Policy Changes</h2>
        <p className="mb-4">
          If you have questions about this privacy policy or want to exercise a privacy right, use the website contact form. We may update this policy from time to time by posting a revised version on this page and updating the revision date.
        </p>

        <p className="mt-8 text-sm text-muted">
          Last revised: November 2026
        </p>
      </div>
    </section>
  );
}