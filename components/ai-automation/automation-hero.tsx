"use client";

import { type FC } from "react";
import Link from "next/link";

type AutomationHeroProps = {
  eyebrow: string;
  headline: string;
  subtitle: string;
  primaryCtaText: string;
  primaryCtaHref: string;
  secondaryCtaText: string;
  secondaryCtaHref: string;
};

const WORKFLOW_STEPS = [
  { number: "01", label: "TRIGGER", title: "New enquiry", detail: "A form, message or event starts the flow.", symbol: "↗" },
  { number: "02", label: "INTELLIGENCE", title: "Process & decide", detail: "Rules and AI handle the right information.", symbol: "✳" },
  { number: "03", label: "ACTION", title: "Connected tools", detail: "Validated updates reach the right systems.", symbol: "⇄" },
];

export const AutomationHero: FC<AutomationHeroProps> = ({
  eyebrow,
  headline,
  subtitle,
  primaryCtaText,
  primaryCtaHref,
  secondaryCtaText,
  secondaryCtaHref,
}) => (
  <section className="mx-auto max-w-7xl px-0 pb-16 pt-10 lg:pb-24">
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
        <div className="pointer-events-none absolute -inset-8 -z-10 rounded-full bg-deep-teal/10 blur-3xl" />
        <div className="noise relative overflow-hidden rounded-[1.75rem] border border-slate/15 bg-white/80 p-5 shadow-2xl shadow-graphite/[0.07] backdrop-blur-xl sm:p-7">
          <div className="mb-7 flex flex-wrap items-center justify-between gap-3 border-b border-slate/10 pb-5">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-muted">System design</p>
              <p className="mt-1 text-lg font-semibold tracking-tight text-graphite">A connected workflow</p>
            </div>
            <span className="rounded-full border border-deep-teal/20 bg-deep-teal/[0.06] px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider text-deep-teal">
              Illustrative map
            </span>
          </div>

          <div className="relative grid gap-3 md:grid-cols-3 md:gap-2">
            <div aria-hidden="true" className="pointer-events-none absolute left-[16%] right-[16%] top-10 hidden h-px bg-gradient-to-r from-deep-teal/20 via-deep-teal/50 to-deep-teal/20 md:block" />
            {WORKFLOW_STEPS.map((step, index) => (
              <div
                key={step.number}
                className="relative rounded-2xl border border-slate/15 bg-white/90 p-4 shadow-sm transition-transform duration-300 hover:-translate-y-1 sm:p-5"
                style={{ animationDelay: `${index * 160}ms` }}
              >
                <div className="relative z-10 mb-5 flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-deep-teal/15 bg-ivory text-xl text-deep-teal">
                    {step.symbol}
                  </span>
                  <span className="font-mono text-xs text-muted/60">{step.number}</span>
                </div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-deep-teal">{step.label}</p>
                <h2 className="mt-2 text-base font-semibold text-graphite">{step.title}</h2>
                <p className="mt-2 text-xs leading-relaxed text-muted">{step.detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2 rounded-xl border border-slate/10 bg-ivory/70 px-4 py-3">
            <span className="h-2 w-2 rounded-full bg-deep-teal" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-graphite">Designed around your process</span>
            <span className="ml-auto text-[10px] text-muted">Human review where it matters</span>
          </div>
        </div>
        <p className="mt-3 text-center text-[10px] uppercase tracking-[0.2em] text-muted/70">Illustrative workflow architecture · Not a live system</p>
      </div>
    </div>
  </section>
);
