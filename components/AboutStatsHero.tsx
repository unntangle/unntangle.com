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

const topStats = [
    { value: '12+', label: 'Services Across Disciplines' },
    { value: '4', label: 'Products in Market' },
    { value: '8', label: 'Industries Served' },
    { value: '100%', label: 'In-House Talent' },
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
                    <span className={styles.eyebrow}>By the numbers</span>
                    <h2 className={styles.title}>
                        Three disciplines.{' '}
                        <span className={styles.titleAccent}>One accountable team.</span>
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
