'use client';

import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import styles from './WhyChooseUs.module.css';

const comparisonRows = [
    {
        feature: 'Systems integration',
        unntangle: 'AI connects to your existing ERP, CRM, email, WhatsApp and databases — no rip-and-replace.',
        others: 'Generic AI tools that sit outside your real workflows and require manual data entry.',
    },
    {
        feature: 'Workflow depth',
        unntangle: 'AI agents that analyse, prepare and execute multi-step business workflows end-to-end.',
        others: 'Chatbots and dashboards that answer questions but cannot take action inside your systems.',
    },
    {
        feature: 'Enterprise-grade security',
        unntangle: 'Your data stays in your environment — no third-party model training on your business data.',
        others: 'Cloud SaaS tools where your data feeds into shared models with unknown data governance.',
    },
    {
        feature: 'Deployment speed',
        unntangle: 'First AI agents live in 4–8 weeks — phased rollout starting with your highest-value workflow.',
        others: 'Six-month consulting engagements before a single automated workflow goes live.',
    },
    {
        feature: 'Ongoing accountability',
        unntangle: 'Retained partnership model — we stay invested, iterate and expand as your business grows.',
        others: 'Project handoffs — you get a system, a manual, and a goodbye once the invoice is paid.',
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
                        AI that actually runs inside
                        <br />
                        <span className={styles.titleAccent}>your business.</span>
                    </h2>
                    <p className={styles.subtitle}>
                        Most AI tools are built for demos, not for the messy reality of how mid-market
                        businesses actually operate. Unntangle builds AI agents that connect to your real
                        systems, run your real workflows, and are accountable for real outcomes.
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
                            <span className={styles.headerLabel}>Typical vendors</span>
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
