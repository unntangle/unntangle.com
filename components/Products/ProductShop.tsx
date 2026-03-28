'use client';

import { useState, useMemo, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useTransform } from 'framer-motion';
import { ArrowRight, Filter, ChevronRight, X } from 'lucide-react';
import styles from './products.module.css';
import QuoteModal from './QuoteModal';
import ImageGallery from './ImageGallery';
import { Maximize2 } from 'lucide-react';

interface Product {
    id: string;
    brand: 'uryze' | 'usynq';
    category: string;
    subcategory: string;
    name: string;
    description: string;
    image: string;
    images: string[];
    specs: {
        capacity: string;
        maxLoad: string;
        maxRise: string;
        maxSpeed: string;
        driveType: string;
        doorStyle: string;
        material: string;
    };
}

const products: Product[] = [

    // uSYNQ Smart Devices
    {
        id: 'titan-switch',
        brand: 'usynq',
        category: 'Titan Switches',
        subcategory: 'Switches',
        name: 'Titan Pro 4-Gang Switch',
        description: 'Premium glass finish switches with haptic feedback and instant response.',
        image: '/images/usynq_preview.png',
        images: ['/images/usynq_preview.png'],
        specs: { capacity: '4 Gang', maxLoad: '10A', maxRise: 'N/A', maxSpeed: 'N/A', driveType: 'Zigbee 3.0', doorStyle: 'N/A', material: 'Tempered Glass' }
    },
    {
        id: 'touch-switch',
        brand: 'usynq',
        category: 'Touch Switches',
        subcategory: 'Switches',
        name: 'SR28. Luxeray 8 Switch - 4M (8+0+0+0U)',
        description: 'Elite touch-sensitive switches for modern homes.',
        image: '/images/usynq_preview.png',
        images: ['/images/usynq_preview.png'],
        specs: { capacity: '8 Way', maxLoad: '16A', maxRise: 'N/A', maxSpeed: 'N/A', driveType: 'WiFi/Zigbee', doorStyle: 'N/A', material: 'Crystal Glass' }
    },
    {
        id: 'controller-1',
        brand: 'usynq',
        category: 'Controllers',
        subcategory: 'Modules',
        name: 'Retrofit Smart Module 2CH',
        description: 'Convert your existing switches into smart ones without rewiring.',
        image: '/images/usynq_preview.png',
        images: ['/images/usynq_preview.png'],
        specs: { capacity: '2 Channel', maxLoad: '5A per channel', maxRise: 'N/A', maxSpeed: 'N/A', driveType: 'Zigbee', doorStyle: 'N/A', material: 'Polycarbonate' }
    },
    {
        id: 'light-1',
        brand: 'usynq',
        category: 'Lights',
        subcategory: 'Downlights',
        name: 'Smart RGB Downlight',
        description: 'Dimmable RGB downlight with millions of colors and smart control.',
        image: '/images/usynq_preview.png',
        images: ['/images/usynq_preview.png'],
        specs: { capacity: '10W', maxLoad: 'N/A', maxRise: 'N/A', maxSpeed: 'N/A', driveType: 'WiFi', doorStyle: 'N/A', material: 'Aluminium' }
    },
    {
        id: 'curtain-1',
        brand: 'usynq',
        category: 'Curtains',
        subcategory: 'Motors',
        name: 'Smart Curtain Motor Pro',
        description: 'Ultra-quiet heavy-duty curtain motor with app and voice control.',
        image: '/images/usynq_preview.png',
        images: ['/images/usynq_preview.png'],
        specs: { capacity: '50kg', maxLoad: '2A', maxRise: 'N/A', maxSpeed: '20cm/s', driveType: 'Zigbee', doorStyle: 'N/A', material: 'Metal' }
    },
    {
        id: 'door-lock-1',
        brand: 'usynq',
        category: 'Door Locks',
        subcategory: 'Smart Locks',
        name: 'Smart Biometric Door Lock',
        description: 'Advanced fingerprint, RFID and PIN access for ultimate security.',
        image: '/images/usynq_preview.png',
        images: ['/images/usynq_preview.png'],
        specs: { capacity: '100 Users', maxLoad: 'N/A', maxRise: 'N/A', maxSpeed: 'N/A', driveType: 'Zigbee', doorStyle: 'N/A', material: 'Zinc Alloy' }
    },
    {
        id: 'cabinet-lock-1',
        brand: 'usynq',
        category: 'Cabinet Locks',
        subcategory: 'Smart Locks',
        name: 'Smart Stealth Cabinet Lock',
        description: 'Invisible smart lock for cabinets and drawers.',
        image: '/images/usynq_preview.png',
        images: ['/images/usynq_preview.png'],
        specs: { capacity: 'N/A', maxLoad: 'N/A', maxRise: 'N/A', maxSpeed: 'N/A', driveType: 'Bluetooth', doorStyle: 'N/A', material: 'ABS' }
    }
];

const usynqCategories = [
    { id: 'Titan Switches', name: 'Titan Switches', icon: '/images/usynq_preview.png' },
    { id: 'Touch Switches', name: 'Touch Switches', icon: '/images/usynq_preview.png' },
    { id: 'Controllers', name: 'Controllers', icon: '/images/usynq_preview.png' },
    { id: 'Lights', name: 'Lights', icon: '/images/usynq_preview.png' },
    { id: 'Curtains', name: 'Curtains', icon: '/images/usynq_preview.png' },
    { id: 'Door Locks', name: 'Door Locks', icon: '/images/usynq_preview.png' },
    { id: 'Cabinet Locks', name: 'Cabinet Locks', icon: '/images/usynq_preview.png' }
];

export default function ProductShop({ initialBrand, forcedBrand }: { initialBrand?: string, forcedBrand?: string }) {
    const [activeBrand, setActiveBrand] = useState<string>(forcedBrand || initialBrand || 'usynq');
    const [activeCategory, setActiveCategory] = useState<string>('All');
    const [activeSubcategory, setActiveSubcategory] = useState<string>('All');
    const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
    const [selectedProductForQuote, setSelectedProductForQuote] = useState('');
    const [selectedProductImage, setSelectedProductImage] = useState('');
    const [selectedProductSpecs, setSelectedProductSpecs] = useState<Product['specs'] | null>(null);
    const [modalMode, setModalMode] = useState<'quote' | 'callback'>('quote');
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const [galleryImages, setGalleryImages] = useState<string[]>([]);
    const [isNavbarHidden, setIsNavbarHidden] = useState(false);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 12; // 3 columns x 4 rows
    const heroRef = useRef(null);
    const { scrollY } = useScroll();
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

    useMotionValueEvent(scrollY, "change", (latest: number) => {
        const previous = scrollY.getPrevious() || 0;
        if (latest > previous && latest > 150) {
            setIsNavbarHidden(true);
        } else {
            setIsNavbarHidden(false);
        }
    });

    const filteredProducts = useMemo(() => {
        setCurrentPage(1); // Reset to page 1 when filters change
        return products.filter(p => {
            const brandMatch = p.brand === activeBrand;
            const categoryMatch = activeCategory === 'All' || p.category === activeCategory;
            const subMatch = activeSubcategory === 'All' || p.subcategory === activeSubcategory;
            return brandMatch && categoryMatch && subMatch;
        });
    }, [activeBrand, activeCategory, activeSubcategory]);

    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const paginatedProducts = useMemo(() => {
        if (activeBrand !== 'usynq' || viewMode !== 'grid') return filteredProducts;
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredProducts, currentPage, activeBrand, viewMode]);

    const PaginationControls = () => {
        if (activeBrand !== 'usynq' || viewMode !== 'grid' || totalPages <= 1) return null;
        return (
            <div className={styles.paginationControls} style={{ display: 'none' }}>
                <button
                    className={styles.paginationBtn}
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                >
                    ← Previous
                </button>
                <div className={styles.paginationPages}>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                            key={page}
                            className={`${styles.paginationPageBtn} ${currentPage === page ? styles.paginationActive : ''}`}
                            onClick={() => setCurrentPage(page)}
                        >
                            {page}
                        </button>
                    ))}
                </div>
                <button
                    className={styles.paginationBtn}
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                >
                    Next →
                </button>
            </div>
        );
    };

    const categories = activeBrand === 'uryze'
        ? ['All', 'Residential', 'Commercial']
        : ['All', ...usynqCategories.map(c => c.id)];

    const subcategories = useMemo(() => {
        if (activeBrand === 'uryze' && activeCategory === 'All') return [];
        return Array.from(new Set(
            products
                .filter(p => p.brand === activeBrand && (activeCategory === 'All' || p.category === activeCategory))
                .map(p => p.subcategory)
        ));
    }, [activeBrand, activeCategory]);

    const groupedProducts = useMemo(() => {
        const groups: { [key: string]: Product[] } = {};
        filteredProducts.forEach(p => {
            if (!groups[p.subcategory]) groups[p.subcategory] = [];
            groups[p.subcategory].push(p);
        });
        return groups;
    }, [filteredProducts]);

    const groupOrder = activeBrand === 'uryze'
        ? ['MR Traction', 'Machine-Room-Less (MRL) Traction', 'Hydraulic Lifts', 'Dumbwaiter Lift']
        : Array.from(new Set(products.filter(p => p.brand === activeBrand).map(p => p.subcategory)));

    const openQuoteModal = (product: Product, mode: 'quote' | 'callback' = 'quote') => {
        setSelectedProductForQuote(product.name);
        setSelectedProductImage(product.image);
        setSelectedProductSpecs(product.specs);
        setModalMode(mode);
        setIsQuoteModalOpen(true);
    };

    const openGallery = (product: Product) => {
        setGalleryImages(product.images);
        setSelectedProductForQuote(product.name);
        setSelectedProductSpecs(product.specs); // Reuse existing specs state
        setIsGalleryOpen(true);
    };

    return (
        <div className={styles.shopContainer}>
            <div className={styles.brandHero} ref={heroRef}>
                <motion.div
                    className={styles.parallaxBg}
                    style={{ y }}
                >
                    <Image
                        src={activeBrand === 'uryze' ? '/images/uryze_banner.png' : '/images/usynq_banner.png'}
                        alt={activeBrand === 'uryze' ? 'uRYZE' : 'uSYNQ'}
                        fill
                        priority
                        className={styles.heroImage}
                    />
                    <div className={styles.heroOverlay} />
                </motion.div>
                <div className={styles.heroContent}>
                    <h1>{activeBrand === 'uryze' ? 'uRYZE Elevators' : 'uSYNQ Smart Home Products'}</h1>
                </div>
            </div>

            <div className={styles.shopContent}>
                {activeBrand === 'usynq' && (
                    <div className={styles.usynqCategoryIconBar} style={{ top: isNavbarHidden ? '0px' : '80px', display: 'none' }}>
                        <div className={styles.barHeaderRow}>
                            <div className={styles.filterGroup}>
                                <div className={styles.labelGroup}>
                                    <span className={styles.filterLabel}>Category</span>
                                    <button
                                        className={`${styles.allFilterBtn} ${activeCategory === 'All' ? styles.active : ''}`}
                                        onClick={() => setActiveCategory('All')}
                                    >
                                        ALL
                                    </button>
                                </div>
                                <div className={styles.iconContainer}>
                                    {usynqCategories.map(cat => (
                                        <button
                                            key={cat.id}
                                            className={`${styles.iconItem} ${activeCategory === cat.id ? styles.active : ''}`}
                                            onClick={() => setActiveCategory(cat.id)}
                                        >
                                            <div className={styles.iconImageWrapper}>
                                                <Image src={cat.icon} alt={cat.name} fill />
                                            </div>
                                            <span>{cat.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className={styles.resultsCount}>
                                Showing {filteredProducts.length} results
                            </div>
                        </div>
                    </div>
                )}

                <div
                    className={activeBrand === 'usynq' ? styles.usynqFilterSortBar : styles.filterBar}
                    style={activeBrand === 'uryze' ? { top: isNavbarHidden ? '0px' : '80px', display: 'none' } : {}}
                >
                    <div className={styles.barHeaderRow}>
                        {activeBrand === 'uryze' ? (
                            <>

                                <div className={styles.filterGroup} style={{ display: activeBrand === 'uryze' ? 'none' : 'flex' }}>
                                    <span className={styles.filterLabel}>Category</span>
                                    <div className={styles.filterOptions}>
                                        {categories.map(cat => (
                                            <button
                                                key={cat}
                                                className={`${styles.filterBtn} ${activeCategory === cat ? styles.active : ''}`}
                                                onClick={() => {
                                                    setActiveCategory(cat);
                                                    setActiveSubcategory('All');
                                                }}
                                            >
                                                {cat}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {activeCategory !== 'All' && subcategories.length > 0 && (
                                    <div className={styles.filterGroup} style={{ display: activeBrand === 'uryze' ? 'none' : 'flex' }}>
                                        <span className={styles.filterLabel}>Type</span>
                                        <div className={styles.filterOptions}>
                                            <button
                                                className={`${styles.filterBtn} ${activeSubcategory === 'All' ? styles.active : ''}`}
                                                onClick={() => setActiveSubcategory('All')}
                                            >
                                                All
                                            </button>
                                            {subcategories.map(sub => (
                                                <button
                                                    key={sub}
                                                    className={`${styles.filterBtn} ${activeSubcategory === sub ? styles.active : ''}`}
                                                    onClick={() => setActiveSubcategory(sub)}
                                                >
                                                    {sub}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className={styles.usynqSecondaryFilterBar} style={{ display: 'none' }}>
                                <div className={styles.leftFilterActions}>
                                    <span className={styles.itemCount}>
                                        {activeCategory === 'All' ? 'All Products' : activeCategory} - {filteredProducts.length} items
                                    </span>
                                </div>
                                <div className={styles.rightFilterActions}>
                                    <div className={styles.sortDropdown}>
                                        <span>Sort By :</span>
                                        <select>
                                            <option>Featured</option>
                                            <option>Price: Low to High</option>
                                            <option>Price: High to Low</option>
                                        </select>
                                    </div>
                                    <div className={styles.viewToggles}>
                                        <button
                                            className={`${styles.viewToggleBtn} ${viewMode === 'grid' ? styles.active : ''}`}
                                            title="Grid View"
                                            onClick={() => setViewMode('grid')}
                                        >
                                            <div className={styles.gridIconGrid} />
                                        </button>
                                        <button
                                            className={`${styles.viewToggleBtn} ${viewMode === 'list' ? styles.active : ''}`}
                                            title="List View"
                                            onClick={() => setViewMode('list')}
                                        >
                                            <div className={styles.listIconGrid} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Pagination - Top */}
                <PaginationControls />

                {/* Main List */}
                <main className={styles.productMain}>
                    {activeBrand === 'usynq' && viewMode === 'list' && (
                        <div className={styles.usynqTableHeader} style={{ display: 'none' }}>
                            <div className={styles.colImage}>Image</div>
                            <div className={styles.colProduct}>Product</div>
                            <div className={styles.colPrice}>Price</div>
                            <div className={styles.colQuantity}>Quantity</div>
                        </div>
                    )}
                    <div className={styles.productListWrapper}>
                        <div style={{ minHeight: '40vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '40px 20px', width: '100%' }}>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                style={{ fontSize: '3rem', fontWeight: 300, color: 'var(--text-primary, #111)', marginBottom: '1rem' }}
                            >
                                Launching Soon
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                style={{ fontSize: '1.2rem', color: 'var(--text-secondary, #666)', maxWidth: '600px' }}
                            >
                                {activeBrand === 'uryze'
                                    ? 'Our premium uRYZE elevator collection is currently being prepared for launch. Stay tuned for updates.'
                                    : 'Our premium uSYNQ smart home collection is currently being prepared for launch. Stay tuned for updates.'}
                            </motion.p>
                        </div>

                        {/* uSYNQ Grid View: flat paginated list */}
                        {activeBrand === 'usynq' && viewMode === 'grid' ? (
                            <div className={styles.usynqGridWrapper} style={{ display: 'none' }}>
                                {paginatedProducts.map(product => (
                                    <motion.div
                                        key={product.id}
                                        layout
                                        className={styles.usynqGridCard}
                                    >
                                        <div className={styles.gridImageContainer}>
                                            <Image src={product.image} alt={product.name} fill />
                                        </div>
                                        <div className={styles.gridContent}>
                                            <h3 className={styles.gridProductName}>{product.name}</h3>
                                            <div className={styles.gridPriceContainer}>
                                                <span className={styles.gridPriceLabel}>Retail Price:</span>
                                                <span className={styles.gridPriceValue}>₹ 3,379.00</span>
                                            </div>
                                            <div className={styles.gridButtonGroup}>
                                                <button className={styles.gridAddToCartBtn}>
                                                    Add to Cart
                                                </button>
                                                <button className={styles.gridEnquireBtn}>
                                                    Enquire Now
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            /* uRYZE / uSYNQ List View: grouped by subcategory */
                            <div style={{ display: 'none', width: '100%' }}>
                                {groupOrder.map(subTitle => {
                                    const group = groupedProducts[subTitle];
                                    if (!group || group.length === 0) return null;

                                    const containerClass = activeBrand === 'uryze'
                                        ? styles.listContainer
                                        : styles.usynqRowContainer;

                                    return (
                                        <section key={subTitle} className={styles.productGroup}>
                                            <div className={containerClass}>
                                                {group.map(product => (
                                                    activeBrand === 'uryze' ? (
                                                        <motion.div
                                                            key={product.id}
                                                            layout
                                                            initial={{ opacity: 0, x: -20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            className={styles.horizontalCard}
                                                        >
                                                            <div className={styles.imageCol}>
                                                                <div className={styles.imageWrapperFixed}>
                                                                    <Image
                                                                        src={product.image}
                                                                        alt={product.name}
                                                                        fill
                                                                        className={styles.productImage}
                                                                    />
                                                                    <button
                                                                        className={styles.viewGalleryBtn}
                                                                        onClick={() => openGallery(product)}
                                                                        title="View Images"
                                                                    >
                                                                        <Maximize2 size={20} />
                                                                        <span>View Gallery</span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <div className={styles.contentCol}>
                                                                <div className={styles.cardInfo}>
                                                                    <div className={styles.cardTop}>
                                                                        <h3>{product.name}</h3>
                                                                    </div>
                                                                    <p className={styles.description}>{product.description}</p>

                                                                    <div className={styles.specsGrid}>
                                                                        <div className={styles.specItem}>
                                                                            <span className={styles.specLabel}>Capacity</span>
                                                                            <span className={styles.specValue}>{product.specs.capacity}</span>
                                                                        </div>
                                                                        <div className={styles.specItem}>
                                                                            <span className={styles.specLabel}>Max Load</span>
                                                                            <span className={styles.specValue}>{product.specs.maxLoad}</span>
                                                                        </div>
                                                                        <div className={styles.specItem}>
                                                                            <span className={styles.specLabel}>Max Rise</span>
                                                                            <span className={styles.specValue}>{product.specs.maxRise}</span>
                                                                        </div>
                                                                        <div className={styles.specItem}>
                                                                            <span className={styles.specLabel}>Max Speed</span>
                                                                            <span className={styles.specValue}>{product.specs.maxSpeed}</span>
                                                                        </div>
                                                                        <div className={styles.specItem}>
                                                                            <span className={styles.specLabel}>Drive Type</span>
                                                                            <span className={styles.specValue}>{product.specs.driveType}</span>
                                                                        </div>
                                                                        <div className={styles.specItem}>
                                                                            <span className={styles.specLabel}>Door Style</span>
                                                                            <span className={styles.specValue}>{product.specs.doorStyle}</span>
                                                                        </div>
                                                                        <div className={styles.specItem}>
                                                                            <span className={styles.specLabel}>Material</span>
                                                                            <span className={styles.specValue}>{product.specs.material}</span>
                                                                        </div>
                                                                    </div>

                                                                    <div className={styles.cardBottom}>
                                                                        <div className={styles.cardActions}>
                                                                            <button
                                                                                className={styles.callbackBtn}
                                                                                onClick={() => openQuoteModal(product, 'callback')}
                                                                            >
                                                                                Request Call Back
                                                                            </button>
                                                                            <button
                                                                                className={styles.viewSpecs}
                                                                                onClick={() => openQuoteModal(product, 'quote')}
                                                                            >
                                                                                Get Quote
                                                                                <ArrowRight size={16} />
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    ) : (
                                                        <motion.div
                                                            key={product.id}
                                                            layout
                                                            className={styles.usynqRow}
                                                        >
                                                            <div className={styles.usynqColImage}>
                                                                <div className={styles.usynqImageWrapper}>
                                                                    <Image src={product.image} alt={product.name} fill />
                                                                </div>
                                                            </div>
                                                            <div className={styles.usynqColProduct}>
                                                                <h3 className={styles.usynqProductName}>{product.name}</h3>
                                                            </div>
                                                            <div className={styles.usynqColPrice}>
                                                                <span className={styles.priceLabel}>Retail Price:</span>
                                                                <span className={styles.priceValue}>₹ 3,379.00</span>
                                                            </div>
                                                            <div className={styles.usynqColQuantity}>
                                                                <div className={styles.quantityControls}>
                                                                    <button className={styles.qtyBtn}>-</button>
                                                                    <input type="text" value="0" readOnly />
                                                                    <button className={styles.qtyBtn}>+</button>
                                                                </div>
                                                                <button className={styles.addToCartBtn}>
                                                                    <ArrowRight size={18} />
                                                                </button>
                                                            </div>
                                                        </motion.div>
                                                    )
                                                ))}
                                            </div>
                                        </section>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </main>

                {/* Pagination - Bottom */}
                <PaginationControls />


                <QuoteModal
                    isOpen={isQuoteModalOpen}
                    onClose={() => setIsQuoteModalOpen(false)}
                    productName={selectedProductForQuote}
                    productImage={selectedProductImage}
                    specs={selectedProductSpecs}
                    mode={modalMode}
                />

                <ImageGallery
                    isOpen={isGalleryOpen}
                    onClose={() => setIsGalleryOpen(false)}
                    images={galleryImages}
                    productName={selectedProductForQuote}
                    specs={selectedProductSpecs}
                />
            </div>
        </div>
    );
}
