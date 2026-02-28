'use client';

import { motion } from 'framer-motion';
import styles from './TrustMap.module.css';

export default function TrustMap() {
    return (
        <section className={styles.mapSection}>
            <div className={`container ${styles.container}`}>
                <div className={styles.header}>
                    <motion.p
                        className={styles.label}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        We're Trusted by Enterprises
                    </motion.p>
                    <motion.h2
                        className={styles.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Across 70+ Countries
                    </motion.h2>
                    <motion.p
                        className={styles.description}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        Our engineering solutions are agnostic of borders, processing deterministic data flows
                        for market leaders across five continents.
                    </motion.p>
                </div>

                <div className={styles.visualContainer}>
                    <div className={styles.globeWrapper}>
                        {/* Placeholder for a high-end globe image or SVG */}
                        <img
                            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop"
                            alt="Global Network"
                            className={styles.globeImage}
                        />
                        <div className={styles.pulseNode} style={{ top: '30%', left: '45%' }} />
                        <div className={styles.pulseNode} style={{ top: '50%', left: '25%' }} />
                        <div className={styles.pulseNode} style={{ top: '40%', left: '75%' }} />
                        <div className={styles.pulseNode} style={{ top: '60%', left: '60%' }} />
                    </div>
                </div>
            </div>
        </section>
    );
}
