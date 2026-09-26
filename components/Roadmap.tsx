'use client';

import { motion } from 'framer-motion';
import styles from './Roadmap.module.css';

/**
 * About-page "Where we're headed" forward roadmap.
 *
 * Pairs with <OurJourney /> earlier on the page:
 *   - OurJourney = past (2023 founding through current state)
 *   - Roadmap   = future (next 2-3 years of intent)
 *
 * Milestones are intentionally directional rather than dated
 * commitments — we want to convey ambition without setting hard
 * promises that the company has to defend later. As real product
 * launches happen, move them from this Roadmap section into the
 * OurJourney timeline (which is the canonical "shipped work"
 * record).
 */

const milestones = [
    {
        year: '2026',
        title: 'Assessment-Led Engagements',
        description:
            'The AI Workflow Assessment becomes the standard starting point for every new AI engagement — understanding the workflow before building anything.',
    },
    {
        year: '2026',
        title: 'Production AI Deployments',
        description:
            'AI workflows deployed into sales, finance, procurement and operations for B2B businesses, running inside existing systems with human approval built in.',
    },
    {
        year: '2027',
        title: 'Reusable Integration Library',
        description:
            'A growing set of tested connectors for common ERPs, CRMs, email and WhatsApp, so each new deployment reaches production faster.',
    },
    {
        year: '2027',
        title: 'AI Products Mature',
        description:
            'uVOIZ moves beyond beta, and uDYLR and uSCRIBR move into pilots with early customers.',
    },
    {
        year: '2027',
        title: 'AI-Ready Software by Default',
        description:
            'Every website, app and custom system we build is structured so AI workflows can be added on top without rebuilding.',
    },
    {
        year: '2028',
        title: 'Wider Footprint',
        description:
            'AI implementation and software engagements beyond India, starting with the Middle East and Southeast Asia.',
    },
];

export default function Roadmap() {
    return (
        <section className={styles.roadmap}>
            <div className={`container ${styles.container}`}>
                <div className={styles.header}>
                    <span className="tag">Our Journey</span>
                    <h2 className={styles.title}>The road ahead</h2>
                    <p className={styles.description}>
                        Directional milestones for the next two to three years. As we ship
                        them, they move into the founding timeline above.
                    </p>
                </div>

                <div className={styles.schematicWrapper}>
                    <div className={styles.centralAxis}></div>

                    <div className={styles.nodesList}>
                        {milestones.map((milestone, index) => (
                            <div key={index} className={`${styles.nodeRow} ${index % 2 === 0 ? styles.leftRow : styles.rightRow}`}>
                                <motion.div
                                    className={styles.schematicNode}
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <div className={styles.nodeHeader}>
                                        <span className={styles.yearLabel}>{milestone.year}</span>
                                        <div className={styles.statusIndicator}></div>
                                    </div>
                                    <div className={styles.nodeBody}>
                                        <h3>{milestone.title}</h3>
                                        <p>{milestone.description}</p>
                                    </div>
                                    <div className={styles.junctionLine}></div>
                                </motion.div>
                                <div className={styles.axisDot}></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
