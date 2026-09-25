import type { Metadata } from "next";
import { servicesData } from "@/data/services";

const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://unntangle.com";

export const metadata: Metadata = {
    title: "Services",
    description:
        "AI agents, enterprise automation and the technology that makes AI work — from one accountable team. Deploy AI across sales, finance, operations, procurement and customer service.",
    alternates: { canonical: "/services" },
    openGraph: {
        title: "Services | Unntangle Technologies",
        description:
            "AI agents, enterprise automation and the technology that makes AI work. Connect intelligent agents to your existing ERP, CRM and workflows.",
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
        "Enterprise AI agents and automation — connecting intelligent AI to your existing business systems.",
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
