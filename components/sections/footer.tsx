"use client";

import { useRef, type FC } from "react";
import { motion, useInView, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import Link from "next/link";
import { CONTACT_EMAIL } from "@/constants/portfolio-constants";
import { VelnaroLogoWithWordmark } from "@/components/ui/velnaro-logo";

const WaterWordmark: FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const hoverProgress = useMotionValue(0);
  const rippleX = useMotionValue(0.5);
  const displacementScale = useTransform(hoverProgress, [0, 1], [0, 14]);
  const noiseFrequency = useTransform(rippleX, [0, 1], [0.012, 0.035]);
  const filterId = "waterRipple";

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    rippleX.set(Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width)));
    hoverProgress.set(1);
  };

  const handlePointerLeave = () => {
    hoverProgress.set(0);
    rippleX.set(0.5);
  };

  return (
    <div className="relative mt-12 overflow-hidden" onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
      <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
            <motion.feTurbulence type="fractalNoise" baseFrequency={prefersReducedMotion ? 0.02 : noiseFrequency} numOctaves={2} result="noise" />
            <motion.feDisplacementMap in="SourceGraphic" in2="noise" scale={prefersReducedMotion ? 0 : displacementScale} xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
      <motion.p
        initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.7 }}
        className="select-none text-center text-[19vw] font-black leading-[0.9] tracking-[-0.075em] text-slate/[0.085] md:text-[14rem]"
        style={{ filter: prefersReducedMotion ? "none" : `url(#${filterId})` }}
      >
        VELNARO
      </motion.p>
    </div>
  );
};

export const Footer: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <footer ref={ref} className="relative c-space overflow-hidden pb-8 pt-16 md:pt-20">
      <motion.div
        initial={prefersReducedMotion ? false : { scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: prefersReducedMotion ? 0 : 0.9, ease: "easeOut" }}
        style={{ originX: 0 }}
        className="h-px w-full bg-gradient-to-r from-transparent via-slate/25 to-transparent"
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10">
        <div className="absolute bottom-[-50%] left-1/2 h-72 w-[80%] -translate-x-1/2 rounded-full bg-deep-teal/[0.08] blur-[140px]" />
      </div>

      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: prefersReducedMotion ? 0 : 0.65, ease: "easeOut", delay: prefersReducedMotion ? 0 : 0.08 }}
        className="mt-9 grid gap-10 border-b border-slate/10 pb-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:items-start md:gap-12"
      >
        <div className="max-w-md">
          <Link href="/" aria-label="Velnaro home" className="inline-flex rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-teal focus-visible:ring-offset-4">
            <VelnaroLogoWithWordmark logoSize={25} />
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-7 text-muted">
            Software, AI automation and search visibility, shaped around real business problems.
          </p>
          <a href={`mailto:${CONTACT_EMAIL}`} className="mt-4 inline-flex min-h-10 items-center text-sm font-medium text-graphite underline decoration-slate/30 underline-offset-4 transition-colors hover:text-deep-teal hover:decoration-deep-teal">
            {CONTACT_EMAIL}
          </a>
        </div>

        <div className="flex flex-col gap-7 md:items-end">
          <nav aria-label="Footer navigation" className="grid w-full grid-cols-2 gap-x-6 gap-y-4 text-sm sm:grid-cols-3 md:max-w-[560px] md:justify-items-end">
            <Link href="/#home" className="text-muted transition-colors hover:text-deep-teal">Home</Link>
            <Link href="/#services" className="text-muted transition-colors hover:text-deep-teal">Services</Link>
            <Link href="/#work" className="text-muted transition-colors hover:text-deep-teal">Selected work</Link>
            <Link href="/#process" className="text-muted transition-colors hover:text-deep-teal">Our process</Link>
            <Link href="/#contact" className="text-muted transition-colors hover:text-deep-teal">Contact</Link>
            <Link href="/privacy-policy" className="text-muted transition-colors hover:text-deep-teal">Privacy</Link>
            <Link href="/terms-of-service" className="text-muted transition-colors hover:text-deep-teal">Terms</Link>
            <Link href="/cookie-policy" className="text-muted transition-colors hover:text-deep-teal">Cookies</Link>
            <Link href="/disclaimer" className="text-muted transition-colors hover:text-deep-teal">Disclaimer</Link>
          </nav>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted md:justify-end">
            <span>© {new Date().getFullYear()} VELNARO</span>
            <span aria-hidden>·</span>
            <span>All rights reserved.</span>
          </div>
        </div>
      </motion.div>

      <WaterWordmark />
    </footer>
  );
};
