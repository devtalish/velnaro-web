"use client";

import { type FC, type MouseEvent, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";
import { TILT_RANGE, TILT_SPRING } from "@/constants/projects-constants";
import { type ProjectPreviewProps } from "@/types/project-types";

const isComingSoon = (href: string) => !href || href.trim() === "";
const DESKTOP_VIEWPORT_WIDTH = 1440;
const DESKTOP_VIEWPORT_HEIGHT = 900;

type PreviewStatus = "idle" | "loading" | "loaded" | "slow" | "error";

export const ProjectPreview: FC<ProjectPreviewProps> = ({ project, showPreview }) => {
  const prefersReducedMotion = useReducedMotion();
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(pointerY, [0, 1], TILT_RANGE.x), TILT_SPRING);
  const rotateY = useSpring(useTransform(pointerX, [0, 1], TILT_RANGE.y), TILT_SPRING);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [previewScale, setPreviewScale] = useState(0.25);
  const [previewStatus, setPreviewStatus] = useState<PreviewStatus>("idle");
  const comingSoon = isComingSoon(project.href);
  const previewUrl = project.href?.trim();

  useEffect(() => {
    const element = viewportRef.current;
    if (!element) return;
    const updateScale = () => {
      const bounds = element.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      setPreviewScale(Math.min(bounds.width / DESKTOP_VIEWPORT_WIDTH, bounds.height / DESKTOP_VIEWPORT_HEIGHT));
    };
    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!showPreview || !previewUrl || comingSoon) {
      setPreviewStatus("idle");
      return;
    }
    setPreviewStatus("loading");
    const timeout = window.setTimeout(() => {
      setPreviewStatus((current) => current === "loading" ? "slow" : current);
    }, 12000);
    return () => window.clearTimeout(timeout);
  }, [showPreview, previewUrl, comingSoon]);

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

  const scaledWidth = DESKTOP_VIEWPORT_WIDTH * previewScale;
  const scaledHeight = DESKTOP_VIEWPORT_HEIGHT * previewScale;

  return (
    <div className="order-1 min-w-0 lg:order-2 lg:col-span-7">
      <div style={{ perspective: "1400px" }} className="relative">
        <motion.div
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          whileTap={prefersReducedMotion ? undefined : { scale: 0.995 }}
          style={{ rotateX: prefersReducedMotion ? 0 : rotateX, rotateY: prefersReducedMotion ? 0 : rotateY, transformStyle: "preserve-3d" }}
          className="group relative aspect-[16/10] overflow-hidden rounded-[28px] border border-slate/15 bg-[#e9eeeb] shadow-[0_28px_80px_-38px_rgba(23,27,31,0.28)]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-deep-teal/15 via-pale-sage/35 to-[#f7f7f3]" />
          <div className="absolute inset-0 bg-white p-2 sm:p-3">
            <div className="relative z-20 flex h-8 items-center gap-2 rounded-t-xl border border-slate/10 bg-[#f5f5f2] px-3">
              <span className="h-2 w-2 rounded-full bg-[#d5a49b]" />
              <span className="h-2 w-2 rounded-full bg-[#dfc68f]" />
              <span className="h-2 w-2 rounded-full bg-[#9db9a9]" />
              <span className="ml-3 min-w-0 flex-1 truncate rounded-full bg-white px-3 py-1 text-[9px] text-muted">{previewUrl ? new URL(previewUrl).hostname : "velnaro.agency"}</span>
              {previewUrl && !comingSoon && <a href={previewUrl} target="_blank" rel="noopener noreferrer" className="shrink-0 text-[9px] font-semibold text-deep-teal hover:underline">Open site ↗</a>}
            </div>

            <div ref={viewportRef} className="absolute inset-x-2 bottom-2 top-10 overflow-hidden rounded-b-lg border-x border-b border-slate/10 bg-[#f8faf8] sm:inset-x-3 sm:bottom-3 sm:top-11">
              {previewUrl && !comingSoon ? (
                showPreview ? (
                  <>
                    <div className="absolute left-1/2 top-1/2" style={{ width: scaledWidth, height: scaledHeight, transform: "translate(-50%, -50%)" }}>
                      <iframe
                        key={previewUrl}
                        src={previewUrl}
                        title={project.title + " desktop website preview"}
                        width={DESKTOP_VIEWPORT_WIDTH}
                        height={DESKTOP_VIEWPORT_HEIGHT}
                        loading="eager"
                        referrerPolicy="strict-origin-when-cross-origin"
                        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                        allow="fullscreen; camera; microphone; autoplay; clipboard-read; clipboard-write"
                        onLoad={() => setPreviewStatus("loaded")}
                        onError={() => setPreviewStatus("error")}
                        style={{ width: DESKTOP_VIEWPORT_WIDTH, height: DESKTOP_VIEWPORT_HEIGHT, transform: "scale(" + previewScale + ")", transformOrigin: "top left", opacity: previewStatus === "loading" ? 0 : 1 }}
                        className="block max-w-none border-0 bg-white"
                      />
                    </div>
                    {(previewStatus === "loading" || previewStatus === "slow" || previewStatus === "error") && (
                      <div role="status" aria-live="polite" className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#f8faf8] via-[#edf3f0] to-[#e5eeea] px-5 text-center">
                        {previewStatus === "loading" && <span className="h-5 w-5 animate-spin rounded-full border-2 border-deep-teal/20 border-t-deep-teal" aria-hidden="true" />}
                        <span className="text-xs font-medium text-muted">
                          {previewStatus === "loading" ? "Loading original desktop site…" : previewStatus === "slow" ? "This preview is taking longer than expected." : "This site cannot be displayed inside the preview."}
                        </span>
                        {previewStatus !== "loading" && <a href={previewUrl} target="_blank" rel="noopener noreferrer" className="rounded-full bg-deep-teal px-4 py-2 text-xs font-semibold text-white">Open live website ↗</a>}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#f8faf8] via-[#edf3f0] to-[#e5eeea]">
                    <div className="h-3 w-3 animate-pulse rounded-full bg-deep-teal" aria-hidden="true" />
                    <span className="text-[10px] font-medium tracking-wide text-muted">Preparing live desktop preview…</span>
                  </div>
                )
              ) : (
                <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#f8faf8] via-[#edf3f0] to-[#e5eeea] p-5 sm:p-8">
                  <div className="w-full max-w-xl rounded-2xl border border-white/80 bg-white/85 p-6 shadow-[0_24px_70px_-32px_rgba(23,27,31,0.25)] sm:p-9">
                    <span className="inline-flex rounded-full border border-deep-teal/15 bg-deep-teal/[0.06] px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-deep-teal">{project.category}</span>
                    <h4 className="mt-5 text-3xl font-semibold leading-tight tracking-tight text-graphite sm:text-5xl">{project.title}</h4>
                    <p className="mt-3 max-w-lg text-xs leading-6 text-muted sm:text-sm">{project.description}</p>
                    <div className="mt-7 flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-deep-teal" /><span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-muted">Concept preview</span></div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <span className="absolute left-5 top-5 z-30 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-deep-teal shadow-sm"><span className="h-1.5 w-1.5 rounded-full bg-deep-teal" /> Original site</span>
          {comingSoon && <span className="absolute bottom-5 right-5 z-30 rounded-full border border-slate/15 bg-white/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">In development</span>}
        </motion.div>
      </div>
    </div>
  );
};
