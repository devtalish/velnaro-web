"use client";

import { type FC } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { type ProjectDetailsProps } from "@/types/portfolio-types";

const isComingSoon = (href: string) => !href || href.trim() === "";

export const ProjectDetails: FC<ProjectDetailsProps> = ({
  title,
  description,
  subDescription,
  tags,
  href,
  closeModal,
}) => {
  const comingSoon = isComingSoon(href);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto p-4 backdrop-blur-md bg-graphite/60"
      onClick={closeModal}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl glass-strong"
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <button
          onClick={closeModal}
          aria-label="Close"
          className="absolute z-10 p-2 rounded-full top-4 right-4 bg-slate/20 hover:bg-slate/30 transition-colors"
        >
          <Image
            src="/assets/close.svg"
            alt=""
            width={20}
            height={20}
            className="w-5 h-5"
          />
        </button>
        <div className="relative h-48 md:h-56 bg-gradient-to-br from-slate to-graphite overflow-hidden rounded-t-3xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(23,107,101,0.4),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(23,27,31,0.3),transparent_55%)]" />
          <div className="relative h-full w-full flex items-center justify-center">
            <span className="text-7xl md:text-8xl font-black text-white/10">
              {title.slice(0, 1)}
            </span>
          </div>
          {comingSoon && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <div className="text-center p-8">
                <span className="inline-flex items-center justify-center rounded-full bg-deep-teal/10 text-deep-teal h-16 w-16 mb-4">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <p className="text-2xl font-bold text-white">Coming Soon</p>
                <p className="mt-1 text-base text-white/70">This project is not yet publicly deployed</p>
              </div>
            </div>
          )}
        </div>
        <div className="p-6 md:p-8">
          <h5 className="mb-2 text-2xl md:text-3xl font-bold text-graphite">
            {title}
          </h5>
          <p className="mb-5 text-muted">{description}</p>
          <ul className="space-y-3 mb-6">
            {subDescription.map((subDesc, index) => (
              <li
                key={index}
                className="flex gap-3 text-sm text-muted"
              >
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-deep-teal flex-shrink-0" />
                <span>{subDesc}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate/20">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag.id}
                  className="rounded-full border border-slate/20 bg-white px-3 py-1 text-xs text-muted"
                >
                  {tag.name}
                </span>
              ))}
            </div>
            {!comingSoon && href && (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary !py-2 !px-4 !text-sm"
              >
                <span>Open Live Website</span>
                <span aria-hidden>↗</span>
              </a>
            )}
            {comingSoon && (
              <span className="btn-ghost !py-2 !px-4 !text-sm text-muted border-slate/30">
                Coming Soon
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
