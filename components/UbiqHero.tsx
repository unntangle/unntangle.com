'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import styles from './UbiqHero.module.css';

/*
 * uBIQ hero — "intelligence layer for spaces" positioning.
 * Dark premium, SENSE · LEARN · ADAPT · CARE badges, twin CTAs,
 * and the Unntangle / since-2023 trust line.
 */

const badges = ['Sense', 'Learn', 'Adapt', 'Care'];

export default function UbiqHero() {
    return (
        <div className={styles.hero}>
            <div className={styles.heroGlow} />
            <div className={styles.heroGlowSecondary} />
            <div className={styles.heroGrid} />

            <div className={styles.heroInner}>
                <motion.div
                    className={styles.eyebrow}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className={styles.eyebrowDot}></span>
                    The intelligence layer for spaces
                </motion.div>

                <motion.h1
                    className={styles.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                >
                    Intelligent Spaces.{' '}
                    <span className={styles.titleAccent}>Seamless Experiences.</span>
                </motion.h1>

                <motion.p
                    className={styles.subtitle}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                >
                    uBIQ by Unntangle transforms homes, workplaces, and commercial
                    environments into adaptive connected spaces through intelligent
                    automation and immersive technologies.
                </motion.p>

                <motion.div
                    className={styles.badges}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                >
                    {badges.map((b, i) => (
                        <span key={b} className={styles.badge}>
                            <span className={styles.badgeDot}></span>
                            {b}
                            {i < badges.length - 1 && <span className={styles.badgeSep} aria-hidden="true" />}
                        </span>
                    ))}
                </motion.div>

                <motion.div
                    className={styles.actions}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                >
                    <Link href="/contact" className={styles.ctaPrimary}>
                        Book Experience
                        <ArrowRight size={16} />
                    </Link>
                    <Link href="#platforms" className={styles.ctaSecondary}>
                        Explore Ecosystem
                    </Link>
                </motion.div>

                <motion.p
                    className={styles.credit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.55 }}
                >
                    Built on Unntangle&apos;s innovation journey since 2023.
                </motion.p>
            </div>
        </div>
    );
}
