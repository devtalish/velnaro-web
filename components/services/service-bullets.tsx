"use client";

import { type FC } from "react";
import { motion, useReducedMotion } from "motion/react";

export const ServiceBullets: FC<{ bullets: string[] }> = ({ bullets }) => {
  const reduceMotion = useReducedMotion();

  return (
    <ul className="space-y-3">
      <li className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted">
        What&apos;s included
      </li>
      {bullets.map((bullet, index) => (
        <motion.li
          key={bullet}
          initial={reduceMotion ? false : { opacity: 0, x: 12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.42, delay: reduceMotion ? 0 : index * 0.07, ease: "easeOut" }}
          className="flex items-start gap-3 text-sm leading-6 text-muted md:text-base"
        >
          <span aria-hidden="true" className="mt-[0.65rem] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-deep-teal" />
          <span>{bullet}</span>
        </motion.li>
      ))}
    </ul>
  );
};