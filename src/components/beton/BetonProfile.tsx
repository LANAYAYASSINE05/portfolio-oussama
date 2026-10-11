"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { bio, identity, languages, stats } from "@/lib/content";
import { SectionBar } from "./shared";

const sheet = [
  ["Nom", identity.name],
  ["Titre", identity.role],
  ["Promotion", identity.graduation],
  ["Basé à", identity.city],
  ["Langues", languages.map((l) => l.name).join(" / ")],
  ["Statut", identity.availability],
];

export function BetonProfile() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const target = Number(el.dataset.count);
        const counter = { v: 0 };
        gsap.to(counter, {
          v: target,
          duration: 1.6,
          ease: "expo.out",
          snap: { v: 1 },
          onUpdate: () => {
            el.textContent = String(counter.v).padStart(2, "0");
          },
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="a-propos" ref={root} className="mt-[14vh]">
      <SectionBar index="01" label="À propos" title="Profil" meta={`Promotion ${identity.graduation}`} />

      <div className="grid border-b-2 border-ink md:grid-cols-12">
        <p
          data-reveal
          className="border-b-2 border-ink p-[var(--gutter)] text-[clamp(1.75rem,3.6vw,3.5rem)] font-semibold leading-[1.02] tracking-tight md:col-span-7 md:border-b-0 md:border-r-2"
        >
          Du premier trait au dernier rendu, je dessine des logements <span className="bg-terra px-1">précis</span> — et
          je suis prêt à le faire pour votre agence.
        </p>
        <div data-reveal className="space-y-5 p-[var(--gutter)] text-lg leading-relaxed md:col-span-5">
          {bio.map((p) => (
            <p key={p.slice(0, 16)}>{p}</p>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-12">
        <dl data-reveal className="border-b-2 border-ink md:col-span-7 md:border-r-2">
          <div className="beton-mono border-b-2 border-ink bg-ink px-[var(--gutter)] py-2.5 text-paper">Fiche technique</div>
          {sheet.map(([k, v]) => (
            <div key={k} className="grid grid-cols-[8rem_1fr] border-b border-ink/30 last:border-b-0 md:grid-cols-[11rem_1fr]">
              <dt className="beton-mono border-r border-ink/30 px-[var(--gutter)] py-3.5 text-graphite">{k}</dt>
              <dd className="px-[var(--gutter)] py-3.5 font-medium">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="grid grid-cols-2 border-b-2 border-ink md:col-span-5">
          {stats.map((s, i) => (
            <div
              key={s.label}
              data-reveal
              className={`flex flex-col justify-between gap-6 p-[var(--gutter)] ${i % 2 === 0 ? "border-r-2 border-ink" : ""} ${i < 2 ? "border-b-2 border-ink" : ""}`}
            >
              <span data-count={s.value} className="font-display text-[clamp(3rem,6vw,5.5rem)] leading-none tabular-nums">
                {String(s.value).padStart(2, "0")}
              </span>
              <span className="beton-mono text-graphite">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
