"use client";

import { type FC } from "react";
import { motion } from "motion/react";
import { revealProps } from "@/animations/scroll-animations";

export const ServicesCtaCard: FC = () => (
  <motion.div
    {...revealProps()}
    className="glass-strong gradient-border relative z-10 mt-24 flex flex-col items-start justify-between gap-6 p-8 md:flex-row md:items-center md:p-10"
  >
    <div>
      <p className="text-eyebrow mb-2">Have a different challenge?</p>
      <h3 className="text-2xl font-bold md:text-3xl text-graphite">
        Let&apos;s scope it together.
      </h3>
      <p className="mt-2 max-w-xl text-muted">
        Send us a brief and we&apos;ll reply within 24 hours with a realistic plan,
        timeline, and next steps.
      </p>
    </div>
    <a href="#contact" className="btn-primary">
      <span>Discuss a Project</span>
      <span aria-hidden>→</span>
    </a>
  </motion.div>
);
