import type { ReactNode } from "react";
import { identity } from "@/lib/content";

export function Availability({ className = "", dot = "bg-terra" }: { className?: string; dot?: string }) {
  return (
    <span className={`beton-mono inline-flex items-center gap-2.5 ${className}`}>
      <span className="relative flex size-2.5">
        <span className={`absolute inset-0 animate-ping opacity-70 ${dot}`} />
        <span className={`relative size-2.5 ${dot}`} />
      </span>
      {identity.availability}
    </span>
  );
}

type BarProps = {
  index: string;
  label: string;
  title: ReactNode;
  meta?: ReactNode;
  dark?: boolean;
};

export function SectionBar({ index, label, title, meta, dark }: BarProps) {
  const border = dark ? "border-on-night" : "border-ink";
  return (
    <header className={`border-b-2 ${border}`}>
      <div className={`beton-mono flex items-center justify-between gap-4 border-b-2 ${border} px-[var(--gutter)] py-2.5`}>
        <span className="flex items-center gap-4">
          <span className="bg-terra px-1.5 py-0.5 text-ink">§{index}</span>
          {label}
        </span>
        {meta && <span className="opacity-70">{meta}</span>}
      </div>
      <h2
        data-beton-title
        className="px-[var(--gutter)] pb-4 pt-6 font-display text-[clamp(2.25rem,8vw,9.5rem)] leading-[0.86]"
      >
        {title}
      </h2>
    </header>
  );
}

export function Cell({ label, children, className = "" }: { label: string; children: ReactNode; className?: string }) {
  return (
    <div className={`flex flex-col justify-between gap-6 p-[var(--gutter)] ${className}`}>
      <span className="beton-mono text-graphite">{label}</span>
      <div>{children}</div>
    </div>
  );
}

export function Blocks({ value, total = 10, className = "" }: { value: number; total?: number; className?: string }) {
  const filled = Math.round((value / 100) * total);
  return (
    <span aria-hidden className={`flex gap-[3px] ${className}`}>
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          data-block={i < filled ? "on" : "off"}
          className={`h-3 flex-1 border border-ink ${i < filled ? "bg-ink" : ""}`}
        />
      ))}
    </span>
  );
}
