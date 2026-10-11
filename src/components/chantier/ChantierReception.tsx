"use client";

import { Check } from "lucide-react";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { certifications, education, identity } from "@/lib/content";
import { ChantierTitle } from "./shared";

function HardHat({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 150" className={className} aria-hidden>
      <ellipse cx="110" cy="136" rx="100" ry="10" fill="rgb(0 0 0 / 0.45)" />
      <path d="M8 118 Q110 96 212 118 L206 130 Q110 112 14 130 Z" fill="#e0a800" />
      <path d="M30 116 Q30 30 110 26 Q190 30 190 116 Q110 100 30 116 Z" fill="#ffc400" />
      <path d="M96 28 Q110 22 124 28 L122 108 Q110 106 98 108 Z" fill="#ffd84d" />
      <path d="M58 46 Q72 34 92 30" stroke="#fff3c4" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.7" />
      <rect x="132" y="62" width="44" height="26" rx="3" fill="#1f6b3a" transform="rotate(8 154 75)" />
      <text x="154" y="80" textAnchor="middle" fill="#f4f2ec" fontSize="12" className="font-stencil" transform="rotate(8 154 75)">
        ENA
      </text>
    </svg>
  );
}

export function ChantierReception() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: "[data-ch-pv]", start: "top 60%" } });
      tl.from("[data-ch-row]", { autoAlpha: 0, x: -24, duration: 0.5, stagger: 0.12, ease: "power2.out" })
        .from("[data-ch-tick]", { scale: 0, duration: 0.35, stagger: 0.1, ease: "back.out(3)" }, "-=0.2")
        .fromTo("[data-ch-stamp]", { scale: 2.6, autoAlpha: 0, rotate: -30 }, { scale: 1, autoAlpha: 1, rotate: -12, duration: 0.35, ease: "power4.in" })
        .to("[data-ch-pv]", { x: 4, duration: 0.05, yoyo: true, repeat: 3 })
        .from("[data-ch-hat]", { y: -120, rotate: -20, autoAlpha: 0, duration: 0.8, ease: "bounce.out" }, "-=0.2");
    },
    { scope: root },
  );

  return (
    <section id="formation" data-room="formation" ref={root} className="asphalt px-[var(--gutter)] py-[14vh]">
      <ChantierTitle lot={6} tag="Formation" title="Réception des travaux." sub="Procès-verbal signé · sans réserve" />

      <div className="relative mx-auto max-w-5xl">
        <span data-ch-hat className="absolute -right-28 -top-28 z-20 hidden w-52 xl:block">
          <HardHat className="w-full" />
        </span>

        <article data-ch-pv className="relative bg-[#f4f2ec] text-[#141414] shadow-[0_30px_60px_rgb(0_0_0/0.6)]">
          <header className="grid gap-4 border-b-4 border-double border-[#141414] px-6 py-6 md:grid-cols-[1fr_auto] md:px-10">
            <div>
              <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#141414]/60">Document contractuel · PV n° {identity.graduation}-ENA</p>
              <h3 className="mt-2 font-display text-[clamp(2rem,4.5vw,3.5rem)] uppercase leading-[0.9]">Procès-verbal de réception</h3>
            </div>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-1 self-end font-mono text-xs uppercase md:text-right">
              <dt className="text-[#141414]/55">Ouvrage</dt>
              <dd>Architecte</dd>
              <dt className="text-[#141414]/55">Lieu</dt>
              <dd>Rabat</dd>
            </dl>
          </header>

          <div className="px-6 py-6 md:px-10">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[#141414]/55">
                  <th className="pb-3 pr-4 font-bold">Lot</th>
                  <th className="pb-3 pr-4 font-bold">Ouvrage réalisé</th>
                  <th className="hidden pb-3 pr-4 font-bold sm:table-cell">Période</th>
                  <th className="pb-3 text-right font-bold">Conforme</th>
                </tr>
              </thead>
              <tbody>
                {education.map((e) => (
                  <tr key={e.title} data-ch-row className="border-t border-[#141414]/15 align-top">
                    <td className="whitespace-nowrap py-4 pr-3 font-stencil text-xl sm:pr-4 sm:text-2xl">{e.level}</td>
                    <td className="py-4 pr-4">
                      <p className="font-display text-2xl uppercase leading-none md:text-3xl">{e.title}</p>
                      <p className="mt-1 text-sm font-semibold text-[#141414]/70">
                        {e.school} · {e.location}
                      </p>
                      <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#141414]/75">{e.detail}</p>
                      <p className="mt-2 font-mono text-xs sm:hidden">{e.year}</p>
                    </td>
                    <td className="hidden whitespace-nowrap py-4 pr-4 font-mono text-sm sm:table-cell">{e.year}</td>
                    <td className="py-4 text-right">
                      <span data-ch-tick className="inline-grid size-8 place-items-center bg-[#1f6b3a] text-[#f4f2ec]">
                        <Check aria-hidden className="size-5" strokeWidth={3} />
                        <span className="sr-only">Conforme</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-6 border-t-2 border-[#141414] pt-5">
              <p className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[#141414]/55">Réserves levées — acquis certifiés</p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-3">
                {certifications.map((c) => (
                  <li key={c} data-ch-row className="flex items-start gap-2 text-sm font-semibold">
                    <span className="mt-0.5 grid size-4 shrink-0 place-items-center border-2 border-[#141414]">
                      <Check aria-hidden className="size-3" strokeWidth={4} />
                    </span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <footer className="relative flex flex-wrap items-end justify-between gap-6 border-t border-[#141414]/15 bg-[#e8e5dc] px-6 py-6 md:px-10">
            <div className="font-mono text-xs uppercase leading-relaxed">
              <p className="text-[#141414]/55">Le titulaire</p>
              <p className="mt-1 font-display text-2xl normal-case italic">{identity.name}</p>
            </div>
            <div className="font-mono text-xs uppercase leading-relaxed md:text-right">
              <p className="text-[#141414]/55">Le jury</p>
              <p className="mt-1">{identity.school}</p>
            </div>
            <div className="flex w-full justify-center lg:contents">
              <span
                data-ch-stamp
                className="stamp pointer-events-none px-4 py-2 text-center text-[clamp(1.25rem,3vw,2rem)] leading-none text-[#d6261c] opacity-90 lg:absolute lg:bottom-6 lg:left-1/2 lg:-translate-x-1/2"
              >
                Réceptionné
                <span className="block text-[0.5em] tracking-[0.2em]">sans réserve · {identity.graduation}</span>
              </span>
            </div>
          </footer>
        </article>
      </div>
    </section>
  );
}
