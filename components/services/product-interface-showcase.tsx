"use client";

import { type FC } from "react";

type ProductInterfaceShowcaseProps = {
  mainAlt: string;
  mainClassName?: string;
  panel1Title: string;
  panel1Description: string;
  panel2Title: string;
  panel2Description: string;
  panel3Title: string;
  panel3Description: string;
};

const BrowserDots = () => (
  <div className="flex items-center gap-1.5">
    <span className="h-2 w-2 rounded-full bg-deep-teal/55" />
    <span className="h-2 w-2 rounded-full bg-pale-sage" />
    <span className="h-2 w-2 rounded-full bg-slate/15" />
  </div>
);

export const ProductInterfaceShowcase: FC<ProductInterfaceShowcaseProps> = ({
  mainAlt,
  mainClassName,
  panel1Title,
  panel1Description,
  panel2Title,
  panel2Description,
  panel3Title,
  panel3Description,
}) => (
  <section className="mx-auto max-w-7xl px-0 pb-20 pt-8">
    <div className="mb-8 max-w-3xl">
      <p className="text-eyebrow mb-3 uppercase tracking-wider">DESIGNED FOR REAL USE</p>
      <h2 className="text-heading">One product. Every important touchpoint.</h2>
    </div>

    <div className="grid gap-4 lg:grid-cols-3">
      <article className="group overflow-hidden rounded-2xl border border-slate/15 bg-white/75 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-graphite/[0.05]">
        <div role="img" aria-label={mainAlt} className={`relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-ivory to-pale-sage/60 p-4 sm:p-5 ${mainClassName || ""}`}>
          <div className="absolute inset-4 overflow-hidden rounded-xl border border-slate/15 bg-white shadow-lg shadow-graphite/[0.06]">
            <div className="flex items-center gap-3 border-b border-slate/10 px-3 py-2.5">
              <BrowserDots />
              <span className="text-[8px] text-muted">yourbusiness.com</span>
            </div>
            <div className="grid h-[calc(100%-34px)] grid-cols-[1fr_0.72fr] gap-2 p-3">
              <div className="flex flex-col justify-center">
                <span className="h-1.5 w-10 rounded-full bg-deep-teal/25" />
                <span className="mt-2 h-3 w-[90%] rounded bg-graphite/80" />
                <span className="mt-1 h-3 w-[68%] rounded bg-graphite/65" />
                <span className="mt-3 h-1.5 w-[90%] rounded bg-slate/10" />
                <span className="mt-1 h-1.5 w-[76%] rounded bg-slate/10" />
                <span className="mt-3 h-5 w-16 rounded-full bg-deep-teal" />
              </div>
              <div className="flex flex-col justify-end gap-2">
                <div className="h-[72%] rounded-lg bg-gradient-to-br from-pale-sage to-deep-teal/25" />
                <div className="grid grid-cols-2 gap-1">
                  <span className="h-5 rounded bg-deep-teal/10" />
                  <span className="h-5 rounded bg-pale-sage" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-5 sm:p-6">
          <span className="font-mono text-[10px] text-deep-teal/70">01 / EXPERIENCE</span>
          <h3 className="mt-2 text-lg font-semibold text-graphite">{panel1Title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{panel1Description}</p>
        </div>
      </article>

      <article className="group overflow-hidden rounded-2xl border border-slate/15 bg-white/75 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-graphite/[0.05]">
        <div role="img" aria-label={panel2Title} className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-pale-sage/70 to-ivory p-4 sm:p-5">
          <div className="absolute inset-4 overflow-hidden rounded-xl border border-slate/15 bg-white shadow-lg shadow-graphite/[0.06]">
            <div className="flex items-center justify-between border-b border-slate/10 px-3 py-2.5">
              <BrowserDots />
              <span className="text-[8px] text-muted">Admin workspace</span>
            </div>
            <div className="grid h-[calc(100%-34px)] grid-cols-[0.3fr_1fr]">
              <div className="bg-graphite p-2">
                <span className="mb-3 block h-4 w-4 rounded bg-white/20" />
                <span className="mb-2 block h-1.5 w-full rounded bg-white/30" />
                <span className="mb-2 block h-1.5 w-4/5 rounded bg-white/10" />
                <span className="mb-2 block h-1.5 w-full rounded bg-white/10" />
                <span className="block h-1.5 w-3/5 rounded bg-white/10" />
              </div>
              <div className="p-3">
                <span className="block h-2 w-1/3 rounded bg-graphite/70" />
                <div className="mt-3 grid grid-cols-3 gap-1.5">
                  <span className="h-7 rounded bg-deep-teal/10" />
                  <span className="h-7 rounded bg-pale-sage" />
                  <span className="h-7 rounded bg-slate/10" />
                </div>
                <div className="mt-3 space-y-2">
                  {[0, 1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center gap-2 border-b border-slate/10 pb-1.5">
                      <span className="h-3 w-3 rounded bg-pale-sage" />
                      <span className="h-1.5 flex-1 rounded bg-slate/15" />
                      <span className="h-1.5 w-7 rounded bg-deep-teal/25" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-5 sm:p-6">
          <span className="font-mono text-[10px] text-deep-teal/70">02 / OPERATIONS</span>
          <h3 className="mt-2 text-lg font-semibold text-graphite">{panel2Title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{panel2Description}</p>
        </div>
      </article>

      <article className="group overflow-hidden rounded-2xl border border-slate/15 bg-white/75 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-graphite/[0.05]">
        <div role="img" aria-label={panel3Title} className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-gradient-to-br from-ivory to-pale-sage/65 p-4">
          <div className="relative h-[94%] w-[34%] min-w-[100px] rounded-[1.4rem] border-[4px] border-graphite bg-graphite p-1.5 shadow-xl shadow-graphite/15 transition-transform duration-500 group-hover:-translate-y-1">
            <div className="h-full overflow-hidden rounded-[1rem] bg-white">
              <div className="flex items-center justify-between px-2 py-2">
                <span className="h-1 w-5 rounded bg-graphite/70" />
                <span className="h-2 w-2 rounded-full bg-deep-teal/25" />
              </div>
              <div className="px-2">
                <div className="h-14 rounded-lg bg-gradient-to-br from-deep-teal/20 to-pale-sage" />
                <span className="mt-2 block h-1.5 w-4/5 rounded bg-graphite/60" />
                <span className="mt-1 block h-1 w-3/5 rounded bg-slate/15" />
                <div className="mt-3 space-y-1.5">
                  <span className="block h-5 rounded bg-ivory" />
                  <span className="block h-5 rounded bg-ivory" />
                </div>
                <span className="mt-3 block h-5 rounded-full bg-deep-teal" />
              </div>
            </div>
          </div>
          <div className="absolute bottom-6 right-6 rounded-xl border border-white/80 bg-white/85 px-3 py-2 shadow-lg backdrop-blur-md">
            <span className="block text-[8px] uppercase tracking-wider text-muted">Responsive</span>
            <span className="mt-0.5 block text-xs font-semibold text-graphite">Mobile ready</span>
          </div>
        </div>
        <div className="p-5 sm:p-6">
          <span className="font-mono text-[10px] text-deep-teal/70">03 / EVERY DEVICE</span>
          <h3 className="mt-2 text-lg font-semibold text-graphite">{panel3Title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{panel3Description}</p>
        </div>
      </article>
    </div>
  </section>
);
