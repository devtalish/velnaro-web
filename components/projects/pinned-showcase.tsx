"use client";

import { type FC, useEffect, useRef, useState } from "react";
import { motion, useSpring, useTransform } from "motion/react";
import {
  MY_PROJECTS,
  PREVIEW_WINDOW,
  TRACK_SPRING,
} from "@/constants/projects-constants";
import { usePinnedProgress } from "@/hooks/use-pinned-progress";
import { type ProjectListProps } from "@/types/project-types";
import { ProjectPanel } from "./project-panel";

const RememberLoadedPanel: FC<{
  project: (typeof MY_PROJECTS)[number];
  index: number;
  total: number;
  onOpen: () => void;
  shouldLoad: boolean;
}> = ({ project, index, total, onOpen, shouldLoad }) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const element = panelRef.current;
    if (!shouldLoad || !element || hasLoaded) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: "160px 0px", threshold: 0.01 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [hasLoaded, shouldLoad]);

  return (
    <div ref={panelRef} className="h-full w-screen shrink-0">
      <ProjectPanel
        project={project}
        index={index}
        total={total}
        onOpen={onOpen}
        showPreview={hasLoaded}
      />
    </div>
  );
};

export const PinnedShowcase: FC<ProjectListProps> = ({ onOpen }) => {
  const total = MY_PROJECTS.length;
  const { trackRef, progress, activeIndex } = usePinnedProgress(total);

  const x = useSpring(
    useTransform(progress, [0, 1], ["0vw", `-${(total - 1) * 100}vw`]),
    TRACK_SPRING
  );
  const progressScale = useSpring(progress, TRACK_SPRING);

  return (
    <div
      ref={trackRef}
      style={{ height: `${total * 100}vh` }}
      className="relative mt-10"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-0 top-1/3 h-72 w-72 rounded-full bg-royal/10 blur-[140px]" />
          <div className="absolute bottom-1/3 right-0 h-80 w-80 rounded-full bg-coral/10 blur-[140px]" />
        </div>

        <motion.div style={{ x }} className="flex h-full will-change-transform">
          {MY_PROJECTS.map((project, index) => (
            <RememberLoadedPanel
              key={project.id}
              project={project}
              index={index}
              total={total}
              onOpen={() => onOpen(project)}
              shouldLoad={Math.abs(index - activeIndex) <= PREVIEW_WINDOW}
            />
          ))}
        </motion.div>

        <motion.div
          style={{ scaleX: progressScale, transformOrigin: "0% 50%" }}
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-coral via-lavender to-royal"
        />
      </div>
    </div>
  );
};
