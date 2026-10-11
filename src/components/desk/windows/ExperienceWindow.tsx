"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { experience } from "@/lib/content";

const FLOOR_H = 64;
const BASE = 300;

export function ExperienceWindow() {
  const [active, setActive] = useState(0);
  const floors = [...experience].reverse();
  const job = experience[active];
  const roofY = BASE - floors.length * FLOOR_H;

  return (
    <div className="grid min-h-full @xl:grid-cols-[15rem_1fr]">
      <div className="border-b border-edge p-4 @xl:border-b-0 @xl:border-r">
        <svg viewBox="0 0 240 340" className="mx-auto h-64 w-full @xl:h-full" aria-label="Élévation — un niveau par expérience">
          <line x1="0" y1={BASE} x2="240" y2={BASE} stroke="var(--color-edge-2)" />
          {Array.from({ length: 12 }).map((_, i) => (
            <line key={i} x1={i * 20} y1={BASE + 4} x2={i * 20 + 12} y2={BASE + 16} stroke="var(--color-edge)" />
          ))}
          <motion.path
            d={`M40 ${roofY} L120 ${roofY - 34} L200 ${roofY}`}
            fill="none"
            stroke="var(--color-l-orange)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.2 + floors.length * 0.15 }}
          />
          {floors.map((f, i) => {
            const index = experience.indexOf(f);
            const isActive = index === active;
            const y = BASE - (i + 1) * FLOOR_H;
            return (
              <motion.g
                key={f.floor}
                role="button"
                tabIndex={0}
                aria-label={`${f.floor} — ${f.role}`}
                aria-pressed={isActive}
                onClick={() => setActive(index)}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setActive(index)}
                className="cursor-pointer outline-none"
                initial={{ opacity: 0, y: -24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.15, type: "spring", stiffness: 260, damping: 22 }}
              >
                <rect
                  x="50"
                  y={y}
                  width="140"
                  height={FLOOR_H}
                  stroke={isActive ? "var(--color-l-orange)" : "var(--color-edge-2)"}
                  fill={isActive ? "color-mix(in oklab, var(--color-l-orange) 18%, transparent)" : "transparent"}
                  className="transition-[fill,stroke] duration-300 hover:fill-white/5"
                />
                {[0, 1, 2].map((w) => (
                  <rect
                    key={w}
                    x={66 + w * 40}
                    y={y + 16}
                    width="26"
                    height="32"
                    fill="none"
                    stroke={isActive ? "var(--color-l-orange)" : "var(--color-edge-2)"}
                    pointerEvents="none"
                  />
                ))}
                <text
                  x="200"
                  y={y + FLOOR_H / 2 + 4}
                  className="font-mono text-[11px]"
                  fill={isActive ? "var(--color-l-orange)" : "var(--color-muted)"}
                  pointerEvents="none"
                >
                  {f.floor}
                </text>
              </motion.g>
            );
          })}
        </svg>
        <p className="label mt-2 text-center text-dim">Cliquez un niveau</p>
      </div>

      <div className="relative p-6">
        <AnimatePresence mode="wait">
          <motion.article
            key={job.floor}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <p className="font-mono text-5xl text-l-orange">{job.floor}</p>
            <p className="label mt-4 text-dim">
              {job.period} · {job.location}
            </p>
            <h3 className="mt-2 font-display text-4xl leading-none">{job.role}</h3>
            <p className="mt-1 text-[14px] text-muted">{job.company}</p>
            <p className="mt-5 max-w-md text-[14px] leading-relaxed text-fg/85">{job.text}</p>
            <ul className="mt-5 flex flex-wrap gap-1.5">
              {job.missions.map((m) => (
                <li key={m} className="label rounded border border-edge-2 px-2 py-1 text-muted">
                  {m}
                </li>
              ))}
            </ul>
          </motion.article>
        </AnimatePresence>

        <div className="mt-8 flex gap-1.5">
          {experience.map((e, i) => (
            <button
              key={e.floor}
              type="button"
              onClick={() => setActive(i)}
              className={`label rounded px-2 py-1 transition-colors ${
                i === active ? "bg-l-orange/15 text-l-orange" : "text-dim hover:text-fg"
              }`}
            >
              {e.floor}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
