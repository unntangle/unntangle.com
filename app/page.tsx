import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import Services from "@/components/Services";
import Products from "@/components/Products";
// HIDDEN-UBIQ: `BrandEcosystem` is the "Our Ecosystem" band whose only
// brand card is uBIQ, linking to /ubiq. Hidden while the brand site is off.
// import BrandEcosystem from "@/components/BrandEcosystem";
import Stats from "@/components/Stats";
import TechStack from "@/components/TechStack";
import Industries from "@/components/Industries";
import CTABand from "@/components/CTABand";
import FAQ from "@/components/FAQ";
import Philosophy from "@/components/Philosophy";
import Footer from "@/components/Footer";

// `ClientCarousel` (the "CLIENTS TRUST US" scrolling logo rows)
// is hidden because the placeholder logos (Azure, Adobe, Stripe,
// AWS Sagemaker, Snowflake etc.) referenced platforms we use, not
// real client engagements — the section heading promised proof we
// didn't have. Re-import it once we have legitimate client logos
// with permission to display.

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://unntangle.com";

// Home-page-specific metadata.
// The home page intentionally does NOT use the title template — we want
// the bare "Unntangle Technologies — ..." form for the root URL, since putting
// "Unntangle Technologies | Unntangle Technologies" via the template would be silly. Setting an
// absolute title here overrides the template just for this page.
export const metadata: Metadata = {
  title: {
    absolute: "Unntangle Technologies — Enterprise AI Agents & Automation",
  },
  description:
    "Unntangle deploys AI agents that understand your business, connect with your existing systems and execute repetitive workflows across sales, finance, operations and customer service.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Unntangle Technologies — Enterprise AI Agents & Automation",
    description:
      "Unntangle deploys AI agents that understand your business, connect with your existing systems and execute repetitive workflows across sales, finance, operations and customer service.",
    url: SITE_URL,
    type: "website",
    images: [
      {
        url: "/images/hero.png",
        width: 1200,
        height: 630,
        alt: "Unntangle Technologies — Enterprise AI Agents & Automation",
      },
    ],
  },
};

const homeJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#professionalservice`,
  name: "Unntangle",
  url: SITE_URL,
  image: `${SITE_URL}/images/hero.png`,
  description:
    "Enterprise AI agents and automation — connecting intelligent AI to your existing systems to automate workflows across sales, finance, operations, procurement and customer service.",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Chennai",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
  areaServed: ["IN", "AE", "US", "GB"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Unntangle AI Solutions",
    itemListElement: [
      {
        "@type": "OfferCatalog",
        name: "AI Agents",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Sales Agent" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Finance Agent" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Procurement Agent" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Operations Agent" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Customer Service Agent" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Management Intelligence" } },
        ],
      },
      {
        "@type": "OfferCatalog",
        name: "Technology",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Enterprise Software", url: `${SITE_URL}/services/erp` } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Website Development", url: `${SITE_URL}/services/website` } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "App Development", url: `${SITE_URL}/services/app` } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "API Integrations" } },
        ],
      },
    ],
  },
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homeJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Navbar />
      <div style={{ paddingTop: '80px' }}>
        <PageHero
          eyebrow="ENTERPRISE AI DEPLOYMENT & AUTOMATION"
          titleParts={[
            'AI That Works ',
            { accent: 'Inside Your Business.' },
          ]}
          description="Unntangle identifies repetitive business workflows, builds AI-powered solutions around them, and deploys them into your existing systems — helping teams work faster, smarter and with less manual effort."
          primaryCta={{ label: 'Book an AI Workflow Assessment', href: '/contact' }}
          secondaryCta={{ label: 'Explore AI Solutions', href: '/services' }}
          image="/images/hero.png"
          imageAlt="Unntangle AI Deployment"
          gradient="blue-cyan"
          imageLayout="stacked-strips"
          overlayCta={{ label: 'Discover your AI workflows', href: '/contact' }}
        />
      </div>
      <Services />
      <Products />
      {/* HIDDEN-UBIQ: <BrandEcosystem /> */}
      <Stats />
      <Philosophy />
      <TechStack />
      <Industries />
      <CTABand />
      <FAQ />
      <Footer />
    </main>
  );
}
