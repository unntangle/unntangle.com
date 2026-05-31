'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import styles from './BrandEcosystem.module.css';

/* ============================================================
 * Homepage "Our Ecosystem" section.
 *
 * Frames the parent → brand hierarchy: Unntangle (the established
 * innovation company, since 2023) at the top, then its specialized
 * brands below — currently uBIQ. Dark premium band so it reads as a
 * deliberate brand statement, distinct from the SaaS "Products" grid.
 * The grid is built to take additional brand cards later.
 * ============================================================ */

export default function BrandEcosystem() {
    return (
        <section id="ecosystem" className={styles.section}>
            <div className={styles.glow} aria-hidden="true" />
            <div className={styles.inner}>
                {/* Parent */}
                <motion.div
                    className={styles.parent}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px 0px' }}
                    transition={{ duration: 0.6 }}
                >
                    <span className={styles.eyebrow}>Our Ecosystem</span>
                    <h2 className={styles.parentName}>UNNTANGLE</h2>
                    <p className={styles.parentTag}>
                        Technology Innovation Company <span className={styles.dot}>·</span> Since 2023
                    </p>
                </motion.div>

                {/* Connector */}
                <motion.div
                    className={styles.connector}
                    aria-hidden="true"
                    initial={{ opacity: 0, scaleY: 0 }}
                    whileInView={{ opacity: 1, scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                />

                <motion.span
                    className={styles.brandsLabel}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.25 }}
                >
                    Our Specialized Brands
                </motion.span>

                {/* Brand grid (currently one brand; ready for more) */}
                <motion.div
                    className={styles.grid}
                    initial={{ opacity: 0, y: 26 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px 0px' }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <Link href="/ubiq" className={styles.brandCard}>
                        <div className={styles.brandGlow} aria-hidden="true" />
                        <Image
                            src="/uBIQ/uBIQ-logo.svg"
                            alt="uBIQ"
                            width={932}
                            height={306}
                            unoptimized
                            className={styles.brandLogo}
                        />
                        <span className={styles.brandTagline}>
                            Smart Space Automation by Unntangle
                        </span>
                        <p className={styles.brandDesc}>
                            Powered by Unntangle&apos;s technology expertise since 2023, uBIQ
                            creates intelligent living and working environments through
                            automation, connected systems, and future-ready technologies.
                        </p>
                        <span className={styles.brandCta}>
                            Explore uBIQ <ArrowRight size={18} />
                        </span>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
