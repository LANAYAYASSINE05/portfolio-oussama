"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { expertise } from "@/lib/content";

const ease = [0.16, 1, 0.3, 1] as const;

export function Expertise() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section id="expertise" className="relative px-[var(--gutter)] py-[16vh]">
      <div className="mb-16 grid grid-cols-4 gap-[var(--gutter)] md:grid-cols-12">
        <p className="label col-span-4 text-graphite md:col-span-3">( 07 ) Domaines</p>
        <motion.h2
          className="col-span-4 font-display text-[clamp(3rem,7vw,7rem)] leading-[0.92] md:col-span-9"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.2, ease }}
        >
          Du grand territoire <span className="italic text-terra">au détail</span> de la poignée.
        </motion.h2>
      </div>

      <motion.ul
        className="border-t border-ink"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10%" }}
        variants={{ show: { transition: { staggerChildren: 0.08 } } }}
      >
        {expertise.map((item, i) => {
          const isOpen = active === i;
          return (
            <motion.li
              key={item.index}
              layout
              className="relative overflow-hidden border-b border-ink"
              variants={{
                hidden: { opacity: 0, y: 40 },
                show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
              }}
            >
              <motion.button
                type="button"
                layout="position"
                onClick={() => setActive(isOpen ? null : i)}
                onPointerEnter={() => setActive(i)}
                className="group relative z-10 grid w-full grid-cols-[3rem_1fr_auto] items-center gap-4 py-6 text-left md:grid-cols-[6rem_1fr_auto] md:py-8"
                aria-expanded={isOpen}
                data-cursor=""
              >
                <span className="label text-graphite">{item.index}</span>
                <motion.span
                  className={`font-display text-3xl leading-none transition-colors duration-500 md:text-6xl ${
                    isOpen ? "text-terra" : "text-ink"
                  }`}
                  animate={{ x: isOpen ? 24 : 0 }}
                  transition={{ duration: 0.6, ease }}
                >
                  {item.title}
                </motion.span>
                <motion.span
                  className="grid size-10 place-items-center rounded-full border border-ink text-lg md:size-14"
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.6, ease }}
                >
                  +
                </motion.span>
              </motion.button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.7, ease }}
                    className="relative z-10"
                  >
                    <div className="grid grid-cols-[3rem_1fr] gap-4 pb-8 md:grid-cols-[6rem_1fr_1fr]">
                      <span />
                      <p className="max-w-xl text-lg leading-snug text-graphite md:pl-6">{item.text}</p>
                      <div className="col-start-2 flex flex-wrap items-start gap-2 md:col-start-3 md:justify-end">
                        {item.tags.map((tag, t) => (
                          <motion.span
                            key={tag}
                            className="label rounded-full border border-ink/30 px-3 py-1.5"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 + t * 0.06, duration: 0.5, ease }}
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                aria-hidden
                className="absolute inset-0 origin-bottom bg-paper-2"
                initial={false}
                animate={{ scaleY: isOpen ? 1 : 0 }}
                transition={{ duration: 0.7, ease }}
              />
            </motion.li>
          );
        })}
      </motion.ul>
    </section>
  );
}
