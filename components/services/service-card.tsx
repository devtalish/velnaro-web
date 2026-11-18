"use client";

import { useRef, type FC } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { VelnaroLogo } from "@/components/ui/velnaro-logo";
import { SERVICE_ACCENTS, STACK_OFFSET_REM, STACK_SCALE_STEP } from "@/constants/services-ui-constants";
import { formatCounter, padIndex } from "@/helpers/format-helpers";
import { type ServiceCardProps } from "@/types/services-types";
import { ServiceBullets } from "./service-bullets";
import { ServiceCta } from "./service-cta";

export const ServiceCard: FC<ServiceCardProps> = ({ service, index, total }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 25%"],
  });

  // Keep the original scroll-stack feel, but never constrain card height.
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, reduceMotion ? 1 : Math.max(0.94, 1 - (total - index) * STACK_SCALE_STEP * 0.65)]
  );
  const opacity = useTransform(scrollYProgress, [0.55, 1], [1, reduceMotion ? 1 : 0.9]);

  return (
    <div
      ref={ref}
      className="relative md:sticky"
      style={{ top: `calc(7rem + ${index * STACK_OFFSET_REM}rem)` }}
    >
      <motion.article
        style={{ scale, opacity }}
        className="relative isolate overflow-hidden rounded-3xl border border-slate/15 bg-white shadow-[0_24px_70px_-42px_rgba(23,27,31,0.28)]"
      >
        <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-30 ${SERVICE_ACCENTS[index % SERVICE_ACCENTS.length]}`} />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(23,107,101,0.10),transparent_45%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_90%,rgba(23,107,101,0.07),transparent_48%)]" />
        <div className="relative grid grid-cols-1 gap-8 p-6 sm:p-8 md:grid-cols-12 md:gap-10 md:p-12 lg:p-16">
          <div className="flex min-w-0 flex-col justify-between md:col-span-7">
            <div>
              <div className="flex items-center gap-4">
                <span className="rounded-full border border-slate/20 bg-white/75 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.24em] text-muted">
                  Service {formatCounter(index, total)}
                </span>
                <span className="block h-px w-12 bg-slate/30" />
              </div>
              <h3 className="mt-7 max-w-2xl text-3xl font-semibold leading-[1.08] tracking-tight text-graphite sm:text-4xl md:text-5xl lg:text-6xl">
                {service.title}
              </h3>
              <p className="mt-5 max-w-2xl text-base leading-7 text-muted md:text-lg md:leading-8">
                {service.description}
              </p>
            </div>
            <div className="mt-9">
              <ServiceCta href={service.href} ariaLabel={`Explore ${service.title}`} />
            </div>
          </div>
          <div className="flex min-w-0 flex-col justify-between gap-6 md:col-span-5 md:gap-8">
            <div className="relative flex min-h-24 items-start justify-end sm:min-h-32">
              <span className="text-[6rem] font-black leading-none tracking-tighter text-slate/[0.08] sm:text-[7rem] md:text-[9rem]">
                {padIndex(index + 1)}
              </span>
              <div className="absolute right-0 top-3 flex h-14 w-14 items-center justify-center rounded-2xl border border-slate/15 bg-white/90 shadow-sm sm:h-16 sm:w-16">
                <VelnaroLogo aria-hidden className="h-8 w-8 opacity-90" />
              </div>
            </div>
            <div className="rounded-2xl border border-slate/10 bg-white/80 p-5 shadow-sm shadow-graphite/[0.025] sm:p-6">
              <ServiceBullets bullets={service.bullets} />
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/60" />
      </motion.article>
    </div>
  );
};