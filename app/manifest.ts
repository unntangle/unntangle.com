import type { MetadataRoute } from "next";

/**
 * Web App Manifest — served at /manifest.webmanifest.
 *
 * Even though we're not building a full PWA, having a manifest:
 *   1. Improves Lighthouse SEO scores
 *   2. Lets Android users "Add to home screen" with a real icon/title
 *   3. Provides theme color + display hints to mobile browsers
 *   4. Is a tiny win that costs nothing
 */
export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Unntangle — Design, Development & Smart Living",
        short_name: "Unntangle",
        description:
            "Your partner for premium digital products and intelligent living.",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#0a0a0a",
        orientation: "portrait",
        icons: [
            {
                src: "/images/unntangle_fav.webp",
                sizes: "192x192",
                type: "image/webp",
                purpose: "any",
            },
            {
                src: "/images/unntangle_fav.webp",
                sizes: "512x512",
                type: "image/webp",
                purpose: "any",
            },
        ],
        categories: ["business", "productivity", "shopping"],
    };
}
