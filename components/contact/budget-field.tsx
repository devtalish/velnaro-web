"use client";

import { type FC } from "react";
import { motion } from "motion/react";
import { SPRING_SNAPPY } from "@/animations/ui-animations";
import { BUDGET_OPTIONS } from "@/constants/contact-constants";
import { type BudgetFieldProps } from "@/types/contact-types";

export const BudgetField: FC<BudgetFieldProps> = ({ value, onChange }) => (
  <div>
    <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-graphite">
      Project budget
    </p>
    <div className="flex flex-wrap gap-2">
      {BUDGET_OPTIONS.map((option) => {
        const active = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(active ? "" : option.value)}
            aria-pressed={active}
            className={`group relative rounded-full border px-4 py-2.5 text-xs font-semibold transition-all duration-200 ${
              active
                ? "border-deep-teal/60 bg-white/80 text-graphite"
                : "border-slate/25 bg-white/70 text-muted hover:border-deep-teal/50 hover:bg-white"
            }`}
          >
            {active && (
              <motion.span
                layoutId="budget-bg"
                transition={SPRING_SNAPPY}
                className="absolute inset-0 rounded-full bg-deep-teal/10"
              />
            )}
            <span className="relative">{option.label}</span>
          </button>
        );
      })}
    </div>
  </div>
);
