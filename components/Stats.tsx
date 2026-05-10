'use client';

import { motion } from 'framer-motion';
import { Layers3, Code2, Palette, TrendingUp, ArrowUpRight } from 'lucide-react';
import styles from './Stats.module.css';

/**
 * Home-page "Architecture of Impact" section.
 *
 * Communicates Unntangle's three core service pillars (Technology
 * Solutions, Creative Design, Growth Marketing) plus a featured
 * value-prop card on the left summarising why those pillars work
 * better when delivered together.
 *
 * The right-side metric cards mirror the categories from the
 * Services section above (expertiseGroups in Services.tsx) so the
 * narrative is consistent: "here's what we do" → "here's how we
 * do it together" → product / case-study sections below.
 */

const pillars = [
    {
        value: '5',
        label: 'Technology Solutions',
        icon: <Code2 size={18} />,
        description:
            'Websites, apps, ERPs, revamps and interactive 3D — engineered for performance and scale.',
    },
    {
        value: '3',
        label: 'Creative Design',
        icon: <Palette size={18} />,
        description:
            '2D brand systems, 3D product visualisation, and AI-generated imagery for premium identities.',
    },
    {
        value: '4',
        label: 'Growth Marketing',
        icon: <TrendingUp size={18} />,
        description:
            'Meta Ads, Google Ads, SEO and Social — performance funnels that turn traffic into revenue.',
    },
    {
        value: '12+',
        label: 'Services Under One Roof',
        icon: <Layers3 size={18} />,
        description:
            'A single accountable team across design, development and growth — no agency hand-offs.',
    },
];

export default function Stats() {
    return (
        <section className={styles.stats}>
            <div className={`container ${styles.container}`}>
                <div className={styles.topHeader}>
                    <div className={styles.headerInfo}>
                        <span className={styles.sublabel}>How We Work</span>
                        <h2 className={styles.mainTitle}>One Team. Every Layer.</h2>
                    </div>
                    <p className={styles.headerDescription}>
                        Most agencies hand you off between siloed teams. We don&apos;t. Design,
                        development and growth marketing live under one roof — so your brand
                        stays coherent from the first wireframe to the last conversion.
                    </p>
                </div>

                <div className={styles.layoutGrid}>
                    {/* Featured Large Card — value proposition */}
                    <motion.div
                        className={styles.featuredCard}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className={styles.featuredContent}>
                            <div className={styles.featuredIcon}>
                                <Layers3 size={32} />
                            </div>
                            <h3>Three Disciplines, One Studio</h3>
                            <p>
                                When the same studio designs the brand, builds the platform,
                                and runs the ads, every layer compounds. No translation losses
                                between vendors. No finger-pointing when conversion drops.
                                Just one team accountable for the outcome.
                            </p>
                            <a href="/services" className={styles.ghostLink}>
                                See all services <ArrowUpRight size={16} />
                            </a>
                        </div>
                        <div className={styles.featuredVisual}>
                            <div className={styles.glowOrb}></div>
                        </div>
                    </motion.div>

                    {/* Pillars sub-grid — 3 service categories + summary tile */}
                    <div className={styles.metricsGrid}>
                        {pillars.map((pillar, index) => (
                            <motion.div
                                key={index}
                                className={styles.metricCard}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className={styles.metricHeader}>
                                    <span className={styles.metricIcon}>{pillar.icon}</span>
                                    <span className={styles.metricValue}>{pillar.value}</span>
                                </div>
                                <div className={styles.metricLabel}>{pillar.label}</div>
                                <p className={styles.metricDesc}>{pillar.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
