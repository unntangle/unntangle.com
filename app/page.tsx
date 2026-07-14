import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import Services from "@/components/Services";
import Products from "@/components/Products";
import BrandEcosystem from "@/components/BrandEcosystem";
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

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://unntangle.com";

// Home-page-specific metadata.
// The home page intentionally does NOT use the title template — we want
// the bare "Unntangle — ..." form for the root URL, since putting
// "Unntangle | Unntangle" via the template would be silly. Setting an
// absolute title here overrides the template just for this page.
export const metadata: Metadata = {
  title: {
    absolute: "Unntangle — Design, Development & Smart Living",
  },
  description:
    "From premium web & app development to ZigBee smart-home automation, Unntangle bridges digital excellence and intelligent living. One studio, three disciplines.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Unntangle — Design, Development & Smart Living",
    description:
      "From premium web & app development to ZigBee smart-home automation, Unntangle bridges digital excellence and intelligent living.",
    url: SITE_URL,
    type: "website",
    images: [
      {
        url: "/images/hero.png",
        width: 1200,
        height: 630,
        alt: "Unntangle — Design, Development & Smart Living",
      },
    ],
  },
};

// Page-level structured data: tells Google this is a ProfessionalService
// landing page and surfaces the four major service categories. Combined
// with the Organization JSON-LD in layout.tsx, this should populate a
// rich knowledge panel quickly.
const homeJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#professionalservice`,
  name: "Unntangle",
  url: SITE_URL,
  image: `${SITE_URL}/images/hero.png`,
  description:
    "Full-stack digital studio: web & app development, creative design, growth marketing, and smart-living hardware.",
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
    name: "Unntangle Services",
    itemListElement: [
      {
        "@type": "OfferCatalog",
        name: "Technology Solutions",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Website Development", url: `${SITE_URL}/services/website` } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "App Development", url: `${SITE_URL}/services/app` } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "ERP Development", url: `${SITE_URL}/services/erp` } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Website Revamp", url: `${SITE_URL}/services/website-revamp` } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Interactive 3D Website", url: `${SITE_URL}/services/interactive-3d` } },
        ],
      },
      {
        "@type": "OfferCatalog",
        name: "Creative Design",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "2D Graphic Design", url: `${SITE_URL}/services/graphic-designing` } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "3D Design", url: `${SITE_URL}/services/3d-designing` } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Image Rendition", url: `${SITE_URL}/services/ai-rendition` } },
        ],
      },
      {
        "@type": "OfferCatalog",
        name: "Growth Marketing",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Meta Ads", url: `${SITE_URL}/services/meta-ads` } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Social Media Marketing", url: `${SITE_URL}/services/smm` } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "SEO", url: `${SITE_URL}/services/seo` } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Google Ads", url: `${SITE_URL}/services/google-ads` } },
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
      <BrandEcosystem />
      <Stats />
      <TechStack />
      <Industries />
      <CTABand />
      <FAQ />
      <Footer />
    </main>
  );
}
