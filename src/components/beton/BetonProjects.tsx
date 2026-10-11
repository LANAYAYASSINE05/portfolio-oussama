"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ProjectImage } from "@/components/studio/StudioVisual";
import { projects } from "@/lib/content";
import { SectionBar } from "./shared";

const columns = ["N°", "Projet", "Lieu", "Type", "Surface", "Année"];

export function BetonProjects() {
  const [active, setActive] = useState(0);
  const project = projects[active];

  return (
    <section id="projets" className="mt-[14vh]">
      <SectionBar index="02" label="Projets" title="Index des projets" meta={`${projects.length} fiches`} />

      <div className="grid border-b-2 border-ink lg:grid-cols-12">
        <div className="lg:col-span-7 lg:border-r-2 lg:border-ink">
          <div className="beton-mono hidden grid-cols-[3rem_1.6fr_1fr_1fr_5rem_3.5rem] gap-4 border-b-2 border-ink px-[var(--gutter)] py-2.5 text-graphite md:grid">
            {columns.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </div>
          <ul>
            {projects.map((p, i) => {
              const on = i === active;
              return (
                <li key={p.id} data-reveal className="border-b border-ink/30 last:border-b-0">
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-pressed={on}
                    className={`grid w-full grid-cols-[3rem_1fr_auto] items-baseline gap-4 px-[var(--gutter)] py-5 text-left transition-colors duration-200 md:grid-cols-[3rem_1.6fr_1fr_1fr_5rem_3.5rem] ${on ? "bg-ink text-paper" : "hover:bg-paper-2"}`}
                    data-cursor=""
                  >
                    <span className={`beton-mono ${on ? "text-terra" : "text-graphite"}`}>{p.index}</span>
                    <span>
                      <span className="block text-xl font-bold uppercase tracking-tight md:text-2xl">{p.title}</span>
                      <span className={`mt-1 block text-sm ${on ? "text-paper/70" : "text-graphite"}`}>{p.subtitle}</span>
                    </span>
                    <span className="beton-mono md:hidden">{p.year}</span>
                    <span className="beton-mono hidden md:block">{p.location}</span>
                    <span className="beton-mono hidden md:block">{p.type}</span>
                    <span className="beton-mono hidden tabular-nums md:block">{p.surface}</span>
                    <span className="beton-mono hidden tabular-nums md:block">{p.year}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <aside className="border-t-2 border-ink lg:col-span-5 lg:border-t-0">
          <div className="lg:sticky lg:top-[var(--header-h)]">
            <div className="relative aspect-[16/9] overflow-hidden bg-ink lg:aspect-[4/3]">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.div
                  key={project.id}
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  animate={{ clipPath: "inset(0 0% 0 0)" }}
                  exit={{ opacity: 0.4 }}
                  transition={{ duration: 0.6, ease: [0.77, 0, 0.18, 1] }}
                  className="absolute inset-0 contrast-125 grayscale"
                >
                  <ProjectImage project={project} sizes="(min-width: 1024px) 40vw, 100vw" />
                </motion.div>
              </AnimatePresence>
              <span className="beton-mono absolute left-0 top-0 bg-terra px-3 py-2 text-ink">Fig. {project.index}</span>
            </div>
            <dl className="grid grid-cols-2 border-t-2 border-ink">
              {[
                ["Programme", project.type],
                ["Surface", project.surface],
                ["Matériaux", project.material],
                ["Lieu", `${project.location}, ${project.year}`],
              ].map(([k, v], i) => (
                <div key={k} className={`p-[var(--gutter)] ${i % 2 === 0 ? "border-r-2 border-ink" : ""} ${i < 2 ? "border-b-2 border-ink" : ""}`}>
                  <dt className="beton-mono text-graphite">{k}</dt>
                  <dd className="mt-2 font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="beton-mono flex items-center justify-between border-t-2 border-ink px-[var(--gutter)] py-3">
              <span>{project.title}</span>
              <span className="text-graphite">
                {String(active + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
              </span>
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
