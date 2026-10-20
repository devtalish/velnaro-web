"use client";

import { useRef, type FC } from "react";
import { motion, useInView } from "motion/react";
import { CONTACT_EMAIL } from "@/constants/portfolio-constants";
import { VelnaroLogoWithWordmark } from "@/components/ui/velnaro-logo";

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
          <VelnaroLogoWithWordmark logoSize={36} className="text-graphite" />
          <p className="mt-3 text-sm text-muted max-w-sm">
            VELNARO builds software and technology solutions shaped around real problems.
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
            <a href="#home" className="hover:text-graphite transition-colors">Home</a>
            <a href="#services" className="hover:text-graphite transition-colors">Services</a>
            <a href="#work" className="hover:text-graphite transition-colors">Work</a>
            <a href="#process" className="hover:text-graphite transition-colors">Process</a>
            <a href="#contact" className="hover:text-graphite transition-colors">Contact</a>
          </nav>
          <div className="flex gap-3 text-sm text-muted">
            <span>
              © {new Date().getFullYear()} VELNARO
            </span>
            <span>·</span>
            <span>All rights reserved.</span>
          </div>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-16 text-center text-[20vw] md:text-[14rem] font-black leading-none text-slate/10 select-none"
      >
        VELNARO
      </motion.p>
    </footer>
  );
};
