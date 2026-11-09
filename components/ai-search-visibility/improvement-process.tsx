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

export const ImprovementProcess: FC<ImprovementProcessProps> = ({
  stages,
}) => (
  <section className="mb-20">
    <div className="grid md:grid-cols-2 gap-16">
      {stages.map((stage) => (
        <div
          key={stage.number}
          className="rounded-xl border border-slate/20 p-6 bg-white/50 backdrop-blur-sm min-h-28"
        >
          <p className="text-xs uppercase tracking-wider text-deep-teal mb-3">{stage.number}</p>
          <h3 className="text-graphite mb-2">{stage.title}</h3>
          <p className="text-muted text-sm leading-relaxed">{stage.description}</p>
          {stage.cta && stage.ctaHref && (
            <a
              href={stage.ctaHref}
              className="mt-4 inline-flex items-center gap-2 text-deep-teal hover:underline"
            >
              <span>{stage.cta}</span>
            </a>
          )}
        </div>
      ))}
    </div>
  </section>
);