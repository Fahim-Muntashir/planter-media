"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Zap, Target, Users, Settings, Palette, LineChart, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface BentoItem {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  sizeClass: string;
  highlightText?: string;
  bgGlowClass?: string;
}

// 3D Card Tilt Component for Premium Bento Interaction
function BentoCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Mouse coordinates relative to card center
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    // Calculate rotation degree (max 8 degrees tilt)
    const rotX = -(mouseY / (height / 2)) * 8;
    const rotY = (mouseX / (width / 2)) * 8;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", damping: 25, stiffness: 220, mass: 0.5 }}
      style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
      className={cn("h-full w-full", className)}
    >
      <div style={{ transform: "translateZ(20px)" }} className="h-full w-full">
        {children}
      </div>
    </motion.div>
  );
}

export default function WhyUs() {
  const BENTO_ITEMS: BentoItem[] = [
    {
      id: "b1",
      title: "Fast Turnaround",
      description: "Get production-ready shorts and reels back in under 48 hours. Scale content speed without sacrificing high-fidelity edits.",
      icon: Zap,
      sizeClass: "md:col-span-2",
      highlightText: "24-48 HR DELIVERY",
      bgGlowClass: "from-purple-500/10 via-transparent to-transparent",
    },
    {
      id: "b2",
      title: "Strategic Content",
      description: "We focus on scripts, hooks, and structures designed to build genuine authority, not just empty viral metrics.",
      icon: Target,
      sizeClass: "md:col-span-1",
      bgGlowClass: "from-accent/10 via-transparent to-transparent",
    },
    {
      id: "b3",
      title: "Dedicated Team",
      description: "Work directly with elite writers, designers, and creative directors assigned specifically to your account.",
      icon: Users,
      sizeClass: "md:col-span-1",
      bgGlowClass: "from-blue-500/10 via-transparent to-transparent",
    },
    {
      id: "b4",
      title: "Proven Systems",
      description: "Our plug-and-play Notion workflows and remote recording guides make asset coordination completely friction-free for founders.",
      icon: Settings,
      sizeClass: "md:col-span-2",
      highlightText: "PLUG & PLAY NOTION",
      bgGlowClass: "from-violet-500/10 via-transparent to-transparent",
    },
    {
      id: "b5",
      title: "Premium Design",
      description: "Cinematic, custom-tailored graphics, motion text, sound palettes, and grades that elevate your brand value.",
      icon: Palette,
      sizeClass: "md:col-span-1",
      bgGlowClass: "from-indigo-500/10 via-transparent to-transparent",
    },
    {
      id: "b6",
      title: "Data Driven Decisions",
      description: "We run weekly A/B testing on video hooks, thumbnails, and copy, adjusting our editing systems based on retention graphs.",
      icon: LineChart,
      sizeClass: "md:col-span-2",
      highlightText: "RETENTION OPTIMIZED",
      bgGlowClass: "from-purple-500/10 via-transparent to-transparent",
    },
  ];

  return (
    <section id="why-us" className="relative w-full py-24 bg-dark-bg/40 z-20">
      {/* Background glow overlay */}
      <div className="absolute left-1/4 top-1/3 w-[450px] h-[450px] rounded-full bg-accent/5 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-16">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 text-accent-light text-sm font-semibold tracking-wider uppercase">
            <ShieldCheck className="w-4 h-4" />
            <span>WHY PLANTERMEDIA</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl text-white tracking-tight">
            Built For Founders Who Value <br />
            <span className="text-gradient">Quality And Velocity</span>
          </h2>
          <p className="text-white/60 text-base md:text-lg max-w-2xl">
            We are not a typical outsourced editing agency. We are strategic partners providing the premium infrastructure required to win online.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BENTO_ITEMS.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.id} className={cn("h-full min-h-[260px]", item.sizeClass)}>
                <BentoCard className="h-full">
                  <div className="relative h-full w-full rounded-3xl p-8 glass-panel overflow-hidden bg-dark-card/45 flex flex-col justify-between border-white/5 group">
                    
                    {/* Hover internal radial accent background */}
                    <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10", item.bgGlowClass)} />

                    {/* Top row */}
                    <div className="flex items-center justify-between w-full">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/80 group-hover:text-accent-light group-hover:border-accent-light/40 transition-colors duration-300">
                        <Icon className="w-5 h-5" />
                      </div>
                      
                      {item.highlightText && (
                        <span className="text-[10px] font-bold tracking-widest text-accent-light/95 border border-accent-light/25 bg-accent/5 px-3 py-1 rounded-full uppercase">
                          {item.highlightText}
                        </span>
                      )}
                    </div>

                    {/* Bottom content */}
                    <div className="space-y-3 mt-10">
                      <h3 className="font-display font-bold text-xl text-white">
                        {item.title}
                      </h3>
                      <p className="text-sm text-white/55 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                  </div>
                </BentoCard>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
