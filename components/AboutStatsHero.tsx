'use client';

import { motion } from 'framer-motion';
import styles from './AboutStatsHero.module.css';

/**
 * About-page stats brick.
 *
 * Sits below the PageHero on /about. The PageHero handles the
 * main headline, description, and CTAs. This component's job is
 * narrower: just the four hard-number proof points.
 *
 * Previously this component duplicated the PageHero's intro
 * (same eyebrow, same description, same CTA pair, same visual).
 * Stripped down to the stats row + a tight contextual lead so
 * the two sections don't fight for attention.
 *
 * Numbers are intentionally conservative and honest. Update
 * `topStats` once the company hits new milestones rather than
 * inflating early.
 */

// Only facts that are true today. "3 AI products" counts uVOIZ (beta)
// plus uDYLR and uSCRIBR (in development) — the label says so. Add
// client / industry counts only once they can be backed up.
const topStats = [
    { value: '3', label: 'Service Pillars: AI, Websites & Apps, Custom Software' },
    { value: '3', label: 'AI Products (1 in Beta, 2 in Development)' },
    { value: '2020', label: 'Founded in Chennai, India' },
    { value: '100%', label: 'In-House Engineering Team' },
];

export default function AboutStatsHero() {
    return (
        <section className={styles.section}>
            <div className={`container ${styles.container}`}>
                <motion.div
                    className={styles.headline}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className={styles.eyebrow}>At a glance</span>
                    <h2 className={styles.title}>
                        AI implementation.{' '}
                        <span className={styles.titleAccent}>Websites, apps &amp; software.</span>
                    </h2>
                </motion.div>

                <motion.div
                    className={styles.statsRow}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    {topStats.map((stat) => (
                        <div key={stat.label} className={styles.statTile}>
                            <div className={styles.statValue}>{stat.value}</div>
                            <div className={styles.statLabel}>{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
