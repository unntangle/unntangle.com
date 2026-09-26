'use client';

import { motion } from 'framer-motion';
import styles from './AIDeployment.module.css';

/**
 * Home-page "From Business Problem to Production AI" section.
 *
 * Top: the seven-stage engagement model.
 * Bottom: "How We Approach AI Deployment" — the Problem → Workflow →
 * Solution → Integration → Result structure every engagement is
 * documented against. This stands in for case studies until verified,
 * client-approved AI results exist. Never add invented clients or
 * metrics here.
 */

const stages = [
    { title: 'Discover', text: 'Conversations with the people who own and run the work.' },
    { title: 'AI Workflow Assessment', text: 'Workflows mapped, scored and prioritised.' },
    { title: 'Pilot', text: 'One workflow built and tested on real cases.' },
    { title: 'Integration', text: 'Connected to your systems and approval steps.' },
    { title: 'Production Deployment', text: 'Live in daily operations with your team.' },
    { title: 'AI Operations', text: 'Monitored, supported and kept reliable.' },
    { title: 'Continuous Improvement', text: 'Refined and extended to the next workflow.' },
];

const approach = [
    { label: 'Problem', title: 'What is it costing you?', text: 'The time, delay or error the business wants to remove, in your own terms.' },
    { label: 'Workflow', title: 'How does it run today?', text: 'Every step, person, document and system involved, mapped as it really happens.' },
    { label: 'Solution', title: 'What should AI do?', text: 'Which steps AI handles, which stay with people, and where approvals sit.' },
    { label: 'Integration', title: 'Where does it connect?', text: 'The systems it reads from and writes to, and how access is controlled.' },
    { label: 'Result', title: 'How will we know?', text: 'The measures agreed up front and reviewed with you after go-live.' },
];

export default function DeploymentModel() {
    return (
        <section className={`${styles.section} ${styles.light}`}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <span className="tag">AI Deployment Model</span>
                    <h2>From Business Problem to Production AI</h2>
                    <p>
                        We work alongside your team from identifying the opportunity to deploying
                        and operating the solution in production.
                    </p>
                </div>

                <ol className={styles.timeline}>
                    {stages.map((stage, i) => (
                        <motion.li
                            key={stage.title}
                            className={styles.stage}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.06 }}
                        >
                            <span className={styles.stageMarker}>{String(i + 1).padStart(2, '0')}</span>
                            <h3>{stage.title}</h3>
                            <p>{stage.text}</p>
                        </motion.li>
                    ))}
                </ol>

                <motion.div
                    className={styles.approach}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <div className={styles.approachHeader}>
                        <div>
                            <span className="tag" style={{ marginBottom: 0 }}>How We Approach AI Deployment</span>
                            <h3>Every engagement is defined the same way.</h3>
                        </div>
                        <p>
                            Before anything is built, we agree these five things with you —
                            so everyone knows what the AI will do, where it connects
                            and how success will be judged.
                        </p>
                    </div>

                    <div className={styles.approachGrid}>
                        {approach.map((item) => (
                            <div key={item.label} className={styles.approachItem}>
                                <span>{item.label}</span>
                                <h4>{item.title}</h4>
                                <p>{item.text}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
