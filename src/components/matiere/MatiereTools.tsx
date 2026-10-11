"use client";

import { motion } from "motion/react";
import { TechLogo } from "@/components/ui/Logos";
import { techCategories, technologies, type TechCategory } from "@/lib/content";
import { SectionTitle, Swatch, type Texture } from "./shared";

const categoryTexture: Record<TechCategory, Texture> = {
  "Conception & BIM": "pierre",
  "Modélisation 3D": "bois",
  Rendu: "terre",
  Graphisme: "olive",
};

const shapes = [
  "rounded-[58%_42%_55%_45%/46%_56%_44%_54%]",
  "rounded-[44%_56%_40%_60%/58%_42%_58%_42%]",
  "rounded-[52%_48%_62%_38%/40%_60%_46%_54%]",
  "rounded-[47%_53%_45%_55%/55%_45%_52%_48%]",
];

function Leaves({ level }: { level: number }) {
  const filled = Math.round(level / 20);
  return (
    <span className="flex gap-1" aria-label={`Niveau ${filled} sur 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={`h-2.5 w-1.5 rounded-[50%_50%_50%_50%/70%_70%_30%_30%] ${i < filled ? "bg-olive" : "bg-ink/12"}`}
        />
      ))}
    </span>
  );
}

export function MatiereTools() {
  return (
    <section id="technologies" className="px-[var(--gutter)] py-[16vh]">
      <SectionTitle
        tag="Technologies"
        aside={<p className="ml-auto max-w-xs text-graphite">{technologies.length} logiciels cultivés au fil de six années de formation et de projets.</p>}
      >
        Mon herbier <span className="italic text-terra">d&apos;outils.</span>
      </SectionTitle>

      <div className="grid gap-5 md:grid-cols-2">
        {techCategories.map((c) => (
          <div key={c} data-reveal className="rounded-[2.5rem] bg-paper-2 p-6 md:p-8">
            <div className="mb-8 flex items-center gap-4">
              <Swatch texture={categoryTexture[c]} className="pebble size-12" />
              <h3 className="font-display text-3xl">{c}</h3>
            </div>
            <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {technologies
                .filter((t) => t.category === c)
                .map((t, i) => (
                  <motion.li
                    key={t.symbol}
                    whileHover={{ y: -6, rotate: i % 2 ? 3 : -3 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="flex flex-col items-center gap-3 rounded-3xl bg-paper p-4 text-center"
                  >
                    <span className={`grid size-16 place-items-center bg-paper-2 ${shapes[i % shapes.length]}`}>
                      <TechLogo name={t.name} className="size-9" />
                    </span>
                    <span className="text-sm font-medium leading-tight">{t.name}</span>
                    <Leaves level={t.level} />
                  </motion.li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
