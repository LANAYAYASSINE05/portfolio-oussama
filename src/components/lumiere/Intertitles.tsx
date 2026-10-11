"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { bio, identity, languages, manifesto, stats } from "@/lib/content";
import { SceneHeading } from "./Scene";

function chunk(text: string, size = 6) {
  const words = text.replace(/\s*:\s*/g, " : ").split(/\s+/);
  const cards: string[] = [];
  for (let i = 0; i < words.length; i += size) cards.push(words.slice(i, i + size).join(" "));
  return cards;
}

const cards = chunk(manifesto);

export function Intertitles() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: stage.current, start: "top top", end: `+=${cards.length * 70}%`, pin: true, scrub: 1 },
      });
      tl.to("[data-beam]", { rotate: 28, duration: cards.length * 2 }, 0);
      gsap.utils.toArray<HTMLElement>("[data-card]").forEach((card, i) => {
        const last = i === cards.length - 1;
        if (i === 0) gsap.set(card, { autoAlpha: 1 });
        else tl.fromTo(card, { autoAlpha: 0, filter: "blur(10px)", scale: 0.96 }, { autoAlpha: 1, filter: "blur(0px)", scale: 1, duration: 0.8 }, i * 2 - 0.4);
        if (!last) tl.to(card, { autoAlpha: 0, filter: "blur(8px)", duration: 0.8 }, i * 2 + 1.2);
      });
    },
    { scope: root },
  );

  const sheet = [
    ["Réalisation", identity.name],
    ["Statut", identity.role],
    ["Studio", identity.school],
    ...stats.map((s) => [s.label, String(s.value)]),
  ];

  return (
    <section ref={root} id="a-propos" data-chapter="Scène 01 — À propos" className="relative bg-paper">
      <div ref={stage} className="relative grid h-svh place-items-center overflow-hidden px-[var(--gutter)]">
        <div
          data-beam
          aria-hidden
          className="pointer-events-none absolute -left-1/4 -top-1/2 h-[200%] w-[150%] origin-top-left opacity-60"
          style={{
            background:
              "conic-gradient(from 100deg at 0% 0%, transparent 0deg, color-mix(in oklab, var(--accent) 22%, transparent) 8deg, transparent 22deg)",
            filter: "blur(30px)",
          }}
        />
        <p className="credits absolute left-[var(--gutter)] top-[calc(var(--header-h)+2rem)] text-terra">Scène 01 — Intertitres</p>
        <div className="relative w-full max-w-5xl text-center">
          {cards.map((c) => (
            <p
              key={c}
              data-card
              className="invisible absolute inset-x-0 top-1/2 -translate-y-1/2 font-display text-[clamp(2.25rem,6vw,6rem)] italic leading-[1.02]"
            >
              {c}
            </p>
          ))}
        </div>
      </div>

      <div className="grid gap-16 px-[var(--gutter)] py-[16vh] md:grid-cols-12">
        <SceneHeading scene="01" kicker="À propos" title={<>Le <span className="italic text-terra">personnage</span></>} className="md:col-span-12" />
        <div className="space-y-6 text-xl leading-relaxed text-ink/85 md:col-span-6">
          {bio.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <p className="credits pt-6 text-graphite">
            Version originale : {languages[0].name} — Sous-titres : {languages.slice(1).map((l) => l.name).join(", ")}
          </p>
        </div>
        <dl className="md:col-span-5 md:col-start-8">
          <p className="credits mb-6 text-terra">Fiche technique</p>
          {sheet.map(([k, v]) => (
            <div key={k} className="flex items-baseline gap-3 py-2.5">
              <dt className="credits shrink-0 text-graphite">{k}</dt>
              <span className="flex-1 translate-y-[-0.25em] border-b border-dotted border-line" />
              <dd className="text-right font-display text-xl">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
