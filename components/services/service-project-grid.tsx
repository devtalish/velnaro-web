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

const ServiceProjectCard: FC<{ project: ServiceProject }> = ({ project }) => {
  const content = (
    <>
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={project.image || "/placeholder-project.svg"}
          alt={project.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="space-y-3 p-5">
        <p className="text-sm text-muted">{project.category}</p>
        <h3 className="text-xl font-semibold text-graphite">{project.title}</h3>
        <p className="text-sm leading-relaxed text-muted">{project.description}</p>
        {project.technologies.length > 0 && (
          <ul className="flex flex-wrap gap-2" aria-label="Technologies">
            {project.technologies.map((technology) => (
              <li key={technology} className="rounded-full border border-slate/20 bg-white px-2 py-1 text-xs text-slate">
                {technology}
              </li>
            ))}
          </ul>
        )}
        {project.href && <span className="inline-flex items-center gap-2 text-sm font-medium text-deep-teal">View project <span aria-hidden>↗</span></span>}
      </div>
    </>
  );

  const className = "group block min-w-0 overflow-hidden rounded-2xl border border-slate/15 bg-white/70 transition-transform hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-deep-teal";
  return project.href ? (
    <a href={project.href} target="_blank" rel="noopener noreferrer" className={className}>
      {content}
    </a>
  ) : (
    <article className={className}>{content}</article>
  );
};

export const ServiceProjectGrid: FC<ServiceProjectGridProps> = ({
  projects,
  showSeeAll = true,
  seeAllHref = "#contact",
}) => (
  <section className="mb-20" aria-label="Related projects">
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => <ServiceProjectCard key={project.title} project={project} />)}
    </div>
    {showSeeAll && (
      <div className="mt-8 text-right">
        <Link href={seeAllHref} className="text-deep-teal hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-deep-teal">
          See all work
        </Link>
      </div>
    )}
  </section>
);
