"use client";

import { type FC } from "react";

const LIVE_SITES = [
  {
    title: "Restaurant Website",
    category: "Hospitality",
    description: "A live restaurant web experience demonstrating responsive presentation and customer-facing website design.",
    href: "https://restaurant-d-g.vercel.app/",
  },
  {
    title: "Aether Estates",
    category: "Real Estate",
    description: "A live property-focused website demonstrating structured listings and a visual browsing experience.",
    href: "https://aether-estate-2ur6.vercel.app/",
  },
  {
    title: "ClinicFlow",
    category: "Healthcare",
    description: "A live healthcare product concept demonstrating an organized interface for clinical workflows.",
    href: "https://cliniflow-eta.vercel.app/",
  },
] as const;

export const ServiceLivePreviews: FC = () => (
  <section className="mx-auto mb-24 max-w-7xl" aria-labelledby="service-live-previews-heading">
    <div className="mb-8 max-w-3xl">
      <p className="text-eyebrow mb-3 uppercase tracking-[0.2em]">LIVE PROJECT PREVIEWS</p>
      <h2 id="service-live-previews-heading" className="text-heading">Explore work in a real browser view.</h2>
      <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
        Browse selected live websites and product demonstrations. These previews show interface and implementation work; they are not claims of measured business outcomes or search rankings.
      </p>
    </div>
    <div className="grid gap-6 lg:grid-cols-3">
      {LIVE_SITES.map((site, index) => (
        <article key={site.href} className="group min-w-0 overflow-hidden rounded-2xl border border-slate/15 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-deep-teal/25 hover:shadow-xl hover:shadow-graphite/[0.06]">
          <div className="relative aspect-[16/11] overflow-hidden bg-[#f5f6f2] p-2.5 sm:p-3">
            <div className="relative h-full overflow-hidden rounded-xl border border-slate/15 bg-white shadow-inner">
              <div className="relative z-10 flex h-7 items-center gap-1.5 border-b border-slate/10 bg-[#f7f7f4] px-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#d5a49b]" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#dfc68f]" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#9db9a9]" />
                <span className="ml-2 min-w-0 flex-1 truncate rounded-full bg-white px-2 py-1 text-[8px] text-muted">{new URL(site.href).hostname}</span>
                <span className="text-[8px] font-semibold uppercase tracking-wider text-deep-teal">Live</span>
              </div>
              <div className="absolute inset-x-0 bottom-0 top-7 overflow-hidden bg-white">
                <iframe
                  src={site.href}
                  title={`${site.title} live website preview`}
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="pointer-events-none absolute left-0 top-0 h-[200%] w-[200%] origin-top-left scale-50 border-0 bg-white"
                  tabIndex={-1}
                  aria-hidden="true"
                />
              </div>
            </div>
            <span className="absolute bottom-5 left-5 rounded-full border border-white/80 bg-white/95 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-deep-teal shadow-sm">
              Preview {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <div className="space-y-3 p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">{site.category}</p>
            <h3 className="text-xl font-semibold tracking-tight text-graphite">{site.title}</h3>
            <p className="text-sm leading-6 text-muted">{site.description}</p>
            <a href={site.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-2 pt-1 text-sm font-semibold text-deep-teal transition-colors hover:text-graphite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-deep-teal">
              Open live website <span aria-hidden>↗</span>
            </a>
          </div>
        </article>
      ))}
    </div>
  </section>
);