"use client";

import { useRef, useEffect, type FC } from "react";
import { useReducedMotion, motion } from "motion/react";
import Image from "next/image";
import { type ProjectDetailsProps } from "@/types/portfolio-types";

export const ProjectDetails: FC<ProjectDetailsProps> = ({
  title,
  category,
  section,
  description,
  subDescription,
  tags,
  href,
  image,
  accent,
  closeModal,
}) => {
  const isComingSoon = !href || href.trim() === "";
  const reducedMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeModal();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((element) => element.offsetParent !== null);
      if (!focusable.length) {
        event.preventDefault();
        dialogRef.current.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [closeModal]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto p-4 backdrop-blur-md bg-graphite/60"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closeModal();
      }}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
        tabIndex={-1}
        className="relative w-full max-w-5xl glass-strong rounded-3xl overflow-hidden outline-none"
        initial={reducedMotion ? false : { opacity: 0, scale: 0.97, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.25, ease: "easeOut" }}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={closeModal}
          aria-label="Close project details"
          className="absolute z-10 p-2 rounded-full top-4 right-4 bg-white text-graphite shadow hover:bg-pale-sage transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-deep-teal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className={`relative flex h-56 items-end overflow-hidden bg-gradient-to-br ${accent} p-6 md:h-80 md:p-10`}>
          {image ? (
            <Image
              src={image}
              alt={`${title} project preview`}
              fill
              sizes="(max-width: 768px) 100vw, 960px"
              className="object-cover"
              priority
            />
          ) : (
            <>
              <div className="pointer-events-none absolute -right-16 -top-24 h-96 w-96 rounded-full border border-white/25" />
              <div className="pointer-events-none absolute -right-2 -top-14 h-72 w-72 rounded-full border border-white/20" />
              <div className="pointer-events-none absolute right-24 top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
              <div className="relative z-10 max-w-3xl">
                <span className="inline-flex rounded-full border border-white/30 bg-white/15 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-md">
                  {section === "selected-work" ? "Selected work" : "Interactive demonstration"}
                </span>
                <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/70">{category}</p>
                <p className="mt-2 text-4xl font-semibold tracking-tight text-white md:text-6xl">{title}</p>
              </div>
            </>
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-graphite/35 via-transparent to-transparent" />
        </div>

        <div className="p-6 md:p-8">
          <h2 id="project-dialog-title" className="mb-3 text-2xl md:text-3xl font-bold text-graphite">
            {title}
          </h2>
          {tags && tags.length > 0 && (
            <div className="mb-5 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag.id} className="rounded-full border border-slate/20 bg-white px-3 py-1 text-xs text-slate">
                  {tag.name}
                </span>
              ))}
            </div>
          )}
          <p className="mb-6 text-muted leading-relaxed">{description}</p>
          {subDescription && subDescription.length > 0 && (
            <div className="mb-8 space-y-3 text-sm text-muted">
              {subDescription.map((subDesc, index) => <p key={index}>{subDesc}</p>)}
            </div>
          )}
          {!isComingSoon && href ? (
            <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full bg-deep-teal text-white hover:-translate-y-0.5 transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep-teal">
              <span>Open Live Website</span><span aria-hidden>→</span>
            </a>
          ) : (
            <p className="text-sm text-muted">A preview will be available soon.</p>
          )}
        </div>
      </motion.div>
    </div>
  );
};
