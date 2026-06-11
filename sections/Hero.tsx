"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const handleScrollTo = (id: string) => {
    const el = document.querySelector(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-12 md:py-0">
      {/* Premium dark luxury background with animated gradient blobs */}
      <div className="absolute inset-0 bg-dark-bg z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/25 blur-[120px] opacity-70 animate-pulse duration-[8s]" />
        <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/20 blur-[140px] opacity-65 animate-pulse duration-[12s]" />
      </div>

      {/* Grid pattern background overlay — z-1, pointer-events none */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-[1]" />

      {/* Radial purple ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_60%,rgba(46,31,110,0.35)_0%,transparent_80%)] pointer-events-none z-[2]" />

      {/* Bottom fade gradient — z-10 */}
      <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-dark-bg via-dark-bg/60 to-transparent pointer-events-none z-10" />

      {/* All text content — z-20 */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-20 pointer-events-none">

        {/* Left Side Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-8 flex flex-col items-start text-left space-y-6 md:space-y-8"
        >
          {/* Tagline Badge */}
          <motion.div
            variants={itemVariants}
            className="pointer-events-auto inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border-accent/20 bg-accent/5 text-accent-light text-xs font-semibold tracking-wide uppercase"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Redefining Digital Authority</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-display font-extrabold text-4xl sm:text-5xl md:text-7xl leading-[1.05] tracking-tight text-white"
          >
            We Turn Content <br />
            Into <span className="text-gradient">Attention</span>, <br />
            <span className="text-gradient-purple">Trust & Clients</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="text-white/60 text-base md:text-lg max-w-xl leading-relaxed"
          >
            PlanterMedia helps founders, creators, coaches and businesses transform content into a brand that attracts opportunities.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="pointer-events-auto flex flex-wrap items-center gap-4 w-full sm:w-auto"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={() => window.open("https://calendly.com/call-fahim/30min", "_blank")}
            >
              Book a Call
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => handleScrollTo("#work")}
            >
              <Play className="w-4 h-4 fill-white" />
              View Work
            </Button>
          </motion.div>
        </motion.div>

        {/* Right Side Stats Overlay (Floating glass cards on top of ThreeJS canvas) */}
        <div className="hidden lg:col-span-4 lg:flex flex-col gap-4 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="pointer-events-auto self-end glass-panel px-6 py-4 rounded-2xl flex items-center gap-4 bg-dark-card/40 border-accent/10"
          >
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center font-bold text-accent-light">
              🚀
            </div>
            <div>
              <p className="text-xs text-white/50 font-medium">Views </p>
              <h4 className="font-display font-bold text-xl text-white">50 Million +</h4>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0, duration: 1 }}
            className="pointer-events-auto self-start glass-panel px-6 py-4 rounded-2xl flex items-center gap-4 bg-dark-card/40 border-accent/10 ml-6"
          >
            <div className="w-10 h-10 rounded-full bg-accent-light/20 flex items-center justify-center font-bold text-accent-light">
              🎬
            </div>
            <div>
              <p className="text-xs text-white/50 font-medium">Videos Produced</p>
              <h4 className="font-display font-bold text-xl text-white">1,000 +</h4>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
