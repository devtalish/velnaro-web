"use client";

import { type FC } from "react";

type FAQItem = {
  question: string;
  answer: string;
};

type AutomationFAQProps = {
  title: string;
  items: FAQItem[];
  eyebrow?: string;
};

export const AutomationFAQ: FC<AutomationFAQProps> = ({
  title,
  items,
  eyebrow = "AI AUTOMATION",
}) => (
  <section className="mb-20">
    <div>
      <p className="text-eyebrow uppercase tracking-wider mb-3">{eyebrow}</p>
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