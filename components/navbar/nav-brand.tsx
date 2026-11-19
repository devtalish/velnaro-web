"use client";

import { type FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { goToAnchor } from "@/helpers/scroll-helpers";
import { VelnaroLogoWithWordmark } from "@/components/ui/velnaro-logo";

export const NavBrand: FC = () => {
  const pathname = usePathname();
  const href = pathname === "/" ? "#home" : "/";

  return (
    <Link
      href={href}
      onClick={(event) => {
        if (pathname === "/") {
          event.preventDefault();
          goToAnchor("#home");
        }
      }}
      aria-label="Velnaro home"
      className="group flex items-center rounded-sm text-base font-semibold tracking-tight text-graphite transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-teal focus-visible:ring-offset-4"
    >
      <VelnaroLogoWithWordmark logoSize={25} />
    </Link>
  );
};
