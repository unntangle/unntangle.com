'use client';

import { motion } from 'framer-motion';
import { Target, Zap, Shield, Sparkles } from 'lucide-react';
import styles from './Philosophy.module.css';

const values = [
    {
        title: 'Deterministic Design',
        icon: <Target size={24} />,
        description: 'We believe in precision and predictability. Every line of code and every design choice is made with a clear, deterministic purpose.'
    },
    {
        title: 'Holistic Synergy',
        icon: <Zap size={24} />,
        description: 'We bridge the gap between Digital, AI, Cloud, and Smart Living, creating ecosystems that work in perfect, unntangled harmony.'
    },
    {
        title: 'Future-First',
        icon: <Sparkles size={24} />,
        description: 'We engineer today for the breakthroughs of tomorrow, ensuring your business is always ahead of the curve in a rapidly evolving world.'
    },
    {
        title: 'Radical Simplicity',
        icon: <Shield size={24} />,
        description: 'Complexity is the enemy of progress. We unntangle the knots of legacy systems to reveal the simple, high-performance truth beneath.'
    }
];

export default function Philosophy() {
    return (
        <section className={styles.philosophy}>
            <div className={`container ${styles.container}`}>
                <div className={styles.header}>
                    <span className="tag">Our Philosophy</span>
                    <h2 className={styles.title}>The Art of Unntangling</h2>
                    <p className={styles.description}>
                        At Unntangle, we are driven by a singular mission: to simplify the complex and empower brands through high-performance engineering.
                    </p>
                </div>

                <div className={styles.grid}>
                    {values.map((value, index) => (
                        <motion.div
                            key={index}
                            className={styles.card}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className={styles.iconWrapper}>{value.icon}</div>
                            <h3>{value.title}</h3>
                            <p>{value.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
