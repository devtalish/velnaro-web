"use client";

import { useEffect, useState } from "react";

const MIN_3D_VIEWPORT = 320;
const MIN_LAYERS_VIEWPORT = 854;
const IDLE_TIMEOUT_MS = 2000;

const isCapableDevice = (minViewport: number) => {
  if (typeof window === "undefined") return false;

  const viewport = window.matchMedia(`(min-width: ${minViewport}px)`);
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  return viewport.matches && !reducedMotion.matches;
};

let webGLAvailable: boolean | undefined;

const hasWebGL = () => {
  if (webGLAvailable !== undefined) return webGLAvailable;

  const canvas = document.createElement("canvas");
  const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");

  webGLAvailable = Boolean(gl);
  gl?.getExtension("WEBGL_lose_context")?.loseContext();
  return webGLAvailable;
};

const whenIdle = (run: () => void) => {
  if (typeof window.requestIdleCallback === "function") {
    const handle = window.requestIdleCallback(run, { timeout: IDLE_TIMEOUT_MS });
    return () => window.cancelIdleCallback(handle);
  }

  const handle = window.setTimeout(run, 200);
  return () => window.clearTimeout(handle);
};

let unlocked = -1;
let scheduled = false;
const listeners = new Set<() => void>();

const advance = () => {
  unlocked += 1;
  for (const listener of listeners) listener();
  if (unlocked < 1) whenIdle(advance);
};

const scheduleStages = () => {
  if (scheduled) return;
  scheduled = true;

  const begin = () => whenIdle(advance);

  if (document.readyState === "complete") {
    begin();
  } else {
    window.addEventListener("load", begin, { once: true });
  }
};

const useStagedFlag = (
  stage: number,
  test: () => boolean,
  minViewport: number
) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const sync = () => setEnabled(unlocked >= stage && test());

    listeners.add(sync);
    scheduleStages();
    const cancelCatchUp = whenIdle(sync);

    const viewport = window.matchMedia(`(min-width: ${minViewport}px)`);
    viewport.addEventListener("change", sync);

    return () => {
      listeners.delete(sync);
      cancelCatchUp();
      viewport.removeEventListener("change", sync);
    };
    // The capability predicates are stable module-level functions.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, minViewport]);

  return enabled;
};

/** Load the hero's 3D artwork on phones and desktop when WebGL is available. */
export const useDeferred3D = (stage = 0, minViewport = MIN_3D_VIEWPORT): boolean =>
  useStagedFlag(
    stage,
    () => isCapableDevice(minViewport) && hasWebGL(),
    minViewport
  );

/** Keep the heavier full-bleed parallax image layers for larger screens. */
export const useDeferredLayers = (): boolean =>
  useStagedFlag(
    0,
    () => isCapableDevice(MIN_LAYERS_VIEWPORT),
    MIN_LAYERS_VIEWPORT
  );
