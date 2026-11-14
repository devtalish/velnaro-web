"use client";

import { type FC } from "react";

type DiscoveryComparisonProps = {
  title: string;
  traditionalTitle: string;
  traditionalItems: string[];
  aiTitle: string;
  aiItems: string[];
};

const JourneyCard: FC<{ label: string; items: string[]; ai?: boolean }> = ({ label, items, ai = false }) => (
  <article className={`rounded-3xl border p-6 sm:p-8 ${ai ? "border-deep-teal/25 bg-white shadow-xl shadow-deep-teal/[0.05]" : "border-slate/15 bg-white/55"}`}>
    <div className="mb-6 flex items-center justify-between gap-3">
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted">{label}</p>
      <span className={`rounded-full px-3 py-1 text-[9px] font-semibold uppercase tracking-wider ${ai ? "bg-deep-teal/10 text-deep-teal" : "bg-slate/10 text-muted"}`}>
        {ai ? "Conversational" : "Query-led"}
      </span>
    </div>
    <ol className="space-y-3">
      {items.map((item, index) => (
        <li key={item} className="flex items-start gap-4 rounded-xl border border-slate/10 bg-white/80 p-4">
          <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg font-mono text-[10px] ${ai ? "bg-deep-teal/10 text-deep-teal" : "bg-slate/10 text-muted"}`}>{String(index + 1).padStart(2, "0")}</span>
          <span className="pt-1 text-sm leading-relaxed text-graphite">{item}</span>
        </li>
      ))}
    </ol>
  </article>
);

export const DiscoveryComparison: FC<DiscoveryComparisonProps> = ({
  title,
  traditionalTitle,
  traditionalItems,
  aiTitle,
  aiItems,
}) => (
  <section className="mb-24">
    <div className="mb-9 max-w-3xl">
      <p className="text-eyebrow mb-3 uppercase tracking-wider">HOW PEOPLE DISCOVER</p>
      <h2 className="text-heading">{title}</h2>
    </div>
    <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
      <JourneyCard label={traditionalTitle} items={traditionalItems} />
      <JourneyCard label={aiTitle} items={aiItems} ai />
    </div>
    <p className="mt-4 max-w-3xl text-xs leading-relaxed text-muted/80">These are simplified discovery journeys. Search engines and AI platforms use different systems and do not follow one fixed sequence.</p>
  </section>
);
