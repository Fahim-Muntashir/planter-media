import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import MouseGlow from "@/components/MouseGlow";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://plantermedia.com"),
  title: {
    default: "PlanterMedia | Premium Content Agency & Personal Branding Partner",
    template: "%s | PlanterMedia",
  },
  description:
    "PlanterMedia helps founders, creators, coaches, and high-growth businesses transform raw content into a brand that attracts attention, trust, and clients. Elevate your media production today.",
  keywords: [
    "PlanterMedia",
    "media agency",
    "personal branding",
    "content repurposing",
    "video production",
    "LinkedIn growth",
    "founder brand",
    "short-form video editing",
    "content strategy",
  ],
  authors: [{ name: "PlanterMedia Team" }],
  creator: "PlanterMedia",
  publisher: "PlanterMedia",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://plantermedia.com",
    siteName: "PlanterMedia",
    title: "PlanterMedia | Premium Content Agency & Personal Branding Partner",
    description:
      "PlanterMedia helps founders, creators, coaches, and high-growth businesses transform content into a brand that attracts attention, trust, and clients.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PlanterMedia Premium Dark-Themed Agency Website",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PlanterMedia | Premium Content Agency",
    description:
      "Transform content into a brand that attracts attention, trust, and clients. Scale your reach with PlanterMedia.",
    creator: "@plantermedia",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured Data (JSON-LD) for LocalBusiness / ProfessionalService
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "PlanterMedia",
    "image": "https://plantermedia.com/og-image.jpg",
    "url": "https://plantermedia.com",
    "telephone": "+1-800-PLANTER",
    "priceRange": "$$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Luxury Media Row",
      "addressLocality": "Austin",
      "addressRegion": "TX",
      "postalCode": "78701",
      "addressCountry": "US"
    },
    "sameAs": [
      "https://twitter.com/plantermedia",
      "https://www.linkedin.com/company/plantermedia",
      "https://www.instagram.com/plantermedia"
    ],
    "description": "PlanterMedia helps founders, creators, coaches, and businesses transform content into a brand that attracts opportunities.",
    "areaServed": "Worldwide"
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-dark-bg text-white selection:bg-accent selection:text-white overflow-x-hidden">
        <SmoothScroll>
          <MouseGlow />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
