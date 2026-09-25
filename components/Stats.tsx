'use client';

import { motion } from 'framer-motion';
import { Search, Hammer, Plug, Rocket, Activity, TrendingUp, ArrowUpRight } from 'lucide-react';
import styles from './Stats.module.css';

/**
 * Home-page deployment methodology section.
 *
 * Repurposed from "Architecture of Impact" to communicate the
 * Assess → Build → Integrate → Deploy → Operate → Improve
 * AI deployment cycle. Uses the same layout (featured card left,
 * 3-col metric grid right) so no CSS changes needed.
 */

const pillars = [
    {
        value: '01',
        label: 'Assess',
        icon: <Search size={18} />,
        description:
            'We map your existing workflows, identify where repetitive manual effort is highest, and prioritise where AI can create measurable impact first.',
    },
    {
        value: '02',
        label: 'Build',
        icon: <Hammer size={18} />,
        description:
            'We build the required AI agent or workflow — trained on your business context, your data formats, and the specific decisions it needs to support.',
    },
    {
        value: '03',
        label: 'Integrate',
        icon: <Plug size={18} />,
        description:
            'We connect the AI to your existing systems — ERP, CRM, email, WhatsApp, databases and internal applications — without replacing any of them.',
    },
    {
        value: '04',
        label: 'Deploy & Improve',
        icon: <Rocket size={18} />,
        description:
            'We deploy into your real production workflow with appropriate human controls, then monitor performance and continuously improve as the system learns.',
    },
];

export default function Stats() {
    return (
        <section className={styles.stats}>
            <div className={`container ${styles.container}`}>
                <div className={styles.topHeader}>
                    <div className={styles.headerInfo}>
                        <span className={styles.sublabel}>How We Deploy AI</span>
                        <h2 className={styles.mainTitle}>Start With Your Workflow. Not With AI.</h2>
                    </div>
                    <p className={styles.headerDescription}>
                        We don&apos;t begin by selling a predefined AI product. We first understand how your
                        business works — then identify the workflows where AI can create real, measurable value.
                    </p>
                </div>

                <div className={styles.layoutGrid}>
                    {/* Featured Large Card — value proposition */}
                    <motion.div
                        className={styles.featuredCard}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className={styles.featuredContent}>
                            <div className={styles.featuredIcon}>
                                <Activity size={32} />
                            </div>
                            <h3>From Business Problem to Production AI</h3>
                            <p>
                                Most AI projects fail because they start with the technology, not
                                the workflow. We flip that. Every deployment begins with your teams
                                — understanding how work happens today, where time is lost, and
                                which tasks are genuinely worth automating. Only then do we build.
                            </p>
                            <a href="/contact" className={styles.ghostLink}>
                                Book an AI Workflow Assessment <ArrowUpRight size={16} />
                            </a>
                        </div>
                        <div className={styles.featuredVisual}>
                            <div className={styles.glowOrb}></div>
                        </div>
                    </motion.div>

                    {/* Steps sub-grid */}
                    <div className={styles.metricsGrid}>
                        {pillars.map((pillar, index) => (
                            <motion.div
                                key={index}
                                className={styles.metricCard}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className={styles.metricHeader}>
                                    <span className={styles.metricIcon}>{pillar.icon}</span>
                                    <span className={styles.metricValue}>{pillar.value}</span>
                                </div>
                                <div className={styles.metricLabel}>{pillar.label}</div>
                                <p className={styles.metricDesc}>{pillar.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
