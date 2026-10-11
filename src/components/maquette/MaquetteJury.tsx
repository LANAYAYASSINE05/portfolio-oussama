"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import type { PointerEvent } from "react";
import { certifications, education, identity } from "@/lib/content";
import { IsoHouse } from "./IsoModel";
import { MaquetteTitle, Pin } from "./shared";

const samples = ["balsa", "kraft", "calque"] as const;

export function MaquetteJury() {
  const [diploma, ...others] = education;
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-7, 7]), { stiffness: 140, damping: 20 });
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [5, -5]), { stiffness: 140, damping: 20 });

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section id="formation" data-room="formation" className="bg-night px-[var(--gutter)] py-[14vh]">
      <MaquetteTitle plate={6} tag="Formation" title="Présenté devant le jury." note="planche finale, validée" />

      <div className="grid items-start gap-14 lg:grid-cols-[1.4fr_1fr]">
        <div
          onPointerMove={onMove}
          onPointerLeave={() => {
            px.set(0);
            py.set(0);
          }}
          data-reveal
          className="relative pb-24 [perspective:1400px]"
        >
          <span aria-hidden className="balsa absolute bottom-0 left-[18%] h-[92%] w-3 origin-bottom rotate-[8deg] rounded-sm" />
          <span aria-hidden className="balsa absolute bottom-0 right-[18%] h-[92%] w-3 origin-bottom -rotate-[8deg] rounded-sm" />
          <span aria-hidden className="balsa absolute bottom-[14%] left-[12%] right-[12%] h-3 rounded-sm" />

          <motion.article style={{ rotateX, rotateY }} className="foam relative rounded-[2px] p-6 md:p-10">
            <span aria-hidden className="tape absolute -left-4 -top-2 h-7 w-20 -rotate-[30deg]" />
            <span aria-hidden className="tape absolute -right-4 -top-2 h-7 w-20 rotate-[30deg]" />

            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1b1a17]/20 pb-4 font-mono text-[0.65rem] font-bold uppercase tracking-[0.22em] text-[#6d665a]">
              <span>Projet de fin d&apos;études</span>
              <span>Jury · {diploma.location} · {identity.graduation}</span>
            </div>

            <div className="mt-6 grid items-center gap-6 md:grid-cols-[1.2fr_1fr]">
              <div>
                <p className="font-mono text-sm text-[#6d665a]">{diploma.year}</p>
                <h3 className="mt-2 font-display text-[clamp(2.5rem,5vw,4.5rem)] uppercase leading-[0.9]">{diploma.title}</h3>
                <p className="mt-3 text-lg font-semibold">{identity.school}</p>
                <p className="mt-4 leading-relaxed text-[#3d3a33]">{diploma.detail}</p>
              </div>
              <div className="rounded-[2px] bg-[#1d2420] p-3">
                <IsoHouse className="w-full" />
              </div>
            </div>

            <motion.div
              initial={{ scale: 2.2, opacity: 0, rotate: -30 }}
              whileInView={{ scale: 1, opacity: 1, rotate: -12 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.3 }}
              className="absolute bottom-4 right-4 grid size-28 place-items-center rounded-full border-[4px] border-double border-terra bg-[#efe9dc]/90 text-center text-terra shadow-[0_0_0_4px_rgb(239_233_220/0.9)] md:bottom-6 md:right-8 md:size-36"
            >
              <span className="font-display text-lg uppercase leading-none md:text-xl">
                Diplômé
                <span className="block text-4xl md:text-5xl">{identity.graduation}</span>
                <span className="block font-mono text-[0.6rem] tracking-[0.2em]">ENA Rabat</span>
              </span>
            </motion.div>
          </motion.article>
        </div>

        <div className="space-y-10">
          {others.map((e) => (
            <article key={e.title} data-reveal className="calque relative rotate-1 rounded-sm p-6">
              <Pin className="-top-1.5 left-6" />
              <p className="font-mono text-xs text-graphite">{e.year}</p>
              <h3 className="mt-1 font-display text-3xl uppercase">{e.title}</h3>
              <p className="mt-1 text-terra">
                {e.school} · {e.location}
              </p>
              <p className="mt-3 text-ink/80">{e.detail}</p>
            </article>
          ))}

          <div data-reveal>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-graphite">Échantillons de spécialités</p>
            <ul className="mt-4 grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {certifications.map((c, i) => (
                <li
                  key={c}
                  className={`${samples[i % samples.length]} relative flex aspect-[4/3] flex-col justify-between rounded-[2px] p-4 shadow-[0_12px_22px_rgb(0_0_0/0.5)] transition-transform duration-300 hover:-translate-y-1 hover:rotate-1 lg:aspect-auto lg:min-h-28 xl:aspect-[4/3] ${
                    samples[i % samples.length] === "calque" ? "text-ink" : ""
                  }`}
                >
                  <span className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.2em] opacity-70">Éch. {String(i + 1).padStart(2, "0")}</span>
                  <span className="font-display text-xl uppercase leading-tight">{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
