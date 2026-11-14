"use client";

import { useEffect, useState, type FC } from "react";
import { VelnaroLogo } from "@/components/ui/velnaro-logo";
import { HERO_NAME } from "@/constants/hero-constants";

const VISIBLE_MS = 900;
const SESSION_KEY = "intro-played";

export const PageLoader: FC = () => {
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        window.sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        // The intro is decorative; storage failure must never block the page.
      }
      setRemoved(true);
    }, VISIBLE_MS);

    return () => window.clearTimeout(timer);
  }, []);

  if (removed) return null;

  return (
    <div className="page-loader fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-graphite">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-1/4 h-80 w-80 rounded-full bg-deep-teal/25 blur-[140px]" />
        <div className="absolute -right-24 bottom-1/4 h-80 w-80 rounded-full bg-pale-sage/15 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.045),transparent_65%)]" />
      </div>

      <div className="relative flex w-full max-w-3xl flex-col items-center px-6 text-center md:px-10">
        <div className="reveal-pop relative">
          <div className="absolute -inset-7 rounded-full bg-deep-teal/30 blur-2xl" />
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/5 shadow-2xl shadow-black/20 backdrop-blur-xl md:h-20 md:w-20">
            <VelnaroLogo className="h-9 w-9 brightness-0 invert md:h-11 md:w-11" />
          </div>
        </div>

        <div className="mt-7 overflow-hidden md:mt-9">
          <p className="reveal text-3xl font-semibold tracking-[0.18em] text-white md:text-5xl" style={{ animationDelay: "0.08s" }}>
            {HERO_NAME}
          </p>
        </div>

        <p
          className="reveal mt-3 text-[10px] uppercase tracking-[0.32em] text-white/55 md:text-xs"
          style={{ animationDelay: "0.16s" }}
        >
          Digital products · AI systems · Search visibility
        </p>

        <div className="reveal mt-10 w-full max-w-xs md:mt-12" style={{ animationDelay: "0.22s" }}>
          <div className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-white/40">
            <span>Preparing experience</span>
            <span className="intro-count tabular-nums text-white/75" />
          </div>
          <div className="relative h-px w-full overflow-hidden rounded-full bg-white/15">
            <div className="intro-fill absolute inset-0 bg-gradient-to-r from-deep-teal via-pale-sage to-white" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-0 right-0 mx-auto flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.25em] text-white/35">
        <span>© {new Date().getFullYear()} {HERO_NAME}</span>
        <span className="block h-px w-8 bg-white/15" />
        <span>Built with purpose</span>
      </div>
    </div>
  );
};
