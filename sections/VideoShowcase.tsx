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
    url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/5UjK1C6D0z4",
    title: "Scale a SaaS to $10M ARR",
    views: "1.2M views",
    color: "#6F4DFF",
  },
  {
    id: "s2",
    url: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=600&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/9ycxV82Z5eU",
    title: "The Creator Economy 2026",
    views: "850K views",
    color: "#9B7CFF",
  },
  {
    id: "s3",
    url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=600&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/3uNee4U9sIY",
    title: "10 LinkedIn Growth Secrets",
    views: "520K views",
    color: "#6F4DFF",
  },
  {
    id: "s4",
    url: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=600&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/gWIPW-3eDqQ",
    title: "Short-Form Video Masterclass",
    views: "2.4M views",
    color: "#9B7CFF",
  },
  {
    id: "s5",
    url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/Z0bZ2jYxLuo",
    title: "Building a $50K/mo Agency",
    views: "1.1M views",
    color: "#6F4DFF",
  },
  {
    id: "s6",
    url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/s3y_D2Z0V0w",
    title: "AI Automation Workflows",
    views: "430K views",
    color: "#9B7CFF",
  },
  {
    id: "s7",
    url: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/L_G1P6c4oHk",
    title: "High-Performance Funnels",
    views: "980K views",
    color: "#6F4DFF",
  },
  {
    id: "s8",
    url: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=600&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/m6p_v1k9RQM",
    title: "Personal Branding Playbook",
    views: "1.7M views",
    color: "#9B7CFF",
  },
];

// Duplicate the list to create a seamless infinite scroll loop
const DOUBLE_SHORTS = [...SHORTS, ...SHORTS];

export default function VideoShowcase() {
  return (
    <section
      id="showcase"
      className="relative w-full py-20 md:py-32 bg-dark-bg z-20 overflow-hidden"
    >
      {/* Self-contained styling for the infinite marquee animation */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee-scroll {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .animate-marquee-scroll {
          animation: marquee-scroll 45s linear infinite;
        }
      `}} />

      {/* Ambient background glows */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-accent/10 blur-[130px] opacity-40" />
        <div className="absolute top-1/3 right-1/4 translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-primary/15 blur-[120px] opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col gap-12 md:gap-16 items-center text-center relative z-10">
        
        {/* Top Header Text Content */}
        <div className="flex flex-col items-center gap-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-accent-light text-sm font-semibold tracking-wider uppercase">
            <Monitor className="w-4 h-4" />
            <span>Interactive Showcase</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl text-white tracking-tight leading-tight drop-shadow-2xl">
            Explore our <span className="text-gradient">3D Shorts Wall</span>
          </h2>
          <p className="text-white/60 text-sm md:text-base">
            Hover over any smartphone screen to pause and focus, and click to view the content format.
          </p>
        </div>

        {/* Marquee Track Container with horizontal fading masks */}
        <div 
          className="w-full overflow-hidden py-4 select-none relative z-10 [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]"
          style={{ perspective: "1500px" }}
        >
          <div 
            className="flex gap-6 md:gap-10 w-max animate-marquee-scroll hover:[animation-play-state:paused] py-6 px-4"
            style={{ transformStyle: "preserve-3d" }}
          >
            {DOUBLE_SHORTS.map((short, idx) => {
              // Create a subtle curving tilt on each smartphone for the 3D aesthetic
              const tiltAngle = (idx % 2 === 0) ? -2 : 2;

              return (
                <motion.div
                  key={`${short.id}-${idx}`}
                  onClick={() => {
                    window.dispatchEvent(
                      new CustomEvent("open-video-modal", {
                        detail: {
                          url: short.videoUrl,
                          title: short.title,
                          isShort: true,
                        },
                      })
                    );
                  }}
                  whileHover={{
                    scale: 1.06,
                    rotateY: 0,
                    rotateZ: 0,
                    y: -10,
                    boxShadow: `0 0 30px ${short.color}40`,
                    transition: { duration: 0.3 }
                  }}
                  style={{
                    transformStyle: "preserve-3d",
                    rotateY: tiltAngle * 1.5,
                    rotateZ: tiltAngle * 0.5,
                  }}
                  className="relative shrink-0 w-[180px] h-[320px] md:w-[230px] md:h-[408px] bg-black/95 p-2 md:p-3 rounded-[28px] md:rounded-[36px] border border-white/10 cursor-pointer shadow-[0_20px_50px_rgba(0,0,0,0.8)] group transition-all duration-300"
                >
                  {/* Phone Bezel Glare Overlay */}
                  <div className="absolute inset-px rounded-[26px] md:rounded-[34px] border border-white/5 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 pointer-events-none z-10" />

                  {/* Dynamic Island Notch */}
                  <div className="absolute top-3 md:top-4 left-1/2 -translate-x-1/2 w-12 h-3.5 md:w-16 md:h-4.5 bg-black rounded-full z-20 border border-white/5 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-zinc-800 absolute right-3 md:right-4" />
                  </div>

                  {/* Home Indicator line */}
                  <div className="absolute bottom-1.5 md:bottom-2 left-1/2 -translate-x-1/2 w-16 md:w-24 h-0.5 md:h-1 bg-white/20 rounded-full z-20" />

                  {/* Thumbnail Image Screen */}
                  <div className="relative w-full h-full rounded-[20px] md:rounded-[26px] overflow-hidden bg-zinc-900">
                    <img
                      src={short.url}
                      alt={short.title}
                      className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
                    />

                    {/* Dark gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent z-10" />

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center z-15 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/95 text-black flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                        <Play className="w-5 h-5 md:w-6 md:h-6 fill-black translate-x-0.5" />
                      </div>
                    </div>

                    {/* Meta info at the bottom */}
                    <div className="absolute bottom-4 inset-x-3 md:inset-x-4 z-15 text-left space-y-1 select-none pointer-events-none">
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-accent/95 text-[9px] md:text-xs font-semibold text-white tracking-wide uppercase">
                        🔥 {short.views}
                      </span>
                      <h4 className="font-display font-bold text-xs md:text-sm text-white line-clamp-2 leading-tight">
                        {short.title}
                      </h4>
                    </div>
                  </div>

                  {/* Outer neon border glow wrapper */}
                  <div
                    className="absolute inset-0 -z-10 rounded-[28px] md:rounded-[36px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md pointer-events-none"
                    style={{
                      boxShadow: `0 0 25px ${short.color}`,
                      border: `1.5px solid ${short.color}`
                    }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom Status Info Bar */}
        <div className="w-full flex items-center justify-between text-[10px] md:text-xs text-white/40 font-mono select-none">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>3D SHORTS SLIDER ACTIVE</span>
          </div>
          <div>
            <span>AUTOPLAY SPEED: 45S / LOOP</span>
          </div>
          <div className="hidden sm:block">
            <span>PLATFORM: NEXT.JS / FRAMER MOTION</span>
          </div>
        </div>

      </div>
    </section>
  );
}
