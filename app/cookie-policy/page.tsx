import { type Metadata } from "next";
import Link from "next/link";
import {
  OG_IMAGES,
  OG_LOCALE,
  SITE_NAME,
  absoluteUrl,
} from "@/constants/seo-constants";

const TITLE = "Cookie Policy";
const DESCRIPTION =
  "Cookie policy explaining the tracking technologies used by VELNARO.";

export const metadata: Metadata = {
  title: { absolute: `${TITLE} | ${SITE_NAME}` },
  description: DESCRIPTION,
  alternates: {
    canonical: "/cookie-policy",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: absoluteUrl("/cookie-policy"),
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

export default function CookiePolicy(): React.ReactElement {
  return (
    <section className="py-24 md:py-32 bg-ivory text-graphite">
      <div className="max-w-4xl mx-auto px-4">
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 text-sm text-muted hover:text-deep-teal"
        >
          <span aria-hidden>←</span> Back to VELNARO
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-graphite mb-12">Cookie Policy</h1>

        <h2 className="text-2xl font-semibold text-graphite mb-8">Overview</h2>
        <p className="mb-4">
          VELNARO (we, us, our) respects your privacy. This Cookie Policy explains our use of cookies and tracking technologies on our website. For information about how we handle personal data more generally, please see our Privacy Policy.
        </p>

        <h2 className="text-2xl font-semibold text-graphite mb-8">Cookies We Use</h2>
        <p className="mb-4">
          Our website does not use tracking cookies, analytics cookies, marketing cookies, or any other form of tracking technology. We do not deploy Google Analytics, Plausible, Facebook pixels, or any other third-party tracking scripts. All pages load without setting any cookies on visitor browsers beyond those strictly necessary for basic website functionality.
        </p>

        <h2 className="text-2xl font-semibold text-graphite mb-8">Essential Cookies</h2>
        <p className="mb-4">
          The only cookies our website may set are essential, first-party session cookies that are required for the Website to function properly. These cookies are temporary and are deleted when you close your browser. They do not collect or store any personal information. Essential cookies may include:
        </p>
        <ul className="list-disc pl-5 mb-4">
          <li className="mb-2">Session identifiers to maintain user state during a single browsing session</li>
          <li className="mb-2">Security tokens to prevent cross-site request forgery</li>
        </ul>

        <h2 className="text-2xl font-semibold text-graphite mb-8">Third-Party Cookies</h2>
        <p className="mb-4">
          We do not allow third-party entities to set cookies on the Website through our pages. However, some embedded content (such as YouTube videos or social media widgets, if ever embedded) may set their own cookies. We have not currently embedded any third-party content that sets cookies.
        </p>

        <h2 className="text-2xl font-semibold text-graphite mb-8">Browser Controls</h2>
        <p className="mb-4">
          You can control or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed. If you do this, however, you may need to manually adjust some preferences every time you visit a site and some services and functionalities may not work.
        </p>
        <p className="mb-4">
          For more information about managing cookies, visit <a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-deep-teal hover:text-primary transition-colors">www.aboutcookies.org</a>
        </p>

        <h2 className="text-2xl font-semibold text-graphite mb-8">No Tracking</h2>
        <p className="mb-4">
          We do not track your browsing activity across third-party websites, nor do we build profiles of your behavior for marketing or advertising purposes. Our Website is privacy-by-design and does not engage in any online behavioral advertising.
        </p>

        <p className="mt-8 text-sm text-muted">
          Last revised: November 2026
        </p>
      </div>
    </section>
  );
}