"use client";

import { type FC } from "react";

type TimelineStep = {
  id: number;
  title: string;
  description: string;
  visualIdentifier?: string;
};

type AutomationTimelineProps = {
  steps: TimelineStep[];
};

export const AutomationTimeline: FC<AutomationTimelineProps> = ({
  steps,
}) => (
  <section className="mb-20">
    <ol className="list-decimal list-inside space-y-4">
      {steps.map((step) => (
        <li key={step.id} className="flex items-start gap-4">
          <span className="mt-1 text-sm font-medium text-deep-teal">
            {String(step.id).padStart(2, "0")}
          </span>
          <div>
            <h3 className="font-medium text-graphite">{step.title}</h3>
            <p className="text-muted text-sm leading-relaxed">{step.description}</p>
          </div>
        </li>
      ))}
    </ol>
  </section>
);