"use client";

import { useState, type FC, useEffect } from "react";
import Image from "next/image";
import { HireMeButton } from "@/components/navbar/hire-me-button";
import { MobileMenu } from "@/components/navbar/mobile-menu";
import { NavBrand } from "@/components/navbar/nav-brand";
import { NavLink } from "@/components/navbar/nav-link";
import { NAV_ITEMS, NAV_SCROLLED_AT } from "@/constants/navigation-constants";
import { useActiveSection } from "@/hooks/use-active-section";
import { useScrolled } from "@/hooks/use-scrolled";

export const Navbar: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const scrolled = useScrolled(NAV_SCROLLED_AT);
  const active = useActiveSection();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsDropdownOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header
      className={`reveal-down fixed inset-x-0 top-0 z-30 w-full transition-all duration-500 ${
        scrolled
          ? "border-b border-white/10 bg-primary/70 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="c-space">
        <div className="flex items-center justify-between py-2">
          <NavBrand />
          <nav className="hidden sm:flex" aria-label="Main navigation">
            <ul className="nav-ul">
              {NAV_ITEMS.map((item) => (
                <li
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.label === "Services" && setIsDropdownOpen(true)}
                  onMouseLeave={() => item.label === "Services" && setIsDropdownOpen(false)}
                  onBlur={(event) => {
                    if (item.label === "Services" && !event.currentTarget.contains(event.relatedTarget as Node | null)) {
                      setIsDropdownOpen(false);
                    }
                  }}
                >
                  <NavLink
                    href={item.href}
                    label={item.label}
                    active={active === item.href}
                    onFocus={() => item.label === "Services" && setIsDropdownOpen(true)}
                    ariaHaspopup={item.label === "Services"}
                    ariaExpanded={item.label === "Services" ? isDropdownOpen : undefined}
                    ariaControls={item.label === "Services" ? "services-navigation-menu" : undefined}
                  />
                  {item.label === "Services" && isDropdownOpen && (
                    <div
                      id="services-navigation-menu"
                      role="menu"
                      className="absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 rounded-2xl border border-slate/20 bg-white/95 p-4 shadow-xl backdrop-blur-xl"
                    >
                      <ul className="flex flex-col gap-1">
                        {item.dropdown?.map((subItem) => (
                          <li key={subItem.link}>
                            <NavLink
                              href={subItem.link}
                              label={subItem.label}
                              active={active === subItem.link}
                              onClick={() => setIsDropdownOpen(false)}
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <div className="hidden items-center sm:flex"><HireMeButton /></div>
          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            className="flex cursor-pointer text-graphite hover:text-deep-teal sm:hidden"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            <Image
              src={isOpen ? "/assets/close.svg" : "/assets/menu.svg"}
              alt=""
              width={24}
              height={24}
              className="h-6 w-6"
            />
          </button>
        </div>
      </div>
      <MobileMenu open={isOpen} active={active} onClose={() => setIsOpen(false)} />
    </header>
  );
};
