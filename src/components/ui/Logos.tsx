import type { SimpleIcon } from "simple-icons";
import {
  siArchicad,
  siAutocad,
  siAutodeskrevit,
  siBehance,
  siFigma,
  siInstagram,
  siRhinoceros,
  siSketchup,
  siTwinmotion,
} from "simple-icons";

type Mark =
  | { kind: "glyph"; path: string; color: string }
  | { kind: "file"; src: string; bg?: string }
  | { kind: "app"; text: string; fg: string; bg: string };

const glyph = (icon: SimpleIcon): Mark => ({ kind: "glyph", path: icon.path, color: `#${icon.hex}` });
const file = (name: string, bg?: string): Mark => ({ kind: "file", src: `/logos/${name}.svg`, bg });
const app = (text: string, fg: string, bg: string): Mark => ({ kind: "app", text, fg, bg });

const marks: Record<string, Mark> = {
  AutoCAD: glyph(siAutocad),
  Revit: glyph(siAutodeskrevit),
  ArchiCAD: glyph(siArchicad),
  Navisworks: app("N", "#fff", "#1d8a5c"),
  SketchUp: glyph(siSketchup),
  Rhino: glyph(siRhinoceros),
  Grasshopper: app("Gh", "#fff", "#3f8f2f"),
  "3ds Max": file("3dsmax"),
  Lumion: file("lumion", "#fff"),
  "V-Ray": file("vray", "#fff"),
  Enscape: file("enscape"),
  Twinmotion: glyph(siTwinmotion),
  Photoshop: file("photoshop"),
  Illustrator: file("illustrator"),
  InDesign: file("indesign"),
  Figma: glyph(siFigma),
};

type LogoProps = { name: string; className?: string; mono?: boolean };

/** App-icon style software logo. `mono` drops brand colors and inherits `currentColor`. */
export function TechLogo({ name, className = "size-10", mono = false }: LogoProps) {
  const mark = marks[name];
  const base = `inline-grid shrink-0 place-items-center overflow-hidden rounded-[22%] ${className}`;

  if (!mark) {
    return (
      <span aria-hidden className={`${base} border border-current text-[0.7em] font-semibold`}>
        {name.slice(0, 2)}
      </span>
    );
  }

  if (mark.kind === "glyph") {
    return (
      <span
        aria-hidden
        className={`${base} ${mono ? "border border-current/30" : "bg-white shadow-[inset_0_0_0_1px_rgb(0_0_0/0.08)]"}`}
      >
        <svg viewBox="0 0 24 24" className="size-[58%]" fill={mono ? "currentColor" : mark.color}>
          <path d={mark.path} />
        </svg>
      </span>
    );
  }

  if (mark.kind === "file") {
    return (
      <span aria-hidden className={`${base} ${mono ? "grayscale" : ""}`} style={{ background: mark.bg }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={mark.src} alt="" draggable={false} className="size-full object-contain" />
      </span>
    );
  }

  return (
    <span
      aria-hidden
      className={`${base} ${mono ? "border border-current/30" : ""}`}
      style={mono ? undefined : { background: mark.bg, color: mark.fg, boxShadow: `inset 0 0 0 2px ${mark.fg}` }}
    >
      <svg viewBox="0 0 40 40" className="size-full">
        <text
          x="20"
          y="21"
          textAnchor="middle"
          dominantBaseline="central"
          fill="currentColor"
          fontFamily="var(--font-inter-tight), system-ui, sans-serif"
          fontWeight={700}
          fontSize={mark.text.length > 2 ? 13 : 17}
          letterSpacing="-0.02em"
        >
          {mark.text}
        </text>
      </svg>
    </span>
  );
}

const linkedinPath =
  "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z";

const socialPaths: Record<string, string> = {
  LinkedIn: linkedinPath,
  Instagram: siInstagram.path,
  Behance: siBehance.path,
};

export function SocialIcon({ label, className = "size-5" }: { label: string; className?: string }) {
  const d = socialPaths[label];
  if (!d) return null;
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="currentColor" className={`shrink-0 ${className}`}>
      <path d={d} />
    </svg>
  );
}

/** Oussama Ziyati monogram: a Z drawn inside an O, framed like a plan cartouche. */
export function Monogram({ className = "size-9" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={1.4} className={className}>
      <rect x="1" y="1" width="30" height="30" />
      <circle cx="16" cy="16" r="10" />
      <path d="M10.5 10.5h11l-11 11h11" strokeLinejoin="miter" />
      <path d="M1 16h4M27 16h4M16 1v4M16 27v4" strokeWidth={1} />
    </svg>
  );
}
