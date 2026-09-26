import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactHero from "@/components/ContactHero";
import FAQ from "@/components/FAQ";

const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://unntangle.com";

export const metadata: Metadata = {
    // Bare page name; template appends " | Unntangle Technologies". Renders as:
    // "Contact | Unntangle Technologies"
    title: "Contact",
    description:
        "Book an AI Workflow Assessment with Unntangle. Bring us a workflow that's consuming time or requiring repetitive manual work, and we'll help you determine whether AI can automate or augment it.",
    alternates: { canonical: "/contact" },
    openGraph: {
        title: "Contact | Unntangle Technologies",
        description:
            "Book an AI Workflow Assessment. Find where AI can work inside your business.",
        url: `${SITE_URL}/contact`,
        type: "website",
        images: [
            {
                url: "/images/hero.png",
                width: 1200,
                height: 630,
                alt: "Contact Unntangle",
            },
        ],
    },
};

const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${SITE_URL}/contact#contactpage`,
    url: `${SITE_URL}/contact`,
    name: "Contact Unntangle",
    description:
        "Book an AI Workflow Assessment or talk to an Unntangle AI deployment specialist.",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            {
                "@type": "ListItem",
                position: 2,
                name: "Contact",
                item: `${SITE_URL}/contact`,
            },
        ],
    },
};

// `BrandBar` (the "CLIENTS TRUST US" logo strip) is hidden
// because the placeholder logos (Google, KFC, Deloitte, BCG,
// Clutch) weren't real client engagements. Re-import and slot
// it back in once we have legitimate clients with logo permission.

export default function ContactPage() {
    return (
        <main>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(contactJsonLd).replace(
                        /</g,
                        "\\u003c"
                    ),
                }}
            />
            <Navbar />
            <ContactHero />
            <FAQ />
            <Footer />
        </main>
    );
}
