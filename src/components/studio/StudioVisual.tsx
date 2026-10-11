import Image from "next/image";
import { useId } from "react";
import type { DrawingVariant, Project } from "@/lib/content";

type Tone = Project["tone"];
type SceneProps = { id: string; tone: Tone };

const range = (n: number) => Array.from({ length: n }, (_, i) => i);

function Villa({ id, tone }: SceneProps) {
  return (
    <>
      <g fill={tone.ink} opacity="0.12">
        <ellipse cx="160" cy="630" rx="120" ry="160" />
        <ellipse cx="1490" cy="650" rx="110" ry="140" />
      </g>
      <rect x="280" y="560" width="760" height="200" fill={tone.to} />
      <rect x="330" y="600" width="560" height="160" fill={`url(#${id}-glass)`} />
      <g stroke={tone.to} strokeWidth="6">
        {[470, 610, 750].map((x) => (
          <line key={x} x1={x} y1="600" x2={x} y2="760" />
        ))}
      </g>
      <rect x="520" y="390" width="900" height="170" fill="#f4f1ec" />
      <rect x="520" y="390" width="900" height="170" fill={tone.from} opacity="0.35" />
      <rect x="760" y="440" width="560" height="70" fill={`url(#${id}-glass)`} />
      <polygon points="520,560 1420,560 1360,604 520,604" fill="#000" opacity="0.22" />
      <polygon points="1040,760 1420,760 1500,800 1080,800" fill="#000" opacity="0.12" />
      <rect x="510" y="380" width="920" height="12" fill={tone.ink} opacity="0.75" />
      <rect x="1080" y="772" width="460" height="34" fill="#a9c3c6" />
      <rect x="1080" y="772" width="460" height="6" fill="#fff" opacity="0.6" />
    </>
  );
}

function Tower({ id, tone }: SceneProps) {
  return (
    <>
      <g fill={tone.ink} opacity="0.07">
        <rect x="120" y="460" width="220" height="300" />
        <rect x="360" y="380" width="160" height="380" />
        <rect x="1240" y="420" width="200" height="340" />
        <rect x="1450" y="520" width="150" height="240" />
      </g>
      <polygon points="1020,150 1130,190 1130,760 1020,760" fill="#7d786f" />
      <rect x="640" y="150" width="380" height="610" fill="#d9d4cb" />
      <g fill="#f2c879" opacity="0.85">
        {[
          [680, 238],
          [860, 314],
          [760, 466],
          [920, 542],
          [700, 618],
        ].map(([x, y]) => (
          <rect key={`${x}-${y}`} x={x} y={y} width="70" height="56" />
        ))}
      </g>
      <g stroke={tone.to} strokeOpacity="0.5" strokeWidth="6">
        {range(20).map((i) => (
          <line key={i} x1={658 + i * 18} y1="160" x2={658 + i * 18} y2="700" />
        ))}
      </g>
      <g fill="#bfb9ae">
        {range(8).map((i) => (
          <rect key={i} x="632" y={150 + i * 76} width="396" height="8" />
        ))}
      </g>
      <rect x="640" y="700" width="380" height="60" fill={`url(#${id}-glass)`} />
      <polygon points="1130,760 1500,760 1570,800 1130,800" fill="#000" opacity="0.25" />
    </>
  );
}

function Pavilion({ tone }: SceneProps) {
  return (
    <>
      <g stroke={tone.ink} strokeOpacity="0.45" strokeWidth="5" fill="none">
        <path d="M110 760 C120 640 130 560 150 470" />
        <path d="M150 470 q-70 10 -110 50 M150 470 q60 -10 110 30 M150 470 q-20 -60 -80 -80 M150 470 q30 -50 90 -60" />
        <path d="M1480 760 C1470 660 1465 590 1450 520" />
        <path d="M1450 520 q-60 0 -100 40 M1450 520 q60 -6 100 30 M1450 520 q-10 -50 -60 -70" />
      </g>
      <polygon points="1420,540 1500,580 1500,760 1420,760" fill="#000" opacity="0.18" />
      <rect x="180" y="540" width="1240" height="220" fill={tone.from} />
      {range(5).map((i) => (
        <g key={i}>
          <path d={`M${190 + i * 246} 542 a123 96 0 0 1 246 0 z`} fill={tone.from} />
          <path d={`M${313 + i * 246} 446 a123 96 0 0 1 123 96 h-123 z`} fill="#000" opacity="0.1" />
          <path d={`M${280 + i * 246} 760 v-118 a33 33 0 0 1 66 0 v118 z`} fill={tone.ink} opacity="0.78" />
        </g>
      ))}
      <rect x="180" y="540" width="1240" height="220" fill={tone.to} opacity="0.12" />
    </>
  );
}

function Riad({ tone }: SceneProps) {
  return (
    <>
      <ellipse cx="380" cy="330" rx="190" ry="120" fill="#6b7a4a" opacity="0.65" />
      <ellipse cx="1300" cy="350" rx="140" ry="90" fill="#6b7a4a" opacity="0.45" />
      <rect x="260" y="360" width="1080" height="400" fill="#efe8da" />
      <rect x="260" y="360" width="1080" height="400" fill={tone.to} opacity="0.28" />
      <g fill="#efe8da">
        {range(18).map((i) => (
          <rect key={i} x={262 + i * 60} y="336" width="36" height="26" />
        ))}
      </g>
      <polygon points="260,360 640,360 260,700" fill="#000" opacity="0.1" />
      <path d="M720 760 V578 A80 80 0 1 1 880 578 V760 Z" fill={tone.ink} opacity="0.12" />
      <path d="M744 760 V578 A56 56 0 1 1 856 578 V760 Z" fill={tone.ink} opacity="0.85" />
      <g fill={tone.ink} opacity="0.7">
        {[420, 1080].map((x) => (
          <g key={x}>
            <rect x={x} y="470" width="100" height="130" />
          </g>
        ))}
      </g>
      <g stroke="#efe8da" strokeWidth="3" opacity="0.7">
        {[420, 1080].flatMap((x) =>
          range(6).map((i) => <line key={`${x}-${i}`} x1={x + 8 + i * 17} y1="474" x2={x + 8 + i * 17} y2="596" />),
        )}
      </g>
    </>
  );
}

const scenes: Record<DrawingVariant, (props: SceneProps) => React.JSX.Element> = {
  villa: Villa,
  tower: Tower,
  pavilion: Pavilion,
  riad: Riad,
};

type Props = { variant: DrawingVariant; tone: Tone; className?: string };

/** Drawn architectural "photograph" used until real renders are provided. */
export function StudioVisual({ variant, tone, className }: Props) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const Scene = scenes[variant];
  return (
    <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6f3ee" />
          <stop offset="1" stopColor={tone.from} />
        </linearGradient>
        <linearGradient id={`${id}-ground`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={tone.to} stopOpacity="0.55" />
          <stop offset="1" stopColor={tone.to} />
        </linearGradient>
        <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2a3236" />
          <stop offset="0.55" stopColor="#5d6b70" />
          <stop offset="1" stopColor="#1d2224" />
        </linearGradient>
        <linearGradient id={`${id}-sun`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.5" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`${id}-vignette`} cx="0.5" cy="0.45" r="0.75">
          <stop offset="0.6" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.35" />
        </radialGradient>
      </defs>
      <rect width="1600" height="1000" fill={`url(#${id}-sky)`} />
      <rect y="760" width="1600" height="240" fill={`url(#${id}-ground)`} />
      <line x1="0" y1="760" x2="1600" y2="760" stroke={tone.ink} strokeOpacity="0.25" strokeWidth="2" />
      <Scene id={id} tone={tone} />
      <rect width="1600" height="1000" fill={`url(#${id}-sun)`} />
      <rect width="1600" height="1000" fill={`url(#${id}-vignette)`} />
    </svg>
  );
}

export function ProjectImage({ project, className = "h-full w-full", sizes = "100vw" }: { project: Project; className?: string; sizes?: string }) {
  if (project.image) {
    return <Image src={project.image} alt={project.title} fill sizes={sizes} className="object-cover" />;
  }
  return <StudioVisual variant={project.drawing} tone={project.tone} className={className} />;
}
