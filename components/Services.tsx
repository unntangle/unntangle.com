'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useMotionValueEvent, MotionValue } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import styles from './Services.module.css';

const expertiseGroups = [
    {
        id: 'tech',
        title: 'Technology Solutions',
        description: 'Building high-performance digital ecosystems, apps, and immersive 3D web experiences that drive growth and engagement.',
        services: ['Website Development', 'App Development', 'ERP Development', 'Website Revamp', 'Interactive 3D Website'],
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2000',
    },
    {
        id: 'design',
        title: 'Creative Design',
        description: 'Premium visual identity and spatial modeling. Elevating your brand through 2D graphics, cinematic 3D rendering, and AI-generated art.',
        services: ['2D Graphic Designing', '3D Designing', 'AI Image Rendition'],
        image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&q=80&w=2000',
    },
    {
        id: 'marketing',
        title: 'Growth Marketing',
        description: 'Aggressive growth engines. Cultivating community and capturing high-intent traffic through targeted SEO, Social Media, and Performance Ads.',
        services: ['Meta Ads', 'SMM', 'SEO', 'Google Ads'],
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2000',
    }
];

interface CardProps {
    group: typeof expertiseGroups[0];
    index: number;
    progress: MotionValue<number>;
}

const CARD_COUNT = expertiseGroups.length;

const Card = ({ group, index, progress }: CardProps) => {
    const isFirst = index === 0;

    // Equal scroll windows for the 3 non-first cards:
    // Card 0: always visible, y=0, opacity=1
    // Card 1: rises during 0.00 → 0.30
    // Card 2: rises during 0.35 → 0.65
    // Card 3: rises during 0.70 → 0.95
    // Each card gets exactly 0.25 of scroll, zero gaps
    // Card 4 finishes at 0.75 — well before section unpins
    const windows: [number, number][] = [
        [0, 0],          // Card 0: static
        [0.20, 0.45],    // Card 1: reveal
        [0.55, 0.80],    // Card 2: final reveal
    ];
    const [start, end] = windows[index];

    // Y: rises from below to its final stacked position
    const y = useTransform(
        progress,
        [start, end],
        [isFirst ? 0 : 400, 0],
        { clamp: true }
    );

    // Opacity: Card 0 is always visible.
    // Other cards are invisible until their window starts, then fade in quickly.
    // This prevents "peeking" before their reveal window.
    const opacity = useTransform(
        progress,
        isFirst
            ? [0, 0]
            : [start, start + 0.03],
        isFirst
            ? [1, 1]
            : [0, 1],
        { clamp: true }
    );

    // Scale: earlier cards scale down slightly to create depth
    const scaleTarget = 1 - (CARD_COUNT - 1 - index) * 0.03;
    const scale = useTransform(
        progress,
        [end, 1.0],
        [1, scaleTarget],
        { clamp: true }
    );

    // pointer-events: disabled while invisible so a higher-z but invisible card
    // doesn't swallow clicks meant for the visible card below it in the stack.
    // First card is always visible; others start hidden until their reveal window.
    const [interactive, setInteractive] = useState(isFirst);
    useMotionValueEvent(opacity, 'change', (v) => {
        setInteractive(v >= 0.5);
    });

    return (
        <div
            className={styles.cardWrapper}
            style={{
                zIndex: 10 + index,
                pointerEvents: interactive ? 'auto' : 'none',
            }}
        >
            <motion.div
                style={{ y, scale, opacity, transformOrigin: 'bottom center' }}
                className={styles.card}
            >
                <div className={styles.imageWrapper}>
                    <Image
                        src={group.image}
                        alt={group.title}
                        fill
                        className={styles.cardBg}
                        priority={index < 2}
                    />
                    <div className={styles.imageOverlay} />
                </div>

                <div className={styles.cardContent}>
                    <div className={styles.titleArea}>
                        <h3>{group.title}</h3>
                        <p>{group.description}</p>
                    </div>

                    <div className={styles.servicesGrid}>
                        {group.services.map((service, sIndex) => (
                            <div key={sIndex} className={styles.serviceItem}>
                                <div className={styles.dot} />
                                <span>{service}</span>
                            </div>
                        ))}
                    </div>

                    <Link href="/services" style={{ textDecoration: 'none' }}>
                        <button className={styles.exploreBtn}>
                            Explore Solutions <ArrowRight size={18} />
                        </button>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default function Services() {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    return (
        <section ref={containerRef} className={styles.services} id="services">
            <div className={styles.stickyStage}>
                <div className={styles.container}>
                    <div className={styles.header}>
                        <span className="tag">What We Do</span>
                        <h2>Engineered for Your Growth</h2>
                        <p>Three disciplines, working in sync to move your brand forward.</p>
                    </div>

                    <div className={styles.cardStack}>
                        {expertiseGroups.map((group, index) => (
                            <Card
                                key={group.id}
                                index={index}
                                group={group}
                                progress={scrollYProgress}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
