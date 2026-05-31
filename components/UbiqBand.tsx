'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import styles from './UbiqBand.module.css';

/* ============================================================
 * uBIQ brand band.
 *
 * A self-contained full-width feature band for the uBIQ smart
 * home automation brand, reused on the home page and the about
 * page "Our Products" sections. CSS-only visual (no image asset
 * required) — a dark gradient panel with a glow and the oversized
 * wordmark — so it drops in anywhere without new image files.
 * ============================================================ */

const highlights = ['Lighting', 'Climate', 'Home Theatre', 'Security'];

export default function UbiqBand() {
    return (
        <motion.div
            className={styles.band}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
        >
            <Link href="/ubiq" className={styles.link}>
                <div className={styles.content}>
                    <span className={styles.eyebrow}>Smart Home Automation</span>

                    <Image
                        src="/uBIQ/uBIQ-logo.svg"
                        alt="uBIQ"
                        width={932}
                        height={306}
                        unoptimized
                        className={styles.logoImg}
                    />

                    <p className={styles.description}>
                        Luxury home automation — lighting, climate, shades, home theatre,
                        audio and security — designed, installed and supported as one
                        seamless system, built on leading platforms.
                    </p>

                    <div className={styles.highlights}>
                        {highlights.map((item) => (
                            <span key={item} className={styles.highlight}>
                                {item}
                            </span>
                        ))}
                    </div>

                    <span className={styles.cta}>
                        Explore uBIQ <ArrowRight size={18} />
                    </span>
                </div>

                <div className={styles.visual} aria-hidden="true">
                    <span className={styles.visualBadge}>New</span>
                    <div className={styles.visualGlow} />
                    <div className={styles.visualGrid} />
                    <Image
                        src="/uBIQ/uBIQ-logo.svg"
                        alt=""
                        width={932}
                        height={306}
                        unoptimized
                        className={styles.visualMark}
                    />
                </div>
            </Link>
        </motion.div>
    );
}
