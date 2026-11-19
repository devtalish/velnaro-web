"use client";

import { type FC, useState } from "react";
import { motion } from "motion/react";
import { SectionHeader } from "@/components/ui/section-header";
import { VIEWPORT_ONCE, fadeInUp } from "@/animations/scroll-animations";

const FAQ_ITEMS_LEFT = [
  {
    question: "What can VELNARO help build?",
    answer:
      "VELNARO works across software development and digital solutions, AI automation and business systems, and AI search visibility (AEO and GEO). The right scope depends on the problem, requirements and intended outcome.",
  },
  {
    question: "How does a project begin?",
    answer:
      "It begins with a conversation about the problem, the intended outcome and the constraints. From there, we can clarify the scope and discuss an appropriate next step.",
  },
  {
    question: "Can you work with an existing application or workflow?",
    answer:
      "Yes. The first step is to understand the current system, the issue to address and the technical constraints. That helps determine whether an improvement, integration or larger change is appropriate.",
  },
  {
    question: "How can I discuss a project?",
    answer:
      "Use the contact form to share a brief description of what you have in mind. Include the context you already know; you do not need a complete specification to start the conversation.",
  },
] as const;

const FAQ_ITEMS_RIGHT = [
  {
    question: "What information should I share about my project?",
    answer:
      "A short description of the problem, what you want to achieve, who the solution is for and any important constraints is a useful starting point. You can share more detail as the conversation develops.",
  },
  {
    question: "Can you help define the right technical approach?",
    answer:
      "Yes. Understanding the problem, users, existing systems and constraints comes before choosing a technology or architecture. The approach should serve the requirements rather than add unnecessary complexity.",
  },
  {
    question: "How do you approach project scope?",
    answer:
      "We start by clarifying the intended outcome, essential functionality, dependencies and constraints. This creates a clearer basis for agreeing on deliverables and milestones before implementation begins.",
  },
  {
    question: "What happens after I submit a project inquiry?",
    answer:
      "We review the information you provide to understand the challenge and whether our capabilities are relevant. The next step is to discuss the requirements and an appropriate way forward.",
  },
] as const;

type FaqItem = { readonly question: string; readonly answer: string };

interface FaqColumnProps {
  items: readonly FaqItem[];
  openIndex: number | null;
  setOpenIndex: (index: number | null) => void;
  startNumber: number;
}

const FaqColumn: FC<FaqColumnProps> = ({
  items,
  openIndex,
  setOpenIndex,
  startNumber,
}) => (
  <div className="space-y-3">
    {items.map((item, index) => {
      const isOpen = openIndex === index;
      const answerId = `faq-answer-${startNumber + index}`;

      return (
        <motion.article
          key={item.question}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.45, delay: index * 0.07 }}
          className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
            isOpen
              ? "border-deep-teal/25 bg-white shadow-lg shadow-graphite/[0.04]"
              : "border-slate/15 bg-white/65 hover:border-deep-teal/20 hover:bg-white/90"
          }`}
        >
          <button
            type="button"
            onClick={() => setOpenIndex(isOpen ? null : index)}
            aria-expanded={isOpen}
            aria-controls={answerId}
            className="flex w-full items-center gap-4 px-5 py-5 text-left sm:px-6"
          >
            <span className="shrink-0 font-mono text-[11px] tracking-wider text-deep-teal/70">
              {String(startNumber + index).padStart(2, "0")}
            </span>
            <span className="min-w-0 flex-1 text-base font-semibold leading-snug text-graphite sm:text-[17px]">
              {item.question}
            </span>
            <span
              aria-hidden="true"
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                isOpen
                  ? "rotate-180 border-deep-teal/25 bg-deep-teal text-white"
                  : "border-slate/15 bg-ivory text-muted"
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </span>
          </button>

          <motion.div
            id={answerId}
            initial={false}
            animate={{
              height: isOpen ? "auto" : 0,
              opacity: isOpen ? 1 : 0,
            }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            aria-hidden={!isOpen}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 sm:px-6 sm:pb-6">
              <div className="rounded-xl border-l-2 border-deep-teal/45 bg-deep-teal/[0.045] px-4 py-4 sm:ml-9">
                <p className="text-sm leading-7 text-muted">{item.answer}</p>
              </div>
            </div>
          </motion.div>
        </motion.article>
      );
    })}
  </div>
);

export const FAQ: FC = () => {
  const [openLeftIndex, setOpenLeftIndex] = useState<number | null>(null);
  const [openRightIndex, setOpenRightIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="c-space section-spacing relative overflow-visible">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/3 h-72 w-72 rounded-full bg-deep-teal/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-pale-sage/20 blur-[140px]" />
      </div>

      <SectionHeader
        className="mb-12"
        eyebrow="FAQ"
        title={<>A few useful answers.</>}
      />

      <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2 md:gap-5">
        <FaqColumn
          items={FAQ_ITEMS_LEFT}
          openIndex={openLeftIndex}
          setOpenIndex={setOpenLeftIndex}
          startNumber={1}
        />
        <FaqColumn
          items={FAQ_ITEMS_RIGHT}
          openIndex={openRightIndex}
          setOpenIndex={setOpenRightIndex}
          startNumber={5}
        />
      </div>
    </section>
  );
};
