"use client";

import { Canvas } from "@react-three/fiber";
import VideoWallContent from "./VideoWallContent";

interface VideoWallCanvasContentProps {
  scrollProgress: number;
}

export default function VideoWallCanvasContent({ scrollProgress }: VideoWallCanvasContentProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.5], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.8} />
      <pointLight position={[8, 8, 8]} intensity={1.5} color="#9B7CFF" />
      <pointLight position={[-8, -8, -8]} intensity={0.8} color="#2E1F6E" />
      <directionalLight position={[0, 5, 5]} intensity={1.0} color="#FFFFFF" />

      <VideoWallContent scrollProgress={scrollProgress} />
    </Canvas>
  );
}
