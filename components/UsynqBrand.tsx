'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, Wifi, ShieldCheck, Sparkles, Layers, Zap, Cpu } from 'lucide-react';
import { usynqCategories, usynqProducts } from '@/data/usynqProducts';
import AnimatedStat from './AnimatedStat';
import styles from './UsynqBrand.module.css';

// Map each category to a representative product image (the first product of that category)
// and the deep-link path back into the products page (/usynq/products).
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

// Stats are kept as data so the JSX can map over them and stagger the reveal
// without each card needing its own motion config.
const stats = [
    { value: '5000W', label: 'Per-relay capacity' },
    { value: '2', label: 'Wireless protocols' },
    { value: '40A', label: 'Heavy-duty rating' },
    { value: 'IP65', label: 'Build standard' },
];

/* ============================================================
 * Shared motion configuration
 *
 * Centralised so every reveal on the page has the same feel.
 * - `viewport.once: true` matches `whileInView` patterns elsewhere
 *   in the codebase; we don't want animations replaying every time
 *   the user scrolls back up.
 * - `margin: '-80px 0px'` triggers the reveal slightly BEFORE the
 *   element fully enters view, so by the time it's centred on screen
 *   the animation has already settled (looks proactive vs reactive).
 * ============================================================ */
const REVEAL_VIEWPORT = { once: true, margin: '-80px 0px' };

// Soft "lift" reveal — opacity + slight upward motion. Used for hero
// blocks, headings, lone CTAs.
const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
};

// Container for staggered children. Each child uses `fadeUp` and inherits
// the parent's `visible` trigger via framer-motion's variants system.
const staggerContainer: Variants = {
    hidden: {},
    visible: {
        transition: {
            // 0.08s between children = quick but visibly cascading. Anything
            // longer than ~0.12 starts to drag on a 6-card grid.
            staggerChildren: 0.08,
            delayChildren: 0.1,
        },
    },
};

// Per-child reveal used inside a staggered container. Same shape as
// `fadeUp` but framer-motion will read it through the parent's
// orchestration so the timing offsets line up cleanly.
const staggerItem: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
};

export default function UsynqBrand() {
    return (
        <>
            {/* ============================================================
              * WHY uSYNQ feature grid
              * ============================================================ */}
            <div className={styles.section}>
                <div className={styles.container}>
                    {/* Header reveals as a single block — eyebrow, title, lead all
                        rise together so the eye doesn't jump between three
                        independently animating elements. */}
                    <motion.div
                        className={styles.sectionHeader}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={REVEAL_VIEWPORT}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
                    >
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
                    </motion.div>

                    {/* Feature cards are revealed by a staggered parent: the parent
                        observes the viewport, then orchestrates each child's
                        animation 0.08s after the previous. */}
                    <motion.div
                        className={styles.featuresGrid}
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={REVEAL_VIEWPORT}
                    >
                        {features.map((feature) => (
                            <motion.div
                                key={feature.title}
                                className={styles.featureCard}
                                variants={staggerItem}
                            >
                                <div className={styles.featureIcon}>{feature.icon}</div>
                                <h3 className={styles.featureTitle}>{feature.title}</h3>
                                <p className={styles.featureDescription}>{feature.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* ============================================================
              * STATS BAND — animated counters
              *
              * The numeric values count up from 0 once the band scrolls
              * into view. Each <AnimatedStat /> handles its own trigger
              * via IntersectionObserver, so they all start in concert
              * regardless of where they live in the layout.
              * ============================================================ */}
            <motion.div
                className={styles.statsBand}
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={REVEAL_VIEWPORT}
            >
                <div className={styles.statsInner}>
                    {stats.map((stat) => (
                        <motion.div key={stat.label} variants={staggerItem}>
                            <AnimatedStat
                                value={stat.value}
                                className={styles.statValue}
                            />
                            <span className={styles.statLabel}>{stat.label}</span>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* ============================================================
              * CATEGORY SHOWCASE: 4 cards
              * ============================================================ */}
            <div className={`${styles.section} ${styles.sectionAlt}`}>
                <div className={styles.container}>
                    <motion.div
                        className={styles.sectionHeader}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={REVEAL_VIEWPORT}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
                    >
                        <span className={styles.eyebrow}>Product Range</span>
                        <h2 className={styles.sectionTitle}>
                            Explore the product families.
                        </h2>
                        <p className={styles.sectionLead}>
                            From premium switch panels to face-recognition locks, every uSYNQ
                            product is designed to drop into the same unified ecosystem.
                        </p>
                    </motion.div>

                    <motion.div
                        className={styles.categoryGrid}
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={REVEAL_VIEWPORT}
                    >
                        {categoryShowcase.map((cat) => (
                            <motion.div
                                key={cat.id}
                                className={styles.categoryGridItem}
                                variants={staggerItem}
                            >
                                <Link
                                    href={`/usynq/products?category=${cat.id}`}
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
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* ============================================================
              * FINAL SHOP CTA
              * ============================================================ */}
            <motion.div
                className={styles.shopCta}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={REVEAL_VIEWPORT}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
            >
                <div className={styles.shopCtaInner}>
                    <span className={styles.shopCtaEyebrow}>Ready to build?</span>
                    <h2 className={styles.shopCtaTitle}>
                        Explore all uSYNQ products in one place.
                    </h2>
                    <p className={styles.shopCtaSubtitle}>
                        Browse the full range: TITAN panels, Velux & Luxeray
                        touch switches, ZigBee retrofit modules, and biometric smart locks.
                    </p>
                    <Link href="/usynq/products" className={styles.shopCtaButton}>
                        View all products
                        <ArrowRight size={18} />
                    </Link>
                </div>
            </motion.div>
        </>
    );
}
