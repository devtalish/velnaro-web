import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { SITE_NAME, SITE_URL } from "@/constants/seo-constants";

const title = "Guides & Insights";
const description = "Practical resources from VELNARO on AI search visibility, GEO, AEO, technical SEO, automation and digital systems.";

export const metadata: Metadata = {
  title: `${title} | ${SITE_NAME}`,
  description,
  alternates: { canonical: "/guides" },
  openGraph: { type: "website", url: `${SITE_URL}/guides`, title, description, siteName: SITE_NAME },
  twitter: { card: "summary_large_image", title, description },
};

const guides = [
  {
    title: "What Is Generative Engine Optimization (GEO)?",
    description: "A practical introduction to GEO, how it relates to SEO and AEO, and the technical, content and entity foundations that support AI-assisted discovery.",
    href: "/guides/what-is-generative-engine-optimization-geo-2026",
    label: "AI Search Visibility",
  },
];

export default function GuidesIndexPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-ivory text-graphite">
        <article className="c-space mx-auto max-w-7xl pb-24 pt-32">
          <nav aria-label="Breadcrumb" className="mb-10 text-sm text-muted">
            <Link href="/">Home</Link><span aria-hidden="true"> / </span><span>Guides</span>
          </nav>
          <header className="max-w-4xl">
            <p className="text-eyebrow mb-5">VELNARO / KNOWLEDGE</p>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-6xl">Guides & Insights</h1>
            <p className="mt-7 text-lg leading-relaxed text-muted">{description}</p>
          </header>
          <section aria-labelledby="guides-list" className="mt-16 border-t border-slate/15 pt-12">
            <h2 id="guides-list" className="text-2xl font-semibold">Latest guide</h2>
            <div className="mt-7 grid gap-5 md:grid-cols-2">
              {guides.map((guide) => (
                <Link key={guide.href} href={guide.href} className="group rounded-2xl border border-slate/15 bg-white/70 p-7 transition hover:-translate-y-1 hover:border-deep-teal/40">
                  <p className="text-eyebrow text-deep-teal">{guide.label}</p>
                  <h3 className="mt-4 text-xl font-semibold group-hover:text-deep-teal">{guide.title}</h3>
                  <p className="mt-4 leading-relaxed text-muted">{guide.description}</p>
                  <span className="mt-6 inline-flex text-sm font-semibold text-deep-teal">Read guide <span aria-hidden="true" className="ml-2">→</span></span>
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
