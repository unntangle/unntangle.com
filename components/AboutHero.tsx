'use client';

import { motion } from 'framer-motion';
import styles from './AboutHero.module.css';

export default function AboutHero() {
    return (
        <section className={styles.hero}>
            <div className={`container ${styles.container}`}>
                {/* Asymmetric Header Grid */}
                <div className={styles.grid}>
                    <motion.div
                        className={styles.headerColumn}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="tag">Who we are</span>
                        <h1 className={styles.title}>
                            Engineering <br />
                            Holistic <span className={styles.outlineText}>Synergy.</span>
                        </h1>
                    </motion.div>

                    <motion.div
                        className={styles.subColumn}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <p className={styles.subtitle}>
                            Unntangle converges Digital, AI, Cloud, and Smart Living solutions into a single, deterministic architecture, unntangling complexity across every layer of the modern landscape.
                        </p>
                    </motion.div>
                </div>

                {/* The Complexity Waveform Visual */}
                <div className={styles.visualSection}>
                    <div className={styles.waveformContainer}>
                        <svg viewBox="0 0 800 200" className={styles.waveform}>
                            {/* Static Tangle */}
                            <path
                                d="M0,100 C50,150 100,50 150,120 C200,180 250,20 300,100 C350,160 400,40 450,100 L800,100"
                                className={styles.tangleLine}
                                fill="none"
                            />
                            {/* Animated Straightening Path */}
                            <motion.path
                                d="M0,100 C50,150 100,50 150,120 C200,180 250,20 300,100 C350,160 400,40 450,100 L800,100"
                                className={styles.activeLine}
                                fill="none"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                            />
                        </svg>
                    </div>
                </div>

            </div>
        </section>
    );
}
