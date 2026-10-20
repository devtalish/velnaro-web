import { type FC } from "react";
import { SectionHeader } from "@/components/ui/section-header";

export const ProjectsHeader: FC<{ total: number }> = () => (
  <div className="c-space pt-24 md:pt-32">
    <SectionHeader
      eyebrow="SELECTED WORK"
      title={
        <>
          Work shaped around the problem.
        </>
      }
    />
    <p className="mt-4 text-muted max-w-2xl">
      Explore a selection of digital products and concepts across web experiences,
      AI-enabled applications, and operational tools.
    </p>
  </div>
);
