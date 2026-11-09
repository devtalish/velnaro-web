"use client";

import { type FC } from "react";

type MeasurementItem = {
  name: string;
  description: string;
  related?: string[];
};

type MeasurementExplainerProps = {
  title: string;
  items: MeasurementItem[];
};

export const MeasurementExplainer: FC<MeasurementExplainerProps> = ({
  title,
  items,
}) => (
  <section className="mb-20">
    <div>
      <p className="text-eyebrow uppercase tracking-wider mb-3">AI SEARCH VISIBILITY</p>
      <h2 className="text-heading mb-5">{title}</h2>
    </div>
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.name}
          className="rounded-xl border border-slate/20 p-5 bg-white/50 backdrop-blur-sm text-center"
        >
          <p className="text-xs uppercase tracking-wider text-deep-teal mb-3">{item.name}</p>
          <p className="text-muted text-sm leading-relaxed">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  </section>
);