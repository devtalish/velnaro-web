"use client";

import { type FC } from "react";

type FAQItem = { question: string; answer: string };
type FAQAccordionProps = { title: string; items: FAQItem[] };

export const FAQAccordion: FC<FAQAccordionProps> = ({ title, items }) => (
  <section className="mb-24">
    <div className="mb-8 max-w-2xl">
      <p className="text-eyebrow mb-3">COMMON QUESTIONS</p>
      <h2 className="text-heading">{title}</h2>
    </div>
    <div className="grid gap-3 md:grid-cols-2">
      {items.map((item, index) => (
        <details key={item.question} className="group rounded-2xl border border-slate/15 bg-white/70 p-5 shadow-[0_12px_35px_-30px_rgba(23,27,31,0.35)] transition duration-300 hover:border-deep-teal/25 hover:bg-white open:border-deep-teal/30 open:bg-white sm:p-6">
          <summary className="flex cursor-pointer list-none items-center gap-4 text-left marker:hidden [&::-webkit-details-marker]:hidden">
            <span className="font-mono text-[10px] tracking-wider text-deep-teal/75">{String(index + 1).padStart(2, "0")}</span>
            <span className="min-w-0 flex-1 text-sm font-semibold leading-snug text-graphite sm:text-base">{item.question}</span>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate/15 bg-ivory text-muted transition-all duration-300 group-open:rotate-180 group-open:border-deep-teal/25 group-open:bg-deep-teal group-open:text-white" aria-hidden="true">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
            </span>
          </summary>
          <p className="mt-4 border-l-2 border-deep-teal/40 bg-deep-teal/[0.045] px-4 py-4 text-sm leading-7 text-muted sm:ml-8">{item.answer}</p>
        </details>
      ))}
    </div>
  </section>
);
