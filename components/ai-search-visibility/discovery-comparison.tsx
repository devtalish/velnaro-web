"use client";

import { type FC } from "react";

type DiscoveryComparisonProps = {
  title: string;
  traditionalTitle: string;
  traditionalItems: string[];
  aiTitle: string;
  aiItems: string[];
};

export const DiscoveryComparison: FC<DiscoveryComparisonProps> = ({
  title,
  traditionalTitle,
  traditionalItems,
  aiTitle,
  aiItems,
}) => (
  <section className="mb-20">
    <div className="grid lg:grid-cols-2 gap-16 items-center">
      <div>
        <p className="text-eyebrow uppercase tracking-wider mb-3">{traditionalTitle.toUpperCase()}</p>
        <h2 className="text-heading mb-5">{title}</h2>
        <div className="space-y-4 text-sm text-muted">
          {traditionalItems.map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-deep-teal">TRADITIONAL SEARCH</span>
              <div>
                <h3 className="font-medium text-graphite">{item}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="text-eyebrow uppercase tracking-wider mb-3">AI SEARCH VISIBILITY</p>
        <h2 className="text-heading mb-5">{aiTitle}</h2>
        <div className="space-y-4 text-sm text-muted">
          {aiItems.map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-deep-teal">AI-ASSISTED DISCOVERY</span>
              <div>
                <h3 className="font-medium text-graphite">{item}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);