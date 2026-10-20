"use client";

import { type FC } from "react";
import { motion } from "motion/react";
import { SectionHeader } from "@/components/ui/section-header";
import { VIEWPORT_ONCE } from "@/animations/scroll-animations";

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Discover",
    description:
      "Understand the problem, the people involved, the goals, and the constraints before choosing a solution.",
  },
  {
    number: "02",
    title: "Plan",
    description:
      "Define the scope, map the experience, and make the technical decisions that guide the work.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "Develop the solution in focused stages, keeping functionality, quality, and usability in view.",
  },
  {
    number: "04",
    title: "Validate",
    description:
      "Test the experience, check important edge cases, and refine the details that matter.",
  },
  {
    number: "05",
    title: "Deliver",
    description:
      "Prepare the finished work, document what is needed, and establish a clear handover.",
  },
] as const;

export const Process: FC = () => (
  <section id="process" className="c-space section-spacing relative overflow-hidden">
    <div className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute left-1/4 top-1/3 h-72 w-72 rounded-full bg-deep-teal/10 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-pale-sage/20 blur-[140px]" />
    </div>

    <SectionHeader
      className="mb-12"
      eyebrow="HOW WE WORK"
      title={
        <>
          A clear path from idea to delivery.
        </>
      }
    />

    <p className="text-muted max-w-2xl mb-12">
      Good software starts with understanding the problem. A deliberate process helps turn that
      understanding into a useful, tested result.
    </p>

    <div className="relative">
      <div className="absolute left-8 top-0 bottom-0 w-px bg-slate/20 hidden md:block" />
      {PROCESS_STEPS.map((step, index) => (
        <motion.div
          key={step.number}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="relative flex gap-6 md:pl-16 pb-16 last:pb-0"
        >
          <div className="relative flex-shrink-0 flex items-center justify-center">
            <div className="absolute left-8 top-0 w-px h-full bg-slate/20" />
            <div
              className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 ${
                index === 0
                  ? "border-deep-teal bg-deep-teal text-white"
                  : "border-slate/20 bg-white text-slate/40"
              }`}
            >
              <span className="text-sm font-bold tracking-tight">{step.number}</span>
            </div>
          </div>
          <div className="flex-1 pt-1">
            <h3 className="text-xl font-bold text-graphite">{step.title}</h3>
            <p className="mt-2 text-muted leading-relaxed">{step.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);