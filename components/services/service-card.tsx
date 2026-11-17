"use client";

import { useRef, type FC, type CSSProperties } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { VelnaroLogo } from "@/components/ui/velnaro-logo";
import {
  SERVICE_ACCENTS,
  STACK_OFFSET_REM,
  STACK_SCALE_STEP,
} from "@/constants/services-ui-constants";
import { formatCounter, padIndex } from "@/helpers/format-helpers";
import { type ServiceCardProps } from "@/types/services-types";
import { ServiceBullets } from "./service-bullets";
import { ServiceCta } from "./service-cta";

export const ServiceCard: FC<ServiceCardProps> = ({
  service,
  index,
  total,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 30%"],
  });

  const animatedScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 1 - (total - index) * STACK_SCALE_STEP]
  );
  const animatedOpacity = useTransform(scrollYProgress, [0.6, 1], [1, 0.7]);

  return (
    <div
      ref={ref}
      className="relative md:sticky md:top-[var(--service-card-top)]"
      style={{ "--service-card-top": `calc(7rem + ${index * STACK_OFFSET_REM}rem)` } as CSSProperties}
    >
      <motion.article
        style={{
          scale: prefersReducedMotion ? 1 : animatedScale,
          opacity: prefersReducedMotion ? 1 : animatedOpacity,
        }}
        className="relative min-h-[42rem] overflow-hidden rounded-3xl border border-slate/15 bg-white shadow-[0_24px_70px_-42px_rgba(23,27,31,0.28)] md:h-auto md:min-h-[42rem]"
      >
        <div className={`absolute inset-0 bg-gradient-to-br opacity-30 ${SERVICE_ACCENTS[index % SERVICE_ACCENTS.length]}`} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(23,107,101,0.10),transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_90%,rgba(23,107,101,0.07),transparent_48%)]" />

        <div className="relative grid min-h-[42rem] grid-cols-1 gap-8 p-6 sm:p-8 md:min-h-[42rem] md:grid-cols-12 md:gap-10 md:p-12 lg:p-16">
          <div className="flex flex-col justify-between md:col-span-7">
            <div>
              <div className="flex items-center gap-4">
                <span className="rounded-full border border-slate/20 bg-white/65 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.3em] text-muted">
                  Service {formatCounter(index, total)}
                </span>
                <span className="block h-px w-12 bg-slate/30" />
              </div>

              <h3 className="mt-6 max-w-2xl text-4xl font-semibold leading-[1.04] tracking-tight text-graphite md:text-5xl lg:text-6xl">
                {service.title}
              </h3>
              <p className="mt-5 max-w-2xl text-base leading-7 text-muted md:text-lg md:leading-8">
                {service.description}
              </p>
            </div>

            <div className="mt-8">
              <ServiceCta href={service.href} ariaLabel={`Explore ${service.title}`} />
            </div>
          </div>

          <div className="flex flex-col justify-between gap-8 md:col-span-5">
            <div className="relative flex items-start justify-end">
              <span className="text-[7rem] font-black leading-none tracking-tighter text-slate/[0.08] md:text-[9rem]">
                {padIndex(index + 1)}
              </span>
              <div className="absolute right-0 top-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-slate/15 bg-white/85 shadow-sm md:h-[4.5rem] md:w-[4.5rem]">
                <VelnaroLogo aria-hidden className="h-8 w-8 opacity-90 md:h-9 md:w-9" />
              </div>
            </div>

            <div className="rounded-2xl border border-slate/10 bg-white/65 p-5 shadow-sm shadow-graphite/[0.025] backdrop-blur-sm md:p-6">
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted">What this can include</p>
              <ServiceBullets bullets={service.bullets} />
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/60" />
      </motion.article>
    </div>
  );
};
