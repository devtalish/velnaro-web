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

export const SearchFramework: FC<SearchFrameworkProps> = ({
  areas,
}) => {
  return (
    <section className="mb-20">
      <div className="grid md:grid-cols-2 gap-16">
        <div>
          <p className="text-eyebrow uppercase tracking-wider mb-3">AI SEARCH VISIBILITY</p>
          <h2 className="text-heading mb-5">What we optimize</h2>
          <p className="text-base text-muted leading-relaxed mb-6">
            VELNARO organizes optimization across five technical and content foundations that help
            search engines and AI-assisted discovery systems understand and cite your brand.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {areas.map((area) => (
              <div
                key={area.number}
                className="rounded-xl border border-slate/20 p-5 bg-white/50 backdrop-blur-sm"
              >
                <p className="text-xs uppercase tracking-wider text-deep-teal mb-3">{area.number}. {area.title}</p>
                <p className="text-muted text-sm leading-relaxed">{area.description}</p>
                <ul className="text-xs text-muted/60 space-y-1">
                  {area.capabilities.map((cap) => (
                    <li key={cap}>{cap}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};