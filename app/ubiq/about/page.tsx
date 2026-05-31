import type { Metadata } from "next";
import UbiqNav from '@/components/UbiqNav';
import Footer from '@/components/Footer';
import UbiqAboutPage from '@/components/UbiqAboutPage';

const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://unntangle.com";

export const metadata: Metadata = {
    // Layout template appends " | Unntangle".
    title: "About uBIQ",
    description:
        "About uBIQ - Unntangle's smart space automation brand. A vendor-independent integrator that designs intelligent, connected ecosystems for homes, workplaces and commercial spaces. Built on Unntangle's innovation expertise since 2023.",
    keywords: [
        "about uBIQ",
        "uBIQ brand",
        "smart space automation brand",
        "powered by Unntangle",
        "vendor-independent integrator",
        "intelligent spaces",
        "smart home integrator India",
    ],
    alternates: { canonical: "/ubiq/about" },
    openGraph: {
        title: "About uBIQ - Smart Space Automation by Unntangle",
        description:
            "We design intelligent spaces, not just install devices. uBIQ by Unntangle unites world-class technologies into one seamless intelligence layer.",
        url: `${SITE_URL}/ubiq/about`,
        type: "website",
        images: [
            {
                url: "/images/hero.png",
                width: 1200,
                height: 630,
                alt: "About uBIQ - Smart Space Automation by Unntangle",
            },
        ],
    },
};

const aboutPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${SITE_URL}/ubiq/about#webpage`,
    url: `${SITE_URL}/ubiq/about`,
    name: "About uBIQ - Smart Space Automation by Unntangle",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/ubiq#brand` },
    breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "uBIQ", item: `${SITE_URL}/ubiq` },
            { "@type": "ListItem", position: 3, name: "About", item: `${SITE_URL}/ubiq/about` },
        ],
    },
};

export default function UbiqAboutRoute() {
    return (
        <main className="ubiqTheme">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(aboutPageJsonLd).replace(/</g, "\\u003c"),
                }}
            />
            <UbiqNav />
            <UbiqAboutPage />
            <Footer />
        </main>
    );
}
