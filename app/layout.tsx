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
        // template appends " | Unntangle".
        //
        // `default` is used when a child page sets NO title. The home page
        // overrides both the template AND default via `title.absolute`
        // (see app/page.tsx) so it appears as just "Unntangle — ...".
        template: "%s | Unntangle",
        default: "Unntangle — Design, Development & Smart Living",
    },
    description:
        "Unntangle is your growth partner for premium web & app development, creative design, growth marketing, and intelligent smart-living systems. One studio, three disciplines, real outcomes.",
    applicationName: "Unntangle",
    authors: [{ name: "Unntangle", url: SITE_URL }],
    creator: "Unntangle",
    publisher: "Unntangle",
    generator: "Next.js",
    keywords: [
        "Unntangle",
        "web development",
        "app development",
        "ERP development",
        "website revamp",
        "interactive 3D website",
        "WebGL",
        "graphic design",
        "3D design",
        "AI image rendition",
        "Meta Ads",
        "social media marketing",
        "SEO services",
        "Google Ads",
        "smart home",
        "smart switches",
        "ZigBee",
        "biometric door lock",
        "uSYNQ",
        "OfficeMate",
        "Chennai",
        "India",
        "digital agency",
    ],
    alternates: {
        canonical: "/",
    },
    openGraph: {
        type: "website",
        siteName: "Unntangle",
        title: "Unntangle — Design, Development & Smart Living",
        description:
            "Your partner for premium digital products and intelligent living. Web, mobile, ERP, 3D, design, growth marketing, and smart-home hardware — all under one accountable studio.",
        url: SITE_URL,
        locale: "en_US",
        images: [
            {
                url: "/images/hero.png",
                width: 1200,
                height: 630,
                alt: "Unntangle — Design, Development & Smart Living",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Unntangle — Design, Development & Smart Living",
        description:
            "Your partner for premium digital products and intelligent living. Web, mobile, ERP, 3D, design, growth marketing, and smart-home hardware.",
        images: ["/images/hero.png"],
        creator: "@unntangle",
        site: "@unntangle",
    },
    icons: {
        // Order matters: browsers pick the first format they support, so put
        // the universal ICO first, then the modern WebP. The actual ICO
        // file lives at app/favicon.ico (auto-served by Next at /favicon.ico
        // via the App Router file convention).
        //
        // Why this fixes the "favicon not showing" issue:
        //   - Next's app/favicon.ico convention emits one <link> tag for us
        //     automatically. Declaring it again here is harmless but redundant.
        //   - The previous config only declared the WebP variant, which is
        //     fine on Chrome/Edge but silently ignored by older Safari and
        //     some embed/preview tools — they expected ICO and got nothing.
        //   - Adding explicit `sizes` hints helps the browser pick the
        //     correct asset for the tab vs. address bar vs. bookmark.
        icon: [
            { url: "/favicon.ico", sizes: "any", type: "image/x-icon" },
            { url: "/images/unntangle_fav.webp", type: "image/webp" },
        ],
        shortcut: "/favicon.ico",
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
        "Unntangle is a full-stack technology and digital studio building products, platforms, and brands across web, mobile, design, growth marketing, and smart-living hardware.",
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
            email: "hello@unntangle.com",
            url: `${SITE_URL}/contact`,
            availableLanguage: ["English"],
        },
    ],
    brand: [
        {
            "@type": "Brand",
            name: "uSYNQ",
            url: `${SITE_URL}/usynq`,
        },
        {
            "@type": "Brand",
            name: "OfficeMate",
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
        "Design, development, growth marketing, and smart-living solutions from a single accountable studio.",
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
