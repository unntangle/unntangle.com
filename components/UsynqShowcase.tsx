'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { ArrowRight, ChevronUp, ChevronDown, Maximize2 } from 'lucide-react';
import {
    usynqCategories,
    usynqProducts,
    type UsynqCategoryId,
} from '@/data/usynqProducts';
import UsynqContactModal from './UsynqContactModal';
import UsynqLightbox from './UsynqLightbox';
import styles from './UsynqShowcase.module.css';

type FilterId = 'all' | UsynqCategoryId;

// Set of valid category IDs for query-param validation
const validCategoryIds = new Set<string>(usynqCategories.map((c) => c.id));

function isValidFilter(value: string | null): value is UsynqCategoryId {
    return value !== null && validCategoryIds.has(value);
}

// Match the same hide threshold the Navbar uses (150px). Below this,
// the navbar always shows so the tabs sit normally below it.
const NAV_HIDE_THRESHOLD = 150;
// Navbar height — when navbar slides offscreen, tabs slide up by this amount.
const NAVBAR_HEIGHT = 80;

/**
 * The actual showcase content. Wrapped in <Suspense> below because
 * `useSearchParams` requires it for static rendering in Next.js App Router.
 */
function UsynqShowcaseInner() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const categoryParam = searchParams.get('category');

    // Initial filter from URL (if any). Falls back to 'all'.
    const [activeFilter, setActiveFilter] = useState<FilterId>(() =>
        isValidFilter(categoryParam) ? categoryParam : 'all'
    );

    // Track whether the navbar is hidden (mirrors Navbar.tsx logic so they stay
    // in sync without a shared store). When the navbar hides on scroll-down,
    // the tabs slide UP by NAVBAR_HEIGHT to occupy the freed space at top:0.
    // When scrolling back up, navbar reappears and tabs return to top:80px.
    const [navHidden, setNavHidden] = useState(false);
    // Contact modal open state — lifted here so the CTA button can trigger it.
    const [contactModalOpen, setContactModalOpen] = useState(false);
    // Scroll-button visibility flags. The up arrow appears once the user has
    // scrolled meaningfully down the page; the down arrow hides when the
    // user reaches the bottom (otherwise it points nowhere).
    const [showScrollUp, setShowScrollUp] = useState(false);
    const [showScrollDown, setShowScrollDown] = useState(true);
    // Lightbox state — index into the flat visibleProducts list, or null when
    // closed. Using an index (not a product id) makes prev/next navigation
    // O(1) without lookups.
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, 'change', (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > NAV_HIDE_THRESHOLD) {
            // Scrolling down past threshold → navbar hides → tabs slide up
            setNavHidden(true);
        } else {
            // Scrolling up (or above threshold) → navbar shows → tabs sit below it
            setNavHidden(false);
        }

        // Show "scroll up" once the user is meaningfully scrolled down.
        // 400px is roughly past the first row of products on typical viewports.
        setShowScrollUp(latest > 400);

        // Hide "scroll down" once the user is near the bottom of the page.
        // We compare against (documentHeight - viewportHeight - buffer) to
        // catch “close enough to bottom” — not just the exact pixel.
        if (typeof window !== 'undefined') {
            const distanceFromBottom =
                document.documentElement.scrollHeight - latest - window.innerHeight;
            setShowScrollDown(distanceFromBottom > 100);
        }
    });

    // Smooth-scroll handlers for the two arrow buttons.
    const scrollToTop = () => {
        if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };
    const scrollToBottom = () => {
        if (typeof window !== 'undefined') {
            window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth',
            });
        }
    };

    // Keep state in sync if the user navigates between filtered URLs.
    useEffect(() => {
        if (isValidFilter(categoryParam)) {
            setActiveFilter(categoryParam);
        } else if (categoryParam === null) {
            setActiveFilter('all');
        }
    }, [categoryParam]);

    // Group products by category once
    const productsByCategory = useMemo(() => {
        const map = new Map<UsynqCategoryId, typeof usynqProducts>();
        usynqCategories.forEach((cat) => {
            map.set(
                cat.id,
                usynqProducts.filter((p) => p.category === cat.id)
            );
        });
        return map;
    }, []);

    /**
     * Update both local state and the URL when a tab is clicked.
     * `router.replace` updates the URL without adding to history,
     * `scroll: false` prevents jumping to the top of the page.
     */
    const handleTabClick = (filter: FilterId) => {
        setActiveFilter(filter);
        const url = filter === 'all' ? '/shop/usynq' : `/shop/usynq?category=${filter}`;
        router.replace(url, { scroll: false });
    };

    const visibleCategories =
        activeFilter === 'all'
            ? usynqCategories
            : usynqCategories.filter((c) => c.id === activeFilter);

    /**
     * Flat list of every product visible on the page right now, in the same
     * order they're rendered. The lightbox uses this to step through products
     * with the prev/next chevrons or arrow keys.
     *
     * Recomputed when the filter changes — if the user closes the lightbox,
     * switches tab, then opens it again, the index space resets cleanly.
     *
     * Also returns an `indexById` map so card render can resolve a product's
     * flat index in O(1) instead of running findIndex per product.
     */
    const { visibleProducts, indexById } = useMemo(() => {
        const flat = visibleCategories.flatMap(
            (cat) => productsByCategory.get(cat.id) ?? []
        );
        const map = new Map<string, number>();
        flat.forEach((p, i) => map.set(p.id, i));
        return { visibleProducts: flat, indexById: map };
    }, [visibleCategories, productsByCategory]);

    return (
        // Use <div> instead of <section> to avoid global `section { padding; flex }`
        <div className={styles.showcase}>
            {/* Spacer to clear the fixed 80px navbar before the sticky tabs */}
            <div className={styles.navbarSpacer} />

            {/*
              * Sticky Category Tabs — full-bleed band that mirrors the navbar's
              * hide/show animation. When the navbar slides up offscreen on scroll-down,
              * the tabs slide up to take its place (top:80px → top:0). When the user
              * scrolls back up, the navbar comes back and the tabs return to top:80px.
              */}
            <motion.div
                className={styles.tabsWrapper}
                animate={{ y: navHidden ? -NAVBAR_HEIGHT : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
                <div className={styles.tabs}>
                    <button
                        type="button"
                        className={`${styles.tab} ${activeFilter === 'all' ? styles.tabActive : ''}`}
                        onClick={() => handleTabClick('all')}
                    >
                        All Products
                        <span className={styles.tabCount}>{usynqProducts.length}</span>
                    </button>
                    {usynqCategories.map((cat) => {
                        const count = productsByCategory.get(cat.id)?.length ?? 0;
                        return (
                            <button
                                type="button"
                                key={cat.id}
                                className={`${styles.tab} ${activeFilter === cat.id ? styles.tabActive : ''}`}
                                onClick={() => handleTabClick(cat.id)}
                            >
                                {cat.label}
                                <span className={styles.tabCount}>{count}</span>
                            </button>
                        );
                    })}
                </div>
            </motion.div>

            {/* Product sections + CTA inside the centred container */}
            <div className={styles.bodyContainer}>
                {visibleCategories.map((cat) => {
                    const items = productsByCategory.get(cat.id) ?? [];
                    return (
                        <div key={cat.id} className={styles.section}>
                            <div className={styles.sectionHeader}>
                                <div className={styles.sectionHeaderText}>
                                    <h2 className={styles.sectionTitle}>{cat.label}</h2>
                                    <p className={styles.sectionDescription}>{cat.description}</p>
                                </div>
                            </div>

                            <div className={styles.grid}>
                                {items.map((product) => {
                                    // O(1) lookup of this product's index in the flat
                                    // visibleProducts list — needed so the lightbox can
                                    // navigate prev/next from the right starting point.
                                    const flatIndex = indexById.get(product.id) ?? 0;
                                    return (
                                        <article key={product.id} className={styles.card}>
                                            <button
                                                type="button"
                                                className={styles.imageWrap}
                                                onClick={() => setLightboxIndex(flatIndex)}
                                                aria-label={`Preview ${product.name}`}
                                            >
                                                {product.sku && (
                                                    <span className={styles.skuBadge}>{product.sku}</span>
                                                )}
                                                <Image
                                                    src={product.image}
                                                    alt={product.name}
                                                    fill
                                                    sizes="(max-width: 700px) 50vw, (max-width: 1100px) 33vw, 25vw"
                                                    className={styles.image}
                                                />
                                                {/* Hover hint: a small magnifier overlay
                                                    that fades in on card hover so users
                                                    discover the click-to-preview affordance. */}
                                                <span className={styles.zoomHint} aria-hidden="true">
                                                    <Maximize2 size={16} strokeWidth={2.2} />
                                                </span>
                                            </button>
                                            <div className={styles.cardBody}>
                                                <h3 className={styles.productName}>{product.name}</h3>
                                                {product.tags.length > 0 && (
                                                    <div className={styles.tagRow}>
                                                        {product.tags.slice(0, 3).map((tag) => (
                                                            <span key={tag} className={styles.tagPill}>
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}

                {/* CTA */}
                <div className={styles.cta}>
                    <h2 className={styles.ctaTitle}>Planning a smart home or villa project?</h2>
                    <p className={styles.ctaSubtitle}>
                        Our team will help you select the right uSYNQ panels, locks and modules
                        for your space. Get tailored recommendations and early-access pricing.
                    </p>
                    <button
                        type="button"
                        className={styles.ctaButton}
                        onClick={() => setContactModalOpen(true)}
                    >
                        Talk to our team
                        <ArrowRight size={16} />
                    </button>
                </div>
            </div>

            {/* Contact form modal */}
            <UsynqContactModal
                isOpen={contactModalOpen}
                onClose={() => setContactModalOpen(false)}
            />

            {/* Image preview lightbox — opens when a product card image is clicked. */}
            <UsynqLightbox
                products={visibleProducts}
                openIndex={lightboxIndex}
                onClose={() => setLightboxIndex(null)}
                onNavigate={(next) => setLightboxIndex(next)}
            />

            {/*
              * Floating scroll arrows — fixed to the bottom-right corner.
              * - Scroll up: appears after 400px of scroll, jumps back to the top.
              * - Scroll down: hides near the bottom of the page (where there's
              *   nowhere left to scroll). Animated in/out with framer-motion
              *   so they don't snap into existence.
              */}
            <div className={styles.scrollButtons} aria-hidden="false">
                <AnimatePresence>
                    {showScrollUp && (
                        <motion.button
                            key="scroll-up"
                            type="button"
                            className={styles.scrollButton}
                            onClick={scrollToTop}
                            aria-label="Scroll to top"
                            initial={{ opacity: 0, scale: 0.8, y: 8 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 8 }}
                            transition={{ duration: 0.2 }}
                        >
                            <ChevronUp size={18} strokeWidth={2.5} />
                        </motion.button>
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {showScrollDown && (
                        <motion.button
                            key="scroll-down"
                            type="button"
                            className={styles.scrollButton}
                            onClick={scrollToBottom}
                            aria-label="Scroll to bottom"
                            initial={{ opacity: 0, scale: 0.8, y: -8 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: -8 }}
                            transition={{ duration: 0.2 }}
                        >
                            <ChevronDown size={18} strokeWidth={2.5} />
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default function UsynqShowcase() {
    return (
        <Suspense fallback={null}>
            <UsynqShowcaseInner />
        </Suspense>
    );
}
