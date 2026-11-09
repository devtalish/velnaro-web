import { type Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL } from "@/constants/portfolio-constants";
import {
  OG_IMAGES,
  OG_LOCALE,
  SITE_NAME,
  absoluteUrl,
} from "@/constants/seo-constants";

const TITLE = "Terms of Service";
const DESCRIPTION = "Terms of service for using the VELNARO website and services.";

export const metadata: Metadata = {
  title: { absolute: `${TITLE} | ${SITE_NAME}` },
  description: DESCRIPTION,
  alternates: {
    canonical: "/terms-of-service",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: absoluteUrl("/terms-of-service"),
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

export default function TermsOfService(): React.ReactElement {
  return (
    <section className="py-24 md:py-32 bg-ivory text-graphite">
      <div className="max-w-4xl mx-auto px-4">
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 text-sm text-muted hover:text-deep-teal"
        >
          <span aria-hidden>←</span> Back to VELNARO
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-graphite mb-12">Terms of Service</h1>

        <h2 className="text-2xl font-semibold text-graphite mb-8">Website Use</h2>
        <p className="mb-4">
          These Terms of Service govern your use of the VELNARO website and any related services, features, content, or applications offered by VELNARO (collectively, the Services). By accessing or using the Services, you agree to be bound by these Terms. If you disagree with any part of the Terms, you may not access the Services.
        </p>

        <h2 className="text-2xl font-semibold text-graphite mb-8">Intellectual Property</h2>
        <p className="mb-4">
          All content included on the Website, such as text, graphics, logos, button icons, images, audio clips, digital downloads, data compilations, and software, is the property of VELNARO or its content suppliers and is protected by international copyright laws. The compilation of all content on the Website is the exclusive property of VELNARO and protected by international copyright laws.
        </p>
        <p className="mb-4">
          You may not modify, copy, reproduce, republish, upload, post, transmit, or distribute any part of the Website without our prior written permission. You may not use any robot, spider, or other automatic device, process, or means to access the Website for any purpose other than your personal use.
        </p>

        <h2 className="text-2xl font-semibold text-graphite mb-8">Service Inquiries</h2>
        <p className="mb-4">
          All service inquiries, project estimates, and collaboration requests submitted through the Website&apos;s contact form are non-binding preliminary discussions. VELNARO is not obligated to respond to any inquiry, provide estimates, or enter into any agreement. Submission of an inquiry does not create any contractual relationship or obligation on either party.
        </p>

        <h2 className="text-2xl font-semibold text-graphite mb-8">Proposal and Acceptance Process</h2>
        <p className="mb-4">
          Any project proposal, estimate, or agreement between VELNARO and a client is governed by a separate Service Agreement or contract. The contact form on the Website is not an offer or a contract. All project engagements require a written agreement signed by both parties that outlines scope, timeline, deliverables, and terms. VELNARO reserves the right to accept or decline any project inquiry at its sole discretion.
        </p>

        <h2 className="text-2xl font-semibold text-graphite mb-8">Third-Party Services</h2>
        <p className="mb-4">
          The Website may display, include, or make available content or services from third parties, including but not limited to development frameworks, libraries, and platforms. VELNARO does not control third-party content or services and assumes no responsibility for them. Your use of third-party services is subject to their own terms and policies.
        </p>

        <h2 className="text-2xl font-semibold text-graphite mb-8">Website Content Accuracy</h2>
        <p className="mb-4">
          The information on the Website is provided general information only and may not be relied upon. While we strive to provide accurate and up-to-date information, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the Website or the information, products, services, or related graphics contained on the Website for any purpose. Any reliance you place on such information is therefore strictly at your own risk.
        </p>

        <h2 className="text-2xl font-semibold text-graphite mb-8">Liability and Legal Boundaries</h2>
        <p className="mb-4">
          To the maximum extent permitted by applicable law, VELNARO shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages, including without limitation loss of profits, data, or other intangible losses, resulting from: (a) your access to or use of the Website; (b) any conduct or content of third parties on the Website; (c) any content obtained from the Website; or (d) unauthorized access, use, or alteration of your transmissions or content, whether based in contract, tort (including negligence), or any other theory of liability. Some jurisdictions do not allow the exclusion of certain warranties or the limitation or exclusion of liability for consequential or incidental damages. In such jurisdictions, our liability shall be limited to the greatest extent permitted by law.
        </p>

        <h2 className="text-2xl font-semibold text-graphite mb-8">Prohibited Activities</h2>
        <p className="mb-4">
          You are prohibited from using the Website or its content: (a) for any illegal or unauthorized purpose; (b) to solicit other users to join other online services or programs; (c) to transmit, or procure the sending of, any advertising or promotional material including without limitation junk mail, spam, or chain letters, or any other similar solicitation; (d) to impersonate any person or entity or misrepresent your affiliation with a person or entity; (e) to engage in any activity that restricts or inhibits anyone else&apos;s use or enjoyment of the Website; or (f) to violate any applicable laws or regulations in your jurisdiction.
        </p>

        <h2 className="text-2xl font-semibold text-graphite mb-8">Disputes</h2>
        <p className="mb-4">
          Any dispute arising out of or related to these Terms shall be governed by the laws of the jurisdiction where VELNARO operates primarily conducted, without regard to its conflict of law principles. You and VELNARO agree to try to resolve any dispute informally by contacting hello@velnaro.agency. If the dispute is not resolved within 30 days, either party may pursue legal action in the appropriate courts of that jurisdiction.
        </p>

        <h2 className="text-2xl font-semibold text-graphite mb-8">Contact Information</h2>
        <p className="mb-4">
          If you have any questions about these Terms, please contact us at:
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