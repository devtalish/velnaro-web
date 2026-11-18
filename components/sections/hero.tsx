"use client";

import { type FC } from "react";
import dynamic from "next/dynamic";
import { HeroText } from "@/components/portfolio/hero-text";
import { ParallaxBackground } from "@/components/portfolio/parallax-background";
import { useDeferred3D } from "@/hooks/use-deferred-3d";

const HeroScene = dynamic(
  () => import("@/components/sections/hero-scene").then((mod) => mod.HeroScene),
  { ssr: false }
);

export const Hero: FC = () => {
  const showScene = useDeferred3D();

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-start justify-center overflow-visible md:items-start md:justify-start"
    >
      <HeroText />
      <ParallaxBackground />
      {showScene && <HeroScene />}
    </section>
  );
};
