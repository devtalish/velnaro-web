"use client";

import { type FC } from "react";
import Image from "next/image";
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

const ServiceProjectCard: FC<{ project: ServiceProject; index: number }> = ({ project, index }) => {
  const content = (
    <>
      <div className="relative aspect-[16/10] overflow-hidden border-b border-slate/10 bg-gradient-to-br from-ivory via-white to-pale-sage/50">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.title} project preview`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 overflow-hidden p-5 sm:p-6">
            <div className="absolute -right-10 -top-16 h-48 w-48 rounded-full border border-deep-teal/10" />
            <div className="absolute -right-2 -top-8 h-32 w-32 rounded-full border border-deep-teal/15" />
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-deep-teal/[0.07] to-transparent" />
            <div className="relative flex h-full flex-col justify-between">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full border border-slate/15 bg-white/75 px-3 py-1 text-[9px] uppercase tracking-[0.2em] text-muted">Selected work</span>
                <span className="font-mono text-xs text-deep-teal/65">{String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
              </div>
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-deep-teal">{project.category}</p>
                <p className="mt-2 max-w-[85%] text-3xl font-semibold tracking-tight text-graphite sm:text-4xl">{project.title}</p>
                <div className="mt-4 flex gap-1.5">
                  <span className="h-1 w-12 rounded-full bg-deep-teal/60" />
                  <span className="h-1 w-7 rounded-full bg-deep-teal/25" />
                  <span className="h-1 w-4 rounded-full bg-deep-teal/15" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="space-y-3 p-5 sm:p-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">{project.category}</p>
        <h3 className="text-xl font-semibold tracking-tight text-graphite">{project.title}</h3>
        <p className="text-sm leading-relaxed text-muted">{project.description}</p>
        {project.technologies.length > 0 && (
          <ul className="flex flex-wrap gap-2 pt-1" aria-label="Technologies">
            {project.technologies.map((technology) => (
              <li key={technology} className="rounded-full border border-slate/15 bg-ivory/70 px-2.5 py-1 text-[10px] text-muted">
                {technology}
              </li>
            ))}
          </ul>
        )}
        {project.href && <span className="inline-flex items-center gap-2 pt-2 text-sm font-semibold text-deep-teal">View project <span aria-hidden>↗</span></span>}
      </div>
    </>
  );

  const className = "group block min-w-0 overflow-hidden rounded-2xl border border-slate/15 bg-white/75 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-deep-teal/25 hover:shadow-xl hover:shadow-graphite/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-deep-teal";
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
  seeAllHref = "/#work",
}) => (
  <section className="mb-24" aria-label="Related projects">
    <div className="mb-8 max-w-3xl">
      <p className="text-eyebrow mb-3 uppercase tracking-wider">SELECTED WORK</p>
      <h2 className="text-heading">Relevant work and demonstrations.</h2>
    </div>
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <ServiceProjectCard key={project.title} project={project} index={index} />
      ))}
    </div>
    {showSeeAll && (
      <div className="mt-8 text-right">
        <Link href={seeAllHref} className="inline-flex items-center gap-2 text-sm font-medium text-deep-teal transition-colors hover:text-graphite focus-visible:outline focus-visible:outline-2 focus-visible:outline-deep-teal">
          See all work <span aria-hidden>→</span>
        </Link>
      </div>
    )}
  </section>
);
