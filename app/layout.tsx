import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, DM_Sans } from "next/font/google";
import "./globals.css";

/**
 * Font loading.
 *
 * Body  → Plus Jakarta Sans  (--font-plus-jakarta-sans)
 * Heads → DM Sans            (--font-outfit, --font-dm-sans, --font-title)
 *
 * NOTE on the variable name: we swapped the heading face from
 * Outfit to DM Sans (a closer free match to Google Sans, the
 * proprietary Google product face). Rather than rename
 * `--font-outfit` everywhere it's hardcoded across the
 * components, we keep the variable name and just point it at
 * DM Sans. The result: every component that references
 * `var(--font-outfit)` automatically gets DM Sans with zero
 * per-file changes. We also expose `--font-dm-sans` and the
 * semantic `--font-title` aliases for any future code that
 * wants to be explicit about the family.
 *
 * Why DM Sans:
 *   - Designed by Colophon Foundry in collaboration with Google
 *   - The closest free, open-source match to Google Sans /
 *     Product Sans (~82% similarity, friendliest geometric DNA)
 *   - Generous round counters and warm geometric construction
 *     give it the same Google-product feel as Google Sans
 */

const plusJakartaSans = Plus_Jakarta_Sans({
    variable: "--font-plus-jakarta-sans",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
    // Multiple variable names so legacy `var(--font-outfit)` calls
    // and forward-looking `var(--font-dm-sans)` calls both work.
    variable: "--font-outfit",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800", "900"],
    display: "swap",
});

// Site-wide canonical base URL. Read from env so we can override on staging,
// fall back to production. metadataBase makes every relative `og:image` and
// `canonical` URL throughout the app resolve correctly.
const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://unntangle.com";

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#ffffff" },
        { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    ],
};

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        // %s gets replaced with the page-specific title set by each child
        // page. Pages set the bare page name (e.g. "About") and the
        // template appends " | Unntangle Technologies".
        //
        // `default` is used when a child page sets NO title. The home page
        // overrides both the template AND default via `title.absolute`
        // (see app/page.tsx) so it appears as just "Unntangle Technologies — ...".
        template: "%s | Unntangle Technologies",
        default: "Unntangle Technologies — AI Implementation & Deployment",
    },
    description:
        "Unntangle identifies repetitive business workflows and deploys AI into your existing systems — and builds the websites, apps and custom software your business runs on.",
    applicationName: "Unntangle Technologies",
    authors: [{ name: "Unntangle Technologies", url: SITE_URL }],
    creator: "Unntangle Technologies",
    publisher: "Unntangle Technologies",
    generator: "Next.js",
    keywords: [
        "Unntangle Technologies",
        "AI implementation",
        "AI deployment",
        "AI workflow assessment",
        "AI agents",
        "AI automation",
        "business process automation",
        "AI sales agent",
        "AI finance agent",
        "AI procurement agent",
        "AI customer service agent",
        "ERP integration",
        "CRM automation",
        "WhatsApp automation",
        "manufacturing AI",
        "B2B AI automation",
        "website development",
        "website revamp",
        "app development",
        "custom software development",
        "custom ERP development",
        "uVOIZ",
        "uDYLR",
        "uSCRIBR",
        "Chennai",
        "India",
    ],
    alternates: {
        canonical: "/",
    },
    openGraph: {
        type: "website",
        siteName: "Unntangle Technologies",
        title: "Unntangle Technologies — AI Implementation & Deployment",
        description:
            "We deploy AI into your existing systems, and build the websites, apps and custom software your business runs on.",
        url: SITE_URL,
        locale: "en_US",
        images: [
            {
                url: "/images/hero.png",
                width: 1200,
                height: 630,
                alt: "Unntangle Technologies — AI Implementation & Deployment",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Unntangle Technologies — AI Implementation & Deployment",
        description:
            "We deploy AI into your existing systems, and build the websites, apps and custom software your business runs on.",
        images: ["/images/hero.png"],
        creator: "@unntangle",
        site: "@unntangle",
    },
    icons: {
        // Use the brand-specific WebP icon as the primary favicon.
        // We removed the reference to /favicon.ico because it was
        // showing the default Vercel logo.
        icon: [
            { url: "/images/unntangle_fav.webp", type: "image/webp" },
        ],
        shortcut: "/images/unntangle_fav.webp",
        apple: "/images/unntangle_fav.webp",
    },
    manifest: "/manifest.webmanifest",
    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    category: "technology",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
};

/**
 * JSON-LD structured data for the Organization. Surfaced on every page so
 * Google can build a knowledge panel and resolve us as a single entity
 * across all subpages. Keep this in sync with /about content.
 */
const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Unntangle",
    url: SITE_URL,
    logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/unntangle_logo.webp`,
        width: 512,
        height: 512,
    },
    image: `${SITE_URL}/images/hero.png`,
    description:
        "Unntangle is an AI implementation and deployment company. It identifies repetitive business workflows, deploys AI into existing ERP, CRM, email and business systems, and builds websites, apps and custom software.",
    foundingDate: "2023",
    address: {
        "@type": "PostalAddress",
        addressLocality: "Chennai",
        addressRegion: "Tamil Nadu",
        addressCountry: "IN",
    },
    sameAs: [
        "https://www.linkedin.com/company/unntangle",
        "https://www.instagram.com/unntangle",
        "https://x.com/unntangle",
    ],
    contactPoint: [
        {
            "@type": "ContactPoint",
            contactType: "customer support",
            email: "gokul@unntangle.com",
            url: `${SITE_URL}/contact`,
            availableLanguage: ["English"],
        },
    ],
    brand: [
        // HIDDEN-UBIQ: this entry pointed crawlers at ${SITE_URL}/ubiq, which
        // now 301s. It points at the brand's own domain instead, so Google
        // resolves ubiqautomation.com as a brand of this organization.
        {
            "@type": "Brand",
            name: "uBIQ",
            url: "https://ubiqautomation.com",
        },
    ],
};

const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "Unntangle",
    description:
        "AI implementation and deployment, websites, apps and custom software from Unntangle.",
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-US",
    potentialAction: {
        "@type": "SearchAction",
        target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                {/* Preconnects for third-party assets used above the fold.
                    Image CDN (Unsplash) is referenced from many service/blog
                    heroes; preconnecting saves the TLS handshake on first paint. */}
                <link rel="preconnect" href="https://images.unsplash.com" />
                <link
                    rel="dns-prefetch"
                    href="https://images.unsplash.com"
                />
            </head>
            <body
                className={`${plusJakartaSans.variable} ${dmSans.variable}`}
            >
                {children}

                {/* Site-wide JSON-LD structured data. Plain <script> tags
                    (not next/script) per the official Next.js JSON-LD
                    guide — JSON-LD isn't executable code and needs to
                    appear in the SSR'd HTML for crawlers, which next/script
                    with beforeInteractive only does for the root layout's
                    head, not for arbitrary pages. The `<` → `\u003c` escape
                    is a small XSS-hardening step recommended by Next. */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(organizationJsonLd).replace(
                            /</g,
                            "\\u003c"
                        ),
                    }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(websiteJsonLd).replace(
                            /</g,
                            "\\u003c"
                        ),
                    }}
                />
            </body>
        </html>
    );
}
