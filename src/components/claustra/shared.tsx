import { useId, type CSSProperties, type ReactNode } from "react";
import { identity } from "@/lib/content";

/** Octagram (two overlapping squares): outer vertices on R, concave vertices on R·cos45°/cos22.5°. */
export function starPoints(cx: number, cy: number, R: number) {
  const r = (R * Math.cos(Math.PI / 4)) / Math.cos(Math.PI / 8);
  return Array.from({ length: 16 }, (_, i) => {
    const a = (i * Math.PI) / 8 - Math.PI / 2;
    const rad = i % 2 === 0 ? R : r;
    return `${(cx + rad * Math.cos(a)).toFixed(2)},${(cy + rad * Math.sin(a)).toFixed(2)}`;
  });
}

type KhatamProps = { className?: string; filled?: boolean; stroke?: number };

export function Khatam({ className = "size-4", filled = false, stroke = 5 }: KhatamProps) {
  return (
    <svg aria-hidden viewBox="0 0 100 100" className={className}>
      <polygon
        points={starPoints(50, 50, 48).join(" ")}
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={filled ? 0 : stroke}
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Repeating claustra lattice: thick strokes read as a solid screen with star-shaped openings. */
export function Lattice({ className = "", size = 56, stroke = 7 }: { className?: string; size?: number; stroke?: number }) {
  const id = useId().replace(/:/g, "");
  const c = size / 2;
  const s = size * 0.3;
  return (
    <svg aria-hidden className={`pointer-events-none ${className}`} width="100%" height="100%">
      <defs>
        <pattern id={`lattice-${id}`} width={size} height={size} patternUnits="userSpaceOnUse">
          <g fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinejoin="miter">
            <rect x={c - s} y={c - s} width={s * 2} height={s * 2} />
            <rect x={c - s} y={c - s} width={s * 2} height={s * 2} transform={`rotate(45 ${c} ${c})`} />
            <path d={`M0 ${c}H${c - s * 1.41}M${c + s * 1.41} ${c}H${size}M${c} 0V${c - s * 1.41}M${c} ${c + s * 1.41}V${size}`} />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#lattice-${id})`} />
    </svg>
  );
}

const arabicDigits = "٠١٢٣٤٥٦٧٨٩";
export const toArabic = (n: string) => n.replace(/\d/g, (d) => arabicDigits[Number(d)]);

export function Availability({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 text-sm font-medium ${className}`}>
      <span className="relative flex size-2.5">
        <span className="absolute inset-0 animate-ping rounded-full bg-safran/70" />
        <span className="relative size-2.5 rounded-full bg-safran" />
      </span>
      {identity.availability}
    </span>
  );
}

/** Pointed (ogee-free) Moroccan arch in objectBoundingBox units: two arcs meeting at a crown. */
export const OGIVE_ID = "claustra-ogive";
const OGIVE_PATH = "M0 1 L0 0.42 C0 0.2 0.22 0.06 0.5 0 C0.78 0.06 1 0.2 1 0.42 L1 1 Z";

export function OgiveDefs() {
  return (
    <svg aria-hidden width="0" height="0" className="absolute">
      <defs>
        <clipPath id={OGIVE_ID} clipPathUnits="objectBoundingBox">
          <path d={OGIVE_PATH} />
        </clipPath>
      </defs>
    </svg>
  );
}

type OgiveProps = { children: ReactNode; className?: string; frame?: string; style?: CSSProperties };

/** Content clipped to a pointed arch, with an optional inset frame line following the same curve. */
export function Ogive({ children, className = "", frame, style }: OgiveProps) {
  return (
    <div className={`relative ${className}`} style={style}>
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `url(#${OGIVE_ID})` }}>
        {children}
      </div>
      {frame && (
        <svg aria-hidden viewBox="0 0 1 1" preserveAspectRatio="none" className={`pointer-events-none absolute inset-3 h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)] overflow-visible ${frame}`}>
          <path d={OGIVE_PATH} fill="none" stroke="currentColor" strokeWidth={1} vectorEffect="non-scaling-stroke" />
        </svg>
      )}
    </div>
  );
}

/** Brass fanous: the metal body is masked with octagram holes so the flame glow shows through. */
export function Lantern({ className = "" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  const holes = [
    [48, 78], [72, 78], [36, 100], [60, 100], [84, 100], [48, 122], [72, 122], [36, 144], [60, 144], [84, 144],
  ];
  return (
    <svg aria-hidden viewBox="0 0 120 230" className={className}>
      <defs>
        <radialGradient id={`flame-${id}`} cx="50%" cy="55%" r="50%">
          <stop offset="0%" stopColor="#fff3d1" />
          <stop offset="45%" stopColor="#ffc865" />
          <stop offset="100%" stopColor="#c46a16" />
        </radialGradient>
        <mask id={`cut-${id}`}>
          <rect width="120" height="230" fill="white" />
          {holes.map(([x, y]) => (
            <polygon key={`${x}-${y}`} points={starPoints(x, y, 8.5).join(" ")} fill="black" />
          ))}
          <path d="M60 60 L60 168" stroke="black" strokeWidth={1.4} />
        </mask>
      </defs>
      <line x1="60" y1="0" x2="60" y2="30" stroke="currentColor" strokeWidth={1.2} strokeDasharray="2 3" />
      <circle cx="60" cy="34" r="4.5" fill="none" stroke="currentColor" strokeWidth={1.6} />
      <path d="M38 56 Q60 26 82 56 Z" fill="currentColor" />
      <rect x="34" y="55" width="52" height="6" rx="1.5" fill="currentColor" />
      <polygon points="36,61 84,61 96,112 84,166 36,166 24,112" fill={`url(#flame-${id})`} className="lantern-flicker" />
      <polygon points="36,61 84,61 96,112 84,166 36,166 24,112" fill="currentColor" mask={`url(#cut-${id})`} />
      <rect x="34" y="166" width="52" height="6" rx="1.5" fill="currentColor" />
      <path d="M42 172 L78 172 L60 204 Z" fill="currentColor" />
      <circle cx="60" cy="210" r="3.5" fill="currentColor" />
    </svg>
  );
}

type HeadingProps = { index: number; name: string; nameAr: string; title: ReactNode; align?: "left" | "center" };

/** Room heading: brass index in both numeral systems, a drawn rule, and the title. */
export function RoomHeading({ index, name, nameAr, title, align = "left" }: HeadingProps) {
  const center = align === "center";
  return (
    <header className={`mb-14 md:mb-20 ${center ? "text-center" : ""}`}>
      <p className={`flex items-center gap-4 text-sm font-semibold text-terra ${center ? "justify-center" : ""}`}>
        <span className="font-mono tabular-nums">{String(index).padStart(2, "0")}</span>
        <span data-rule className="h-px w-14 origin-left bg-terra/60" />
        <span>{name}</span>
        <span lang="ar" className="font-display text-base text-safran">
          {nameAr} · {toArabic(String(index))}
        </span>
      </p>
      <h2
        data-claustra-title
        className={`mt-5 font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.02] ${center ? "mx-auto max-w-4xl" : "max-w-4xl"}`}
      >
        {title}
      </h2>
    </header>
  );
}
