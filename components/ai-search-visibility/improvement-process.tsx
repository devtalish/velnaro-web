"use client";

import { type FC } from "react";

type ProcessStage = {
  number: string;
  title: string;
  description: string;
  cta?: string;
  ctaHref?: string;
};

type ImprovementProcessProps = {
  stages: ProcessStage[];
};

export const ImprovementProcess: FC<ImprovementProcessProps> = ({ stages }) => (
  <section className="mb-24">
    <div className="mb-8 max-w-3xl">
      <p className="text-eyebrow mb-3 uppercase tracking-wider">CONTINUOUS IMPROVEMENT</p>
      <h2 className="text-heading">A cycle of insight, action and refinement.</h2>
    </div>
    <div className="grid gap-3 sm:grid-cols-2">
      {stages.map((stage) => (
        <article key={stage.number} className="rounded-2xl border border-slate/15 bg-white/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-deep-teal/25 hover:shadow-xl hover:shadow-graphite/[0.05]">
          <div className="mb-6 flex items-center justify-between">
            <span className="font-mono text-2xl font-light text-deep-teal/75">{stage.number}</span>
            <span className="h-px w-16 bg-gradient-to-r from-deep-teal/45 to-transparent" />
          </div>
          <h3 className="text-lg font-semibold text-graphite">{stage.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{stage.description}</p>
          {stage.cta && stage.ctaHref && (
            <a href={stage.ctaHref} className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-deep-teal transition-colors hover:text-graphite">
              {stage.cta} <span aria-hidden>→</span>
            </a>
          )}
        </article>
      ))}
    </div>
  </section>
);
