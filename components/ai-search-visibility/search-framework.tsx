"use client";

import { type FC } from "react";

type OptimizationArea = {
  number: string;
  title: string;
  description: string;
  capabilities: string[];
};

type SearchFrameworkProps = {
  areas: OptimizationArea[];
};

export const SearchFramework: FC<SearchFrameworkProps> = ({ areas }) => (
  <section className="mb-24">
    <div className="mb-9 max-w-3xl">
      <p className="text-eyebrow mb-3 uppercase tracking-wider">AI SEARCH VISIBILITY</p>
      <h2 className="text-heading mb-4">What we optimize</h2>
      <p className="text-base leading-relaxed text-muted md:text-lg">
        VELNARO organizes optimization across technical, content and brand foundations that help search engines and AI-assisted discovery systems interpret business information more clearly.
      </p>
    </div>
    <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {areas.map((area) => (
        <li key={area.number} className="group rounded-2xl border border-slate/15 bg-white/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-deep-teal/25 hover:shadow-xl hover:shadow-graphite/[0.05] sm:p-6">
          <div className="mb-6 flex items-center justify-between">
            <span className="font-mono text-2xl font-light text-deep-teal/75">{area.number}</span>
            <span className="h-8 w-8 rounded-xl border border-deep-teal/15 bg-deep-teal/[0.05] transition-colors group-hover:bg-deep-teal/10" />
          </div>
          <h3 className="text-base font-semibold text-graphite">{area.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{area.description}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {area.capabilities.map((capability) => (
              <li key={capability} className="rounded-full border border-slate/10 bg-ivory/70 px-2.5 py-1 text-[10px] text-muted">{capability}</li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  </section>
);
