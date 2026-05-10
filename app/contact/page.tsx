import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactHero from "@/components/ContactHero";
import FAQ from "@/components/FAQ";

const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://unntangle.com";

export const metadata: Metadata = {
    title: "Contact Unntangle — Start a Project, Book a Call",
    description:
        "Get in touch with the Unntangle team. Web, app, design, growth marketing, or smart-living hardware — tell us what you're building and we'll architect a deterministic solution.",
    alternates: { canonical: "/contact" },
    openGraph: {
        title: "Contact Unntangle — Start a Project, Book a Call",
        description:
            "Get in touch with the Unntangle team. Tell us what you're building and we'll architect a deterministic solution.",
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
        "Get in touch with the Unntangle team to start a project or book a discovery call.",
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
