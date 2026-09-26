'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './LegalPage.module.css';

/**
 * Reusable layout for legal/policy documents (/privacy, /terms).
 *
 * Styled to match the rest of the site:
 *   - Soft pastel gradient header card (unique colour per page, passed in
 *     via `heroBackground` from components/pastelPalette)
 *   - Sticky rounded "On this page" card with scroll-spy highlight
 *   - Each section in its own white card with a pastel numbered badge
 *
 * Content (sections, intro, last-updated date) is passed in from each
 * page route, so the policy text lives next to its page.tsx.
 */

export interface LegalSection {
    /** Stable slug used as the section's id and TOC link target. */
    id: string;
    /** Section heading rendered as h2. */
    heading: string;
    /** Body content as JSX (paragraphs, lists, etc.). */
    body: React.ReactNode;
}

interface LegalPageProps {
    eyebrow?: string;
    title: string;
    /** ISO-style date string for the "Last updated" pill. */
    lastUpdated: string;
    intro?: React.ReactNode;
    sections: LegalSection[];
    /** CSS background for the header card (a soft pastel gradient). */
    heroBackground?: string;
}

const badgeTones = ['#ffe4d9', '#e9e1ff', '#d9f4e6', '#fff3c9', '#ffe0ea', '#eef0f5'];

export default function LegalPage({
    eyebrow = 'Legal',
    title,
    lastUpdated,
    intro,
    sections,
    heroBackground,
}: LegalPageProps) {
    const [activeId, setActiveId] = useState<string | null>(sections[0]?.id ?? null);

    const formattedDate = (() => {
        const d = new Date(lastUpdated);
        if (Number.isNaN(d.getTime())) return lastUpdated;
        return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    })();

    // Scroll-spy: highlight the TOC entry for the section being read.
    useEffect(() => {
        if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                if (visible.length > 0) setActiveId(visible[0].target.id);
            },
            { rootMargin: '-20% 0% -60% 0%', threshold: 0 },
        );

        sections.forEach((s) => {
            const el = document.getElementById(s.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [sections]);

    return (
        <article className={styles.page}>
            {/* ---------- Header card ---------- */}
            <div className={styles.heroWrap}>
                <motion.header
                    className={styles.hero}
                    style={heroBackground ? { background: heroBackground } : undefined}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <span className={styles.eyebrow}>{eyebrow}</span>
                    <h1 className={styles.title}>{title}</h1>
                    <span className={styles.updated}>
                        Last updated <time dateTime={lastUpdated}>{formattedDate}</time>
                    </span>
                    {intro && <div className={styles.intro}>{intro}</div>}
                </motion.header>
            </div>

            {/* ---------- Body: TOC + section cards ---------- */}
            <div className={styles.container}>
                <div className={styles.body}>
                    <aside className={styles.toc} aria-label="Table of contents">
                        <span className={styles.tocLabel}>On this page</span>
                        <ol className={styles.tocList}>
                            {sections.map((s, i) => (
                                <li key={s.id}>
                                    <a
                                        href={`#${s.id}`}
                                        className={`${styles.tocLink} ${activeId === s.id ? styles.tocActive : ''}`}
                                    >
                                        <span className={styles.tocIndex}>{String(i + 1).padStart(2, '0')}</span>
                                        <span>{s.heading}</span>
                                    </a>
                                </li>
                            ))}
                        </ol>
                    </aside>

                    <div className={styles.content}>
                        {sections.map((s, i) => (
                            <motion.section
                                key={s.id}
                                id={s.id}
                                className={styles.section}
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.4 }}
                            >
                                <div className={styles.sectionHead}>
                                    <span
                                        className={styles.badge}
                                        style={{ background: badgeTones[i % badgeTones.length] }}
                                    >
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <h2 className={styles.sectionHeading}>{s.heading}</h2>
                                </div>
                                <div className={styles.sectionBody}>{s.body}</div>
                            </motion.section>
                        ))}
                    </div>
                </div>
            </div>
        </article>
    );
}
