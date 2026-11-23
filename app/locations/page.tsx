import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { OG_IMAGES, OG_LOCALE, SITE_NAME, SITE_URL } from "@/constants/seo-constants";

const title = "International Markets";
const description = "Explore the countries VELNARO prioritizes for remote delivery of AI search visibility, AI automation and software development services.";

export const metadata: Metadata = {
  title: `${title} | ${SITE_NAME}`,
  description,
  alternates: { canonical: "/locations" },
  openGraph: { type: "website", url: `${SITE_URL}/locations`, title, description, siteName: SITE_NAME, locale: OG_LOCALE, images: OG_IMAGES },
  twitter: { card: "summary_large_image", title, description, images: OG_IMAGES },
};

const markets = [
  { country: "Canada", href: "/locations/canada-geo-aeo-agency", description: "Remote technology and AI search visibility services for Canadian organizations." },
  { country: "Australia", href: "/locations/australia-geo-aeo-agency", description: "Remote GEO/AEO, automation and software delivery for Australian organizations." },
  { country: "United Kingdom", href: "/locations/uk-geo-aeo-agency", description: "Remote search visibility and technology services for UK organizations." },
  { country: "Austria", href: "/locations/austria-geo-aeo-agency", description: "Remote services for Austrian organizations and DACH-oriented businesses." },
  { country: "United States", href: "/locations/usa-geo-aeo-agency", description: "Remote AI search visibility, automation and software services for US organizations." },
];

export default function LocationsIndexPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-ivory text-graphite">
        <article className="c-space mx-auto max-w-7xl pb-24 pt-32">
          <nav aria-label="Breadcrumb" className="mb-10 text-sm text-muted">
            <Link href="/">Home</Link><span aria-hidden="true"> / </span><span>Markets</span>
          </nav>
          <header className="max-w-4xl">
            <p className="text-eyebrow mb-5">REMOTE INTERNATIONAL DELIVERY</p>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-6xl">Markets We Serve</h1>
            <p className="mt-7 text-lg leading-relaxed text-muted">{description}</p>
            <p className="mt-5 text-sm text-muted">These are priority remote-delivery markets, not claims of local offices, registered branches or physical presence.</p>
          </header>
          <section aria-labelledby="market-list" className="mt-16 border-t border-slate/15 pt-12">
            <h2 id="market-list" className="text-2xl font-semibold">Priority markets</h2>
            <div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {markets.map((market) => (
                <Link key={market.href} href={market.href} className="group rounded-2xl border border-slate/15 bg-white/70 p-7 transition hover:-translate-y-1 hover:border-deep-teal/40">
                  <h3 className="text-xl font-semibold group-hover:text-deep-teal">{market.country}</h3>
                  <p className="mt-4 leading-relaxed text-muted">{market.description}</p>
                  <span className="mt-6 inline-flex text-sm font-semibold text-deep-teal">Explore market <span aria-hidden="true" className="ml-2">→</span></span>
                </Link>
              ))}
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
