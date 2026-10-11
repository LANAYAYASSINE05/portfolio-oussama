"use client";

import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { useRef } from "react";
import { SocialIcon } from "@/components/ui/Logos";
import { useSite } from "@/components/providers/SiteProvider";
import { Magnetic } from "@/components/ui/Magnetic";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { identity } from "@/lib/content";

const words = ["Architecture", "Lumière", "Matière", "Patrimoine", "Paysage", "Détail"];

export function Contact() {
  const root = useRef<HTMLElement>(null);
  const { scrollTo } = useSite();

  useGSAP(
    () => {
      const marquee = gsap.to("[data-marquee-track]", {
        xPercent: -50,
        ease: "none",
        duration: 30,
        repeat: -1,
      });

      gsap.to(marquee, {
        timeScale: 4,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      const split = SplitText.create("[data-contact-title]", { type: "lines,words", mask: "lines" });
      gsap.from(split.words, {
        yPercent: 110,
        stagger: 0.05,
        duration: 1.3,
        scrollTrigger: { trigger: "[data-contact-title]", start: "top 80%" },
      });
    },
    { scope: root },
  );

  return (
    <section id="contact" ref={root} className="relative overflow-hidden bg-night pt-[14vh] text-on-night">
      <div className="border-y border-on-night/15 py-6">
        <div data-marquee-track className="flex w-max whitespace-nowrap">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
              {words.map((w) => (
                <span key={w} className="flex items-center font-display text-[clamp(3rem,8vw,7rem)] italic">
                  <span className="px-8">{w}</span>
                  <span className="text-terra not-italic">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-[var(--gutter)] px-[var(--gutter)] py-[14vh] md:grid-cols-12">
        <p className="label col-span-4 text-on-night/50 md:col-span-3">( 09 ) Contact</p>
        <div className="col-span-4 md:col-span-9">
          <h2
            data-contact-title
            className="font-display text-[clamp(3.5rem,9vw,10rem)] leading-[0.9] tracking-[-0.02em]"
          >
            Construisons votre prochain lieu.
          </h2>

          <div className="mt-16 flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
            <a
              href={`mailto:${identity.email}`}
              className="group relative flex w-fit items-center gap-4 text-2xl md:text-4xl"
              data-cursor=""
            >
              <Mail aria-hidden strokeWidth={1.25} className="size-[0.9em] text-terra" />
              {identity.email}
              <span className="absolute -bottom-2 left-0 h-px w-full origin-left bg-on-night/30" />
              <span className="absolute -bottom-2 left-0 h-px w-full origin-right scale-x-0 bg-terra transition-transform duration-700 ease-archi group-hover:origin-left group-hover:scale-x-100" />
            </a>

            <Magnetic strength={0.5}>
              <a
                href={`mailto:${identity.email}`}
                className="group relative grid size-40 place-items-center overflow-hidden rounded-full bg-terra md:size-48"
                data-cursor=""
              >
                <span className="absolute inset-0 scale-0 rounded-full bg-paper transition-transform duration-700 ease-archi group-hover:scale-100" />
                <span className="label relative text-paper transition-colors duration-500 group-hover:text-ink">
                  Démarrer un projet
                </span>
              </a>
            </Magnetic>
          </div>
        </div>
      </div>

      <footer className="grid grid-cols-2 gap-[var(--gutter)] border-t border-on-night/15 px-[var(--gutter)] py-8 md:grid-cols-12">
        <div className="label col-span-2 space-y-1 text-on-night/60 md:col-span-3">
          <p>{identity.name} — {identity.role}</p>
          <p className="flex items-center gap-1.5">
            <MapPin aria-hidden strokeWidth={1.5} className="size-3.5" />
            {identity.coords}
          </p>
        </div>
        <div className="label col-span-1 space-y-1 md:col-span-3 md:col-start-5">
          <p className="text-on-night/40">Téléphone</p>
          <a href={`tel:${identity.phone.replace(/\s/g, "")}`} className="flex items-center gap-1.5 hover:text-terra" data-cursor="">
            <Phone aria-hidden strokeWidth={1.5} className="size-3.5" />
            {identity.phone}
          </a>
        </div>
        <ul className="label col-span-1 space-y-1.5 md:col-span-2">
          {identity.socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-terra" data-cursor="">
                <SocialIcon label={s.label} className="size-3.5" />
                {s.label} ↗
              </a>
            </li>
          ))}
        </ul>
        <div className="col-span-2 flex flex-wrap items-end justify-between gap-4 md:col-span-4 md:col-start-9 md:justify-end md:gap-8">
          <span className="label text-on-night/40">© 2026</span>
          <Link href="/systeme" className="label hover:text-terra" data-cursor="">
            Système de design
          </Link>
          <button type="button" onClick={() => scrollTo(0)} className="label hover:text-terra" data-cursor="">
            Retour en haut ↑
          </button>
        </div>
      </footer>
    </section>
  );
}
