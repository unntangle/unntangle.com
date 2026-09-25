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
                        <span className={styles.eyebrow}>Let&apos;s get to work</span>

                        <h2 className={styles.title}>
                            Ready to put AI to work{' '}
                            <span className={styles.titleAccent}>inside your business?</span>
                        </h2>

                        <p className={styles.description}>
                            Whether you&apos;re ready to automate a specific workflow or want to
                            understand where AI can have the most impact — start the conversation.
                            We&apos;ll come back with a scoped assessment within a working day.
                        </p>

                        <div className={styles.actions}>
                            <Link href="/contact" className={styles.primaryCta}>
                                Book an AI Workflow Assessment <ArrowRight size={18} />
                            </Link>
                            <Link href="/contact" className={styles.secondaryCta}>
                                <Calendar size={16} /> Book a discovery call
                            </Link>
                        </div>
                    </div>

                    {/* Subtle marquee of the capabilities, repeated to fill width */}
                    <div className={styles.marquee} aria-hidden="true">
                        <div className={styles.marqueeTrack}>
                            {[...Array(2)].map((_, copyIndex) => (
                                <div key={copyIndex} className={styles.marqueeGroup}>
                                    <span className={styles.marqueeItem}>AI Agents</span>
                                    <span className={styles.marqueeDot}>&#9679;</span>
                                    <span className={styles.marqueeItem}>Enterprise Automation</span>
                                    <span className={styles.marqueeDot}>&#9679;</span>
                                    <span className={styles.marqueeItem}>Technology</span>
                                    <span className={styles.marqueeDot}>&#9679;</span>
                                    <span className={styles.marqueeItem}>Growth Marketing</span>
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
