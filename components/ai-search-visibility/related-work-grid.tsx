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

const RelatedWorkCard: FC<{ project: ProjectRef }> = ({
  project,
}) => {
  return (
    <article className="group min-w-0 overflow-hidden rounded-2xl">
      <div className="relative aspect-[16/10] overflow-hidden">
                <Image
          src={project.image || "/placeholder-project.svg"}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          unoptimized
          className="object-cover transform transition-transform group-hover:scale-110"
        />
      </div>

      <div className="space-y-3 p-5">
        <h3 className="text-xl font-semibold">
          {project.title}
        </h3>
        <p className="text-sm text-muted/60">
          {project.description}
        </p>
        <p className="text-xs text-muted/60 capitalize">
          {project.capabilities[0]}
        </p>
      </div>
    </article>
  );
};

export const RelatedWorkGrid: FC<RelatedWorkGridProps> = ({
  projects,
}) => {
  return (
    <section className="mb-20">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <RelatedWorkCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
};