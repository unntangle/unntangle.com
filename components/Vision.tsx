'use client';

import { motion } from 'framer-motion';
import styles from './Vision.module.css';

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
                    <div className={styles.visionInner}>
                        <span className={styles.tag}>Our Vision</span>
                        <h2 className={styles.visionText}>
                            "A world where technology is a seamless extension of human intent, unntangled from the friction of legacy complexity."
                        </h2>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
