'use client';

import { motion, Variants } from 'framer-motion';
import {
    Lightbulb,
    Thermometer,
    Blinds,
    Tv,
    Volume2,
    Lock,
} from 'lucide-react';
import styles from './UbiqCapabilities.module.css';

/* ============================================================
 * uBIQ Capabilities
 *
 * The systems uBIQ designs, installs and unifies. This is the
 * "what we do" section — outcome-led, vendor-agnostic. It also
 * carries the platforms note in WORDS ONLY (no third-party logos,
 * no "authorized dealer" claims) until dealerships are in place.
 * ============================================================ */

const capabilities = [
    {
        icon: <Lightbulb size={24} strokeWidth={1.8} />,
        title: 'Intelligent Lighting',
        description:
            'Scenes, dimming and circadian control across the whole home — from a single keypad, app or voice.',
    },
    {
        icon: <Thermometer size={24} strokeWidth={1.8} />,
        title: 'Climate & HVAC',
        description:
            'Room-by-room comfort that learns your routine and quietly trims energy use in the background.',
    },
    {
        icon: <Blinds size={24} strokeWidth={1.8} />,
        title: 'Shades & Drapes',
        description:
            'Motorised shading that tracks the sun, frames the view, and sets the mood at the touch of a button.',
    },
    {
        icon: <Tv size={24} strokeWidth={1.8} />,
        title: 'Home Theatre & AV',
        description:
            'Cinema-grade rooms and discreet displays, with one remote — or one tap — controlling everything.',
    },
    {
        icon: <Volume2 size={24} strokeWidth={1.8} />,
        title: 'Multi-room Audio',
        description:
            'High-fidelity sound in every space, independently controlled or playing in perfect sync.',
    },
    {
        icon: <Lock size={24} strokeWidth={1.8} />,
        title: 'Security & Access',
        description:
            'Cameras, smart locks, intercom and alarms unified into one view you can trust from anywhere.',
    },
];

const platforms = ['Crestron', 'Control4', 'KNX', 'Lutron'];

const REVEAL_VIEWPORT = { once: true, margin: '-80px 0px' };

const staggerContainer: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
        },
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

export default function UbiqCapabilities() {
    return (
        <section id="capabilities" className={styles.section}>
            <div className={styles.inner}>
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={REVEAL_VIEWPORT}
                    transition={{ duration: 0.6 }}
                >
                    <span className={styles.eyebrow}>What we automate</span>
                    <h2 className={styles.title}>Every system, one intelligent home</h2>
                    <p className={styles.subtitle}>
                        We&apos;re platform-agnostic integrators, not a single-brand reseller.
                        uBIQ chooses the right technology for your home and ties it together
                        into one experience that simply works.
                    </p>
                </motion.div>

                <motion.div
                    className={styles.grid}
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={REVEAL_VIEWPORT}
                >
                    {capabilities.map((capability) => (
                        <motion.div
                            key={capability.title}
                            className={styles.card}
                            variants={staggerItem}
                        >
                            <div className={styles.icon}>{capability.icon}</div>
                            <h3 className={styles.cardTitle}>{capability.title}</h3>
                            <p className={styles.cardDescription}>
                                {capability.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Platforms — WORDS ONLY. No logos, no "authorized" claims. */}
                <motion.div
                    className={styles.platforms}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={REVEAL_VIEWPORT}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <span className={styles.platformsLabel}>
                        Built on the world&apos;s leading platforms
                    </span>
                    <div className={styles.platformsRow}>
                        {platforms.map((name) => (
                            <span key={name} className={styles.platformChip}>
                                {name}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
