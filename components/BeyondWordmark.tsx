'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import styles from './BeyondWordmark.module.css';

/**
 * Big "BEYOND" wordmark transition section.
 *
 * Inspired by Appinventiv's full-bleed BEYOND treatment: a single
 * massive word that fills the viewport and parallax-shifts on
 * scroll. Functions as a visual breath between content sections —
 * pure typographic punctuation, no info to read.
 *
 * Two transforms on scroll:
 *   - Vertical translate: light parallax for depth
 *   - Horizontal translate: subtle slide so the wordmark feels
 *     alive (not a static decoration)
 */

export default function BeyondWordmark() {
    const sectionRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    // Translate the wordmark slightly as the section passes through
    // the viewport — feels alive without becoming distracting.
    const x = useTransform(scrollYProgress, [0, 1], ['-4%', '4%']);
    const opacity = useTransform(
        scrollYProgress,
        [0, 0.3, 0.7, 1],
        [0, 1, 1, 0]
    );

    return (
        <section ref={sectionRef} className={styles.section}>
            <div className={styles.inner}>
                <span className={styles.eyebrow}>And we&apos;re just getting started</span>
                <motion.div
                    style={{ x, opacity }}
                    className={styles.wordmark}
                    aria-label="Beyond"
                >
                    BEYOND
                </motion.div>
                <p className={styles.tagline}>
                    The work we&apos;ve shipped is the foundation. What we build next is the
                    point.
                </p>
            </div>
        </section>
    );
}
