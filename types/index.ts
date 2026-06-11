import { ReactNode } from "react";

export interface Project {
  id: string;
  title: string;
  views: string;
  platform: "YouTube" | "TikTok" | "Instagram" | "LinkedIn" | "Multi-Platform";
  industry: string;
  videoUrl: string;
  thumbnailUrl: string;
}

export interface ServiceCard {
  id: string;
  title: string;
  description: string;
  details: string[];
  iconName: string;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  quote: string;
  imageUrl: string;
}

export interface BentoItem {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  iconName: string;
  sizeClass: string; // Tailwind grid spanning classes e.g. "col-span-1 md:col-span-2"
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
