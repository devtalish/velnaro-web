"use client";

import { type FC, useState } from "react";
import { motion } from "motion/react";
import { SectionHeader } from "@/components/ui/section-header";
import { VIEWPORT_ONCE, fadeInUp } from "@/animations/scroll-animations";

const FAQ_ITEMS_LEFT = [
  {
    question: "What can VELNARO help build?",
    answer:
      "VELNARO focuses on custom software and web applications, AI-enabled applications, workflow automation, and software architecture and integrations. The right scope depends on the problem and requirements.",
  },
  {
    question: "How does a project begin?",
    answer:
      "It begins with a conversation about the problem, the intended outcome, and the constraints. From there, the scope and an appropriate next step can be discussed.",
  },
  {
    question: "Can you work with an existing application or workflow?",
    answer:
      "The first step is to understand the current system, the issue to address, and the technical constraints. That helps determine whether an improvement, integration, or larger change is appropriate.",
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
      "A brief description of the problem, what you want to achieve, and any important requirements or constraints is a useful starting point. You do not need a complete specification to begin the conversation.",
  },
  {
    question: "Can you help define the right technical approach?",
    answer:
      "Yes. Understanding the problem and its constraints is an important first step toward discussing a suitable technical approach, scope, and next steps.",
  },
  {
    question: "Can an existing application or system be improved?",
    answer:
      "Potentially. The first step is to understand the current application, the issues you want to address, and the technical constraints before determining an appropriate approach.",
  },
  {
    question: "What happens after I submit a project inquiry?",
    answer:
      "Your inquiry provides the context needed to understand what you are looking for. The next step is to review the requirements and discuss an appropriate way forward.",
  },
] as const;

type FaqItem = { readonly question: string; readonly answer: string };

interface FaqColumnProps {
  items: readonly FaqItem[];
  openIndex: number | null;
  setOpenIndex: (index: number | null) => void;
}

const FaqColumn: FC<FaqColumnProps> = ({ items, openIndex, setOpenIndex }) => (
  <div className="space-y-0">
    {items.map((item, index) => (
      <motion.div
        key={item.question}
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="border-t border-slate/20"
      >
        <button
          type="button"
          onClick={() => setOpenIndex(openIndex === index ? null : index)}
          aria-expanded={openIndex === index}
          className="flex w-full items-center justify-between gap-4 py-6 text-left"
        >
          <span className="text-lg font-semibold text-graphite pr-8">
            {item.question}
          </span>
          <span
            className="flex-shrink-0 h-6 w-6 text-muted transition-transform duration-300"
            style={{
              transform: openIndex === index ? "rotate(45deg)" : "rotate(0deg)",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
              aria-hidden
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </span>
        </button>
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: openIndex === index ? "auto" : 0,
            opacity: openIndex === index ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="pb-6 text-muted leading-relaxed">
            {item.answer}
          </div>
        </motion.div>
      </motion.div>
    ))}
    <div className="border-b border-slate/20" />
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
        title={
          <>
            A few useful answers.
          </>
        }
      />

      <div className="grid gap-8 md:grid-cols-2 max-w-4xl">
        <FaqColumn
          items={FAQ_ITEMS_LEFT}
          openIndex={openLeftIndex}
          setOpenIndex={setOpenLeftIndex}
        />
        <FaqColumn
          items={FAQ_ITEMS_RIGHT}
          openIndex={openRightIndex}
          setOpenIndex={setOpenRightIndex}
        />
      </div>
    </section>
  );
};