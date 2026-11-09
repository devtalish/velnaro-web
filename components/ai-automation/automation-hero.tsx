"use client";

import { type FC } from "react";
import Link from "next/link";

type AutomationHeroProps = {
  eyebrow: string;
  headline: string;
  subtitle: string;
  primaryCtaText: string;
  primaryCtaHref: string;
  secondaryCtaText: string;
  secondaryCtaHref: string;
};

export const AutomationHero: FC<AutomationHeroProps> = ({
  eyebrow,
  headline,
  subtitle,
  primaryCtaText,
  primaryCtaHref,
  secondaryCtaText,
  secondaryCtaHref,
}) => (
  <section className="max-w-7xl mx-auto px-6 pt-24 pb-16">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <p className="text-eyebrow mb-3 uppercase tracking-wider">{eyebrow}</p>
        <h1 className="text-heading mb-6 max-w-xl">
          {headline}
        </h1>
        <p className="text-base text-muted leading-relaxed mb-8">
          {subtitle}
        </p>
        <div className="flex gap-4">
          <Link
            href={primaryCtaHref}
            className="btn-primary flex items-center gap-2"
          >
            <span>{primaryCtaText}</span>
          </Link>
          <Link
            href={secondaryCtaHref}
            className="btn-ghost flex items-center gap-2 underline"
          >
            <span>{secondaryCtaText}</span>
          </Link>
        </div>
      </div>
      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-slate/20"></div>
        <svg
          className="absolute bottom-0 left-0 w-full h-64 md:h-80 object-contain opacity-30"
          viewBox="0 0 400 300"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <rect width="400" height="300" rx="20" fill="var(--color-deep-teal)" />
        </svg>
        <div className="absolute bottom-0 left-0 p-6">
          <p className="text-sm text-muted/60 capitalize">Intelligent workflow orchestration</p>
        </div>
      </div>
    </div>
  </section>
);