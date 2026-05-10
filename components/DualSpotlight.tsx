'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Home } from 'lucide-react';
import styles from './DualSpotlight.module.css';

/**
 * About-page dual spotlight — two side-by-side feature cards
 * highlighting two strategic bets the company is making:
 *
 *   1. AI Revolution  → uVOIZ + uSCRIBR + AI Image Rendition service
 *   2. Smart Living   → uSYNQ hardware sub-brand
 *
 * Mirrors Appinventiv's "Pioneer the AI Revolution" /
 * "Amplify Your Market Presence" twin spotlights, but anchored to
 * Unntangle's actual product portfolio. Each card is a clickable
 * tile linking to the relevant product or section.
 */

interface SpotlightCard {
    eyebrow: string;
    title: React.ReactNode;
    description: string;
    icon: React.ReactNode;
    accentClass: string;
    image: string;
    cta: { label: string; href: string };
}

const cards: SpotlightCard[] = [
    {
        eyebrow: 'AI & Automation',
        title: (
            <>
                Pioneering the{' '}
                <span style={{ display: 'inline' }}>AI revolution</span>
            </>
        ),
        description:
            'From AI voice agents that replace BPO telecallers to clinical scribes that capture SOAP notes in real time. We build production AI — not demos.',
        icon: <Sparkles size={20} />,
        accentClass: 'accentBlue',
        image:
            'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200',
        cta: { label: 'Explore uVOIZ', href: 'https://uvoiz.unntangle.com' },
    },
    {
        eyebrow: 'Smart Living',
        title: (
            <>
                Powering the{' '}
                <span style={{ display: 'inline' }}>connected home</span>
            </>
        ),
        description:
            'Premium touch switches, TITAN smart panels, biometric door locks and retrofit modules — engineered for high-end homes, villas and hospitality projects.',
        icon: <Home size={20} />,
        accentClass: 'accentPink',
        image:
            'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=1200',
        cta: { label: 'Explore uSYNQ', href: '/usynq' },
    },
];

export default function DualSpotlight() {
    return (
        <section className={styles.section}>
            <div className={`container ${styles.container}`}>
                <div className={styles.grid}>
                    {cards.map((card, i) => {
                        // External links (uVOIZ subdomain) get a real <a>;
                        // internal routes use Next's <Link>.
                        const isExternal = card.cta.href.startsWith('http');
                        const cardInner = (
                            <>
                                <div className={styles.imageWrapper}>
                                    <Image
                                        src={card.image}
                                        alt=""
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                        className={styles.image}
                                        unoptimized
                                    />
                                    <div
                                        className={`${styles.imageGradient} ${styles[card.accentClass]}`}
                                        aria-hidden="true"
                                    />
                                </div>

                                <div className={styles.content}>
                                    <div className={styles.iconWrap}>{card.icon}</div>
                                    <span className={styles.eyebrow}>{card.eyebrow}</span>
                                    <h3 className={styles.title}>{card.title}</h3>
                                    <p className={styles.description}>{card.description}</p>
                                    <span className={styles.cta}>
                                        {card.cta.label}
                                        <ArrowRight size={16} />
                                    </span>
                                </div>
                            </>
                        );

                        return (
                            <motion.div
                                key={card.eyebrow}
                                className={`${styles.card} ${styles[card.accentClass]}`}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                            >
                                {isExternal ? (
                                    <a
                                        href={card.cta.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.cardLink}
                                    >
                                        {cardInner}
                                    </a>
                                ) : (
                                    <Link href={card.cta.href} className={styles.cardLink}>
                                        {cardInner}
                                    </Link>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
