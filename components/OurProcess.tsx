'use client';

import { motion } from 'framer-motion';
import { Compass, PenTool, Code2, Rocket } from 'lucide-react';
import styles from './OurProcess.module.css';

const steps = [
    {
        number: '01',
        icon: Compass,
        title: 'Discovery & Strategy',
        description: 'We start by understanding your business mechanics — not just what you want built, but the underlying goal it has to serve. Every engagement begins with a structured intake.',
        deliverables: ['Stakeholder interviews', 'Technical audit', 'Strategic brief'],
    },
    {
        number: '02',
        icon: PenTool,
        title: 'Design & Architecture',
        description: 'Wireframes, design systems, and infrastructure decisions all happen in parallel. The output is a single source of truth that aligns engineering, design, and growth from day one.',
        deliverables: ['Design tokens', 'Component library', 'System architecture'],
    },
    {
        number: '03',
        icon: Code2,
        title: 'Build & Iterate',
        description: 'We ship in 2-week sprints with continuous deployment to a staging environment. You see progress live, give feedback in real time, and we adjust before scope drifts.',
        deliverables: ['Bi-weekly demos', 'Live staging links', 'Iterative refinement'],
    },
    {
        number: '04',
        icon: Rocket,
        title: 'Launch & Optimize',
        description: 'Launch is the start, not the end. We instrument analytics, set up A/B testing infrastructure, and stay engaged through the first 90 days to optimize against real-world data.',
        deliverables: ['Zero-downtime deploy', 'Analytics setup', '90-day optimization'],
    },
];

export default function OurProcess() {
    return (
        <section className={styles.section}>
            <div className={`container ${styles.container}`}>
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className={styles.eyebrow}>How we work</span>
                    <h2 className={styles.title}>
                        A process built to <span className={styles.titleAccent}>de-risk</span> ambition.
                    </h2>
                    <p className={styles.subtitle}>
                        Big projects fail in predictable ways: scope drift, late surprises, hand-off chaos.
                        Our four-stage process is engineered to eliminate each one.
                    </p>
                </motion.div>

                <div className={styles.timeline}>
                    <div className={styles.connectorLine} aria-hidden="true" />

                    {steps.map((step, i) => {
                        const Icon = step.icon;
                        return (
                            <motion.div
                                key={step.number}
                                className={styles.stepCard}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.12 }}
                            >
                                <div className={styles.stepHeader}>
                                    <span className={styles.stepNumber}>{step.number}</span>
                                    <div className={styles.iconBadge}>
                                        <Icon size={20} strokeWidth={2} />
                                    </div>
                                </div>

                                <h3 className={styles.stepTitle}>{step.title}</h3>
                                <p className={styles.stepDescription}>{step.description}</p>

                                <ul className={styles.deliverables}>
                                    {step.deliverables.map((item) => (
                                        <li key={item} className={styles.deliverable}>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
