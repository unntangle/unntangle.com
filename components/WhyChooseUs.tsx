'use client';

import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import styles from './WhyChooseUs.module.css';

const comparisonRows = [
    {
        feature: 'How work happens today',
        unntangle: 'AI reads the RFQ, retrieves product data, drafts the quotation, waits for approval, sends it and updates the CRM — automatically.',
        others: 'Employee opens the PDF, searches the ERP, copies previous quotes, prepares the document manually and updates the CRM by hand.',
    },
    {
        feature: 'Follow-up on outstanding payments',
        unntangle: 'AI monitors receivables daily, prepares tiered reminders, sends them via email or WhatsApp on schedule and escalates overdue accounts to the right person.',
        others: 'Finance team manually checks the ledger, identifies overdue invoices, writes follow-up emails and tracks responses in a spreadsheet.',
    },
    {
        feature: 'Vendor quotation comparison',
        unntangle: 'AI extracts line-item pricing from every vendor PDF, builds a comparison table, highlights the best option and prepares a draft purchase recommendation.',
        others: 'Procurement team opens each PDF separately, types prices into Excel, creates comparison manually and prepares recommendations from scratch.',
    },
    {
        feature: 'Customer enquiry handling',
        unntangle: 'AI reads the customer message, checks order status in the ERP, retrieves the relevant information and sends an accurate response within minutes — 24 hours a day.',
        others: 'Customer service team reads the message, logs into the ERP, looks up the order, composes a response and sends it — during business hours only.',
    },
    {
        feature: 'Management reporting',
        unntangle: 'AI pulls data from ERP, CRM and operations systems each morning, compiles the management briefing and delivers it to leadership automatically.',
        others: 'Operations or finance team manually compiles reports from multiple systems each day — consuming 2–3 hours that could be spent on higher-value work.',
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
                    <span className={styles.eyebrow}>Real Workflow Examples</span>
                    <h2 className={styles.title}>
                        Turn Repetitive Work
                        <br />
                        <span className={styles.titleAccent}>Into AI-Powered Workflows.</span>
                    </h2>
                    <p className={styles.subtitle}>
                        Here is what the same business task looks like before and after AI deployment.
                        The right column is not a futuristic vision — it is what Unntangle builds and deploys
                        into real business operations.
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
                            <span className={styles.headerLabel}>With Unntangle AI</span>
                        </div>
                        <div className={`${styles.headerCell} ${styles.headerOthers}`}>
                            <span className={styles.headerLabel}>Manual today</span>
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
