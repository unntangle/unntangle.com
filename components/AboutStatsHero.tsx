'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import styles from './AboutStatsHero.module.css';

/**
 * About-page stats-led hero brick.
 *
 * Bold, opinionated headline driven by hard numbers, paired with
 * a single visual tile. Mirrors the Appinventiv-style "X minds.
 * Y projects. One vision." opening — sets the tone of a serious
 * technology company before any prose runs.
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
                {/* Bold stat-led headline */}
                <motion.div
                    className={styles.headline}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className={styles.eyebrow}>About Unntangle</span>
                    <h1 className={styles.title}>
                        One studio.{' '}
                        <span className={styles.titleAccent}>Three disciplines.</span>{' '}
                        Built to ship.
                    </h1>
                    <p className={styles.subtitle}>
                        Unntangle is a full-stack technology and digital company — engineering
                        the products, platforms, and brands behind ambitious businesses across
                        India and beyond. We bring design, development, growth marketing, and
                        smart-living hardware under one accountable team.
                    </p>
                </motion.div>

                {/* Visual tile + featured story chip */}
                <motion.div
                    className={styles.visual}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.15 }}
                >
                    <Image
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1600"
                        alt="The Unntangle team at work"
                        fill
                        sizes="(max-width: 1024px) 100vw, 65vw"
                        className={styles.visualImage}
                        priority
                    />
                    <div className={styles.visualOverlay} aria-hidden="true" />

                    <div className={styles.storyChip}>
                        <span className={styles.storyLabel}>The Unntangle Story</span>
                    </div>
                </motion.div>

                {/* Stat tiles row */}
                <motion.div
                    className={styles.statsRow}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.25 }}
                >
                    {topStats.map((stat) => (
                        <div key={stat.label} className={styles.statTile}>
                            <div className={styles.statValue}>{stat.value}</div>
                            <div className={styles.statLabel}>{stat.label}</div>
                        </div>
                    ))}
                </motion.div>

                {/* CTA */}
                <motion.div
                    className={styles.ctaRow}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <Link href="/contact" className={styles.primaryCta}>
                        Consult our experts <ArrowRight size={18} />
                    </Link>
                    <Link href="/services" className={styles.secondaryCta}>
                        See what we do
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
