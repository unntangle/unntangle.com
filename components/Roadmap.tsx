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
        title: 'SaaS Suite Expansion',
        description:
            'uDYLR enters production for outbound BPO operations. uSCRIBR moves into pilot with clinical partners. The SaaS portfolio crosses three live products in market.',
    },
    {
        year: '2026',
        title: 'uSYNQ Across India',
        description:
            'Smart-living hardware reaches premium residential and hospitality projects across the top 10 metros. Retrofit modules and TITAN panels become the default specification for high-end builders.',
    },
    {
        year: '2027',
        title: 'Vertical AI Agents',
        description:
            'Beyond telecalling and clinical scribes, we expand into purpose-built AI agents for finance, education, and retail — each trained on industry-specific data and compliance requirements.',
    },
    {
        year: '2027',
        title: 'International Footprint',
        description:
            'First overseas client engagements, primarily in Southeast Asia and the Middle East. Localised infrastructure, language coverage, and regional compliance built into the SaaS stack.',
    },
    {
        year: '2028',
        title: 'Connected Living Ecosystem',
        description:
            'uSYNQ hardware and our SaaS platforms converge — voice agents, security, climate, and access control share one unified app and one accountable team behind the experience.',
    },
    {
        year: '2028',
        title: 'Studio at 100',
        description:
            'A senior team of 100+ engineers, designers, and growth strategists — still operating as one accountable studio rather than fragmented practice areas. Same model, more depth.',
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
