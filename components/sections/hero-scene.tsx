"use client";
import { Suspense, useRef, type FC } from "react";
import { Canvas, useFrame, type RootState } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { easing } from "maath";
import { Astronaut } from "@/components/portfolio/astronaut";
import { Loader } from "@/components/portfolio/loader";
import { useSceneActive } from "@/hooks/use-scene-active";

const Rig: FC = () => {
  useFrame((state: RootState, delta: number) => easing.damp3(state.camera.position, [state.mouse.x / 15, 1 + state.mouse.y / 15, 4], 0.5, delta));
  return null;
};

export const HeroScene: FC = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  const frame = useRef<HTMLElement>(null);
  const active = useSceneActive({ whenVisible: frame });
  return (
    <figure ref={frame} aria-hidden="true" className={isMobile ? "pointer-events-none absolute bottom-[-1%] right-0 z-[1] h-[48svh] w-full max-w-none overflow-visible" : "pointer-events-none absolute inset-0 z-[2] overflow-hidden"}>
      <Canvas camera={{ position: [0, isMobile ? -0.35 : 1, 4], fov: isMobile ? 46 : 50 }} dpr={isMobile ? [1.5, 1.85] : [1, 1.5]} frameloop={active ? "always" : "never"} gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}>
        <ambientLight intensity={1.1} />
        <directionalLight position={[3, 4, 5]} intensity={1.6} />
        <Suspense fallback={<Loader />}>
          <Float rotationIntensity={0.3} floatIntensity={0.5} speed={0.5}>
            <Astronaut scale={isMobile ? 0.27 : 0.245} position={isMobile ? [0, -0.52, 0] : [2.05, -0.58, 0]} rotation={[-Math.PI / 2, -0.2, 2.2]} />
          </Float>
          <Rig />
        </Suspense>
      </Canvas>
    </figure>
  );
};
