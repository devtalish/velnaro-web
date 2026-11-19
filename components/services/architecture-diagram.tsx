"use client";

import { type FC } from "react";

type ArchitectureDiagramProps = {
  title: string;
  description: string;
  layers: {
    name: string;
    description: string;
  }[];
};

export const ArchitectureDiagram: FC<ArchitectureDiagramProps> = ({
  title,
  description,
  layers,
}) => (
  <section className="mb-24">
    <div className="grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
      <div className="lg:sticky lg:top-28">
        <p className="text-eyebrow mb-3 uppercase tracking-wider">SYSTEM ARCHITECTURE</p>
        <h2 className="text-heading mb-5">{title}</h2>
        <p className="text-base leading-relaxed text-muted md:text-lg">{description}</p>
        <div className="mt-7 rounded-2xl border border-deep-teal/15 bg-deep-teal/[0.045] p-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-deep-teal">Built with intention</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">Each layer has a defined responsibility, making the system easier to understand, maintain and extend.</p>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-slate/15 bg-white/65 p-5 shadow-xl shadow-graphite/[0.04] sm:p-7">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-pale-sage/50 blur-3xl" />
        <div className="relative mb-6 flex items-center justify-between gap-3 border-b border-slate/10 pb-4">
          <span className="text-xs font-semibold text-graphite">Product architecture</span>
          <span className="text-[9px] uppercase tracking-[0.18em] text-muted">Conceptual model</span>
        </div>
        <ol className="relative space-y-2">
          {layers.map((layer, index) => (
            <li key={layer.name} className="relative flex items-start gap-4 rounded-2xl border border-slate/12 bg-white/85 p-4 shadow-sm sm:p-5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-deep-teal/10 font-mono text-xs font-semibold text-deep-teal">{String(index + 1).padStart(2, "0")}</span>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-graphite sm:text-base">{layer.name}</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted sm:text-sm">{layer.description}</p>
              </div>
              {index < layers.length - 1 && <span className="absolute -bottom-3 left-[2.1rem] z-10 h-4 w-px bg-deep-teal/35" aria-hidden="true" />}
            </li>
          ))}
        </ol>
      </div>
    </div>
  </section>
);
