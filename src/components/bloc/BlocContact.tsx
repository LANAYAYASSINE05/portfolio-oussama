"use client";

import { ArrowUpRight, Check, Copy, Download, Phone } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useSite } from "@/components/providers/SiteProvider";
import { Monogram, SocialIcon } from "@/components/ui/Logos";
import { identity } from "@/lib/content";
import { BlocTitle, pop } from "./shared";

const linkedin = identity.socials.find((s) => s.label === "LinkedIn");

export function BlocContact() {
  const { scrollTo } = useSite();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(identity.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  const tiles = [
    { label: "Téléphone", value: identity.phone, href: `tel:${identity.phone.replace(/\s/g, "")}`, icon: <Phone aria-hidden strokeWidth={2.5} className="size-6" /> },
    ...(linkedin
      ? [{ label: "LinkedIn", value: "oussama-ziyati", href: linkedin.href, external: true, icon: <SocialIcon label="LinkedIn" className="size-6" /> }]
      : []),
    { label: "Curriculum", value: "Télécharger le PDF", href: identity.cv, download: true, icon: <Download aria-hidden strokeWidth={2.5} className="size-6" /> },
  ];

  return (
    <section id="contact" data-room="contact" className="bloc-dots border-t-[3px] border-ink px-[var(--gutter)] pb-8 pt-[14vh] lg:pb-28">
      <BlocTitle index={7} tag="Contact" color="bg-pop-lime" title="On en parle ?" />

      <div className="grid items-center gap-12 lg:grid-cols-[auto_1fr]">
        <a
          href={`mailto:${identity.email}?subject=${encodeURIComponent("Proposition d'entretien")}`}
          className="group relative mx-auto block size-60 md:size-72"
          data-cursor=""
        >
          <span aria-hidden className="absolute inset-0 translate-y-4 rounded-full border-[4px] border-ink bg-night" />
          <span className="absolute inset-0 grid place-items-center rounded-full border-[4px] border-ink bg-pop-pink text-center text-night transition-transform duration-150 ease-out group-hover:translate-y-1 group-active:translate-y-4">
            <span>
              <span className="block font-display text-3xl uppercase leading-none md:text-4xl">Écrivez-</span>
              <span className="mt-1 block font-display text-3xl uppercase leading-none md:text-4xl">moi</span>
              <span className="mt-3 block text-sm font-bold uppercase">Proposer un entretien</span>
            </span>
          </span>
        </a>

        <div>
          <p className="max-w-xl text-xl font-medium leading-snug text-ink/85">
            Agences, bureaux d&apos;études, promoteurs : je suis disponible pour rejoindre votre équipe et je réponds vite.
          </p>
          <div className="bloc-box mt-8 flex flex-wrap items-center justify-between gap-4 bg-paper p-3 pl-5">
            <a href={`mailto:${identity.email}`} className="min-w-0 break-all font-display text-[clamp(1.1rem,2.6vw,2rem)]" data-cursor="">
              {identity.email}
            </a>
            <button
              type="button"
              onClick={copy}
              className={`bloc-press flex items-center gap-2 rounded-xl border-[3px] border-ink px-4 py-2.5 font-black uppercase text-night shadow-[4px_4px_0_0_var(--ink)] ${copied ? "bg-pop-lime" : "bg-pop-sun"}`}
              data-cursor=""
            >
              {copied ? <Check aria-hidden strokeWidth={3} className="size-4" /> : <Copy aria-hidden strokeWidth={2.5} className="size-4" />}
              {copied ? "Copié !" : "Copier"}
            </button>
          </div>

          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {tiles.map((t, i) => (
              <li key={t.label}>
                <a
                  href={t.href}
                  download={t.download}
                  target={t.external ? "_blank" : undefined}
                  rel={t.external ? "noreferrer" : undefined}
                  className={`bloc-box bloc-press flex h-full flex-col gap-6 p-5 text-night ${pop(i + 1)}`}
                  data-cursor=""
                >
                  <span className="flex items-center justify-between">
                    {t.icon}
                    <ArrowUpRight aria-hidden strokeWidth={2.5} className="size-5" />
                  </span>
                  <span>
                    <span className="block text-sm font-bold uppercase opacity-70">{t.label}</span>
                    <span className="mt-1 block font-black">{t.value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <footer className="mt-[12vh] flex flex-wrap items-center justify-between gap-6 border-t-[3px] border-ink pt-6 text-sm font-bold">
        <span className="flex items-center gap-3">
          <Monogram className="size-8 text-pop-lime" />
          {identity.name} — {identity.title}
        </span>
        <span className="flex flex-wrap items-center gap-5 text-graphite">
          {identity.socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="hover:text-ink" data-cursor="">
              <SocialIcon label={s.label} className="size-4" />
            </a>
          ))}
          <Link href="/systeme" className="hover:text-ink" data-cursor="">
            Système de design
          </Link>
          <button type="button" onClick={() => scrollTo(0)} className="hover:text-ink" data-cursor="">
            ↑ Haut de page
          </button>
          <span>© {identity.graduation}</span>
        </span>
      </footer>
    </section>
  );
}
