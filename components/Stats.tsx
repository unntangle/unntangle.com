'use client';

import { motion } from 'framer-motion';
import styles from './Stats.module.css';

const stats = [
    {
        value: '50+',
        label: 'Digital Platforms Built',
        description: 'From high-performance websites to complex web applications, we engineer scalable digital solutions.',
        dark: true
    },
    {
        value: '10k+',
        label: 'IoT Devices Connected',
        description: 'Creating seamless smart living environments and integrated infrastructure for homes and businesses.',
        dark: false
    },
    {
        value: '100%',
        label: 'Future-Ready',
        description: 'Every project integrates cutting-edge technology, ensuring your business is prepared for tomorrow.',
        dark: true
    }
];

export default function Stats() {
    return (
        <section className={styles.stats}>
            <div className={`container ${styles.container}`}>
                <div className={styles.header}>
                    <div className={styles.headerContent}>
                        <span className="tag">Track Record</span>
                        <h2>Our company snapshot</h2>
                        <p>At Unntangle, we build high-performance digital experiences, intelligent automated environments, and scalable technical infrastructure for forward-thinking brands.</p>
                    </div>
                    <button className="btn btn-primary">Get in touch</button>
                </div>

                <div className={styles.grid}>
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className={`${styles.card} ${stat.dark ? styles.dark : styles.lime}`}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className={styles.value}>{stat.value}</div>
                            <div className={styles.label}>{stat.label}</div>
                            <p className={styles.description}>{stat.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
