"use client";

import { type FC } from "react";

type Layer = {
  name: string;
  description: string;
};

type AutomationArchitectureProps = {
  title: string;
  description: string;
  layers: Layer[];
};

export const AutomationArchitecture: FC<AutomationArchitectureProps> = ({
  title,
  description,
  layers,
}) => (
  <section className="mb-24">
    <div className="mb-10 max-w-3xl">
      <p className="text-eyebrow mb-3 uppercase tracking-wider">AI AUTOMATION</p>
      <h2 className="text-heading mb-5">{title}</h2>
      <p className="text-base leading-relaxed text-muted md:text-lg">{description}</p>
    </div>

    <div className="relative">
      <div aria-hidden="true" className="absolute left-6 right-6 top-7 hidden h-px bg-gradient-to-r from-deep-teal/10 via-deep-teal/45 to-deep-teal/10 lg:block" />
      <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {layers.map((layer, index) => (
          <li key={layer.name} className="group relative rounded-2xl border border-slate/15 bg-white/75 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-deep-teal/25 hover:shadow-xl hover:shadow-graphite/[0.05] sm:p-6">
            <div className="relative z-10 mb-6 flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-deep-teal/15 bg-ivory font-mono text-sm font-semibold text-deep-teal transition-colors group-hover:bg-deep-teal group-hover:text-white">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-muted/60">
                Layer {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="text-lg font-semibold tracking-tight text-graphite">{layer.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{layer.description}</p>
            <div className="mt-6 h-px w-full bg-gradient-to-r from-deep-teal/35 via-slate/10 to-transparent" />
          </li>
        ))}
      </ol>
    </div>
  </section>
);
