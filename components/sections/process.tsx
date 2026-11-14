"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform, MotionValue } from "motion/react";
import { SectionHeader } from "@/components/ui/section-header";

const subscribeToReducedMotion = (onStoreChange: () => void) => {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", onStoreChange);
  return () => mediaQuery.removeEventListener("change", onStoreChange);
};

const getReducedMotionSnapshot = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const getReducedMotionServerSnapshot = () => false;

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
    title: "DISCOVER",
    shortTitle: "DISCOVER",
    description:
      "Understand the business, objectives, challenges, customers and requirements. Initial discussion to clarify project goals, success criteria, and current systems.",
    accentFrom: "var(--color-deep-teal)",
    accentTo: "var(--color-pale-sage)",
  },
  {
    number: "02",
    title: "DEFINE",
    shortTitle: "DEFINE",
    description:
      "Establish the solution strategy and project scope. Recommended approach, technical architecture, deliverables, timeline and milestones agreed upon before development begins.",
    accentFrom: "var(--color-pale-sage)",
    accentTo: "var(--color-deep-teal)",
  },
  {
    number: "03",
    title: "DESIGN",
    shortTitle: "DESIGN",
    description:
      "Plan the experience and implementation structure. User journeys, interface or workflow planning, information architecture, system design, and review and approval cycles.",
    accentFrom: "var(--color-deep-teal)",
    accentTo: "var(--color-graphite)",
  },
  {
    number: "04",
    title: "BUILD & IMPLEMENT",
    shortTitle: "BUILD & IMPLEMENT",
    description:
      "Develop, integrate, test and refine the solution. Development, integrations, implementation of optimizations, testing, and quality assurance to ensure the solution meets requirements.",
    accentFrom: "var(--color-deep-teal)",
    accentTo: "var(--color-graphite)",
  },
  {
    number: "05",
    title: "LAUNCH & IMPROVE",
    shortTitle: "LAUNCH & IMPROVE",
    description:
      "Deploy and support the solution. Final verification, deployment, handover, documentation, and monitoring with ongoing improvements where agreed.",
    accentFrom: "var(--color-graphite)",
    accentTo: "var(--color-deep-teal)",
  },
];

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
    <path d="M17.8 19.2 16 11l3.5-3.5a2.1 2.1 0 0 0-3-3L13 8l-8.2-1.8a1 1 0 0 0-.9 1.7l6.2 3.7-3.6 3.6-2.4-.6a1 1 0 0 0-1.1 1.6l2.7 2.7a1 1 0 0 0 1.6-1.1l-.6-2.4 3.6-3.6 3.7 6.2a1 1 0 0 0 1.7-.9z" />
  </svg>
);

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
        <div
          className="relative rounded-3xl border border-slate/20 bg-white/90 shadow-2xl shadow-black/10 backdrop-blur-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-deep-teal/10 via-pale-sage/30 to-deep-teal/10" />

          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),transparent_45%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_85%,rgba(23,107,101,0.07),transparent_48%)]" />

          <div className="relative z-10 p-6 md:p-8 flex flex-col h-full">
            <div className="mt-5 flex-1 flex flex-col min-h-0">
              <h3
                className="text-lg md:text-xl font-bold leading-tight transition-colors duration-300"
                style={{ color: isActive || isCompleted ? "var(--color-graphite)" : "var(--color-muted)" }}
              >
                {step.title}
              </h3>

              <p
                className="mt-3 text-muted leading-relaxed text-base md:text-lg flex-1 min-h-0 transition-colors duration-300"
                style={{ color: isActive ? "var(--color-slate)" : "var(--color-muted)" }}
              >
                {step.description}
              </p>

              <div className="mt-5 pt-4 border-t border-slate/10 flex items-center justify-end flex-wrap gap-2">
                <span className="text-sm text-muted font-mono text-slate/50 flex-shrink-0">
                  Step {step.number} of 5
                </span>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-slate/20" />
        </div>
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
        className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-deep-teal/30 via-pale-sage/40 to-deep-teal/30"
        style={{ opacity: 0.4 }}
      />
    );
  }

  return (
    <div
      ref={trackRef}
      className="absolute left-0 top-0 h-full w-1 pointer-events-none"
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
      className="absolute left-0 top-0 -translate-y-1/2 pointer-events-none z-20"
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
        <div className="relative flex flex-col items-center filter drop-shadow-[0_4px_12px_rgba(23,107,101,0.4)]">
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
    : "color-mix(in srgb, var(--color-slate) 30%, transparent)";
    
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
  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

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

  const [activeStepIndex, setActiveStepIndex] = useState(0);
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const nextIndex = Math.min(STEPS.length - 1, Math.max(0, Math.round(latest * (STEPS.length - 1))));
    setActiveStepIndex((previous) => previous === nextIndex ? previous : nextIndex);
  });

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
                  const isActive = index === activeStepIndex;
                  const isCompleted = index < activeStepIndex;
                  
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
                  const isActive = index === activeStepIndex;
                  const isCompleted = index < activeStepIndex;

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