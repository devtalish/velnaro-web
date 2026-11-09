"use client";

import { type FC } from "react";
import Link from "next/link";

type ServiceCtaProps = {
  href?: string;
  ariaLabel?: string;
  headline?: string;
  subtitle?: string;
  primaryCtaText?: string;
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
};

export const ServiceCta: FC<ServiceCtaProps> = ({
  href,
  ariaLabel,
  headline,
  subtitle,
  primaryCtaText,
  primaryCtaHref,
  secondaryCtaText,
  secondaryCtaHref,
}) => {
  if (href && ariaLabel) {
    return (
      <Link
        href={href}
        aria-label={ariaLabel}
        className="group inline-flex items-center gap-4 text-deep-teal"
      >
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-deep-teal/10 text-deep-teal transition-transform duration-300 group-hover:scale-110 group-hover:bg-deep-teal/20">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 -rotate-45"
            aria-hidden
          >
            <path d="M5 12h14" />
            <path d="M13 5l7 7-7 7" />
          </svg>
        </span>
        <span className="text-base font-medium tracking-tight md:text-lg">
          {primaryCtaText}
        </span>
      </Link>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-6 pt-24 pb-16">
      <div className="glass-strong gradient-border rounded-3xl p-8 md:p-10">
        <div>
          <p className="text-eyebrow uppercase tracking-wider mb-4">SOFTWARE DEVELOPMENT</p>
          <h2 className="text-2xl md:text-3xl font-bold md:text-graphite mb-4">
            {headline}
          </h2>
          <p className="text-base text-muted leading-relaxed mb-8">
            {subtitle}
          </p>
          <div className="flex gap-4">
            {primaryCtaHref && (
              <Link
                href={primaryCtaHref}
                className="btn-primary flex items-center gap-2"
              >
                <span>{primaryCtaText}</span>
              </Link>
            )}
            {secondaryCtaText && secondaryCtaHref && (
              <Link
                href={secondaryCtaHref}
                className="btn-ghost flex items-center gap-2 underline"
              >
                <span>{secondaryCtaText}</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};