"use client";

import { type FC } from "react";

type CapabilityFeatureProps = {
  title: string;
  description: string;
  visualAlt: string;
  visualClassName?: string;
  capabilities: string[];
};

const MOCK_ROWS = [
  { title: "Customer experience", detail: "Portal and account journeys", width: "w-[82%]" },
  { title: "Business operations", detail: "Internal tools and workflows", width: "w-[66%]" },
  { title: "Connected systems", detail: "Data and service integrations", width: "w-[74%]" },
];

export const CapabilityFeature: FC<CapabilityFeatureProps> = ({
  title,
  description,
  visualAlt,
  capabilities,
}) => (
  <section className="mb-24">
    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
      <div>
        <p className="text-eyebrow mb-3 uppercase tracking-wider">SOFTWARE DEVELOPMENT</p>
        <h2 className="text-heading mb-5">{title}</h2>
        <p className="text-base leading-relaxed text-muted md:text-lg">{description}</p>
        <ul className="mt-7 grid gap-3 sm:grid-cols-2">
          {capabilities.map((cap) => (
            <li key={cap} className="flex items-start gap-3 rounded-xl border border-slate/10 bg-white/55 px-4 py-3 text-sm text-muted">
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-deep-teal/10 text-[10px] font-semibold text-deep-teal">✓</span>
              <span>{cap}</span>
            </li>
          ))}
        </ul>
      </div>

      <div role="img" aria-label={visualAlt} className="relative isolate">
        <div className="pointer-events-none absolute -inset-7 -z-10 rounded-full bg-pale-sage/60 blur-3xl" />
        <div className="overflow-hidden rounded-3xl border border-slate/15 bg-white/85 p-4 shadow-2xl shadow-graphite/[0.07] sm:p-6">
          <div className="mb-5 flex items-center justify-between border-b border-slate/10 pb-4">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-deep-teal/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-pale-sage" />
              <span className="h-2.5 w-2.5 rounded-full bg-slate/15" />
              <span className="ml-2 text-xs font-medium text-graphite">Digital product system</span>
            </div>
            <span className="text-[9px] uppercase tracking-wider text-muted">Illustrative UI</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-[100px_1fr]">
            <div className="hidden rounded-xl bg-graphite p-3 sm:block">
              <div className="mb-6 h-6 w-6 rounded-lg bg-white/15" />
              {["Overview", "Products", "People", "Settings"].map((item, index) => (
                <div key={item} className={`mb-2 rounded-md px-2 py-2 text-[9px] ${index === 0 ? "bg-white/15 text-white" : "text-white/45"}`}>{item}</div>
              ))}
            </div>
            <div className="min-w-0 rounded-xl border border-slate/10 bg-ivory/55 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-muted">Workspace</p>
                  <p className="mt-1 text-base font-semibold text-graphite">Product overview</p>
                </div>
                <span className="rounded-lg border border-slate/10 bg-white px-3 py-2 text-[9px] text-muted">View details ↗</span>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {["Experience", "Operations", "Integrations"].map((label, index) => (
                  <div key={label} className="rounded-lg border border-slate/10 bg-white p-2">
                    <span className={`mb-3 block h-5 w-5 rounded-md ${index === 1 ? "bg-pale-sage" : "bg-deep-teal/10"}`} />
                    <span className="block text-[8px] leading-tight text-muted">{label}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 rounded-xl border border-slate/10 bg-white p-4">
                <p className="mb-4 text-xs font-semibold text-graphite">System components</p>
                {MOCK_ROWS.map((row) => (
                  <div key={row.title} className="mb-4 last:mb-0">
                    <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                      <span className="text-[10px] font-medium text-graphite">{row.title}</span>
                      <span className="text-[9px] text-muted">{row.detail}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-ivory">
                      <div className={`h-full rounded-full bg-gradient-to-r from-deep-teal to-pale-sage ${row.width}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <p className="mt-3 text-center text-[10px] uppercase tracking-[0.2em] text-muted/70">A visual concept of connected product experiences</p>
      </div>
    </div>
  </section>
);
