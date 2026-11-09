"use client";

import { useState, type FC } from "react";
import { useMediaQuery } from "react-responsive";
import { ProjectDetails } from "@/components/portfolio/project-details";
import { PinnedShowcase } from "@/components/projects/pinned-showcase";
import { ProjectsHeader } from "@/components/projects/projects-header";
import { VerticalProjects } from "@/components/projects/vertical-projects";
import { MY_PROJECTS } from "@/constants/portfolio-constants";
import { useHasMounted } from "@/hooks/use-has-mounted";
import { type Project } from "@/types/portfolio-types";

const getSectionLabel = (projects: Project[]) => {
  const selectedWork = projects.filter((p) => p.section === "selected-work");
  const interactiveDemos = projects.filter(
    (p) => p.section === "interactive-demo"
  );
  if (selectedWork.length > 0 && interactiveDemos.length > 0) {
    return "Selected Work · Interactive Demonstrations";
  }
  if (selectedWork.length > 0) {
    return "Selected Work";
  }
  return "Interactive Demonstrations";
};

export const Projects: FC = () => {
  const isMobile = useMediaQuery({ maxWidth: 1023 });
  const mounted = useHasMounted();
  const [active, setActive] = useState<Project | null>(null);

  const pinned = mounted && !isMobile;
  const sectionLabel = getSectionLabel(MY_PROJECTS);

  return (
    <section id="work" className="relative">
      <ProjectsHeader sectionLabel={sectionLabel} />

      {pinned ? (
        <PinnedShowcase onOpen={setActive} />
      ) : (
        <div className="c-space">
          <VerticalProjects onOpen={setActive} />
        </div>
      )}

      {active && (
        <ProjectDetails {...active} closeModal={() => setActive(null)} />
      )}
    </section>
  );
};
