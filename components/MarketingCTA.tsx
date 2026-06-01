'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import styles from './MarketingCTA.module.css';

/**
 * /services page closing CTA band.
 *
 * Sits below OurProcess, just before the Footer. Functions as the
 * decision moment for someone who's read through the three service
 * pillars and the process — gives them a concrete next action.
 *
 * Two CTAs split by intent:
 *   1. "Start a project"   — scoped, ready-to-engage prospects
 *   2. "Book a discovery call" — exploratory, still scoping
 *
 * The pillar chips below the headline reinforce that whichever
 * service they came in for, the same accountable team handles it
 * — which is the core "why Unntangle" pitch from the WhyChooseUs
 * comparison table further up.
 */

const pillars = [
    'Technology Solutions',
    'Creative Design',
    'Growth Marketing',
];

export default function MarketingCTA() {
    return (
        <section className={styles.ctaSection}>
            {/* Animated Background Layers */}
            <div className={styles.bgLayers}>
                <div className={styles.patternLayer} />
                <div className={styles.blobContainer}>
                    <motion.div
                        className={`${styles.blob} ${styles.blob1}`}
                        animate={{
                            x: [0, 100, 0],
                            y: [0, 50, 0],
                            scale: [1, 1.1, 1],
                        }}
                        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                    />
                    <motion.div
                        className={`${styles.blob} ${styles.blob2}`}
                        animate={{
                            x: [0, -80, 0],
                            y: [0, 100, 0],
                        }}
                        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                    />
                </div>
            </div>

            <div className={styles.container}>
                <motion.div
                    className={styles.horizontalBanner}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className={styles.leftSide}>
                        <div className={styles.logoWrapper}>
                            <Image
                                src="/images/unntangle_logo_white.png"
                                alt="Unntangle"
                                width={140}
                                height={35}
                                className={styles.logo}
                                style={{ filter: 'invert(1)' }}
                            />
                        </div>
                        <h2 className={styles.title}>
                            One brief.{' '}
                            <span className={styles.gradientText}>One accountable team.</span>
                        </h2>

                        <div className={styles.pillars}>
                            {pillars.map((pillar) => (
                                <span key={pillar} className={styles.pillarChip}>
                                    <span
                                        className={styles.pillarDot}
                                        aria-hidden="true"
                                    />
                                    {pillar}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className={styles.divider} />

                    <div className={styles.rightSide}>
                        <p className={styles.description}>
                            Whether you&apos;re launching a product, modernising a legacy
                            platform, or scaling growth, we ship in weeks — not quarters. Tell
                            us what you&apos;re building and we&apos;ll come back with a scoped
                            plan within 48 hours.
                        </p>
                        <div className={styles.buttonWrapper}>
                            {/* HIDDEN-CONTACT:
                            <Link href="/contact" className={styles.primaryBtn}>
                                Start a project
                                <ArrowRight size={18} />
                                <div className={styles.btnGlow} />
                            </Link>
                            <Link href="/contact" className={styles.secondaryBtn}>
                                Book a discovery call
                            </Link>
                            */}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
