'use client';

import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import styles from './VideoTestimonials.module.css';

const testimonials = [
    { name: 'Sarah Jenkins', role: 'CTO, Global Tech', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=400&fit=crop' },
    { name: 'Michael Chen', role: 'Head of AI, Innovate Inc', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&fit=crop' },
    { name: 'David Rodriguez', role: 'Director, Streamline', image: 'https://images.unsplash.com/photo-1519085116746-3b3d68de44b3?q=80&w=400&fit=crop' },
    { name: 'Elena Petrova', role: 'CEO, Nexus Solutions', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&fit=crop' },
];

export default function VideoTestimonials() {
    return (
        <section className={styles.testimonialsSection}>
            <div className={`container ${styles.container}`}>
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className={styles.title}>
                        We're helping global leaders <br />
                        <span className={styles.accent}>with Digital Engineering</span>
                    </h2>
                </motion.div>

                <div className={styles.grid}>
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            className={styles.card}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <div className={styles.videoThumbnail}>
                                <img src={t.image} alt={t.name} className={styles.bgImage} />
                                <div className={styles.overlay}>
                                    <button className={styles.playBtn}>
                                        <Play size={24} fill="currentColor" />
                                    </button>
                                </div>
                            </div>
                            <div className={styles.info}>
                                <h4 className={styles.name}>{t.name}</h4>
                                <p className={styles.role}>{t.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className={styles.footer}>
                    <button className={styles.moreBtn}>Explore Full Case Studies</button>
                </div>
            </div>
        </section>
    );
}
