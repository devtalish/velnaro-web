"use client";

import { type FC } from "react";

type VisibilityFrameworkProps = {
  title: string;
  description: string;
  stages: {
    name: string;
    description: string;
  }[];
};

export const VisibilityFramework: FC<VisibilityFrameworkProps> = ({
  title,
  description,
  stages,
}) => (
  <section className="mb-24">
    <div className="mb-9 max-w-3xl">
      <p className="text-eyebrow mb-3 uppercase tracking-wider">THE FRAMEWORK</p>
      <h2 className="text-heading mb-4">{title}</h2>
      <p className="text-base leading-relaxed text-muted md:text-lg">{description}</p>
    </div>
    <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {stages.map((stage, index) => (
        <li key={stage.name} className="relative rounded-2xl border border-slate/15 bg-white/70 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-deep-teal/25 hover:shadow-xl hover:shadow-graphite/[0.05] sm:p-6">
          <div className="mb-6 flex items-center justify-between">
            <span className="font-mono text-2xl font-light text-deep-teal/75">{String(index + 1).padStart(2, "0")}</span>
            <span className="rounded-full bg-deep-teal/[0.06] px-3 py-1 text-[9px] font-semibold uppercase tracking-wider text-deep-teal">Stage</span>
          </div>
          <h3 className="text-base font-semibold text-graphite">{stage.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{stage.description}</p>
          <div className="mt-6 h-px w-full bg-gradient-to-r from-deep-teal/35 to-transparent" />
        </li>
      ))}
    </ol>
  </section>
);
