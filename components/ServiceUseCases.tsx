'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { ServiceUseCase } from '@/data/services';
import styles from './ServiceUseCases.module.css';

interface Props {
    useCases: ServiceUseCase[];
}

/**
 * "Where We Apply It" section — light theme, bento-style grid.
 *
 * Design pattern: asymmetric bento layout (think Apple/Linear
 * marketing pages). Six tiles arranged across a 12-column grid
 * with varying spans so no two adjacent tiles share a footprint.
 * The first card is the "featured" tile — bigger, with a
 * tinted background — and subsequent tiles alternate between
 * standard, wide, and tall ratios.
 *
 * Why bento here: a uniform 3×2 grid would read as another
 * batch of cards. Bento breaks the visual rhythm, lets the
 * eye wander, and signals editorial curation rather than
 * spec-sheet output. On mobile we collapse to a single column.
 */
export default function ServiceUseCases({ useCases }: Props) {
    // Six tile size-classes that produce a recognizable bento
    // rhythm. If more or fewer than 6 use-cases are passed we
    // gracefully fall back by cycling through this pattern.
    const sizeClasses = [
        styles.tileFeatured, // 0: large featured
        styles.tileTall,     // 1: tall narrow
        styles.tileWide,     // 2: wide horizontal
        styles.tileStd,      // 3: standard
        styles.tileStd,      // 4: standard
        styles.tileWide,     // 5: wide horizontal (anchors the bottom)
    ];

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
                    <div className={styles.headerLeft}>
                        <span className={styles.eyebrow}>Where We Apply It</span>
                        <h2 className={styles.title}>
                            Built for the industries
                            <br />
                            <span className={styles.accent}>that move us forward.</span>
                        </h2>
                    </div>
                    <p className={styles.headerRight}>
                        We apply this practice across six recurring industry
                        contexts. The pattern fits any of them — the scope and
                        compliance bar are what flex.
                    </p>
                </motion.div>

                <div className={styles.bento}>
                    {useCases.map((uc, i) => {
                        const sizeClass = sizeClasses[i % sizeClasses.length];
                        const isFeatured = sizeClass === styles.tileFeatured;
                        return (
                            <motion.article
                                key={i}
                                className={`${styles.tile} ${sizeClass}`}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-40px' }}
                                transition={{
                                    duration: 0.55,
                                    delay: i * 0.07,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                            >
                                <div className={styles.tileTop}>
                                    <span className={styles.industryTag}>
                                        {uc.industry}
                                    </span>
                                    <ArrowUpRight
                                        size={isFeatured ? 22 : 18}
                                        className={styles.arrow}
                                        aria-hidden="true"
                                    />
                                </div>
                                <div className={styles.tileBody}>
                                    <h3 className={styles.tileTitle}>{uc.title}</h3>
                                    <p className={styles.tileDesc}>{uc.description}</p>
                                </div>
                            </motion.article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
