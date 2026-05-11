'use client';

import { motion } from 'framer-motion';
import { ServiceStat } from '@/data/services';
import styles from './ServiceStats.module.css';

interface Props {
    stats: ServiceStat[];
}

/**
 * Outcomes section — light theme, editorial inline layout.
 *
 * Design pattern: deliberately NOT a card grid. The stats sit
 * inline as oversized numbers within a prose-like flow, with a
 * stacked label/description beneath each one. Imagine an
 * annual-report spread: the numbers dominate, the supporting
 * copy supports.
 *
 * Numbers use the editorial gradient treatment from the rest
 * of the page (blue → violet) but in a much larger size, and
 * each stat block is connected by a thin top hairline rather
 * than enclosed in a box. The combined effect is "newspaper
 * editorial" rather than "marketing dashboard".
 */
export default function ServiceStats({ stats }: Props) {
    return (
        <section className={styles.section}>
            <div className={`container ${styles.container}`}>
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className={styles.eyebrow}>Outcomes That Matter</span>
                    <h2 className={styles.title}>
                        Benchmarks we hold ourselves to <span className={styles.titleAccent}>—</span>{' '}
                        <em className={styles.italic}>not aspirations.</em>
                    </h2>
                </motion.div>

                <div className={styles.editorialRow}>
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            className={styles.statBlock}
                            initial={{ opacity: 0, y: 32 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{
                                duration: 0.7,
                                delay: i * 0.1,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                        >
                            <div className={styles.statIndex}>
                                <span className={styles.indexNum}>
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <span className={styles.indexBar} />
                            </div>

                            <div className={styles.statValueWrap}>
                                <span className={styles.statValue}>
                                    {stat.value}
                                </span>
                            </div>

                            <div className={styles.statCopy}>
                                <h3 className={styles.statLabel}>{stat.label}</h3>
                                <p className={styles.statDescription}>
                                    {stat.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
