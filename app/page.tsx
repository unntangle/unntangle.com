import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
// HIDDEN-UBIQ: `BrandEcosystem` is the "Our Ecosystem" band whose only
// brand card is uBIQ, linking to /ubiq. Hidden while the brand site is off.
// import BrandEcosystem from "@/components/BrandEcosystem";
//
// Home page redesign (Sep 2026): the page is now built from the section
// components in components/home/. The previous home sections (Services,
// Stats, AIWorkforce, WorkflowExample, ConnectedSystems, HumanInLoop,
// Industries, DeploymentModel, Philosophy, Products, TechStack, CTABand)
// are left on disk — some are still used on /about — but no longer render here.
import PageHero from "@/components/PageHero";
// HomeHero (components/home/HomeHero.tsx) is kept on disk but not used:
// the original PageHero hero was restored at the client's request.
import HomeSystemsStrip from "@/components/home/HomeSystemsStrip";
import HomeWorkflowDemo from "@/components/home/HomeWorkflowDemo";
import HomePlatform from "@/components/home/HomePlatform";
import HomeAgentsTabs from "@/components/home/HomeAgentsTabs";
import HomePillars from "@/components/home/HomePillars";
import HomeAssessment from "@/components/home/HomeAssessment";
import HomeExamples from "@/components/home/HomeExamples";
import HomeIndustries from "@/components/home/HomeIndustries";
import HomeResources from "@/components/home/HomeResources";
import HomeKnowledgeHub from "@/components/home/HomeKnowledgeHub";
import HomeFinalCTA from "@/components/home/HomeFinalCTA";
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
// the bare "Unntangle Technologies — ..." form for the root URL, since putting
// "Unntangle Technologies | Unntangle Technologies" via the template would be silly. Setting an
// absolute title here overrides the template just for this page.
export const metadata: Metadata = {
  title: {
    absolute: "Unntangle Technologies — AI Implementation & Deployment | Websites, Apps & Software",
  },
  description:
    "Unntangle helps businesses identify repetitive workflows and deploy AI directly into their existing systems — and builds the websites, apps and custom software they run on.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Unntangle Technologies — AI Implementation & Deployment",
    description:
      "Unntangle helps businesses identify repetitive workflows and deploy AI directly into their existing systems — and builds the websites, apps and custom software they run on.",
    url: SITE_URL,
    type: "website",
    images: [
      {
        url: "/images/hero.png",
        width: 1200,
        height: 630,
        alt: "Unntangle Technologies — AI Implementation & Deployment",
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
    "AI implementation and deployment — identifying repetitive business workflows and deploying AI into existing ERP, CRM, email and business systems — plus website, app and custom software development.",
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
        name: "AI Implementation & Deployment",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Workflow Assessment", url: `${SITE_URL}/services/ai-workflow-assessment` } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Agents & Workflow Automation", url: `${SITE_URL}/services/ai-agents` } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI & System Integration", url: `${SITE_URL}/services/ai-integration` } },
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
        name: "Software Engineering",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Website Development", url: `${SITE_URL}/services/website` } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Website Revamp", url: `${SITE_URL}/services/website-revamp` } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "App Development", url: `${SITE_URL}/services/app` } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom Software & ERP Development", url: `${SITE_URL}/services/erp` } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Interactive 3D Websites", url: `${SITE_URL}/services/interactive-3d` } },
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
      {/* Section order: hero → systems strip → live workflow demo (dark) →
          positioning + capabilities → AI workers tabs → three service
          pillars → assessment → workflow examples → industries →
          products & insights → FAQ → closing CTA. */}
      <div style={{ paddingTop: '80px' }}>
        <PageHero
          eyebrow="AI IMPLEMENTATION & DEPLOYMENT"
          titleParts={[
            'AI That Works ',
            { accent: 'Inside Your Business.' },
          ]}
          description="Unntangle identifies repetitive business workflows, builds AI-powered solutions around them, and deploys them into your existing systems. We also build the websites, apps and custom software your business runs on."
          primaryCta={{ label: 'Book an AI Workflow Assessment', href: '/contact' }}
          secondaryCta={{ label: 'Explore Our Services', href: '/services' }}
          image="/images/hero.png"
          imageAlt="Unntangle AI Deployment"
          gradient="blue-cyan"
          imageLayout="stacked-strips"
          overlayCta={{ label: 'Discover your AI workflows', href: '/contact' }}
          bottomLinks={[
            { label: 'AI Implementation', href: '/services/ai-agents' },
            { label: 'Websites & Apps', href: '/services/website' },
            { label: 'Custom Software & ERP', href: '/services/erp' },
          ]}
        />
      </div>
      <HomeSystemsStrip />
      <HomeWorkflowDemo />
      <HomePlatform />
      <HomeAgentsTabs />
      <HomePillars />
      <HomeAssessment />
      <HomeExamples />
      <HomeIndustries />
      <HomeResources />
      <HomeKnowledgeHub />
      {/* HIDDEN-UBIQ: <BrandEcosystem /> */}
      <FAQ />
      <HomeFinalCTA />
      <Footer />
    </main>
  );
}
