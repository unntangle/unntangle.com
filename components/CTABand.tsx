'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import styles from './CTABand.module.css';

/**
 * Home-page CTA band.
 *
 * A single bold call-to-action band that sits between the lighter
 * Industries section and the FAQ. Designed as a dark, full-width
 * panel with a high-contrast primary CTA and a secondary "book a
 * call" link, plus a subtle marquee of the disciplines underneath
 * to reinforce what we do.
 *
 * Two CTAs by design:
 *   - Primary  → /contact      (lead form / longer fit)
 *   - Calendar → /contact#book (quick discovery call slot)
 *
 * Both currently route to the existing /contact page; once a
 * Calendly or Cal.com link is in place, the secondary can swap
 * to a direct external booking URL.
 */

export default function CTABand() {
    return (
        <section className={styles.section}>
            <div className={`container ${styles.container}`}>
                <motion.div
                    className={styles.band}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Decorative gradient orb behind the content */}
                    <div className={styles.orb} aria-hidden="true" />

                    <div className={styles.content}>
                        <span className={styles.eyebrow}>AI Workflow Assessment</span>

                        <h2 className={styles.title}>
                            Find Where AI Can Work{' '}
                            <span className={styles.titleAccent}>Inside Your Business</span>
                        </h2>

                        <p className={styles.description}>
                            Bring us a workflow that&apos;s consuming time, creating bottlenecks or
                            requiring repetitive manual work. We&apos;ll help you determine whether AI
                            can automate or augment it. Need a website, app or system built instead?
                            Talk to us about that too.
                        </p>

                        <div className={styles.actions}>
                            <Link href="/contact" className={styles.primaryCta}>
                                Book an AI Workflow Assessment <ArrowRight size={18} />
                            </Link>
                            <Link href="/contact" className={styles.secondaryCta}>
                                <Calendar size={16} /> Discuss a Software Project
                            </Link>
                        </div>
                    </div>

                    <div className={styles.marquee} aria-hidden="true">
                        <div className={styles.marqueeTrack}>
                            {[...Array(2)].map((_, copyIndex) => (
                                <div key={copyIndex} className={styles.marqueeGroup}>
                                    <span className={styles.marqueeItem}>Assess</span>
                                    <span className={styles.marqueeDot}>&#9679;</span>
                                    <span className={styles.marqueeItem}>Build</span>
                                    <span className={styles.marqueeDot}>&#9679;</span>
                                    <span className={styles.marqueeItem}>Integrate</span>
                                    <span className={styles.marqueeDot}>&#9679;</span>
                                    <span className={styles.marqueeItem}>Deploy</span>
                                    <span className={styles.marqueeDot}>&#9679;</span>
                                    <span className={styles.marqueeItem}>Operate</span>
                                    <span className={styles.marqueeDot}>&#9679;</span>
                                    <span className={styles.marqueeItem}>Improve</span>
                                    <span className={styles.marqueeDot}>&#9679;</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
