'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import styles from './ServicesHero.module.css';

interface Category {
    id: string;
    name: string;
}

interface ServicesHeroProps {
    activeCategoryId: string;
    onCategoryChange: (id: string) => void;
    categories: Category[];
}

export default function ServicesHero({ activeCategoryId, onCategoryChange, categories }: ServicesHeroProps) {
    const bottomNavRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end center"]
    });

    const tabsOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

    const scrollToTabs = () => {
        bottomNavRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <section className={styles.heroSection} ref={heroRef}>
            <div className={styles.heroMainContent}>
                {/* Background Wavy Pattern */}
                <div className={styles.bgWrapper}>
                    <svg className={styles.wavySvg} viewBox="0 0 1440 800" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="rgba(139, 92, 246, 0.1)" />
                                <stop offset="50%" stopColor="rgba(37, 99, 235, 0.05)" />
                                <stop offset="100%" stopColor="rgba(139, 92, 246, 0.1)" />
                            </linearGradient>
                        </defs>
                        <motion.path
                            animate={{
                                d: [
                                    "M0,400 Q360,300 720,400 T1440,400 V800 H0 Z",
                                    "M0,400 Q360,500 720,400 T1440,400 V800 H0 Z",
                                    "M0,400 Q360,300 720,400 T1440,400 V800 H0 Z"
                                ]
                            }}
                            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                            fill="url(#waveGradient)"
                        />
                    </svg>
                    <div className={styles.bgGlowLeft} />
                    <div className={styles.bgGlowRight} />
                </div>

                <div className={`container ${styles.container}`}>
                    <div className={styles.content}>
                        <motion.h1
                            className={styles.headline}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className={styles.textPurple}>Unnfold</span>
                            <span className={styles.separator}>|</span>
                            <span className={styles.textGold}>Unnleash</span>
                            <span className={styles.separator}>|</span>
                            <span className={styles.textBlue}>Unntangle</span>
                        </motion.h1>

                        <motion.p
                            className={styles.subheadline}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            We strip away technical friction to reveal hidden possibilities. Architecting the next generation of digital landscapes and intelligent environments.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <div onClick={scrollToTabs} className={styles.ctaLink} style={{ cursor: 'pointer' }}>
                                <span>with<br /><span className={styles.ctaServicesText}>OUR SERVICES</span></span>
                                <motion.div
                                    animate={{ y: [0, 8, 0] }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className={styles.arrowWrapper}
                                >
                                    <ChevronDown size={24} />
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

        </section>
    );
}
