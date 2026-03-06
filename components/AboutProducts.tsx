'use client';

import styles from './AboutProducts.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutProducts() {
    return (
        <section className={styles.productsSection}>
            <div className={styles.container}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className={styles.header}
                >
                    <h2 className={styles.title}>OUR PRODUCTS</h2>
                    <p className={styles.subtitle}>
                        Discover our specialized product ecosystems designed to elevate vertical transport and modernize residential living.
                    </p>
                </motion.div>

                <div className={styles.productGrid}>
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className={styles.productCard}
                    >
                        <div className={styles.imageWrapper}>
                            <div className={styles.imageOverlay} />
                            <Image
                                src="/images/uryze_preview.png"
                                alt="uRYZE Elevators"
                                fill
                                className={styles.productImage}
                            />
                            <div className={styles.brandBadge}>uRYZE</div>
                        </div>
                        <div className={styles.cardContent}>
                            <h3>uRYZE</h3>
                            <p>
                                Premium elevator systems blending sophisticated design with high-performance engineering for commercial and residential architecture.
                            </p>
                            <Link href="/shop/uryze" className={styles.exploreLink}>
                                Explore uRYZE <ArrowRight size={16} />
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className={styles.productCard}
                    >
                        <div className={styles.imageWrapper}>
                            <div className={styles.imageOverlay} />
                            <Image
                                src="/images/usynq_preview.png"
                                alt="uSYNQ Smart Home Devices"
                                fill
                                className={styles.productImage}
                            />
                            <div className={styles.brandBadge}>uSYNQ</div>
                        </div>
                        <div className={styles.cardContent}>
                            <h3>uSYNQ</h3>
                            <p>
                                Seamless automation technology, from premium touch switches and integrated controllers to biometric security for modern living spaces.
                            </p>
                            <Link href="/shop/usynq" className={styles.exploreLink}>
                                Explore uSYNQ <ArrowRight size={16} />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className={styles.backgroundGradients}>
                <div className={styles.gradientBlue} />
                <div className={styles.gradientPurple} />
            </div>
        </section>
    );
}
