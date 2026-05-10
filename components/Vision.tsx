'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './Vision.module.css';

/**
 * About-page closing "Our Vision" section.
 *
 * Big dark card with a moody background image bleeding through a
 * gradient overlay. The vision quote sits on top in white,
 * centered, with the OUR VISION eyebrow above it.
 *
 * Background image: a wide horizon / starscape evokes the "world
 * where technology is seamless" framing without being a literal
 * tech photo. Loaded from Unsplash since the codebase is already
 * configured to allow that domain in next.config.ts.
 */

export default function Vision() {
    return (
        <section className={styles.visionSection}>
            <div className="container">
                <motion.div
                    className={styles.visionCard}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Backdrop image — a wide aerial / horizon shot that
                        suggests scale and possibility without being on-the-nose
                        about technology. */}
                    <Image
                        src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=2400"
                        alt=""
                        fill
                        priority={false}
                        sizes="100vw"
                        className={styles.visionImage}
                    />

                    {/* Dark overlay gradient layered above the image keeps the
                        white type readable against any photo region. */}
                    <div className={styles.visionOverlay} aria-hidden="true" />

                    <div className={styles.visionInner}>
                        <span className={styles.tag}>Our Vision</span>
                        <h2 className={styles.visionText}>
                            &ldquo;A world where technology is a seamless extension of human
                            intent, unntangled from the friction of legacy complexity.&rdquo;
                        </h2>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
