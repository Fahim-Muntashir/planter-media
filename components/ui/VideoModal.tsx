"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function VideoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [isShort, setIsShort] = useState(false);

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<{ url: string; title: string; isShort?: boolean }>;
      if (customEvent.detail) {
        setVideoUrl(customEvent.detail.url);
        setVideoTitle(customEvent.detail.title || "Project Video");
        setIsShort(!!customEvent.detail.isShort);
        setIsOpen(true);
      }
    };

    window.addEventListener("open-video-modal", handleOpen);
    return () => {
      window.removeEventListener("open-video-modal", handleOpen);
    };
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    setVideoUrl("");
    setVideoTitle("");
    setIsShort(false);
  };

  // Close modal on escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // Prevent scrolling behind modal
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 bg-black/95 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className={`relative w-full rounded-3xl overflow-hidden glass-panel-glow border-accent/30 z-10 shadow-2xl transition-all duration-300 ${
              isShort
                ? "max-w-[360px] aspect-[9/16] max-h-[85vh] h-[640px]"
                : "max-w-5xl aspect-video"
            }`}
          >
            {/* Header info */}
            <div className="absolute top-0 inset-x-0 p-5 bg-gradient-to-b from-black/90 to-transparent flex items-center justify-between z-20 pointer-events-none">
              <span className="font-semibold text-sm md:text-base text-white truncate max-w-[70%] drop-shadow-md">
                {videoTitle}
              </span>
              <button
                onClick={closeModal}
                className="pointer-events-auto p-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full text-white cursor-pointer transition-colors duration-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video iFrame */}
            <div className="w-full h-full pt-16 bg-black">
              <iframe
                src={`${videoUrl}?autoplay=1&rel=0&modestbranding=1`}
                title={videoTitle}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
