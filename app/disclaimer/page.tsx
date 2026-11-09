import { type Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL } from "@/constants/portfolio-constants";
import {
  OG_IMAGES,
  OG_LOCALE,
  SITE_NAME,
  absoluteUrl,
} from "@/constants/seo-constants";

const TITLE = "Disclaimer";
const DESCRIPTION =
  "Legal disclaimer explaining the scope and limitations of VELNARO services.";

export const metadata: Metadata = {
  title: { absolute: `${TITLE} | ${SITE_NAME}` },
  description: DESCRIPTION,
  alternates: {
    canonical: "/disclaimer",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: absoluteUrl("/disclaimer"),
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

export default function Disclaimer(): React.ReactElement {
  return (
    <section className="py-24 md:py-32 bg-ivory text-graphite">
      <div className="max-w-4xl mx-auto px-4">
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 text-sm text-muted hover:text-deep-teal"
        >
          <span aria-hidden>←</span> Back to VELNARO
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-graphite mb-12">Disclaimer</h1>

        <h2 className="text-2xl font-semibold text-graphite mb-8">Third-Party Platform Independence</h2>
        <p className="mb-4">
          VELNARO operates as an independent software development and technology consultancy. Our services, products, and website are platform-independent and we have no affiliation with, nor do we endorse, any third-party platform, framework, or service mentioned on the Website unless explicitly stated. References to third-party technologies, frameworks, or services are for informational purposes only and do not imply sponsorship or endorsement.
        </p>

        <h2 className="text-2xl font-semibold text-graphite mb-8">No Control Over External Search Engines or AI Answers</h2>
        <p className="mb-4">
          VELNARO does not control, manage, or influence search engine results, including but not limited to Google Search, Bing, or any other search platform. We also have no control over answers provided by artificial intelligence systems, large language models, or chatbots. Any appearance of VELNARO content in search results or AI-generated responses is determined entirely by third-party algorithms and outside our control. We make no representation about the accuracy, completeness, or legality of any such third-party outputs.
        </p>

        <h2 className="text-2xl font-semibold text-graphite mb-8">Scope-Based Service Delivery</h2>
        <p className="mb-4">
          All VELNARO services are delivered within the scope defined in individual project agreements. VELNARO does not guarantee outcomes, results, or performance beyond the explicitly agreed-upon deliverables in a executed Service Agreement. Past project results do not guarantee future performance. Services are provided on a best-effort basis and VELNARO is not liable for business outcomes, revenue changes, or operational results arising from delivered solutions.
        </p>

        <h2 className="text-2xl font-semibold text-graphite mb-8">Third-Party Service Dependencies</h2>
        <p className="mb-4">
          Our software development services may integrate or depend on third-party platforms, APIs, or services (such as cloud providers, authentication systems, or development tools). VELNARO uses reasonable efforts to maintain compatibility and continuity, but we do not control third-party service availability, pricing, terms of service, or discontinuation. If a third-party service changes or becomes unavailable, VELNARO is not liable for disruption to delivered solutions or additional work required to adapt systems.
        </p>

        <h2 className="text-2xl font-semibold text-graphite mb-8">General Information Limitations</h2>
        <p className="mb-4">
          All content, materials, and information provided through the Website, including but not limited to blog posts, case studies, documentation, and consultations, are for general informational purposes only and do not constitute legal, financial, tax, or professional advice. You should not act or rely upon such information without seeking the advice of a qualified professional. VELNARO disclaims all liability for any action taken in reliance on general information published on the Website.
        </p>

        <h2 className="text-2xl font-semibold text-graphite mb-8">No Warranties</h2>
        <p className="mb-4">
          The Website and its contents are provided on an as-is and as-available basis. VELNARO makes no warranties of any kind, either express or implied, including, without limitation, warranties of merchantability, fitness for a particular purpose, non-infringement, or accuracy. VELNARO does not warrant that the Website will be uninterrupted, error-free, or that defects will be corrected.
        </p>

        <h2 className="text-2xl font-semibold text-graphite mb-8">Limitation of Liability</h2>
        <p className="mb-4">
          To the maximum extent permitted by applicable law, VELNARO&apos;s total aggregate liability - with regards to these Terms or the Website regardless of the form of action - will not exceed $100. VELNARO shall not be liable for any lost profits, data, or special, incidental, consequential, or punitive damages.
        </p>

        <h2 className="text-2xl font-semibold text-graphite mb-8">Contact Information</h2>
        <p className="mb-4">
          If you have questions about this Disclaimer, please contact us at:
        </p>
        <p className="mb-4">
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-deep-teal hover:text-primary transition-colors underline">
            hello@velnaro.agency
          </a>
        </p>

        <p className="mt-8 text-sm text-muted">
          Effective date: November 2026
        </p>
      </div>
    </section>
  );
}