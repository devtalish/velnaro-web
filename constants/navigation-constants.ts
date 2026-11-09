export const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { 
    label: "Services", 
    href: "#services", 
    dropdown: [
      { label: "Software Development", link: "/software-development" },
      { label: "AI Automation", link: "/ai-automation" },
      { label: "AI Search Visibility", link: "/ai-search-visibility" },
    ]
  },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#founder" },
  { label: "Contact", href: "#contact" },
] as const;

export const NAV_OFFSET = 72;

export const NAV_OBSERVER_OPTIONS: IntersectionObserverInit = {
  rootMargin: "-40% 0px -50% 0px",
  threshold: [0, 0.25, 0.5, 0.75, 1],
};

export const NAV_SCROLLED_AT = 20;
