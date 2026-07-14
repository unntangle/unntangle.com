import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import AboutStatsHero from "@/components/AboutStatsHero";
import Philosophy from "@/components/Philosophy";
import OurJourney from "@/components/OurJourney";
import OwnResponsibilities from "@/components/OwnResponsibilities";
import GroupedServices from "@/components/GroupedServices";
import AboutProducts from "@/components/AboutProducts";
import BeyondWordmark from "@/components/BeyondWordmark";
import Roadmap from "@/components/Roadmap";
import Vision from "@/components/Vision";

const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://unntangle.com";

export const metadata: Metadata = {
    // Bare page name; template in app/layout.tsx appends " | Unntangle".
    // Renders as: "About | Unntangle"
    title: "About",
    description:
        "Unntangle is a full-stack technology and digital studio building products, platforms, and brands behind ambitious businesses across India and beyond. Engineering, design, growth, and smart-living hardware in one accountable team.",
    alternates: { canonical: "/about" },
    openGraph: {
        // OG titles are emitted as absolute strings (no template), so we
        // write the full standalone form here for cleaner social previews.
        title: "About | Unntangle",
        description:
            "A full-stack technology and digital studio bringing engineering, design, growth, and smart-living hardware under one accountable team.",
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
        "A full-stack technology and digital studio bringing engineering, design, growth, and smart-living hardware under one accountable team.",
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
 *   - Blog:      purple-pink (default)
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
                    eyebrow="Who We Are"
                    titleParts={[
                        'A studio built to ',
                        { accent: 'ship work that matters' },
                        '.',
                    ]}
                    description="A full-stack technology and digital company bringing engineering, design, growth, and smart-living hardware under one accountable team."
                    primaryCta={{
                        label: "Let's talk",
                        href: '/contact',
                        showArrow: true,
                    }}
                    secondaryCta={{
                        label: 'See our work',
                        href: '/services',
                    }}
                    image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1600"
                    imageAlt="The Unntangle team collaborating in studio"
                    imageLayout="diamond-grid"
                    images={[
                        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200',
                        'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200',
                        'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1200',
                        'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1200',
                    ]}
                    pills={[{ text: 'One team. Every layer.', variant: 'cyan', icon: true }]}
                    gradient="green-teal"
                />
            </div>
            <AboutStatsHero />
            <Philosophy />
            <OurJourney />
            <OwnResponsibilities />
            <GroupedServices />
            <AboutProducts />
            <BeyondWordmark />
            <Roadmap />
            <Vision />
            <Footer />
        </main>
    );
}
