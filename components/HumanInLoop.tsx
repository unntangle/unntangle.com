'use client';

import { Fragment } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, UserCheck, KeyRound, ScrollText, Siren } from 'lucide-react';
import styles from './AIDeployment.module.css';

/**
 * Home-page "AI Works With Your People — Not Around Them" trust section.
 * Dark band so it reads as a deliberate pause between the systems
 * diagram and the industries grid.
 */

const loop = [
    { actor: 'AI', title: 'Analyses', text: 'Reads the request, documents and data from your systems.' },
    { actor: 'AI', title: 'Recommends', text: 'Prepares a draft, a decision or a flagged exception.' },
    { actor: 'Your team', title: 'Approves', text: 'The right person reviews, edits or rejects before anything critical happens.', human: true },
    { actor: 'AI', title: 'Executes', text: 'Sends, updates and records the outcome once approved.' },
];

const controls = [
    { icon: <UserCheck size={20} />, title: 'Approval gates', text: 'You decide which steps need a person to sign off.' },
    { icon: <KeyRound size={20} />, title: 'Permissions', text: 'AI only sees and changes what its role allows.' },
    { icon: <ScrollText size={20} />, title: 'Auditability', text: 'Every action is logged with what was done and why.' },
    { icon: <Siren size={20} />, title: 'Escalation', text: 'Unusual or high-value cases go straight to your team.' },
];

export default function HumanInLoop() {
    return (
        <section className={`${styles.section} ${styles.dark}`}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <span className="tag">Human + AI</span>
                    <h2>AI Works With Your People — Not Around Them</h2>
                    <p>
                        Enterprise AI should not blindly automate critical decisions. Unntangle
                        designs workflows with appropriate human approval, permissions,
                        auditability and escalation.
                    </p>
                </div>

                <div className={styles.loopRow}>
                    {loop.map((step, i) => (
                        <Fragment key={step.title}>
                            <motion.div
                                className={`${styles.loopStep} ${step.human ? styles.loopStepHuman : ''}`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.45, delay: i * 0.08 }}
                            >
                                <span className={styles.loopActor}>{step.actor}</span>
                                <h3>{step.title}</h3>
                                <p>{step.text}</p>
                            </motion.div>
                            {i < loop.length - 1 && (
                                <div className={styles.loopArrow} aria-hidden="true">
                                    <ArrowRight size={20} />
                                </div>
                            )}
                        </Fragment>
                    ))}
                </div>

                <div className={styles.controlGrid}>
                    {controls.map((c) => (
                        <div key={c.title} className={styles.controlItem}>
                            <span className={styles.controlIcon}>{c.icon}</span>
                            <div>
                                <h4>{c.title}</h4>
                                <p>{c.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
