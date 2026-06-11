"use client";

import React from "react";
import Accordion from "@/components/ui/Accordion";
import { FAQItem } from "@/types";
import { HelpCircle } from "lucide-react";

const FAQ_ITEMS: FAQItem[] = [
  {
    id: "f1",
    question: "What does the onboarding process look like?",
    answer: "We begin with a deep-dive onboarding questionnaire and a strategy kickoff call. Next, we build your brand profile, script templates, and custom video styles. We then deliver your Notion dashboard. The entire process takes under 7 days before we receive your first raw files and start producing content.",
  },
  {
    id: "f2",
    question: "How much time do I need to commit each month?",
    answer: "Typically under 3 to 4 hours. Our custom interview system allows us to record a single 60-minute long-form session with you, which our editorial team then scripts, designs, and chops into dozens of premium short-form videos, LinkedIn carousels, and newsletter copy.",
  },
  {
    id: "f3",
    question: "Do you write the scripts and hooks, or do I?",
    answer: "We handle 100% of the copywriting, script scripting, hooks, and structures. We analyze top-performing video hooks in your industry and adapt them to your specific voice. You simply read, request edits, and approve the scripts before shooting.",
  },
  {
    id: "f4",
    question: "Can I customize the editing styles?",
    answer: "Absolutely. We do not use generic template formats. During the onboarding phase, we build a dedicated brand kit containing custom text animations, color palettes, sound effects, and transitions specifically designed to match your brand style.",
  },
  {
    id: "f5",
    question: "What platforms do you distribute content on?",
    answer: "We optimize and schedule content for YouTube (Shorts & Long-form), LinkedIn, TikTok, and Instagram. Each asset is reformatted and reformatted specifically to leverage the native algorithms and dimension rules of each platform.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="relative w-full py-24 bg-dark-bg/40 z-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-16">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-accent-light text-sm font-semibold tracking-wider uppercase">
            <HelpCircle className="w-4 h-4" />
            <span>COMMON QUESTIONS</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl text-white tracking-tight">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-white/60 text-sm md:text-base">
            Everything you need to know about our collaboration model, delivery times, time commitments, and editing workflows.
          </p>
        </div>

        {/* Accordion Component */}
        <div className="w-full">
          <Accordion items={FAQ_ITEMS} />
        </div>

      </div>
    </section>
  );
}
