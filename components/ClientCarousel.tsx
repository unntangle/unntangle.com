'use client';

import { motion } from 'framer-motion';
import styles from './ClientCarousel.module.css';

// Using text fallbacks until actual logos are available
const alliances = [
    { name: 'Azure', label: 'Azure' },
    { name: 'ServiceNow', label: 'ServiceNow' },
    { name: 'Adobe', label: 'Adobe' },
    { name: 'Magento', label: 'Magento' },
    { name: 'Databricks', label: 'Databricks' },
    { name: 'Snowflake', label: 'Snowflake' },
    { name: 'HubSpot', label: 'HubSpot' },
];

const alliances2 = [
    { name: 'Stripe', label: 'Stripe' },
    { name: 'Cloudinary', label: 'Cloudinary' },
    { name: 'AWS Sagemaker', label: 'AWS Sagemaker' },
    { name: 'AWS Bedrock', label: 'AWS Bedrock' },
    { name: 'MuleSoft', label: 'MuleSoft' },
    { name: 'OneStream', label: 'OneStream' },
    { name: 'Oracle', label: 'Oracle' },
];

export default function ClientCarousel() {
    // Duplicate the array for seamless infinite looping
    const row1 = [...alliances, ...alliances, ...alliances];
    const row2 = [...alliances2, ...alliances2, ...alliances2];

    return (
        <section className={styles.carouselSection}>
            <div className={`container ${styles.container}`}>
                <h2 className={styles.title}>
                    Our Clients
                </h2>

                <div className={styles.carouselContainer}>
                    {/* First Row - Scrolls Left */}
                    <div className={styles.scrollWrapper}>
                        <motion.div
                            className={styles.scrollTrack}
                            animate={{ x: [0, -2000] }}
                            transition={{
                                repeat: Infinity,
                                ease: 'linear',
                                duration: 30, // Adjust for speed
                            }}
                        >
                            {row1.map((client, idx) => (
                                <div key={`row1-${idx}`} className={styles.card}>
                                    <div className={styles.logoPlaceholder}>
                                        {/* Replace this div with an actual <Image> or <svg> when ready */}
                                        <span className={styles.logoText}>{client.name}</span>
                                    </div>
                                    <span className={styles.label}>{client.label}</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Second Row - Scrolls Right (negative keyframes for standard right-to-left if desired, 
                        or reverse direction. Let's make it scroll slightly faster but same direction for now, 
                        or opposite direction. I'll do opposite for visual flair). */}
                    <div className={styles.scrollWrapper}>
                        <motion.div
                            className={styles.scrollTrack}
                            animate={{ x: [-2000, 0] }}
                            transition={{
                                repeat: Infinity,
                                ease: 'linear',
                                duration: 35, // Slightly different speed
                            }}
                        >
                            {row2.map((client, idx) => (
                                <div key={`row2-${idx}`} className={styles.card}>
                                    <div className={styles.logoPlaceholder}>
                                        <span className={styles.logoText}>{client.name}</span>
                                    </div>
                                    <span className={styles.label}>{client.label}</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
