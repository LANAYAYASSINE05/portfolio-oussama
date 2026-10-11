const CX = 300;
const CY = 340;

function point(i: number, n: number, r: number, phase = 0) {
  const a = (i / n) * Math.PI * 2 - Math.PI / 2 + phase;
  return `${(CX + Math.cos(a) * r).toFixed(2)} ${(CY + Math.sin(a) * r).toFixed(2)}`;
}

/** Polygone étoilé {n/k} tracé d'un seul trait (n et k premiers entre eux). */
function starPath(n: number, k: number, r: number, phase = 0) {
  const parts = Array.from({ length: n + 1 }, (_, i) => `${i === 0 ? "M" : "L"}${point((i * k) % n, n, r, phase)}`);
  return `${parts.join(" ")} Z`;
}

function polygonPath(n: number, r: number, phase = 0) {
  return `${Array.from({ length: n }, (_, i) => `${i === 0 ? "M" : "L"}${point(i, n, r, phase)}`).join(" ")} Z`;
}

const outerStar = starPath(16, 5, 228);
const khatamA = polygonPath(4, 150);
const khatamB = polygonPath(4, 150, Math.PI / 4);
const innerStar = starPath(8, 3, 104, Math.PI / 8);
const petals = Array.from({ length: 16 }, (_, i) => point(i, 16, 252, Math.PI / 16).split(" ").map(Number));
const rays = Array.from({ length: 8 }, (_, i) => `M${point(i, 8, 104, Math.PI / 8)} L${point(i, 8, 228, Math.PI / 8)}`);

export function ZelligeRosette({ svgRef }: { svgRef: React.RefObject<SVGSVGElement | null> }) {
  return (
    <svg ref={svgRef} viewBox="0 0 600 760" className="stroke-draw h-full w-full opacity-0" aria-hidden>
      <g className="text-ink/45">
        <path d="M40 760 L40 360 A262 262 0 1 1 560 360 L560 760" />
        <path d="M76 760 L76 362 A226 226 0 1 1 524 362 L524 760" strokeDasharray="2 6" />
      </g>

      <g data-rosette className="text-terra">
        <circle cx={CX} cy={CY} r="270" className="text-ink/30" stroke="currentColor" />
        <path d={outerStar} />
        <path data-rosette-fill d={khatamA} className="fill-terra" style={{ fillOpacity: 0 }} />
        <path data-rosette-fill d={khatamB} className="fill-terra" style={{ fillOpacity: 0 }} />
        <path d={innerStar} />
        {rays.map((d) => (
          <path key={d} d={d} className="text-ink/40" stroke="currentColor" />
        ))}
        {petals.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="9" className="text-[var(--ocre,currentColor)]" stroke="currentColor" />
        ))}
        <circle cx={CX} cy={CY} r="34" />
        <circle cx={CX} cy={CY} r="6" />
      </g>
    </svg>
  );
}

export const ROSETTE_ORIGIN = `${CX} ${CY}`;
