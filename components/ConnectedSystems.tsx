'use client';

import { motion } from 'framer-motion';
import {
    ArrowDown,
    Database,
    Users,
    Mail,
    MessageCircle,
    FileText,
    HardDrive,
    Braces,
} from 'lucide-react';
import styles from './AIDeployment.module.css';

/**
 * Home-page "Your Existing Systems Stay. AI Connects Them." section.
 *
 * Conceptual layer diagram — NOT a list of shipped connectors. The note
 * in the text column makes clear integrations are scoped per client.
 */

const systems = [
    { label: 'ERP', icon: <Database size={14} /> },
    { label: 'CRM', icon: <Users size={14} /> },
    { label: 'Email', icon: <Mail size={14} /> },
    { label: 'WhatsApp', icon: <MessageCircle size={14} /> },
    { label: 'Documents', icon: <FileText size={14} /> },
    { label: 'Databases', icon: <HardDrive size={14} /> },
    { label: 'APIs', icon: <Braces size={14} /> },
];

export default function ConnectedSystems() {
    return (
        <section className={`${styles.section} ${styles.light}`}>
            <div className={styles.container}>
                <div className={styles.splitGrid}>
                    <div className={styles.splitText}>
                        <span className="tag">Built Around Your Systems</span>
                        <h2>Your Existing Systems Stay. AI Connects Them.</h2>
                        <p>
                            You don&apos;t need to replace your ERP, CRM or existing business
                            software to adopt AI.
                        </p>
                        <p>
                            Unntangle connects AI to the systems your teams already use, so the
                            AI works with the same customer records, product data, documents and
                            conversations your people do — and the results land back where your
                            teams already look.
                        </p>
                        <p className={styles.splitNote}>
                            Integrations are scoped to each client. Depending on what a system
                            supports, we connect through its APIs, database, file exports or email
                            — and agree the approach with your IT team before anything is built.
                        </p>
                    </div>

                    <motion.div
                        className={styles.layerStack}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        aria-label="Your systems connect to the Unntangle AI layer, which runs AI agents and workflows for your employees, customers and management"
                    >
                        <div className={styles.layer}>
                            <span className={styles.layerLabel}>Your existing systems</span>
                            <div className={styles.chipRow}>
                                {systems.map((s) => (
                                    <span key={s.label} className={styles.chip}>
                                        {s.icon}
                                        {s.label}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className={styles.layerArrow} aria-hidden="true">
                            <ArrowDown size={20} />
                        </div>

                        <div className={`${styles.layer} ${styles.layerCore}`}>
                            <span className={styles.layerLabel}>Connects &amp; orchestrates</span>
                            <div className={styles.layerCoreTitle}>Unntangle AI Layer</div>
                            <p className={styles.layerCoreSub}>
                                Reads context · Applies your business rules · Routes work for approval
                            </p>
                        </div>

                        <div className={styles.layerArrow} aria-hidden="true">
                            <ArrowDown size={20} />
                        </div>

                        <div className={styles.layer}>
                            <span className={styles.layerLabel}>Does the work</span>
                            <div className={styles.chipRow}>
                                <span className={styles.chip}>AI Agents</span>
                                <span className={styles.chip}>Business Workflows</span>
                            </div>
                        </div>

                        <div className={styles.layerArrow} aria-hidden="true">
                            <ArrowDown size={20} />
                        </div>

                        <div className={styles.layer}>
                            <span className={styles.layerLabel}>Serves</span>
                            <div className={styles.chipRow}>
                                <span className={styles.chip}>Employees</span>
                                <span className={styles.chip}>Customers</span>
                                <span className={styles.chip}>Management</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
