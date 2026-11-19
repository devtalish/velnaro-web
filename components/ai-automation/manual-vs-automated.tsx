"use client";

import { type FC } from "react";

type ManualStep = {
  title: string;
  description: string;
};

type ManualVsAutomatedProps = {
  title: string;
  manualSteps: ManualStep[];
  automatedSteps: ManualStep[];
};

const FlowColumn: FC<{ label: string; steps: ManualStep[]; automated?: boolean }> = ({
  label,
  steps,
  automated = false,
}) => (
  <article className={`relative overflow-hidden rounded-3xl border p-6 sm:p-8 ${automated ? "border-deep-teal/25 bg-white shadow-xl shadow-deep-teal/[0.06]" : "border-slate/15 bg-white/55"}`}>
    <div className="mb-6 flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <span className={`flex h-10 w-10 items-center justify-center rounded-xl text-lg ${automated ? "bg-deep-teal text-white" : "bg-slate/10 text-muted"}`} aria-hidden="true">
          {automated ? "↗" : "↻"}
        </span>
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-muted">Workflow state</p>
          <h3 className="mt-1 text-lg font-semibold text-graphite">{label}</h3>
        </div>
      </div>
      <span className={`rounded-full px-3 py-1 text-[9px] font-semibold uppercase tracking-wider ${automated ? "bg-deep-teal/10 text-deep-teal" : "bg-slate/10 text-muted"}`}>
        {automated ? "Connected" : "Manual"}
      </span>
    </div>
    <ol className="space-y-3">
      {steps.map((step, index) => (
        <li key={step.title} className="flex items-start gap-4 rounded-xl border border-slate/10 bg-white/75 p-4">
          <span className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg font-mono text-[10px] ${automated ? "bg-deep-teal/10 text-deep-teal" : "bg-slate/10 text-muted"}`}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="min-w-0">
            <h4 className="text-sm font-semibold text-graphite">{step.title}</h4>
            {step.description && <p className="mt-1 text-xs leading-relaxed text-muted">{step.description}</p>}
          </div>
        </li>
      ))}
    </ol>
  </article>
);

export const ManualVsAutomated: FC<ManualVsAutomatedProps> = ({
  title,
  manualSteps,
  automatedSteps,
}) => (
  <section className="mb-24">
    <div className="mb-9 max-w-3xl">
      <p className="text-eyebrow mb-3 uppercase tracking-wider">AI AUTOMATION</p>
      <h2 className="text-heading mb-4">{title}</h2>
      <p className="text-base leading-relaxed text-muted">A clear view of how disconnected tasks can become one coordinated process.</p>
    </div>
    <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
      <FlowColumn label="Disconnected tasks" steps={manualSteps} />
      <FlowColumn label="Connected workflow" steps={automatedSteps} automated />
    </div>
  </section>
);
