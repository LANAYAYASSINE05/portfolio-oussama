import type { ReactNode } from "react";
import { identity } from "@/lib/content";

export type Texture = "terre" | "bois" | "lin" | "pierre" | "olive";

export function Tag({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`matiere-tag inline-flex items-center gap-2 rounded-full border border-current/20 px-3.5 py-1.5 ${className}`}>
      {children}
    </span>
  );
}

export function Availability({ className = "" }: { className?: string }) {
  return (
    <span className={`matiere-tag inline-flex items-center gap-2.5 ${className}`}>
      <span className="relative flex size-2">
        <span className="absolute inset-0 animate-ping rounded-full bg-olive/70" />
        <span className="relative size-2 rounded-full bg-olive" />
      </span>
      {identity.availability}
    </span>
  );
}

export function Swatch({ texture, className = "" }: { texture: Texture; className?: string }) {
  return <span aria-hidden className={`texture-${texture} block ${className}`} />;
}

type TitleProps = {
  id?: string;
  tag: string;
  children: ReactNode;
  aside?: ReactNode;
  dark?: boolean;
};

export function SectionTitle({ tag, children, aside, dark }: TitleProps) {
  return (
    <header className="mb-14 grid grid-cols-12 items-end gap-x-[var(--gutter)] gap-y-6 md:mb-20">
      <div className="col-span-12 md:col-span-8">
        <Tag className={dark ? "text-on-night/70" : "text-graphite"}>
          <span className="size-1.5 rounded-full bg-terra" />
          {tag}
        </Tag>
        <h2 data-matiere-title className="mt-6 font-display text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.95]">
          {children}
        </h2>
      </div>
      {aside && <div className="col-span-12 md:col-span-4 md:text-right">{aside}</div>}
    </header>
  );
}
