import type { ReactNode } from "react";
import { identity } from "@/lib/content";

/** Pop colours cycled across cards; text on all of them is dark for contrast. */
export const POPS = ["bg-pop-lime", "bg-pop-pink", "bg-pop-blue", "bg-pop-sun", "bg-pop-orange"] as const;
export const pop = (i: number) => POPS[i % POPS.length];

export function Availability({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 rounded-full border-[3px] border-ink bg-paper px-4 py-2 text-sm font-bold ${className}`}>
      <span className="relative flex size-3">
        <span className="absolute inset-0 animate-ping rounded-full bg-pop-lime" />
        <span className="relative size-3 rounded-full border-2 border-ink bg-pop-lime" />
      </span>
      {identity.availability}
    </span>
  );
}

type TitleProps = { index: number; tag: string; color: string; title: ReactNode; aside?: ReactNode };

/** Section header: a tilted coloured tag with the index, the title, and an optional aside on the right. */
export function BlocTitle({ index, tag, color, title, aside }: TitleProps) {
  return (
    <header className="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-16">
      <div>
        <span data-bloc-tag className={`inline-flex -rotate-2 items-center gap-3 rounded-lg border-[3px] border-ink px-3 py-1.5 text-sm font-black uppercase tracking-wider text-night shadow-[4px_4px_0_0_var(--ink)] ${color}`}>
          <span className="font-mono">{String(index).padStart(2, "0")}</span>
          {tag}
        </span>
        <h2 data-bloc-title className="mt-6 max-w-4xl font-display text-[clamp(2.25rem,5.5vw,5rem)] uppercase leading-[1.05]">
          {title}
        </h2>
      </div>
      {aside}
    </header>
  );
}

/** A thick ink-bordered box with a hard offset shadow. */
export function Box({ children, className = "", as: Tag = "div" }: { children: ReactNode; className?: string; as?: "div" | "article" | "li" }) {
  return <Tag className={`bloc-box ${className}`}>{children}</Tag>;
}
