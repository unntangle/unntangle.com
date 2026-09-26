'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import styles from './Products.module.css';

/**
 * Home-page "Our Products" section.
 *
 * Renders the SaaS product row (3-card grid) — uVOIZ live, uDYLR +
 * uSCRIBR coming soon.
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
        eyebrow: 'AI Voice Agents',
        description:
            'Voice agents that handle routine business calls — lead qualification, follow-ups and first-line support — in multiple Indian languages, and pass conversations to your team when a person is needed. Now in beta.',
        image: 'https://images.unsplash.com/photo-1587560699334-cc4ff634909a?auto=format&fit=crop&q=80&w=1200',
        href: 'https://uvoiz.unntangle.com',
        external: true,
        badge: { label: 'BETA', tone: 'live' },
    },
    {
        id: 'udylr',
        name: 'uDYLR',
        eyebrow: 'AI Contact-Center Workflows',
        description:
            'In development: contact-center workflows that take repetitive customer interactions off your agents’ queue, with routing and agent-assist designed around your existing CRM.',
        image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1200',
        href: null,
        badge: { label: 'Coming Soon', tone: 'soon' },
    },
    {
        id: 'uscribr',
        name: 'uSCRIBR',
        eyebrow: 'AI Clinical Documentation',
        description:
            'In development: documentation support that turns clinical conversations into structured notes for review, so healthcare professionals spend less time on paperwork.',
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
        <section className={styles.products} id="ai-products">
            <div className={`container ${styles.container}`}>
                <div className={styles.header}>
                    <div>
                        <span className="tag">AI Products</span>
                        <h2>AI Products &amp; Solutions</h2>
                        <p>
                            Some workflows come up again and again. For those, we build specialised
                            AI products on the same deployment foundations — each one at a different
                            stage, and labelled as such.
                        </p>
                    </div>
                    {/* No "View all" CTA — there's no /products listing
                       route yet, and the cards below already give every
                       product its own direct entry point, so an extra
                       header CTA isn't adding navigation, just visual noise. */}
                </div>

                {/* ============================================================
                    SAAS GRID
                ============================================================ */}
                <div className={styles.categoryLabel}>
                    <span className={styles.categoryEyebrow}>Specialised AI Products</span>
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
            </div>
        </section>
    );
}
