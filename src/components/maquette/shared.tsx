import type { ReactNode } from "react";
import { identity } from "@/lib/content";

export function Pin({ className = "" }: { className?: string }) {
  return <span aria-hidden className={`pin absolute block size-4 rounded-full ${className}`} />;
}

/** Strip of masking tape with a handwritten note. */
export function Tape({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`tape inline-block px-5 py-1.5 font-hand text-xl leading-none ${className}`}>{children}</span>;
}

export function Availability({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 rounded-full border border-line bg-night/70 px-4 py-2 text-sm font-medium backdrop-blur ${className}`}>
      <span className="relative flex size-2.5">
        <span className="absolute inset-0 animate-ping rounded-full bg-terra" />
        <span className="relative size-2.5 rounded-full bg-terra" />
      </span>
      {identity.availability}
    </span>
  );
}

/** Steel ruler graduated 0–`max`, with a major tick and number every 10. */
export function Ruler({ max = 100, className = "" }: { max?: number; className?: string }) {
  const majors = Array.from({ length: max / 10 + 1 }, (_, i) => i * 10);
  return (
    <div
      aria-hidden
      className={`relative h-9 rounded-sm bg-gradient-to-b from-[#c9ccc6] to-[#9da19a] text-[#1d211e] shadow-[0_2px_0_#6f736c,0_6px_12px_rgb(0_0_0/0.45)] ${className}`}
    >
      <div
        className="absolute inset-x-0 top-0 h-2.5"
        style={{ backgroundImage: "repeating-linear-gradient(90deg, #1d211e 0 1px, transparent 1px 100%)", backgroundSize: `${100 / max}% 100%` }}
      />
      {majors.map((m) => (
        <span
          key={m}
          className={`absolute top-0 flex flex-col ${m === 0 ? "items-start" : m === max ? "-translate-x-full items-end" : "-translate-x-1/2 items-center"}`}
          style={{ left: `${(m / max) * 100}%` }}
        >
          <span className="block h-4 w-px bg-[#1d211e]" />
          <span className="mt-0.5 font-mono text-[0.6rem] font-bold">{m}</span>
        </span>
      ))}
    </div>
  );
}

type TitleProps = { plate: number; tag: string; title: ReactNode; note?: string; aside?: ReactNode };

/** Section header: a kraft plate label, a condensed title and a handwritten note with a pencil arrow. */
export function MaquetteTitle({ plate, tag, title, note, aside }: TitleProps) {
  return (
    <header className="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-16">
      <div className="max-w-4xl">
        <span data-mq-plate className="kraft relative inline-flex items-center gap-3 rounded-sm px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.2em] shadow-[0_6px_14px_rgb(0_0_0/0.4)]">
          <span className="size-2.5 rounded-full bg-night/80 shadow-[inset_0_1px_2px_rgb(0_0_0/0.6)]" />
          Pl. {String(plate).padStart(2, "0")} — {tag}
        </span>
        <h2 data-mq-title className="mt-6 font-display text-[clamp(2.75rem,7vw,6.5rem)] uppercase leading-[0.92]">
          {title}
        </h2>
        {note && (
          <p data-mq-note className="mt-3 flex items-center gap-2 font-hand text-2xl text-terra md:text-3xl">
            <svg aria-hidden viewBox="0 0 60 30" className="h-6 w-12 shrink-0 fill-none stroke-current" strokeWidth="2" strokeLinecap="round">
              <path data-mq-arrow pathLength={1} d="M2 6 C 18 26, 38 26, 54 14 M54 14 l-9 -1 M54 14 l-3 8" />
            </svg>
            {note}
          </p>
        )}
      </div>
      {aside}
    </header>
  );
}
