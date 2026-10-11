"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { bio, identity, languages, stats } from "@/lib/content";
import { MaquetteTitle, Pin, Tape } from "./shared";

const maxStat = Math.max(...stats.map((s) => s.value));

export function MaquetteCartel() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from("[data-mq-stick]", {
        scaleY: 0,
        transformOrigin: "50% 100%",
        duration: 1,
        ease: "elastic.out(1, 0.6)",
        stagger: 0.12,
        scrollTrigger: { trigger: "[data-mq-sticks]", start: "top 85%" },
      });
      gsap.utils.toArray<HTMLElement>("[data-mq-count]").forEach((el) => {
        const target = Number(el.dataset.mqCount);
        const counter = { v: 0 };
        gsap.to(counter, {
          v: target,
          duration: 1.2,
          ease: "power2.out",
          snap: { v: 1 },
          onUpdate: () => (el.textContent = String(counter.v)),
          scrollTrigger: { trigger: el, start: "top 90%" },
        });
      });
    },
    { scope: root },
  );

  const rows = [
    ["Auteur", identity.name],
    ["Titre", identity.title],
    ["École", identity.school],
    ["Promotion", identity.graduation],
    ["Atelier", identity.city],
  ];

  return (
    <section id="a-propos" data-room="a-propos" ref={root} className="px-[var(--gutter)] py-[14vh]">
      <MaquetteTitle plate={1} tag="Profil" title="Le maquettiste derrière les plans." note="fraîchement diplômé, déjà à l'établi" />

      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <div data-reveal className="foam relative rotate-[-1.5deg] rounded-sm p-7 md:p-9">
          <Pin className="left-4 top-4" />
          <Pin className="right-4 top-4" />
          <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.25em] text-[#6d665a]">Cartel n° {identity.graduation}-ENA</p>
          <dl className="mt-6 divide-y divide-[#1b1a17]/15">
            {rows.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[7rem_1fr] items-baseline gap-4 py-3">
                <dt className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#6d665a]">{k}</dt>
                <dd className="font-display text-2xl uppercase leading-tight">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="font-hand mt-6 text-2xl text-[#b8461a]">« Le projet commence toujours par la main. »</p>
        </div>

        <div className="relative">
          {bio.map((p, i) => (
            <div
              key={i}
              data-reveal
              className={`calque relative rounded-sm p-6 text-lg leading-relaxed shadow-[0_14px_30px_rgb(0_0_0/0.35)] transition-transform duration-500 ease-archi hover:z-10 hover:rotate-0 hover:-translate-y-1.5 md:p-8 ${
                i === 0 ? "rotate-1" : "-mt-3 ml-4 -rotate-1 md:ml-12"
              }`}
            >
              <Pin className="-top-1.5 left-1/2 -translate-x-1/2" />
              {p}
            </div>
          ))}

          <ul data-reveal className="mt-8 flex flex-wrap gap-4">
            {languages.map((l, i) => (
              <li key={l.name}>
                <Tape className={i % 2 === 0 ? "-rotate-2" : "rotate-2"}>
                  {l.name} · {l.level.toLowerCase()}
                </Tape>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div data-reveal className="mt-16 rounded-sm border border-line bg-paper-2/60 p-6 md:p-10">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-graphite">Relevé en baguettes de balsa</p>
        <ul data-mq-sticks className="mt-6 grid grid-cols-4 items-end gap-4 md:gap-10">
          {stats.map((s) => (
            <li key={s.label} className="flex flex-col items-center text-center">
              <span className="flex h-52 w-full flex-col items-center justify-end md:h-72">
                <span data-mq-count={s.value} className="mb-2 font-display text-4xl md:text-6xl">
                  {s.value}
                </span>
                <span
                  data-mq-stick
                  className="balsa block w-8 shrink-0 rounded-t-sm shadow-[6px_0_0_#b8955e,0_10px_18px_rgb(0_0_0/0.4)] md:w-14"
                  style={{ height: `${Math.max(10, (s.value / maxStat) * 75)}%` }}
                />
              </span>
              <span className="mt-3 h-1.5 w-full rounded-full bg-[#8f653b]" />
              <span className="mt-3 text-sm text-graphite md:text-base">{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
