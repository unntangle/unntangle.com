import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
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
      <div style={{ paddingTop: '80px' }}>
        <PageHero
          eyebrow="Your Growth Partner"
          titleParts={[
            'Design, Development & ',
            { accent: 'Smart Living' },
            ' Solutions.',
          ]}
          description="We bridge the gap between digital excellence and intelligent living — from high-end web and app development to smart home automation and sustainable energy systems."
          primaryCta={{ label: 'Get in touch', href: '/contact' }}
          secondaryCta={{ label: 'Book a call', href: '/contact' }}
          image="/images/hero.png"
          imageAlt="Unntangle workspace"
          gradient="blue-cyan"
          imageLayout="stacked-strips"
          overlayCta={{ label: 'Create an Unntangled world', href: '/services' }}
        />
      </div>
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
