"use client";

import { type FC } from "react";
import Link from "next/link";

type ServiceProject = {
  title: string;
  category: string;
  description: string;
  href?: string;
  image?: string;
  technologies: string[];
};

type ServiceProjectGridProps = {
  projects: ServiceProject[];
  showSeeAll?: boolean;
  seeAllHref?: string;
};

const ServiceProjectCard: FC<{ project: ServiceProject }> = ({
  project,
}) => {
  return (
    <article className="group min-w-0 overflow-hidden rounded-2xl">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={project.image || "/placeholder-project.svg"}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform"
          loading="lazy"
        />
      </div>

      <div className="space-y-3 p-5">
        <p className="text-sm opacity-70">
          {project.category}
        </p>

        <h3 className="text-xl font-semibold">
          {project.title}
        </h3>

        <p className="text-sm leading-relaxed opacity-75">
          {project.description}
        </p>
      </div>
    </article>
  );
};

export const ServiceProjectGrid: FC<ServiceProjectGridProps> = ({
  projects,
  showSeeAll = true,
  seeAllHref = "#contact",
}) => {
  return (
    <section className="mb-20">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ServiceProjectCard key={project.title} project={project} />
        ))}
      </div>
      {showSeeAll && (
        <div className="mt-8 text-right">
          <Link
            href={seeAllHref}
            className="text-deep-teal hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-deep-teal focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
          >
            See all work
          </Link>
        </div>
      )}
    </section>
  );
};