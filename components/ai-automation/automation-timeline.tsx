"use client";

import { type FC } from "react";

type TimelineStep = {
  id: number;
  title: string;
  description: string;
  visualIdentifier?: string;
};

type AutomationTimelineProps = {
  steps: TimelineStep[];
};

export const AutomationTimeline: FC<AutomationTimelineProps> = ({ steps }) => (
  <section className="mb-24">
    <div className="mb-9 max-w-3xl">
      <p className="text-eyebrow mb-3 uppercase tracking-wider">IMPLEMENTATION</p>
      <h2 className="text-heading mb-4">From process discovery to dependable automation.</h2>
      <p className="text-base leading-relaxed text-muted">A structured sequence keeps the solution aligned with the way your team actually works.</p>
    </div>
    <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {steps.map((step, index) => (
        <li key={step.id} className="group relative rounded-2xl border border-slate/15 bg-white/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-deep-teal/25 hover:shadow-xl hover:shadow-graphite/[0.05]">
          <div className="mb-7 flex items-center justify-between">
            <span className="font-mono text-2xl font-light text-deep-teal/75">{String(step.id).padStart(2, "0")}</span>
            {index < steps.length - 1 && <span className="hidden text-deep-teal/45 lg:block" aria-hidden="true">→</span>}
          </div>
          <h3 className="text-base font-semibold text-graphite">{step.title}</h3>
          <p className="mt-2 text-xs leading-relaxed text-muted">{step.description}</p>
          <div className="mt-6 h-px w-full bg-gradient-to-r from-deep-teal/35 to-transparent" />
        </li>
      ))}
    </ol>
  </section>
);
