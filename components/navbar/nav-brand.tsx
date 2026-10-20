"use client";

import { type FC, type MouseEvent } from "react";
import { goToAnchor } from "@/helpers/scroll-helpers";
import { VelnaroLogoWithWordmark } from "@/components/ui/velnaro-logo";

export const NavBrand: FC = () => (
  <a
    href="#home"
    onClick={(event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      goToAnchor("#home");
    }}
    className="group flex items-center gap-2 text-base font-semibold tracking-tight text-graphite"
  >
    <VelnaroLogoWithWordmark logoSize={32} />
  </a>
);
