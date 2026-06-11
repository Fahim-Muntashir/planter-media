"use client";

import dynamic from "next/dynamic";

const HeroCanvasContent = dynamic(
  () => import("./HeroCanvasContent"),
  {
    ssr: false,
    loading: () => (
      // Transparent placeholder — same size as the section so layout doesn't jump
      <div className="absolute inset-0 w-full h-full bg-transparent" />
    ),
  }
);

export default function HeroCanvas() {
  return (
    // z-0: sits behind all text content, pointer-events-auto so Three.js mouse interactions work
    <div className="absolute inset-0 w-full h-full z-0 pointer-events-auto">
      <HeroCanvasContent />
    </div>
  );
}
