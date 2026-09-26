'use client';

import { motion } from 'framer-motion';
import styles from './AIDeployment.module.css';

/**
 * Home-page "From Manual Workflow to AI Workforce" section.
 *
 * A before/after of one concrete workflow (RFQ → quotation). The
 * example is illustrative — it describes the shape of a typical
 * deployment, not a specific client engagement, and the note under
 * the columns says so.
 */

const manualSteps = [
    'Customer sends RFQ',
    'Employee opens the PDF',
    'Searches product information',
    'Checks Excel / ERP',
    'Checks previous quotations',
    'Prepares the quotation',
    'Manager reviews',
    'Email sent',
    'CRM updated by hand',
];

type Actor = 'ai' | 'human' | 'system';

const aiSteps: { label: string; actor: Actor }[] = [
    { label: 'RFQ received', actor: 'system' },
    { label: 'AI reads and understands the RFQ', actor: 'ai' },
    { label: 'Retrieves relevant company information', actor: 'ai' },
    { label: 'Checks product and pricing data', actor: 'ai' },
    { label: 'Drafts the quotation', actor: 'ai' },
    { label: 'Human approval', actor: 'human' },
    { label: 'Quotation sent', actor: 'ai' },
    { label: 'CRM automatically updated', actor: 'ai' },
];

const badgeText: Record<Actor, string> = {
    ai: 'AI',
    human: 'Your team',
    system: 'Trigger',
};

export default function WorkflowExample() {
    return (
        <section className={`${styles.section} ${styles.white}`}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <span className="tag">From Manual Workflow to AI Workforce</span>
                    <h2>Turn Repetitive Work Into AI-Powered Workflows.</h2>
                    <p>
                        Take a request for quotation. Today it passes through several people,
                        several systems and a lot of copy-and-paste. Here is the same workflow
                        with AI doing the preparation and your team keeping the final say.
                    </p>
                </div>

                <div className={styles.compareGrid}>
                    <motion.div
                        className={styles.flowCard}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className={styles.flowCardEyebrow}>Traditional workflow</span>
                        <h3>Manual, person to person</h3>
                        <ol className={styles.flowList}>
                            {manualSteps.map((step, i) => (
                                <li key={step} className={styles.flowStep}>
                                    <span className={styles.flowMarker}>{i + 1}</span>
                                    {step}
                                    <span className={`${styles.flowBadge} ${styles.flowBadgeMuted}`}>
                                        Manual
                                    </span>
                                </li>
                            ))}
                        </ol>
                    </motion.div>

                    <motion.div
                        className={`${styles.flowCard} ${styles.flowCardDark}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <span className={styles.flowCardEyebrow}>With Unntangle</span>
                        <h3>AI prepares, your team approves</h3>
                        <ol className={styles.flowList}>
                            {aiSteps.map((step, i) => {
                                const markerClass =
                                    step.actor === 'ai'
                                        ? styles.flowMarkerAi
                                        : step.actor === 'human'
                                            ? styles.flowMarkerHuman
                                            : '';
                                const badgeClass =
                                    step.actor === 'ai'
                                        ? styles.flowBadgeAi
                                        : step.actor === 'human'
                                            ? styles.flowBadgeHuman
                                            : '';
                                return (
                                    <li
                                        key={step.label}
                                        className={`${styles.flowStep} ${step.actor !== 'system' ? styles.flowStepStrong : ''}`}
                                    >
                                        <span className={`${styles.flowMarker} ${markerClass}`}>{i + 1}</span>
                                        {step.label}
                                        <span className={`${styles.flowBadge} ${badgeClass}`}>
                                            {badgeText[step.actor]}
                                        </span>
                                    </li>
                                );
                            })}
                        </ol>
                    </motion.div>
                </div>

                <p className={styles.note}>
                    Illustrative example. The steps, data sources and approval points are designed
                    around each business during the assessment.
                </p>
            </div>
        </section>
    );
}
