'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Wifi, ShieldCheck, Sparkles, Layers, Zap, Cpu } from 'lucide-react';
import { usynqCategories, usynqProducts } from '@/data/usynqProducts';
import styles from './UsynqBrand.module.css';

// Map each category to a representative product image (the first product of that category)
// and the deep-link path back into the shop products page.
const categoryShowcase = usynqCategories.map((cat) => {
    const firstProduct = usynqProducts.find((p) => p.category === cat.id);
    const count = usynqProducts.filter((p) => p.category === cat.id).length;
    return {
        ...cat,
        previewImage: firstProduct?.image ?? '',
        count,
    };
});

const features = [
    {
        icon: <Wifi size={22} strokeWidth={1.8} />,
        title: 'ZigBee + WiFi, native',
        description:
            'Every panel and module speaks both ZigBee 3.0 and WiFi out of the box. Build a mesh that just works, with no hubs to wrestle with.',
    },
    {
        icon: <Layers size={22} strokeWidth={1.8} />,
        title: 'One ecosystem, every room',
        description:
            'Switches, curtains, fans, sockets, retrofits, and biometric locks designed to feel like one product line, not five vendors stitched together.',
    },
    {
        icon: <ShieldCheck size={22} strokeWidth={1.8} />,
        title: 'Heavy-duty engineering',
        description:
            'Up to 5000W per relay on retrofit modules, brushed-aluminium TITAN faceplates, and biometric locks rated for villa-grade installations.',
    },
    {
        icon: <Sparkles size={22} strokeWidth={1.8} />,
        title: 'Premium finishes',
        description:
            'Glass-finish Velux and Luxeray touch panels, brushed-aluminium TITAN modules, and sleek face-recognition locks built for design-forward homes.',
    },
    {
        icon: <Cpu size={22} strokeWidth={1.8} />,
        title: 'Face recognition + biometrics',
        description:
            'WiFi-LE smart locks with face recognition, RFID, NFC, and fingerprint, plus aluminium-profile and glass-door variants for any entry point.',
    },
    {
        icon: <Zap size={22} strokeWidth={1.8} />,
        title: 'Retrofit your existing home',
        description:
            'In-wall ZigBee modules turn any conventional switchboard smart, with no rewiring, no aesthetic compromise, and no ripping out walls.',
    },
];

export default function UsynqBrand() {
    return (
        <>
            {/* ============================================================
              * WHY uSYNQ feature grid
              * ============================================================ */}
            <div className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <span className={styles.eyebrow}>
                            Why <span className={styles.brandName}>uSYNQ</span>
                        </span>
                        <h2 className={styles.sectionTitle}>
                            One brand. Every layer of your smart home.
                        </h2>
                        <p className={styles.sectionLead}>
                            uSYNQ is engineered as a single, deterministic ecosystem of switches,
                            modules, and locks that talk to each other natively, not over a fragile
                            patchwork of integrations.
                        </p>
                    </div>

                    <div className={styles.featuresGrid}>
                        {features.map((feature) => (
                            <div key={feature.title} className={styles.featureCard}>
                                <div className={styles.featureIcon}>{feature.icon}</div>
                                <h3 className={styles.featureTitle}>{feature.title}</h3>
                                <p className={styles.featureDescription}>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ============================================================
              * STATS BAND — stable technical credentials only.
              * Avoid hardcoded product/category counts here, since
              * those drift as the catalog grows.
              * ============================================================ */}
            <div className={styles.statsBand}>
                <div className={styles.statsInner}>
                    <div>
                        <span className={styles.statValue}>5000W</span>
                        <span className={styles.statLabel}>Per-relay capacity</span>
                    </div>
                    <div>
                        <span className={styles.statValue}>2</span>
                        <span className={styles.statLabel}>Wireless protocols</span>
                    </div>
                    <div>
                        <span className={styles.statValue}>40A</span>
                        <span className={styles.statLabel}>Heavy-duty rating</span>
                    </div>
                    <div>
                        <span className={styles.statValue}>IP65</span>
                        <span className={styles.statLabel}>Build standard</span>
                    </div>
                </div>
            </div>

            {/* ============================================================
              * CATEGORY SHOWCASE: 4 cards
              * ============================================================ */}
            <div className={`${styles.section} ${styles.sectionAlt}`}>
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <span className={styles.eyebrow}>Product Range</span>
                        <h2 className={styles.sectionTitle}>
                            Explore the product families.
                        </h2>
                        <p className={styles.sectionLead}>
                            From premium switch panels to face-recognition locks, every uSYNQ
                            product is designed to drop into the same unified ecosystem.
                        </p>
                    </div>

                    <div className={styles.categoryGrid}>
                        {categoryShowcase.map((cat) => (
                            <Link
                                key={cat.id}
                                href={`/shop/usynq?category=${cat.id}`}
                                className={styles.categoryCard}
                            >
                                <div className={styles.categoryCardText}>
                                    <div>
                                        <span className={styles.categoryCardLabel}>Category</span>
                                        <h3 className={styles.categoryCardTitle}>{cat.label}</h3>
                                        <p className={styles.categoryCardDescription}>
                                            {cat.description}
                                        </p>
                                    </div>
                                    <span className={styles.categoryCardCount}>
                                        Explore <ArrowRight size={14} />
                                    </span>
                                </div>
                                {cat.previewImage && (
                                    <div className={styles.categoryCardImageWrap}>
                                        <Image
                                            src={cat.previewImage}
                                            alt={cat.label}
                                            fill
                                            sizes="(max-width: 600px) 100vw, 50vw"
                                            className={styles.categoryCardImage}
                                        />
                                    </div>
                                )}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* ============================================================
              * FINAL SHOP CTA
              * ============================================================ */}
            <div className={styles.shopCta}>
                <div className={styles.shopCtaInner}>
                    <span className={styles.shopCtaEyebrow}>Ready to build?</span>
                    <h2 className={styles.shopCtaTitle}>
                        Explore all uSYNQ products in one place.
                    </h2>
                    <p className={styles.shopCtaSubtitle}>
                        Browse the full range: TITAN panels, Velux & Luxeray
                        touch switches, ZigBee retrofit modules, and biometric smart locks.
                    </p>
                    <Link href="/shop/usynq" className={styles.shopCtaButton}>
                        View all products
                        <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </>
    );
}
