'use client';

import { motion, Variants } from 'framer-motion';
import { BadgeCheck, Cpu, Palette, Rocket, Wand2 } from 'lucide-react';
import styles from './UbiqWhy.module.css';

/* ============================================================
 * uBIQ — "Why uBIQ?" differentiators.
 * Dark premium card grid. Leads with the Unntangle endorsement.
 * ============================================================ */

const reasons = [
    {
        icon: <BadgeCheck size={22} strokeWidth={1.7} />,
        title: 'Backed by Unntangle',
        description: 'A specialist automation team with the credibility, process and accountability of an innovation company established in 2023.',
    },
    {
        icon: <Cpu size={22} strokeWidth={1.7} />,
        title: 'Technology-first approach',
        description: 'Systems engineered, not just installed — open standards, clean architecture and integrations that last.',
    },
    {
        icon: <Palette size={22} strokeWidth={1.7} />,
        title: 'Premium design integration',
        description: 'Automation that disappears into the architecture, designed alongside your interiors, not bolted on after.',
    },
    {
        icon: <Rocket size={22} strokeWidth={1.7} />,
        title: 'Future-ready infrastructure',
        description: 'Scalable, upgradeable foundations so your space keeps gaining capability for years, not months.',
    },
    {
        icon: <Wand2 size={22} strokeWidth={1.7} />,
        title: 'Seamless user experience',
        description: 'Intuitive control across app, keypad and voice — powerful underneath, effortless to live with.',
    },
];

const REVEAL = { once: true, margin: '-80px 0px' };
const container: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } } };
const item: Variants = {
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function UbiqWhy() {
    return (
        <section id="why" className={styles.section}>
            <div className={styles.inner}>
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={REVEAL}
                    transition={{ duration: 0.6 }}
                >
                    <span className={styles.eyebrow}>Why uBIQ</span>
                    <h2 className={styles.title}>A specialist edge, an established backbone</h2>
                </motion.div>

                <motion.div
                    className={styles.grid}
                    variants={container}
                    initial="hidden"
                    whileInView="visible"
                    viewport={REVEAL}
                >
                    {reasons.map((r) => (
                        <motion.div key={r.title} className={styles.card} variants={item}>
                            <div className={styles.icon}>{r.icon}</div>
                            <h3 className={styles.cardTitle}>{r.title}</h3>
                            <p className={styles.cardDesc}>{r.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
