'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import styles from './Products.module.css';

/**
 * Home-page "Our Products" section.
 *
 * Renders TWO distinct product categories:
 *   1. SaaS row (3-card grid) — uVOIZ live, uDYLR + uSCRIBR coming soon
 *   2. uSYNQ hero band — full-width feature for the smart-living
 *      hardware sub-brand. Treated separately because uSYNQ is
 *      hardware (touch switches, smart locks, retrofit modules),
 *      not SaaS, and shouldn't sit inside the SaaS grid.
 *
 * Brand wordmarks use the "u + rest" two-tone treatment to match
 * the navbar's productItemTitleRow style.
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
        image: 'https://images.unsplash.com/photo-1587560699334-cc4ff634909a?auto=format&fit=crop&q=80&w=1200',
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
        image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1200',
        href: null,
        badge: { label: 'Coming Soon', tone: 'soon' },
    },
    {
        id: 'uscribr',
        name: 'uSCRIBR',
        eyebrow: 'AI Medical Scribe',
        description:
            'Captures clinical conversations and generates structured SOAP notes in real time. Built for clinicians who need their hands free.',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200',
        href: null,
        badge: { label: 'Coming Soon', tone: 'soon' },
    },
];

/** Splits a brand wordmark like "uVOIZ" into the leading "u"
 *  (accent colour) and the rest (black). Falls back to the full
 *  name if the input doesn't follow the pattern. */
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

export default function Products() {
    return (
        <section className={styles.products}>
            <div className={`container ${styles.container}`}>
                <div className={styles.header}>
                    <div>
                        <span className="tag">Our Products</span>
                        <h2>Built by Unntangle</h2>
                        <p>
                            SaaS tools and a smart-living brand — shipped, in market, and
                            quietly running for our customers.
                        </p>
                    </div>
                    {/* No "View all" CTA — there's no /products listing route
                       yet, and pointing it at /usynq or any single product
                       would be misleading because we have multiple SaaS
                       products plus the hardware brand. The cards and uSYNQ
                       band below already give every product its own
                       direct entry point, so an extra header CTA isn't
                       adding navigation, just visual noise. */}
                </div>

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
                                        className={styles.image}
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        unoptimized={product.image.startsWith('http')}
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
                                <div className={styles.content}>
                                    <span className={styles.eyebrow}>{product.eyebrow}</span>
                                    <h3 className={styles.wordmark}>
                                        {renderWordmark(product.name)}
                                    </h3>
                                    <p>{product.description}</p>
                                    <span className={styles.viewLink}>
                                        {isDisabled ? 'Notify me' : 'Try product'}{' '}
                                        <ArrowUpRight size={18} />
                                    </span>
                                </div>
                            </>
                        );

                        return (
                            <motion.div
                                key={product.id}
                                className={`${styles.card} ${isDisabled ? styles.cardDisabled : ''}`}
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
                                    <Link href={product.href as string} className={styles.cardLink}>
                                        {cardInner}
                                    </Link>
                                )}
                            </motion.div>
                        );
                    })}
                </div>

                {/* ============================================================
                    uSYNQ HERO BAND — separate full-width feature
                ============================================================ */}
                <div className={styles.categoryLabel}>
                    <span className={styles.categoryEyebrow}>Smart Living Brand</span>
                    <span className={styles.categoryRule} aria-hidden="true" />
                </div>

                <motion.div
                    className={styles.usynqBand}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <Link href="/usynq" className={styles.usynqLink}>
                        <div className={styles.usynqContent}>
                            <span className={styles.usynqEyebrow}>Hardware · Smart Living</span>

                            <h3 className={styles.usynqWordmark}>
                                <span className={styles.wordmarkU}>u</span>
                                <span className={styles.usynqWordmarkRest}>SYNQ</span>
                            </h3>

                            <p className={styles.usynqDescription}>
                                Touch switches, TITAN smart panels, biometric door locks and
                                retrofit modules — engineered for premium homes, villas and
                                hospitality projects across India.
                            </p>

                            <div className={styles.usynqHighlights}>
                                <div className={styles.usynqHighlight}>Touch Switches</div>
                                <div className={styles.usynqHighlight}>TITAN Panels</div>
                                <div className={styles.usynqHighlight}>Smart Locks</div>
                                <div className={styles.usynqHighlight}>Retrofit Modules</div>
                            </div>

                            <span className={styles.usynqCta}>
                                Explore the brand <ArrowRight size={18} />
                            </span>
                        </div>

                        <div className={styles.usynqVisual}>
                            <Image
                                src="/images/usynq_banner.png"
                                alt="uSYNQ smart living products"
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className={styles.usynqImage}
                            />
                            <span className={`${styles.badge} ${styles.badgeLive} ${styles.usynqBadge}`}>
                                LIVE
                            </span>
                        </div>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
