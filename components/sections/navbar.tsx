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
  const servicesLinkRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

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

  return (
    <header className={`fixed inset-x-0 top-0 z-50 w-full border-b border-slate/10 transition-all duration-300 backdrop-blur-xl ${scrolled ? "bg-ivory/97 shadow-md shadow-graphite/[0.06]" : "bg-ivory/90 shadow-sm shadow-graphite/[0.025]"}`}>
      <div className="c-space">
        <div className="mx-auto flex min-h-[72px] w-full max-w-screen-2xl items-center justify-between gap-5 py-2">
          <NavBrand />
          <nav className="hidden lg:flex" aria-label="Main navigation">
            <ul className="nav-ul">
              {NAV_ITEMS.map((item) => (
                <li
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.label === "Services" && setIsDropdownOpen(true)}
                  onMouseLeave={(event) => {
                    if (item.label === "Services") {
                      const dropdown = event.currentTarget.querySelector("#services-navigation-menu");
                      if (!dropdown?.contains(document.activeElement)) setIsDropdownOpen(false);
                    }
                  }}
                  onBlur={(event) => {
                    if (item.label === "Services" && !event.currentTarget.contains(event.relatedTarget as Node | null)) setIsDropdownOpen(false);
                  }}
                >
                  {item.label === "Services" ? (
                    <>
                      <button ref={servicesLinkRef} type="button" onClick={() => setIsDropdownOpen(true)} aria-haspopup="true" aria-expanded={isDropdownOpen} aria-controls="services-navigation-menu" className="nav-link relative inline-flex items-center gap-2">
                        Services
                        <span aria-hidden className={`text-[10px] transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}>⌄</span>
                      </button>
                      {isDropdownOpen && (
                        <div className="absolute right-0 top-full z-50 w-80 max-w-[min(20rem,calc(100vw-2rem))] pt-3">
                          <div id="services-navigation-menu" className="rounded-2xl border border-slate/15 bg-white p-3 shadow-2xl shadow-graphite/10">
                            <ul className="flex flex-col gap-1">
                              {item.dropdown?.map((subItem) => (
                                <li key={subItem.link}>
                                  <NavLink href={subItem.link} label={subItem.label} active={pathname === subItem.link} onClick={() => setIsDropdownOpen(false)} />
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <NavLink href={isHomePage ? item.href : `/${item.href}`} label={item.label} active={isHomePage && active === item.href} />
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <div className="hidden items-center lg:flex"><HireMeButton /></div>
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            className="relative z-[60] flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate/20 bg-white text-graphite shadow-sm transition-colors hover:border-deep-teal/40 hover:text-deep-teal active:scale-95 lg:hidden"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            <Image src={isOpen ? "/assets/close.svg" : "/assets/menu.svg"} alt="" width={22} height={22} className="h-[22px] w-[22px]" />
          </button>
        </div>
      </div>
      <MobileMenu open={isOpen} active={active} onClose={() => setIsOpen(false)} />
    </header>
  );
};
