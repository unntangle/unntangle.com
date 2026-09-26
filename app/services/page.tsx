import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import HomePillars from "@/components/home/HomePillars";
import ServicesCatalogue from "@/components/services/ServicesCatalogue";
import HomeExamples from "@/components/home/HomeExamples";
import HomeAssessment from "@/components/home/HomeAssessment";
import ServiceTechStack from "@/components/ServiceTechStack";
import FAQ from "@/components/FAQ";
import ServicesCTA from "@/components/services/ServicesCTA";
import { heroGradientFor } from "@/components/pastelPalette";
import Footer from "@/components/Footer";

/**
 * /services — redesigned (Sep 2026) in the same visual language as the
 * home and About pages.
 *
 *   Hero → three pillars → full service catalogue → workflow examples
 *   → how we start (assessment) → tools → FAQ → CTA
 *
 * Previous sections (FeaturedServices horizontal scroll, WhyChooseUs
 * comparison table, OurProcess, MarketingCTA) are left on disk but no
 * longer render here. Metadata lives in app/services/layout.tsx.
 */
export default function ServicesPage() {
    return (
        <main>
            <Navbar />
            <div style={{ paddingTop: '80px' }}>
                <PageHero
                    eyebrow="Services"
                    titleParts={[
                        'AI Implementation.',
                        ' ',
                        { accent: 'Websites, Apps & Software.' },
                    ]}
                    description="We deploy AI into real business workflows, and we build the websites, apps and custom software businesses run on. One team for both — so the AI and the systems it depends on are built to work together."
                    primaryCta={{ label: 'Book an AI Workflow Assessment', href: '/contact' }}
                    secondaryCta={{ label: 'See all services', href: '#all-services' }}
                    image="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1000"
                    images={[
                        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
                        'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800',
                        'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800',
                        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
                    ]}
                    imageAlt="Unntangle services"
                    pills={[
                        { text: 'AI · Websites · Apps · Custom Software — one team', variant: 'cyan', icon: true },
                    ]}
                    softBackground={heroGradientFor('services')}
                    imageLayout="diamond-grid"
                />
            </div>
            <HomePillars />
            <ServicesCatalogue />
            <HomeExamples />
            <HomeAssessment />
            <ServiceTechStack />
            <FAQ />
            <ServicesCTA pageKey="services" />
            <Footer />
        </main>
    );
}
