import type { DrawingVariant } from "@/lib/content";
import type { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement> & { variant: DrawingVariant };

const dim = "font-mono text-[7px] tracking-widest fill-current stroke-none opacity-70 drawing-text";

export const DRAWABLE = "path, line, rect, circle, polyline";

function Villa() {
  return (
    <>
      <rect x="40" y="60" width="320" height="180" />
      <line x1="40" y1="140" x2="200" y2="140" />
      <line x1="200" y1="60" x2="200" y2="240" />
      <line x1="280" y1="60" x2="280" y2="170" />
      <line x1="200" y1="170" x2="360" y2="170" />
      <path d="M120 140 A30 30 0 0 1 150 110" />
      <path d="M200 200 A26 26 0 0 0 226 226" />
      <rect x="220" y="185" width="120" height="40" />
      <line x1="232" y1="205" x2="328" y2="205" />
      <rect x="60" y="160" width="60" height="60" />
      <circle cx="90" cy="190" r="14" />
      <path d="M10 250 L390 250" />
      <path d="M40 40 L40 30 L360 30 L360 40" />
      <path d="M380 60 L390 60 L390 240 L380 240" />
      <text x="170" y="24" className={dim}>32.00 M</text>
      <text x="62" y="100" className={dim}>SÉJOUR</text>
      <text x="215" y="110" className={dim}>CUISINE</text>
      <text x="292" y="110" className={dim}>SUITE</text>
      <text x="236" y="198" className={dim}>PISCINE</text>
    </>
  );
}

function Tower() {
  const floors = Array.from({ length: 12 }, (_, i) => 50 + i * 16);
  return (
    <>
      <path d="M140 250 L140 50 L260 30 L260 250" />
      {floors.map((y, i) => (
        <line key={y} x1="140" y1={y + 8} x2="260" y2={y + 8 - (i === 0 ? 10 : 0)} />
      ))}
      {[160, 180, 200, 220, 240].map((x) => (
        <line key={x} x1={x} y1="60" x2={x} y2="250" />
      ))}
      <path d="M60 250 L140 250 L140 170 L100 170 L60 200 Z" />
      <line x1="20" y1="250" x2="380" y2="250" />
      <path d="M290 250 L290 40" />
      <path d="M285 40 L295 40 M285 250 L295 250" />
      <circle cx="320" cy="70" r="16" />
      <line x1="320" y1="44" x2="320" y2="96" />
      <line x1="294" y1="70" x2="346" y2="70" />
      <text x="298" y="150" className={dim}>H 84 M</text>
      <text x="64" y="244" className={dim}>LOBBY</text>
      <text x="336" y="100" className={dim}>N</text>
    </>
  );
}

function Pavilion() {
  const cols = Array.from({ length: 16 }, (_, i) => {
    const a = (i / 16) * Math.PI * 2;
    return { x: 200 + Math.cos(a) * 92, y: 150 + Math.sin(a) * 92 };
  });
  return (
    <>
      <circle cx="200" cy="150" r="110" />
      <circle cx="200" cy="150" r="92" />
      <circle cx="200" cy="150" r="40" />
      {cols.map((c, i) => (
        <rect key={i} x={c.x - 3} y={c.y - 3} width="6" height="6" />
      ))}
      <line x1="200" y1="20" x2="200" y2="280" />
      <line x1="70" y1="150" x2="330" y2="150" />
      <path d="M200 40 L180 10 L220 10 Z" />
      <path d="M90 150 Q200 60 310 150" />
      <path d="M340 260 L380 260 M340 255 L340 265 M380 255 L380 265" />
      <text x="204" y="146" className={dim}>PATIO</text>
      <text x="334" y="252" className={dim}>10 M</text>
      <text x="40" y="40" className={dim}>PLAN RDC — 1/200</text>
    </>
  );
}

function Riad() {
  return (
    <>
      <rect x="70" y="40" width="260" height="220" />
      <rect x="90" y="60" width="220" height="180" />
      <rect x="150" y="100" width="100" height="100" />
      <path d="M200 120 L220 150 L200 180 L180 150 Z" />
      <circle cx="200" cy="150" r="8" />
      {[150, 175, 200, 225, 250].map((x) => (
        <line key={`t${x}`} x1={x} y1="100" x2={x} y2="92" />
      ))}
      {[150, 175, 200, 225, 250].map((x) => (
        <line key={`b${x}`} x1={x} y1="200" x2={x} y2="208" />
      ))}
      <path d="M150 100 L90 60 M250 100 L310 60 M150 200 L90 240 M250 200 L310 240" />
      <path d="M185 260 L185 248 Q200 236 215 248 L215 260" />
      <path d="M30 150 L60 150 M45 140 L45 160" />
      <text x="174" y="226" className={dim}>WUST AD-DAR</text>
      <text x="100" y="80" className={dim}>BAYT</text>
      <text x="266" y="80" className={dim}>BAYT</text>
      <text x="186" y="276" className={dim}>ENTRÉE</text>
    </>
  );
}

const variants: Record<DrawingVariant, () => React.JSX.Element> = {
  villa: Villa,
  tower: Tower,
  pavilion: Pavilion,
  riad: Riad,
};

export function PlanDrawing({ variant, className, ...rest }: Props) {
  const Drawing = variants[variant];
  return (
    <svg viewBox="0 0 400 300" className={className} aria-hidden {...rest}>
      <g className="stroke-draw">
        <Drawing />
      </g>
    </svg>
  );
}
