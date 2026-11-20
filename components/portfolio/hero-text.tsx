"use client";

import { type CSSProperties, type FC } from "react";
import {
  HERO_ROLE,
  HERO_TAGLINE,
} from "@/constants/portfolio-constants";

const delay = (seconds: number): CSSProperties => ({
  animationDelay: `calc(var(--intro-delay) + ${seconds}s)`,
});

export const HeroText: FC = () => {
  return (
    <div className="relative z-10 mx-auto mt-2 w-full max-w-6xl px-5 pb-20 text-center sm:mt-4 sm:px-8 md:mx-0 md:mt-32 md:px-0 md:pb-0 md:text-left lg:max-w-[56%]">
      <div className="flex flex-col md:px-10 lg:px-15">
        <div
          className="reveal mb-5 inline-flex max-w-full items-center gap-2 self-center rounded-full border border-graphite/15 bg-ivory/85 px-3 py-1.5 backdrop-blur-md sm:mb-6 md:self-start"
          style={delay(0.05)}
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inset-0 animate-ping rounded-full bg-deep-teal opacity-75" />
            <span className="relative h-2 w-2 rounded-full bg-deep-teal" />
          </span>
          <span className="text-[9px] uppercase tracking-[0.18em] text-muted sm:text-[10px] sm:tracking-[0.25em] md:text-xs">
            {HERO_ROLE}
          </span>
        </div>

        <h1
          className="reveal mx-auto max-w-[13ch] text-[clamp(2.25rem,8.5vw,3.5rem)] font-bold leading-[1.02] tracking-[-0.045em] text-graphite sm:max-w-[14ch] sm:text-[clamp(2.7rem,7vw,4.2rem)] md:mx-0 md:max-w-[12ch] md:text-5xl lg:text-6xl xl:text-7xl"
          style={delay(0.12)}
        >
          Build with purpose. Engineer for what&apos;s next.
        </h1>

        <p
          className="reveal mx-auto mt-4 max-w-xl text-[15px] leading-7 text-muted sm:mt-5 sm:text-base md:mx-0 md:mt-6 md:text-lg md:leading-relaxed"
          style={delay(0.19)}
        >
          {HERO_TAGLINE}
        </p>

        <div
          className="reveal mx-auto mt-6 flex w-full max-w-sm flex-col items-stretch gap-3 sm:mt-8 md:mx-0 md:mt-10 md:max-w-none md:flex-row md:items-start md:gap-4"
          style={delay(0.4)}
        >
          <a href="#contact" className="btn-primary min-h-12 w-full md:w-auto">
            <span>Discuss a Project</span>
            <span aria-hidden>→</span>
          </a>
          <a href="#work" className="btn-ghost min-h-12 w-full md:w-auto">
            <span>Explore Our Work</span>
          </a>
        </div>
      </div>
    </div>
  );
};
