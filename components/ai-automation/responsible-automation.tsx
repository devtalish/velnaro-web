"use client";

import { type FC } from "react";

type ResponsibleAutomationProps = {
  title: string;
  items: readonly string[];
};

export const ResponsibleAutomation: FC<ResponsibleAutomationProps> = ({
  title,
  items,
}) => (
  <section className="mb-24">
    <div className="mb-8 max-w-3xl">
      <p className="text-eyebrow mb-3 uppercase tracking-wider">RELIABILITY BY DESIGN</p>
      <h2 className="text-heading mb-4">{title}</h2>
      <p className="text-base leading-relaxed text-muted">Automation should be observable, controlled and maintainable—not a black box.</p>
    </div>
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <li key={item} className="flex min-h-28 items-start gap-3 rounded-2xl border border-slate/15 bg-white/70 p-5 transition-colors hover:border-deep-teal/25">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-deep-teal/10 text-xs font-semibold text-deep-teal">✓</span>
          <span className="pt-0.5 text-sm leading-relaxed text-muted">{item}</span>
        </li>
      ))}
    </ul>
  </section>
);
