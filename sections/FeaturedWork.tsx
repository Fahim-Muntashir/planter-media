"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Eye, Flame } from "lucide-react";
import { Project } from "@/types";

const PROJECTS: Project[] = [
  {
    id: "p1",
    title: "The Future of AI-Powered Workspace Tools",
    views: "1.8M",
    platform: "YouTube",
    industry: "Tech / SaaS",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "p2",
    title: "How to Build a Personal Brand in 90 Days",
    views: "540K",
    platform: "LinkedIn",
    industry: "Coaching / Business",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "p3",
    title: "Product Launch: Next-Gen Sound System",
    views: "2.1M",
    platform: "Instagram",
    industry: "E-Commerce / Tech",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "p4",
    title: "10x Your Developer Velocity with AI Agents",
    views: "920K",
    platform: "YouTube",
    industry: "Software / B2B",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "p5",
    title: "Why Traditional Education is Breaking Down",
    views: "1.5M",
    platform: "TikTok",
    industry: "Education / Tech",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "p6",
    title: "Inside our $500K Content System Framework",
    views: "730K",
    platform: "YouTube",
    industry: "Marketing / Systems",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop",
  },
];

export default function FeaturedWork() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const scrollAmount = clientWidth * 0.7;
      sliderRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handlePlayVideo = (project: Project) => {
    window.dispatchEvent(
      new CustomEvent("open-video-modal", {
        detail: {
          url: project.videoUrl,
          title: project.title,
        },
      })
    );
  };

  return (
    <section id="work" className="relative w-full py-24 bg-dark-bg overflow-hidden z-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-12">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 text-accent-light text-sm font-semibold tracking-wider uppercase">
              <Flame className="w-4 h-4" />
              <span>CREATIVE PORTFOLIO</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl md:text-5xl text-white tracking-tight">
              Work That Gets People <span className="text-gradient">Talking</span>
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            <button
              onClick={() => scroll("left")}
              className="p-3 bg-dark-card/60 hover:bg-accent/25 border border-white/5 hover:border-accent/30 rounded-full text-white cursor-pointer transition-all duration-200"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-3 bg-dark-card/60 hover:bg-accent/25 border border-white/5 hover:border-accent/30 rounded-full text-white cursor-pointer transition-all duration-200"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Netflix-style Slider Track */}
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto py-6 px-1 no-scrollbar scroll-smooth snap-x snap-mandatory"
        >
          {PROJECTS.map((project) => (
            <motion.div
              key={project.id}
              onClick={() => handlePlayVideo(project)}
              className="snap-start flex-none w-[280px] sm:w-[360px] md:w-[400px] aspect-[16/10] group relative rounded-3xl overflow-hidden glass-panel border-white/5 cursor-pointer"
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Thumbnail Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ backgroundImage: `url(${project.thumbnailUrl})` }}
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />

              {/* Badges */}
              <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-black/60 border border-white/10 text-white/90">
                  {project.platform}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-accent/80 border border-accent-light/20 text-white shadow-md">
                  {project.industry}
                </span>
              </div>

              {/* Play Button Overlay (Visible on Hover) */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <motion.div
                  initial={{ scale: 0.8 }}
                  whileHover={{ scale: 1.1 }}
                  className="w-14 h-14 bg-white text-dark-bg rounded-full flex items-center justify-center shadow-2xl"
                >
                  <Play className="w-6 h-6 fill-dark-bg ml-1" />
                </motion.div>
              </div>

              {/* Bottom Info Details */}
              <div className="absolute bottom-0 inset-x-0 p-5 space-y-2 z-10">
                <h3 className="font-display font-bold text-base md:text-lg text-white line-clamp-2 leading-snug group-hover:text-accent-light transition-colors">
                  {project.title}
                </h3>
                <div className="flex items-center gap-2 text-white/50 text-xs">
                  <Eye className="w-3.5 h-3.5" />
                  <span>{project.views} views</span>
                  <span className="w-1 h-1 rounded-full bg-white/30" />
                  <span>Organic reach</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
