"use client";

import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

// Custom SVG Brand Icons since Lucide v0.400+ removed them for trademark compliance
const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.528 3.545 12 3.545 12 3.545s-7.528 0-9.388.51a3.003 3.003 0 0 0-2.11 2.108C0 8.023 0 12 0 12s0 3.977.502 5.837a3.003 3.003 0 0 0 2.11 2.108c1.86.51 9.388.51 9.388.51s7.528 0 9.388-.51a3.003 3.003 0 0 0 2.11-2.108C24 15.977 24 12 24 12s0-3.977-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

export default function Footer() {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.querySelector(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative w-full bg-dark-bg border-t border-white/5 pt-20 pb-8 overflow-hidden z-20">
      
      {/* Background glow overlay */}
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-primary/5 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-16">
        
        {/* Footer Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
          
          {/* Col 1: Brand & Logo */}
          <div className="md:col-span-5 flex flex-col items-start gap-5">
            <a
              href="#"
              className="flex items-center cursor-pointer group"
            >
              <img 
                src="/logo.png" 
                alt="PlanterMedia Logo" 
                className="h-10 md:h-12 w-auto object-contain group-hover:scale-[1.03] transition-transform duration-300"
              />
            </a>
            <p className="text-white/50 text-sm leading-relaxed max-w-sm">
              We help founders, creators, and high-growth businesses transform raw content into a digital brand that commands authority, attracts clients, and scales opportunities.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-4 mt-2">
              <a
                href="https://twitter.com/plantermedia"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-white/5 bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:border-accent/30 hover:bg-accent/15 transition-all duration-300"
                aria-label="Twitter profile link"
              >
                <TwitterIcon className="w-4.5 h-4.5" />
              </a>
              <a
                href="https://linkedin.com/company/plantermedia"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-white/5 bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:border-accent/30 hover:bg-accent/15 transition-all duration-300"
                aria-label="LinkedIn profile link"
              >
                <LinkedinIcon className="w-4.5 h-4.5" />
              </a>
              <a
                href="https://instagram.com/plantermedia"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-white/5 bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:border-accent/30 hover:bg-accent/15 transition-all duration-300"
                aria-label="Instagram profile link"
              >
                <InstagramIcon className="w-4.5 h-4.5" />
              </a>
              <a
                href="https://youtube.com/plantermedia"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-white/5 bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:border-accent/30 hover:bg-accent/15 transition-all duration-300"
                aria-label="YouTube channel link"
              >
                <YoutubeIcon className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 flex flex-col items-start gap-4">
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider">
              Navigation
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href="#services"
                onClick={(e) => handleScrollTo(e, "#services")}
                className="text-white/50 hover:text-white text-sm transition-colors duration-200"
              >
                Services
              </a>
              <a
                href="#work"
                onClick={(e) => handleScrollTo(e, "#work")}
                className="text-white/50 hover:text-white text-sm transition-colors duration-200"
              >
                Featured Work
              </a>
              <a
                href="#showcase"
                onClick={(e) => handleScrollTo(e, "#showcase")}
                className="text-white/50 hover:text-white text-sm transition-colors duration-200"
              >
                3D Showcase
              </a>
              <a
                href="#process"
                onClick={(e) => handleScrollTo(e, "#process")}
                className="text-white/50 hover:text-white text-sm transition-colors duration-200"
              >
                Process Roadmap
              </a>
              <a
                href="#why-us"
                onClick={(e) => handleScrollTo(e, "#why-us")}
                className="text-white/50 hover:text-white text-sm transition-colors duration-200"
              >
                Bento Features
              </a>
              <a
                href="#faq"
                onClick={(e) => handleScrollTo(e, "#faq")}
                className="text-white/50 hover:text-white text-sm transition-colors duration-200"
              >
                FAQs
              </a>
            </div>
          </div>

          {/* Col 3: Contact info */}
          <div className="md:col-span-4 flex flex-col items-start gap-4">
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider">
              Get In Touch
            </h4>
            <div className="flex flex-col gap-4 text-white/50 text-sm">
              <a
                href="mailto:hello@plantermedia.com"
                className="flex items-center gap-3 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-accent-light" />
                <span>hello@plantermedia.com</span>
              </a>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-accent-light" />
                <span>+1 (800) 555-PLANTER</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-accent-light" />
                <span>Downtown Media Hub, Austin, TX 78701</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/5 pt-8 text-xs text-white/40 font-mono">
          <div>
            <span>© {new Date().getFullYear()} PLANTERMEDIA. ALL RIGHTS RESERVED.</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">PRIVACY POLICY</a>
            <a href="#" className="hover:text-white transition-colors">TERMS OF SERVICE</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
