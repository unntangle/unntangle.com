'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import styles from './BlogHero.module.css';

export default function BlogHero() {
    return (
        <section className={styles.hero}>
            <div className={styles.heroInner}>
                <div className={styles.gradientBg}>
                    <div className={styles.glowOrb1} />
                    <div className={styles.glowOrb2} />
                    <div className={styles.glowOrb3} />
                </div>

                <div className={styles.container}>
                    <div className={styles.content}>
                        <motion.span
                            className={styles.eyebrow}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            Unntangled Insights
                        </motion.span>

                        <motion.h1
                            className={styles.title}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                        >
                            The frontier of <span className={styles.titleAccent}>Digital, AI</span> & <span className={styles.titleAccent}>Cloud</span>.
                        </motion.h1>

                        <motion.p
                            className={styles.description}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                        >
                            Deep-dive perspectives from the engineers, designers, and growth strategists shaping how modern brands ship products, scale platforms, and capture demand.
                        </motion.p>

                        <motion.div
                            className={styles.actions}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                        >
                            <Link href="#latest" className={styles.ctaPrimary}>
                                Read latest articles
                                <ArrowRight size={18} />
                            </Link>
                            <Link href="/contact" className={styles.ctaSecondary}>
                                Talk to our team
                            </Link>
                        </motion.div>
                    </div>

                    <motion.div
                        className={styles.visual}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className={styles.visualWrapper}>
                            <img
                                src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=1000"
                                alt="Engineer at work"
                                className={styles.visualImage}
                            />

                            <motion.div
                                className={styles.floatingPill1}
                                initial={{ opacity: 0, x: -40 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.7, delay: 0.6 }}
                            >
                                In an Unntangled world
                            </motion.div>

                            <motion.div
                                className={styles.floatingPill2}
                                initial={{ opacity: 0, x: 40 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.7, delay: 0.8 }}
                            >
                                ideas ship faster
                                <span className={styles.pillIcon}>✦</span>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
