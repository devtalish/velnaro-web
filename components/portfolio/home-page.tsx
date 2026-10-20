"use client";

import { type FC } from "react";
import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Projects } from "@/components/sections/projects";
import { Process } from "@/components/sections/process";
import { FounderMessage } from "@/components/sections/founder-message";
import { FAQ } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { PageLoader } from "@/components/portfolio/page-loader";
import { GlobeLayer } from "@/components/globe/globe-layer";

export const HomePage: FC = () => (
  <>
    <PageLoader />
    <GlobeLayer />
    <div id="site-content" className="relative z-10 w-full">
      <Navbar />
      <Hero />
      <Services />
      <Projects />
      <Process />
      <FounderMessage />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  </>
);
