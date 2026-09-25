'use client';

import { motion } from 'framer-motion';
import { Layers3, Code2, Palette, TrendingUp, ArrowUpRight } from 'lucide-react';
import styles from './Stats.module.css';

/**
 * Home-page "Architecture of Impact" section.
 *
 * Communicates Unntangle Technologies's three core service pillars (Technology
 * Solutions, Creative Design, Growth Marketing) plus a featured
 * value-prop card on the left summarising why those pillars work
 * better when delivered together.
 *
 * The right-side metric cards mirror the categories from the
 * Services section above (expertiseGroups in Services.tsx) so the
 * narrative is consistent: "here's what we do" → "here's how we
 * do it together" → product / case-study sections below.
 */

const pillars = [
    {
        value: '6',
        label: 'AI Agent Solutions',
        icon: <Code2 size={18} />,
        description:
            'Sales, Finance, Procurement, Operations, Customer Service and Management Intelligence — AI agents built for each function.',
    },
    {
        value: '10+',
        label: 'System Integrations',
        icon: <Palette size={18} />,
        description:
            'ERP, CRM, databases, documents, email, WhatsApp and internal applications — AI connects to the systems you already use.',
    },
    {
        value: '6+',
        label: 'Industries Served',
        icon: <TrendingUp size={18} />,
        description:
            'Manufacturing, industrial, logistics, distribution, pharma and textiles — complex B2B businesses with repetitive workflows.',
    },
    {
        value: '100%',
        label: 'In-House AI Engineering',
        icon: <Layers3 size={18} />,
        description:
            'A single accountable team across AI engineering, software development and integrations — no hand-offs, no finger-pointing.',
    },
];

export default function Stats() {
    return (
        <section className={styles.stats}>
            <div className={`container ${styles.container}`}>
                <div className={styles.topHeader}>
                    <div className={styles.headerInfo}>
                        <span className={styles.sublabel}>How We Work</span>
                        <h2 className={styles.mainTitle}>AI That Fits Into Your Business.</h2>
                    </div>
                    <p className={styles.headerDescription}>
                        Most AI tools ask your team to change how they work. We don&apos;t. Our AI agents
                        connect to the systems you already use — ERP, CRM, email, WhatsApp — and
                        operate inside your existing workflows without disruption.
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
                                <Layers3 size={32} />
                            </div>
                            <h3>From Experimenting to Actually Operating with AI</h3>
                            <p>
                                Many businesses have tried AI tools that sit outside their real
                                workflows. We connect AI agents directly to your ERP, CRM, databases
                                and communication channels — so AI becomes part of how your business
                                actually runs, not just another dashboard your team ignores.
                            </p>
                            <a href="/services" className={styles.ghostLink}>
                                See AI solutions <ArrowUpRight size={16} />
                            </a>
                        </div>
                        <div className={styles.featuredVisual}>
                            <div className={styles.glowOrb}></div>
                        </div>
                    </motion.div>

                    {/* Pillars sub-grid — 3 service categories + summary tile */}
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
