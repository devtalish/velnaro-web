"use client";

import { useRef, useEffect, type FC } from "react";
import { motion, useInView, useMotionValue, useReducedMotion } from "motion/react";
import { CONTACT_EMAIL } from "@/constants/portfolio-constants";
import { VelnaroLogoWithWordmark } from "@/components/ui/velnaro-logo";

const WaterWordmark: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const hoverProgress = useMotionValue(0);
  const rippleX = useMotionValue(0);
  const rippleY = useMotionValue(0);

  const filterId = "waterRipple";

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      rippleX.set((e.clientX - rect.left) / rect.width);
      rippleY.set((e.clientY - rect.top) / rect.height);
      hoverProgress.set(1);
    };

    const handleMouseEnter = () => {
      hoverProgress.set(1);
    };

    const handleMouseLeave = () => {
      hoverProgress.set(0);
      rippleX.set(0.5);
      rippleY.set(0.5);
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [hoverProgress, rippleX, rippleY, prefersReducedMotion]);

  return (
    <div ref={ref} className="relative">
      <svg className="absolute inset-0 -z-10 w-full h-full" style={{ pointerEvents: "none" }}>
        <defs>
          <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.02"
              numOctaves={3}
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                values="0.02;0.05;0.02"
                dur="3s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
            >
              <animate
                attributeName="scale"
                values="0;15;0"
                dur="3s"
                repeatCount="indefinite"
              />
            </feDisplacementMap>
          </filter>
        </defs>
      </svg>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="text-center text-[20vw] md:text-[14rem] font-black leading-none text-slate/10 select-none"
        style={{
          filter: `url(#${filterId})`,
          transformOrigin: "center center",
        }}
        onMouseMove={(e) => {
          if (prefersReducedMotion) return;
          const rect = e.currentTarget.getBoundingClientRect();
          rippleX.set((e.clientX - rect.left) / rect.width);
          rippleY.set((e.clientY - rect.top) / rect.height);
        }}
        onMouseEnter={() => {
          if (!prefersReducedMotion) hoverProgress.set(1);
        }}
        onMouseLeave={() => {
          if (!prefersReducedMotion) {
            hoverProgress.set(0);
            rippleX.set(0.5);
            rippleY.set(0.5);
          }
        }}
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
            <a href="/#home" className="hover:text-graphite transition-colors">Home</a>
            <a href="/#services" className="hover:text-graphite transition-colors">Services</a>
            <a href="/#work" className="hover:text-graphite transition-colors">Work</a>
            <a href="/#process" className="hover:text-graphite transition-colors">Process</a>
            <a href="/#contact" className="hover:text-graphite transition-colors">Contact</a>
            <a href="/privacy-policy" className="hover:text-graphite transition-colors">Privacy Policy</a>
            <a href="/terms-of-service" className="hover:text-graphite transition-colors">Terms of Service</a>
            <a href="/cookie-policy" className="hover:text-graphite transition-colors">Cookie Policy</a>
            <a href="/disclaimer" className="hover:text-graphite transition-colors">Disclaimer</a>
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
