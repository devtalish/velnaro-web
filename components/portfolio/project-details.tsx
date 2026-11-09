"use client";

import { useRef, useEffect, type FC } from "react";
import { useReducedMotion, motion } from "motion/react";
import Image from "next/image";
import { type ProjectDetailsProps } from "@/types/portfolio-types";

export const ProjectDetails: FC<ProjectDetailsProps> = ({
  title,
  description,
  subDescription,
  tags,
  href,
  closeModal,
}) => {
  const isComingSoon = !href || href.trim() === "";
  const reducedMotion = useReducedMotion();
  const htmlElement = useRef<HTMLDivElement>(null);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto p-4 backdrop-blur-md bg-graphite/60"
      onClick={closeModal}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl glass-strong rounded-3xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <button
          onClick={closeModal}
          aria-label="Close"
          className="absolute z-10 p-2 rounded-full top-4 right-4 bg-slate/20 hover:bg-slate/30 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
            aria-hidden="true"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="relative h-80 md:h-96 bg-gradient-to-br from-slate to-graphite overflow-hidden">
          <Image
            src="/placeholder-project-main.svg"
            alt={title}
            width={400}
            height={300}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(23,107,101,0.2),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(23,27,31,0.2),transparent_55%)]" />
          <div className="relative h-full w-full flex items-center justify-center">
<Image
            src="/placeholder-project-main.svg"
            alt={title}
            width={24}
            height={24}
            className="hidden md:block w-24 h-24 rounded-full object-cover mx-auto"
            loading="lazy"
          />
          </div>
        </div>

        <div className="p-6 md:p-8">
          <h2 className="mb-1 text-2xl md:text-3xl font-bold text-graphite">
            {title}
          </h2>
          {tags && tags.length > 0 && (
            <p className="text-sm text-muted/60 capitalize">
              {tags.map((tag) => (
                <span key={tag.id} className="me-2 rounded-full border border-slate/20 bg-white px-2 py-1 text-xs">
                  {tag.name}
                </span>
              ))}
          </p>
          )}

          <p className="mb-6 text-muted">{description}</p>

          {subDescription && subDescription.length > 0 && (
            <div className="mb-8 space-y-3 text-sm text-muted/60">
              {subDescription.map((subDesc, index) => (
                <p key={index}>{subDesc}</p>
              ))}
            </div>
          )}

          {tags && tags.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xs uppercase tracking-wider text-deep-teal mb-3">Features</h3>
              <div className="grid grid-cols-2 gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="rounded-full border border-slate/20 bg-white px-3 py-1 text-xs text-muted"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {!isComingSoon && href && (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full bg-deep-teal text-white hover:-translate-y-0.5 transition-transform"
            >
              <span>Open Live Website</span>
              <span aria-hidden>→</span>
            </a>
          )}

          <button
            onClick={closeModal}
            aria-label="Close"
            className="mt-4 p-2 rounded-full bg-slate/20 hover:bg-slate/30 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
              aria-hidden="true"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      </motion.div>
    </div>
  );
};