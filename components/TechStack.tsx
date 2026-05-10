'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './TechStack.module.css';

/**
 * Home-page "Tech Stack" section.
 *
 * Each category row is a horizontal infinite-scroll marquee, with
 * adjacent rows scrolling in opposite directions so the section
 * reads as a zigzag wall of motion. Same animation pattern that
 * the previous ClientCarousel used (still on disk in
 * components/ClientCarousel.module.css for reference) — chosen
 * because it gives the page kinetic energy without requiring
 * scroll-trigger interactions, and looks intentional even when
 * the user hasn't scrolled to the section yet.
 *
 * Logos pulled from Simple Icons (https://simpleicons.org) — a
 * free, MIT-licensed SVG icon set served via cdn.simpleicons.org.
 * Slugs follow the Simple Icons convention (lowercase, no spaces,
 * dots written as the word "dot" e.g. `nodedotjs`).
 *
 * Resilient fallback strategy (mirrors ServiceTechStack):
 *   - If the slug is null/empty OR the image fails to load,
 *     the tile renders a monochrome lettermark badge instead.
 *   - <img alt=""> is empty so a broken image doesn't leak the
 *     tool name as alt text into the tile layout (avoids the
 *     "otion"/"Post"/"lender" rendering bugs).
 *   - Failure tracking uses React state per-row (failedSet of
 *     tile indices) so re-render cleanly unmounts the broken
 *     <img> and mounts the lettermark in its place.
 */

interface TechItem {
    name: string;
    /** Simple Icons slug — see https://simpleicons.org. Set to null
     *  if a tool has no Simple Icons entry; the tile will render
     *  the lettermark fallback directly without attempting fetch. */
    slug: string | null;
}

interface TechCategory {
    label: string;
    items: TechItem[];
}

const categories: TechCategory[] = [
    {
        label: 'Frontend',
        items: [
            { name: 'React', slug: 'react' },
            { name: 'Next.js', slug: 'nextdotjs' },
            { name: 'TypeScript', slug: 'typescript' },
            { name: 'Tailwind CSS', slug: 'tailwindcss' },
            { name: 'Framer Motion', slug: 'framer' },
            { name: 'Three.js', slug: 'threedotjs' },
        ],
    },
    {
        label: 'Backend & Data',
        items: [
            { name: 'Node.js', slug: 'nodedotjs' },
            { name: 'Python', slug: 'python' },
            { name: 'PostgreSQL', slug: 'postgresql' },
            { name: 'MongoDB', slug: 'mongodb' },
            { name: 'Redis', slug: 'redis' },
            { name: 'GraphQL', slug: 'graphql' },
        ],
    },
    {
        label: 'Cloud & DevOps',
        items: [
            { name: 'AWS', slug: 'amazonwebservices' },
            { name: 'Vercel', slug: 'vercel' },
            { name: 'Docker', slug: 'docker' },
            { name: 'GitHub Actions', slug: 'githubactions' },
            { name: 'Cloudflare', slug: 'cloudflare' },
            { name: 'Supabase', slug: 'supabase' },
        ],
    },
    {
        label: 'Design & Creative',
        items: [
            { name: 'Figma', slug: 'figma' },
            { name: 'Blender', slug: 'blender' },
            { name: 'Photoshop', slug: 'adobephotoshop' },
            { name: 'Illustrator', slug: 'adobeillustrator' },
            { name: 'After Effects', slug: 'adobeaftereffects' },
        ],
    },
];

/**
 * Single horizontal marquee row.
 *
 * Tripled to give the looping seam enough buffer that the user
 * can't perceive the jump back to start. The animation is a
 * pure x-translation; the parent has overflow:hidden so the
 * extra duplicate items aren't visible.
 *
 * `direction = 1` scrolls right-to-left (default for odd rows).
 * `direction = -1` scrolls left-to-right (alternates per row to
 * create the zigzag pattern).
 *
 * Failure tracking note: the failedSet uses the *original* index
 * (i % items.length), not the tripled index, so when one of the
 * three duplicates of a given tool fails to load, all three
 * duplicates of that tool fall back to the lettermark together.
 * Otherwise the user would see e.g. "React with logo" sliding
 * past, then "React with lettermark", which would look like a
 * bug rather than a graceful fallback.
 */
function MarqueeRow({
    items,
    direction,
    speed,
}: {
    items: TechItem[];
    direction: 1 | -1;
    speed: number;
}) {
    // Track failed-load indices (relative to the original items
    // array, not the tripled list). Using a Set gives O(1) `has`
    // lookups and natural de-dupe if onError fires multiple times
    // for the same logical tool (it would, since each tool appears
    // 3 times in the tripled list).
    const [failedSet, setFailedSet] = useState<Set<number>>(new Set());

    const markFailed = (originalIdx: number) => {
        setFailedSet((prev) => {
            if (prev.has(originalIdx)) return prev;
            const next = new Set(prev);
            next.add(originalIdx);
            return next;
        });
    };

    // Triple the items so the looping seam is invisible. The
    // animation translates -1/3 of the track width which lands on
    // the second copy at the same visual position as the first.
    const tripled = [...items, ...items, ...items];

    return (
        <div className={styles.scrollWrapper}>
            <motion.div
                className={styles.scrollTrack}
                animate={{
                    x: direction === 1 ? ['0%', '-33.333%'] : ['-33.333%', '0%'],
                }}
                transition={{
                    repeat: Infinity,
                    ease: 'linear',
                    duration: speed,
                }}
            >
                {tripled.map((tech, i) => {
                    // Map back to the index within the original items
                    // array so all three copies of one tool share a
                    // single fallback state.
                    const originalIdx = i % items.length;
                    const useLettermark = !tech.slug || failedSet.has(originalIdx);

                    return (
                        <div key={`${tech.name}-${i}`} className={styles.logoTile}>
                            {useLettermark ? (
                                <span
                                    className={styles.logoFallback}
                                    aria-hidden="true"
                                >
                                    {tech.name.charAt(0)}
                                </span>
                            ) : (
                                <img
                                    src={`https://unpkg.com/simple-icons@latest/icons/${tech.slug}.svg`}
                                    alt=""
                                    className={styles.logoImg}
                                    width={22}
                                    height={22}
                                    onError={() => markFailed(originalIdx)}
                                />
                            )}
                            <span className={styles.logoName}>{tech.name}</span>
                        </div>
                    );
                })}
            </motion.div>
        </div>
    );
}

export default function TechStack() {
    return (
        <section className={styles.section}>
            <div className={styles.headerContainer}>
                <div className={styles.header}>
                    <span className="tag">Tech Stack</span>
                    <h2>The toolkit behind every build</h2>
                    <p>
                        Battle-tested technologies we use to ship fast, scale safely, and
                        build interfaces that don&apos;t feel boring.
                    </p>
                </div>
            </div>

            {/* Marquee stack sits OUTSIDE the constrained container
                so each row's scroll wrapper runs viewport-edge-to-edge.
                The label inside each row uses its own padded inner
                container so it stays visually aligned with the
                header text above. */}
            <div className={styles.marqueeStack}>
                {categories.map((cat, ci) => (
                    <motion.div
                        key={cat.label}
                        className={styles.categoryRow}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.5, delay: ci * 0.08 }}
                    >
                        <div className={styles.labelInner}>
                            <span className={styles.categoryLabel}>{cat.label}</span>
                        </div>

                        <MarqueeRow
                            items={cat.items}
                            // Alternate direction per row: 1, -1, 1, -1.
                            // ci % 2 === 0 → Frontend, Cloud & DevOps
                            // scroll right-to-left. Backend & Design
                            // scroll left-to-right. Net effect is the
                            // zigzag marquee pattern requested.
                            direction={ci % 2 === 0 ? 1 : -1}
                            // Slightly varied speeds per row so the
                            // motion feels organic rather than perfectly
                            // synchronised. Range 38-46s for one full
                            // loop of the (tripled) track.
                            speed={38 + ci * 2.5}
                        />
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
