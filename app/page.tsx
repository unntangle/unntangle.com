import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Work from "@/components/Work";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import ClientCarousel from "@/components/ClientCarousel";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <Work />
      <Stats />
      <ClientCarousel />
      <Testimonials />
      <FAQ />
      <Footer />
    </main>
  );
}
