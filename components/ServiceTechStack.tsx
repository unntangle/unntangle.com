'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './ServiceTechStack.module.css';

/**
 * /services page "Tools we use" section — flat square-tile grid.
 *
 * Sits between FeaturedServices (the horizontal-scroll showcase)
 * and WhyChooseUs. Functions as the credibility row — visitors
 * can see the actual stack we deliver with, not vague category
 * labels like "AI-powered" or "cloud-native".
 *
 * Logos rendered via Simple Icons CDN (https://simpleicons.org)
 * in monochrome. For tools without a Simple Icons entry, OR for
 * tools whose icon URL fails to load (CDN flakiness, retired
 * slugs, content blockers), the tile falls back to a monochrome
 * lettermark badge — first letter of the tool name in a black
 * filled circle.
 *
 * Failure detection uses React state per-tile rather than DOM
 * sibling juggling. When an <img> fires onError, we mark that
 * tile's index as failed in the `failedSet`, which causes a
 * re-render that swaps the img out for the lettermark span.
 * This is more robust than trying to mutate DOM in onError
 * handlers, especially when the image URL is blocked by a
 * content blocker (in which case the browser may suppress
 * onError altogether — the lettermark is the safe default).
 */

interface TechItem {
    name: string;
    /** Simple Icons slug — see https://simpleicons.org. If a tool
     *  has no Simple Icons logo, set null and the tile renders
     *  the lettermark fallback directly. */
    slug: string | null;
}

const tools: TechItem[] = [
    // Tech
    { name: 'Next.js', slug: 'nextdotjs' },
    { name: 'React', slug: 'react' },
    { name: 'TypeScript', slug: 'typescript' },
    { name: 'Tailwind CSS', slug: 'tailwindcss' },
    { name: 'React Native', slug: 'react' },
    { name: 'Node.js', slug: 'nodedotjs' },
    { name: 'PostgreSQL', slug: 'postgresql' },
    { name: 'Three.js', slug: 'threedotjs' },
    { name: 'AWS', slug: 'amazonwebservices' },
    { name: 'Vercel', slug: 'vercel' },

    // Design
    { name: 'Figma', slug: 'figma' },
    { name: 'Photoshop', slug: 'adobephotoshop' },
    { name: 'Illustrator', slug: 'adobeillustrator' },
    { name: 'After Effects', slug: 'adobeaftereffects' },
    { name: 'Blender', slug: 'blender' },
    { name: 'Cinema 4D', slug: null },
    { name: 'Midjourney', slug: null },
    { name: 'Stable Diffusion', slug: null },
    { name: 'ComfyUI', slug: null },

    // Marketing
    { name: 'Meta Ads', slug: 'meta' },
    { name: 'Google Ads', slug: 'googleads' },
    { name: 'Analytics 4', slug: 'googleanalytics' },
    { name: 'Search Console', slug: null },
    { name: 'Tag Manager', slug: 'googletagmanager' },
    { name: 'Looker Studio', slug: null },
    { name: 'Ahrefs', slug: 'ahrefs' },
    { name: 'SEMrush', slug: 'semrush' },
    { name: 'Hootsuite', slug: 'hootsuite' },
];

export default function ServiceTechStack() {
    /* Track which tiles' images have failed to load. A Set of
       indices is reasonable here because the tools array is
       static — index uniquely identifies each tile. Using a Set
       (not an array) gives O(1) `has` lookups and naturally
       de-dupes if onError happens to fire twice. */
    const [failedSet, setFailedSet] = useState<Set<number>>(new Set());

    const markFailed = (idx: number) => {
        setFailedSet((prev) => {
            if (prev.has(idx)) return prev;
            const next = new Set(prev);
            next.add(idx);
            return next;
        });
    };

    return (
        <section className={styles.section}>
            <div className={`container ${styles.container}`}>
                <div className={styles.header}>
                    <span className="tag">Tools &amp; Technologies</span>
                    <h2>The toolkit behind every engagement</h2>
                    <p>
                        No mystery stack, no aspirational logos. Here&apos;s the actual
                        toolkit our engineers, designers, and growth team use to ship
                        every project across web, mobile, design, and performance.
                    </p>
                </div>

                <motion.div
                    className={styles.grid}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6 }}
                >
                    {tools.map((tool, i) => {
                        // Use lettermark when slug is null OR when the
                        // image has failed to load at runtime.
                        const useLettermark = !tool.slug || failedSet.has(i);

                        return (
                            <motion.div
                                key={`${tool.name}-${i}`}
                                className={styles.tile}
                                initial={{ opacity: 0, scale: 0.92 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.4,
                                    delay: 0.02 * i,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                            >
                                <div className={styles.iconBox}>
                                    {useLettermark ? (
                                        <span
                                            className={styles.iconFallback}
                                            aria-hidden="true"
                                        >
                                            {tool.name.charAt(0)}
                                        </span>
                                    ) : (
                                        <img
                                            src={`https://cdn.simpleicons.org/${tool.slug}/111111`}
                                            alt=""
                                            className={styles.icon}
                                            width={36}
                                            height={36}
                                            onError={() => markFailed(i)}
                                        />
                                    )}
                                </div>
                                <span className={styles.toolName}>{tool.name}</span>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
