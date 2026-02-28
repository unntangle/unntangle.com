'use client';

import { motion } from 'framer-motion';
import { Network, Zap, Shield, Cpu, ArrowUpRight, Globe, Layers } from 'lucide-react';
import styles from './Stats.module.css';

const solutionMetrics = [
    {
        value: '50+',
        label: 'Digital Platforms',
        icon: <Globe size={18} />,
        description: 'High-performance websites and scalable applications built for global brands.'
    },
    {
        value: '25+',
        label: 'AI Implementations',
        icon: <Cpu size={18} />,
        description: 'Custom intelligent agents and automation workflows deployed for enterprise scale.'
    },
    {
        value: '99.9%',
        label: 'Cloud Resilience',
        icon: <Shield size={18} />,
        description: 'High-availability infrastructure designed for zero-fail production environments.'
    },
    {
        value: '10k+',
        label: 'Smart Endpoints',
        icon: <Layers size={18} />,
        description: 'Connected IoT devices managed through unified intelligent interfaces.'
    }
];

export default function Stats() {
    return (
        <section className={styles.stats}>
            <div className={`container ${styles.container}`}>
                <div className={styles.topHeader}>
                    <div className={styles.headerInfo}>
                        <span className={styles.sublabel}>The Architecture of Impact</span>
                        <h2 className={styles.mainTitle}>Future-Ready Engineering</h2>
                    </div>
                    <p className={styles.headerDescription}>
                        We converge Digital, AI, Cloud, and Smart Living layers into singular, high-performance ecosystems that scale with your vision.
                    </p>
                </div>

                <div className={styles.layoutGrid}>
                    {/* Featured Large Card */}
                    <motion.div
                        className={styles.featuredCard}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className={styles.featuredContent}>
                            <div className={styles.featuredIcon}>
                                <Network size={32} />
                            </div>
                            <h3>Holistic Digital Synergy</h3>
                            <p>Moving beyond isolated deployments, we unntangle complexities to create unified technical landscapes where every component works in perfect harmony.</p>
                            <button className={styles.ghostLink}>
                                Our Strategy <ArrowUpRight size={16} />
                            </button>
                        </div>
                        <div className={styles.featuredVisual}>
                            <div className={styles.glowOrb}></div>
                        </div>
                    </motion.div>

                    {/* Solutions Sub-grid */}
                    <div className={styles.metricsGrid}>
                        {solutionMetrics.map((metric, index) => (
                            <motion.div
                                key={index}
                                className={styles.metricCard}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className={styles.metricHeader}>
                                    <span className={styles.metricIcon}>{metric.icon}</span>
                                    <span className={styles.metricValue}>{metric.value}</span>
                                </div>
                                <div className={styles.metricLabel}>{metric.label}</div>
                                <p className={styles.metricDesc}>{metric.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
