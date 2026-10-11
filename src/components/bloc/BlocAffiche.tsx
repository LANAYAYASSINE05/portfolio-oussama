"use client";

import { motion } from "motion/react";
import { ArrowDown, Download, Move } from "lucide-react";
import { useRef } from "react";
import { useSite } from "@/components/providers/SiteProvider";
import { gsap, useGSAP } from "@/lib/gsap";
import { identity } from "@/lib/content";
import { Availability } from "./shared";

const stickers = [
  { text: `Diplômé ${identity.graduation}`, className: "bg-pop-pink rounded-full size-32 lg:size-36 grid place-items-center text-center -rotate-12", pos: "lg:right-[4%] lg:top-[46%]" },
  { text: "ENA Rabat", className: "bg-pop-blue rounded-xl px-5 py-3 rotate-6", pos: "lg:right-[20%] lg:top-[58%]" },
  { text: "Casablanca", className: "bg-pop-sun rounded-xl px-5 py-3 -rotate-3", pos: "lg:right-[7%] lg:top-[76%]" },
  { text: "2D · 3D · Rendus", className: "bg-pop-orange rounded-full px-5 py-3 rotate-3", pos: "lg:right-[24%] lg:top-[78%]" },
];

const ticker = ["Architecte diplômé", "Plans 2D", "Modélisation 3D", "Rendus", "Logements", "Villas & immeubles", "BIM"];

function Word({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={`inline-flex ${className}`} aria-hidden>
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          data-bloc-char
          className="inline-block"
          whileHover={{ y: -14, rotate: i % 2 === 0 ? -8 : 8 }}
          transition={{ type: "spring", stiffness: 500, damping: 12 }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

export function BlocAffiche() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const { introDone, scrollTo } = useSite();

  useGSAP(
    () => {
      gsap.set("[data-affiche-fade], [data-sticker]", { autoAlpha: 0 });
      if (!introDone) return;
      gsap
        .timeline({ defaults: { ease: "back.out(2)" } })
        .from("[data-bloc-char]", { yPercent: 120, rotate: () => gsap.utils.random(-30, 30), duration: 0.7, stagger: 0.035, clearProps: "transform" })
        .from("[data-affiche-block]", { scaleX: 0, transformOrigin: "left center", duration: 0.6, ease: "power4.out" }, 0.2)
        .to("[data-affiche-fade]", { autoAlpha: 1, duration: 0.4, stagger: 0.08 }, 0.6)
        .fromTo("[data-sticker]", { autoAlpha: 0, scale: 0 }, { autoAlpha: 1, scale: 1, duration: 0.6, stagger: 0.1, clearProps: "transform" }, 0.8);
    },
    { scope: root, dependencies: [introDone], revertOnUpdate: true },
  );

  return (
    <section id="accueil" data-room="accueil" ref={root} className="bloc-dots relative overflow-hidden pt-[calc(var(--header-h)+2rem)]">
      <div ref={stage} className="relative px-[var(--gutter)] pb-14 md:min-h-[calc(100svh-var(--header-h)-6rem)]">
        <div data-affiche-fade className="flex flex-wrap items-center gap-3">
          <span className="rounded-full border-[3px] border-ink bg-pop-lime px-4 py-2 text-sm font-black uppercase tracking-wider text-night">{identity.role}</span>
          <Availability />
        </div>

        <h1 className="relative z-10 mt-8 font-display uppercase leading-[0.86]">
          <span className="sr-only">{identity.name}</span>
          <Word text={identity.firstName} className="text-[clamp(2.75rem,11vw,11rem)]" />
          <br />
          <span data-affiche-block className="mt-3 inline-block -rotate-2 rounded-2xl border-[4px] border-ink bg-pop-lime px-4 text-night shadow-[10px_10px_0_0_var(--ink)]">
            <Word text={identity.lastName} className="text-[clamp(2.75rem,11vw,11rem)]" />
          </span>
        </h1>

        <p data-affiche-fade className="relative z-10 mt-10 max-w-xl text-lg font-medium leading-snug text-ink/85">
          Plans, modélisation 3D et rendus pour des logements contemporains. Diplômé en {identity.graduation}, je cherche une agence où construire pour de vrai.
        </p>

        <div data-affiche-fade className="relative z-10 mt-8 flex flex-wrap gap-4">
          <a href={identity.cv} download className="bloc-box bloc-press flex items-center gap-3 bg-pop-lime px-6 py-4 font-black uppercase text-night" data-cursor="">
            <Download aria-hidden strokeWidth={2.5} className="size-5" />
            Mon CV
          </a>
          <button type="button" onClick={() => scrollTo("#projets")} className="bloc-box bloc-press flex items-center gap-3 bg-paper px-6 py-4 font-black uppercase" data-cursor="">
            Les projets
            <ArrowDown aria-hidden strokeWidth={2.5} className="size-5" />
          </button>
        </div>

        <div className="relative mt-12 flex flex-wrap items-center gap-4 lg:static lg:mt-0">
          {stickers.map((s) => (
            <motion.div
              key={s.text}
              data-sticker
              drag
              dragConstraints={stage}
              dragElastic={0.15}
              whileDrag={{ scale: 1.12, zIndex: 30 }}
              whileHover={{ scale: 1.05 }}
              className={`cursor-grab touch-none select-none border-[3px] border-ink font-black uppercase text-night shadow-[5px_5px_0_0_var(--ink)] active:cursor-grabbing lg:absolute lg:z-20 ${s.className} ${s.pos}`}
              data-cursor="Glisser"
            >
              {s.text}
            </motion.div>
          ))}
          <p data-affiche-fade className="flex w-full items-center gap-2 text-sm text-graphite lg:absolute lg:bottom-6 lg:right-[var(--gutter)] lg:w-auto">
            <Move aria-hidden className="size-4" /> Les stickers se déplacent
          </p>
        </div>
      </div>

      <div className="relative -mx-4 -rotate-1 border-y-[3px] border-ink bg-pop-sun py-4 text-night">
        <div className="bloc-marquee flex w-max">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
              {ticker.map((t) => (
                <li key={t} className="flex items-center font-display text-2xl uppercase md:text-3xl">
                  {t}
                  <span className="mx-6 text-3xl">✦</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
