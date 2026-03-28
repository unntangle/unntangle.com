'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowDown } from 'lucide-react';
import styles from './ServiceDetailHero.module.css';
import { ServiceData } from '@/data/services';

interface Props {
    service: ServiceData;
}

export default function ServiceDetailHero({ service }: Props) {
    const scrollToContent = () => {
        const contentSection = document.getElementById('service-content');
        if (contentSection) {
            contentSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className={styles.heroSection}>
            <div className={styles.bgWrapper}>
                <Image 
                    src={service.heroImage} 
                    alt={service.title} 
                    fill 
                    priority
                    className={styles.heroImage}
                />
                <div className={styles.overlay} />
                <div className={styles.gradientGlow} />
            </div>

            <div className={styles.container}>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className={styles.categoryBadge}>{service.categoryLabel}</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className={styles.title}
                >
                    {service.title}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className={styles.description}
                >
                    {service.shortDescription}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className={styles.scrollDown}
                    onClick={scrollToContent}
                >
                    <span>Discover More</span>
                    <motion.div
                        animate={{ y: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                        className={styles.iconWrapper}
                    >
                        <ArrowDown size={18} />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
