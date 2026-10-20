"use client";

import { useRef, type FC } from "react";
import { ServiceCard } from "@/components/services/service-card";
import { ServicesCtaCard } from "@/components/services/services-cta-card";
import { SectionHeader } from "@/components/ui/section-header";
import { SERVICES } from "@/constants/services-constants";

export const Services: FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="c-space section-spacing relative overflow-visible"
    >
      <SectionHeader
        className="mb-12"
        eyebrow="WHAT WE DO"
        title={
          <>
            Technology built around real needs.
          </>
        }
      />

      <div className="relative space-y-6 md:space-y-8">
        {SERVICES.map((service, index) => (
          <ServiceCard
            key={service.id}
            service={service}
            index={index}
            total={SERVICES.length}
          />
        ))}
      </div>

      <ServicesCtaCard />
    </section>
  );
};
