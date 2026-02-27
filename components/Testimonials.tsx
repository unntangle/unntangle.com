'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import styles from './Testimonials.module.css';

const testimonials = [
    {
        quote: "Unntangle transformed our digital presence within weeks. Their AI solutions are not just innovative; they're truly transformative for our daily operations.",
        author: "Sarah Chen",
        role: "CEO, NexaCorp",
        company: "Digital Transformation"
    },
    {
        quote: "The smart home integration was flawless. We now have a completely autonomous living space that feels like it's from the future. Highly recommended!",
        author: "Marcus Thorne",
        role: "Estate Manager",
        company: "Luxury Living Ltd"
    },
    {
        quote: "Scale and security were our primary concerns for the cloud migration. Unntangle delivered a solution that was robust, scalable, and ahead of schedule.",
        author: "Elena Rodriguez",
        role: "CTO, CloudFront",
        company: "Enterprise Cloud"
    }
];

export default function Testimonials() {
    return (
        <section className={styles.testimonials}>
            <div className={`container ${styles.container}`}>
                <div className={styles.header}>
                    <span className="tag">Client Voices</span>
                    <h2>Trust our clients</h2>
                    <p>Hear from the visionaries and leaders who we've partnered with to shape the digital and physical landscape.</p>
                </div>

                <div className={styles.grid}>
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            className={styles.card}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.15 }}
                        >
                            <div className={styles.quoteIcon}>
                                <Quote fill="var(--primary)" color="var(--primary)" size={32} />
                            </div>
                            <p className={styles.quoteText}>{t.quote}</p>
                            <div className={styles.footer}>
                                <div className={styles.authorInfo}>
                                    <div className={styles.name}>{t.author}</div>
                                    <div className={styles.role}>{t.role} — {t.company}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
