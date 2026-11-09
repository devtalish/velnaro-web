"use client";

import { useRef, type FC } from "react";
import { motion, useInView, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import Link from "next/link";
import { CONTACT_EMAIL } from "@/constants/portfolio-constants";
import { VelnaroLogoWithWordmark } from "@/components/ui/velnaro-logo";

const WaterWordmark: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const hoverProgress = useMotionValue(0);
  const rippleX = useMotionValue(0.5);
  const displacementScale = useTransform(hoverProgress, [0, 1], [0, 18]);
  const noiseFrequency = useTransform(rippleX, [0, 1], [0.012, 0.04]);
  const filterId = "waterRipple";

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    rippleX.set(Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width)));
    hoverProgress.set(1);
  };

  const handlePointerLeave = () => {
    hoverProgress.set(0);
    rippleX.set(0.5);
  };

  return (
    <div ref={ref} className="relative" onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
      <svg className="absolute inset-0 -z-10 h-full w-full" aria-hidden="true">
        <defs>
          <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
            <motion.feTurbulence
              type="fractalNoise"
              baseFrequency={prefersReducedMotion ? 0.02 : noiseFrequency}
              numOctaves={3}
              result="noise"
            />
            <motion.feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={prefersReducedMotion ? 0 : displacementScale}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
      <motion.p
        initial={prefersReducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: prefersReducedMotion ? 0 : 0.5 }}
        className="select-none text-center text-[20vw] font-black leading-none text-slate/10 md:text-[14rem]"
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

  return (
    <footer ref={ref} className="c-space pt-16 pb-8 relative overflow-hidden">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{ originX: 0 }}
        className="bg-gradient-to-r from-transparent via-slate/30 to-transparent h-px w-full"
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10">
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[-50%] h-72 w-[80%] rounded-full bg-deep-teal/10 blur-[140px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
        className="mt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
      >
        <div>
          <VelnaroLogoWithWordmark logoSize={24} className="text-graphite" />
          <p className="mt-3 text-sm text-muted max-w-sm">
            VELNARO builds software, AI automation, and AI search visibility around real business problems.
          </p>
          <p className="mt-3 text-sm text-muted">
            Reach out at{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-graphite hover:text-deep-teal transition-colors underline"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>

        <div className="flex flex-col md:items-end gap-4">
          <nav className="flex flex-wrap justify-end gap-6 text-sm text-muted">
            <Link href="/#home" className="hover:text-graphite transition-colors">Home</Link>
            <Link href="/#services" className="hover:text-graphite transition-colors">Services</Link>
            <Link href="/#work" className="hover:text-graphite transition-colors">Work</Link>
            <Link href="/#process" className="hover:text-graphite transition-colors">Process</Link>
            <Link href="/#contact" className="hover:text-graphite transition-colors">Contact</Link>
            <Link href="/privacy-policy" className="hover:text-graphite transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-graphite transition-colors">Terms of Service</Link>
            <Link href="/cookie-policy" className="hover:text-graphite transition-colors">Cookie Policy</Link>
            <Link href="/disclaimer" className="hover:text-graphite transition-colors">Disclaimer</Link>
          </nav>
          <div className="flex gap-3 text-sm text-muted">
            <span>© {new Date().getFullYear()} VELNARO</span>
            <span>·</span>
            <span>All rights reserved.</span>
          </div>
        </div>
      </motion.div>

      <WaterWordmark />
    </footer>
  );
};
