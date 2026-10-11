"use client";

import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { SocialIcon } from "@/components/ui/Logos";
import { useSite } from "@/components/providers/SiteProvider";
import { Magnetic } from "@/components/ui/Magnetic";
import { identity } from "@/lib/content";
import { BentoSection, Tile, TileLabel } from "./Tile";

export function ContactGrid() {
  const { scrollTo } = useSite();

  return (
    <BentoSection id="contact" index="07 — Contact" title={<>Contact<span className="text-terra">.</span></>} className="pb-3">
      <Tile tone="accent" className="col-span-2 flex min-h-[26rem] flex-col justify-between gap-10 md:col-span-6 lg:col-span-8">
        <TileLabel className="opacity-80">Un poste, une mission, une collaboration ?</TileLabel>
        <p className="font-display text-[clamp(3rem,7vw,7rem)] leading-[0.88]">Construisons ensemble.</p>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <a href={`mailto:${identity.email}`} className="flex items-center gap-3 text-xl font-medium underline-offset-4 hover:underline md:text-2xl" data-cursor="">
            <Mail aria-hidden strokeWidth={1.75} className="size-6" />
            {identity.email}
          </a>
          <Magnetic>
            <a
              href={`mailto:${identity.email}`}
              className="label flex h-14 items-center gap-3 rounded-full bg-[#111] px-6 text-terra"
              data-cursor=""
            >
              Écrire un message ↗
            </a>
          </Magnetic>
        </div>
      </Tile>

      <Tile tone="dark" className="col-span-2 flex flex-col justify-between gap-6 md:col-span-6 lg:col-span-4">
        <TileLabel>Réseaux</TileLabel>
        <ul className="divide-y divide-on-night/10">
          {identity.socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between py-4 font-display text-3xl"
                data-cursor=""
              >
                <span className="flex items-center gap-4">
                  <span className="grid size-11 place-items-center rounded-2xl bg-on-night/10 transition-colors duration-300 group-hover:bg-terra group-hover:text-[#111]">
                    <SocialIcon label={s.label} className="size-5" />
                  </span>
                  {s.label}
                </span>
                <span className="text-terra transition-transform duration-500 group-hover:rotate-45">↗</span>
              </a>
            </li>
          ))}
        </ul>
        <p className="label flex flex-wrap items-center gap-x-4 gap-y-2 opacity-60">
          <span className="flex items-center gap-1.5">
            <Phone aria-hidden strokeWidth={1.5} className="size-3.5" />
            {identity.phone}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin aria-hidden strokeWidth={1.5} className="size-3.5" />
            {identity.city}
          </span>
        </p>
      </Tile>

      <Tile tone="ghost" lift={false} className="label col-span-2 flex flex-wrap items-center justify-between gap-4 py-4 text-graphite md:col-span-6 md:py-4 lg:col-span-12">
        <span>© 2026 {identity.name}</span>
        <Link href="/systeme" className="hover:text-ink" data-cursor="">
          Système de design
        </Link>
        <button type="button" onClick={() => scrollTo(0)} className="hover:text-ink" data-cursor="">
          Retour en haut ↑
        </button>
      </Tile>
    </BentoSection>
  );
}
