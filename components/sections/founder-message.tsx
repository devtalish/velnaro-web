"use client";

import { type FC, type PointerEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { SectionHeader } from "@/components/ui/section-header";
import { VIEWPORT_ONCE } from "@/animations/scroll-animations";
import { TILT_RANGE, TILT_SPRING } from "@/constants/projects-constants";

const BADGE = "rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[10px] uppercase tracking-[0.3em] backdrop-blur-md";

export const FounderMessage: FC = () => {
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
        title={
          <>
            Technology matters when it solves the right problem.
          </>
        }
      />

      <div style={{ perspective: "1400px" }} className="relative">
        <motion.div
          onPointerMove={handleMove}
          onPointerLeave={handleLeave}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl border border-slate/20 bg-white/90 shadow-2xl shadow-black/10"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-deep-teal/40 to-slate/10 opacity-40" />

          <div className="relative z-10 p-8 md:p-12">
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

            <div
              style={{ transform: "translateZ(70px)" }}
              className="mt-8 flex items-center justify-between gap-4"
            >
              <span className={`${BADGE} inline-flex items-center gap-2 border-slate/30 bg-white/80 text-graphite`}>
                Note
              </span>
              <span className={`${BADGE} text-muted border-slate/30 bg-white/80`}>
                01 / 01
              </span>
            </div>

            <div
              style={{ transform: "translateZ(50px)" }}
              className="mt-6 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-graphite to-slate flex items-center justify-center overflow-hidden">
                  <span className="text-xl font-black text-white">MT</span>
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-graphite truncate">Muhammad Talish</p>
                  <p className="text-sm text-muted truncate">Founder & Product / Technical Lead, VELNARO</p>
                </div>
              </div>
              <a
                href="#contact"
                style={{ transform: "translateZ(80px)" }}
                className="flex-shrink-0 inline-flex items-center gap-2 rounded-full border border-slate/30 bg-white/80 px-4 py-2 text-xs text-graphite backdrop-blur-md hover:border-deep-teal/50 transition-colors"
              >
                <span>Get in Touch</span>
                <span aria-hidden>↗</span>
              </a>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),transparent_45%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(0,0,0,0.35),transparent_45%)]" />

          <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-slate/20" />
        </motion.div>
      </div>
    </section>
  );
};