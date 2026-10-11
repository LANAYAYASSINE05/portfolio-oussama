"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Edges, Environment, Grid, Lightformer } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type Floor = {
  label: string;
  size: [number, number, number];
  offset: [number, number];
  rotation: number;
};

const FLOOR_HEIGHT = 0.95;
const SLAB = 0.12;

const floors: Floor[] = [
  { label: "RDC", size: [4.2, FLOOR_HEIGHT, 3.2], offset: [0, 0], rotation: 0 },
  { label: "R+1", size: [4.8, FLOOR_HEIGHT, 2.4], offset: [0.9, 0.35], rotation: 0 },
  { label: "R+2", size: [3.0, FLOOR_HEIGHT, 3.8], offset: [-0.7, -0.2], rotation: 0 },
  { label: "R+3", size: [3.9, FLOOR_HEIGHT, 2.1], offset: [0.4, 0.5], rotation: 0.18 },
];

const ACCENT = "#7ee0ff";

type SharedState = {
  scroll: { value: number };
  intro: { y: number }[];
};

function FloorLabel({ text, position }: { text: string; position: [number, number, number] }) {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 112;
    const ctx = canvas.getContext("2d")!;
    const family = getComputedStyle(document.documentElement).getPropertyValue("--font-jetbrains") || "monospace";
    ctx.fillStyle = "rgba(255,255,255,0.1)";
    ctx.strokeStyle = "rgba(255,255,255,0.35)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(6, 6, 244, 100, 50);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#ffffff";
    ctx.font = `500 44px ${family}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, 128, 58);
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    return tex;
  }, [text]);

  useEffect(() => () => texture.dispose(), [texture]);

  return (
    <sprite position={position} scale={[0.72, 0.315, 1]}>
      <spriteMaterial map={texture} transparent depthWrite={false} toneMapped={false} />
    </sprite>
  );
}

function FloorVolume({ floor, index, shared }: { floor: Floor; index: number; shared: React.RefObject<SharedState> }) {
  const ref = useRef<THREE.Group>(null);
  const [w, h, d] = floor.size;
  const baseY = index * FLOOR_HEIGHT;

  useFrame(() => {
    if (!ref.current) return;
    const explode = shared.current.scroll.value * index * 0.85;
    ref.current.position.y = baseY + explode + shared.current.intro[index].y;
  });

  return (
    <group ref={ref} position={[floor.offset[0], baseY, floor.offset[1]]} rotation={[0, floor.rotation, 0]}>
      <mesh position={[0, SLAB / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[w, SLAB, d]} />
        <meshStandardMaterial color="#1b2029" roughness={0.85} metalness={0.1} />
        <Edges color="#3a4554" />
      </mesh>

      <mesh position={[0, SLAB + (h - SLAB) / 2, 0]} castShadow>
        <boxGeometry args={[w - 0.24, h - SLAB, d - 0.24]} />
        <meshPhysicalMaterial
          color="#bfe9ff"
          transmission={1}
          roughness={0.18}
          thickness={0.6}
          ior={1.35}
          metalness={0}
          transparent
          opacity={0.9}
        />
        <Edges color={ACCENT} />
      </mesh>

      {Array.from({ length: Math.floor(w / 0.6) }).map((_, i, arr) => {
        const x = -w / 2 + 0.3 + (i * (w - 0.6)) / Math.max(1, arr.length - 1);
        return (
          <mesh key={i} position={[x, SLAB + (h - SLAB) / 2, d / 2 - 0.1]}>
            <boxGeometry args={[0.03, h - SLAB, 0.03]} />
            <meshStandardMaterial color="#9fb4c6" metalness={0.8} roughness={0.3} />
          </mesh>
        );
      })}

      <FloorLabel text={floor.label} position={[w / 2 + 0.5, h / 2, 0]} />
    </group>
  );
}

function Building({ shared }: { shared: React.RefObject<SharedState> }) {
  const group = useRef<THREE.Group>(null);
  const roof = useRef<THREE.Mesh>(null);
  const size = useThree((s) => s.size);
  const target = useMemo(() => new THREE.Vector3(0, 1.6, 0), []);
  const xOffset = size.width > 1100 ? 3.4 : size.width > 700 ? 2.6 : 1.2;

  useFrame((state, delta) => {
    if (!group.current) return;
    const p = shared.current.scroll.value;
    const targetY = -0.6 + state.pointer.x * 0.35 + p * 0.9;
    const targetX = state.pointer.y * 0.06;
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, targetY, 3, delta);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, targetX, 3, delta);

    if (roof.current) {
      roof.current.position.y = floors.length * FLOOR_HEIGHT + p * floors.length * 0.85 + shared.current.intro[floors.length - 1].y;
    }

    const { camera } = state;
    camera.position.y = THREE.MathUtils.damp(camera.position.y, 6 + p * 3, 2, delta);
    camera.lookAt(target.set(0, 1.6 + p * 1.6, 0));
  });

  return (
    <group ref={group} position={[xOffset, 0, 0]}>
      {floors.map((f, i) => (
        <FloorVolume key={f.label} floor={f} index={i} shared={shared} />
      ))}
      <mesh ref={roof} position={[0.4, floors.length * FLOOR_HEIGHT, 0.5]} rotation={[0, 0.18, 0]} castShadow>
        <boxGeometry args={[4.3, SLAB, 2.5]} />
        <meshStandardMaterial color="#1b2029" roughness={0.85} />
        <Edges color={ACCENT} />
      </mesh>
      {[-1.8, 1.8].map((x) =>
        [-1.3, 1.3].map((z) => (
          <mesh key={`${x}${z}`} position={[x, FLOOR_HEIGHT * 1.5, z]}>
            <cylinderGeometry args={[0.04, 0.04, FLOOR_HEIGHT * 3, 12]} />
            <meshStandardMaterial color="#c9d6e2" metalness={0.9} roughness={0.25} />
          </mesh>
        )),
      )}
      <ContactShadows position={[0, 0.005, 0]} scale={14} blur={2.6} opacity={0.6} far={6} color="#000000" />
    </group>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight position={[6, 9, 4]} intensity={1.4} color="#fff3e2" castShadow />
      <pointLight position={[-4, 2, 4]} intensity={8} color={ACCENT} distance={12} />
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={2.5} position={[0, 6, -8]} scale={[12, 4, 1]} />
        <Lightformer form="rect" intensity={1.2} color={ACCENT} position={[-8, 2, 2]} rotation-y={Math.PI / 2} scale={[8, 3, 1]} />
        <Lightformer form="ring" intensity={2} color="#b9a8ff" position={[6, 3, 4]} scale={2.5} />
      </Environment>
    </>
  );
}

export default function Maquette({
  trigger,
  introDone,
}: {
  trigger: React.RefObject<HTMLElement | null>;
  introDone: boolean;
}) {
  const wrapper = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const shared = useRef<SharedState>({ scroll: { value: 0 }, intro: floors.map(() => ({ y: 8 })) });

  useEffect(() => {
    const el = wrapper.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!trigger.current) return;
    const st = ScrollTrigger.create({
      trigger: trigger.current,
      start: "top top",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        shared.current.scroll.value = self.progress;
      },
    });
    return () => st.kill();
  }, [trigger, shared]);

  useEffect(() => {
    if (!introDone) return;
    const tween = gsap.to(shared.current.intro, {
      y: 0,
      duration: 1.6,
      ease: "expo.out",
      stagger: 0.18,
      delay: 0.3,
    });
    return () => {
      tween.kill();
    };
  }, [introDone, shared]);

  return (
    <div ref={wrapper} className="absolute inset-0">
      <Canvas
        shadows="percentage"
        dpr={[1, 1.75]}
        frameloop={visible ? "always" : "never"}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
        camera={{ position: [11, 6, 14], fov: 30 }}
        eventSource={trigger as React.RefObject<HTMLElement>}
        eventPrefix="client"
      >
        <fog attach="fog" args={["#07090d", 14, 30]} />
        <Lights />
        <Building shared={shared} />
        <Grid
          position={[0, 0, 0]}
          args={[40, 40]}
          cellSize={0.5}
          cellThickness={0.6}
          cellColor="#16202b"
          sectionSize={2.5}
          sectionThickness={1}
          sectionColor="#24506a"
          fadeDistance={26}
          fadeStrength={1.6}
          infiniteGrid
        />
      </Canvas>
    </div>
  );
}
