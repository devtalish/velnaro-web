"use client";

import { type MouseEvent, forwardRef } from "react";
import { motion } from "motion/react";
import { SPRING_SNAPPY } from "@/animations/ui-animations";
import { goToAnchor } from "@/helpers/scroll-helpers";
import { type NavLinkProps } from "@/types/navigation-types";

export interface NavLinkExtendedProps extends NavLinkProps {
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onFocus?: () => void;
  ariaExpanded?: boolean;
  ariaHaspopup?: boolean;
  ariaControls?: string;
  innerRef?: Ref<HTMLAnchorElement>;
}

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkExtendedProps>(
  (
    {
      href,
      label,
      active,
      onClick,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      ariaExpanded,
      ariaHaspopup,
      ariaControls,
      innerRef,
    },
    ref
  ) => {
    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
      if (href.startsWith("#")) {
        event.preventDefault();
        goToAnchor(href);
      }
      onClick?.();
    };

    return (
      <a
        ref={ref}
        href={href}
        onClick={handleClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onFocus={onFocus}
        aria-expanded={ariaExpanded}
        aria-haspopup={ariaHaspopup}
        aria-controls={ariaControls}
        aria-current={active ? "page" : undefined}
        className={`nav-link relative ${active ? "text-deep-teal" : ""}`}
      >
        {label}
        {active && (
          <motion.span
            layoutId="active-nav"
            transition={SPRING_SNAPPY}
            className="absolute -bottom-1 left-0 right-0 mx-auto h-px w-6 bg-gradient-to-r from-deep-teal to-graphite"
          />
        )}
      </a>
    );
  }
);

NavLink.displayName = "NavLink";