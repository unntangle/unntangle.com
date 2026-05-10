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
            // We only have one favicon-sized WebP today. Declaring it without
            // a `sizes` attribute lets the browser use it at whatever size it
            // needs without lying about dimensions. Chrome DevTools'
            // Manifest panel will warn about a missing 192/512 maskable icon
            // — that's the next thing to fix: generate proper 192×192 and
            // 512×512 PNGs from the brand mark and add them here with
            // accurate `sizes`. Until then this is the honest declaration.
            {
                src: "/images/unntangle_fav.webp",
                type: "image/webp",
                purpose: "any",
            },
            {
                src: "/favicon.ico",
                type: "image/x-icon",
                purpose: "any",
            },
        ],
        categories: ["business", "productivity", "shopping"],
    };
}
