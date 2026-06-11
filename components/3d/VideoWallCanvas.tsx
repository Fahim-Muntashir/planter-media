"use client";

import dynamic from "next/dynamic";

const VideoWallCanvasContent = dynamic(
  () => import("./VideoWallCanvasContent"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-transparent">
        <div className="w-12 h-12 border-2 border-accent/30 border-t-accent rounded-full animate-spin"></div>
      </div>
    ),
  }
);

interface VideoWallCanvasProps {
  scrollProgress: number;
}

export default function VideoWallCanvas({ scrollProgress }: VideoWallCanvasProps) {
  return (
    <div className="w-full h-full z-0 pointer-events-auto">
      <VideoWallCanvasContent scrollProgress={scrollProgress} />
    </div>
  );
}
