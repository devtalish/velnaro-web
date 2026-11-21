"use client";
import { useRef, type FC } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useMediaQuery } from "react-responsive";
import { VelnaroLogo } from "@/components/ui/velnaro-logo";
import { SERVICE_ACCENTS, STACK_SCALE_STEP } from "@/constants/services-ui-constants";
import { formatCounter, padIndex } from "@/helpers/format-helpers";
import { type ServiceCardProps } from "@/types/services-types";
import { ServiceBullets } from "./service-bullets";
import { ServiceCta } from "./service-cta";

export const ServiceCard: FC<ServiceCardProps> = ({ service, index, total }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const { scrollYProgress } = useScroll({ target: ref, offset: isMobile ? ["start 96%", "end 8%"] : ["start 92%", "end 12%"] });
  const cardScale = useTransform(scrollYProgress, [0, 1], [isMobile ? 0.94 : 0.975, Math.max(0.925, 1 - (total - index) * STACK_SCALE_STEP)]);
  const y = useTransform(scrollYProgress, [0, isMobile ? 0.5 : 0.48, 1], isMobile ? [104, 0, -16] : [88, 0, -12]);
  const x = useTransform(scrollYProgress, [0, 0.55, 1], [isMobile ? -18 : -22, 0, 0]);
  const opacity = useTransform(scrollYProgress, [0, isMobile ? 0.32 : 0.28, 1], [isMobile ? 0.12 : 0.2, 1, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [isMobile ? 4 : 3, 0]);

  return (
    <div ref={ref} className="sticky" style={{ top: "calc(5.25rem + " + index * 0.45 + "rem)", zIndex: index + 1 }}>
      <motion.article
        style={{ scale: reduceMotion ? 1 : cardScale, x: reduceMotion ? 0 : x, y: reduceMotion ? 0 : y, opacity: reduceMotion ? 1 : opacity, rotateX: reduceMotion ? 0 : rotateX, transformPerspective: 1200, transformOrigin: "center top" }}
        whileTap={reduceMotion ? undefined : { scale: 0.975, y: -3 }}
        className="relative isolate overflow-hidden rounded-[1.6rem] border border-slate/15 bg-white shadow-[0_24px_70px_-42px_rgba(23,27,31,0.28)] will-change-transform"
      >
        <div className={"pointer-events-none absolute inset-0 bg-gradient-to-br opacity-25 " + SERVICE_ACCENTS[index % SERVICE_ACCENTS.length]} />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(23,107,101,0.10),transparent_45%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_90%,rgba(23,107,101,0.07),transparent_48%)]" />
        <div className="relative grid grid-cols-1 gap-6 p-5 sm:gap-8 sm:p-8 md:grid-cols-12 md:gap-10 md:p-10 lg:p-14">
          <div className="flex min-w-0 flex-col justify-between md:col-span-7">
            <div>
              <div className="flex items-center gap-4">
                <span className="rounded-full border border-slate/20 bg-white/75 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-muted">Service {formatCounter(index, total)}</span>
                <span className="block h-px w-10 bg-slate/30" />
              </div>
              <h3 className="mt-6 max-w-2xl text-[clamp(1.8rem,5vw,3.75rem)] font-semibold leading-[1.06] tracking-tight text-graphite">{service.title}</h3>
              <p className="mt-4 max-w-2xl text-[15px] leading-7 text-muted sm:text-base md:mt-5 md:text-lg md:leading-8">{service.description}</p>
            </div>
            <div className="mt-7 md:mt-9"><ServiceCta href={service.href} ariaLabel={"Explore " + service.title} /></div>
          </div>
          <div className="flex min-w-0 flex-col justify-between gap-5 md:col-span-5 md:gap-7">
            <div className="relative flex min-h-16 items-start justify-end sm:min-h-24">
              <span className="text-[5rem] font-black leading-none tracking-tighter text-slate/[0.08] sm:text-[7rem] md:text-[8rem]">{padIndex(index + 1)}</span>
              <div className="absolute right-0 top-2 flex h-12 w-12 items-center justify-center rounded-2xl border border-slate/15 bg-white/90 shadow-sm sm:h-16 sm:w-16"><VelnaroLogo aria-hidden className="h-7 w-7 opacity-90 sm:h-8 sm:w-8" /></div>
            </div>
            <div className="rounded-2xl border border-slate/10 bg-white/85 p-4 shadow-sm shadow-graphite/[0.025] sm:p-6"><ServiceBullets bullets={service.bullets} /></div>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 rounded-[1.6rem] ring-1 ring-inset ring-white/60" />
      </motion.article>
    </div>
  );
};
