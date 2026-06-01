'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={`container ${styles.container}`}>
                <div className={styles.content}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="tag"
                    >
                        Your Growth Partner
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Design, Development <br /> & Smart Living <br /> Solutions
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        At Unntangle, we bridge the gap between digital excellence and intelligent living. From high-end web and app development to state-of-the-art smart home automation and sustainable energy, we provide comprehensive solutions that elevate your business and lifestyle.
                    </motion.p>

                    <motion.div
                        className={styles.actions}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <button className="btn btn-primary">Get in touch</button>
                        <button className="btn btn-outline">Book a call</button>
                    </motion.div>
                </div>

                <motion.div
                    className={styles.imageWrapper}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    <Image
                        src="/images/hero.png"
                        alt="Nova Office"
                        width={600}
                        height={700}
                        priority
                        className={styles.heroImage}
                    />
                </motion.div>
            </div>
        </section>
    );
}
