'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import styles from './FeaturedServices.module.css';

/**
 * Horizontal-scroll service showcase on /services.
 *
 * Three large cards, one per service category. As the user scrolls
 * vertically through the pinned section, the cards translate
 * horizontally — and the tab bar at the top reflects which
 * category is currently centered.
 *
 * Card content is intentionally concrete (real deliverables, real
 * service names) rather than generic agency-speak. Each card links
 * to the deepest most representative sub-service detail page so
 * the click-through has somewhere meaningful to land.
 *
 * Tab design: underline-style progress tabs with a sliding cyan
 * indicator that animates between tabs as scroll progresses.
 * Mirrors the "Linear / Vercel" header pattern — restrained,
 * editorial, and pairs visually with the scroll motion.
 */

interface ServiceStory {
    id: string;
    categoryId: string;
    tag: string;
    title: string;
    description: string;
    /** Bullet list of concrete deliverables shown above the title */
    deliverables: string[];
    image: string;
    /** Where the card CTA links to (a representative sub-service detail page) */
    path: string;
    /** Label for the inline CTA button at the bottom */
    cta: string;
}

const serviceStories: ServiceStory[] = [
    {
        id: '1',
        categoryId: 'ai',
        tag: 'AI Implementation & Deployment',
        title: 'AI agents that do real business work — not just answer questions.',
        description:
            'We identify repetitive workflows, build AI agents around them and deploy them into your ERP, CRM, email, WhatsApp and databases — analysing information, preparing work for approval and completing it once your team signs off.',
        deliverables: [
            'AI Workflow Assessment',
            'AI Agents & Automation',
            'AI & System Integration',
            'Human Approval & Controls',
            'Production Deployment',
            'Monitoring & Improvement',
        ],
        image:
            'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1600',
        path: '/services/ai-agents',
        cta: 'Explore AI implementation',
    },
    {
        id: '2',
        categoryId: 'web',
        tag: 'Websites & Apps',
        title: 'Websites and apps built for how your business works.',
        description:
            'Business websites, web apps, dealer and customer portals, and mobile apps for field and sales teams — fast, secure, and connected to your CRM and systems so they are ready for AI when you are.',
        deliverables: [
            'Website Development',
            'Website Revamp',
            'Web Apps & Portals',
            'Mobile Apps',
            'Interactive 3D',
            'UI/UX Design',
        ],
        image:
            'https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&q=80&w=1600',
        path: '/services/website',
        cta: 'Explore websites & apps',
    },
    {
        id: '3',
        categoryId: 'software',
        tag: 'Custom Software & ERP',
        title: 'Custom software that fits your operations.',
        description:
            'When off-the-shelf tools don’t fit, we build ERP, workflow and approval systems, internal dashboards and integrations around your processes — structured so AI can be added on top later.',
        deliverables: [
            'Custom ERP',
            'Workflow & Approval Systems',
            'Internal Dashboards',
            'API Integrations',
            'Data Migration',
            'Cloud Deployment',
        ],
        image:
            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600',
        path: '/services/erp',
        cta: 'Explore custom software',
    },
];

interface Category {
    id: string;
    name: string;
}

interface FeaturedServicesProps {
    activeCategoryId: string;
    onCategoryChange: (id: string) => void;
    categories: Category[];
}

/* Individual card with center-aware scale + opacity transforms.
   Off-center cards shrink and fade slightly so the focused card
   pops, creating a "focus stop" pacing as the track translates. */
const ServiceCard = ({
    story,
    index,
    totalCards,
    scrollYProgress,
}: {
    story: ServiceStory;
    index: number;
    totalCards: number;
    scrollYProgress: MotionValue<number>;
}) => {
    const centerPoint = index / (totalCards - 1);
    const windowSize = 1 / (totalCards - 1);

    const scale = useTransform(
        scrollYProgress,
        [centerPoint - windowSize, centerPoint, centerPoint + windowSize],
        [0.88, 1, 0.88]
    );

    const contentOpacity = useTransform(
        scrollYProgress,
        [centerPoint - windowSize, centerPoint, centerPoint + windowSize],
        [0.3, 1, 0.3]
    );

    return (
        <div className={styles.cardContainer}>
            <motion.div style={{ scale }} className={styles.cardWrapper}>
                <div className={styles.card}>
                    <div className={styles.imageWrapper}>
                        <img src={story.image} alt={story.title} className={styles.image} />
                        <div className={styles.overlay} />
                    </div>

                    <motion.div style={{ opacity: contentOpacity }} className={styles.topContent}>
                        <span className={styles.tag}>{story.tag}</span>

                        <ul className={styles.deliverables}>
                            {story.deliverables.map((item) => (
                                <li key={item} className={styles.deliverable}>
                                    <span className={styles.deliverableDot} aria-hidden="true" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div style={{ opacity: contentOpacity }} className={styles.bottomContent}>
                        <h3 className={styles.title}>{story.title}</h3>
                        <p className={styles.description}>{story.description}</p>
                        <Link href={story.path} className={styles.viewButton}>
                            <span>{story.cta}</span>
                            <ArrowRight size={18} />
                        </Link>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default function FeaturedServices({
    activeCategoryId,
    onCategoryChange,
    categories,
}: FeaturedServicesProps) {
    const targetRef = useRef<HTMLDivElement>(null);
    const tabsRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ['start start', 'end end'],
    });

    /* Vertical scroll → horizontal track translation.
       Track padding-left is 10vw, card width is 80vw, gap is 5vw,
       so to center card[2] we translate -2 * (80 + 5) = -170vw. */
    const x = useTransform(scrollYProgress, [0, 1], ['0vw', '-170vw']);

    /* Sync the active tab with scroll position so the underline
       slides as the user scrolls, not just on click. */
    useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (latest) => {
            // Map scroll progress to the category at the same index.
            // (Previously compared against 'tech' / 'design' / 'marketing',
            // which no longer match the category ids, so the tab never moved.)
            const idx = Math.min(
                categories.length - 1,
                Math.floor(latest * categories.length)
            );
            const id = categories[idx]?.id;
            if (id && id !== activeCategoryId) onCategoryChange(id);
        });
        return () => unsubscribe();
    }, [scrollYProgress, activeCategoryId, onCategoryChange, categories]);

    return (
        <section ref={targetRef} className={styles.scrollSection}>
            <div className={styles.stickyWrapper}>
                {/* ============================================================
                    TAB BAR — underline-style progress tabs.
                    The sliding cyan indicator under the active tab is
                    positioned via inline styles using the active index, so
                    it animates smoothly between tabs without JS measurement.
                ============================================================ */}
                <div className={styles.tabsStickyContainer}>
                    <div ref={tabsRef} className={styles.tabsBar}>
                        <div className={styles.tabsTrack}>
                            {categories.map((cat) => {
                                const isActive = activeCategoryId === cat.id;
                                return (
                                    <button
                                        key={cat.id}
                                        type="button"
                                        className={`${styles.tab} ${isActive ? styles.tabActive : ''}`}
                                        onClick={() => {
                                            const idx = categories.findIndex((c) => c.id === cat.id);
                                            const targetProgress = idx / (categories.length - 1);
                                            const scrollableDistance =
                                                (targetRef.current?.offsetHeight || 0) - window.innerHeight;
                                            const scrollTarget =
                                                (targetRef.current?.offsetTop || 0) +
                                                scrollableDistance * targetProgress;
                                            window.scrollTo({ top: scrollTarget, behavior: 'smooth' });
                                        }}
                                    >
                                        <span className={styles.tabIndex}>
                                            0{categories.findIndex((c) => c.id === cat.id) + 1}
                                        </span>
                                        <span className={styles.tabLabel}>{cat.name}</span>
                                    </button>
                                );
                            })}

                            {/* Sliding underline indicator — width and translateX
                                are computed from the active index. With 3 tabs of
                                equal width, each tab is 1/3 of the track. */}
                            <span
                                className={styles.tabIndicator}
                                style={{
                                    width: `${100 / categories.length}%`,
                                    transform: `translateX(${
                                        categories.findIndex((c) => c.id === activeCategoryId) * 100
                                    }%)`,
                                }}
                                aria-hidden="true"
                            />
                        </div>
                    </div>
                </div>

                <motion.div style={{ x }} className={styles.horizontalTrack}>
                    {serviceStories.map((story, index) => (
                        <ServiceCard
                            key={story.id}
                            story={story}
                            index={index}
                            totalCards={serviceStories.length}
                            scrollYProgress={scrollYProgress}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
