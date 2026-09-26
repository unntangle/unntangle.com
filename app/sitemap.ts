import type { MetadataRoute } from "next";
import { servicesData } from "@/data/services";
import { publishedBlogs as blogsData } from "@/data/blogs";

/**
 * Dynamic sitemap.xml generator.
 *
 * Next.js App Router auto-serves this at /sitemap.xml. We enumerate:
 *   1. Static marketing pages
 *   2. Dynamic /services/[slug] pages (one per servicesData entry)
 *   3. Dynamic /blog/[slug] pages (one per blogsData entry)
 *   4. Legal pages
 *
 * Notes on policy:
 *   - /officemate/* is gone — that subtree was removed from this project
 *     along with the officemate.* host rewrite. Nothing to exclude.
 *   - `lastModified` for blog posts uses the post's publish date when
 *     parseable; falls back to "now" otherwise.
 */

const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://unntangle.com";

// Helper: parse a "Month DD, YYYY" date string into a Date, or return now.
function parseBlogDate(dateStr: string): Date {
    const d = new Date(dateStr);
    return Number.isNaN(d.getTime()) ? new Date() : d;
}

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    // --- 1. Top-level static pages ---
    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: `${SITE_URL}/`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 1.0,
        },
        {
            url: `${SITE_URL}/about`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${SITE_URL}/services`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.9,
        },
        {
            url: `${SITE_URL}/ai-workflow-examples`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${SITE_URL}/industries/manufacturing-distribution`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${SITE_URL}/security`,
            lastModified: now,
            changeFrequency: "yearly",
            priority: 0.5,
        },
        {
            url: `${SITE_URL}/blog`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${SITE_URL}/contact`,
            lastModified: now,
            changeFrequency: "yearly",
            priority: 0.6,
        },
        // HIDDEN-UBIQ: /ubiq now 301s to ubiqautomation.com (see HIDE_UBIQ
        // in middleware.ts). A redirecting URL must not be advertised in the
        // sitemap — only final destinations belong here, and those live in
        // that site's own sitemap.
        // {
        //     url: `${SITE_URL}/ubiq`,
        //     lastModified: now,
        //     changeFrequency: "monthly",
        //     priority: 0.9,
        // },
    ];

    // --- 2. Service detail pages ---
    const serviceRoutes: MetadataRoute.Sitemap = servicesData.map((s) => ({
        url: `${SITE_URL}/services/${s.id}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }));

    // --- 3. Blog detail pages ---
    const blogRoutes: MetadataRoute.Sitemap = blogsData.map((b) => ({
        url: `${SITE_URL}/blog/${b.id}`,
        lastModified: parseBlogDate(b.date),
        changeFrequency: "yearly" as const,
        priority: 0.6,
    }));

    // --- 4. Legal / policy pages (lower priority, rarely change) ---
    const legalRoutes: MetadataRoute.Sitemap = [
        {
            url: `${SITE_URL}/privacy`,
            lastModified: now,
            changeFrequency: "yearly",
            priority: 0.3,
        },
        {
            url: `${SITE_URL}/terms`,
            lastModified: now,
            changeFrequency: "yearly",
            priority: 0.3,
        },
        {
            url: `${SITE_URL}/cookie-preferences`,
            lastModified: now,
            changeFrequency: "yearly",
            priority: 0.3,
        },
    ];

    return [
        ...staticRoutes,
        ...serviceRoutes,
        ...blogRoutes,
        ...legalRoutes,
    ];
}
