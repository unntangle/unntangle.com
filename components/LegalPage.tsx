'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './LegalPage.module.css';

/**
 * Reusable layout for legal/policy documents.
 *
 * Used by /privacy, /terms, and /cookie-preferences. All three
 * share the same structural needs:
 *   - A clean page header (title + last-updated stamp + intro lede)
 *   - A sticky left-rail table of contents (desktop)
 *   - A right-side prose column with section headings + body copy
 *   - Long enough for a "Back to top" affordance to feel useful
 *
 * The component is purely presentational. Content (sections,
 * intro copy, last-updated date) is passed in as props from each
 * page route, so the actual policy text lives next to its
 * page.tsx — easy to find and edit, no central content file.
 *
 * The TOC scroll-spy uses IntersectionObserver to highlight the
 * currently-visible section in the sidebar. Falls back to no
 * highlight on browsers without IO support (very old, rare).
 */

export interface LegalSection {
    /** Stable slug used as the section's id and TOC link target. */
    id: string;
    /** Section heading rendered as h2. */
    heading: string;
    /** Body content. Pass JSX so each page can mix paragraphs,
     *  lists, tables, etc. without escaping markdown. */
    body: React.ReactNode;
}

interface LegalPageProps {
    /** Eyebrow tag rendered above the title (e.g. "LEGAL"). */
    eyebrow?: string;
    /** Page title — main h1. */
    title: string;
    /** ISO-style date string for "Last updated:" stamp.
     *  Display formatting is handled inside the component. */
    lastUpdated: string;
    /** Intro paragraph(s) shown above the section list. JSX so
     *  multi-paragraph or styled intros are easy to author. */
    intro?: React.ReactNode;
    /** Ordered list of sections rendered in the right column.
     *  Section ids should be stable kebab-case strings — they
     *  appear in the TOC anchor links and the URL hash. */
    sections: LegalSection[];
}

export default function LegalPage({
    eyebrow = 'Legal',
    title,
    lastUpdated,
    intro,
    sections,
}: LegalPageProps) {
    const [activeId, setActiveId] = useState<string | null>(null);

    // Format the lastUpdated string. Component takes ISO-ish input
    // and renders it in a human-friendly form so individual page
    // files don't have to think about formatting.
    const formattedDate = (() => {
        try {
            const d = new Date(lastUpdated);
            if (Number.isNaN(d.getTime())) return lastUpdated;
            return d.toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            });
        } catch {
            return lastUpdated;
        }
    })();

    // Scroll-spy: highlight the TOC entry whose section is
    // currently in view. Threshold ~40% from top so the
    // currently-reading section, not the just-entered one,
    // stays highlighted while the user scrolls.
    useEffect(() => {
        if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                // Find the entry closest to the trigger line that's
                // currently intersecting. Sort by distance to top
                // so when multiple sections are visible we pick the
                // topmost one as "active".
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort(
                        (a, b) =>
                            a.boundingClientRect.top - b.boundingClientRect.top
                    );
                if (visible.length > 0) {
                    setActiveId(visible[0].target.id);
                }
            },
            {
                // Trigger when the section's top edge crosses into
                // the upper third of the viewport. Negative bottom
                // margin shrinks the "intersection zone" so only one
                // section reads as active at a time.
                rootMargin: '-20% 0% -60% 0%',
                threshold: 0,
            }
        );

        sections.forEach((section) => {
            const el = document.getElementById(section.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [sections]);

    return (
        <article className={styles.page}>
            <div className={styles.container}>
                {/* ============================================================
                    HEADER
                ============================================================ */}
                <motion.header
                    className={styles.header}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <span className={styles.eyebrow}>{eyebrow}</span>
                    <h1 className={styles.title}>{title}</h1>
                    <p className={styles.updated}>
                        Last updated:{' '}
                        <time dateTime={lastUpdated}>{formattedDate}</time>
                    </p>
                    {intro && <div className={styles.intro}>{intro}</div>}
                </motion.header>

                {/* ============================================================
                    BODY — TOC sidebar + sections
                ============================================================ */}
                <div className={styles.body}>
                    <aside className={styles.toc} aria-label="Table of contents">
                        <span className={styles.tocLabel}>On this page</span>
                        <ol className={styles.tocList}>
                            {sections.map((section, i) => (
                                <li
                                    key={section.id}
                                    className={`${styles.tocItem} ${
                                        activeId === section.id
                                            ? styles.tocItemActive
                                            : ''
                                    }`}
                                >
                                    <a
                                        href={`#${section.id}`}
                                        className={styles.tocLink}
                                    >
                                        <span className={styles.tocIndex}>
                                            {String(i + 1).padStart(2, '0')}
                                        </span>
                                        <span className={styles.tocText}>
                                            {section.heading}
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ol>
                    </aside>

                    <div className={styles.content}>
                        {sections.map((section, i) => (
                            <motion.section
                                key={section.id}
                                id={section.id}
                                className={styles.section}
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-80px' }}
                                transition={{ duration: 0.4 }}
                            >
                                <h2 className={styles.sectionHeading}>
                                    <span className={styles.sectionIndex}>
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    {section.heading}
                                </h2>
                                <div className={styles.sectionBody}>
                                    {section.body}
                                </div>
                            </motion.section>
                        ))}
                    </div>
                </div>
            </div>
        </article>
    );
}
