import { type FC } from "react";
import { type ProjectPanelProps } from "@/types/project-types";
import { ProjectPreview } from "./project-preview";
import { ProjectSummary } from "./project-summary";

export const ProjectPanel: FC<ProjectPanelProps> = ({
  project,
  index,
  total,
  onOpen,
  showPreview,
}) => (
  <div className="flex min-h-0 h-auto w-full shrink-0 items-center justify-center px-4 py-8 sm:px-6 sm:py-10 md:px-10 lg:h-screen lg:min-h-screen lg:w-screen lg:px-20 lg:py-0">
    <div className="grid w-full max-w-7xl grid-cols-1 items-center gap-7 md:gap-10 lg:grid-cols-12 lg:gap-14">
      <ProjectSummary
        project={project}
        index={index}
        total={total}
        onOpen={onOpen}
      />
      <ProjectPreview
        project={project}
        index={index}
        total={total}
        showPreview={showPreview}
      />
    </div>
  </div>
);
