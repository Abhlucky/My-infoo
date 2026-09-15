import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text, Sparkles, Line } from "@react-three/drei";
import * as THREE from "three";
import { useMemo, useRef, Suspense } from "react";
import { scrollState, CHAPTER_COUNT } from "../lib/scrollState";

export const STEP = 34;
export const START_Z = 14;
export const TOTAL_DEPTH = CHAPTER_COUNT * STEP;

export function chapterZ(i: number) {
  return START_Z - (i + 0.55) * STEP;
}

const LOW_POWER = scrollState.isTouch || scrollState.reducedMotion;

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

/* ---------------------------------------------------------------- */
/* Camera rig — the entire "scroll = camera" system lives here       */
/* ---------------------------------------------------------------- */
function CameraRig() {
  const { camera } = useThree();

  useFrame((_, delta) => {
    const d = Math.min(1, delta * 2.5);
    scrollState.smooth += (scrollState.raw - scrollState.smooth) * d;

    const targetZ = START_Z - scrollState.smooth * TOTAL_DEPTH;
    const mx = scrollState.mouseX || 0;
    const my = scrollState.mouseY || 0;

    camera.position.x += (mx * 1.1 - camera.position.x) * 0.045;
    camera.position.y += (-my * 0.7 - camera.position.y) * 0.045;
    camera.position.z += (targetZ - camera.position.z) * 0.085;

    camera.rotation.z = THREE.MathUtils.lerp(camera.rotation.z, mx * -0.015, 0.05);

    const lookTarget = new THREE.Vector3(mx * 1.4, -my * 1.0, camera.position.z - 22);
    camera.lookAt(lookTarget);

    const targetFov = 48 + Math.sin(scrollState.smooth * Math.PI * 2) * 2.2;
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov += (targetFov - camera.fov) * 0.04;
      camera.updateProjectionMatrix();
    }

    const idx = Math.min(
      CHAPTER_COUNT - 1,
      Math.max(0, Math.floor(scrollState.smooth * CHAPTER_COUNT))
    );
    if (scrollState.chapter !== idx) scrollState.chapter = idx;
  });

  return null;
}

/* ---------------------------------------------------------------- */
/* Depth-aware group: scales / rotates based on distance to camera   */
/* ---------------------------------------------------------------- */
function useDepthRef(z: number, range = STEP) {
  const ref = useRef<THREE.Group>(null!);
  useFrame((state) => {
    if (!ref.current) return;
    const dist = Math.abs(state.camera.position.z - z);
    const t = THREE.MathUtils.clamp(1 - dist / (range * 1.15), 0, 1);
    const s = THREE.MathUtils.lerp(0.55, 1.1, t);
    ref.current.scale.setScalar(s);
  });
  return ref;
}

/* ---------------------------------------------------------------- */
/* Ambient particle field spanning the entire journey                */
/* ---------------------------------------------------------------- */
function ParticleField() {
  const count = LOW_POWER ? 700 : 2200;
  const ref = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = rand(-40, 40);
      arr[i * 3 + 1] = rand(-24, 24);
      arr[i * 3 + 2] = rand(START_Z, START_Z - TOTAL_DEPTH - 30);
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.006;
    const mat = ref.current.material as THREE.PointsMaterial;
    mat.opacity = 0.55 + Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        color="#8fb8ff"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ---------------------------------------------------------------- */
/* 00 — Hero core                                                    */
/* ---------------------------------------------------------------- */
function HeroCore() {
  const g = useDepthRef(START_Z - 4, 20);
  const core = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const s = 1 + Math.sin(t * 1.4) * 0.08;
    if (core.current) core.current.scale.setScalar(s);
  });
  return (
    <group ref={g} position={[0, 0, START_Z - 4]}>
      <mesh ref={core}>
        <icosahedronGeometry args={[0.9, 2]} />
        <meshStandardMaterial
          color="#5eb1ff"
          emissive="#5eb1ff"
          emissiveIntensity={2.2}
          wireframe
        />
      </mesh>
      <pointLight color="#5eb1ff" intensity={12} distance={18} />
      {!LOW_POWER && <Sparkles count={120} scale={7} size={2} speed={0.3} color="#9a7bff" />}
    </group>
  );
}

/* ---------------------------------------------------------------- */
/* 01 — About: original abstract silhouette                          */
/* ---------------------------------------------------------------- */
function AboutFigure({ z, scale = 1, opacity = 1 }: { z: number; scale?: number; opacity?: number }) {
  const g = useDepthRef(z);
  const inner = useRef<THREE.Group>(null!);
  useFrame((state) => {
    if (inner.current) inner.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.25;
  });
  return (
    <group ref={g} position={[5.5 * scale, -1.2, z]}>
      <group ref={inner} scale={scale}>
        <mesh position={[0, 2.4, 0]}>
          <sphereGeometry args={[0.55, 24, 24]} />
          <meshStandardMaterial color="#04040a" emissive="#5eb1ff" emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[0, 0.6, 0]}>
          <coneGeometry args={[1.05, 3.4, 24, 1, true]} />
          <meshStandardMaterial
            color="#050510"
            emissive="#9a7bff"
            emissiveIntensity={0.35}
            side={THREE.DoubleSide}
            transparent
            opacity={opacity}
          />
        </mesh>
        <mesh position={[0, 0.6, 0]}>
          <coneGeometry args={[1.1, 3.5, 24, 1, true]} />
          <meshBasicMaterial color="#5eb1ff" wireframe transparent opacity={0.25 * opacity} />
        </mesh>
      </group>
      {!LOW_POWER && <Sparkles count={60} scale={5} size={1.6} speed={0.25} color="#5eb1ff" />}
    </group>
  );
}

/* ---------------------------------------------------------------- */
/* 02 — Journey timeline                                              */
/* ---------------------------------------------------------------- */
const MILESTONES = ["JEE \u2022 92%ILE", "IIT PATNA", "AI / ML", "PYTHON", "VIBE CODING", "BUILDING"];

function JourneyTimeline({ z }: { z: number }) {
  const g = useDepthRef(z, STEP * 1.4);
  const points = useMemo(() => {
    const arr: [number, number, number][] = [];
    for (let i = 0; i < MILESTONES.length; i++) arr.push([0, 0, -i * 6]);
    return arr;
  }, []);
  return (
    <group ref={g} position={[0, 0, z + 16]}>
      <Line points={points} color="#5eb1ff" lineWidth={1.4} transparent opacity={0.5} />
      {MILESTONES.map((m, i) => (
        <group key={m} position={[0, 0, -i * 6]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.8, 0.02, 8, 40]} />
            <meshBasicMaterial color="#9a7bff" transparent opacity={0.6} />
          </mesh>
          <Text
            position={[1.6, 0, 0]}
            fontSize={0.55}
            color="#f2f3f7"
            anchorX="left"
            anchorY="middle"
            letterSpacing={0.05}
          >
            {m}
          </Text>
        </group>
      ))}
    </group>
  );
}

/* ---------------------------------------------------------------- */
/* 03 — JEE 92                                                        */
/* ---------------------------------------------------------------- */
function JeeBig({ z }: { z: number }) {
  const g = useDepthRef(z);
  const ring = useRef<THREE.Group>(null!);
  useFrame((_, delta) => {
    if (ring.current) ring.current.rotation.z += delta * 0.15;
  });
  return (
    <group ref={g} position={[0, 0, z]}>
      <Text fontSize={4.4} color="#f2f3f7" anchorX="center" anchorY="middle" letterSpacing={-0.02}>
        19
      </Text>
      <Text position={[0, -2.1, 0]} fontSize={0.5} color="#5eb1ff" letterSpacing={0.35}>
        Age
      </Text>
      <group ref={ring}>
        {!LOW_POWER && <Sparkles count={150} scale={[10, 10, 2]} size={1.8} speed={0.4} color="#9a7bff" />}
      </group>
    </group>
  );
}

/* ---------------------------------------------------------------- */
/* Shared neural-network builder for AI + ML sections                */
/* ---------------------------------------------------------------- */
function useNetwork(nodeCount: number, spread: number, structured: boolean) {
  return useMemo(() => {
    const pts: THREE.Vector3[] = [];
    if (structured) {
      const gridN = Math.ceil(Math.sqrt(nodeCount));
      for (let i = 0; i < nodeCount; i++) {
        const gx = (i % gridN) / gridN - 0.5;
        const gy = Math.floor(i / gridN) / gridN - 0.5;
        pts.push(new THREE.Vector3(gx * spread, gy * spread, rand(-2, 2)));
      }
    } else {
      for (let i = 0; i < nodeCount; i++) {
        pts.push(new THREE.Vector3(rand(-spread / 2, spread / 2), rand(-spread / 2.4, spread / 2.4), rand(-4, 4)));
      }
    }
    const segments: number[] = [];
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        if (pts[i].distanceTo(pts[j]) < spread * 0.16) {
          segments.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z);
        }
      }
    }
    return { pts, lineArray: new Float32Array(segments) };
  }, [nodeCount, spread, structured]);
}

function NetworkVisual({ z, structured, label }: { z: number; structured: boolean; label: string }) {
  const g = useDepthRef(z);
  const nodesRef = useRef<THREE.Points>(null!);
  const count = LOW_POWER ? 40 : 90;
  const { pts, lineArray } = useNetwork(count, 12, structured);

  const nodePositions = useMemo(() => {
    const arr = new Float32Array(pts.length * 3);
    pts.forEach((p, i) => {
      arr[i * 3] = p.x;
      arr[i * 3 + 1] = p.y;
      arr[i * 3 + 2] = p.z;
    });
    return arr;
  }, [pts]);

  useFrame((state) => {
    if (!nodesRef.current) return;
    const mx = scrollState.mouseX || 0;
    const my = scrollState.mouseY || 0;
    nodesRef.current.rotation.y = mx * 0.25 + Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    nodesRef.current.rotation.x = -my * 0.15;
  });

  return (
    <group ref={g} position={[0, 0.3, z]}>
      <points ref={nodesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.16}
          color={structured ? "#9a7bff" : "#5eb1ff"}
          transparent
          opacity={0.9}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[lineArray, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#5eb1ff" transparent opacity={0.18} />
      </lineSegments>
      <Text position={[0, -5.6, 0]} fontSize={0.35} color="#8b8f9c" letterSpacing={0.3}>
        {label}
      </Text>
    </group>
  );
}

/* ---------------------------------------------------------------- */
/* 06 — Python code fragments                                        */
/* ---------------------------------------------------------------- */
const CODE_WORDS = ["print()", "variables", "loops", "functions", "lists", "dictionaries", "logic"];

function PythonScene({ z }: { z: number }) {
  const g = useDepthRef(z);
  const positions = useMemo(
    () => CODE_WORDS.map(() => [rand(-6, 6), rand(-3.4, 3.6), rand(-6, 5)] as [number, number, number]),
    []
  );
  const cursor = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (cursor.current) {
      cursor.current.visible = Math.sin(state.clock.elapsedTime * 6) > 0;
    }
  });
  return (
    <group ref={g} position={[0, 0, z]}>
      {CODE_WORDS.map((w, i) => (
        <Text
          key={w}
          position={positions[i]}
          fontSize={0.42}
          color="#5eb1ff"
          font={undefined}
          anchorX="center"
          anchorY="middle"
        >
          {`> ${w}`}
        </Text>
      ))}
      <mesh ref={cursor} position={[0, -3.2, 1]}>
        <planeGeometry args={[0.16, 0.42]} />
        <meshBasicMaterial color="#f2f3f7" />
      </mesh>
    </group>
  );
}

/* ---------------------------------------------------------------- */
/* 07 — Vibe coding floating windows                                  */
/* ---------------------------------------------------------------- */
const WINDOW_LABELS = ["CODE", "IDEAS", "AI", "DESIGN", "EXPERIMENTS", "PROJECTS", "CODE", "IDEAS"];

function VibeWindows({ z }: { z: number }) {
  const g = useDepthRef(z);
  const group = useRef<THREE.Group>(null!);
  const items = useMemo(
    () =>
      WINDOW_LABELS.map(() => ({
        pos: [rand(-6.5, 6.5), rand(-3.6, 3.6), rand(-6, 6)] as [number, number, number],
        rot: rand(-0.4, 0.4),
        speed: rand(0.15, 0.4),
      })),
    []
  );
  useFrame((state) => {
    if (!group.current) return;
    group.current.children.forEach((child, i) => {
      child.rotation.y = Math.sin(state.clock.elapsedTime * items[i].speed + i) * 0.5;
      child.position.y = items[i].pos[1] + Math.sin(state.clock.elapsedTime * 0.4 + i) * 0.3;
    });
  });
  return (
    <group ref={g} position={[0, 0, z]}>
      <group ref={group}>
        {items.map((it, i) => (
          <group key={i} position={it.pos} rotation={[0, it.rot, 0]}>
            <mesh>
              <planeGeometry args={[1.7, 1.1]} />
              <meshBasicMaterial color="#0a0a14" transparent opacity={0.55} side={THREE.DoubleSide} />
            </mesh>
            <lineSegments>
              <edgesGeometry args={[new THREE.PlaneGeometry(1.7, 1.1)]} />
              <lineBasicMaterial color="#5eb1ff" transparent opacity={0.6} />
            </lineSegments>
            <Text fontSize={0.2} color="#f2f3f7" letterSpacing={0.15}>
              {WINDOW_LABELS[i]}
            </Text>
          </group>
        ))}
      </group>
    </group>
  );
}

/* ---------------------------------------------------------------- */
/* 08 — Idea engine                                                   */
/* ---------------------------------------------------------------- */
function IdeaEngine({ z }: { z: number }) {
  const g = useDepthRef(z);
  const r1 = useRef<THREE.Mesh>(null!);
  const r2 = useRef<THREE.Mesh>(null!);
  const r3 = useRef<THREE.Mesh>(null!);
  useFrame((_, delta) => {
    if (r1.current) r1.current.rotation.x += delta * 0.5;
    if (r2.current) r2.current.rotation.y += delta * 0.35;
    if (r3.current) r3.current.rotation.z += delta * 0.65;
  });
  return (
    <group ref={g} position={[0, 0, z]}>
      <mesh>
        <icosahedronGeometry args={[0.7, 1]} />
        <meshStandardMaterial color="#5eb1ff" emissive="#5eb1ff" emissiveIntensity={1.6} />
      </mesh>
      <mesh ref={r1} rotation={[0.4, 0, 0]}>
        <torusGeometry args={[2, 0.03, 8, 64]} />
        <meshBasicMaterial color="#5eb1ff" transparent opacity={0.7} />
      </mesh>
      <mesh ref={r2} rotation={[1.1, 0.3, 0]}>
        <torusGeometry args={[2.9, 0.03, 8, 64]} />
        <meshBasicMaterial color="#9a7bff" transparent opacity={0.55} />
      </mesh>
      <mesh ref={r3} rotation={[0.2, 1.2, 0]}>
        <torusGeometry args={[3.7, 0.02, 8, 64]} />
        <meshBasicMaterial color="#f2f3f7" transparent opacity={0.35} />
      </mesh>
      <pointLight color="#5eb1ff" intensity={8} distance={12} />
    </group>
  );
}

/* ---------------------------------------------------------------- */
/* 09 — Experiments room                                              */
/* ---------------------------------------------------------------- */
const EXP_GEOMS = ["icosahedron", "octahedron", "dodecahedron", "torusKnot"] as const;

function ExperimentsRoom({ z }: { z: number }) {
  const g = useDepthRef(z, STEP * 1.2);
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  const positions: [number, number, number][] = [
    [-4.4, 1.4, 0],
    [4.4, 1.4, -1],
    [-4.4, -1.8, -1],
    [4.4, -1.8, 0],
  ];
  useFrame((_state, delta) => {
    refs.current.forEach((m, i) => {
      if (!m) return;
      m.rotation.x += delta * 0.25;
      m.rotation.y += delta * 0.2;
      const hovered = scrollState.hoveredProject === i;
      const targetScale = hovered ? 1.4 : 1;
      m.scale.setScalar(THREE.MathUtils.lerp(m.scale.x, targetScale, 0.08));
      const mat = m.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = THREE.MathUtils.lerp(
        mat.emissiveIntensity,
        hovered ? 2.2 : 0.5,
        0.1
      );
    });
  });
  return (
    <group ref={g} position={[0, 0, z]}>
      {positions.map((p, i) => (
        <mesh
          key={i}
          position={p}
          ref={(el) => {
            refs.current[i] = el;
          }}
        >
          {EXP_GEOMS[i] === "icosahedron" && <icosahedronGeometry args={[0.85, 0]} />}
          {EXP_GEOMS[i] === "octahedron" && <octahedronGeometry args={[0.95, 0]} />}
          {EXP_GEOMS[i] === "dodecahedron" && <dodecahedronGeometry args={[0.85, 0]} />}
          {EXP_GEOMS[i] === "torusKnot" && <torusKnotGeometry args={[0.55, 0.18, 100, 16]} />}
          <meshStandardMaterial color="#0d0d16" emissive="#5eb1ff" emissiveIntensity={0.5} wireframe />
        </mesh>
      ))}
      {!LOW_POWER && <Sparkles count={100} scale={12} size={1.4} speed={0.3} color="#9a7bff" />}
    </group>
  );
}

/* ---------------------------------------------------------------- */
/* 10 — Digital soul sphere                                           */
/* ---------------------------------------------------------------- */
const SOUL_WORDS = ["LEARN", "BUILD", "BREAK", "UNDERSTAND", "REBUILD"];

function DigitalSoul({ z }: { z: number }) {
  const g = useDepthRef(z);
  const orbit = useRef<THREE.Group>(null!);
  useFrame((_, delta) => {
    if (orbit.current) orbit.current.rotation.y += delta * 0.2;
  });
  return (
    <group ref={g} position={[0, 0, z]}>
      <mesh>
        <icosahedronGeometry args={[2, 3]} />
        <meshBasicMaterial color="#5eb1ff" wireframe transparent opacity={0.4} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.4, 32, 32]} />
        <meshStandardMaterial color="#04040a" emissive="#9a7bff" emissiveIntensity={0.5} transparent opacity={0.7} />
      </mesh>
      <pointLight color="#9a7bff" intensity={6} distance={14} />
      <group ref={orbit}>
        {SOUL_WORDS.map((w, i) => {
          const a = (i / SOUL_WORDS.length) * Math.PI * 2;
          return (
            <Text
              key={w}
              position={[Math.cos(a) * 4.2, Math.sin(a * 1.3) * 1.2, Math.sin(a) * 4.2]}
              fontSize={0.4}
              color="#f2f3f7"
              letterSpacing={0.2}
            >
              {w}
            </Text>
          );
        })}
      </group>
    </group>
  );
}

/* ---------------------------------------------------------------- */
/* 11 — Future path                                                   */
/* ---------------------------------------------------------------- */
function FuturePath({ z }: { z: number }) {
  const g = useDepthRef(z, STEP * 1.3);
  const lines = useMemo(() => {
    const arr: [number, number, number][][] = [];
    for (let i = -10; i <= 10; i++) {
      arr.push([
        [i, -3, 10],
        [i, -3, -60],
      ]);
    }
    return arr;
  }, []);
  return (
    <group ref={g} position={[0, 0, z]}>
      {lines.map((pts, i) => (
        <Line key={i} points={pts} color="#5eb1ff" transparent opacity={0.12} lineWidth={1} />
      ))}
      <Line points={[[0, -3, 10], [0, -3, -60]]} color="#9a7bff" transparent opacity={0.6} lineWidth={2} />
      <pointLight position={[0, 2, -30]} color="#9a7bff" intensity={10} distance={40} />
    </group>
  );
}

/* ---------------------------------------------------------------- */
/* 12 — Contact: quiet city                                           */
/* ---------------------------------------------------------------- */
function ContactCity({ z }: { z: number }) {
  const g = useDepthRef(z, STEP * 1.3);
  const buildings = useMemo(
    () =>
      Array.from({ length: 16 }, () => ({
        pos: [rand(-9, 9), 0, rand(-8, 6)] as [number, number, number],
        h: rand(1.5, 5.5),
        w: rand(0.5, 1.1),
      })),
    []
  );
  const rainCount = LOW_POWER ? 200 : 700;
  const rainRef = useRef<THREE.Points>(null!);
  const rainPositions = useMemo(() => {
    const arr = new Float32Array(rainCount * 3);
    for (let i = 0; i < rainCount; i++) {
      arr[i * 3] = rand(-12, 12);
      arr[i * 3 + 1] = rand(-6, 10);
      arr[i * 3 + 2] = rand(-10, 10);
    }
    return arr;
  }, [rainCount]);

  useFrame((_, delta) => {
    if (!rainRef.current) return;
    const arr = (rainRef.current.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
    for (let i = 0; i < rainCount; i++) {
      arr[i * 3 + 1] -= delta * 4;
      if (arr[i * 3 + 1] < -6) arr[i * 3 + 1] = 10;
    }
    rainRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group ref={g} position={[0, -1, z]}>
      {buildings.map((b, i) => (
        <group key={i} position={[b.pos[0], b.h / 2 - 3, b.pos[2]]}>
          <mesh>
            <boxGeometry args={[b.w, b.h, b.w]} />
            <meshStandardMaterial color="#050509" emissive="#3a6fb0" emissiveIntensity={0.25} />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(b.w, b.h, b.w)]} />
            <lineBasicMaterial color="#5eb1ff" transparent opacity={0.4} />
          </lineSegments>
        </group>
      ))}
      <mesh position={[6, 7, -12]}>
        <sphereGeometry args={[1.1, 24, 24]} />
        <meshBasicMaterial color="#eef3ff" />
      </mesh>
      <points ref={rainRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[rainPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.03} color="#9fc6ff" transparent opacity={0.5} sizeAttenuation />
      </points>
      <AboutFigure z={0} scale={0.6} opacity={0.5} />
    </group>
  );
}

/* ---------------------------------------------------------------- */
/* Lights                                                             */
/* ---------------------------------------------------------------- */
function SceneLights() {
  const l1 = useRef<THREE.PointLight>(null!);
  useFrame((state) => {
    if (l1.current) {
      l1.current.position.x = Math.sin(state.clock.elapsedTime * 0.2) * 10;
      l1.current.position.z = state.camera.position.z - 10;
    }
  });
  return (
    <>
      <ambientLight intensity={0.18} color="#8fa5ff" />
      <pointLight ref={l1} color="#5eb1ff" intensity={4} distance={30} />
    </>
  );
}

/* ---------------------------------------------------------------- */
/* Assembled world                                                    */
/* ---------------------------------------------------------------- */
function SceneContents() {
  return (
    <>
      <fog attach="fog" args={["#05050a", 8, 46]} />
      <CameraRig />
      <SceneLights />
      <ParticleField />
      <HeroCore />
      <AboutFigure z={chapterZ(1)} />
      <JourneyTimeline z={chapterZ(2)} />
      <JeeBig z={chapterZ(3)} />
      <NetworkVisual z={chapterZ(4)} structured={false} label="NEURAL ACTIVITY" />
      <NetworkVisual z={chapterZ(5)} structured label="CURRENTLY EXPLORING" />
      <PythonScene z={chapterZ(6)} />
      <VibeWindows z={chapterZ(7)} />
      <IdeaEngine z={chapterZ(8)} />
      <ExperimentsRoom z={chapterZ(9)} />
      <DigitalSoul z={chapterZ(10)} />
      <FuturePath z={chapterZ(11)} />
      <ContactCity z={chapterZ(12)} />
    </>
  );
}

export default function World() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        dpr={[1, LOW_POWER ? 1.3 : 2]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, START_Z], fov: 48, near: 0.1, far: 200 }}
      >
        <color attach="background" args={["#05050a"]} />
        <Suspense fallback={null}>
          <SceneContents />
        </Suspense>
      </Canvas>
    </div>
  );
}
