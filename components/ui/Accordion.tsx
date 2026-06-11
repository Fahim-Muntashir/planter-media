"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FAQItem } from "@/types";

interface AccordionProps {
  items: FAQItem[];
}

export default function Accordion({ items }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="w-full space-y-4 max-w-3xl mx-auto">
      {items.map((item) => {
        const isOpen = openId === item.id;
        
        return (
          <div
            key={item.id}
            className="rounded-2xl glass-panel overflow-hidden transition-all duration-300"
            style={{
              borderColor: isOpen ? "rgba(111, 77, 255, 0.35)" : "rgba(111, 77, 255, 0.1)",
              background: isOpen ? "rgba(18, 18, 26, 0.85)" : "rgba(18, 18, 26, 0.55)",
            }}
          >
            <button
              onClick={() => toggleAccordion(item.id)}
              className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left font-semibold text-lg cursor-pointer group"
            >
              <span className="text-white group-hover:text-accent-light transition-colors duration-200">
                {item.question}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="text-white/60 group-hover:text-white shrink-0"
              >
                <ChevronDown className="w-5 h-5" />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                >
                  <div className="px-6 pb-6 text-white/70 leading-relaxed border-t border-white/5 pt-4 text-sm md:text-base">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
