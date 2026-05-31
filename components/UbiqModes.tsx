'use client';

import { motion, Variants } from 'framer-motion';
import { Sunrise, Briefcase, ShieldCheck, Moon } from 'lucide-react';
import styles from './UbiqModes.module.css';

/* uBIQ Future Living — the space adapting through the day. */

const modes = [
    { icon: <Sunrise size={22} strokeWidth={1.7} />, mode: 'Morning Mode', line: 'Space wakes with you.', note: 'Lights warm, blinds rise and climate eases in — gently, as you stir.' },
    { icon: <Briefcase size={22} strokeWidth={1.7} />, mode: 'Work Mode', line: 'Environment adapts.', note: 'Focus lighting, the right temperature, distractions quietly muted.' },
    { icon: <ShieldCheck size={22} strokeWidth={1.7} />, mode: 'Away Mode', line: 'Home protects itself.', note: 'Security arms, energy drops, and the space watches over itself.' },
    { icon: <Moon size={22} strokeWidth={1.7} />, mode: 'Night Mode', line: 'Comfort, optimised.', note: 'Pathways softly lit, doors secured, everything settling for rest.' },
];

const REVEAL = { once: true, margin: '-70px 0px' };
const container: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } };
const item: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function UbiqModes() {
    return (
        <section id="experiences" className={styles.section}>
            <div className={styles.inner}>
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={REVEAL}
                    transition={{ duration: 0.6 }}
                >
                    <span className={styles.eyebrow}>Future Living</span>
                    <h2 className={styles.title}>A space that moves with your day</h2>
                </motion.div>

                <motion.div
                    className={styles.grid}
                    variants={container}
                    initial="hidden"
                    whileInView="visible"
                    viewport={REVEAL}
                >
                    {modes.map((m) => (
                        <motion.div key={m.mode} className={styles.card} variants={item}>
                            <div className={styles.icon}>{m.icon}</div>
                            <span className={styles.mode}>{m.mode}</span>
                            <p className={styles.line}>{m.line}</p>
                            <p className={styles.note}>{m.note}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
