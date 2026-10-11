import type { ReactNode } from "react";

export function SceneHeading({
  scene,
  title,
  kicker,
  className = "",
}: {
  scene: string;
  title: ReactNode;
  kicker?: string;
  className?: string;
}) {
  return (
    <header className={`flex flex-col gap-4 ${className}`}>
      <p className="credits flex items-center gap-4 text-terra">
        <span>Scène {scene}</span>
        <span className="h-px w-12 bg-current opacity-50" />
        {kicker && <span className="text-graphite">{kicker}</span>}
      </p>
      <h2 data-focus className="font-display text-[clamp(3rem,8vw,8.5rem)] leading-[0.9]">
        {title}
      </h2>
    </header>
  );
}

export function Letterbox({ size = "7vh" }: { size?: string }) {
  return (
    <>
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-20 bg-black" style={{ height: size }} />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-black" style={{ height: size }} />
    </>
  );
}
