import type { ReactNode } from "react";
import { identity } from "@/lib/content";

/** Flashing amber rotating beacon. */
export function Beacon({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden className={`relative inline-flex flex-col items-center ${className}`}>
      <span className="chantier-beacon block size-3.5 rounded-t-full bg-[#ffb300]" />
      <span className="block h-1.5 w-5 rounded-[1px] bg-[#2b2f33]" />
    </span>
  );
}

/** Yellow/black barrier tape scrolling a repeated message. */
export function BarrierTape({ text, className = "", reverse = false }: { text: string; className?: string; reverse?: boolean }) {
  const items = Array.from({ length: 8 }, (_, i) => i);
  return (
    <div aria-hidden className={`overflow-hidden bg-terra py-2 text-[#111] shadow-[0_10px_24px_rgb(0_0_0/0.55)] ${className}`}>
      <div className={`chantier-tape flex w-max ${reverse ? "[animation-direction:reverse]" : ""}`}>
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0">
            {items.map((i) => (
              <span key={i} className="flex shrink-0 items-center gap-5 pr-5 font-stencil text-lg uppercase tracking-[0.12em] md:text-xl">
                {text}
                <span className="hazard-fine block h-4 w-14 border-y border-[#111]" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Availability({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 border border-line bg-night/70 px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] backdrop-blur ${className}`}>
      <span className="relative flex size-2.5">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#34d27b]" />
        <span className="relative size-2.5 rounded-full bg-[#34d27b]" />
      </span>
      {identity.availability}
    </span>
  );
}

/** Seven-segment style LED readout, padded with dim zeros. */
export function Led({ value, digits = 2, className = "" }: { value: number | string; digits?: number; className?: string }) {
  const text = String(value).padStart(digits, "0");
  return (
    <span className={`relative inline-block rounded-[3px] bg-[#120a06] px-2.5 py-1 shadow-[inset_0_2px_8px_rgb(0_0_0/0.9)] ${className}`}>
      <span aria-hidden className="absolute inset-0 grid place-items-center px-2.5 py-1 font-mono tabular-nums text-[#ff7a2a]/[0.08]">
        {"8".repeat(text.length)}
      </span>
      <span className="led relative" data-led={text}>
        {text}
      </span>
    </span>
  );
}

type TitleProps = { lot: number; tag: string; title: ReactNode; sub?: string; aside?: ReactNode };

/** Section header: a stencilled "LOT" sign on hazard stripes, a massive condensed title and a site note. */
export function ChantierTitle({ lot, tag, title, sub, aside }: TitleProps) {
  return (
    <header className="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-16">
      <div className="max-w-5xl">
        <span data-ch-sign className="inline-flex items-stretch shadow-[0_8px_18px_rgb(0_0_0/0.5)]">
          <span className="hazard w-5" />
          <span className="flex items-center gap-3 bg-terra px-4 py-2 font-stencil text-lg uppercase tracking-[0.14em] text-[#111]">
            Lot {String(lot).padStart(2, "0")}
            <span className="h-4 w-px bg-[#111]/40" />
            {tag}
          </span>
          <span className="hazard w-5" />
        </span>
        <h2 data-ch-title className="mt-6 font-display text-[clamp(3rem,8vw,7.5rem)] uppercase leading-[0.86]">
          {title}
        </h2>
        {sub && (
          <p className="mt-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-graphite">
            <span className="block h-px w-10 bg-terra" />
            {sub}
          </p>
        )}
      </div>
      {aside}
    </header>
  );
}
