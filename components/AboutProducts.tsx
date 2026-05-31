'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import styles from './AboutProducts.module.css';

/**
 * About-page "Our Products" section.
 *
 * Renders the SaaS product row (3-card grid) — uVOIZ, uDYLR, uSCRIBR.
 *
 * Visual theme is dark (matches About page's existing palette)
 * — distinct from the home-page version which is light.
 */

interface SaasProduct {
    id: string;
    name: string;
    eyebrow: string;
    description: string;
    image: string;
    href: string | null;
    external?: boolean;
    badge: { label: string; tone: 'live' | 'soon' };
}

const saasProducts: SaasProduct[] = [
    {
        id: 'uvoiz',
        name: 'uVOIZ',
        eyebrow: 'AI Telecalling',
        description:
            'AI voice agents that speak 5+ Indian languages and replace telecallers for BPOs. TRAI-compliant, CRM-integrated, always on.',
        image:
            'https://images.unsplash.com/photo-1587560699334-cc4ff634909a?auto=format&fit=crop&q=80&w=1200',
        href: 'https://uvoiz.unntangle.com',
        external: true,
        badge: { label: 'BETA', tone: 'live' },
    },
    {
        id: 'udylr',
        name: 'uDYLR',
        eyebrow: 'Predictive BPO Dialer',
        description:
            'Outbound and inbound BPO dialer with predictive routing, agent assist, and built-in compliance for high-volume campaigns.',
        image:
            'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1200',
        href: null,
        badge: { label: 'Coming Soon', tone: 'soon' },
    },
    {
        id: 'uscribr',
        name: 'uSCRIBR',
        eyebrow: 'AI Medical Scribe',
        description:
            'Captures clinical conversations and generates structured SOAP notes in real time. Built for clinicians who need their hands free.',
        image:
            'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200',
        href: null,
        badge: { label: 'Coming Soon', tone: 'soon' },
    },
];

/** Splits a brand wordmark like "uVOIZ" into the leading "u"
 *  (accent colour) and the rest. Falls back to the full name. */
const renderWordmark = (name: string) => {
    if (!name.startsWith('u') || name.length < 2) {
        return <>{name}</>;
    }
    return (
        <>
            <span className={styles.wordmarkU}>u</span>
            <span className={styles.wordmarkRest}>{name.slice(1)}</span>
        </>
    );
};

export default function AboutProducts() {
    return (
        <section className={styles.productsSection}>
            <div className={`container ${styles.container}`}>
                {/* ============================================================
                    SECTION HEADER
                ============================================================ */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className={styles.header}
                >
                    <span className={styles.sectionBadge}>Our Products</span>
                    <h2 className={styles.title}>What we&apos;ve shipped</h2>
                    <p className={styles.subtitle}>
                        SaaS tools — all in market, all running for real customers.
                    </p>
                </motion.div>

                {/* ============================================================
                    SAAS GRID
                ============================================================ */}
                <div className={styles.categoryLabel}>
                    <span className={styles.categoryEyebrow}>SaaS Suite</span>
                    <span className={styles.categoryRule} aria-hidden="true" />
                </div>

                <div className={styles.grid}>
                    {saasProducts.map((product, index) => {
                        const isDisabled = product.href === null;
                        const cardInner = (
                            <>
                                <div className={styles.imageWrapper}>
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className={styles.productImage}
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        unoptimized
                                    />
                                    <span
                                        className={`${styles.badge} ${
                                            product.badge.tone === 'live'
                                                ? styles.badgeLive
                                                : styles.badgeSoon
                                        }`}
                                    >
                                        {product.badge.label}
                                    </span>
                                </div>
                                <div className={styles.cardContent}>
                                    <span className={styles.cardEyebrow}>
                                        {product.eyebrow}
                                    </span>
                                    <h3 className={styles.wordmark}>
                                        {renderWordmark(product.name)}
                                    </h3>
                                    <p className={styles.cardDescription}>
                                        {product.description}
                                    </p>
                                    <span className={styles.viewLink}>
                                        {isDisabled ? 'Notify me' : 'Try product'}{' '}
                                        <ArrowUpRight size={16} />
                                    </span>
                                </div>
                            </>
                        );

                        return (
                            <motion.div
                                key={product.id}
                                className={`${styles.card} ${
                                    isDisabled ? styles.cardDisabled : ''
                                }`}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                {isDisabled ? (
                                    <div className={styles.cardLink}>{cardInner}</div>
                                ) : product.external ? (
                                    <a
                                        href={product.href as string}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.cardLink}
                                    >
                                        {cardInner}
                                    </a>
                                ) : (
                                    <Link
                                        href={product.href as string}
                                        className={styles.cardLink}
                                    >
                                        {cardInner}
                                    </Link>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            <div className={styles.backgroundGradients}>
                <div className={styles.gradientBlue} />
                <div className={styles.gradientPurple} />
            </div>
        </section>
    );
}
