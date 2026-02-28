'use client';

import { motion } from 'framer-motion';
import styles from './Roadmap.module.css';

const milestones = [
    {
        year: '2020',
        title: 'Digital Genesis',
        description: 'Establishing foundations with high-performance digital ecosystems. Focus on web, app, and ERP systems to untangle initial technical complexity for modern enterprises.'
    },
    {
        year: '2021',
        title: 'Enterprise Scale',
        description: 'Expanding architectural capabilities to support global brand growth. Custom business solutions and integrated digital layers became our primary growth driver.'
    },
    {
        year: '2022',
        title: 'Cloud Modernization',
        description: 'Scaling digital foundations through global cloud solutions. Specialized in secure migrations and cloud-native development to modernize enterprise infrastructure.'
    },
    {
        year: '2023',
        title: 'Global Orchestration',
        description: 'Implementing multi-region cloud synchronization and disaster recovery. Reaching global performance standards for high-availability enterprise environments.'
    },
    {
        year: '2024',
        title: 'AI Convergence',
        description: 'Converging digital and cloud with foundational AI solutions. Custom application development using deterministic AI to bridge intent and execution.'
    },
    {
        year: '2025',
        title: 'Autonomous Intelligence',
        description: 'Scaling into recursive AI agents and advanced Natural Language Processing. Automating complex workflows through intelligent, self-optimizing ecosystems.'
    },
    {
        year: '2026',
        title: 'Universal Synchrony',
        description: 'Achieving total technical harmony by integrating Smart Living solutions. A unified architecture where Digital, Cloud, and AI work in perfect sync.'
    }
];

export default function Roadmap() {
    return (
        <section className={styles.roadmap}>
            <div className={`container ${styles.container}`}>
                <div className={styles.header}>
                    <span className="tag">Evolutionary Path</span>
                    <h2 className={styles.title}>The Schematic Journey</h2>
                    <p className={styles.description}>
                        From an initial philosophy to global synchrony. A balanced view of our technical and strategic milestones.
                    </p>
                </div>

                <div className={styles.schematicWrapper}>
                    <div className={styles.centralAxis}></div>

                    <div className={styles.nodesList}>
                        {milestones.map((milestone, index) => (
                            <div key={index} className={`${styles.nodeRow} ${index % 2 === 0 ? styles.leftRow : styles.rightRow}`}>
                                <motion.div
                                    className={styles.schematicNode}
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <div className={styles.nodeHeader}>
                                        <span className={styles.yearLabel}>{milestone.year}</span>
                                        <div className={styles.statusIndicator}></div>
                                    </div>
                                    <div className={styles.nodeBody}>
                                        <h3>{milestone.title}</h3>
                                        <p>{milestone.description}</p>
                                    </div>
                                    <div className={styles.junctionLine}></div>
                                </motion.div>
                                <div className={styles.axisDot}></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
