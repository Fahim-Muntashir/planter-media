"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { GitCommit, Compass, Video, Share2, TrendingUp, HelpCircle } from "lucide-react";

interface ProcessStep {
  step: string;
  title: string;
  description: string;
  iconName: string;
}

const STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "Discovery",
    description: "Deep-dive brand positioning and audience analysis.",
    iconName: "GitCommit",
  },
  {
    step: "02",
    title: "Strategy",
    description: "Designing bespoke funnels, scripts, and content maps.",
    iconName: "Compass",
  },
  {
    step: "03",
    title: "Production",
    description: "High-end cinematic video editing and graphic assets.",
    iconName: "Video",
  },
  {
    step: "04",
    title: "Distribution",
    description: "Algorithmic optimization and cross-platform posting.",
    iconName: "Share2",
  },
  {
    step: "05",
    title: "Growth",
    description: "Lead capture systems, analytics, and compounding scale.",
    iconName: "TrendingUp",
  },
];

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  GitCommit,
  Compass,
  Video,
  Share2,
  TrendingUp,
};

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 75%", "end 50%"],
  });

  // Smooth out scroll value
  const scaleXSpring = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section ref={sectionRef} id="process" className="relative w-full py-24 bg-dark-bg overflow-hidden z-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-20">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 text-center md:text-left mx-auto md:mx-0">
          <div className="inline-flex items-center gap-2 text-accent-light text-sm font-semibold tracking-wider uppercase">
            <HelpCircle className="w-4 h-4" />
            <span>HOW WE WORK</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl text-white tracking-tight">
            Our Proven Five-Step <span className="text-gradient">Growth Engine</span>
          </h2>
          <p className="text-white/60 text-base md:text-lg max-w-xl">
            From raw idea to automated pipeline, here is how we scale your digital authority and attract inbound opportunities.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative w-full py-10">
          
          {/* Progress Bar (Desktop only, connects steps horizontally) */}
          <div className="hidden lg:block absolute top-[52px] inset-x-8 h-[2px] bg-white/5 z-0">
            <motion.div
              style={{ scaleX: scaleXSpring }}
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent to-accent-light origin-left w-full h-full"
            />
          </div>

          {/* Progress Bar (Mobile only, connects steps vertically) */}
          <div className="lg:hidden absolute left-[31px] top-6 bottom-6 w-[2px] bg-white/5 z-0">
            <motion.div
              style={{ scaleY: scaleXSpring }}
              className="absolute inset-x-0 top-0 bg-gradient-to-b from-accent to-accent-light origin-top w-full h-full"
            />
          </div>

          {/* Steps list */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-6 relative z-10">
            {STEPS.map((stepItem, index) => {
              const Icon = iconMap[stepItem.iconName];
              
              return (
                <motion.div
                  key={stepItem.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="flex flex-row lg:flex-col items-start lg:items-center text-left lg:text-center gap-6 lg:gap-6 relative"
                >
                  
                  {/* Step Icon Badge */}
                  <div className="relative z-10 shrink-0">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-16 h-16 rounded-full glass-panel border-accent/20 flex items-center justify-center bg-dark-bg group hover:border-accent-light/50 transition-colors cursor-pointer"
                    >
                      {Icon && <Icon className="w-6 h-6 text-accent-light" />}
                    </motion.div>
                    
                    {/* Circle index flag */}
                    <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-accent text-white text-[10px] font-extrabold flex items-center justify-center border border-dark-bg shadow-lg">
                      {stepItem.step}
                    </span>
                  </div>

                  {/* Step Description copy */}
                  <div className="space-y-2 lg:mt-2">
                    <h3 className="font-display font-extrabold text-xl text-white">
                      {stepItem.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed max-w-[240px]">
                      {stepItem.description}
                    </p>
                  </div>

                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
