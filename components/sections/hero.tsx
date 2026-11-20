"use client";

import { type FC } from "react";
import dynamic from "next/dynamic";
import { HeroText } from "@/components/portfolio/hero-text";
import { ParallaxBackground } from "@/components/portfolio/parallax-background";
import { useDeferred3D } from "@/hooks/use-deferred-3d";
import { VelnaroLogo } from "@/components/ui/velnaro-logo";

const HeroScene = dynamic(
  () => import("@/components/sections/hero-scene").then((mod) => mod.HeroScene),
  { ssr: false }
);

export const Hero: FC = () => {
  // Keep phones on the lightweight branded artwork; load the heavy astronaut only on larger screens.
  const showScene = useDeferred3D(0, 854);

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-start justify-center overflow-hidden pb-10 pt-20 sm:pb-12 md:min-h-screen md:items-start md:justify-start md:overflow-visible md:pb-0 md:pt-0"
    >
      <HeroText />
      <ParallaxBackground />
      {!showScene && (
        <div aria-hidden="true" className="pointer-events-none absolute bottom-[3%] right-[-10%] h-[19rem] w-[19rem] sm:bottom-[2%] sm:right-[2%] md:bottom-auto md:right-[3%] md:top-[17%] md:h-auto md:w-[42vw] md:max-w-[39rem] md:aspect-square">
          <div className="absolute inset-[8%] rounded-full border border-deep-teal/15" />
          <div className="absolute inset-[18%] rounded-full border border-slate/10" />
          <div className="absolute inset-[25%] flex items-center justify-center rounded-full bg-gradient-to-br from-white/90 via-pale-sage/55 to-deep-teal/10 shadow-[0_35px_100px_-45px_rgba(23,107,101,0.35)]">
            <VelnaroLogo className="h-[22%] w-[22%] opacity-80" />
          </div>
          <div className="absolute left-[18%] top-[24%] h-3 w-3 rounded-full bg-deep-teal/55 shadow-[0_0_24px_rgba(23,107,101,0.35)]" />
          <div className="absolute bottom-[18%] right-[22%] h-2 w-2 rounded-full bg-graphite/35" />
          <div className="absolute right-[9%] top-[36%] h-5 w-5 rounded-full border border-deep-teal/25 bg-white/80" />
        </div>
      )}
      {showScene && <HeroScene />}
    </section>
  );
};
