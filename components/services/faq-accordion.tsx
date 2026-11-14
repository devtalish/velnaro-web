"use client";

import { type FC } from "react";

type FAQItem = {
  question: string;
  answer: string;
};

type FAQAccordionProps = {
  title: string;
  items: FAQItem[];
};

export const FAQAccordion: FC<FAQAccordionProps> = ({ title, items }) => (
  <section className="mb-24">
    <div className="mb-8">
      <p className="text-eyebrow mb-3 uppercase tracking-wider">SOFTWARE DEVELOPMENT</p>
      <h2 className="text-heading">{title}</h2>
    </div>
    <div className="grid gap-3 md:grid-cols-2">
      {items.map((item, index) => (
        <details key={item.question} className="group rounded-2xl border border-slate/15 bg-white/65 p-5 transition-colors open:border-deep-teal/25 open:bg-white sm:p-6">
          <summary className="flex cursor-pointer list-none items-center gap-4 text-left marker:hidden [&::-webkit-details-marker]:hidden">
            <span className="font-mono text-[10px] text-deep-teal/70">{String(index + 1).padStart(2, "0")}</span>
            <span className="min-w-0 flex-1 text-sm font-semibold leading-snug text-graphite">{item.question}</span>
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate/15 bg-ivory text-muted transition-all group-open:rotate-180 group-open:border-deep-teal/20 group-open:bg-deep-teal group-open:text-white" aria-hidden="true">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
            </span>
          </summary>
          <p className="mt-4 border-l-2 border-deep-teal/35 bg-deep-teal/[0.04] px-4 py-4 text-sm leading-relaxed text-muted sm:ml-8">{item.answer}</p>
        </details>
      ))}
    </div>
  </section>
);
