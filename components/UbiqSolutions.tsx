'use client';

import { motion, Variants } from 'framer-motion';
import {
    Home,
    Lightbulb,
    Network,
    Tv,
    Thermometer,
    ShieldCheck,
    Zap,
    Building2,
} from 'lucide-react';
import styles from './UbiqSolutions.module.css';

/* ============================================================
 * uBIQ Solutions — the eight automation offerings.
 * Dark premium card grid, KNX-forward, sky accent.
 * ============================================================ */

const solutions = [
    {
        icon: <Home size={22} strokeWidth={1.7} />,
        title: 'Smart Home Automation',
        description: 'Unified control of an entire home from a single app, keypad or voice — every system in sync.',
    },
    {
        icon: <Lightbulb size={22} strokeWidth={1.7} />,
        title: 'Lighting Automation',
        description: 'Scenes, dimming and circadian control that shape mood and trim energy automatically.',
    },
    {
        icon: <Network size={22} strokeWidth={1.7} />,
        title: 'KNX Solutions',
        description: 'Open-standard KNX systems engineered for reliability, scale and long-term flexibility.',
    },
    {
        icon: <Tv size={22} strokeWidth={1.7} />,
        title: 'AV & Entertainment',
        description: 'Cinema rooms, multi-room audio and discreet displays, controlled with a single tap.',
    },
    {
        icon: <Thermometer size={22} strokeWidth={1.7} />,
        title: 'Climate Control',
        description: 'Room-by-room comfort that learns routines and balances efficiency with experience.',
    },
    {
        icon: <ShieldCheck size={22} strokeWidth={1.7} />,
        title: 'Security & Surveillance',
        description: 'Cameras, access, intercom and alarms unified into one trusted view from anywhere.',
    },
    {
        icon: <Zap size={22} strokeWidth={1.7} />,
        title: 'Energy Management',
        description: 'Monitor, optimise and automate consumption across lighting, climate and appliances.',
    },
    {
        icon: <Building2 size={22} strokeWidth={1.7} />,
        title: 'Commercial Automation',
        description: 'Building-wide control for offices, hospitality and experience centres at scale.',
    },
];

const REVEAL = { once: true, margin: '-80px 0px' };

const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
};

const item: Variants = {
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function UbiqSolutions() {
    return (
        <section id="solutions" className={styles.section}>
            <div className={styles.inner}>
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={REVEAL}
                    transition={{ duration: 0.6 }}
                >
                    <span className={styles.eyebrow}>Solutions</span>
                    <h2 className={styles.title}>Everything that makes a space intelligent</h2>
                    <p className={styles.subtitle}>
                        Platform-agnostic by design — including open-standard KNX — engineered
                        and integrated into one seamless experience.
                    </p>
                </motion.div>

                <motion.div
                    className={styles.grid}
                    variants={container}
                    initial="hidden"
                    whileInView="visible"
                    viewport={REVEAL}
                >
                    {solutions.map((s) => (
                        <motion.div key={s.title} className={styles.card} variants={item}>
                            <div className={styles.icon}>{s.icon}</div>
                            <h3 className={styles.cardTitle}>{s.title}</h3>
                            <p className={styles.cardDesc}>{s.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
