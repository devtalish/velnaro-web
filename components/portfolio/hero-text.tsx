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
    <div className="z-10 mt-24 text-center md:mt-32 md:text-left max-w-3xl">
      <div className="flex-col hidden md:flex c-space">
        <div
          className="reveal inline-flex items-center gap-2 self-start rounded-full border border-graphite/20 bg-ivory/80 backdrop-blur-md px-3 py-1.5 mb-6"
          style={delay(0.05)}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 rounded-full bg-deep-teal animate-ping opacity-75" />
            <span className="relative rounded-full bg-deep-teal h-2 w-2" />
          </span>
          <span className="text-xs tracking-[0.25em] uppercase text-muted">
            {HERO_ROLE}
          </span>
        </div>

        <h1
          className="reveal text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight text-graphite"
          style={delay(0.12)}
        >
          Build with purpose. Engineer for what&apos;s next.
        </h1>

        <p
          className="reveal mt-6 text-base md:text-lg leading-relaxed text-muted max-w-2xl"
          style={delay(0.19)}
        >
          {HERO_TAGLINE}
        </p>

        <div className="reveal flex flex-wrap gap-4 mt-10" style={delay(0.4)}>
          <a href="#contact" className="btn-primary">
            <span>Discuss a Project</span>
            <span aria-hidden>→</span>
          </a>
          <a href="#work" className="btn-ghost">
            <span>Explore Our Work</span>
          </a>
        </div>
      </div>

      <div className="flex flex-col space-y-5 md:hidden px-2">
        <div
          className="reveal inline-flex self-center items-center gap-2 rounded-full border border-graphite/20 bg-ivory/80 px-3 py-1.5"
          style={delay(0.05)}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 rounded-full bg-deep-teal animate-ping opacity-75" />
            <span className="relative rounded-full bg-deep-teal h-2 w-2" />
          </span>
          <span className="text-[10px] tracking-[0.25em] uppercase text-muted">
            {HERO_ROLE}
          </span>
        </div>

        <h1
          className="reveal text-4xl lg:text-5xl font-bold leading-[1.05] tracking-tight text-graphite"
          style={delay(0.12)}
        >
          Build with purpose. Engineer for what&apos;s next.
        </h1>

        <p
          className="reveal mt-4 text-base leading-relaxed text-muted"
          style={delay(0.19)}
        >
          {HERO_TAGLINE}
        </p>

        <div
          className="reveal flex flex-col gap-3 mt-6 items-center"
          style={delay(0.4)}
        >
          <a href="#contact" className="btn-primary w-full">
            <span>Discuss a Project</span>
            <span aria-hidden>→</span>
          </a>
          <a href="#work" className="btn-ghost w-full">
            <span>Explore Our Work</span>
          </a>
        </div>
      </div>
    </div>
  );
};
