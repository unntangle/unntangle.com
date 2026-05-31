'use client';

import { motion } from 'framer-motion';
import styles from './UbiqAbout.module.css';

/* ============================================================
 * uBIQ — "What is uBIQ?"
 *
 * Frames uBIQ as Unntangle's dedicated smart-space automation
 * vertical — borrowing the parent's credibility while staking out
 * a focused premium specialism. Dark premium theme.
 * ============================================================ */

export default function UbiqAbout() {
    return (
        <section id="about" className={styles.section}>
            <div className={styles.inner}>
                <motion.div
                    className={styles.block}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px 0px' }}
                    transition={{ duration: 0.6 }}
                >
                    <span className={styles.endorse}>
                        <span className={styles.endorseDot} aria-hidden="true" />
                        A brand by Unntangle
                    </span>

                    <h2 className={styles.title}>
                        Unntangle&apos;s dedicated{' '}
                        <span className={styles.accent}>smart-space automation</span> vertical
                    </h2>

                    <p className={styles.body}>
                        uBIQ is the automation arm of Unntangle — the technology company
                        building immersive and intelligent experiences since 2023. Where
                        Unntangle engineers digital products, 3D and immersive experiences,
                        uBIQ brings that same technology-first rigour into physical space:
                        designing, integrating and supporting automation for homes,
                        workplaces and commercial environments.
                    </p>
                    <p className={styles.body}>
                        One team, one standard — from the screen to the room. You get a
                        specialist automation partner with the backing, process and
                        accountability of an established innovation company.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
