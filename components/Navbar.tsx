"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Button from "./ui/Button";

const NAV_LINKS = [
  { name: "Services", href: "#services" },
  { name: "Work", href: "#work" },
  { name: "Showcase", href: "#showcase" },
  { name: "Process", href: "#process" },
  { name: "Bento", href: "#why-us" },
  { name: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${scrolled
          ? "py-4 bg-dark-bg/75 border-b border-white/5 backdrop-blur-md"
          : "py-6 bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center cursor-pointer group"
          >
            <img
              src="/logo.png"
              alt="PlanterMedia Logo"
              className="h-14 md:h-14 w-auto object-contain group-hover:scale-[1.03] transition-transform duration-300"
            />
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-white/70 hover:text-white font-medium text-sm transition-colors duration-200 cursor-pointer relative py-1 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-light transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <Button
              variant="glow"
              size="sm"
              onClick={() => {
                const ctaSec = document.querySelector("#cta");
                ctaSec?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Book a Call
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-white/80 hover:text-white cursor-pointer transition-colors duration-200"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[72px] z-30 md:hidden bg-dark-bg/95 border-b border-white/5 backdrop-blur-lg px-6 py-8 flex flex-col gap-6"
          >
            <div className="flex flex-col gap-5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-white/80 hover:text-white font-medium text-lg cursor-pointer"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <hr className="border-white/10" />
            <Button
              variant="primary"
              className="w-full justify-center"
              onClick={() => {
                setIsOpen(false);
                const ctaSec = document.querySelector("#cta");
                ctaSec?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Book a Call
              <ArrowUpRight className="w-5 h-5" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
