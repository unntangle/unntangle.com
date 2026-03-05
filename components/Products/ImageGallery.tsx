'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import Image from 'next/image';
import styles from './ImageGallery.module.css';

interface ImageGalleryProps {
    isOpen: boolean;
    onClose: () => void;
    images: string[];
    productName: string;
    specs: {
        capacity: string;
        maxLoad: string;
        maxRise: string;
        maxSpeed: string;
        driveType: string;
        doorStyle: string;
        material: string;
    } | null;
}

export default function ImageGallery({ isOpen, onClose, images, productName, specs }: ImageGalleryProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    const nextImage = () => {
        setActiveIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    if (!images || images.length === 0) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className={styles.overlay}>
                    <motion.div
                        className={styles.backdrop}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />
                    <motion.div
                        className={styles.modal}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", duration: 0.5 }}
                    >
                        <div className={styles.galleryContent}>
                            {/* Main Image View */}
                            <div className={styles.mainView}>
                                <div className={styles.imageContainer}>
                                    <Image
                                        src={images[activeIndex]}
                                        alt={`${productName} - Image ${activeIndex + 1}`}
                                        fill
                                        className={styles.mainImage}
                                        priority
                                    />
                                </div>

                                {images.length > 1 && (
                                    <>
                                        <button className={styles.navBtn} onClick={prevImage} style={{ left: '20px' }}>
                                            <ChevronLeft size={24} />
                                        </button>
                                        <button className={styles.navBtn} onClick={nextImage} style={{ right: '20px' }}>
                                            <ChevronRight size={24} />
                                        </button>
                                    </>
                                )}
                            </div>

                            {/* Sidebar / Thumbnails (Amazon Style) */}
                            <div className={styles.sidebar}>
                                <div className={styles.header}>
                                    <h3>{productName}</h3>
                                    <p>{images.length} Images Available</p>
                                </div>
                                <div className={styles.thumbnailGrid}>
                                    {images.map((img, idx) => (
                                        <button
                                            key={idx}
                                            className={`${styles.thumbBtn} ${idx === activeIndex ? styles.active : ''}`}
                                            onClick={() => setActiveIndex(idx)}
                                        >
                                            <div className={styles.thumbWrapper}>
                                                <Image
                                                    src={img}
                                                    alt={`Thumbnail ${idx + 1}`}
                                                    fill
                                                    className={styles.thumbImage}
                                                />
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                {specs && (
                                    <div className={styles.specsSection}>
                                        <div className={styles.specsTitle}>Technical Specifications</div>
                                        <div className={styles.specsList}>
                                            <div className={styles.specRow}>
                                                <span>Capacity</span>
                                                <strong>{specs.capacity}</strong>
                                            </div>
                                            <div className={styles.specRow}>
                                                <span>Max Load</span>
                                                <strong>{specs.maxLoad}</strong>
                                            </div>
                                            <div className={styles.specRow}>
                                                <span>Max Rise</span>
                                                <strong>{specs.maxRise}</strong>
                                            </div>
                                            <div className={styles.specRow}>
                                                <span>Max Speed</span>
                                                <strong>{specs.maxSpeed}</strong>
                                            </div>
                                            <div className={styles.specRow}>
                                                <span>Drive Type</span>
                                                <strong>{specs.driveType}</strong>
                                            </div>
                                            <div className={styles.specRow}>
                                                <span>Door Style</span>
                                                <strong>{specs.doorStyle}</strong>
                                            </div>
                                            <div className={styles.specRow}>
                                                <span>Material</span>
                                                <strong>{specs.material}</strong>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <button className={styles.closeButton} onClick={onClose} aria-label="Close gallery">
                            <X size={24} />
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
