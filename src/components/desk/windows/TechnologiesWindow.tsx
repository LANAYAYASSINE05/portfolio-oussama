"use client";

import { LayoutGroup, motion } from "motion/react";
import { useState } from "react";
import { techCategories, technologies, type TechCategory } from "@/lib/content";

const categoryColor: Record<TechCategory, string> = {
  "Conception & BIM": "var(--color-l-cyan)",
  "Modélisation 3D": "var(--color-l-green)",
  Rendu: "var(--color-l-yellow)",
  Graphisme: "var(--color-l-magenta)",
};

type Sort = "level" | "name";

export function TechnologiesWindow() {
  const [filter, setFilter] = useState<TechCategory | "Tous">("Tous");
  const [sort, setSort] = useState<Sort>("level");

  const rows = technologies
    .filter((t) => filter === "Tous" || t.category === filter)
    .sort((a, b) => (sort === "level" ? b.level - a.level : a.name.localeCompare(b.name)));

  return (
    <div className="flex min-h-full flex-col">
      <LayoutGroup id="tech-filter">
        <div className="flex flex-wrap gap-1 border-b border-edge p-2">
          {(["Tous", ...techCategories] as const).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              className={`relative rounded px-2.5 py-1 text-[12px] transition-colors ${
                filter === c ? "text-fg" : "text-muted hover:text-fg"
              }`}
            >
              {filter === c && (
                <motion.span
                  layoutId="tech-filter-pill"
                  className="absolute inset-0 rounded border border-edge-2 bg-panel-2"
                  transition={{ type: "spring", stiffness: 500, damping: 38 }}
                />
              )}
              <span className="relative flex items-center gap-1.5">
                {c !== "Tous" && <span className="size-2 rounded-[2px]" style={{ background: categoryColor[c] }} />}
                {c}
              </span>
            </button>
          ))}
        </div>
      </LayoutGroup>

      <div className="label grid grid-cols-[2.75rem_1fr_6rem] gap-3 border-b border-edge px-3 py-2 text-dim @lg:grid-cols-[2.75rem_1fr_9rem_10rem]">
        <span>Sym.</span>
        <SortButton active={sort === "name"} onClick={() => setSort("name")}>
          Nom
        </SortButton>
        <span className="hidden @lg:block">Catégorie</span>
        <SortButton active={sort === "level"} onClick={() => setSort("level")}>
          Niveau
        </SortButton>
      </div>

      <ul className="relative">
        {rows.map((t, i) => (
          <motion.li
            key={t.symbol}
            layout
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ layout: { type: "spring", stiffness: 420, damping: 38 }, delay: i * 0.025 }}
            className="grid grid-cols-[2.75rem_1fr_6rem] items-center gap-3 border-b border-edge/60 px-3 py-2 text-[13px] hover:bg-panel-2 @lg:grid-cols-[2.75rem_1fr_9rem_10rem]"
          >
            <span
              className="grid size-8 place-items-center rounded border font-mono text-[12px]"
              style={{ borderColor: categoryColor[t.category], color: categoryColor[t.category] }}
            >
              {t.symbol}
            </span>
            <span className="truncate">{t.name}</span>
            <span className="hidden truncate text-[12px] text-muted @lg:block">{t.category}</span>
            <span className="flex items-center gap-2">
              <span className="h-1 flex-1 overflow-hidden rounded-full bg-edge">
                <motion.span
                  className="block h-full origin-left rounded-full"
                  style={{ background: categoryColor[t.category] }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: t.level / 100 }}
                  transition={{ duration: 0.9, delay: 0.1 + i * 0.03, ease: [0.16, 1, 0.3, 1] }}
                />
              </span>
              <span className="w-7 text-right font-mono text-[11px] text-muted">{t.level}</span>
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

function SortButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick} className={`text-left transition-colors ${active ? "text-select" : "hover:text-fg"}`}>
      {children} {active && "↓"}
    </button>
  );
}
