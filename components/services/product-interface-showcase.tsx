"use client";

import { type FC } from "react";
import Image from "next/image";

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
  <section className="max-w-7xl mx-auto px-6 pt-24 pb-16">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-8 lg:mb-0">
        <div className="absolute inset-0 bg-slate/20"></div>
                <Image
          src="/placeholder-product-main.svg"
          alt={mainAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 55vw"
          className={`object-cover ${mainClassName || ""}`}
        />
        <h3 className="text-sm uppercase tracking-wider text-deep-teal absolute top-6 left-6">
          {panel1Title}
        </h3>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm uppercase tracking-wider text-deep-teal mb-3">Main Product Interface</h3>
          <p className="text-base text-muted leading-relaxed">
            {panel1Description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm uppercase tracking-wider text-deep-teal mb-3">
              {panel2Title}
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              {panel2Description}
            </p>
          </div>
          <div>
            <h3 className="text-sm uppercase tracking-wider text-deep-teal mb-3">
              {panel3Title}
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              {panel3Description}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);