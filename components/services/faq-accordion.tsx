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

export const FAQAccordion: FC<FAQAccordionProps> = ({
  title,
  items,
}) => (
  <section className="mb-20">
    <div>
      <p className="text-eyebrow uppercase tracking-wider mb-3">SOFTWARE DEVELOPMENT</p>
      <h2 className="text-heading mb-5">{title}</h2>
    </div>
    <div className="mt-6 grid gap-4 md:grid-cols-2">
      {items.map((item) => (
        <details key={item.question} className="space-y-2">
          <summary className="font-medium text-graphite cursor-pointer">
            {item.question}
          </summary>
          <p className="text-muted text-sm leading-relaxed">{item.answer}</p>
        </details>
      ))}
    </div>
  </section>
);