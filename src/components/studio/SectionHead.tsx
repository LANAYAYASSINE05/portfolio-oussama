import type { ReactNode } from "react";

type Props = { index: string; label: string; title: ReactNode; aside?: ReactNode; dark?: boolean };

export function SectionHead({ index, label, title, aside, dark = false }: Props) {
  return (
    <header
      className={`mb-16 grid grid-cols-12 gap-x-[var(--gutter)] gap-y-6 border-t pt-5 md:mb-24 ${
        dark ? "border-on-night/15" : "border-line"
      }`}
    >
      <span className={`studio-caps col-span-3 md:col-span-2 ${dark ? "text-on-night/50" : "text-graphite"}`}>({index})</span>
      <span className={`studio-caps col-span-9 md:col-span-3 ${dark ? "text-on-night/50" : "text-graphite"}`}>{label}</span>
      <h2 data-studio-title className="col-span-12 font-display text-[clamp(2.75rem,6vw,6rem)] leading-[0.92] md:col-span-5">
        {title}
      </h2>
      {aside && <div className="col-span-12 self-end md:col-span-2 md:text-right">{aside}</div>}
    </header>
  );
}
