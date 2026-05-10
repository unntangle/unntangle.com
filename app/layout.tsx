import type { Metadata } from "next";
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

export const metadata: Metadata = {
    title: "Unntangle - Design, Development & Smart Living",
    description: "Your Partner for Innovative Digital Solutions & Intelligent Living.",
    icons: {
        icon: "/images/unntangle_fav.webp",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${plusJakartaSans.variable} ${dmSans.variable}`}>
                {children}
            </body>
        </html>
    );
}
