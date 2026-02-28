'use client';

import { motion } from 'framer-motion';
import styles from './GlobalPresence.module.css';

const locations = [
    { country: 'India', city: 'Mumbai', address: 'B-605, 6th Floor, Marathon Futurex, Lower Parel, Mumbai, Maharashtra 400013', image: 'https://images.unsplash.com/photo-1570160897040-30430ef2015a?q=80&w=400&fit=crop' },
    { country: 'United Kingdom', city: 'London', address: '71-75 Shelton St, Covent Garden, London WC2H 9JQ, UK', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=400&fit=crop' },
    { country: 'USA', city: 'San Francisco', address: '445 Bush St Suite 100, San Francisco, CA 94108, USA', image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=400&fit=crop' },
    { country: 'Australia', city: 'Sydney', address: 'Level 17, 123 Pitt Street, Sydney NSW 2000, Australia', image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=400&fit=crop' },
    { country: 'United Arab Emirates', city: 'Dubai', address: 'Dubai Silicon Oasis, DDP, Building A2, Dubai, UAE', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=400&fit=crop' },
    { country: 'Canada', city: 'Toronto', address: '3080 Yonge Street, Suite 6060, Toronto, ON M4N 3N1', image: 'https://images.unsplash.com/photo-1503104834685-7205e8607eb9?q=80&w=400&fit=crop' },
];

export default function GlobalPresence() {
    return (
        <section className={styles.presenceSection}>
            <div className={`container ${styles.container}`}>
                <div className={styles.header}>
                    <h2 className={styles.title}>
                        Our Experts Are Around the Corner <br />
                        <span className={styles.accent}>and Around the World</span>
                    </h2>
                </div>

                <div className={styles.grid}>
                    {locations.map((loc, i) => (
                        <motion.div
                            key={i}
                            className={styles.card}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <div className={styles.cardContent}>
                                <div className={styles.textInfo}>
                                    <h3 className={styles.country}>{loc.country}</h3>
                                    <h4 className={styles.city}>{loc.city}</h4>
                                    <p className={styles.address}>{loc.address}</p>
                                </div>
                                <div className={styles.visual}>
                                    <img src={loc.image} alt={loc.city} className={styles.locationImg} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
