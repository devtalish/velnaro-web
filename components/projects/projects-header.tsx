import { type FC } from "react";
import { SectionHeader } from "@/components/ui/section-header";

export const ProjectsHeader: FC<{ sectionLabel: string }> = ({
  sectionLabel,
}) => {
  const eyebrow = sectionLabel;
  return (
    <div className="c-space pt-24 md:pt-32">
      <SectionHeader
        eyebrow={eyebrow}
        title={
          <>
            Work shaped around the problem.
          </>
        }
      />
      <p className="mt-4 text-muted max-w-2xl">
        Explore {sectionLabel === "Selected Work"
          ? "a selection of Velnaro digital products and concepts"
          : sectionLabel === "Interactive Demonstrations"
            ? "open-source deployments and demonstrations used to showcase functionality"
            : "selected work and interactive demonstrations"}
        across web experiences, AI-enabled applications, and operational tools.
      </p>
    </div>
  );
};
