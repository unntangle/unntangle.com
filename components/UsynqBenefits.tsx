'use client';

import { motion, Variants } from 'framer-motion';
import {
    ShieldCheck,
    Wrench,
    Headset,
    Truck,
    BadgeCheck,
    RefreshCw,
} from 'lucide-react';
import styles from './UsynqBenefits.module.css';

/* ============================================================
 * uSYNQ Benefits / Trust Strip
 *
 * A horizontal band of customer-assurance points shown on both
 * uSYNQ pages (the brand page and the products page). The first
 * two points — "3 Years Warranty" and "Free Installation" — are
 * the headline promises; the rest reinforce trust at a glance.
 *
 * Kept as a data array so the JSX maps over it and the reveal can
 * be staggered without per-card motion config. Easing + viewport
 * settings mirror UsynqBrand.tsx so the whole brand feels cohesive.
 * ============================================================ */

const benefits = [
    {
        icon: <ShieldCheck size={24} strokeWidth={1.8} />,
        title: '3 Years Warranty',
        description: 'Every uSYNQ product is backed by a full 3-year manufacturer warranty.',
    },
    {
        icon: <Wrench size={24} strokeWidth={1.8} />,
        title: 'Free Installation',
        description: 'Professional installation by certified technicians, included at no extra cost.',
    },
    {
        icon: <Headset size={24} strokeWidth={1.8} />,
        title: 'Dedicated Support',
        description: 'Talk to real smart-home specialists before, during, and after your purchase.',
    },
    {
        icon: <Truck size={24} strokeWidth={1.8} />,
        title: 'Pan-India Delivery',
        description: 'Fast, tracked shipping to homes, villas, and project sites across the country.',
    },
    {
        icon: <BadgeCheck size={24} strokeWidth={1.8} />,
        title: 'Genuine & Certified',
        description: 'Authentic uSYNQ hardware, quality-checked and built to Indian standards.',
    },
    {
        icon: <RefreshCw size={24} strokeWidth={1.8} />,
        title: 'Easy Replacements',
        description: 'Hassle-free replacement support for spares, bezels, and accessories.',
    },
];

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

export default function UsynqBenefits() {
    return (
        <div className={styles.band}>
            <div className={styles.inner}>
                <motion.div
                    className={styles.grid}
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={REVEAL_VIEWPORT}
                >
                    {benefits.map((benefit) => (
                        <motion.div
                            key={benefit.title}
                            className={styles.item}
                            variants={staggerItem}
                        >
                            <div className={styles.icon}>{benefit.icon}</div>
                            <div className={styles.itemText}>
                                <h3 className={styles.itemTitle}>{benefit.title}</h3>
                                <p className={styles.itemDescription}>
                                    {benefit.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
