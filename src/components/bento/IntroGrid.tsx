"use client";

import { animate, stagger, svg, utils } from "animejs";
import { useEffect, useRef, useState } from "react";
import { PlanDrawing, DRAWABLE } from "@/components/drawings/PlanDrawing";
import { useSite } from "@/components/providers/SiteProvider";
import { Magnetic } from "@/components/ui/Magnetic";
import { identity } from "@/lib/content";
import { Tile, TileLabel } from "./Tile";

function LiveClock() {
  const [time, setTime] = useState("--:--");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("fr-FR", { timeZone: "Africa/Casablanca", hour: "2-digit", minute: "2-digit" });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = setInterval(update, 10_000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{time}</span>;
}

function LivePlan() {
  const ref = useRef<SVGSVGElement>(null);
  const { introDone } = useSite();

  useEffect(() => {
    if (!introDone || !ref.current) return;
    const paths = svg.createDrawable(ref.current.querySelectorAll(DRAWABLE));
    utils.set(paths, { draw: "0 0" });
    const anim = animate(paths, {
      draw: ["0 0", "0 1", "1 1"],
      duration: 4200,
      delay: stagger(40),
      ease: "inOutQuad",
      loop: true,
      loopDelay: 600,
    });
    return () => {
      anim.revert();
    };
  }, [introDone]);

  return <PlanDrawing ref={ref} variant="villa" className="h-full w-full" />;
}

export function IntroGrid() {
  const { scrollTo } = useSite();

  return (
    <section id="accueil" className="px-[var(--gutter)] pb-3 pt-[calc(var(--header-h)+0.5rem)]">
      <div className="grid grid-flow-dense grid-cols-2 gap-3 md:grid-cols-6 lg:grid-cols-12">
        <Tile lift={false} className="col-span-2 flex min-h-[60svh] flex-col justify-between md:col-span-6 lg:col-span-8 lg:row-span-2">
          <TileLabel>
            <span className="size-1.5 rounded-full bg-terra" /> Portfolio — Édition 2026
          </TileLabel>
          <h1 className="font-display text-[clamp(4rem,12vw,12rem)] leading-[0.82]">
            <span data-bento-name className="block">
              {identity.firstName}
            </span>
            <span data-bento-name className="block">
              {identity.lastName}
              <span className="text-terra">.</span>
            </span>
          </h1>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <p className="max-w-md text-lg leading-snug text-graphite md:text-xl">{identity.headline}</p>
            <span className="label rounded-full bg-ink px-3 py-2 text-paper-2">{identity.title}</span>
          </div>
        </Tile>

        <Tile tone="dark" className="col-span-2 flex aspect-square flex-col md:col-span-3 md:aspect-auto lg:col-span-4 lg:row-span-2">
          <TileLabel>
            <span className="relative flex size-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-terra" />
              <span className="relative size-2 rounded-full bg-terra" />
            </span>
            Plan en cours — Villa
          </TileLabel>
          <div className="mt-4 min-h-0 flex-1 text-on-night/80">
            <LivePlan />
          </div>
          <p className="label mt-4 flex justify-between opacity-60">
            <span>Éch. 1/100</span>
            <span>AutoCAD → SketchUp → Lumion</span>
          </p>
        </Tile>

        <Tile className="col-span-2 flex flex-col justify-between gap-6 md:col-span-3 lg:col-span-3">
          <TileLabel>Statut</TileLabel>
          <p className="flex items-center gap-3 font-display text-2xl leading-tight">
            <span className="size-3 shrink-0 rounded-full bg-emerald-500 shadow-[0_0_0_6px_rgb(16_185_129/0.18)]" />
            {identity.availability}
          </p>
        </Tile>

        <Tile className="flex flex-col justify-between gap-6 md:col-span-2 lg:col-span-3">
          <TileLabel>Casablanca</TileLabel>
          <p className="font-display text-5xl leading-none md:text-6xl">
            <LiveClock />
          </p>
        </Tile>

        <Tile tone="ghost" className="flex flex-col justify-between gap-6 md:col-span-2 lg:col-span-3">
          <TileLabel>Formation</TileLabel>
          <p className="font-display text-2xl leading-tight">
            ENA Rabat
            <span className="block text-graphite">depuis 2020</span>
          </p>
        </Tile>

        <Tile
          tone="accent"
          className="col-span-2 flex cursor-pointer items-end justify-between gap-6 md:col-span-2 lg:col-span-3"
          onClick={() => scrollTo("#projets")}
          data-cursor="Voir"
        >
          <p className="font-display text-3xl leading-[0.95]">
            Voir les
            <br />
            projets
          </p>
          <Magnetic>
            <span className="grid size-14 place-items-center rounded-full bg-[#111] text-xl text-terra transition-transform duration-500 group-hover/tile:rotate-45">
              ↗
            </span>
          </Magnetic>
        </Tile>
      </div>
    </section>
  );
}
