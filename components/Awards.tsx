'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Awards.module.css';

const awards = [
    { name: 'Top AI Company', year: '2024', provider: 'Clutch', image: 'https://images.unsplash.com/photo-1579389083046-e3df9c2b3325?q=80&w=200&auto=format&fit=crop' },
    { name: 'Excellence in Cloud', year: '2023', provider: 'Gartner', image: 'https://images.unsplash.com/photo-1523240715632-d984bb4ad150?q=80&w=200&auto=format&fit=crop' },
    { name: 'Innovation Award', year: '2024', provider: 'Webby', image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?q=80&w=200&auto=format&fit=crop' },
    { name: 'Fastest Growing Agency', year: '2023', provider: 'Deloitte', image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=200&auto=format&fit=crop' },
];

export default function Awards() {
    return (
        <section className={styles.awardsSection}>
            <div className={`container ${styles.container}`}>
                <div className={styles.header}>
                    <h2 className={styles.title}>
                        Recognized for Excellence, <span className={styles.accent}>Chosen for Impact</span>
                    </h2>
                    <div className={styles.controls}>
                        <button className={styles.navBtn}><ChevronLeft size={20} /></button>
                        <button className={styles.navBtn}><ChevronRight size={20} /></button>
                    </div>
                </div>

                <div className={styles.awardsGrid}>
                    {awards.map((award, i) => (
                        <motion.div
                            key={i}
                            className={styles.awardCard}
                            whileHover={{ y: -10 }}
                        >
                            <div className={styles.imageWrapper}>
                                <img src={award.image} alt={award.name} className={styles.awardLogo} />
                            </div>
                            <div className={styles.cardContent}>
                                <span className={styles.provider}>{award.provider}</span>
                                <h3 className={styles.awardName}>{award.name}</h3>
                                <span className={styles.year}>{award.year}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
