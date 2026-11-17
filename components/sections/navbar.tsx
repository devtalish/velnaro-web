"use client";

import { useState, type FC, useEffect, useRef } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
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
  const servicesLinkRef = useRef<HTMLAnchorElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isServicePage = pathname.startsWith("/software-development") ||
    pathname.startsWith("/ai-automation") ||
    pathname.startsWith("/ai-search-visibility");

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (isOpen) {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      } else if (isDropdownOpen) {
        setIsDropdownOpen(false);
        servicesLinkRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isDropdownOpen, isOpen]);

  useEffect(() => {
    setIsOpen(false);
    setIsDropdownOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-slate/10 bg-ivory/95 shadow-sm shadow-graphite/[0.04] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="c-space">
        <div className="flex min-h-[72px] items-center justify-between gap-5 py-2">
          <NavBrand />
          <nav className="hidden xl:flex" aria-label="Main navigation">
            <ul className="nav-ul">
              {NAV_ITEMS.map((item) => (
                <li
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.label === "Services" && setIsDropdownOpen(true)}
                  onMouseLeave={(event) => {
                    if (item.label === "Services" && !event.currentTarget.contains(document.activeElement)) {
                      setIsDropdownOpen(false);
                    }
                  }}
                  onBlur={(event) => {
                    if (item.label === "Services" && !event.currentTarget.contains(event.relatedTarget as Node | null)) {
                      setIsDropdownOpen(false);
                    }
                  }}
                >
                  <NavLink
                    ref={item.label === "Services" ? servicesLinkRef : undefined}
                    href={isHomePage ? item.href : `/${item.href}`}
                    label={item.label}
                    active={isHomePage && active === item.href}
                    onFocus={() => item.label === "Services" && setIsDropdownOpen(true)}
                    ariaHaspopup={item.label === "Services"}
                    ariaExpanded={item.label === "Services" ? isDropdownOpen : undefined}
                    ariaControls={item.label === "Services" ? "services-navigation-menu" : undefined}
                  />
                  {item.label === "Services" && isDropdownOpen && (
                    <div
                      id="services-navigation-menu"
                      className="absolute right-0 top-full z-50 mt-3 w-72 max-w-[min(18rem,calc(100vw-2rem))] rounded-2xl border border-slate/15 bg-white p-3 shadow-2xl shadow-graphite/10"
                    >
                      <ul className="flex flex-col gap-1">
                        {item.dropdown?.map((subItem) => (
                          <li key={subItem.link}>
                            <NavLink
                              href={subItem.link}
                              label={subItem.label}
                              active={pathname === subItem.link}
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
          <div className="hidden items-center xl:flex"><HireMeButton /></div>
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            className="flex min-h-11 min-w-11 items-center justify-center rounded-full border border-slate/15 bg-white/70 text-graphite transition-colors hover:border-deep-teal/40 hover:text-deep-teal xl:hidden"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            <Image
              src={isOpen ? "/assets/close.svg" : "/assets/menu.svg"}
              alt=""
              width={22}
              height={22}
              className="h-[22px] w-[22px]"
            />
          </button>
        </div>
      </div>
      <MobileMenu open={isOpen} active={active} onClose={() => setIsOpen(false)} />
    </header>
  );
};
