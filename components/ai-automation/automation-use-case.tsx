"use client";

import { type FC } from "react";
import Image from "next/image";

type UseCase = {
  id: number;
  title: string;
  manualProblem: string;
  automatedWorkflow: string;
  improvement: string;
  visualAlt: string;
  imageSrc: string;
};

type AutomationUseCaseProps = { useses: UseCase[] };

const UseCaseCard: FC<{ useCase: UseCase }> = ({ useCase }) => (
  <article className="group overflow-hidden rounded-2xl border border-slate/20 bg-white/80 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-deep-teal/25 hover:shadow-xl hover:shadow-graphite/[0.06]">
    <div className="relative mb-5 aspect-[16/9] overflow-hidden rounded-xl bg-graphite">
      <Image
        src={useCase.imageSrc}
        alt={useCase.visualAlt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
      />
      <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-graphite/80 px-3 py-1 text-xs font-mono text-white">
        {String(useCase.id).padStart(2, "0")}
      </span>
    </div>
    <h3 className="text-xl font-semibold text-graphite">{useCase.title}</h3>
    <div className="mt-4 grid gap-3">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted">Manual challenge</p>
        <p className="mt-1 text-sm leading-relaxed text-slate">{useCase.manualProblem}</p>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-deep-teal">Automated workflow</p>
        <p className="mt-1 text-sm leading-relaxed text-slate">{useCase.automatedWorkflow}</p>
      </div>
      {useCase.improvement && (
        <div className="rounded-xl border border-deep-teal/20 bg-pale-sage/50 p-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-deep-teal">Expected operational improvement</p>
          <p className="mt-1 text-sm leading-relaxed text-graphite">{useCase.improvement}</p>
        </div>
      )}
    </div>
  </article>
);

export const AutomationUseCase: FC<AutomationUseCaseProps> = ({ useses }) => (
  <section className="mb-20" aria-label="Automation use cases">
    <div className="grid gap-6 md:grid-cols-2">
      {useses.map((useCase) => <UseCaseCard key={useCase.id} useCase={useCase} />)}
    </div>
  </section>
);