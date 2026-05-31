'use client';

import { motion, Variants } from 'framer-motion';
import styles from './UbiqProcess.module.css';

/* ============================================================
 * uBIQ Process
 *
 * "How we work" — the five-stage engagement that reassures
 * high-end buyers: consult, design, install, calibrate, support.
 * White surface to layer against the #fafafa capabilities section
 * above it.
 * ============================================================ */

const steps = [
    {
        no: '01',
        title: 'Consult & Survey',
        description:
            'We visit, understand how you live, and assess the space, wiring and goals — no two homes are the same.',
    },
    {
        no: '02',
        title: 'System Design',
        description:
            'A tailored design and transparent proposal: the right platforms for your home, with nothing oversold.',
    },
    {
        no: '03',
        title: 'Installation',
        description:
            'Certified technicians handle wiring, mounting and integration cleanly, with minimal disruption.',
    },
    {
        no: '04',
        title: 'Calibration',
        description:
            'Scenes, automations and interfaces are programmed and tuned around your daily routine.',
    },
    {
        no: '05',
        title: 'Support & AMC',
        description:
            'Ongoing service, updates and annual maintenance keep everything running flawlessly for years.',
    },
];

const REVEAL_VIEWPORT = { once: true, margin: '-80px 0px' };

const staggerContainer: Variants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
};

const staggerItem: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
};

export default function UbiqProcess() {
    return (
        <section className={styles.section}>
            <div className={styles.inner}>
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={REVEAL_VIEWPORT}
                    transition={{ duration: 0.6 }}
                >
                    <span className={styles.eyebrow}>How we work</span>
                    <h2 className={styles.title}>From first visit to lifelong support</h2>
                    <p className={styles.subtitle}>
                        One accountable team from consultation to aftercare — so there&apos;s
                        never a gap between who designed your system and who looks after it.
                    </p>
                </motion.div>

                <motion.ol
                    className={styles.steps}
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={REVEAL_VIEWPORT}
                >
                    {steps.map((step) => (
                        <motion.li
                            key={step.no}
                            className={styles.step}
                            variants={staggerItem}
                        >
                            <span className={styles.stepNo}>{step.no}</span>
                            <h3 className={styles.stepTitle}>{step.title}</h3>
                            <p className={styles.stepDescription}>{step.description}</p>
                        </motion.li>
                    ))}
                </motion.ol>
            </div>
        </section>
    );
}
