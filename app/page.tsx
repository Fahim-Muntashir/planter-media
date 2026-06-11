import Navbar from "@/components/Navbar";
import Hero from "@/sections/Hero";
import Logos from "@/sections/Logos";
// import FeaturedWork from "@/sections/FeaturedWork"; // merged into VideoShowcase
import VideoShowcase from "@/sections/VideoShowcase";
import Services from "@/sections/Services";
import Process from "@/sections/Process";
import Results from "@/sections/Results";
import Testimonials from "@/sections/Testimonials";
import WhyUs from "@/sections/WhyUs";
import FAQ from "@/sections/FAQ";
import CTA from "@/sections/CTA";
import Footer from "@/sections/Footer";
import VideoModal from "@/components/ui/VideoModal";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col w-full">
        <Hero />
        <Logos />
        {/* <FeaturedWork /> */}
        <VideoShowcase />
        <Services />
        <Process />
        <Results />
        <Testimonials />
        <WhyUs />
        <FAQ />
        <CTA />
      </main>
      <Footer />

      {/* Global Video Modal overlays */}
      <VideoModal />
    </>
  );
}
