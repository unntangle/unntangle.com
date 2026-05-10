import type { Metadata } from "next";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import UsynqShowcase from '@/components/UsynqShowcase';
import { usynqProducts, usynqCategories } from '@/data/usynqProducts';

const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://unntangle.com";

export const metadata: Metadata = {
    // Bare page name; template appends " | Unntangle". Renders as:
    // "uSYNQ Products | Unntangle"
    title: "uSYNQ Products",
    description:
        "Explore the complete uSYNQ smart home collection: TITAN switch panels, Velux & Luxeray touch switches, ZigBee retrofit modules, and biometric & face-recognition smart door locks.",
    keywords: [
        "uSYNQ products",
        "smart switches India",
        "ZigBee switch panel",
        "TITAN switch",
        "Velux touch switch",
        "Luxeray switch",
        "ZigBee retrofit module",
        "biometric smart door lock",
        "face recognition lock",
        "smart curtain switch",
    ],
    alternates: { canonical: "/usynq/products" },
    openGraph: {
        title: "uSYNQ Products | Unntangle",
        description:
            "TITAN switch panels, Velux & Luxeray touch switches, ZigBee retrofit modules, and biometric & face-recognition smart door locks.",
        url: `${SITE_URL}/usynq/products`,
        type: "website",
        images: [
            {
                url: "/images/usynq_banner.png",
                width: 1200,
                height: 630,
                alt: "uSYNQ Products",
            },
        ],
    },
};

// CollectionPage + ItemList of all uSYNQ products. We don't include
// price/availability here because the showcase is brochure-only — adding
// fake offers would be a Search-Console violation. Title/category/image
// is enough to get Google to index each product variant.
const productsJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/usynq/products#collection`,
    url: `${SITE_URL}/usynq/products`,
    name: "uSYNQ Smart Living Products",
    description:
        "Complete catalogue of uSYNQ smart home hardware: switches, retrofit modules, and door locks.",
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
            {
                "@type": "ListItem",
                position: 3,
                name: "Products",
                item: `${SITE_URL}/usynq/products`,
            },
        ],
    },
    mainEntity: {
        "@type": "ItemList",
        numberOfItems: usynqProducts.length,
        itemListElement: usynqProducts.map((p, i) => {
            const cat = usynqCategories.find((c) => c.id === p.category);
            return {
                "@type": "ListItem",
                position: i + 1,
                item: {
                    "@type": "Product",
                    name: p.name,
                    sku: p.sku,
                    image: `${SITE_URL}${p.image}`,
                    category: cat?.label,
                    brand: { "@type": "Brand", name: "uSYNQ" },
                    manufacturer: { "@id": `${SITE_URL}/#organization` },
                },
            };
        }),
    },
};

export default function UsynqProductsPage() {
    return (
        <main style={{ backgroundColor: '#fafafa', minHeight: '100vh' }}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(productsJsonLd).replace(
                        /</g,
                        "\\u003c"
                    ),
                }}
            />
            <Navbar />
            <UsynqShowcase />
            <Footer />
        </main>
    );
}
