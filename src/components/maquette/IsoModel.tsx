const COS = 0.866;
const SIN = 0.5;

type P3 = [number, number, number];

const project = ([x, y, z]: P3) => `${((x - y) * COS).toFixed(1)},${((x + y) * SIN - z).toFixed(1)}`;
const poly = (pts: P3[]) => pts.map(project).join(" ");

type Material = { top: string; left: string; right: string; stroke?: string };

export const MATERIALS = {
  balsa: { top: "#e8cb98", left: "#cfae76", right: "#b8955e" },
  kraft: { top: "#c49565", left: "#a87a4c", right: "#8f653b" },
  foam: { top: "#f1ebdf", left: "#d8cfbd", right: "#bfb49e" },
  glass: { top: "rgb(200 226 220 / 0.28)", left: "rgb(170 205 198 / 0.3)", right: "rgb(150 190 182 / 0.34)", stroke: "rgb(230 245 240 / 0.6)" },
  cutter: { top: "#ff8a55", left: "#ff6a2b", right: "#d14f17" },
} satisfies Record<string, Material>;

type BoxProps = { at: P3; size: P3; m: Material };

/** An isometric box: only the three faces visible from the default viewpoint are drawn. */
export function IsoBox({ at: [x, y, z], size: [w, d, h], m }: BoxProps) {
  const stroke = m.stroke ?? "rgb(20 16 10 / 0.35)";
  return (
    <g strokeWidth={0.6} stroke={stroke} strokeLinejoin="round">
      <polygon fill={m.left} points={poly([[x, y + d, z], [x + w, y + d, z], [x + w, y + d, z + h], [x, y + d, z + h]])} />
      <polygon fill={m.right} points={poly([[x + w, y, z], [x + w, y + d, z], [x + w, y + d, z + h], [x + w, y, z + h]])} />
      <polygon fill={m.top} points={poly([[x, y, z + h], [x + w, y, z + h], [x + w, y + d, z + h], [x, y + d, z + h]])} />
    </g>
  );
}

/** A rectangle lying on the front (+y) face plane at depth `y`. */
export function FrontOpening({ y, x: [x1, x2], z: [z1, z2], fill }: { y: number; x: [number, number]; z: [number, number]; fill: string }) {
  return <polygon fill={fill} points={poly([[x1, y, z1], [x2, y, z1], [x2, y, z2], [x1, y, z2]])} />;
}

/** A rectangle lying on the side (+x) face plane at `x`. */
export function SideOpening({ x, y: [y1, y2], z: [z1, z2], fill }: { x: number; y: [number, number]; z: [number, number]; fill: string }) {
  return <polygon fill={fill} points={poly([[x, y1, z1], [x, y2, z1], [x, y2, z2], [x, y1, z2]])} />;
}

export function Tree({ at: [x, y, z], h = 24, r = 11 }: { at: P3; h?: number; r?: number }) {
  const [cx, cy] = project([x + 1.5, y + 1.5, z + h + r * 0.6]).split(",").map(Number);
  return (
    <g>
      <IsoBox at={[x, y, z]} size={[3, 3, h]} m={MATERIALS.balsa} />
      <circle cx={cx} cy={cy} r={r} fill="#8fa37f" stroke="rgb(20 30 15 / 0.4)" strokeWidth={0.6} />
      <circle cx={cx - r * 0.3} cy={cy - r * 0.35} r={r * 0.35} fill="rgb(255 255 255 / 0.18)" />
    </g>
  );
}

/** Architectural model of a small house on a baseboard, split into layers that can be assembled one by one. */
export function IsoHouse({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="-150 -40 330 235" className={className} role="img" aria-label="Maquette isométrique d'une maison en carton mousse, balsa et calque">
      <ellipse cx="20" cy="150" rx="150" ry="22" fill="rgb(0 0 0 / 0.45)" style={{ filter: "blur(8px)" }} />
      <g data-mq-layer>
        <IsoBox at={[0, 0, 0]} size={[200, 160, 6]} m={MATERIALS.balsa} />
      </g>
      <g data-mq-layer>
        <IsoBox at={[8, 8, 6]} size={[184, 144, 4]} m={MATERIALS.kraft} />
        <IsoBox at={[8, 8, 10]} size={[110, 90, 4]} m={MATERIALS.kraft} />
      </g>
      <g data-mq-layer>
        <IsoBox at={[40, 30, 14]} size={[55, 45, 22]} m={MATERIALS.glass} />
      </g>
      <g data-mq-layer>
        <IsoBox at={[100, 60, 10]} size={[70, 60, 28]} m={MATERIALS.foam} />
        <FrontOpening y={120} x={[108, 162]} z={[14, 34]} fill="rgb(150 190 182 / 0.55)" />
      </g>
      <g data-mq-layer>
        <IsoBox at={[60, 40, 38]} size={[100, 55, 26]} m={MATERIALS.foam} />
        <FrontOpening y={95} x={[68, 152]} z={[46, 56]} fill="#2b2f2c" />
        <SideOpening x={160} y={[48, 86]} z={[46, 56]} fill="#3a3f3b" />
      </g>
      <g data-mq-layer>
        <IsoBox at={[56, 36, 64]} size={[108, 63, 3]} m={MATERIALS.balsa} />
      </g>
      <g data-mq-layer>
        <Tree at={[150, 132, 10]} />
        <Tree at={[28, 118, 10]} h={18} r={9} />
        <Tree at={[178, 30, 10]} h={20} r={8} />
        <IsoBox at={[128, 130, 10]} size={[3, 3, 9]} m={MATERIALS.cutter} />
      </g>
    </svg>
  );
}
