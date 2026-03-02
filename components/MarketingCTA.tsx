'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './MarketingCTA.module.css';

export default function MarketingCTA() {
    return (
        <section className={styles.ctaSection}>
            {/* Animated Background Layers */}
            <div className={styles.bgLayers}>
                <div className={styles.patternLayer} />
                <div className={styles.blobContainer}>
                    <motion.div
                        className={`${styles.blob} ${styles.blob1}`}
                        animate={{
                            x: [0, 100, 0],
                            y: [0, 50, 0],
                            scale: [1, 1.1, 1],
                        }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                        className={`${styles.blob} ${styles.blob2}`}
                        animate={{
                            x: [0, -80, 0],
                            y: [0, 100, 0],
                        }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    />
                </div>
            </div>

            <div className={styles.container}>
                <motion.div
                    className={styles.horizontalBanner}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className={styles.leftSide}>
                        <div className={styles.logoWrapper}>
                            <Image
                                src="/images/unntangle_logo_white.png"
                                alt="Unntangle Logo"
                                width={140}
                                height={35}
                                className={styles.logo}
                                style={{ filter: 'invert(1)' }}
                            />
                        </div>
                        <h2 className={styles.title}>
                            Have a Vision?<br />
                            <span className={styles.gradientText}>Let's Discuss!</span>
                        </h2>
                    </div>

                    <div className={styles.divider} />

                    <div className={styles.rightSide}>
                        <p className={styles.description}>
                            Connect with our experts to explore how we can turn your ideas into reality.
                            We're here to brainstorm, strategize, and build your next digital success story together.
                        </p>
                        <div className={styles.buttonWrapper}>
                            <button className={styles.primaryBtn}>
                                Let's Talk
                                <div className={styles.btnGlow} />
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
