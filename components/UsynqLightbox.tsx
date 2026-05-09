'use client';

/* uSYNQ image preview lightbox.
 *
 * Opens when a product card image is clicked. Shows a single large image
 * on a dark backdrop, with a small caption strip (name, SKU, tags) below
 * and prev/next chevrons if there's more than one product in the active
 * filter view.
 *
 * Keyboard:
 *   - Escape       → close
 *   - ArrowLeft    → previous product
 *   - ArrowRight   → next product
 *
 * The body-scroll lock matches what UsynqContactModal does so behaviour
 * stays consistent across both overlays.
 */

import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { UsynqProduct } from '@/data/usynqProducts';
import styles from './UsynqLightbox.module.css';

interface UsynqLightboxProps {
    /** All products currently visible in the page (used for prev/next). */
    products: UsynqProduct[];
    /** Index of the open product. -1 / null means closed. */
    openIndex: number | null;
    onClose: () => void;
    onNavigate: (nextIndex: number) => void;
}

export default function UsynqLightbox({
    products,
    openIndex,
    onClose,
    onNavigate,
}: UsynqLightboxProps) {
    const isOpen = openIndex !== null && openIndex >= 0 && openIndex < products.length;
    const product = isOpen ? products[openIndex] : null;

    // Memoised handlers so the keyboard effect's dependency list stays stable.
    const handlePrev = useCallback(() => {
        if (openIndex === null) return;
        // Wrap-around: pressing prev on the first item goes to the last.
        const next = openIndex === 0 ? products.length - 1 : openIndex - 1;
        onNavigate(next);
    }, [openIndex, products.length, onNavigate]);

    const handleNext = useCallback(() => {
        if (openIndex === null) return;
        const next = openIndex === products.length - 1 ? 0 : openIndex + 1;
        onNavigate(next);
    }, [openIndex, products.length, onNavigate]);

    // Body scroll lock + keyboard shortcuts. Runs only when open.
    useEffect(() => {
        if (!isOpen) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            else if (e.key === 'ArrowLeft') handlePrev();
            else if (e.key === 'ArrowRight') handleNext();
        };
        window.addEventListener('keydown', onKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen, onClose, handlePrev, handleNext]);

    return (
        <AnimatePresence>
            {isOpen && product && (
                <motion.div
                    className={styles.backdrop}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={onClose}
                    role="dialog"
                    aria-modal="true"
                    aria-label={`Preview: ${product.name}`}
                >
                    {/* Close button — pinned top-right of the viewport */}
                    <button
                        type="button"
                        className={styles.closeButton}
                        onClick={onClose}
                        aria-label="Close preview"
                    >
                        <X size={20} strokeWidth={2} />
                    </button>

                    {/* Prev / Next — only rendered when there's more than one product */}
                    {products.length > 1 && (
                        <>
                            <button
                                type="button"
                                className={`${styles.navButton} ${styles.navPrev}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handlePrev();
                                }}
                                aria-label="Previous product"
                            >
                                <ChevronLeft size={26} strokeWidth={2} />
                            </button>
                            <button
                                type="button"
                                className={`${styles.navButton} ${styles.navNext}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleNext();
                                }}
                                aria-label="Next product"
                            >
                                <ChevronRight size={26} strokeWidth={2} />
                            </button>
                        </>
                    )}

                    {/*
                      * Stage — image + caption. We don't use AnimatePresence
                      * keyed by product.id here because it'd cause flicker
                      * during prev/next; instead we use motion.key on the
                      * stage so the image cross-fades smoothly between products.
                      */}
                    <motion.div
                        key={product.id}
                        className={styles.stage}
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as const }}
                        // Stop clicks inside the stage from closing the modal
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={styles.imageWrap}>
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                sizes="(max-width: 900px) 90vw, 80vw"
                                className={styles.image}
                                priority
                            />
                        </div>

                        <div className={styles.caption}>
                            <div className={styles.captionMain}>
                                {product.sku && (
                                    <span className={styles.captionSku}>{product.sku}</span>
                                )}
                                <h2 className={styles.captionTitle}>{product.name}</h2>
                            </div>
                            {product.tags.length > 0 && (
                                <div className={styles.captionTags}>
                                    {product.tags.map((tag) => (
                                        <span key={tag} className={styles.captionTag}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                            <div className={styles.captionMeta}>
                                {openIndex !== null && (
                                    <span>
                                        {openIndex + 1} / {products.length}
                                    </span>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
