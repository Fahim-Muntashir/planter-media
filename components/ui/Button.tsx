"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends HTMLMotionProps<"button"> {
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "glow" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  magnetic?: boolean;
}

export default function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  magnetic = true,
  ...props
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [hovered, setHovered] = useState(false);

  // Motion values for magnetic pull
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for magnetic effect
  const springConfig = { damping: 15, stiffness: 150, mass: 0.5 };
  const pullX = useSpring(mouseX, springConfig);
  const pullY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!magnetic || !buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Pull intensity factor (0.25 means it pulls 25% of distance)
    mouseX.set(x * 0.28);
    mouseY.set(y * 0.28);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const baseStyles = "relative inline-flex items-center justify-center font-semibold rounded-full select-none cursor-pointer transition-all duration-300 active:scale-95 overflow-hidden z-10";
  
  const sizes = {
    sm: "px-5 py-2 text-sm",
    md: "px-7 py-3 text-base",
    lg: "px-9 py-4 text-lg",
  };

  const variants = {
    primary: "bg-gradient-to-r from-accent to-accent-light text-white shadow-lg shadow-accent/15 hover:shadow-accent/35 hover:brightness-110",
    secondary: "glass-panel text-white hover:bg-white/10 hover:border-white/30",
    glow: "bg-dark-bg text-white border border-accent/40 shadow-[0_0_15px_rgba(111,77,255,0.15)] hover:shadow-[0_0_25px_rgba(111,77,255,0.4)] hover:border-accent-light/70",
    outline: "bg-transparent text-white border border-white/20 hover:border-white hover:bg-white/5",
    ghost: "bg-transparent text-white/70 hover:text-white hover:bg-white/5",
  };

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ x: pullX, y: pullY }}
      className={cn(baseStyles, sizes[size], variants[variant], className)}
      {...props}
    >
      {/* Background slide/shine effect on hover */}
      {variant === "primary" && (
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-accent-light to-accent opacity-0 hover:opacity-100 transition-opacity duration-500 ease-out -z-10" />
      )}
      
      {/* Glow border overlay for 'glow' variant */}
      {variant === "glow" && (
        <span className="absolute inset-0 w-full h-full bg-accent/10 opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10" />
      )}

      {/* Button content */}
      <span className="relative flex items-center gap-2">
        {children}
      </span>
    </motion.button>
  );
}
