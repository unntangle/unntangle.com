'use client';

import { motion } from 'framer-motion';
import styles from './TechStack.module.css';

/**
 * Home-page "Tech Stack" section.
 *
 * Displays the technology categories Unntangle works with as a
 * categorised logo wall. Logos pulled from Simple Icons
 * (https://simpleicons.org) — a free, MIT-licensed SVG icon set
 * served via cdn.simpleicons.org.
 *
 * Slugs follow the Simple Icons convention (lowercase, no spaces,
 * dots written as the word "dot" e.g. `nodedotjs`). If a slug
 * 404s (Simple Icons occasionally retires icons on brand request)
 * the onError handler hides just the image so the pill still
 * reads cleanly with the brand name.
 *
 * Icons are rendered in monochrome black (#111111) so the wall
 * looks unified regardless of source brand colours.
 */

interface TechItem {
    name: string;
    /** Simple Icons slug — see https://simpleicons.org */
    slug: string;
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
            { name: 'AWS', slug: 'amazon' },
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

export default function TechStack() {
    return (
        <section className={styles.section}>
            <div className={`container ${styles.container}`}>
                <div className={styles.header}>
                    <span className="tag">Tech Stack</span>
                    <h2>The toolkit behind every build</h2>
                    <p>
                        Battle-tested technologies we use to ship fast, scale safely, and
                        build interfaces that don&apos;t feel boring.
                    </p>
                </div>

                <div className={styles.categories}>
                    {categories.map((cat, ci) => (
                        <motion.div
                            key={cat.label}
                            className={styles.category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: ci * 0.08 }}
                        >
                            <span className={styles.categoryLabel}>{cat.label}</span>

                            <div className={styles.logos}>
                                {cat.items.map((tech) => (
                                    <div key={tech.slug} className={styles.logoTile}>
                                        <img
                                            src={`https://cdn.simpleicons.org/${tech.slug}/111111`}
                                            alt={tech.name}
                                            className={styles.logoImg}
                                            loading="lazy"
                                            width={28}
                                            height={28}
                                            onError={(e) => {
                                                // Hide broken image so the pill still
                                                // reads cleanly with just the brand name
                                                (e.currentTarget as HTMLImageElement).style.display = 'none';
                                            }}
                                        />
                                        <span className={styles.logoName}>{tech.name}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
