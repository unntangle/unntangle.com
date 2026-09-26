'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import styles from './GroupedServices.module.css';

/**
 * About-page "Our Services" tabbed showcase.
 *
 * Mirrors the actual three-pillar service structure from
 * data/services.ts:
 *   - tech       → Technology Solutions (5 sub-services)
 *   - design     → Creative Design (3 sub-services)
 *   - marketing  → Growth Marketing (4 sub-services)
 *
 * Each tab surfaces:
 *   - The pillar's category label and tagline
 *   - The full list of sub-services within that pillar
 *   - A hero image representative of the pillar
 *   - A "Know more" CTA to the relevant landing service detail page
 *
 * Previous version mismatched Unntangle Technologies's actual services
 * (Sovereign Cloud, Property Solutions, Autonomous AI Agents, etc.
 * were aspirational categories that don't exist in services.ts).
 * This component now stays in sync with the source-of-truth data.
 */

interface PillarTab {
    id: string;
    label: string;
    tag: string;
    title: string;
    description: string;
    /** Sub-service names — must match titles in data/services.ts */
    services: string[];
    /** Hero image used in the right-hand column */
    image: string;
    /** Where the "Know more" CTA lands (a representative sub-service page) */
    ctaHref: string;
}

const pillars: PillarTab[] = [
    {
        id: 'ai',
        label: 'AI Implementation',
        tag: 'AI Implementation & Deployment',
        title: 'AI that works inside your business.',
        description:
            'We identify repetitive workflows, build AI agents and automation around them, connect them to your ERP, CRM, email and documents, and deploy them into production with human approval where it matters.',
        services: [
            'AI Workflow Assessment',
            'AI Agents & Workflow Automation',
            'AI & System Integration',
        ],
        image:
            'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1600',
        ctaHref: '/services/ai-workflow-assessment',
    },
    {
        id: 'tech',
        label: 'Software Engineering',
        tag: 'Websites, Apps & Custom Software',
        title: 'Websites, apps and systems your business runs on.',
        description:
            'Business websites and revamps, mobile and web apps, custom ERP and workflow systems, and interactive 3D experiences — connected to your existing tools and ready for AI when you are.',
        services: [
            'Website Development',
            'Website Revamp',
            'App Development',
            'Custom Software & ERP Development',
            'Interactive 3D Website',
        ],
        image:
            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1600',
        ctaHref: '/services/website',
    },
    {
        id: 'design',
        label: 'Creative Design',
        tag: 'Visual Identity',
        title: 'Brand and product visuals for the work we build.',
        description:
            '2D brand identity, 3D product renders and AI-assisted imagery — usually delivered alongside a website, app or product launch.',
        services: ['2D Graphic Designing', '3D Designing', 'AI Image Rendition'],
        image:
            'https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&q=80&w=1600',
        ctaHref: '/services/graphic-designing',
    },
];

export default function GroupedServices() {
    const [activeId, setActiveId] = useState<string>(pillars[0].id);
    const active = pillars.find((p) => p.id === activeId) ?? pillars[0];

    return (
        <section className={styles.servicesSection}>
            <div className={`container ${styles.container}`}>
                <div className={styles.header}>
                    <span className="tag">Our Services</span>
                    <h2 className={styles.title}>What we actually do</h2>
                    <p className={styles.description}>
                        AI implementation first, backed by the websites, apps and
                        custom software we have always built — all from one accountable team.
                    </p>
                </div>

                <div className={styles.tabContainer}>
                    {/* Underline-style tab bar — same visual language as
                        FeaturedServices on /services for consistency. */}
                    <div className={styles.tabBar}>
                        <div className={styles.tabsTrack}>
                            {pillars.map((pillar, idx) => {
                                const isActive = pillar.id === activeId;
                                return (
                                    <button
                                        key={pillar.id}
                                        type="button"
                                        className={`${styles.tabButton} ${
                                            isActive ? styles.active : ''
                                        }`}
                                        onClick={() => setActiveId(pillar.id)}
                                    >
                                        <span className={styles.tabIndex}>
                                            0{idx + 1}
                                        </span>
                                        <span className={styles.tabLabel}>{pillar.label}</span>
                                    </button>
                                );
                            })}

                            {/* Sliding cyan indicator */}
                            <span
                                className={styles.tabIndicator}
                                style={{
                                    width: `${100 / pillars.length}%`,
                                    transform: `translateX(${
                                        pillars.findIndex((p) => p.id === activeId) * 100
                                    }%)`,
                                }}
                                aria-hidden="true"
                            />
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={active.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            className={styles.tabContent}
                        >
                            <div className={styles.detailsColumn}>
                                <span className={styles.contentTag}>{active.tag}</span>
                                <h3 className={styles.contentTitle}>{active.title}</h3>
                                <p className={styles.contentDescription}>{active.description}</p>

                                <div className={styles.servicesList}>
                                    <span className={styles.servicesLabel}>
                                        Services in this pillar
                                    </span>
                                    <ul className={styles.servicesGrid}>
                                        {active.services.map((service) => (
                                            <li key={service} className={styles.serviceItem}>
                                                <span
                                                    className={styles.serviceDot}
                                                    aria-hidden="true"
                                                />
                                                {service}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <Link href={active.ctaHref} className={styles.knowMoreButton}>
                                    <span>Explore {active.label.toLowerCase()}</span>
                                    <ArrowRight size={18} />
                                </Link>
                            </div>

                            <div className={styles.visualColumn}>
                                <div className={styles.imageWrapper}>
                                    <img
                                        src={active.image}
                                        alt={active.label}
                                        className={styles.mainImage}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
