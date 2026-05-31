import type { Metadata } from "next";
import UbiqNav from '@/components/UbiqNav';
import Footer from '@/components/Footer';
import UbiqHero from '@/components/UbiqHero';
import UbiqIntelligence from '@/components/UbiqIntelligence';
import UbiqPillars from '@/components/UbiqPillars';
import UbiqSpaces from '@/components/UbiqSpaces';
import UbiqTech from '@/components/UbiqTech';
import UbiqModes from '@/components/UbiqModes';
import UbiqCTA from '@/components/UbiqCTA';

const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://unntangle.com";

export const metadata: Metadata = {
    // Bare page name; layout template appends " | Unntangle". Renders as:
    // "uBIQ — Smart Home Automation | Unntangle"
    title: "uBIQ — Smart Space Automation",
    description:
        "uBIQ is Unntangle's smart space automation brand — intelligent automation for homes, workplaces and commercial spaces: smart home, lighting, KNX, AV, climate, security, energy management and building automation. Built on Unntangle's innovation expertise since 2023.",
    keywords: [
        "uBIQ",
        "smart space automation",
        "home automation",
        "smart home automation",
        "KNX",
        "KNX automation",
        "lighting automation",
        "AV integration",
        "building automation",
        "commercial automation",
        "IoT",
        "luxury home automation",
        "home automation Chennai",
        "smart building integrator India",
    ],
    alternates: { canonical: "/ubiq" },
    openGraph: {
        title: "uBIQ — Smart Space Automation by Unntangle",
        description:
            "Intelligent spaces, seamless experiences. uBIQ by Unntangle automates homes, workplaces and commercial environments — smart home, KNX, lighting, AV, climate, security and energy.",
        url: `${SITE_URL}/ubiq`,
        type: "website",
        images: [
            {
                url: "/images/hero.png",
                width: 1200,
                height: 630,
                alt: "uBIQ — Smart Space Automation by Unntangle",
            },
        ],
    },
};

// Brand schema for uBIQ as a sub-brand of Unntangle, plus a Service node
// describing the integration offering. Combined with the Organization
// JSON-LD in layout.tsx this lets Google resolve uBIQ as a distinct brand
// under the parent studio.
const ubiqBrandJsonLd = {
    "@context": "https://schema.org",
    "@type": "Brand",
    "@id": `${SITE_URL}/ubiq#brand`,
    name: "uBIQ",
    url: `${SITE_URL}/ubiq`,
    description:
        "uBIQ is Unntangle's smart space automation brand: design, integration and support of intelligent automation for homes, workplaces and commercial spaces, including KNX, lighting, AV, climate, security and energy management.",
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
    slogan: "Your Space. Now Intelligent.",
};

const ubiqServiceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/ubiq#service`,
    serviceType: "Smart Space Automation Design & Integration",
    brand: { "@id": `${SITE_URL}/ubiq#brand` },
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: ["IN"],
    description:
        "End-to-end smart space automation: consultation, design, installation, programming and support across smart home, lighting, KNX, AV, climate, security, energy management and commercial building automation.",
};

const ubiqWebpageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/ubiq#webpage`,
    url: `${SITE_URL}/ubiq`,
    name: "uBIQ — Smart Space Automation by Unntangle",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/ubiq#brand` },
    breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            {
                "@type": "ListItem",
                position: 2,
                name: "uBIQ",
                item: `${SITE_URL}/ubiq`,
            },
        ],
    },
};

export default function UbiqBrandPage() {
    return (
        <main>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(ubiqBrandJsonLd).replace(/</g, "\\u003c"),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(ubiqServiceJsonLd).replace(/</g, "\\u003c"),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(ubiqWebpageJsonLd).replace(/</g, "\\u003c"),
                }}
            />
            <UbiqNav />
            <UbiqHero />
            <UbiqIntelligence />
            <UbiqPillars />
            <UbiqSpaces />
            <UbiqTech />
            <UbiqModes />
            <UbiqCTA />
            <Footer />
        </main>
    );
}
