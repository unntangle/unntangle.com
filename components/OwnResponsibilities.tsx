'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Eye, ShieldCheck, Users, Target } from 'lucide-react';
import styles from './OwnResponsibilities.module.css';

/**
 * About-page accountability section.
 *
 * Two-column statement of how Unntangle approaches client work:
 *   1. "We keep our eye on the ROI" — outcome-led, not deliverable-led
 *   2. "We own responsibilities" — accountability instead of finger-pointing
 *
 * The left side is a single image card (team / studio shot). The
 * right side is two stacked statement cards with icon + headline +
 * body. Mirrors the Appinventiv "ROI / Ownership" pair but adapted
 * to Unntangle's voice and proof points.
 */

interface ResponsibilityCard {
    icon: React.ReactNode;
    title: string;
    body: string;
    bullets: string[];
}

const cards: ResponsibilityCard[] = [
    {
        icon: <Target size={22} />,
        title: 'We keep our eye on the ROI',
        body:
            "Every engagement starts with the metric we're moving — pipeline, conversion, retention, MRR. The deliverable is a means, not the end.",
        bullets: [
            'Outcomes mapped to revenue from day one',
            'Working software shipped weekly, not quarterly',
            'No vanity metrics, no untracked deliverables',
        ],
    },
    {
        icon: <ShieldCheck size={22} />,
        title: 'We own responsibilities',
        body:
            "Mistakes happen on long projects. When they do, we don't disappear behind a vendor wall — we surface the issue, fix it, and absorb the impact.",
        bullets: [
            'One accountable team across design, dev, and growth',
            'Transparent status, transparent escalations',
            'Retained partnerships, not project-and-ghost',
        ],
    },
];

export default function OwnResponsibilities() {
    return (
        <section className={styles.section}>
            <div className={`container ${styles.container}`}>
                <div className={styles.layout}>
                    {/* Left: single visual tile */}
                    <motion.div
                        className={styles.visualColumn}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className={styles.visual}>
                            <Image
                                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200"
                                alt="The Unntangle team in conversation"
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className={styles.visualImage}
                            />
                            <div className={styles.visualOverlay} aria-hidden="true" />

                            <div className={styles.visualBadge}>
                                <Users size={14} />
                                <span>One Team. One Studio.</span>
                            </div>

                            <div className={styles.visualQuote}>
                                <Eye size={16} className={styles.visualQuoteIcon} />
                                <p>
                                    The work we ship is the brand. We sign every line of code,
                                    every campaign, every render — like a craftsman would.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: two stacked cards */}
                    <div className={styles.cardsColumn}>
                        <div className={styles.cardsHeader}>
                            <span className={styles.eyebrow}>How We Work</span>
                            <h2 className={styles.title}>
                                Outcomes first.{' '}
                                <span className={styles.titleAccent}>
                                    Excuses never.
                                </span>
                            </h2>
                            <p className={styles.subtitle}>
                                Two principles that change how every engagement runs.
                            </p>
                        </div>

                        {cards.map((card, i) => (
                            <motion.div
                                key={card.title}
                                className={styles.card}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                            >
                                <div className={styles.cardIconWrap}>{card.icon}</div>
                                <div className={styles.cardBody}>
                                    <h3 className={styles.cardTitle}>{card.title}</h3>
                                    <p className={styles.cardText}>{card.body}</p>
                                    <ul className={styles.cardBullets}>
                                        {card.bullets.map((bullet) => (
                                            <li key={bullet} className={styles.cardBullet}>
                                                <span
                                                    className={styles.cardBulletDot}
                                                    aria-hidden="true"
                                                />
                                                {bullet}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
