import type { Metadata } from "next";
import { servicesData } from "@/data/services";

const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://unntangle.com";

export const metadata: Metadata = {
    // Bare page name; template appends " | Unntangle". Renders as:
    // "Services | Unntangle"
    title: "Services",
    description:
        "Twelve services across Technology Solutions, Creative Design, and Growth Marketing. Web & app development, ERP, 3D, AI, Meta Ads, SEO, and more — from one accountable studio.",
    alternates: { canonical: "/services" },
    openGraph: {
        title: "Services | Unntangle",
        description:
            "Twelve services across Technology Solutions, Creative Design, and Growth Marketing. Web & app development, ERP, 3D, AI, Meta Ads, SEO, and more.",
        url: `${SITE_URL}/services`,
        type: "website",
        images: [
            {
                url: "/images/hero.png",
                width: 1200,
                height: 630,
                alt: "Unntangle Services",
            },
        ],
    },
};

// CollectionPage + ItemList of all services. Helps Google build a "site
// links" pattern under the services entry, and provides a rich snippet
// ready listing.
const servicesJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/services#collection`,
    url: `${SITE_URL}/services`,
    name: "Unntangle Services",
    description:
        "Technology, creative design, and growth marketing services from Unntangle.",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            {
                "@type": "ListItem",
                position: 2,
                name: "Services",
                item: `${SITE_URL}/services`,
            },
        ],
    },
    mainEntity: {
        "@type": "ItemList",
        itemListElement: servicesData.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${SITE_URL}/services/${s.id}`,
            name: s.title,
        })),
    },
};

export default function ServicesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(servicesJsonLd).replace(
                        /</g,
                        "\\u003c"
                    ),
                }}
            />
            {children}
        </>
    );
}
