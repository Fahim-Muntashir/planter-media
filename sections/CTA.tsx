"use client";

import { motion } from "framer-motion";
import { Calendar, FolderKanban, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";

export default function CTA() {
  const handleScrollTo = (id: string) => {
    const el = document.querySelector(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="cta" className="relative w-full py-28 bg-dark-bg overflow-hidden z-20">
      
      {/* Heavy Animated Gradient Glow matching #2E1F6E / #6F4DFF */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.35, 0.5, 0.35],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary via-accent/30 to-accent-light/10 blur-[130px] pointer-events-none -z-10"
      />

      <div className="max-w-5xl mx-auto px-6 md:px-12 w-full">
        
        {/* Glowing glass box wrapper */}
        <div className="relative rounded-[40px] p-8 md:p-16 glass-panel-glow border-accent/25 bg-dark-card/30 overflow-hidden text-center flex flex-col items-center gap-8 shadow-[0_0_50px_rgba(111,77,255,0.05)]">
          
          {/* Subtle grid pattern inside box */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />

          {/* Sparkles Icon Tagline */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/25 text-accent-light text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>LET'S START BUILDING</span>
          </div>

          {/* Headline */}
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-6xl text-white tracking-tight leading-none max-w-3xl">
            Ready To Build A Brand <br className="hidden md:block" />
            <span className="text-gradient">People Remember?</span>
          </h2>

          {/* Subheadline */}
          <p className="text-white/70 text-base md:text-lg max-w-xl leading-relaxed">
            Let's create content that works long after it's published. Secure your strategy call to map out your authority scaling strategy.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 w-full sm:w-auto">
            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                // Book a Call action
                window.open("https://calendly.com/call-fahim/30min", "_blank");
              }}
            >
              <Calendar className="w-4 h-4" />
              Book Strategy Call
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => handleScrollTo("#work")}
            >
              <FolderKanban className="w-4 h-4" />
              View Portfolio
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex items-center justify-center gap-6 mt-4 text-xs text-white/40 font-mono">
            <span>✓ 100% ORGANIC METHODS</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/25" />
            <span>✓ Bespoke Content Assets</span>
          </div>

        </div>

      </div>
    </section>
  );
}
