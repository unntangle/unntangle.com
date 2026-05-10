'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './OurJourney.module.css';

/**
 * About-page "Our Journey" timeline.
 *
 * Mirrors the Appinventiv "A Decade of Digital Excellence" timeline
 * pattern: a horizontal year scrubber where the active year displays
 * a large numeral and a milestone description card. Clicking a year
 * swaps the displayed milestone.
 *
 * For Unntangle (founded 2023), the milestones cover the early
 * journey honestly. As the company grows, append new years rather
 * than padding old ones — credibility lives in the specifics.
 */

interface Milestone {
    year: string;
    headline: string;
    description: string;
}

const milestones: Milestone[] = [
    {
        year: '2023',
        headline: 'Unntangle is founded.',
        description:
            'A small team of engineers, designers, and growth marketers comes together with a single thesis: most agencies optimise for the deliverable, not the outcome. We build the studio we wished existed.',
    },
    {
        year: '2024',
        headline: 'First products ship.',
        description:
            'We launch uVOIZ — AI telecalling for Indian BPOs — and roll out uSYNQ, our smart-living hardware brand, with TITAN smart panels and biometric door locks. Real revenue, real customers, real shipping.',
    },
    {
        year: '2025',
        headline: 'Three disciplines under one roof.',
        description:
            'The studio formalises its three-pillar model: Technology Solutions, Creative Design, and Growth Marketing. One accountable team across the full stack — design through deployment through performance.',
    },
    {
        year: '2026',
        headline: 'Expanding the SaaS portfolio.',
        description:
            'uDYLR (predictive BPO dialer) and uSCRIBR (AI medical scribe) enter active development. The roadmap broadens into healthcare and contact-centre infrastructure across South Asia.',
    },
];

export default function OurJourney() {
    const [activeIndex, setActiveIndex] = useState(0);
    const active = milestones[activeIndex];

    return (
        <section className={styles.section}>
            <div className={`container ${styles.container}`}>
                <div className={styles.header}>
                    <span className={styles.eyebrow}>Our Journey</span>
                    <h2 className={styles.title}>
                        From a thesis to a{' '}
                        <span className={styles.titleAccent}>full-stack studio</span>.
                    </h2>
                    <p className={styles.subtitle}>
                        Unntangle is a young company with a long-term plan. Here&apos;s where
                        we&apos;ve been so far — and where we&apos;re going next.
                    </p>
                </div>

                {/* Big year display + description card */}
                <div className={styles.stage}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={active.year}
                            className={styles.yearDisplay}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                        >
                            {active.year}
                        </motion.div>
                    </AnimatePresence>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`${active.year}-card`}
                            className={styles.milestoneCard}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, delay: 0.05 }}
                        >
                            <h3 className={styles.milestoneHeadline}>{active.headline}</h3>
                            <p className={styles.milestoneDescription}>{active.description}</p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Year scrubber row */}
                <div className={styles.scrubber}>
                    <div className={styles.scrubberTrack}>
                        {milestones.map((m, i) => {
                            const isActive = i === activeIndex;
                            const isPast = i < activeIndex;
                            return (
                                <button
                                    key={m.year}
                                    type="button"
                                    onClick={() => setActiveIndex(i)}
                                    className={`${styles.scrubberStep} ${
                                        isActive ? styles.scrubberStepActive : ''
                                    } ${isPast ? styles.scrubberStepPast : ''}`}
                                    aria-label={`View ${m.year} milestone`}
                                >
                                    <span className={styles.scrubberDot} aria-hidden="true" />
                                    <span className={styles.scrubberYear}>{m.year}</span>
                                </button>
                            );
                        })}

                        {/* Progress fill — width derived from active index */}
                        <span
                            className={styles.scrubberFill}
                            style={{
                                width: `${(activeIndex / (milestones.length - 1)) * 100}%`,
                            }}
                            aria-hidden="true"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
