"use client";

import { type FC, type MouseEvent } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { TILT_RANGE, TILT_SPRING } from "@/constants/projects-constants";
import { formatCounter, padIndex } from "@/helpers/format-helpers";
import { type ProjectPreviewProps } from "@/types/project-types";

const BADGE =
  "rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[10px] uppercase tracking-[0.3em] backdrop-blur-md";

const isComingSoon = (href: string) => !href || href.trim() === "";

export const ProjectPreview: FC<ProjectPreviewProps> = ({
  project,
  index,
  total,
  showPreview,
}) => {
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const rotateX = useSpring(
    useTransform(pointerY, [0, 1], TILT_RANGE.x),
    TILT_SPRING
  );
  const rotateY = useSpring(
    useTransform(pointerX, [0, 1], TILT_RANGE.y),
    TILT_SPRING
  );

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
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
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-slate/20 bg-white/90 shadow-2xl shadow-black/10 md:aspect-[16/10]"
        >
          <div
            className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-40`}
          />

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="text-[10rem] font-black leading-none tracking-tighter text-slate/10 md:text-[14rem]">
              {padIndex(index + 1)}
            </span>
          </div>

          {project.image ? (
            <Image
              src={project.image}
              alt={`${project.title} homepage`}
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="pointer-events-none select-none object-cover object-top"
            />
          ) : (
            comingSoon ? (
              <div className="absolute inset-0 flex items-center justify-center bg-slate/5">
                <div className="text-center p-8">
                  <span className="inline-flex items-center justify-center rounded-full bg-deep-teal/10 text-deep-teal h-16 w-16 mb-4">
                    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  <p className="text-lg font-medium text-graphite">Coming Soon</p>
                  <p className="mt-1 text-sm text-muted">This project is not yet publicly deployed</p>
                </div>
              </div>
            ) : (
              showPreview && (
                <iframe
                  src={project.href}
                  title={project.title}
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin"
                  referrerPolicy="no-referrer"
                  className="pointer-events-none absolute inset-0 select-none bg-transparent"
                  style={{
                    width: "180%",
                    height: "180%",
                    transform: "scale(0.555)",
                    transformOrigin: "top left",
                    border: 0,
                    colorScheme: "normal",
                  }}
                />
              )
            )
          )}

          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),transparent_45%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(0,0,0,0.35),transparent_45%)]" />

          <div
            style={{ transform: "translateZ(70px)" }}
            className="pointer-events-none absolute left-5 right-5 top-5 flex items-center justify-between"
          >
            <span
              className={`${BADGE} inline-flex items-center gap-2 border-slate/30 bg-white/80 text-graphite`}
            >
              {!project.image && !comingSoon && (
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inset-0 animate-ping rounded-full bg-deep-teal opacity-75" />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-deep-teal" />
                </span>
              )}
              {project.image ? "Preview" : comingSoon ? "Coming Soon" : "Live Preview"}
            </span>
            <span className={`${BADGE} text-muted border-slate/30 bg-white/80`}>
              {formatCounter(index, total)}
            </span>
          </div>

          {!comingSoon && project.href && (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ transform: "translateZ(80px)" }}
              className="absolute bottom-5 right-5 inline-flex items-center gap-2 rounded-full border border-slate/30 bg-white/80 px-4 py-2 text-xs text-graphite backdrop-blur-md hover:border-deep-teal/50"
            >
              <span>Open Live Website</span>
              <span aria-hidden>↗</span>
            </a>
          )}

          <div
            style={{ transform: "translateZ(50px)" }}
            className={`${BADGE} pointer-events-none absolute bottom-5 left-5 text-graphite border-slate/30 bg-white/80`}
          >
            {project.title}
          </div>

          <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-slate/20" />
        </motion.div>
      </div>
    </div>
  );
};
