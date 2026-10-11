import type { Metadata } from "next";
import { IntroSkip } from "@/components/ui/IntroSkip";
import { MotionDemo } from "@/components/system/MotionDemo";
import { Monogram, SocialIcon, TechLogo } from "@/components/ui/Logos";
import { NavIcon } from "@/components/ui/NavIcon";
import { identity, navigation, secondaryNavigation, technologies } from "@/lib/content";
import { motionTokens, themes } from "@/lib/tokens";

export const metadata: Metadata = {
  title: "Systèmes de design « Le Trait », « Volume », « Médina », « Bento », « Lumière », « Studio », « Béton », « Claustra », « Bloc », « Maquette » & « Chantier » — Oussama Ziyati",
};

const typeScale = [
  { label: "Display XL", className: "font-display text-8xl leading-none", sample: "Oussama" },
  { label: "Display L", className: "font-display text-6xl italic leading-none", sample: "Œuvres bâties" },
  { label: "Titre", className: "font-display text-4xl", sample: "Du croquis au chantier" },
  { label: "Texte", className: "text-xl leading-snug", sample: "Des lieux sobres et lumineux, ancrés dans leur territoire." },
  { label: "Annotation", className: "label", sample: "Coupe AA — 1/100 · 33.5731° N" },
];

function Block({ index, title, children }: { index: string; title: string; children: React.ReactNode }) {
  return (
    <section className="grid grid-cols-4 gap-[var(--gutter)] border-t border-ink py-16 md:grid-cols-12">
      <div className="col-span-4 md:col-span-3">
        <p className="label text-graphite">( {index} )</p>
        <h2 className="font-display text-4xl">{title}</h2>
      </div>
      <div className="col-span-4 md:col-span-9">{children}</div>
    </section>
  );
}

export default function SystemPage() {
  return (
    <main className="blueprint min-h-svh px-[var(--gutter)] pb-24 pt-[calc(var(--header-h)+4rem)]">
      <IntroSkip />

      <header className="mb-20">
        <p className="label text-graphite">Systèmes de design — v3.0</p>
        <h1 className="font-display text-[clamp(4rem,11vw,11rem)] leading-[0.85]">
          Trait, Volume, Médina, Bento, Lumière, Studio, Béton, Claustra, Bloc, Maquette <span className="italic text-terra">& Chantier</span>
        </h1>
        <p className="mt-6 max-w-2xl text-xl leading-snug text-graphite">
          Onze langages visuels. Trait, Volume et Médina partagent les mêmes composants, déclinés
          par des variables CSS ; Bento, Lumière, Studio, Béton, Claustra, Bloc, Maquette et Chantier reconstruisent chaque section avec leur propre
          bibliothèque de composants. Passez de l&apos;un à l&apos;autre avec le sélecteur en haut de page.
        </p>
      </header>

      <Block index="A" title="Couleurs">
        <div className="space-y-12">
          {Object.entries(themes).map(([id, theme]) => (
            <div key={id}>
              <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-display text-3xl">{theme.name}</p>
                <p className="label text-graphite">{theme.tagline}</p>
              </div>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-7">
                {theme.colors.map((c) => (
                  <div key={c.token} className="border border-line">
                    <div className="aspect-square" style={{ background: c.hex }} />
                    <div className="space-y-1 p-3">
                      <p className="text-sm font-medium">{c.name}</p>
                      <p className="label text-graphite">{c.hex}</p>
                      <p className="label text-graphite">{c.token}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="label mt-3 text-graphite">{theme.fonts}</p>
            </div>
          ))}
        </div>
      </Block>

      <Block index="B" title="Typographie">
        <div className="divide-y divide-line">
          {typeScale.map((t) => (
            <div key={t.label} className="grid gap-2 py-6 md:grid-cols-[10rem_1fr] md:items-baseline">
              <span className="label text-graphite">{t.label}</span>
              <span className={t.className}>{t.sample}</span>
            </div>
          ))}
        </div>
        <p className="label mt-6 text-graphite">
          Display : Instrument Serif (Trait), Sora (Volume), Reem Kufi (Médina), Bricolage Grotesque (Bento), Bodoni Moda (Lumière), Jost (Studio), Archivo étendue (Béton), El Messiri (Claustra), Unbounded (Bloc), Barlow Condensed + Caveat (Maquette) ou Big Shoulders + Stencil (Chantier) · Texte : Inter Tight · Annotations : JetBrains Mono
        </p>
      </Block>

      <Block index="C" title="Grille">
        <div className="grid h-40 grid-cols-12 gap-2">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="flex items-end border-x border-terra/40 bg-terra/10 p-1">
              <span className="label text-terra">{i + 1}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-graphite">
          12 colonnes sur ordinateur, 4 sur mobile. Gouttière fluide <code className="label">clamp(1rem, 2.5vw, 2rem)</code>.
          Appuyez sur <kbd className="label border border-ink px-1">G</kbd> pour afficher la grille partout.
        </p>
      </Block>

      <Block index="D" title="Mouvement">
        <div className="mb-10 grid gap-[var(--gutter)] md:grid-cols-2">
          {Object.entries(motionTokens.ease).map(([name, curve]) => (
            <div key={name} className="border border-line bg-paper p-4">
              <svg viewBox="0 0 100 100" className="stroke-draw h-32 w-full text-terra">
                <path d="M0 100 L100 100 M0 100 L0 0" className="text-line" stroke="currentColor" />
                <path d={`M0 100 C${curve[0] * 100} ${100 - curve[1] * 100} ${curve[2] * 100} ${100 - curve[3] * 100} 100 0`} strokeWidth={2} />
              </svg>
              <p className="font-display text-2xl">ease-{name}</p>
              <p className="label text-graphite">cubic-bezier({curve.join(", ")})</p>
            </div>
          ))}
        </div>
        <div className="mb-10 flex flex-wrap gap-3">
          {Object.entries(motionTokens.duration).map(([k, v]) => (
            <span key={k} className="label rounded-full border border-ink px-3 py-1.5">
              {k} · {v}s
            </span>
          ))}
        </div>
        <MotionDemo />
      </Block>

      <Block index="E" title="Logos & icônes">
        <div className="mb-10 flex items-center gap-6">
          <Monogram className="size-20" />
          <div>
            <p className="font-display text-3xl">Monogramme OZ</p>
            <p className="label text-graphite">Un Z inscrit dans un O, cadré comme un cartouche de plan · favicon</p>
          </div>
        </div>
        <ul className="grid grid-cols-4 gap-4 sm:grid-cols-8">
          {technologies.map((t) => (
            <li key={t.symbol} className="flex flex-col items-center gap-2 text-center">
              <TechLogo name={t.name} className="size-14" />
              <span className="label text-graphite">{t.name}</span>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap items-center gap-6">
          {identity.socials.map((s) => (
            <span key={s.label} className="label flex items-center gap-2">
              <SocialIcon label={s.label} className="size-5" />
              {s.label}
            </span>
          ))}
          {[...navigation, ...secondaryNavigation].map((n) => (
            <span key={n.href} className="label flex items-center gap-2 text-graphite">
              <NavIcon href={n.href} className="size-4 text-ink" />
              {n.label}
            </span>
          ))}
        </div>
        <p className="label mt-6 text-graphite">
          Logos officiels : simple-icons, Iconify, Wikimedia Commons et lumion.com · Icônes : Lucide, trait 1.5
        </p>
      </Block>
    </main>
  );
}
