"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Image, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// ─── Data ────────────────────────────────────────────────────────────────────

interface WallItem {
  id: string;
  url: string;
  videoUrl: string;
  title: string;
  views: string;
  accentColor: string;
}

const WALL_ITEMS: WallItem[] = [
  {
    id: "v1",
    url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/5UjK1C6D0z4",
    title: "Scale a SaaS to $10M ARR",
    views: "1.2M views",
    accentColor: "#6F4DFF",
  },
  {
    id: "v2",
    url: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=600&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/9ycxV82Z5eU",
    title: "The Creator Economy 2026",
    views: "850K views",
    accentColor: "#9B7CFF",
  },
  {
    id: "v3",
    url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=600&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/3uNee4U9sIY",
    title: "10 LinkedIn Growth Secrets",
    views: "520K views",
    accentColor: "#6F4DFF",
  },
  {
    id: "v4",
    url: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=600&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/gWIPW-3eDqQ",
    title: "Short-Form Video Masterclass",
    views: "2.4M views",
    accentColor: "#9B7CFF",
  },
  {
    id: "v5",
    url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/Z0bZ2jYxLuo",
    title: "Building a $50K/mo Agency",
    views: "1.1M views",
    accentColor: "#6F4DFF",
  },
  {
    id: "v6",
    url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/s3y_D2Z0V0w",
    title: "AI Automation Workflows",
    views: "430K views",
    accentColor: "#9B7CFF",
  },
  {
    id: "v7",
    url: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/L_G1P6c4oHk",
    title: "High-Performance Funnels",
    views: "980K views",
    accentColor: "#6F4DFF",
  },
  {
    id: "v8",
    url: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=600&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/m6p_v1k9RQM",
    title: "Personal Branding Playbook",
    views: "1.7M views",
    accentColor: "#9B7CFF",
  },
];

// ─── Particles ────────────────────────────────────────────────────────────────

function Stardust() {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(1200 * 3);
    for (let i = 0; i < 1200; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 30;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20 - 8;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.015;
    ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.008) * 0.1;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#9B7CFF"
        size={0.045}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// ─── Glowing neon border frame around each card ───────────────────────────────

function NeonFrame({
  width,
  height,
  color,
  opacity,
}: {
  width: number;
  height: number;
  color: string;
  opacity: number;
}) {
  const mat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(color),
        transparent: true,
        opacity,
        side: THREE.FrontSide,
      }),
    [color, opacity]
  );

  const frameThickness = 0.045;
  const depth = 0.01;

  // Four edge bars: top, bottom, left, right
  const edges = [
    { pos: [0,  height / 2, 0] as [number,number,number], size: [width + frameThickness * 2, frameThickness, depth] as [number,number,number] },
    { pos: [0, -height / 2, 0] as [number,number,number], size: [width + frameThickness * 2, frameThickness, depth] as [number,number,number] },
    { pos: [-width / 2, 0, 0] as [number,number,number], size: [frameThickness, height, depth] as [number,number,number] },
    { pos: [ width / 2, 0, 0] as [number,number,number], size: [frameThickness, height, depth] as [number,number,number] },
  ];

  return (
    <group>
      {edges.map((edge, i) => (
        <mesh key={i} position={edge.pos} material={mat}>
          <boxGeometry args={edge.size} />
        </mesh>
      ))}
    </group>
  );
}

// ─── Single card on the cylinder ─────────────────────────────────────────────

function CylinderCard({
  item,
  angle,
  radius,
  isFront,
}: {
  item: WallItem;
  angle: number;
  radius: number;
  isFront: boolean;
}) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Each card sits on the cylinder surface and faces the center
  const baseX = Math.sin(angle) * radius;
  const baseZ = Math.cos(angle) * radius;
  // Face toward camera (center of cylinder) 
  const faceY = -angle;

  // Target scale & z-push on hover
  const targetScale = hovered ? 1.1 : 1.0;
  const targetZPush  = hovered ? 0.5 : 0.0;

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
    return () => { document.body.style.cursor = "auto"; };
  }, [hovered]);

  useFrame((state) => {
    if (!meshRef.current) return;

    const t = state.clock.getElapsedTime();

    // Gentle vertical float
    const floatY = Math.sin(t * 0.6 + angle * 2) * 0.08;
    meshRef.current.position.y = floatY;

    // Smooth scale
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.1
    );

    // Push forward on hover (toward camera center)
    const pushX = Math.sin(faceY) * targetZPush;
    const pushZ = Math.cos(faceY) * targetZPush;
    meshRef.current.position.x = THREE.MathUtils.lerp(
      meshRef.current.position.x, baseX - pushX, 0.12
    );
    meshRef.current.position.z = THREE.MathUtils.lerp(
      meshRef.current.position.z, baseZ - pushZ, 0.12
    );
  });

  // Opacity fades cards at the extreme sides (> 90° off-center)
  // isFront tells us how close to front this card currently is
  const cardW = 1.8;  // Vertical width
  const cardH = 3.2;  // Vertical height (9:16)

  return (
    <group
      ref={meshRef}
      position={[baseX, 0, baseZ]}
      rotation={[0, faceY, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => {
        window.dispatchEvent(
          new CustomEvent("open-video-modal", {
            detail: {
              url: item.videoUrl,
              title: item.title,
              isShort: true,
            },
          })
        );
      }}
    >
      {/* Thumbnail image */}
      <Image
        url={item.url}
        transparent
        scale={[cardW, cardH]}
        radius={0.07}
        toneMapped={false}
        opacity={isFront ? 1 : 0.55}
      />

      {/* Futuristic phone notch/grille detail at the top */}
      <mesh position={[0, cardH / 2 - 0.08, 0.015]}>
        <planeGeometry args={[0.35, 0.06]} />
        <meshBasicMaterial color="#0B0B0F" />
      </mesh>

      {/* Neon border — brighter when front-facing or hovered */}
      <NeonFrame
        width={cardW}
        height={cardH}
        color={item.accentColor}
        opacity={hovered ? 0.95 : isFront ? 0.5 : 0.2}
      />

      {/* Inner glow plane behind image */}
      <mesh position={[0, 0, -0.05]}>
        <planeGeometry args={[cardW + 0.4, cardH + 0.4]} />
        <meshBasicMaterial
          color={new THREE.Color(item.accentColor)}
          transparent
          opacity={hovered ? 0.12 : 0.03}
          side={THREE.FrontSide}
        />
      </mesh>
    </group>
  );
}

// ─── Main exported component ─────────────────────────────────────────────────

export default function VideoWallContent({
  scrollProgress,
}: {
  scrollProgress: number;
}) {
  const { mouse } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const rotationRef = useRef(0);

  const RADIUS = 5.2;
  const TOTAL = WALL_ITEMS.length;

  // Each card's base angle in the cylinder
  const baseAngles = useMemo(
    () => WALL_ITEMS.map((_, i) => (i / TOTAL) * Math.PI * 2),
    [TOTAL]
  );

  useFrame(() => {
    if (!groupRef.current) return;

    // Scroll drives the rotation: 1 full revolution over the section
    const targetRotation = scrollProgress * Math.PI * 2;
    rotationRef.current = THREE.MathUtils.lerp(
      rotationRef.current,
      targetRotation,
      0.05
    );

    // Apply rotation + gentle mouse parallax tilt
    groupRef.current.rotation.y = rotationRef.current;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mouse.y * -0.08,
      0.05
    );
  });

  return (
    <group ref={groupRef}>
      <Stardust />

      {/* Central ambient glow — pulsing purple orb */}
      <pointLight
        position={[0, 0, 0]}
        intensity={4}
        distance={10}
        color="#6F4DFF"
      />
      <pointLight
        position={[0, 3, 0]}
        intensity={2}
        distance={8}
        color="#9B7CFF"
      />

      {WALL_ITEMS.map((item, i) => {
        // Current apparent angle (base + rotation offset) normalized
        const currentAngle =
          ((baseAngles[i] - rotationRef.current) % (Math.PI * 2) + Math.PI * 2) %
          (Math.PI * 2);
        // Cards within ±60° of front (angle ≈ 0 or 2π) are "front"
        const isFront =
          currentAngle < Math.PI / 3 || currentAngle > (Math.PI * 5) / 3;

        return (
          <CylinderCard
            key={item.id}
            item={item}
            angle={baseAngles[i]}
            radius={RADIUS}
            isFront={isFront}
          />
        );
      })}
    </group>
  );
}
