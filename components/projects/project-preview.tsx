"use client";

import { type FC, type MouseEvent } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";
import { TILT_RANGE, TILT_SPRING } from "@/constants/projects-constants";
import { formatCounter, padIndex } from "@/helpers/format-helpers";
import { type ProjectPreviewProps } from "@/types/project-types";

const BADGE =
  "rounded-full border border-slate/15 bg-white/90 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.22em] text-graphite backdrop-blur-md";

const isComingSoon = (href: string) => !href || href.trim() === "";

export const ProjectPreview: FC<ProjectPreviewProps> = ({
  project,
  index,
  total,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(pointerY, [0, 1], TILT_RANGE.x), TILT_SPRING);
  const rotateY = useSpring(useTransform(pointerX, [0, 1], TILT_RANGE.y), TILT_SPRING);

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

  const comingSoon = isComingSoon(project.href);

  return (
    <div className="order-1 lg:order-2 lg:col-span-7">
      <div style={{ perspective: "1400px" }} className="relative">
        <motion.div
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          style={{
            rotateX: prefersReducedMotion ? 0 : rotateX,
            rotateY: prefersReducedMotion ? 0 : rotateY,
            transformStyle: "preserve-3d",
          }}
          className="group relative aspect-[4/3] overflow-hidden rounded-[28px] border border-slate/15 bg-[#e9eeeb] shadow-[0_28px_80px_-38px_rgba(23,27,31,0.28)] md:aspect-[16/10]"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-35`} />
          <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full border border-white/50" />
          <div className="pointer-events-none absolute -right-8 -top-12 h-56 w-56 rounded-full border border-white/40" />
          <div className="pointer-events-none absolute -bottom-36 -left-24 h-96 w-96 rounded-full bg-white/35 blur-3xl" />

          {project.image ? (
            <Image
              src={project.image}
              alt={`${project.title} project preview`}
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="pointer-events-none select-none object-cover object-top"
            />
          ) : comingSoon ? (
            <div className="absolute inset-0 flex items-center justify-center bg-graphite/[0.025]">
              <div className="max-w-sm p-8 text-center">
                <span className="mx-auto mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-deep-teal/15 bg-white/75 text-deep-teal shadow-sm">
                  <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <p className="text-xl font-semibold tracking-tight text-graphite">In development</p>
                <p className="mt-2 text-sm leading-6 text-muted">This concept is being prepared for a future interactive demonstration.</p>
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-10">
              <div className="relative w-full max-w-[620px] overflow-hidden rounded-2xl border border-white/80 bg-[#fbfcfa]/90 shadow-[0_24px_70px_-28px_rgba(23,27,31,0.28)] backdrop-blur-sm">
                <div className="flex h-10 items-center gap-2 border-b border-slate/10 px-4">
                  <span className="h-2 w-2 rounded-full bg-[#d5a49b]" />
                  <span className="h-2 w-2 rounded-full bg-[#dfc68f]" />
                  <span className="h-2 w-2 rounded-full bg-[#9db9a9]" />
                  <span className="ml-3 h-1.5 w-1/3 rounded-full bg-slate/10" />
                  <span className="ml-auto text-[9px] font-medium uppercase tracking-[0.2em] text-muted/70">Project overview</span>
                </div>
                <div className="grid min-h-[230px] grid-cols-[1fr_0.72fr] gap-4 p-5 sm:min-h-[285px] sm:gap-6 sm:p-8">
                  <div className="flex flex-col justify-between">
                    <div>
                      <span className="inline-flex rounded-full border border-deep-teal/15 bg-deep-teal/[0.06] px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-deep-teal">{project.category}</span>
                      <h3 className="mt-4 max-w-sm text-2xl font-semibold leading-tight tracking-tight text-graphite sm:text-4xl">{project.title}</h3>
                      <p className="mt-3 max-w-xs text-xs leading-5 text-muted sm:text-sm sm:leading-6">{project.description}</p>
                    </div>
                    <div className="mt-6 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-deep-teal" />
                      <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-muted">Velnaro selected work</span>
                    </div>
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
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.18),transparent_45%,rgba(23,27,31,0.04))]" />

          <div
            style={{ transform: "translateZ(70px)" }}
            className="pointer-events-none absolute left-4 right-4 top-4 flex items-center justify-between sm:left-5 sm:right-5 sm:top-5"
          >
            <span className={BADGE}>{project.image ? "Project image" : comingSoon ? "Coming soon" : "Project overview"}</span>
            <span className={BADGE}>{formatCounter(index, total)}</span>
          </div>

          {!comingSoon && project.href && (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ transform: "translateZ(80px)" }}
              className="absolute bottom-4 right-4 inline-flex min-h-10 items-center gap-2 rounded-full border border-white/80 bg-graphite px-4 py-2 text-xs font-medium text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-deep-teal sm:bottom-5 sm:right-5"
            >
              <span>Open live website</span>
              <span aria-hidden>↗</span>
            </a>
          )}

          <div
            style={{ transform: "translateZ(50px)" }}
            className={`${BADGE} pointer-events-none absolute bottom-4 left-4 sm:bottom-5 sm:left-5`}
          >
            {project.title}
          </div>

          <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-inset ring-white/50" />
        </motion.div>
      </div>
    </div>
  );
};
