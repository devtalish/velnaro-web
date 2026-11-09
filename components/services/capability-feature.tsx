"use client";

import { type FC } from "react";

type CapabilityFeatureProps = {
  title: string;
  description: string;
  visualAlt: string;
  visualClassName?: string;
  capabilities: string[];
};

export const CapabilityFeature: FC<CapabilityFeatureProps> = ({
  title,
  description,
  visualAlt,
  visualClassName,
  capabilities,
}) => (
  <section className="mb-20">
    <div className="grid lg:grid-cols-2 gap-16 items-center">
      <div>
        <p className="text-eyebrow uppercase tracking-wider mb-3">SOFTWARE DEVELOPMENT</p>
        <h2 className="text-heading mb-5">{title}</h2>
        <p className="text-base text-muted leading-relaxed">{description}</p>
        <ul className="mt-6 space-y-3 text-sm text-muted">
          {capabilities.map((cap) => (
            <li key={cap} className="flex items-start">
              <span className="mt-1 h-1 w-1 rounded-full bg-deep-teal flex-shrink-0" />
              <span className="ml-3">{cap}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate/20">
        <img
          src="/placeholder-feature-visual.svg"
          alt={visualAlt}
          className={visualClassName}
          loading="lazy"
        />
      </div>
    </div>
  </section>
);