'use client';

import { motion } from 'framer-motion';
import {
    Search,
    Map as MapIcon,
    ListOrdered,
    Hammer,
    Plug,
    Rocket,
    TrendingUp,
    ClipboardCheck,
    ArrowUpRight,
} from 'lucide-react';
import styles from './Stats.module.css';

/**
 * Home-page "AI Workflow Assessment" section.
 *
 * Repurposed from "Architecture of Impact". Same layout (featured card
 * left, 2-col step grid right). The grid holds the seven assessment
 * steps plus an eighth CTA tile so the 2-col grid stays even.
 *
 * Anchor: #how-we-deploy (linked from the navbar).
 */

const steps = [
    {
        value: '01',
        label: 'Discover',
        icon: <Search size={18} />,
        description: 'Understand how your teams work today — the people, systems, documents and hand-offs involved.',
    },
    {
        value: '02',
        label: 'Map',
        icon: <MapIcon size={18} />,
        description: 'Identify the repetitive, manual and decision-heavy workflows that consume the most time.',
    },
    {
        value: '03',
        label: 'Prioritize',
        icon: <ListOrdered size={18} />,
        description: 'Find the workflows where AI can create measurable business value first, and agree how success will be measured.',
    },
    {
        value: '04',
        label: 'Build',
        icon: <Hammer size={18} />,
        description: 'Develop the required AI agent, automation or workflow around your data, documents and business rules.',
    },
    {
        value: '05',
        label: 'Integrate',
        icon: <Plug size={18} />,
        description: 'Connect it with your ERP, CRM, email, databases and business applications.',
    },
    {
        value: '06',
        label: 'Deploy',
        icon: <Rocket size={18} />,
        description: 'Put it into your real production workflow with appropriate human approvals and controls.',
    },
    {
        value: '07',
        label: 'Improve',
        icon: <TrendingUp size={18} />,
        description: 'Monitor performance, review exceptions with your team and continuously improve the system.',
    },
];

export default function Stats() {
    return (
        <section className={styles.stats} id="how-we-deploy">
            <div className={`container ${styles.container}`}>
                <div className={styles.topHeader}>
                    <div className={styles.headerInfo}>
                        <span className={styles.sublabel}>AI Workflow Assessment</span>
                        <h2 className={styles.mainTitle}>Start With Your Workflow, Not With AI.</h2>
                    </div>
                    <p className={styles.headerDescription}>
                        We don&apos;t begin by selling you a predefined AI product. We first understand
                        your business — then decide, together with your team, where AI should go to work.
                    </p>
                </div>

                <div className={styles.layoutGrid}>
                    {/* Featured card — what the assessment is */}
                    <motion.div
                        className={styles.featuredCard}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className={styles.featuredContent}>
                            <div className={styles.featuredIcon}>
                                <ClipboardCheck size={32} />
                            </div>
                            <h3>The AI Workflow Assessment</h3>
                            <p>
                                Every engagement starts here. We spend time with the people who do the
                                work, look at the documents and systems they use, and map where effort
                                is repeated. You come away with a clear, prioritised view of which
                                workflows are worth automating, which should stay with people, and what
                                a first deployment would involve.
                            </p>
                            <a href="/contact" className={styles.ghostLink}>
                                Book an AI Workflow Assessment <ArrowUpRight size={16} />
                            </a>
                        </div>
                        <div className={styles.featuredVisual}>
                            <div className={styles.glowOrb}></div>
                        </div>
                    </motion.div>

                    {/* Seven steps + CTA tile */}
                    <div className={styles.metricsGrid}>
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.value}
                                className={styles.metricCard}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.06 }}
                            >
                                <div className={styles.metricHeader}>
                                    <span className={styles.metricIcon}>{step.icon}</span>
                                    <span className={styles.metricValue}>{step.value}</span>
                                </div>
                                <div className={styles.metricLabel}>{step.label}</div>
                                <p className={styles.metricDesc}>{step.description}</p>
                            </motion.div>
                        ))}
                        <motion.a
                            href="/contact"
                            className={`${styles.metricCard} ${styles.ctaCard}`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: steps.length * 0.06 }}
                        >
                            <span className={styles.ctaCardLabel}>Start with one workflow</span>
                            <span className={styles.ctaCardLink}>
                                Book an AI Workflow Assessment <ArrowUpRight size={16} />
                            </span>
                        </motion.a>
                    </div>
                </div>
            </div>
        </section>
    );
}
