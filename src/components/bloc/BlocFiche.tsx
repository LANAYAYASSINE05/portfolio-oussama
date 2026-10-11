"use client";

import { useRef } from "react";
import { Monogram } from "@/components/ui/Logos";
import { gsap, useGSAP } from "@/lib/gsap";
import { bio, identity, languages, stats } from "@/lib/content";
import { BlocTitle, pop } from "./shared";

export function BlocFiche() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from("[data-id-card]", {
        rotate: -14,
        y: 80,
        autoAlpha: 0,
        duration: 1,
        ease: "back.out(1.6)",
        scrollTrigger: { trigger: "[data-id-card]", start: "top 85%", once: true },
      });
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const counter = { v: 0 };
        gsap.to(counter, {
          v: Number(el.dataset.count),
          duration: 1.2,
          ease: "steps(12)",
          onUpdate: () => {
            el.textContent = String(Math.round(counter.v));
          },
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        });
      });
    },
    { scope: root },
  );

  const fields = [
    ["Nom", identity.name],
    ["Titre", identity.title],
    ["École", identity.school],
    ["Promotion", identity.graduation],
    ["Ville", identity.city],
  ];

  return (
    <section id="a-propos" data-room="a-propos" ref={root} className="px-[var(--gutter)] py-[14vh]">
      <BlocTitle index={1} tag="Qui suis-je" color="bg-pop-pink" title="Fraîchement diplômé, déjà opérationnel." />

      <div className="grid items-start gap-12 lg:grid-cols-12">
        <article data-id-card className="bloc-box relative overflow-hidden bg-pop-sun text-night lg:col-span-5 lg:rotate-[-2deg]">
          <div className="flex items-center justify-between border-b-[3px] border-ink bg-night px-5 py-3 text-ink">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em]">Carte d&apos;architecte</span>
            <span className="font-mono text-xs">N° {identity.graduation}-ENA</span>
          </div>
          <div className="grid grid-cols-[auto_1fr] gap-5 p-5">
            <div className="grid aspect-[3/4] w-28 place-items-center rounded-xl border-[3px] border-ink bg-pop-blue md:w-32">
              <Monogram className="size-16 text-night" />
            </div>
            <dl className="space-y-2.5 text-sm">
              {fields.map(([k, v]) => (
                <div key={k}>
                  <dt className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.2em] opacity-60">{k}</dt>
                  <dd className="font-bold leading-tight">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="bloc-stripes flex items-center justify-between border-t-[3px] border-ink bg-pop-lime px-5 py-3">
            <span className="font-black uppercase">{identity.availability.split("—")[0].trim()}</span>
            <span className="rounded-full border-2 border-ink bg-paper px-3 py-0.5 text-xs font-black uppercase text-ink">Valide</span>
          </div>
        </article>

        <div className="space-y-6 lg:col-span-7">
          {bio.map((b, i) => (
            <p
              key={b.slice(0, 20)}
              data-reveal
              className={`bloc-box relative bg-paper-2 p-6 text-lg font-medium leading-relaxed md:p-8 ${i % 2 === 1 ? "md:ml-12" : "md:mr-12"}`}
            >
              {b}
              <span
                aria-hidden
                className={`absolute -bottom-[15px] size-6 rotate-45 border-b-[3px] border-r-[3px] border-ink bg-paper-2 ${i % 2 === 1 ? "right-10" : "left-10"}`}
              />
            </p>
          ))}
          <ul data-reveal className="flex flex-wrap gap-3 pt-4">
            {languages.map((l, i) => (
              <li key={l.name} className={`rounded-full border-[3px] border-ink px-4 py-2 text-sm font-bold text-night ${pop(i + 1)}`}>
                {l.name} · <span className="font-medium">{l.level}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ul className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {stats.map((s, i) => (
          <li key={s.label} data-reveal className={`bloc-box flex flex-col justify-between gap-6 p-5 text-night ${pop(i)}`}>
            <span data-count={s.value} className="font-display text-[clamp(3rem,6vw,5rem)] leading-none">
              {s.value}
            </span>
            <span className="font-bold uppercase leading-tight">{s.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
