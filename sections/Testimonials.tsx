"use client";

import React from "react";
import { MessageSquare, Quote } from "lucide-react";
import { Testimonial } from "@/types";

const TESTIMONIALS_ROW1: Testimonial[] = [
  {
    id: "t1",
    name: "Alex Rivers",
    company: "SaaSify",
    role: "Founder & CEO",
    quote: "PlanterMedia transformed our tech stack explainers into high-performing short-form videos. Our pipeline is now fully booked with inbound SaaS demo requests.",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
  },
  {
    id: "t2",
    name: "Sarah Jenkins",
    company: "PeakLife",
    role: "Co-Founder & Coach",
    quote: "Working with them was a game-changer. They managed my LinkedIn growth and video repurposing. In 60 days, our organic impressions skyrocketed by 450%.",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
  },
  {
    id: "t3",
    name: "Michael Chang",
    company: "Nexus Automation",
    role: "VP of Growth",
    quote: "Their content strategy goes far beyond vanity metrics. We landed two mid-market enterprise accounts directly off a LinkedIn carousel they scripted.",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
  },
];

const TESTIMONIALS_ROW2: Testimonial[] = [
  {
    id: "t4",
    name: "Elena Rostova",
    company: "Vanguard Executive",
    role: "Leadership Coach",
    quote: "I was skeptical about short-form videos, but their team handled everything: scripting, editing, and scheduling. Truly a high-end, premium experience.",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
  },
  {
    id: "t5",
    name: "David Vance",
    company: "Quantum Labs",
    role: "Founder",
    quote: "The visual output is incredible. PlanterMedia works like an extension of our in-house team. Speed and editing pacing are completely unmatched.",
    imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=150&auto=format&fit=crop",
  },
  {
    id: "t6",
    name: "Jessica Miller",
    company: "Bloom E-Commerce",
    role: "Head of Marketing",
    quote: "Their repurposing system took one raw 20-minute product discussion and turned it into 15 highly engaging TikToks, driving 30k site visits.",
    imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop",
  },
];

export default function Testimonials() {
  const row1Duplicated = [...TESTIMONIALS_ROW1, ...TESTIMONIALS_ROW1, ...TESTIMONIALS_ROW1];
  const row2Duplicated = [...TESTIMONIALS_ROW2, ...TESTIMONIALS_ROW2, ...TESTIMONIALS_ROW2];

  return (
    <section className="relative w-full py-24 bg-dark-bg overflow-hidden z-20 border-b border-white/5">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-16">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 text-center md:text-left mx-auto md:mx-0">
          <div className="inline-flex items-center gap-2 text-accent-light text-sm font-semibold tracking-wider uppercase">
            <MessageSquare className="w-4 h-4" />
            <span>TESTIMONIALS</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl text-white tracking-tight">
            Loved By Founders And <br />
            <span className="text-gradient-purple">Industry Leaders</span>
          </h2>
          <p className="text-white/60 text-base md:text-lg max-w-xl">
            Hear from the partners who have scaled their influence, traffic, and revenue using our content engine.
          </p>
        </div>

        {/* Carousel Tracks */}
        <div className="flex flex-col gap-6 w-full relative">
          
          {/* Fading side edges overlays */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-dark-bg to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-dark-bg to-transparent z-10 pointer-events-none" />

          {/* Row 1 - scrolling left */}
          <div className="relative w-full overflow-hidden">
            <div className="flex w-max gap-6 py-2 animate-infinite-scroll">
              {row1Duplicated.map((card, idx) => (
                <div
                  key={`${card.id}-${idx}`}
                  className="w-[300px] md:w-[420px] rounded-3xl p-6 md:p-8 glass-panel bg-dark-card/40 flex flex-col justify-between gap-6 cursor-pointer select-none"
                >
                  <div className="relative">
                    <Quote className="absolute -top-3 -left-3 w-8 h-8 text-accent/15 rotate-180 -z-10" />
                    <p className="text-white/70 text-sm md:text-base leading-relaxed italic">
                      "{card.quote}"
                    </p>
                  </div>
                  <div className="flex items-center gap-4 border-t border-white/5 pt-4">
                    <img
                      src={card.imageUrl}
                      alt={card.name}
                      className="w-12 h-12 rounded-full border border-accent/20 object-cover"
                      loading="lazy"
                    />
                    <div>
                      <h4 className="font-display font-bold text-white text-sm md:text-base">
                        {card.name}
                      </h4>
                      <p className="text-xs text-white/45">
                        {card.role}, <span className="text-accent-light">{card.company}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 - scrolling right (different direction class or animation speed, let's reverse speed inline using CSS style) */}
          <div className="relative w-full overflow-hidden">
            <div
              className="flex w-max gap-6 py-2 animate-infinite-scroll"
              style={{ animationDirection: "reverse" }}
            >
              {row2Duplicated.map((card, idx) => (
                <div
                  key={`${card.id}-${idx}`}
                  className="w-[300px] md:w-[420px] rounded-3xl p-6 md:p-8 glass-panel bg-dark-card/40 flex flex-col justify-between gap-6 cursor-pointer select-none"
                >
                  <div className="relative">
                    <Quote className="absolute -top-3 -left-3 w-8 h-8 text-accent/15 rotate-180 -z-10" />
                    <p className="text-white/70 text-sm md:text-base leading-relaxed italic">
                      "{card.quote}"
                    </p>
                  </div>
                  <div className="flex items-center gap-4 border-t border-white/5 pt-4">
                    <img
                      src={card.imageUrl}
                      alt={card.name}
                      className="w-12 h-12 rounded-full border border-accent/20 object-cover"
                      loading="lazy"
                    />
                    <div>
                      <h4 className="font-display font-bold text-white text-sm md:text-base">
                        {card.name}
                      </h4>
                      <p className="text-xs text-white/45">
                        {card.role}, <span className="text-accent-light">{card.company}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
