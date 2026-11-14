"use client";

import { type FC, type PointerEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";
import { SectionHeader } from "@/components/ui/section-header";
import { VIEWPORT_ONCE } from "@/animations/scroll-animations";
import { TILT_RANGE, TILT_SPRING } from "@/constants/projects-constants";

const BADGE = "rounded-full border border-slate/20 bg-white/80 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-graphite backdrop-blur-md";

export const FounderMessage: FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(pointerY, [0, 1], TILT_RANGE.x), TILT_SPRING);
  const rotateY = useSpring(useTransform(pointerX, [0, 1], TILT_RANGE.y), TILT_SPRING);

  const handleMove = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width);
    pointerY.set((event.clientY - bounds.top) / bounds.height);
  };

  const handleLeave = () => {
    pointerX.set(0.5);
    pointerY.set(0.5);
  };

  return (
    <section id="founder" className="c-space section-spacing relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/3 h-72 w-72 rounded-full bg-deep-teal/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-pale-sage/20 blur-[140px]" />
      </div>

      <SectionHeader
        className="mb-12"
        eyebrow="A NOTE FROM THE FOUNDER"
        title={<>Technology matters when it solves the right problem.</>}
      />

      <div style={{ perspective: "1400px" }} className="relative">
        <motion.div
          onPointerMove={prefersReducedMotion ? undefined : handleMove}
          onPointerLeave={handleLeave}
          style={{ rotateX: prefersReducedMotion ? 0 : rotateX, rotateY: prefersReducedMotion ? 0 : rotateY, transformStyle: "preserve-3d" }}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: prefersReducedMotion ? 0 : 0.7 }}
          className="relative overflow-hidden rounded-3xl border border-slate/20 bg-white/90 shadow-xl shadow-graphite/[0.06]"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(23,107,101,0.09),transparent_42%),radial-gradient(circle_at_100%_100%,rgba(217,231,226,0.55),transparent_48%)]" />

          <div className="relative z-10 p-8 md:p-12">
            <div className="max-w-4xl">
              <p className="text-base leading-relaxed text-muted md:text-lg">
                I started VELNARO around a simple idea: good software should do more than look impressive. It
                should solve real problems, make work easier, and create something people can genuinely rely on.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
                Our approach is to understand the problem first, make thoughtful technical decisions, and build
                digital products with purpose. Whether it is a web application, an AI-enabled system, or an
                automated workflow, the goal is to create something useful&mdash;not complexity for its own sake.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
                Thank you for taking the time to explore our work. If you have an idea or a challenge you are
                working through, we would be glad to hear about it.
              </p>
            </div>

            <div style={{ transform: "translateZ(70px)" }} className="mt-8 flex items-center justify-between gap-4">
              <span className={BADGE}>A note from our founder</span>
              <span className={BADGE}>01 / 01</span>
            </div>

            <div style={{ transform: "translateZ(50px)" }} className="mt-6 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
              <div className="flex min-w-0 flex-1 items-center gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-graphite to-slate">
                  <span className="text-xl font-black text-white">MT</span>
                </div>
                <div className="min-w-0">
                  <p className="truncate font-semibold text-graphite">Muhammad Talish</p>
                  <p className="truncate text-sm text-muted">Founder & Product / Technical Lead, VELNARO</p>
                </div>
              </div>
              <a
                href="#contact"
                style={{ transform: "translateZ(80px)" }}
                className="inline-flex flex-shrink-0 items-center gap-2 rounded-full border border-slate/25 bg-white/85 px-5 py-3 text-sm font-medium text-graphite backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-deep-teal/50 hover:text-deep-teal"
              >
                <span>Get in Touch</span>
                <span aria-hidden>↗</span>
              </a>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-slate/15" />
        </motion.div>
      </div>
    </section>
  );
};