"use client";

import { type FC } from "react";
import { motion } from "motion/react";
import { revealProps } from "@/animations/scroll-animations";
import { CONTACT_EMAIL } from "@/constants/portfolio-constants";
import { ContactInfoCard } from "./contact-info-card";

export const ContactDetails: FC = () => (
  <motion.div {...revealProps()} className="lg:col-span-5">
    <p className="text-eyebrow">START A CONVERSATION</p>
    <h2 className="text-heading mt-3">
      Have a problem worth solving?
    </h2>
    <p className="mt-4 leading-relaxed text-muted">
      Tell us a little about what you are building, what is getting in the way, or what you would like
      to explore. We&apos;ll use that context to understand whether we can help.
    </p>

    <div className="mt-8 space-y-4">
      <ContactInfoCard
        icon="✉"
        label="Email"
        value={CONTACT_EMAIL}
        href={`mailto:${CONTACT_EMAIL}`}
        gradient="from-deep-teal/30 to-pale-sage/30"
      />
    </div>
  </motion.div>
);
