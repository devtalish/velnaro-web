"use client";

import { type FC } from "react";

type MeasurementItem = {
  name: string;
  description: string;
  related?: string[];
};

type MeasurementExplainerProps = {
  title: string;
  items: MeasurementItem[];
};

export const MeasurementExplainer: FC<MeasurementExplainerProps> = ({ title, items }) => (
  <section className="mb-24">
    <div className="mb-8 max-w-3xl">
      <p className="text-eyebrow mb-3 uppercase tracking-wider">MEASUREMENT</p>
      <h2 className="text-heading">{title}</h2>
    </div>
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item, index) => (
        <article key={item.name} className="rounded-2xl border border-slate/15 bg-white/70 p-5 transition-colors hover:border-deep-teal/25 sm:p-6">
          <div className="mb-6 flex items-center justify-between">
            <span className="font-mono text-xl font-light text-deep-teal/75">{String(index + 1).padStart(2, "0")}</span>
            <span className="h-2 w-2 rounded-full bg-deep-teal/55" />
          </div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-graphite">{item.name}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
          {item.related && item.related.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2">
              {item.related.map((related) => <li key={related} className="rounded-full bg-ivory px-2.5 py-1 text-[10px] text-muted">{related}</li>)}
            </ul>
          )}
        </article>
      ))}
    </div>
    <p className="mt-4 max-w-3xl text-xs leading-relaxed text-muted/80">Available measurements vary by platform. We report what can be observed and verified rather than implying access to proprietary ranking or recommendation data.</p>
  </section>
);
