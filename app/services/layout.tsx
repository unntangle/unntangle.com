import type { Metadata } from "next";
import { servicesData } from "@/data/services";

const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://unntangle.com";

export const metadata: Metadata = {
    title: "Services",
    description:
        "AI implementation and deployment, plus website, app and custom software development — from one team. Deploy AI into your existing ERP, CRM and workflows, and build the systems your business runs on.",
    alternates: { canonical: "/services" },
    openGraph: {
        title: "Services | Unntangle Technologies",
        description:
            "AI implementation and deployment, plus websites, apps and custom software — built by one team.",
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
        "AI implementation and deployment, website development, app development and custom software.",
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
