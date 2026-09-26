import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
// About page redesign (Sep 2026): the body is now components/about/AboutContent.
// The previous section components (AboutStatsHero, Philosophy, OurJourney,
// OwnResponsibilities, GroupedServices, AboutProducts, BeyondWordmark,
// Roadmap, Vision) are left on disk but no longer render here — their
// content was carried over into AboutContent.
import AboutContent from "@/components/about/AboutContent";
import { heroGradientFor } from "@/components/pastelPalette";

const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://unntangle.com";

export const metadata: Metadata = {
    title: "About",
    description:
        "Unntangle is an AI implementation and deployment company. We identify repetitive workflows, deploy AI into the systems businesses already use, and build websites, apps and custom software.",
    alternates: { canonical: "/about" },
    openGraph: {
        title: "About | Unntangle Technologies",
        description:
            "AI implementation and deployment, plus websites, apps and custom software — from one team in Chennai, India.",
        url: `${SITE_URL}/about`,
        type: "website",
        images: [
            {
                url: "/images/hero.png",
                width: 1200,
                height: 630,
                alt: "About Unntangle",
            },
        ],
    },
};

const aboutJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${SITE_URL}/about#aboutpage`,
    url: `${SITE_URL}/about`,
    name: "About Unntangle",
    description:
        "AI implementation and deployment, plus websites, apps and custom software — from one team.",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: SITE_URL,
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "About",
                item: `${SITE_URL}/about`,
            },
        ],
    },
};

/**
 * About page composition
 *
 * Section order is the narrative arc:
 *   1. PageHero            — gradient card hero (matches home/services)
 *   2. AboutStatsHero      — stat-led intro brick (4 metric tiles)
 *   3. Philosophy          — the company's worldview
 *   4. OurJourney          — interactive timeline (2023 → present)
 *   5. OwnResponsibilities — accountability principles
 *   6. GroupedServices     — what we do (services overview)
 *   7. AboutProducts       — SaaS suite + uSYNQ hero band
 *   8. BeyondWordmark      — typographic transition / vision pivot
 *   9. Roadmap             — what's coming next
 *  10. Vision              — long-term vision close
 *
 * The PageHero uses the green-teal gradient so the About page has
 * its own visual identity:
 *   - Home:      blue-cyan
 *   - Services:  orange-pink
 *   - About:     green-teal
 *   - Blog:      crimson-rose (was purple-pink; purple is uBIQ's brand
 *                colour and that brand now lives on its own domain)
 *
 * AboutStatsHero stays below the PageHero — the two beats together
 * are: "here's who we are at a glance" (gradient hero) → "here's
 * the proof in numbers" (stat tiles). They don't compete because
 * the PageHero is a full-bleed colored card and AboutStatsHero is
 * a centered tile-grid layout on a light background.
 */

export default function AboutPage() {
    return (
        <main>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(aboutJsonLd).replace(
                        /</g,
                        "\\u003c"
                    ),
                }}
            />
            <Navbar />
            <div style={{ paddingTop: '80px' }}>
                <PageHero
                    eyebrow="About Unntangle"
                    titleParts={[
                        'We Don\'t Just Build AI.',
                        ' ',
                        { accent: 'We Put It to Work.' },
                    ]}
                    description="Unntangle helps businesses turn repetitive work into AI-powered workflows inside the systems they already use — and builds the websites, apps and custom software they run on."
                    primaryCta={{
                        label: "Book an AI Workflow Assessment",
                        href: '/contact',
                        showArrow: true,
                    }}
                    secondaryCta={{
                        label: 'Explore Our Services',
                        href: '/services',
                    }}
                    image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200"
                    imageAlt="The Unntangle team collaborating"
                    imageLayout="circle"
                    pills={[
                        { text: 'AI Implementation', variant: 'cyan', icon: true },
                        { text: 'Websites · Apps · Software', variant: 'dark' },
                    ]}
                    softBackground={heroGradientFor('about')}
                />
            </div>
            <AboutContent />
            <Footer />
        </main>
    );
}
