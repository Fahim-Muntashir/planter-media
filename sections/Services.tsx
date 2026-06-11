"use client";

import { motion } from "framer-motion";
import { UserCheck, Layers, Video, TrendingUp, Compass, CheckCircle2, Award } from "lucide-react";
import { ServiceCard } from "@/types";

const SERVICES: ServiceCard[] = [
  {
    id: "s1",
    title: "Personal Branding",
    description: "Build authority and trust.",
    details: [
      "Founder brand positioning",
      "Executive voice cultivation",
      "Authority building campaigns",
      "PR and podcast booking hookups",
    ],
    iconName: "UserCheck",
  },
  {
    id: "s2",
    title: "Content Repurposing",
    description: "Turn one piece of content into dozens.",
    details: [
      "Long-form to short-form scaling",
      "Multi-channel formatting",
      "Blog/newsletter extraction",
      "Content calendar scheduling",
    ],
    iconName: "Layers",
  },
  {
    id: "s3",
    title: "Video Editing",
    description: "High-performing short-form content.",
    details: [
      "Slick subtitle & motion graphics",
      "High retention pacing",
      "Sound design & grading",
      "Custom meme integration",
    ],
    iconName: "Video",
  },
  {
    id: "s4",
    title: "LinkedIn Growth",
    description: "Build influence and visibility.",
    details: [
      "Custom carousel layouts",
      "Viral hook writing",
      "Engagement strategies",
      "Lead generation outreach",
    ],
    iconName: "TrendingUp",
  },
  {
    id: "s5",
    title: "Content Strategy",
    description: "Content systems that generate opportunities.",
    details: [
      "Funnels for warm leads",
      "Competitor audit analysis",
      "SEO and search intent sync",
      "Key metric analytics",
    ],
    iconName: "Compass",
  },
];

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  UserCheck,
  Layers,
  Video,
  TrendingUp,
  Compass,
};

export default function Services() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section id="services" className="relative w-full py-24 bg-dark-bg z-20">
      {/* Background ambient glow matching #2E1F6E */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-16">
        
        {/* Title Block */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 text-accent-light text-sm font-semibold tracking-wider uppercase">
            <Award className="w-4 h-4" />
            <span>WHAT WE DO</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl text-white tracking-tight">
            Premium Agency Services to <br />
            <span className="text-gradient">Scale Your Attention</span>
          </h2>
          <p className="text-white/60 text-base md:text-lg max-w-2xl">
            We operate at the intersection of media production and growth consulting, building scalable systems that convert views into revenue.
          </p>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {SERVICES.map((service) => {
            const Icon = iconMap[service.iconName];

            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                className="group relative rounded-3xl p-8 glass-panel overflow-hidden cursor-pointer flex flex-col justify-between min-h-[340px]"
                whileHover={{ y: -8 }}
              >
                {/* Accent border glow mask on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-accent/0 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

                <div className="space-y-6">
                  {/* Icon Block */}
                  <div className="w-12 h-12 rounded-2xl bg-accent/15 flex items-center justify-center border border-accent/25 text-accent-light group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                    {Icon && <Icon className="w-6 h-6" />}
                  </div>

                  {/* Title & Desc */}
                  <div className="space-y-2">
                    <h3 className="font-display font-bold text-xl text-white group-hover:text-accent-light transition-colors duration-200">
                      {service.title}
                    </h3>
                    <p className="text-white/70 text-sm font-medium">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Bullet details list */}
                <ul className="space-y-2.5 mt-6 border-t border-white/5 pt-5">
                  {service.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center gap-2.5 text-xs text-white/50">
                      <CheckCircle2 className="w-4 h-4 text-accent/50 shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
