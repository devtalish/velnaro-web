"use client";

import { type FC } from "react";
import { AnimatePresence, motion } from "motion/react";
import { NAV_ITEMS } from "@/constants/navigation-constants";
import { HireMeButton } from "./hire-me-button";
import { NavLink } from "./nav-link";

interface MobileMenuProps {
  open: boolean;
  active: string;
  onClose: () => void;
}

export const MobileMenu: FC<MobileMenuProps> = ({ open, active, onClose }) => (
  <AnimatePresence>
    {open && (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
        id="mobile-navigation"
        className="block overflow-hidden border-t border-slate/10 bg-ivory/95 text-center backdrop-blur-xl sm:hidden"
      >
        <nav className="py-5">
          <ul className="nav-ul">
            {NAV_ITEMS.map((item) => (
              <li key={item.href} className="flex flex-col items-center gap-3">
                <NavLink
                  href={item.href}
                  label={item.label}
                  active={active === item.href}
                  onClick={onClose}
                />
                {"dropdown" in item && (
                  <ul className="flex flex-col items-center gap-2">
                    {item.dropdown.map((subItem) => (
                      <li key={subItem.link}>
                        <NavLink
                          href={subItem.link}
                          label={subItem.label}
                          active={active === subItem.link}
                          onClick={onClose}
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-4 px-6">
            <HireMeButton full onClick={onClose} />
          </div>
        </nav>
      </motion.div>
    )}
  </AnimatePresence>
);
