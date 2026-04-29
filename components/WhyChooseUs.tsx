'use client';

import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import styles from './WhyChooseUs.module.css';

const comparisonRows = [
    {
        feature: 'Engineering velocity',
        unntangle: 'Ship in weeks, not quarters — modern stack with edge deployment.',
        others: 'Long timelines, legacy frameworks, six-month redesign cycles.',
    },
    {
        feature: 'Single integrated stack',
        unntangle: 'Tech, design, and growth under one roof — no agency hand-offs.',
        others: 'Three separate vendors, three invoices, three timelines.',
    },
    {
        feature: 'Deterministic outcomes',
        unntangle: 'Every decision is measurable, reversible, and tied to revenue.',
        others: 'Vanity metrics, deck-driven strategy, untracked deliverables.',
    },
    {
        feature: 'Modern infrastructure',
        unntangle: 'Next.js, edge functions, AI-augmented workflows by default.',
        others: 'WordPress templates, manual deploys, outdated tooling.',
    },
    {
        feature: 'Long-term partnership',
        unntangle: 'Retained engagement model — we stay invested in the outcome.',
        others: 'Project-based — disappear once the invoice clears.',
    },
];

export default function WhyChooseUs() {
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
                    <span className={styles.eyebrow}>Why Unntangle</span>
                    <h2 className={styles.title}>
                        The difference between a vendor
                        <br />
                        and a <span className={styles.titleAccent}>growth partner</span>.
                    </h2>
                    <p className={styles.subtitle}>
                        Most agencies optimize for the deliverable. We optimize for the outcome.
                        Here is how that shows up across every engagement.
                    </p>
                </motion.div>

                <motion.div
                    className={styles.comparisonTable}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                >
                    <div className={styles.tableHeader}>
                        <div className={styles.headerCell} aria-hidden="true" />
                        <div className={`${styles.headerCell} ${styles.headerUnntangle}`}>
                            <span className={styles.headerLabel}>Unntangle</span>
                        </div>
                        <div className={`${styles.headerCell} ${styles.headerOthers}`}>
                            <span className={styles.headerLabel}>Typical agencies</span>
                        </div>
                    </div>

                    {comparisonRows.map((row, i) => (
                        <motion.div
                            key={row.feature}
                            className={styles.tableRow}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 + i * 0.06 }}
                        >
                            <div className={styles.featureCell}>{row.feature}</div>
                            <div className={`${styles.cell} ${styles.cellUnntangle}`}>
                                <span className={styles.iconWrapper} aria-hidden="true">
                                    <Check size={16} strokeWidth={2.5} />
                                </span>
                                <span className={styles.cellText}>{row.unntangle}</span>
                            </div>
                            <div className={`${styles.cell} ${styles.cellOthers}`}>
                                <span className={`${styles.iconWrapper} ${styles.iconWrapperX}`} aria-hidden="true">
                                    <X size={16} strokeWidth={2.5} />
                                </span>
                                <span className={styles.cellText}>{row.others}</span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
