"use client";

import { useState, type FC } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  UNDERLINE_TRANSITION,
  underlineWipe,
} from "@/animations/ui-animations";
import { type FloatingFieldProps } from "@/types/contact-types";

const SHARED_INPUT =
  "block w-full bg-transparent text-[15px] leading-6 text-graphite placeholder-muted focus:outline-none";

export const FloatingField: FC<FloatingFieldProps> = ({
  id,
  label,
  value,
  onChange,
  type = "text",
  required,
  textarea,
  autoComplete,
}) => {
  const [focused, setFocused] = useState(false);
  const floated = focused || value.length > 0;

  const handlers = {
    id,
    name: id,
    required,
    value,
    onChange: (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => onChange(event.target.value),
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
  };

  return (
    <div
      className={`relative rounded-xl border transition-colors ${
        focused
          ? "border-deep-teal/70 bg-white shadow-[0_0_0_3px_rgba(23,107,101,0.08)]"
          : "border-slate/25 bg-white/75 shadow-[0_4px_18px_-16px_rgba(23,27,31,0.45)]"
      }`}
    >
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-4 transition-all duration-300 ${
          floated
            ? "top-1 text-[10px] tracking-[0.25em] uppercase text-muted"
            : "top-1/2 -translate-y-1/2 text-sm text-muted"
        } ${textarea && floated ? "translate-y-0" : ""}`}
      >
        {label}
      </label>

      {textarea ? (
        <textarea
          {...handlers}
          rows={5}
          className={`${SHARED_INPUT} resize-none px-4 pt-7 pb-3`}
        />
      ) : (
        <input
          {...handlers}
          type={type}
          autoComplete={autoComplete}
          className={`${SHARED_INPUT} px-4 pt-6 pb-2`}
        />
      )}

      <AnimatePresence>
        {focused && (
          <motion.span
            variants={underlineWipe}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={UNDERLINE_TRANSITION}
            style={{ originX: 0 }}
            className="absolute bottom-0 left-0 right-0 h-px bg-deep-teal"
          />
        )}
      </AnimatePresence>
    </div>
  );
};
