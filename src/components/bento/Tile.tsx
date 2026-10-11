"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";

export type TileTone = "light" | "dark" | "accent" | "ghost";

const tones: Record<TileTone, string> = {
  light: "bg-paper-2 text-ink",
  dark: "bg-night text-on-night",
  accent: "bg-terra text-[#111]",
  ghost: "border border-line text-ink",
};

type TileProps = HTMLMotionProps<"div"> & {
  tone?: TileTone;
  lift?: boolean;
  children?: ReactNode;
};

export function Tile({ tone = "light", lift = true, className = "", children, onPointerMove, ...rest }: TileProps) {
  return (
    <motion.div
      data-bento-tile
      whileHover={lift ? { y: -4 } : undefined}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
        onPointerMove?.(e);
      }}
      className={`group/tile relative isolate overflow-hidden rounded-[var(--radius-tile,1.75rem)] p-5 md:p-6 ${tones[tone]} ${className}`}
      {...rest}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover/tile:opacity-100"
        style={{
          background:
            tone === "accent"
              ? "radial-gradient(320px circle at var(--mx) var(--my), rgb(255 255 255 / 0.28), transparent 70%)"
              : "radial-gradient(320px circle at var(--mx) var(--my), color-mix(in oklab, var(--accent) 16%, transparent), transparent 70%)",
        }}
      />
      {children}
    </motion.div>
  );
}

export function TileLabel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`label flex items-center gap-2 opacity-60 ${className}`}>{children}</p>;
}

type SectionProps = {
  id: string;
  index: string;
  title: ReactNode;
  children: ReactNode;
  className?: string;
};

export function BentoSection({ id, index, title, children, className = "" }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-[var(--header-h)] px-[var(--gutter)] pt-20 first:pt-[calc(var(--header-h)+0.5rem)]">
      <div className="mb-3 flex items-end justify-between gap-6 px-1">
        <h2 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.9]">{title}</h2>
        <span className="label pb-2 text-graphite">{index}</span>
      </div>
      <div className={`grid grid-flow-dense grid-cols-2 gap-3 md:grid-cols-6 lg:grid-cols-12 ${className}`}>{children}</div>
    </section>
  );
}
