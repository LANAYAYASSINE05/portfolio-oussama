"use client";

import { animate, motion } from "motion/react";
import { useEffect, useRef } from "react";
import { bio, identity, languages, stats } from "@/lib/content";

function Counter({ value, delay }: { value: number; delay: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const controls = animate(0, value, {
      duration: 1.4,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = String(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [value, delay]);
  return <span ref={ref}>0</span>;
}

export function AproposWindow() {
  return (
    <div className="grid gap-6 p-6 @xl:grid-cols-[11rem_1fr]">
      <motion.figure
        initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
        animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative aspect-[3/4] w-full max-w-44 overflow-hidden rounded-md border border-edge bg-desk"
      >
        {identity.portrait ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={identity.portrait} alt={identity.name} className="h-full w-full object-cover" />
        ) : (
          <div className="grid h-full place-items-center font-display text-6xl text-edge-2">OZ</div>
        )}
        <span className="absolute left-2 top-2 size-3 border-l border-t border-select" />
        <span className="absolute right-2 top-2 size-3 border-r border-t border-select" />
        <span className="absolute bottom-2 left-2 size-3 border-b border-l border-select" />
        <span className="absolute bottom-2 right-2 size-3 border-b border-r border-select" />
        <figcaption className="label absolute inset-x-0 bottom-3 text-center text-dim">Portrait — 3:4</figcaption>
      </motion.figure>

      <div className="space-y-6">
        <div className="space-y-3 text-[14px] leading-relaxed text-fg/90">
          {bio.map((p, i) => (
            <motion.p
              key={p}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.1 }}
            >
              {p}
            </motion.p>
          ))}
        </div>

        <div>
          <p className="label mb-2 text-dim">Langues</p>
          <div className="overflow-hidden rounded-md border border-edge text-[13px]">
            {languages.map((l) => (
              <div key={l.name} className="flex justify-between border-b border-edge px-3 py-2 last:border-b-0">
                <span>{l.name}</span>
                <span className="text-muted">{l.level}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-edge bg-edge @md:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} className="bg-panel p-3">
              <p className="font-mono text-3xl text-select">
                <Counter value={s.value} delay={0.3 + i * 0.1} />
                {s.suffix}
              </p>
              <p className="label mt-1 text-dim">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
