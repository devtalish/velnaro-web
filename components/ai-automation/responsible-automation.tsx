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
  <section className="mb-20">
    <div>
      <p className="text-eyebrow uppercase tracking-wider mb-3">AI AUTOMATION</p>
      <h2 className="text-heading mb-5">{title}</h2>
    </div>
    <ul className="space-y-3 text-sm text-muted">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-3">
          <span className="mt-0.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-deep-teal" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </section>
);