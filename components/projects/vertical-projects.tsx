"use client";

import { type FC } from "react";
import { MY_PROJECTS } from "@/constants/portfolio-constants";
import { useInViewOnce } from "@/hooks/use-in-view-once";
import {
  type ProjectListProps,
  type ProjectPanelProps,
} from "@/types/project-types";
import { ProjectPanel } from "./project-panel";

const LazyPanel: FC<Omit<ProjectPanelProps, "showPreview">> = (props) => {
  const [ref, inView] = useInViewOnce<HTMLDivElement>();
  return (
    <div ref={ref}>
      <ProjectPanel {...props} showPreview={inView} />
    </div>
  );
};

export const VerticalProjects: FC<ProjectListProps> = ({ onOpen }) => (
  <div className="mt-8 space-y-10 sm:mt-10 sm:space-y-14 lg:mt-12 lg:space-y-20">
    {MY_PROJECTS.map((project, index) => (
      <LazyPanel
        key={project.id}
        project={project}
        index={index}
        total={MY_PROJECTS.length}
        onOpen={() => onOpen(project)}
      />
    ))}
  </div>
);
