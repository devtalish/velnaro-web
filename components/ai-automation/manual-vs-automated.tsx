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

export const ManualVsAutomated: FC<ManualVsAutomatedProps> = ({
  title,
  manualSteps,
  automatedSteps,
}) => (
  <section className="mb-20">
    <div className="grid lg:grid-cols-2 gap-16 items-center">
      <div>
        <p className="text-eyebrow uppercase tracking-wider mb-3">AI AUTOMATION</p>
        <h2 className="text-heading mb-5">{title}</h2>
        <div className="space-y-4 text-sm text-muted">
          {manualSteps.map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-deep-teal">MANUAL</span>
              <div>
                <h3 className="font-medium text-graphite">{step.title}</h3>
                <p className="">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="text-eyebrow uppercase tracking-wider mb-3">AI AUTOMATION</p>
        <h2 className="text-heading mb-5">Connected workflow</h2>
        <div className="space-y-4 text-sm text-muted">
          {automatedSteps.map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-deep-teal">AUTOMATED</span>
              <div>
                <h3 className="font-medium text-graphite">{step.title}</h3>
                <p className="">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);