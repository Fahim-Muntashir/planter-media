"use client";

import React from "react";
import { Play, Monitor } from "lucide-react";
import { motion } from "framer-motion";

interface ShortItem {
  id: string;
  url: string;
  videoUrl: string;
  title: string;
  views: string;
  color: string;
}

const SHORTS: ShortItem[] = [
  {
    id: "s1",
    url: "https://img.youtube.com/vi/3ma4Veho7qA/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/3ma4Veho7qA",
    title: "Showing Google Ads transformation",
    views: "1.2M views",
    color: "#6F4DFF",
  },
  {
    id: "s2",
    url: "https://img.youtube.com/vi/zAgTecXcnyQ/maxresdefault.jpg",
    videoUrl: "https://youtube.com/embed/zAgTecXcnyQ?si=YOMqYob9ALgKLEfA",
    title: "Personal Brand Success",
    views: "850K views",
    color: "#9B7CFF",
  },
  {
    id: "s3",
    url: "https://img.youtube.com/vi/vzeDXHQrq/maxresdefault.jpg",
    videoUrl: "https://youtube.com/embed/vzeDXHQrq-A?si=s6-uuWJ8UFa6LgwV",
    title: "Container Ship Marketing",
    views: "520K views",
    color: "#6F4DFF",
  },
  {
    id: "s4",
    url: "https://img.youtube.com/vi/IuFBYwJZg6c/maxresdefault.jpg",
    videoUrl: "https://youtube.com/embed/IuFBYwJZg6c?si=14UfboIPegmG1HWH",
    title: "Clickup Sass Project",
    views: "2.4M views",
    color: "#9B7CFF",
  },
  {
    id: "s5",
    url: "https://img.youtube.com/vi/1VDDc3MVQlA/maxresdefault.jpg",
    videoUrl: "https://youtube.com/embed/1VDDc3MVQlA?si=NN9mbsxuIG_kKdbN",
    title: "Motiverse Yt Motivational Edit",
    views: "1.1M views",
    color: "#6F4DFF",
  },
  {
    id: "s6",
    url: "https://img.youtube.com/vi/uiKePzUjSow/maxresdefault.jpg",
    videoUrl: "https://youtube.com/embed/uiKePzUjSow?si=r4J2Gaw5Z6Ld4UvG",
    title: "The Truth About Solar Energy Savings",
    views: "430K views",
    color: "#9B7CFF",
  },
  {
    id: "s7",
    url: "https://img.youtube.com/vi/TQk9fHgHX5o/maxresdefault.jpg",
    videoUrl: "https://youtube.com/embed/TQk9fHgHX5o?si=w3oh30-zmhpubK8D",
    title: "6 figure month dropshiping product",
    views: "980K views",
    color: "#6F4DFF",
  },
  {
    id: "s8",
    url: "https://img.youtube.com/vi/_tNpYisW1DE/maxresdefault.jpg",
    videoUrl: "https://youtube.com/embed/_tNpYisW1DE?si=nAmyy02oAV8SmtA5",
    title: "Dropshipping Store Masterclass",
    views: "1.7M views",
    color: "#9B7CFF",
  },
];

const DOUBLE_SHORTS = [...SHORTS, ...SHORTS];

/** Auto-scroll speed (px / frame) when not being dragged */
const AUTO_SPEED = 1.0;

export default function VideoShowcase() {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  // ── All scroll state lives in refs so we never trigger re-renders in the RAF loop ──
  const offsetRef = React.useRef(0);       // current scroll position (px)
  const halfRef = React.useRef(0);       // half of track scrollWidth — the loop point
  const velRef = React.useRef(AUTO_SPEED); // current velocity (px/frame)
  const isDragging = React.useRef(false);
  const lastX = React.useRef(0);
  const dragVel = React.useRef(0);       // per-frame drag delta for momentum
  const hasDragged = React.useRef(false);

  // Cursor state — React state only for the cursor icon change
  const [grabbing, setGrabbing] = React.useState(false);

  // ── Main RAF loop ────────────────────────────────────────────────────────────
  React.useEffect(() => {
    let raf: number;

    const tick = () => {
      const track = trackRef.current;
      if (track) {
        // Measure half-width once after first layout
        if (halfRef.current === 0 && track.scrollWidth > 0) {
          halfRef.current = track.scrollWidth / 2;
        }

        if (!isDragging.current) {
          // Apply velocity (auto-scroll or momentum glide)
          offsetRef.current += velRef.current;

          // Decay drag momentum back toward auto-scroll speed
          if (velRef.current !== AUTO_SPEED) {
            velRef.current += (AUTO_SPEED - velRef.current) * 0.035;
            if (Math.abs(velRef.current - AUTO_SPEED) < 0.05) {
              velRef.current = AUTO_SPEED;
            }
          }
        }

        // Seamless infinite loop
        const half = halfRef.current;
        if (half > 0) {
          if (offsetRef.current >= half) offsetRef.current -= half;
          if (offsetRef.current < 0) offsetRef.current += half;
        }

        track.style.transform = `translateX(-${offsetRef.current}px)`;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // ── Pointer / touch helpers ──────────────────────────────────────────────────
  const startDrag = (clientX: number) => {
    isDragging.current = true;
    hasDragged.current = false;
    lastX.current = clientX;
    dragVel.current = 0;
    setGrabbing(true);
  };

  const moveDrag = (clientX: number) => {
    if (!isDragging.current) return;
    const delta = lastX.current - clientX; // positive = move track left (forward)
    if (Math.abs(delta) > 2) hasDragged.current = true;
    dragVel.current = delta;
    lastX.current = clientX;
    offsetRef.current += delta;
  };

  const endDrag = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    setGrabbing(false);
    // Hand off drag velocity to the auto loop for momentum
    velRef.current = dragVel.current;
  };

  // Mouse
  const onMouseDown = (e: React.MouseEvent) => { e.preventDefault(); startDrag(e.clientX); };
  const onMouseMove = (e: React.MouseEvent) => moveDrag(e.clientX);
  const onMouseUp = () => endDrag();
  const onMouseLeave = () => { if (isDragging.current) endDrag(); };

  // Touch
  const onTouchStart = (e: React.TouchEvent) => startDrag(e.touches[0].clientX);
  const onTouchMove = (e: React.TouchEvent) => { e.preventDefault(); moveDrag(e.touches[0].clientX); };
  const onTouchEnd = () => endDrag();

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <section
      id="showcase"
      className="relative w-full py-20 md:py-32 bg-dark-bg z-20 overflow-hidden"
    >
      <span id="work" className="absolute -top-20" aria-hidden="true" />

      {/* Ambient glows */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-accent/10 blur-[130px] opacity-40" />
        <div className="absolute top-1/3 right-1/4 translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-primary/15 blur-[120px] opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col gap-12 md:gap-16 items-center text-center relative z-10">

        {/* Header */}
        <div className="flex flex-col items-center gap-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-accent-light text-sm font-semibold tracking-wider uppercase">
            <Monitor className="w-4 h-4" />
            <span>Featured Work &amp; Showcase</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl text-white tracking-tight leading-tight drop-shadow-2xl">
            Our Work, In <span className="text-gradient">Short-Form</span>
          </h2>
          <p className="text-white/60 text-sm md:text-base">
            Grab &amp; drag to scroll · Release for momentum · Click to watch
          </p>
        </div>

        {/* ── Drag-scrollable carousel ─────────────────────────────── */}
        <div
          ref={wrapperRef}
          className="w-full overflow-hidden py-4 select-none relative z-10
            [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]"
          style={{
            cursor: grabbing ? "grabbing" : "grab",
            perspective: "1400px",
          }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Track — transform is written directly by the RAF loop */}
          <div
            ref={trackRef}
            className="flex gap-6 md:gap-10 w-max py-6 px-4 will-change-transform"
            style={{ transform: "translateX(0px)" }}
          >
            {DOUBLE_SHORTS.map((short, idx) => {
              const tiltAngle = idx % 2 === 0 ? -2 : 2;
              return (
                <motion.div
                  key={`${short.id}-${idx}`}
                  onClick={() => {
                    if (hasDragged.current) return; // suppress click when the user dragged
                    window.dispatchEvent(
                      new CustomEvent("open-video-modal", {
                        detail: { url: short.videoUrl, title: short.title, isShort: true },
                      })
                    );
                  }}
                  whileHover={{
                    scale: 1.07,
                    rotateY: 0,
                    rotateZ: 0,
                    y: -14,
                    boxShadow: `0 0 40px ${short.color}55`,
                    transition: { duration: 0.3 },
                  }}
                  style={{
                    transformStyle: "preserve-3d",
                    rotateY: tiltAngle * 1.5,
                    rotateZ: tiltAngle * 0.5,
                  }}
                  className="relative shrink-0 w-[180px] h-[320px] md:w-[230px] md:h-[408px] bg-black/95 p-2 md:p-3 rounded-[28px] md:rounded-[36px] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] group"
                >
                  {/* Bezel glare */}
                  <div className="absolute inset-px rounded-[26px] md:rounded-[34px] border border-white/5 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 pointer-events-none z-10" />

                  {/* Dynamic Island */}
                  <div className="absolute top-3 md:top-4 left-1/2 -translate-x-1/2 w-12 h-3.5 md:w-16 md:h-[18px] bg-black rounded-full z-20 border border-white/5 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-zinc-800 absolute right-3 md:right-4" />
                  </div>

                  {/* Home indicator */}
                  <div className="absolute bottom-1.5 md:bottom-2 left-1/2 -translate-x-1/2 w-16 md:w-24 h-0.5 md:h-1 bg-white/20 rounded-full z-20" />

                  {/* Screen */}
                  <div className="relative w-full h-full rounded-[20px] md:rounded-[26px] overflow-hidden bg-zinc-900">
                    <img
                      src={short.url}
                      alt={short.title}
                      draggable={false}
                      className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent z-10" />

                    {/* Play overlay */}
                    <div className="absolute inset-0 flex items-center justify-center z-[15] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/95 text-black flex items-center justify-center shadow-lg scale-90 group-hover:scale-100 transition-transform duration-300">
                        <Play className="w-5 h-5 md:w-6 md:h-6 fill-black translate-x-0.5" />
                      </div>
                    </div>

                    {/* Title */}
                    <div className="absolute bottom-4 inset-x-3 md:inset-x-4 z-[15] text-left space-y-1 select-none pointer-events-none">
                      <h4 className="font-display font-bold text-xs md:text-sm text-white line-clamp-2 leading-tight">
                        {short.title}
                      </h4>
                    </div>
                  </div>

                  {/* Neon glow */}
                  <div
                    className="absolute inset-0 -z-10 rounded-[28px] md:rounded-[36px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md pointer-events-none"
                    style={{ boxShadow: `0 0 25px ${short.color}`, border: `1.5px solid ${short.color}` }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Status bar */}
        <div className="w-full flex items-center justify-between text-[10px] md:text-xs text-white/40 font-mono select-none">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>LIVE SHOWCASE</span>
          </div>
          <div><span>DRAG TO SCROLL · CLICK TO WATCH</span></div>
          <div className="hidden sm:block">
            <span>NEXT.JS / FRAMER MOTION</span>
          </div>
        </div>

      </div>
    </section>
  );
}
