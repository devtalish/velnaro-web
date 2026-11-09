"use client";

import { type FC } from "react";

type Layer = {
  name: string;
  description: string;
};

type AutomationArchitectureProps = {
  title: string;
  description: string;
  layers: Layer[];
};

export const AutomationArchitecture: FC<AutomationArchitectureProps> = ({
  title,
  description,
  layers,
}) => (
  <section className="mb-20">
    <div className="grid lg:grid-cols-2 gap-16 items-center">
      <div>
        <p className="text-eyebrow uppercase tracking-wider mb-3">AI AUTOMATION</p>
        <h2 className="text-heading mb-5">{title}</h2>
        <p className="text-base text-muted leading-relaxed mb-6">
          {description}
        </p>
        <div className="space-y-4 text-sm text-muted">
          {layers.map((layer) => (
            <div key={layer.name} className="relative pl-8 rounded-xl border border-slate/20 p-6 bg-white/50 backdrop-blur-sm min-h-32">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-full bg-deep-teal"></div>
              <h3 className="text-graphite mb-2">{layer.name}</h3>
              <p className="text-sm text-muted leading-relaxed">{layer.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);