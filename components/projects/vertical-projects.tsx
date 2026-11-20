"use client";

import { useEffect, useRef, useState, type FC } from "react";
import { MY_PROJECTS } from "@/constants/portfolio-constants";
import {
  type ProjectListProps,
  type ProjectPanelProps,
} from "@/types/project-types";
import { ProjectPanel } from "./project-panel";

const LazyPanel: FC<Omit<ProjectPanelProps, "showPreview">> = (props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "160px 0px", threshold: 0.01 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

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
