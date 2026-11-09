"use client";

import { type FC } from "react";

type UseCase = {
  id: number;
  title: string;
  manualProblem: string;
  automatedWorkflow: string;
  improvement: string;
  visualAlt: string;
};

type AutomationUseCaseProps = {
  useses: UseCase[];
};

const UseCaseCard: FC<{ useCase: UseCase }> = ({
  useCase,
}) => {
  return (
    <article className="group rounded-2xl overflow-hidden border p-6">
      <div className="relative h-48 mb-4">
        <div
          className="absolute inset-0 bg-slate/20 flex items-center justify-center text-xs text-muted/60 uppercase tracking-wider"
        >
          {useCase.id}
        </div>
        <img
          src="/placeholder-use-case.svg"
          alt={useCase.visualAlt}
          className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform"
          loading="lazy"
        />
      </div>

      <div>
        <h3 className="text-xl font-semibold">{useCase.title}</h3>
        <p className="text-muted text-sm leading-relaxed mb-3">
          {useCase.manualProblem}
        </p>
        <p className="text-sm text-muted/60">
          {useCase.automatedWorkflow}
        </p>
      </div>
    </article>
  );
};

export const AutomationUseCase: FC<AutomationUseCaseProps> = ({
  useses,
}) => (
  <section className="mb-20">
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {useses.map((useCase) => (
        <UseCaseCard key={useCase.id} useCase={useCase} />
      ))}
    </div>
  </section>
);