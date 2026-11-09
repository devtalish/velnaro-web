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
          VELNARO (we, us, our) is a software development and technology solutions company founded by Muhammad Talish. Our principal place of business is operated online and inquiries may be directed at hello@velnaro.agency.
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
          Our contact form API also collects the following technical data on each submission:
        </p>
        <ul className="list-disc pl-5 mb-4">
          <li className="mb-2">IP address, obtained from the hosting platform's client-IP header or a trusted reverse-proxy header</li>
          <li className="mb-2">User agent string</li>
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
          <li className="mb-2">Detecting and limiting spam or abusive contact-form submissions</li>
          <li className="mb-2">Improve our services</li>
        </ul>

        <h2 className="text-2xl font-semibold text-graphite mb-8">Cookies and Tracking</h2>
        <p className="mb-4">
          We do not currently deploy analytics scripts, advertising pixels, or cross-site behavioural tracking. Contact-form submissions include technical metadata described above. The private admin area uses essential Supabase authentication cookies for sign-in and session maintenance.
        </p>

        <h2 className="text-2xl font-semibold text-graphite mb-8">Service Providers</h2>
        <p className="mb-4">
          We use Vercel to host the website and Supabase to store contact submissions and manage admin authentication. A configured SMTP/email delivery provider processes the messages needed to send the visitor acknowledgement and notify VELNARO. These providers may process information on infrastructure outside your country of residence; their locations and terms depend on the accounts configured by VELNARO.
        </p>

        <h2 className="text-2xl font-semibold text-graphite mb-8">Data Sharing</h2>
        <p className="mb-4">
          We do not sell or rent your personal information to third parties. We may share your data only in the following circumstances:
        </p>
        <ul className="list-disc pl-5 mb-4">
          <li className="mb-2">With Vercel, Supabase and the configured email delivery provider as necessary to host the site, store enquiries and deliver emails</li>
          <li className="mb-2">With authorized personnel who need the information to respond to your inquiry</li>
          <li className="mb-2">If required by law or valid government request</li>
        </ul>

        <h2 className="text-2xl font-semibold text-graphite mb-8">Data Security</h2>
        <p className="mb-4">
          We take reasonable technical and organizational measures to protect your information. Contact form submissions are stored in Supabase. Database policies restrict browser access to authorized admins; public visitors cannot read submissions or insert directly into the database. The server validates submissions and applies a database-backed rate limit. Transmission of data via the contact form occurs over HTTPS.
        </p>

        <h2 className="text-2xl font-semibold text-graphite mb-8">Data Retention</h2>
        <p className="mb-4">
          Contact form submissions are currently retained until an authorized admin deletes them or a verified deletion request is processed. There is no automatic retention/deletion schedule currently implemented. You may request deletion by contacting hello@velnaro.agency; authorized admins can also delete submissions through the admin dashboard.
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
          Our backend infrastructure is provided by Supabase, a cloud service. Your data may be processed, stored, or transferred on servers located outside your country of residence. By using our contact form, you transfer your data to and accept this international handling.
        </p>

        <h2 className="text-2xl font-semibold text-graphite mb-8">Contact and Policy Changes</h2>
        <p className="mb-4">
          If you have questions about this privacy policy, please contact us at hello@velnaro.agency. We may update this privacy policy from time to time. We will notify of any material changes by posting the new privacy policy on this page and updating the last revised date.
        </p>

        <p className="mt-8 text-sm text-muted">
          Last revised: November 2026
        </p>
      </div>
    </section>
  );
}