"use client";

import { type FC } from "react";
import Link from "next/link";

type ServiceHeroProps = {
  eyebrow: string;
  headline: string;
  subtitle: string;
  primaryCtaText: string;
  primaryCtaHref: string;
  secondaryCtaText: string;
  secondaryCtaHref: string;
  capabilityLine: string;
};

const INTERFACE_ROWS = [
  { label: "Customer portal", status: "In design", width: "w-3/4" },
  { label: "Operations dashboard", status: "In progress", width: "w-1/2" },
  { label: "System integrations", status: "Planned", width: "w-2/3" },
];

export const ServiceHero: FC<ServiceHeroProps> = ({
  eyebrow,
  headline,
  subtitle,
  primaryCtaText,
  primaryCtaHref,
  secondaryCtaText,
  secondaryCtaHref,
  capabilityLine,
}) => (
  <section className="mx-auto max-w-7xl px-6 pb-16 pt-10 lg:pb-24">
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
        <div className="relative overflow-hidden rounded-[1.75rem] border border-slate/15 bg-white/85 p-4 shadow-2xl shadow-graphite/[0.07] backdrop-blur-xl sm:p-6">
          <div className="mb-5 flex items-center justify-between gap-3 border-b border-slate/10 pb-4">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-deep-teal/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-pale-sage" />
              <span className="h-2.5 w-2.5 rounded-full bg-slate/15" />
              <span className="ml-2 text-xs font-medium text-graphite">Product workspace</span>
            </div>
            <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-muted">Illustrative interface</span>
          </div>

          <div className="grid gap-4 sm:grid-cols-[132px_1fr]">
            <aside className="hidden rounded-xl bg-graphite p-3 sm:block">
              <div className="mb-6 flex items-center gap-2">
                <span className="h-6 w-6 rounded-lg bg-white/15" />
                <span className="text-[10px] font-semibold tracking-wide text-white">WORKSPACE</span>
              </div>
              {["Overview", "Projects", "Customers", "Reports", "Settings"].map((item, index) => (
                <div key={item} className={`mb-1 rounded-lg px-2 py-2 text-[10px] ${index === 1 ? "bg-white/15 text-white" : "text-white/50"}`}>
                  {item}
                </div>
              ))}
              <div className="mt-8 rounded-lg border border-white/10 bg-white/5 p-2">
                <p className="text-[8px] uppercase tracking-wider text-white/40">Workspace status</p>
                <p className="mt-1 text-[10px] text-white/80">All systems organized</p>
              </div>
            </aside>

            <div className="min-w-0">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-muted">Overview</p>
                  <h2 className="mt-1 text-lg font-semibold tracking-tight text-graphite">Project workspace</h2>
                </div>
                <span className="rounded-lg border border-slate/15 bg-ivory px-3 py-2 text-[9px] text-muted">This quarter⌄</span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                {["Projects", "Tasks", "Team activity", "Milestones"].map((label, index) => (
                  <div key={label} className="rounded-xl border border-slate/10 bg-white p-3">
                    <p className="text-[9px] text-muted">{label}</p>
                    <div className="mt-3 flex items-end gap-1.5">
                      <span className={`h-5 w-2 rounded-sm ${index % 2 === 0 ? "bg-deep-teal/75" : "bg-pale-sage"}`} />
                      <span className={`h-8 w-2 rounded-sm ${index % 2 === 0 ? "bg-pale-sage" : "bg-deep-teal/65"}`} />
                      <span className="h-6 w-2 rounded-sm bg-slate/15" />
                      <span className="ml-2 text-[9px] font-medium text-graphite">Overview</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-3 rounded-xl border border-slate/10 bg-white p-3 sm:p-4">
                <div className="mb-4 flex items-center justify-between gap-2">
                  <p className="text-xs font-semibold text-graphite">Project activity</p>
                  <span className="text-[9px] text-muted">Illustrative data</span>
                </div>
                {INTERFACE_ROWS.map((row) => (
                  <div key={row.label} className="border-t border-slate/10 py-3 first:border-0 first:pt-0 last:pb-0">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <span className="truncate text-[10px] text-graphite">{row.label}</span>
                      <span className="shrink-0 text-[9px] text-muted">{row.status}</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-ivory">
                      <div className={`h-full rounded-full bg-gradient-to-r from-deep-teal to-pale-sage ${row.width}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <p className="mt-3 text-center text-[10px] uppercase tracking-[0.2em] text-muted/70">{capabilityLine} · Illustrative product UI</p>
      </div>
    </div>
  </section>
);
