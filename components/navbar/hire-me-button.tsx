"use client";

import { type FC, type MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { goToAnchor } from "@/helpers/scroll-helpers";
import { type HireMeButtonProps } from "@/types/navigation-types";
import { ArrowIcon } from "./arrow-icon";

export const HireMeButton: FC<HireMeButtonProps> = ({ onClick, full }) => {
  const pathname = usePathname();
  const href = pathname === "/" ? "#contact" : "/#contact";

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      event.preventDefault();
      goToAnchor("#contact");
    }
    onClick?.();
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={`group relative inline-flex min-h-11 items-center gap-2 rounded-full border border-slate/20 bg-white py-1.5 pl-4 pr-1.5 text-sm font-medium text-graphite shadow-sm shadow-graphite/[0.03] transition-all hover:-translate-y-0.5 hover:border-deep-teal/45 hover:shadow-md ${
        full ? "w-full justify-between" : ""
      }`}
    >
      <span>Discuss a Project</span>
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-graphite text-ivory transition-transform duration-300 group-hover:translate-x-0.5">
        <ArrowIcon />
      </span>
    </Link>
  );
};
