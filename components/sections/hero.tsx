"use client";
import { type FC } from "react";
import dynamic from "next/dynamic";
import { HeroText } from "@/components/portfolio/hero-text";
import { ParallaxBackground } from "@/components/portfolio/parallax-background";
import { useDeferred3D } from "@/hooks/use-deferred-3d";

const HeroScene = dynamic(() => import("@/components/sections/hero-scene").then((mod) => mod.HeroScene), { ssr: false });

export const Hero: FC = () => {
  const showScene = useDeferred3D(0, 320);
  return (
    <section id="home" className="relative flex min-h-[100svh] items-start justify-center overflow-hidden pb-28 pt-24 sm:pb-32 md:min-h-screen md:items-start md:justify-start md:pb-0 md:pt-0">
      <ParallaxBackground />
      <HeroText />
      {showScene && <HeroScene />}
      {!showScene && <div aria-hidden="true" className="pointer-events-none absolute bottom-0 right-[-8%] h-[36svh] w-[58vw] max-w-[22rem] rounded-full bg-gradient-to-tl from-deep-teal/15 via-pale-sage/30 to-transparent blur-2xl md:bottom-auto md:right-[3%] md:top-[17%] md:h-[42vw] md:w-[42vw] md:max-w-[39rem]"} />}
    </section>
  );
};
