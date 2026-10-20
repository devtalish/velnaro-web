"use client";

import { type FC, type SVGProps } from "react";

export const VelnaroLogo: FC<SVGProps<SVGSVGElement>> = ({ className, "aria-label": ariaLabel = "VELNARO", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 360 360"
    role="img"
    aria-label={ariaLabel}
    className={className}
    {...props}
  >
    <rect width="360" height="360" fill="#000000" />
    <g fill="#FFFFFF">
      <path d="M67 84H116L180 217L244 84H293L180 318L67 84Z" />
      <path d="M144 84H194L293 276V318L244 318L144 117V84Z" />
    </g>
  </svg>
);

export const VelnaroWordmark: FC<{ className?: string }> = ({ className }) => (
  <span className={`font-bold tracking-tight text-graphite ${className}`}>VELNARO</span>
);

export const VelnaroLogoWithWordmark: FC<{ className?: string; logoSize?: number }> = ({ className, logoSize = 32 }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <VelnaroLogo className={`h-[${logoSize}px] w-[${logoSize}px] flex-shrink-0`} aria-label="VELNARO logo" />
    <VelnaroWordmark className="text-sm md:text-base" />
  </div>
);