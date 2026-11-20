"use client";

import { type FC, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";
import { TILT_RANGE, TILT_SPRING } from "@/constants/projects-constants";
import { type ProjectPreviewProps } from "@/types/project-types";

const isComingSoon = (href: string) => !href || href.trim() === "";

export const ProjectPreview: FC<ProjectPreviewProps> = ({ project, showPreview }) => {
  const prefersReducedMotion = useReducedMotion();
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(pointerY, [0, 1], TILT_RANGE.x), TILT_SPRING);
  const rotateY = useSpring(useTransform(pointerX, [0, 1], TILT_RANGE.y), TILT_SPRING);
  const comingSoon = isComingSoon(project.href);
  const previewUrl = project.href?.trim();

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
    <div className="order-1 min-w-0 lg:order-2 lg:col-span-7">
      <div style={{ perspective: "1400px" }} className="relative">
        <motion.div
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          style={{ rotateX: prefersReducedMotion ? 0 : rotateX, rotateY: prefersReducedMotion ? 0 : rotateY, transformStyle: "preserve-3d" }}
          className="group relative aspect-[4/3] overflow-hidden rounded-[28px] border border-slate/15 bg-[#e9eeeb] shadow-[0_28px_80px_-38px_rgba(23,27,31,0.28)] md:aspect-[16/10]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-deep-teal/15 via-pale-sage/35 to-[#f7f7f3]" />

          <div className="absolute inset-0 bg-white p-2 sm:p-3">
            <div className="relative z-20 flex h-8 items-center gap-2 rounded-t-xl border border-slate/10 bg-[#f5f5f2] px-3">
              <span className="h-2 w-2 rounded-full bg-[#d5a49b]" />
              <span className="h-2 w-2 rounded-full bg-[#dfc68f]" />
              <span className="h-2 w-2 rounded-full bg-[#9db9a9]" />
              <span className="ml-3 min-w-0 flex-1 truncate rounded-full bg-white px-3 py-1 text-[9px] text-muted">
                {previewUrl ? new URL(previewUrl).hostname : "velnaro.agency"}
              </span>
              <span className="hidden text-[9px] font-semibold uppercase tracking-[0.15em] text-deep-teal sm:inline">
                Live preview
              </span>
            </div>

            <div className="absolute inset-x-2 bottom-2 top-10 overflow-hidden rounded-b-lg border-x border-b border-slate/10 bg-[#f8faf8] sm:inset-x-3 sm:bottom-3 sm:top-11">
              {showPreview && previewUrl && !comingSoon ? (
                <iframe
                  key={previewUrl}
                  src={previewUrl}
                  title={`${project.title} live website preview`}
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                  allow="fullscreen; camera; microphone; autoplay; clipboard-read; clipboard-write"
                  className="h-full w-full border-0 bg-white"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#f8faf8] via-[#edf3f0] to-[#e5eeea] p-5 sm:p-8">
                  <div className="w-full max-w-xl rounded-2xl border border-white/80 bg-white/85 p-6 shadow-[0_24px_70px_-32px_rgba(23,27,31,0.25)] sm:p-9">
                    <span className="inline-flex rounded-full border border-deep-teal/15 bg-deep-teal/[0.06] px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-deep-teal">
                      {project.category}
                    </span>
                    <h4 className="mt-5 text-3xl font-semibold leading-tight tracking-tight text-graphite sm:text-5xl">
                      {project.title}
                    </h4>
                    <p className="mt-3 max-w-lg text-xs leading-6 text-muted sm:text-sm">
                      {project.description}
                    </p>
                    <div className="mt-7 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-deep-teal" />
                      <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-muted">
                        {comingSoon ? "Concept preview" : "Loading live preview"}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {!comingSoon && previewUrl && (
            <>
              <a
                href={previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-5 right-5 z-30 inline-flex min-h-10 items-center gap-2 rounded-full bg-graphite px-4 py-2 text-xs font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-deep-teal"
              >
                Open live website <span aria-hidden>↗</span>
              </a>
              <span className="absolute left-5 top-5 z-30 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-deep-teal shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-deep-teal" /> Original site
              </span>
            </>
          )}

          {comingSoon && (
            <span className="absolute bottom-5 right-5 z-30 rounded-full border border-slate/15 bg-white/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
              In development
            </span>
          )}
        </motion.div>
      </div>
    </div>
  );
};
