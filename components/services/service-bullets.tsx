"use client";

import { type FC } from "react";

export const ServiceBullets: FC<{ bullets: string[] }> = ({ bullets }) => (
  <ul className="space-y-3">
    {bullets.map((bullet) => (
      <li key={bullet} className="flex items-start gap-3 text-sm leading-6 text-muted md:text-base">
        <span aria-hidden="true" className="mt-[0.65rem] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-deep-teal" />
        <span>{bullet}</span>
      </li>
    ))}
  </ul>
);
