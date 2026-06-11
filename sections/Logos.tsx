"use client";

import React from "react";

const LOGOS = [
  "PlanterStudio",
  "The Planter",
  "Trending",
  "BrandingPro",
  "Massive Growth",
  "Fahim Muntashir",
  "AcquaShark",
  "Batball",
];

export default function Logos() {
  // We duplicate the logos array to ensure seamless infinite looping scroll
  const duplicatedLogos = [...LOGOS, ...LOGOS, ...LOGOS];

  return (
    <section className="relative w-full py-16 bg-dark-bg/60 border-y border-white/5 overflow-hidden z-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center gap-6">
        <p className="text-white/40 text-xs font-semibold uppercase tracking-widest text-center">
          TRUSTED BY LEADERS AT WORLD-CLASS BRANDS
        </p>

        {/* Outer container with fading edges */}
        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
          <div className="flex w-max gap-16 py-4 animate-infinite-scroll">
            {duplicatedLogos.map((logo, index) => (
              <div
                key={`${logo}-${index}`}
                className="flex items-center justify-center font-display font-bold text-2xl tracking-wider text-white/20 hover:text-accent-light/85 hover:scale-105 transition-all duration-300 select-none cursor-pointer"
              >
                {/* Stylized logo dot */}
                <span className="w-2.5 h-2.5 rounded-full bg-accent/40 mr-2" />
                {logo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
