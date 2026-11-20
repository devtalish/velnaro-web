import { type FC } from "react";
import { THEME } from "@/constants/globe-constants";

const orb = `radial-gradient(circle at 42% 38%, ${THEME.spark}75 0%, ${THEME.base}22 24%, ${THEME.deep}12 48%, transparent 70%)`;
const flare = `radial-gradient(circle at 68% 66%, ${THEME.hot}12 0%, transparent 56%)`;

export const GlobePoster: FC = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-ivory"
  >
    <div
      className="absolute left-1/2 top-1/2 aspect-square w-[150vw] max-w-[880px] -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{ backgroundImage: `${orb}, ${flare}` }}
    />
    <div className="absolute inset-0 bg-gradient-to-b from-ivory/10 via-transparent to-ivory/35" />
  </div>
);
