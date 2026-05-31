'use client';

import { motion, Variants } from 'framer-motion';
import {
    Crown,
    Building,
    Home,
    BedDouble,
    Building2,
    Sparkles,
} from 'lucide-react';
import styles from './UbiqIndustries.module.css';

/* ============================================================
 * uBIQ Industries — the spaces uBIQ automates.
 * Dark premium, compact icon cards.
 * ============================================================ */

const industries = [
    { icon: <Crown size={20} strokeWidth={1.7} />, title: 'Luxury Homes', note: 'Bespoke automation for high-end residences.' },
    { icon: <Building size={20} strokeWidth={1.7} />, title: 'Apartments', note: 'Smart living scaled across residential units.' },
    { icon: <Home size={20} strokeWidth={1.7} />, title: 'Villas', note: 'Whole-property control, indoors and out.' },
    { icon: <BedDouble size={20} strokeWidth={1.7} />, title: 'Hotels', note: 'Guest-room and property-wide automation.' },
    { icon: <Building2 size={20} strokeWidth={1.7} />, title: 'Offices', note: 'Connected, efficient, future-ready workplaces.' },
    { icon: <Sparkles size={20} strokeWidth={1.7} />, title: 'Experience Centers', note: 'Immersive, interactive branded environments.' },
];

const REVEAL = { once: true, margin: '-80px 0px' };
const container: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } } };
const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function UbiqIndustries() {
    return (
        <section id="industries" className={styles.section}>
            <div className={styles.inner}>
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={REVEAL}
                    transition={{ duration: 0.6 }}
                >
                    <span className={styles.eyebrow}>Industries</span>
                    <h2 className={styles.title}>Built for the spaces that demand more</h2>
                </motion.div>

                <motion.div
                    className={styles.grid}
                    variants={container}
                    initial="hidden"
                    whileInView="visible"
                    viewport={REVEAL}
                >
                    {industries.map((ind) => (
                        <motion.div key={ind.title} className={styles.card} variants={item}>
                            <div className={styles.icon}>{ind.icon}</div>
                            <div className={styles.text}>
                                <h3 className={styles.cardTitle}>{ind.title}</h3>
                                <p className={styles.cardNote}>{ind.note}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
