"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BarChart3 } from "lucide-react";

interface CounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

function Counter({ value, suffix = "", duration = 2 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    if (start === end) return;

    const totalMiliseconds = duration * 1000;
    const frameRate = 1000 / 60; // 60 FPS
    const totalFrames = Math.round(totalMiliseconds / frameRate);
    let currentFrame = 0;

    const counterInterval = setInterval(() => {
      currentFrame++;
      const progress = currentFrame / totalFrames;
      // easeOutExpo: starts fast, slows down exponentially
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      const currentCount = Math.round(easeProgress * end);
      setCount(currentCount);

      if (currentFrame >= totalFrames) {
        clearInterval(counterInterval);
        setCount(end);
      }
    }, frameRate);

    return () => clearInterval(counterInterval);
  }, [value, duration, isInView]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const STATS = [
  { id: "stat1", value: 50, suffix: "M+", label: "Views Generated", desc: "Organic audience reach across YouTube, TikTok, and Instagram." },
  { id: "stat2", value: 1000, suffix: "+", label: "Videos Produced", desc: "Short-form and long-form assets edited to retention perfection." },
  { id: "stat3", value: 100, suffix: "+", label: "Brands Served", desc: "Founders, creators, high-growth startups, and media teams." },
  { id: "stat4", value: 5, suffix: "+", label: "Years Experience", desc: "Consulting in digital growth, strategy, and cinematic media." },
];

export default function Results() {
  return (
    <section className="relative w-full py-24 bg-dark-bg/60 overflow-hidden z-20 border-y border-white/5">
      {/* Background glow overlay */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-accent-light/5 blur-[90px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-16">
        
        {/* Results Header */}
        <div className="flex flex-col items-center text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-accent-light text-sm font-semibold tracking-wider uppercase">
            <BarChart3 className="w-4 h-4" />
            <span>TRACK RECORD</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl text-white tracking-tight">
            Our Metrics Speak <span className="text-gradient">For Themselves</span>
          </h2>
          <p className="text-white/60 text-sm md:text-base">
            No fluff. Just organic views, high-fidelity media, and compounding pipeline growth. Here is our footprint in the creator economy.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative rounded-3xl p-8 glass-panel bg-dark-card/30 flex flex-col items-center lg:items-start text-center lg:text-left gap-4"
            >
              {/* Highlight bar */}
              <div className="absolute top-0 inset-x-8 h-1 bg-gradient-to-r from-accent to-accent-light opacity-50 rounded-b-full" />

              <h3 className="font-display font-black text-5xl md:text-6xl text-white tracking-tight leading-none">
                <Counter value={stat.value} suffix={stat.suffix} />
              </h3>

              <div className="space-y-1">
                <p className="font-display font-bold text-lg text-white">
                  {stat.label}
                </p>
                <p className="text-xs text-white/50 leading-relaxed">
                  {stat.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
