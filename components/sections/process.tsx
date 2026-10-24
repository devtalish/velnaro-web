"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform, useMotionValue, MotionValue } from "motion/react";
import { SectionHeader } from "@/components/ui/section-header";
import { TILT_RANGE, TILT_SPRING } from "@/constants/projects-constants";

type Step = {
  number: string;
  title: string;
  shortTitle: string;
  description: string;
  accentFrom: string;
  accentTo: string;
};

const STEPS: Step[] = [
  {
    number: "01",
    title: "Discover",
    shortTitle: "DISCOVER",
    description: "Understand the problem, people, goals, and constraints before choosing a solution.",
    accentFrom: "var(--color-deep-teal)",
    accentTo: "var(--color-pale-sage)",
  },
  {
    number: "02",
    title: "Plan",
    shortTitle: "PLAN",
    description: "Define the scope, map the experience, and make thoughtful technical decisions.",
    accentFrom: "var(--color-pale-sage)",
    accentTo: "var(--color-deep-teal)",
  },
  {
    number: "03",
    title: "Build",
    shortTitle: "BUILD",
    description: "Develop in focused stages, prioritizing quality, usability, and maintainable implementation.",
    accentFrom: "var(--color-deep-teal)",
    accentTo: "var(--color-graphite)",
  },
  {
    number: "04",
    title: "Validate",
    shortTitle: "VALIDATE",
    description: "Test functionality, explore edge cases, and refine the product before delivery.",
    accentFrom: "var(--color-pale-sage)",
    accentTo: "var(--color-graphite)",
  },
  {
    number: "05",
    title: "Deliver",
    shortTitle: "DELIVER",
    description: "Prepare the finished work, document what matters, and provide a clear handover.",
    accentFrom: "var(--color-graphite)",
    accentTo: "var(--color-deep-teal)",
  },
];

const getInitialReducedMotion = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

const AirplaneIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <path d="M3.29 7.34 12 12l8.71-4.66" />
    <path d="M12 22V12" />
  </svg>
);

const BADGE = "rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[10px] uppercase tracking-[0.3em] backdrop-blur-md";

const ProcessCard = ({
  step,
  index,
  isActive,
  isCompleted,
  reducedMotion,
}: {
  step: Step;
  index: number;
  isActive: boolean;
  isCompleted: boolean;
  reducedMotion: boolean;
}) => {
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const rotateX = useSpring(
    useTransform(pointerY, [0, 1], TILT_RANGE.x),
    TILT_SPRING
  );
  const rotateY = useSpring(
    useTransform(pointerX, [0, 1], TILT_RANGE.y),
    TILT_SPRING
  );

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width);
    pointerY.set((event.clientY - bounds.top) / bounds.height);
  };

  const handleLeave = () => {
    pointerX.set(0.5);
    pointerY.set(0.5);
  };

  const textColor = isActive || isCompleted
    ? "var(--color-graphite)"
    : "var(--color-muted)";

  const accentGradient = `linear-gradient(135deg, ${step.accentFrom}, ${step.accentTo})`;

  const entranceStyle = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.6, delay: index * 0.1 },
      };

  return (
    <motion.div {...entranceStyle} className="relative">
      <div style={{ perspective: "1400px" }} className="relative">
        <motion.div
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="relative rounded-3xl border border-slate/20 bg-white/90 shadow-2xl shadow-black/10 overflow-hidden"
        >
          <div className="absolute inset-0" style={{ background: accentGradient, opacity: 0.4 }} />

          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),transparent_45%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(0,0,0,0.35),transparent_45%)]" />

          <div
            style={{ transform: "translateZ(70px)" }}
            className="pointer-events-none absolute left-5 right-5 top-5 flex items-center justify-between"
          >
            <span className={`${BADGE} inline-flex items-center gap-2 border-slate/30 bg-white/80 text-graphite`}>
              {step.shortTitle}
            </span>
          </div>

          <div className="relative z-10 p-6 md:p-8" style={{ transform: "translateZ(50px)" }}>
            <div className="flex flex-col h-full">
              <div className="mt-5 flex-1 flex flex-col min-h-0">
                <h3 className="text-lg md:text-xl font-bold leading-tight transition-colors duration-300" style={{ color: textColor }}>
                  {step.title}
                </h3>

                <p className="mt-3 text-muted leading-relaxed text-base md:text-lg flex-1 min-h-0 transition-colors duration-300" style={{ color: isActive ? "var(--color-slate)" : "var(--color-muted)" }}>
                  {step.description}
                </p>

                <div className="mt-5 pt-4 border-t border-slate/10 flex items-center justify-end flex-wrap gap-2">
                  <span className="text-sm text-muted font-mono text-slate/50 flex-shrink-0">
                    Step {step.number} of 5
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-slate/20" />
        </motion.div>
      </div>
    </motion.div>
  );
};

const JourneyTrack = ({ 
  progressHeight,
  reducedMotion,
  trackRef
}: { 
  progressHeight: MotionValue<string>;
  reducedMotion: boolean;
  trackRef: React.RefObject<HTMLDivElement | null>;
}) => {
  if (reducedMotion) {
    return (
      <div
        ref={trackRef}
        className="absolute left-1/2 top-0 -translate-x-1/2 h-full w-1 bg-gradient-to-b from-deep-teal/30 via-pale-sage/40 to-deep-teal/30"
        style={{ opacity: 0.4 }}
      />
    );
  }

  return (
    <div
      ref={trackRef}
      className="absolute left-1/2 top-0 -translate-x-1/2 h-full w-1 pointer-events-none"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-deep-teal/20 via-pale-sage/30 to-deep-teal/20" />
      
      <motion.div
        className="absolute left-0 top-0 w-full bg-gradient-to-b from-deep-teal via-pale-sage to-deep-teal"
        style={{
          height: progressHeight,
          transformOrigin: "top center",
        }}
      />
      
      <motion.div
        className="absolute left-1/2 w-3 h-3 -translate-x-1/2 rounded-full bg-deep-teal/60 filter blur-[4px]"
        style={{
          top: progressHeight,
          transformOrigin: "center center",
        }}
      />
    </div>
  );
};

const JourneyMarker = ({ 
  markerTop,
  reducedMotion
}: { 
  markerTop: MotionValue<string>;
  reducedMotion: boolean;
}) => {
  if (reducedMotion) return null;

  return (
    <motion.div
      className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20"
      style={{
        transformOrigin: "center center",
        top: markerTop,
      }}
    >
      <div className="relative flex flex-col items-center">
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-deep-teal/30"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.6, 0, 0.6],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative flex flex-col items-center filter drop-shadow-[0_4_12px_rgba(23,107,101,0.4)]">
          <AirplaneIcon className="w-8 h-8 text-deep-teal" />
        </div>
      </div>
    </motion.div>
  );
};

const StepNode = ({ 
  index, 
  total, 
  isActive,
  isCompleted,
  reducedMotion
}: { 
  index: number;
  total: number;
  isActive: boolean;
  isCompleted: boolean;
  reducedMotion: boolean;
}) => {
  const nodeProgress = index / (total - 1);
  
  const ringColor = isActive
    ? "var(--color-deep-teal)"
    : isCompleted
    ? "var(--color-deep-teal)"
    : "var(--color-slate)/30";
    
  const fillColor = isCompleted
    ? "var(--color-deep-teal)"
    : "var(--color-white)";

  return (
    <div
      className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      style={{ top: `${nodeProgress * 100}%` }}
    >
      <div
        className="relative w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-500"
        style={{
          borderColor: ringColor,
          backgroundColor: fillColor,
          boxShadow: isActive ? "0 0 0 4px rgba(23, 107, 101, 0.2)" : "none",
        }}
      >
        {isCompleted && (
          <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      {!reducedMotion && isActive && (
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2 border-deep-teal/30"
          animate={{
            scale: [1, 2, 1],
            opacity: [0.6, 0, 0.6],
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </div>
  );
};

export const Process = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(getInitialReducedMotion);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 22,
    mass: 1,
  });

  const progressHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const markerTop = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  const stepCount = STEPS.length;

  return (
    <section
      id="process"
      ref={containerRef}
      className="c-space section-spacing relative overflow-visible"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-deep-teal/10 blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-pale-sage/20 blur-[140px]" />
      </div>

      <div className="relative max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left side - Heading */}
          <div className="lg:col-span-5 lg:col-start-1 self-start sticky top-24">
            <SectionHeader
              className="mb-0"
              eyebrow="OUR PROCESS"
              title="A winding journey from discovery to delivery."
              hint={["01", "05"]}
            />
          </div>

          {/* Right side - Cards and journey track */}
          <div className="lg:col-span-7 lg:col-start-6 relative">
            <div className="relative min-h-[calc(100vh-20rem)] lg:min-h-[calc(100vh-10rem)]">
              {/* Journey track on the left edge of cards */}
              <JourneyTrack 
                progressHeight={progressHeight}
                reducedMotion={reducedMotion}
                trackRef={trackRef}
              />
              
              {/* Step nodes */}
              <div className="absolute left-0 top-0 -translate-x-1/2 h-full pointer-events-none">
                {STEPS.map((step, index) => {
                  const cardProgressStart = index / (stepCount - 1);
                  const cardProgressEnd = (index + 1) / (stepCount - 1);
                  const progressValue = smoothProgress.get();
                  const isActive = progressValue >= cardProgressStart && progressValue < cardProgressEnd;
                  const isCompleted = progressValue >= cardProgressEnd;
                  
                  return (
                    <StepNode
                      key={step.number}
                      index={index}
                      total={stepCount}
                      reducedMotion={reducedMotion}
                      isActive={isActive}
                      isCompleted={isCompleted}
                    />
                  );
                })}
              </div>

              {/* Moving marker */}
              <JourneyMarker
                markerTop={markerTop}
                reducedMotion={reducedMotion}
              />

              {/* Cards stack vertically */}
              <div className="relative z-10 space-y-8 lg:space-y-10 pl-4">
                {STEPS.map((step, index) => {
                  const cardProgressStart = index / (stepCount - 1);
                  const cardProgressEnd = (index + 1) / (stepCount - 1);
                  const progressValue = smoothProgress.get();
                  const isActive = progressValue >= cardProgressStart && progressValue < cardProgressEnd;
                  const isCompleted = progressValue >= cardProgressEnd;

                  return (
                    <div key={step.number}>
                      <ProcessCard
                        step={step}
                        index={index}
                        isActive={isActive}
                        isCompleted={isCompleted}
                        reducedMotion={reducedMotion}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 lg:col-span-12 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-deep-teal text-white font-medium text-sm hover:bg-deep-teal/90 transition-colors"
          >
            <span>Discuss a Project</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4-4 4m-5-4h12" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Process;