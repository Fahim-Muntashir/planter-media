"use client";

import React from "react";
import { Users } from "lucide-react";
import { motion, Variants } from "framer-motion";

interface TeamMember {
  id: string;
  name: string;
  title: string;
  image: string;
  socials?: {
    twitter?: string;
    linkedin?: string;
  };
}

const TEAM: TeamMember[] = [
  {
    id: "t1",
    name: "Fahim Muntashir",
    title: "Founder & Creative Director",
    image: "/team/fahim Muntashir.png",
  },
  {
    id: "t2",
    name: "Mohammad Minhaj",
    title: "Lead Video Editor",
    image: "/team/MohammadMinhaj.png",
  },
  {
    id: "t3",
    name: "Eti Moni",
    title: "Short-Form Video Specialist",
    image: "/team/etimoni.jpg",
  },
  {
    id: "t4",
    name: "Moudud Hasan",
    title: "Long-Form Video Specialist",
    image: "/team/moududhasan.png",
  },
  {
    id: "t5",
    name: "Rakibul Islam",
    title: "Motion Graphics Designer",
    image: "/team/rakibulIslam.png",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function Team() {
  return (
    <section
      id="team"
      className="relative w-full py-20 md:py-32 bg-dark-bg z-20 overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/10 blur-[150px] opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col gap-12 md:gap-16 items-center text-center relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center gap-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-accent-light text-sm font-semibold tracking-wider uppercase"
          >
            <Users className="w-4 h-4" />
            <span>Meet The Team</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-extrabold text-3xl md:text-5xl text-white tracking-tight leading-tight drop-shadow-2xl"
          >
            The Minds Behind <span className="text-gradient">The Magic</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-sm md:text-base"
          >
            A dedicated team of creatives, editors, and strategists working together to elevate your brand.
          </motion.p>
        </div>

        {/* Team Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8 w-full"
        >
          {TEAM.map((member) => (
            <motion.div
              key={member.id}
              variants={itemVariants}
              className="group relative flex flex-col items-center gap-4 w-full"
            >
              {/* Photo Container */}
              <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.4)]">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Glow effect on hover */}
                <div className="absolute inset-0 -z-10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl bg-accent/30" />
              </div>

              {/* Text Info */}
              <div className="flex flex-col items-center gap-1">
                <h3 className="font-display font-bold text-xl text-white group-hover:text-accent-light transition-colors duration-300 text-center">
                  {member.name}
                </h3>
                <p className="text-sm font-medium text-white/50 uppercase tracking-widest text-center">
                  {member.title}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
