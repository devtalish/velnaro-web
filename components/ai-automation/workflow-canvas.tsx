"use client";

import { type FC } from "react";

type WorkflowNode = {
  id: string;
  title: string;
  description: string;
  status?: "active" | "pending" | "complete";
};

type WorkflowConnection = {
  from: string;
  to: string;
  label?: string;
};

type WorkflowCanvasProps = {
  title: string;
  description: string;
  nodes: WorkflowNode[];
  connections: WorkflowConnection[];
};

const nodeStyles = {
  active: "border-deep-teal/25 bg-deep-teal/[0.06]",
  pending: "border-slate/15 bg-white/80",
  complete: "border-pale-sage bg-pale-sage/35",
  default: "border-slate/15 bg-white/80",
};

export const WorkflowCanvas: FC<WorkflowCanvasProps> = ({
  title,
  description,
  nodes,
  connections,
}) => (
  <section className="mb-24">
    <div className="mb-9 max-w-3xl">
      <p className="text-eyebrow mb-3 uppercase tracking-wider">AI AUTOMATION</p>
      <h2 className="text-heading mb-4">{title}</h2>
      <p className="text-base leading-relaxed text-muted">{description}</p>
    </div>

    <div className="relative overflow-hidden rounded-3xl border border-slate/15 bg-white/65 p-5 shadow-xl shadow-graphite/[0.04] sm:p-8">
      <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-pale-sage/45 blur-3xl" />
      <div className="relative grid gap-3 md:grid-cols-4 md:gap-4">
        {nodes.map((node, index) => {
          const connection = connections.find((item) => item.from === node.id);
          return (
            <div key={node.id} className="relative flex min-w-0 flex-col">
              <article className={`relative flex-1 rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${nodeStyles[node.status || "default"]}`}>
                <div className="mb-5 flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-base font-semibold text-deep-teal shadow-sm">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-muted/65">Stage</span>
                </div>
                <h3 className="text-sm font-semibold text-graphite">{node.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted">{node.description}</p>
              </article>
              {index < nodes.length - 1 && (
                <div className="flex items-center justify-center py-2 md:absolute md:-right-4 md:top-1/2 md:z-10 md:-translate-y-1/2 md:py-0">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-deep-teal/15 bg-white text-xs text-deep-teal shadow-sm md:rotate-[-90deg]" aria-hidden="true">↓</span>
                  {connection?.label && <span className="sr-only">{connection.label}</span>}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="relative mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate/10 bg-white/80 px-4 py-3">
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">Information moves between connected systems</span>
        <span className="inline-flex items-center gap-2 text-[10px] font-medium text-deep-teal">
          <span className="h-2 w-2 rounded-full bg-deep-teal" /> Human review can remain in the loop
        </span>
      </div>
    </div>
  </section>
);
