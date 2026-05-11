'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ServiceTechItem } from '@/data/services';
import styles from './ServiceStack.module.css';

interface Props {
    serviceTitle: string;
    techStack: ServiceTechItem[];
}

/**
 * Service-specific tech stack — light theme, marquee-band layout.
 *
 * Design pattern: a single horizontal flowing row of tool
 * pills, NOT a grid. The tools scroll past in a continuous
 * loop (CSS animation), and a left-aligned title block on
 * the upper band gives context. Sits against a deep navy
 * gradient band that breaks the visual rhythm — every other
 * section is white-ish; this one feels like a confident
 * sign-off slate.
 *
 * Pills duplicate to fill a wider track than viewport so
 * the marquee loops seamlessly. Hovering pauses the scroll
 * so the visitor can read tool names.
 *
 * Logos use Simple Icons CDN with lettermark fallback for
 * tools without entries — same pattern as the index page's
 * ServiceTechStack component.
 */
export default function ServiceStack({ serviceTitle, techStack }: Props) {
    const [failedSet, setFailedSet] = useState<Set<number>>(new Set());

    const markFailed = (idx: number) => {
        setFailedSet((prev) => {
            if (prev.has(idx)) return prev;
            const next = new Set(prev);
            next.add(idx);
            return next;
        });
    };

    // Duplicate the stack three times so the marquee track is
    // always wider than the viewport — keyframes translate by
    // -33.33% to loop seamlessly.
    const trackItems = [...techStack, ...techStack, ...techStack];

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
                    <div className={styles.headerCopy}>
                        <span className={styles.eyebrow}>Technology Stack</span>
                        <h2 className={styles.title}>
                            The toolkit behind <br />
                            <span className={styles.accent}>
                                your {serviceTitle.toLowerCase()}.
                            </span>
                        </h2>
                    </div>
                    <div className={styles.headerMeta}>
                        <div className={styles.metaItem}>
                            <span className={styles.metaNum}>
                                {String(techStack.length).padStart(2, '0')}
                            </span>
                            <span className={styles.metaLabel}>
                                Core technologies
                            </span>
                        </div>
                        <div className={styles.metaDivider} />
                        <p className={styles.metaCopy}>
                            Battle-tested tools — picked for performance, longevity,
                            and ergonomics. No experimental stacks shipped to production.
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Full-bleed marquee — sits outside the container so
                pills can scroll edge-to-edge */}
            <div className={styles.marqueeWrap}>
                <div className={styles.marqueeFade} aria-hidden="true" />
                <div className={styles.marquee}>
                    <div className={styles.track}>
                        {trackItems.map((tool, i) => {
                            // For the duplicate sets we still need a stable
                            // unique key, so index combined with name works.
                            const realIdx = i % techStack.length;
                            const useLettermark =
                                !tool.slug || failedSet.has(realIdx);
                            return (
                                <div
                                    key={`${tool.name}-${i}`}
                                    className={styles.pill}
                                >
                                    <div className={styles.pillIcon}>
                                        {useLettermark ? (
                                            <span
                                                className={styles.iconFallback}
                                                aria-hidden="true"
                                            >
                                                {tool.name.charAt(0)}
                                            </span>
                                        ) : (
                                            <img
                                                src={`https://unpkg.com/simple-icons@latest/icons/${tool.slug}.svg`}
                                                alt=""
                                                className={styles.icon}
                                                width={24}
                                                height={24}
                                                onError={() => markFailed(realIdx)}
                                            />
                                        )}
                                    </div>
                                    <div className={styles.pillText}>
                                        <span className={styles.toolName}>
                                            {tool.name}
                                        </span>
                                        {tool.category && (
                                            <span className={styles.toolCategory}>
                                                {tool.category}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
