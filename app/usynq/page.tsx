import type { Metadata } from "next";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import UsynqHero from '@/components/UsynqHero';
import UsynqBenefits from '@/components/UsynqBenefits';
import UsynqBrand from '@/components/UsynqBrand';

const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://unntangle.com";

export const metadata: Metadata = {
    // Bare page name; template appends " | Unntangle". Renders as:
    // "uSYNQ — Smart Living | Unntangle"
    title: "uSYNQ — Smart Living",
    description:
        "uSYNQ is Unntangle's smart living brand. Premium ZigBee switch panels, touch switches, retrofit modules, and biometric smart locks engineered as one ecosystem.",
    keywords: [
        "uSYNQ",
        "smart switches",
        "ZigBee switches",
        "smart home India",
        "biometric door lock",
        "TITAN smart switch",
        "Velux touch switch",
        "Luxeray switches",
        "retrofit modules",
        "smart living",
        "home automation",
    ],
    alternates: { canonical: "/usynq" },
    openGraph: {
        title: "uSYNQ — Smart Living | Unntangle",
        description:
            "Premium ZigBee switch panels, touch switches, retrofit modules, and biometric smart locks engineered as one ecosystem.",
        url: `${SITE_URL}/usynq`,
        type: "website",
        images: [
            {
                url: "/images/usynq_banner.png",
                width: 1200,
                height: 630,
                alt: "uSYNQ — Smart Living by Unntangle",
            },
        ],
    },
};

// Brand schema for uSYNQ as a sub-brand of Unntangle. Combined with the
// /usynq/products page (Product/ItemList), this lets Google build a
// brand-specific knowledge structure separate from the parent agency.
const usynqBrandJsonLd = {
    "@context": "https://schema.org",
    "@type": "Brand",
    "@id": `${SITE_URL}/usynq#brand`,
    name: "uSYNQ",
    url: `${SITE_URL}/usynq`,
    logo: `${SITE_URL}/images/uSYNQ/uSYNQ-brand-logo.webp`,
    description:
        "uSYNQ is Unntangle's smart living brand: ZigBee switch panels, touch switches, retrofit modules, and biometric smart locks engineered as one ecosystem.",
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
    slogan: "Smart living, engineered.",
};

const usynqWebpageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/usynq#webpage`,
    url: `${SITE_URL}/usynq`,
    name: "uSYNQ — Smart Living by Unntangle",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/usynq#brand` },
    breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            {
                "@type": "ListItem",
                position: 2,
                name: "uSYNQ",
                item: `${SITE_URL}/usynq`,
            },
        ],
    },
};

export default function UsynqBrandPage() {
    return (
        <main>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(usynqBrandJsonLd).replace(
                        /</g,
                        "\\u003c"
                    ),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(usynqWebpageJsonLd).replace(
                        /</g,
                        "\\u003c"
                    ),
                }}
            />
            <Navbar />
            <div style={{ paddingTop: '80px' }}>
                <UsynqHero />
            </div>
            <UsynqBenefits />
            <UsynqBrand />
            <Footer />
        </main>
    );
}
