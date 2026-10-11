"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { bio, identity, languages, stats } from "@/lib/content";
import { ChantierTitle, Led } from "./shared";

function Bolt({ className = "" }: { className?: string }) {
  return <span aria-hidden className={`absolute block size-3 rounded-full bg-[radial-gradient(circle_at_35%_30%,#e6e9ec,#6b727a)] shadow-[0_1px_2px_rgb(0_0_0/0.6)] ${className}`} />;
}

export function ChantierPermis() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>("[data-led]").forEach((el) => {
        const target = Number(el.dataset.led);
        const width = el.dataset.led?.length ?? 2;
        const counter = { v: 0 };
        el.textContent = "0".repeat(width);
        gsap.to(counter, {
          v: target,
          duration: 1.6,
          ease: "power2.out",
          snap: { v: 1 },
          onUpdate: () => {
            el.textContent = String(counter.v).padStart(width, "0");
          },
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });

      gsap.from("[data-ch-board]", {
        rotate: -4,
        y: -60,
        autoAlpha: 0,
        duration: 1,
        ease: "elastic.out(1, 0.6)",
        scrollTrigger: { trigger: "[data-ch-board]", start: "top 80%" },
      });

      gsap.from("[data-ch-badge]", {
        rotate: (i) => (i % 2 ? 25 : -25),
        y: -40,
        autoAlpha: 0,
        duration: 0.9,
        ease: "back.out(2)",
        stagger: 0.12,
        scrollTrigger: { trigger: "[data-ch-badges]", start: "top 88%" },
      });
    },
    { scope: root },
  );

  const fields = [
    ["Maître d'ouvrage", "Votre agence d'architecture"],
    ["Architecte", `${identity.name}, ${identity.title.toLowerCase()}`],
    ["Formation", identity.school],
    ["Implantation", identity.city],
    ["Nature des travaux", identity.headline],
  ];

  return (
    <section id="a-propos" data-room="a-propos" ref={root} className="relative bg-night px-[var(--gutter)] py-[14vh]">
      <ChantierTitle lot={1} tag="Profil" title={<>Autorisation de construire, accordée.</>} sub="Affichage obligatoire sur le terrain" />

      <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
        <div className="relative pb-14 md:pb-24">
          <span aria-hidden className="steel absolute bottom-0 left-[12%] top-6 w-4 rounded-sm" />
          <span aria-hidden className="steel absolute bottom-0 right-[12%] top-6 w-4 rounded-sm" />
          <span aria-hidden className="steel absolute bottom-10 left-[10%] right-[10%] h-3 rounded-sm" />

          <article data-ch-board className="relative border-[6px] border-[#d8d5cc] bg-[#f4f2ec] text-[#141414] shadow-[0_30px_60px_rgb(0_0_0/0.6)]">
            <Bolt className="left-2 top-2" />
            <Bolt className="right-2 top-2" />
            <Bolt className="bottom-2 left-2" />
            <Bolt className="bottom-2 right-2" />

            <header className="flex flex-wrap items-center justify-between gap-3 bg-[#1f6b3a] px-6 py-4 text-[#f4f2ec] md:px-8">
              <p className="font-stencil text-2xl uppercase tracking-[0.08em] md:text-3xl">Permis de construire</p>
              <p className="font-mono text-xs uppercase tracking-[0.18em]">N° PC-OZ-{identity.graduation}-001</p>
            </header>

            <dl className="divide-y divide-[#141414]/15 px-6 md:px-8">
              {fields.map(([k, v]) => (
                <div key={k} className="grid gap-1 py-3.5 sm:grid-cols-[11rem_1fr] sm:gap-6">
                  <dt className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#141414]/55">{k}</dt>
                  <dd className="font-display text-xl uppercase leading-tight md:text-2xl">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="border-t-2 border-[#141414] px-6 py-6 md:px-8">
              <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#141414]/55">Description du projet</p>
              {bio.map((p) => (
                <p key={p.slice(0, 16)} className="mt-3 leading-relaxed text-[#141414]/85">
                  {p}
                </p>
              ))}
            </div>

            <footer className="flex flex-wrap items-center justify-between gap-4 bg-[#e8e5dc] px-6 py-4 md:px-8">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#141414]/70">Date d&apos;affichage : {identity.graduation}</p>
              <span className="stamp -rotate-6 px-3 py-0.5 text-xl text-[#1f6b3a]">Accordé</span>
            </footer>
          </article>
        </div>

        <div className="flex flex-col gap-10">
          <div data-reveal className="relative rounded-md border-4 border-[#2b2f33] bg-[#1a1d20] p-5 shadow-[0_24px_40px_rgb(0_0_0/0.55)] md:p-7">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
              <p className="font-stencil text-xl uppercase tracking-[0.1em] text-terra">Tableau de chantier</p>
              <span className="flex gap-1.5" aria-hidden>
                <span className="size-2.5 rounded-full bg-[#34d27b] shadow-[0_0_8px_#34d27b]" />
                <span className="size-2.5 rounded-full bg-[#ffb300]/30" />
                <span className="size-2.5 rounded-full bg-[#d6261c]/30" />
              </span>
            </div>
            <ul className="mt-5 grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <li key={s.label} className="flex flex-col gap-2 rounded-sm bg-black/30 p-3">
                  <Led value={s.value} className="self-start text-4xl md:text-5xl" />
                  <span className="font-mono text-[0.65rem] uppercase leading-snug tracking-[0.16em] text-graphite">{s.label}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-graphite">
              <span className="led text-sm">●</span>
              Jours sans retard de rendu : <span className="text-ink">tous</span>
            </p>
          </div>

          <div data-ch-badges>
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-graphite">Badges d&apos;accès — langues</p>
            <ul className="grid grid-cols-3 gap-3 md:gap-5">
              {languages.map((l, i) => (
                <li key={l.name} data-ch-badge className="flex flex-col items-center" style={{ transformOrigin: "50% 0%" }}>
                  <span aria-hidden className="block h-8 w-1.5 rounded-full bg-terra" />
                  <span aria-hidden className="-mt-1 block h-3 w-7 rounded-sm bg-[#8c9198]" />
                  <div className="mt-1 w-full overflow-hidden rounded-lg bg-[#f4f2ec] text-center text-[#141414] shadow-[0_14px_24px_rgb(0_0_0/0.5)]">
                    <div className={`${["bg-terra", "bg-[#ff5b14]", "bg-[#3d8bfd]"][i % 3]} py-1.5 font-mono text-[0.6rem] font-bold uppercase tracking-[0.2em]`}>Accès {String(i + 1).padStart(2, "0")}</div>
                    <p className="px-2 pt-3 font-display text-2xl uppercase leading-none md:text-3xl">{l.name}</p>
                    <p className="px-2 pb-3 pt-1.5 text-xs text-[#141414]/65">{l.level}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
