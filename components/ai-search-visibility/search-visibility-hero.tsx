"use client";

import { type FC } from "react";
import Link from "next/link";

type SearchVisibilityHeroProps = {
  eyebrow: string;
  headline: string;
  subtitle: string;
  primaryCtaText: string;
  primaryCtaHref: string;
  secondaryCtaText: string;
  secondaryCtaHref: string;
};

const SIGNALS = ["Clear brand information", "Structured useful content", "Technical foundations"];

export const SearchVisibilityHero: FC<SearchVisibilityHeroProps> = ({
  eyebrow,
  headline,
  subtitle,
  primaryCtaText,
  primaryCtaHref,
  secondaryCtaText,
  secondaryCtaHref,
}) => (
  <section className="mx-auto max-w-7xl px-6 pb-16 pt-24 lg:pb-24">
    <div className="grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
      <div className="relative z-10">
        <p className="text-eyebrow mb-3 uppercase tracking-wider">{eyebrow}</p>
        <h1 className="text-heading mb-6 max-w-xl">{headline}</h1>
        <p className="mb-8 max-w-xl text-base leading-relaxed text-muted md:text-lg">{subtitle}</p>
        <div className="flex flex-wrap gap-3">
          <Link href={primaryCtaHref} className="btn-primary inline-flex items-center gap-2">
            <span>{primaryCtaText}</span><span aria-hidden>→</span>
          </Link>
          <Link href={secondaryCtaHref} className="btn-ghost inline-flex items-center gap-2">
            <span>{secondaryCtaText}</span><span aria-hidden>↗</span>
          </Link>
        </div>
      </div>

      <div className="relative isolate">
        <div className="pointer-events-none absolute -inset-8 -z-10 rounded-full bg-pale-sage/60 blur-3xl" />
        <div className="relative overflow-hidden rounded-[1.75rem] border border-slate/15 bg-white/85 p-5 shadow-2xl shadow-graphite/[0.07] backdrop-blur-xl sm:p-7">
          <div className="mb-6 flex items-center justify-between gap-3 border-b border-slate/10 pb-5">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-muted">AI-assisted discovery</p>
              <p className="mt-1 text-lg font-semibold tracking-tight text-graphite">A clearer brand signal</p>
            </div>
            <span className="rounded-full border border-deep-teal/20 bg-deep-teal/[0.06] px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider text-deep-teal">
              Illustrative view
            </span>
          </div>

          <div className="rounded-2xl border border-slate/15 bg-ivory/70 p-4 sm:p-5">
            <div className="flex items-center gap-3 rounded-full border border-slate/15 bg-white px-4 py-3 shadow-sm">
              <svg className="h-4 w-4 shrink-0 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <circle cx="11" cy="11" r="7" /><path d="m16 16 4 4" />
              </svg>
              <span className="text-xs text-muted sm:text-sm">Who helps businesses improve their digital operations?</span>
            </div>

            <div className="mt-5 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-deep-teal" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-deep-teal">Example answer structure</p>
            </div>
            <p className="mt-3 text-sm leading-7 text-graphite sm:text-[15px]">
              A useful answer explains what a business does, who it serves, the problems it solves and where its expertise can be verified.
            </p>

            <div className="mt-4 border-t border-slate/10 pt-4">
              <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-muted">Supporting information</p>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-lg border border-slate/15 bg-white px-3 py-2 text-[10px] text-muted">Business profile</span>
                <span className="rounded-lg border border-slate/15 bg-white px-3 py-2 text-[10px] text-muted">Helpful content</span>
                <span className="rounded-lg border border-slate/15 bg-white px-3 py-2 text-[10px] text-muted">Trusted sources</span>
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-2 sm:grid-cols-3">
            {SIGNALS.map((signal, index) => (
              <div key={signal} className="flex items-center gap-2 rounded-xl border border-slate/10 bg-white/75 px-3 py-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-deep-teal/10 text-[10px] font-semibold text-deep-teal">{index + 1}</span>
                <span className="text-[10px] leading-snug text-muted">{signal}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-3 text-center text-[10px] uppercase tracking-[0.2em] text-muted/70">Illustrative discovery interface · No ranking or citation guarantee</p>
      </div>
    </div>
  </section>
);
