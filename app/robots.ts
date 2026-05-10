import type { MetadataRoute } from "next";

/**
 * robots.txt — served at /robots.txt.
 *
 * - Allow everything by default for general crawlers.
 * - Disallow API routes & Next internals (defensive — nothing sensitive
 *   lives there today, but no upside to letting them be indexed).
 * - Disallow legacy /shop/usynq paths — they're 308-redirected to
 *   /usynq/products by middleware, but Google occasionally indexes the
 *   redirect source itself; this keeps the canonical URL clean.
 * - Point to the dynamic sitemap.
 */

const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://unntangle.com";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/api/", "/_next/", "/shop/usynq"],
            },
            // Optional: be explicit with major bots so Google/Bing/etc. see
            // an unambiguous rule and don't fall back to the wildcard above.
            {
                userAgent: ["Googlebot", "Bingbot"],
                allow: "/",
                disallow: ["/api/", "/_next/", "/shop/usynq"],
            },
        ],
        sitemap: `${SITE_URL}/sitemap.xml`,
        host: SITE_URL,
    };
}
