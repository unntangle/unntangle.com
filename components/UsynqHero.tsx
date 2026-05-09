'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import UsynqContactModal from './UsynqContactModal';
import styles from './UsynqHero.module.css';

const specStamps = [
    'ZigBee 3.0',
    'WiFi',
    'Biometric',
    'Face Recognition',
    'Retrofit',
];

export default function UsynqHero() {
    const [contactModalOpen, setContactModalOpen] = useState(false);

    return (
        <div className={styles.hero}>
            {/* Ambient backdrop */}
            <div className={styles.heroGlow} />
            <div className={styles.heroGlowSecondary} />
            <div className={styles.heroGrid} />

            <div className={styles.heroInner}>
                {/* Eyebrow */}
                <motion.div
                    className={styles.eyebrow}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className={styles.eyebrowDot}></span>
                    Smart Living by <span className={styles.brandName}>uSYNQ</span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    className={styles.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                >
                    The future of <span className={styles.titleAccent}>integrated</span>
                    {' '}home <span className={styles.titleAccent}>automation</span>.
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    className={styles.subtitle}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                >
                    Premium ZigBee switch panels, touch switches, retrofit modules, and
                    biometric smart locks, engineered as one deterministic ecosystem.
                </motion.p>

                {/* Spec Stamps */}
                <motion.div
                    className={styles.specStamps}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                >
                    {specStamps.map((stamp) => (
                        <span key={stamp} className={styles.specStamp}>
                            <span className={styles.specStampDot}></span>
                            {stamp}
                        </span>
                    ))}
                </motion.div>

                {/* CTAs */}
                <motion.div
                    className={styles.actions}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                >
                    <Link href="/shop/usynq" className={styles.ctaPrimary}>
                        Explore
                        <ArrowRight size={18} />
                    </Link>
                    <button
                        type="button"
                        className={styles.ctaSecondary}
                        onClick={() => setContactModalOpen(true)}
                    >
                        Talk to our team
                    </button>
                </motion.div>
            </div>

            {/* Contact form modal — shared across the brand and shop pages */}
            <UsynqContactModal
                isOpen={contactModalOpen}
                onClose={() => setContactModalOpen(false)}
            />
        </div>
    );
}
