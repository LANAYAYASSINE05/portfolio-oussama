"use client";

import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useState } from "react";
import { experience } from "@/lib/content";
import { BentoSection, Tile, TileLabel } from "./Tile";

export function ExperienceGrid() {
  const [active, setActive] = useState(0);

  return (
    <BentoSection id="experience" index="04 — Expérience" title={<>Parcours<span className="text-terra">.</span></>}>
      <LayoutGroup>
        {experience.map((job, i) => {
          const isActive = active === i;
          return (
            <Tile
              key={job.company}
              layout
              lift={!isActive}
              tone={isActive ? "dark" : "light"}
              onClick={() => setActive(i)}
              data-cursor={isActive ? undefined : "Ouvrir"}
              aria-expanded={isActive}
              className={`col-span-2 flex min-h-[14rem] cursor-pointer lg:min-h-[24rem] flex-col justify-between gap-8 md:col-span-6 ${
                isActive ? "lg:col-span-6" : "lg:col-span-3"
              }`}
              transition={{ layout: { type: "spring", stiffness: 260, damping: 30 } }}
            >
              <motion.div layout="position" className="flex items-start justify-between gap-4">
                <TileLabel>{job.period}</TileLabel>
                <span className={`font-display text-5xl leading-none ${isActive ? "text-terra" : ""}`}>{job.floor}</span>
              </motion.div>

              <motion.div layout="position">
                <p className="label opacity-60">
                  {job.company} · {job.location}
                </p>
                <h3 className="mt-2 font-display text-4xl leading-[0.95] md:text-5xl">{job.role}</h3>
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      key="details"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.5 } }}
                      exit={{ opacity: 0, transition: { duration: 0.15 } }}
                    >
                      <p className="mt-5 max-w-lg leading-relaxed text-on-night/75">{job.text}</p>
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {job.missions.map((m) => (
                          <li key={m} className="label rounded-full bg-on-night/10 px-3 py-1.5">
                            {m}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
                {!isActive && <p className="label mt-6 text-terra">Ouvrir +</p>}
              </motion.div>
            </Tile>
          );
        })}
      </LayoutGroup>
    </BentoSection>
  );
}
