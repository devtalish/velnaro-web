"use client";

import { type FC } from "react";
import { motion } from "motion/react";
import { SectionHeader } from "@/components/ui/section-header";
import { VIEWPORT_ONCE } from "@/animations/scroll-animations";

export const FounderMessage: FC = () => (
  <section id="founder" className="c-space section-spacing relative overflow-hidden">
    <div className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute left-1/4 top-1/3 h-72 w-72 rounded-full bg-deep-teal/10 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-pale-sage/20 blur-[140px]" />
    </div>

    <SectionHeader
      className="mb-12"
      eyebrow="A NOTE FROM THE FOUNDER"
      title={
        <>
          Technology matters when it solves the right problem.
        </>
      }
    />

    <div className="max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: 0.7 }}
        className="glass-strong gradient-border p-8 md:p-12"
      >
        <p className="text-base md:text-lg leading-relaxed text-muted">
          I started VELNARO around a simple idea: good software should do more than look impressive. It
          should solve real problems, make work easier, and create something people can genuinely rely on.
        </p>
        <p className="mt-4 text-base md:text-lg leading-relaxed text-muted">
          Our approach is to understand the problem first, make thoughtful technical decisions, and build
          digital products with purpose. Whether it is a web application, an AI-enabled system, or an
          automated workflow, the goal is to create something useful&mdash;not complexity for its own sake.
        </p>
        <p className="mt-4 text-base md:text-lg leading-relaxed text-muted">
          Thank you for taking the time to explore our work. If you have an idea or a challenge you are
          working through, we would be glad to hear about it.
        </p>

        <div className="mt-8 flex items-center gap-4">
          <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-graphite to-slate flex items-center justify-center overflow-hidden">
            <span className="text-2xl font-black text-white">MT</span>
          </div>
          <div>
            <p className="font-semibold text-graphite">Muhammad Talish</p>
            <p className="text-sm text-muted">Founder & Product / Technical Lead, VELNARO</p>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);