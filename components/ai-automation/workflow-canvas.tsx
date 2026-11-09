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
  active: "bg-deep-teal text-white",
  pending: "bg-pale-sage text-graphite",
  complete: "bg-slate/40 text-graphite",
  default: "text-graphite",
};

export const WorkflowCanvas: FC<WorkflowCanvasProps> = ({
  title,
  description,
  nodes,
  connections,
}) => (
  <section className="mb-20">
    <div className="grid lg:grid-cols-2 gap-16 items-center">
      <div>
        <p className="text-eyebrow uppercase tracking-wider mb-3">AI AUTOMATION</p>
        <h2 className="text-heading mb-5">{title}</h2>
        <p className="text-base text-muted leading-relaxed mb-6">
          {description}
        </p>
        <div className="space-y-3 text-sm text-muted">
          {nodes.map((node) => (
            <div
              key={node.id}
              className={`flex items-start gap-3 ${nodeStyles[node.status || "default"] || ""}`}
            >
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" />
              <div>
                <h3 className="font-medium text-graphite">{node.title}</h3>
                <p className="text-muted">{node.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-slate/20">
        <svg
          className="absolute inset-0 w-full h-full fill-none stroke-deep-teal/30 stroke-0.5"
        >
          {connections.map((conn) => (
            <line
              key={conn.from + "-" + conn.to}
              x1={0}
              y1={0}
              x2={100}
              y2={100}
              strokeWidth="1"
            />
          ))}
        </svg>
        <div className="absolute inset-0 p-6">
          <p className="text-sm text-muted/60">
            Information flow: incoming enquiry → extraction → rules → system → notification
          </p>
        </div>
      </div>
    </div>
  </section>
);