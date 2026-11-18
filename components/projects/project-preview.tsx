"use client";

import { type FC, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";
import { TILT_RANGE, TILT_SPRING } from "@/constants/projects-constants";
import { type ProjectPreviewProps } from "@/types/project-types";

const isComingSoon = (href: string) => !href || href.trim() === "";

export const ProjectPreview: FC<ProjectPreviewProps> = ({ project }) => {
  const prefersReducedMotion = useReducedMotion();
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(pointerY, [0, 1], TILT_RANGE.x), TILT_SPRING);
  const rotateY = useSpring(useTransform(pointerX, [0, 1], TILT_RANGE.y), TILT_SPRING);
  const comingSoon = isComingSoon(project.href);

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width);
    pointerY.set((event.clientY - bounds.top) / bounds.height);
  };

  const handleLeave = () => {
    pointerX.set(0.5);
    pointerY.set(0.5);
  };

  return (
    <div className="order-1 lg:order-2 lg:col-span-7">
      <div style={{ perspective: "1400px" }} className="relative">
        <motion.div
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          style={{ rotateX: prefersReducedMotion ? 0 : rotateX, rotateY: prefersReducedMotion ? 0 : rotateY, transformStyle: "preserve-3d" }}
          className="group relative aspect-[4/3] overflow-hidden rounded-[28px] border border-slate/15 bg-[#e9eeeb] shadow-[0_28px_80px_-38px_rgba(23,27,31,0.28)] md:aspect-[16/10]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-deep-teal/15 via-pale-sage/35 to-[#f7f7f3]" />
          {project.href && !comingSoon ? (
            <>
              <div className="absolute inset-0 bg-white p-2 sm:p-3">
                <div className="flex h-8 items-center gap-2 rounded-t-xl border border-slate/10 bg-[#f5f5f2] px-3">
                  <span className="h-2 w-2 rounded-full bg-[#d5a49b]" />
                  <span className="h-2 w-2 rounded-full bg-[#dfc68f]" />
                  <span className="h-2 w-2 rounded-full bg-[#9db9a9]" />
                  <span className="ml-3 min-w-0 flex-1 truncate rounded-full bg-white px-3 py-1 text-[9px] text-muted">{new URL(project.href).hostname}</span>
                  <span className="hidden text-[9px] font-semibold uppercase tracking-[0.15em] text-deep-teal sm:inline">Live site</span>
                </div>
                <div className="relative h-[calc(100%-2rem)] overflow-hidden rounded-b-lg border-x border-b border-slate/10 bg-white">
                  <iframe
                    src={project.href}
                    title={`${project.title} live website preview`}
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    className="pointer-events-none absolute left-0 top-0 h-[220%] w-[200%] origin-top-left scale-50 border-0 bg-white"
                    tabIndex={-1}
                    aria-hidden="true"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/95 to-transparent" />
                </div>
              </div>
              <a href={project.href} target="_blank" rel="noopener noreferrer" className="absolute bottom-5 right-5 z-10 inline-flex min-h-10 items-center gap-2 rounded-full bg-graphite px-4 py-2 text-xs font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-deep-teal">
                Open live website <span aria-hidden>↗</span>
              </a>
              <span className="absolute left-5 top-5 z-10 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-deep-teal shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-deep-teal" /> Live preview
              </span>
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-10">
              <div className="relative w-full max-w-[620px] overflow-hidden rounded-2xl border border-white/80 bg-[#fbfcfa]/90 shadow-[0_24px_70px_-28px_rgba(23,27,31,0.28)] backdrop-blur-sm">
                <div className="flex h-10 items-center gap-2 border-b border-slate/10 px-4">
                  <span className="h-2 w-2 rounded-full bg-[#d5a49b]" /><span className="h-2 w-2 rounded-full bg-[#dfc68f]" /><span className="h-2 w-2 rounded-full bg-[#9db9a9]" />
                  <span className="ml-auto text-[9px] font-medium uppercase tracking-[0.2em] text-muted/70">Concept preview</span>
                </div>
                <div className="grid min-h-[230px] grid-cols-[1fr_0.72fr] gap-4 p-5 sm:min-h-[285px] sm:gap-6 sm:p-8">
                  <div className="flex flex-col justify-between">
                    <div>
                      <span className="inline-flex rounded-full border border-deep-teal/15 bg-deep-teal/[0.06] px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-deep-teal">{project.category}</span>
                      <h3 className="mt-4 max-w-sm text-2xl font-semibold leading-tight tracking-tight text-graphite sm:text-4xl">{project.title}</h3>
                      <p className="mt-3 max-w-xs text-xs leading-5 text-muted sm:text-sm sm:leading-6">{project.description}</p>
                    </div>
                    <div className="mt-6 flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-deep-teal" /><span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-muted">Velnaro concept</span></div>
                  </div>
                  <div className="relative flex items-center justify-center">
                    <div className="absolute inset-2 rounded-[28px] bg-gradient-to-br from-deep-teal/15 via-pale-sage/50 to-white" />
                    <div className="relative flex aspect-square w-full max-w-[190px] items-center justify-center rounded-[26px] border border-white/80 bg-white/55 shadow-inner">
                      <span className="text-7xl font-black tracking-[-0.09em] text-deep-teal/80 sm:text-8xl">{project.title.slice(0, 1)}</span>
                      <span className="absolute bottom-4 right-4 h-8 w-8 rounded-full border border-deep-teal/20 bg-white/80" />
                      <span className="absolute left-4 top-4 h-3 w-3 rounded-full bg-pale-sage" />
                    </div>
                  </div>
                </div>
              </div>
              <span className="absolute bottom-5 right-5 rounded-full border border-slate/15 bg-white/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">In development</span>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
