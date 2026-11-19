import { type FC } from "react";
import Image from "next/image";

type ProjectRef = {
  title: string;
  description: string;
  href?: string;
  image?: string;
  capabilities: string[];
};

type RelatedWorkGridProps = {
  projects: ProjectRef[];
};

const RelatedWorkCard: FC<{ project: ProjectRef; index: number }> = ({ project, index }) => {
  const card = (
    <>
      <div className="relative aspect-[16/10] overflow-hidden border-b border-slate/10 bg-gradient-to-br from-ivory via-white to-pale-sage/55 p-5 sm:p-6">
        {project.image ? (
          <Image src={project.image} alt={`${project.title} preview`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
        ) : (
          <>
            <div className="absolute -right-10 -top-14 h-48 w-48 rounded-full border border-deep-teal/10" />
            <div className="absolute -right-1 -top-5 h-32 w-32 rounded-full border border-deep-teal/15" />
            <div className="relative flex h-full flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-slate/15 bg-white/75 px-3 py-1 text-[9px] uppercase tracking-[0.2em] text-muted">Related work</span>
                <span className="font-mono text-xs text-deep-teal/65">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-deep-teal">{project.capabilities[0] || "Digital product"}</p>
                <p className="mt-2 max-w-[85%] text-3xl font-semibold tracking-tight text-graphite sm:text-4xl">{project.title}</p>
                <div className="mt-4 flex gap-1.5">
                  <span className="h-1 w-12 rounded-full bg-deep-teal/60" />
                  <span className="h-1 w-7 rounded-full bg-deep-teal/25" />
                  <span className="h-1 w-4 rounded-full bg-deep-teal/15" />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="space-y-3 p-5">
        <h3 className="text-xl font-semibold tracking-tight text-graphite">{project.title}</h3>
        <p className="text-sm leading-relaxed text-muted">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.capabilities.slice(0, 3).map((capability) => (
            <span key={capability} className="rounded-full border border-slate/15 bg-ivory/70 px-2.5 py-1 text-[10px] text-muted">{capability}</span>
          ))}
        </div>
        {project.href && <span className="inline-flex items-center gap-2 pt-1 text-sm font-semibold text-deep-teal">Explore project <span aria-hidden>↗</span></span>}
      </div>
    </>
  );

  const className = "group block min-w-0 overflow-hidden rounded-2xl border border-slate/15 bg-white/75 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-deep-teal/25 hover:shadow-xl hover:shadow-graphite/[0.06]";
  return project.href ? (
    <a href={project.href} target="_blank" rel="noopener noreferrer" className={className}>{card}</a>
  ) : (
    <article className={className}>{card}</article>
  );
};

export const RelatedWorkGrid: FC<RelatedWorkGridProps> = ({ projects }) => (
  <section className="mb-24" aria-label="Related work">
    <div className="mb-8 max-w-3xl">
      <p className="text-eyebrow mb-3 uppercase tracking-wider">RELATED WORK</p>
      <h2 className="text-heading">Ideas made tangible.</h2>
    </div>
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => <RelatedWorkCard key={project.title} project={project} index={index} />)}
    </div>
  </section>
);
