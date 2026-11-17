"use client";

import { type FC } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { NAV_ITEMS } from "@/constants/navigation-constants";
import { HireMeButton } from "./hire-me-button";
import { NavLink } from "./nav-link";

interface MobileMenuProps {
  open: boolean;
  active: string;
  onClose: () => void;
}

export const MobileMenu: FC<MobileMenuProps> = ({ open, active, onClose }) => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={prefersReducedMotion ? undefined : { opacity: 0, height: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.22 }}
          id="mobile-navigation"
          className="block overflow-hidden border-t border-slate/10 bg-ivory/98 text-left shadow-xl shadow-graphite/[0.06] backdrop-blur-xl xl:hidden"
        >
          <nav className="c-space py-5" aria-label="Mobile navigation">
            <ul className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const isServicesRoute = item.label === "Services" && (
                  pathname === "/software-development" ||
                  pathname === "/ai-automation" ||
                  pathname === "/ai-search-visibility"
                );

                return (
                  <li key={item.href} className="border-b border-slate/10 py-2 last:border-0">
                    <NavLink
                      href={isHomePage ? item.href : `/${item.href}`}
                      label={item.label}
                      active={isHomePage ? active === item.href : isServicesRoute}
                      onClick={onClose}
                    />
                    {"dropdown" in item && (
                      <ul className="mt-2 flex flex-col gap-1 border-l border-deep-teal/20 pl-4">
                        {item.dropdown.map((subItem) => (
                          <li key={subItem.link}>
                            <NavLink
                              href={subItem.link}
                              label={subItem.label}
                              active={pathname === subItem.link}
                              onClick={onClose}
                            />
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
            <div className="mt-5">
              <HireMeButton full onClick={onClose} />
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
