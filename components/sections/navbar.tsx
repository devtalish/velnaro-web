"use client";

import { useState, type FC, useEffect, useRef } from "react";
import Image from "next/image";
import { HireMeButton } from "@/components/navbar/hire-me-button";
import { MobileMenu } from "@/components/navbar/mobile-menu";
import { NavBrand } from "@/components/navbar/nav-brand";
import { NavLink } from "@/components/navbar/nav-link";
import {
  NAV_ITEMS,
  NAV_SCROLLED_AT,
} from "@/constants/navigation-constants";
import { useActiveSection } from "@/hooks/use-active-section";
import { useScrolled } from "@/hooks/use-scrolled";

export const Navbar: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const scrolled = useScrolled(NAV_SCROLLED_AT);
  const active = useActiveSection();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const servicesLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const servicesLink = servicesLinkRef.current;
    const handleMouseEnter = () => setIsDropdownOpen(true);

    if (servicesLink) {
      servicesLink.addEventListener("mouseenter", handleMouseEnter);
    }
    return () => {
      if (servicesLink) {
        servicesLink.removeEventListener(
          "mouseenter",
          handleMouseEnter
        );
      }
    };
  }, []);

  useEffect(() => {
    const dropdown = dropdownRef.current;
    const handleDropdownMouseEnter = () => setIsDropdownOpen(true);
    const handleDropdownMouseLeave = () => setIsDropdownOpen(false);

    if (dropdown) {
      dropdown.addEventListener("mouseenter", handleDropdownMouseEnter);
      dropdown.addEventListener("mouseleave", handleDropdownMouseLeave);
    }
    return () => {
      if (dropdown) {
        dropdown.removeEventListener(
          "mouseenter",
          handleDropdownMouseEnter
        );
        dropdown.removeEventListener(
          "mouseleave",
          handleDropdownMouseLeave
        );
      }
    };
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

          <nav className="hidden sm:flex">
            <ul className="nav-ul">
              {NAV_ITEMS.map((item) => (
                <li key={item.label} className="relative">
                  {item.label === "Services" ? (
                    <NavLink
                      href={item.href}
                      label={item.label}
                      active={active === item.href}
                      ref={servicesLinkRef}
                      onMouseEnter={() => setIsDropdownOpen(true)}
                    />
                  ) : (
                    <NavLink
                      href={item.href}
                      label={item.label}
                      active={active === item.href}
                    />
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center sm:flex">
            <HireMeButton />
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            className="flex cursor-pointer text-neutral-300 hover:text-white sm:hidden"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
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

      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute left-0 top-full mt-2 w-64 bg-white/80 backdrop-blur-md border border-slate/20 rounded-2xl glass p-4 shadow-lg z-50"
          style={{
            transformOrigin: "top left",
            transition: "opacity 0.2s ease-in-out",
          }}
        >
          <ul className="flex flex-col space-y-2">
            {NAV_ITEMS.find((item) => item.label === "Services")?.dropdown.map(
              (subItem) => (
                <li key={subItem.link} className="hover:text-deep-teal">
                  <NavLink
                    href={subItem.link}
                    label={subItem.label}
                    active={active === subItem.link}
                    onClick={() => setIsDropdownOpen(false)}
                  />
                </li>
              )
            )}
          </ul>
        </div>
      )}

      <MobileMenu
        open={isOpen}
        active={active}
        onClose={() => setIsOpen(false)}
      />
    </header>
  );
};
