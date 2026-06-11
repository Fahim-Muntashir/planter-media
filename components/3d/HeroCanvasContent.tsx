"use client";

import { useRef, useMemo, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial, MeshDistortMaterial, Image, Float } from "@react-three/drei";
import * as THREE from "three";

// Generate random points in a sphere shell
function randomInSphere(count: number, radius: number) {
  const points = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    const r = radius * Math.cbrt(Math.random()); // distribute throughout sphere
    
    points[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    points[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    points[i * 3 + 2] = r * Math.cos(phi);
  }
  return points;
}

// Interactive glowing particles background
function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const { mouse } = useThree();
  
  const points = useMemo(() => randomInSphere(1200, 10), []);

  useFrame((state) => {
    if (!ref.current) return;
    
    // Rotate slowly
    ref.current.rotation.x = state.clock.getElapsedTime() * 0.03;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.05;

    // Subtle drift based on mouse
    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, mouse.x * 1.5, 0.05);
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, mouse.y * 1.5, 0.05);
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={points} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#9B7CFF"
          size={0.06}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

// Centerpiece abstract liquid sphere
function LiquidSphere() {
  const sphereRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  useFrame((state) => {
    if (!sphereRef.current) return;
    // Rotation
    sphereRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    sphereRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
    
    // Mouse interaction displacement
    const targetX = mouse.x * 0.8;
    const targetY = mouse.y * 0.8;
    sphereRef.current.position.x = THREE.MathUtils.lerp(sphereRef.current.position.x, targetX, 0.08);
    sphereRef.current.position.y = THREE.MathUtils.lerp(sphereRef.current.position.y, targetY, 0.08);
  });

  return (
    <mesh ref={sphereRef} scale={[1.8, 1.8, 1.8]}>
      <sphereGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial
        color="#2E1F6E"
        emissive="#1B0E3D"
        roughness={0.15}
        metalness={0.9}
        distort={0.4}
        speed={2.5}
        clearcoat={1}
        clearcoatRoughness={0.1}
      />
    </mesh>
  );
}

// 3D Card showing mock content
function Card3D({ url, position, rotation, speed = 1, scale = 1 }: { url: string; position: [number, number, number]; rotation: [number, number, number]; speed?: number; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    // Drift up and down
    meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 0.5 * speed) * 0.2;
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <Float speed={speed * 1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <Image
          url={url}
          transparent
          scale={[1.6 * scale, 2.2 * scale]}
          radius={0.08}
        />
      </Float>
    </mesh>
  );
}

// 3D Floating Social Media Icon (represented by colored glowing discs/cards with icons)
function FloatingIcon({ color, url, position, speed = 1 }: { color: string; url: string; position: [number, number, number]; speed?: number }) {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.position.y = position[1] + Math.cos(state.clock.getElapsedTime() * 0.7 * speed) * 0.15;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.4 * speed;
  });

  return (
    <group ref={meshRef} position={position}>
      <Float speed={speed} rotationIntensity={0.4} floatIntensity={0.2}>
        <mesh>
          <cylinderGeometry args={[0.35, 0.35, 0.05, 32]} />
          <meshPhysicalMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.8}
            roughness={0.1}
            metalness={0.8}
            transmission={0.6}
            thickness={0.2}
          />
        </mesh>
        {/* We place a flat texture on the cylinder to represent the icon */}
        <mesh position={[0, 0, 0.03]} rotation={[Math.PI / 2, 0, 0]}>
          <Image url={url} scale={[0.4, 0.4]} transparent />
        </mesh>
      </Float>
    </group>
  );
}

export default function HeroCanvasContent() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Use low performance mode on mobile: fewer cards, no distortion or lighter distortion
  return (
    <div style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ width: "100%", height: "100%" }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#9B7CFF" />
        <pointLight position={[-10, -10, -10]} intensity={1.0} color="#2E1F6E" />
        <directionalLight position={[0, 5, 5]} intensity={1.2} color="#FFFFFF" />

        {/* Glowing Centerpiece */}
        <LiquidSphere />

        {/* Glowing Particle Stars */}
        <ParticleField />

        {/* Floating Content Cards */}
        {!isMobile && (
          <Suspense fallback={null}>
            {/* Left Card - video style */}
            <Card3D
              url="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop"
              position={[-3.2, 1.2, 1]}
              rotation={[0, 0.2, -0.05]}
              speed={1.2}
              scale={1.1}
            />
            {/* Right Card - video style */}
            <Card3D
              url="https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=400&auto=format&fit=crop"
              position={[3.4, -1.0, 1.5]}
              rotation={[0, -0.25, 0.08]}
              speed={0.9}
              scale={1.0}
            />
            {/* Deep Background Card */}
            <Card3D
              url="https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=400&auto=format&fit=crop"
              position={[-2.5, -2.2, -1]}
              rotation={[0.1, 0.4, 0.0]}
              speed={0.8}
              scale={0.8}
            />
            {/* Social Icons floating around */}
            <FloatingIcon
              color="#FF0000" // YouTube
              url="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=100&auto=format&fit=crop"
              position={[-2.0, 2.5, 2]}
              speed={1.4}
            />
            <FloatingIcon
              color="#000000" // TikTok (using a dark slate/cyan representation)
              url="https://images.unsplash.com/photo-1598128558393-70ff21433be0?q=80&w=100&auto=format&fit=crop"
              position={[2.0, 2.2, 1.8]}
              speed={1.1}
            />
            <FloatingIcon
              color="#E1306C" // Instagram
              url="https://images.unsplash.com/photo-1611224885990-ab7363d1f2a9?q=80&w=100&auto=format&fit=crop"
              position={[2.8, 0.8, 0.5]}
              speed={1.3}
            />
            <FloatingIcon
              color="#0A66C2" // LinkedIn
              url="https://images.unsplash.com/photo-1611944212129-29977ae1398c?q=80&w=100&auto=format&fit=crop"
              position={[-1.2, -1.8, 2.5]}
              speed={1.0}
            />
          </Suspense>
        )}

        {isMobile && (
          // Mobile simplified cards to avoid lag
          <Suspense fallback={null}>
            <Card3D
              url="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=300&auto=format&fit=crop"
              position={[-1.8, 1.8, 0]}
              rotation={[0, 0.1, -0.02]}
              speed={0.8}
              scale={0.7}
            />
            <Card3D
              url="https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=300&auto=format&fit=crop"
              position={[1.8, -1.8, 0]}
              rotation={[0, -0.1, 0.02]}
              speed={0.7}
              scale={0.7}
            />
          </Suspense>
        )}
      </Canvas>
    </div>
  );
}
