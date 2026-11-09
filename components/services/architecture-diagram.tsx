"use client";

import { type FC } from "react";

type ArchitectureDiagramProps = {
  title: string;
  description: string;
  layers: {
    name: string;
    description: string;
  }[];
};

export const ArchitectureDiagram: FC<ArchitectureDiagramProps> = ({
  title,
  description,
  layers,
}) => (
  <section className="mb-20">
    <div className="grid lg:grid-cols-2 gap-16 items-center">
      <div>
        <p className="text-eyebrow uppercase tracking-wider mb-3">SOFTWARE DEVELOPMENT</p>
        <h2 className="text-heading mb-5">{title}</h2>
        <p className="text-base text-muted leading-relaxed">{description}</p>
        <div className="mt-8 space-y-4">
          {layers.map((layer, index) => (
            <div
              key={index}
              className="relative pl-8 rounded-xl border border-slate/20 p-6 bg-white/50 backdrop-blur-sm min-h-32"
            >
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-full bg-deep-teal"></div>
              <h3 className="text-graphite mb-2">{layer.name}</h3>
              <p className="text-sm text-muted leading-relaxed">{layer.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate/20">
        <img
          src="/placeholder-architecture.svg"
          alt="Software architecture diagram showing layers"
          className="object-cover w-full h-full"
          loading="lazy"
        />
      </div>
    </div>
  </section>
);