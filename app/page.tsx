import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import Services from "@/components/Services";
import Products from "@/components/Products";
import Stats from "@/components/Stats";
import TechStack from "@/components/TechStack";
import Industries from "@/components/Industries";
import CTABand from "@/components/CTABand";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

// `ClientCarousel` (the "CLIENTS TRUST US" scrolling logo rows)
// is hidden because the placeholder logos (Azure, Adobe, Stripe,
// AWS Sagemaker, Snowflake etc.) referenced platforms we use, not
// real client engagements — the section heading promised proof we
// didn't have. Re-import it once we have legitimate client logos
// with permission to display.

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
      <Products />
      <Stats />
      <TechStack />
      <Industries />
      <CTABand />
      <FAQ />
      <Footer />
    </main>
  );
}
