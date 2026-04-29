'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useState, useMemo, useRef, useEffect } from 'react';
import { blogsData } from '@/data/blogs';
import styles from './BlogGrid.module.css';

const CATEGORIES = ['All', 'Technology Solutions', 'Creative Design', 'Growth Marketing'];
const POSTS_PER_PAGE = 6;

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    if (totalPages <= 1) return null;

    // Build a compact page list with ellipses for long runs
    const getPageNumbers = (): (number | 'ellipsis')[] => {
        const pages: (number | 'ellipsis')[] = [];
        const showAround = 1; // pages to show on each side of current
        const totalToShow = showAround * 2 + 5;

        if (totalPages <= totalToShow) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
            return pages;
        }

        pages.push(1);
        if (currentPage > showAround + 2) pages.push('ellipsis');

        const start = Math.max(2, currentPage - showAround);
        const end = Math.min(totalPages - 1, currentPage + showAround);
        for (let i = start; i <= end; i++) pages.push(i);

        if (currentPage < totalPages - showAround - 1) pages.push('ellipsis');
        pages.push(totalPages);
        return pages;
    };

    return (
        <div className={styles.pagination} role="navigation" aria-label="Blog pagination">
            <button
                className={`${styles.pageBtn} ${styles.pageNav}`}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
            >
                <ChevronLeft size={16} />
                <span>Previous</span>
            </button>

            <div className={styles.pageNumbers}>
                {getPageNumbers().map((page, idx) =>
                    page === 'ellipsis' ? (
                        <span key={`ellipsis-${idx}`} className={styles.pageEllipsis}>…</span>
                    ) : (
                        <button
                            key={page}
                            className={`${styles.pageBtn} ${currentPage === page ? styles.pageBtnActive : ''}`}
                            onClick={() => onPageChange(page)}
                            aria-current={currentPage === page ? 'page' : undefined}
                            aria-label={`Page ${page}`}
                        >
                            {page}
                        </button>
                    )
                )}
            </div>

            <button
                className={`${styles.pageBtn} ${styles.pageNav}`}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
            >
                <span>Next</span>
                <ChevronRight size={16} />
            </button>
        </div>
    );
}

export default function BlogGrid() {
    const [activeCategory, setActiveCategory] = useState<string>('All');
    const [isOpen, setIsOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    const filteredPosts = useMemo(() => {
        const sorted = [...blogsData].sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        if (activeCategory === 'All') return sorted;
        return sorted.filter((post) => post.category === activeCategory);
    }, [activeCategory]);

    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
    const paginatedPosts = useMemo(() => {
        const start = (currentPage - 1) * POSTS_PER_PAGE;
        return filteredPosts.slice(start, start + POSTS_PER_PAGE);
    }, [filteredPosts, currentPage]);

    // Reset to page 1 when category changes
    useEffect(() => {
        setCurrentPage(1);
    }, [activeCategory]);

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (category: string) => {
        setActiveCategory(category);
        setIsOpen(false);
    };

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
        // Smooth scroll to grid top so user sees the new page
        if (gridRef.current) {
            gridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <section className={styles.blogSection}>
            <div className={`container ${styles.container}`}>
                <div className={styles.gridHeader} ref={gridRef}>
                    <div>
                        <h2 className={styles.gridHeading}>Latest articles</h2>
                        <p className={styles.gridSubheading}>
                            Filter by service category to find the playbook you need.
                        </p>
                    </div>

                    <div className={styles.dropdownWrapper} ref={dropdownRef}>
                        <button
                            className={styles.dropdownTrigger}
                            onClick={() => setIsOpen(!isOpen)}
                            aria-haspopup="listbox"
                            aria-expanded={isOpen}
                        >
                            <span className={styles.dropdownLabel}>Category:</span>
                            <span className={styles.dropdownValue}>{activeCategory}</span>
                            <ChevronDown
                                size={18}
                                className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
                            />
                        </button>

                        {isOpen && (
                            <motion.div
                                className={styles.dropdownMenu}
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.15 }}
                                role="listbox"
                            >
                                {CATEGORIES.map((category) => (
                                    <button
                                        key={category}
                                        className={`${styles.dropdownItem} ${activeCategory === category ? styles.dropdownItemActive : ''}`}
                                        onClick={() => handleSelect(category)}
                                        role="option"
                                        aria-selected={activeCategory === category}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Top pagination + result count */}
                <div className={styles.paginationBar}>
                    <span className={styles.resultCount}>
                        Showing <strong>{(currentPage - 1) * POSTS_PER_PAGE + 1}</strong>–
                        <strong>{Math.min(currentPage * POSTS_PER_PAGE, filteredPosts.length)}</strong> of{' '}
                        <strong>{filteredPosts.length}</strong> articles
                    </span>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>

                <div className={styles.grid}>
                    {paginatedPosts.map((post, index) => (
                        <Link href={`/blog/${post.id}`} key={post.id} style={{ textDecoration: 'none' }}>
                            <motion.div
                                className={styles.blogCard}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: (index % 6) * 0.08 }}
                            >
                                <div className={styles.imageContainer}>
                                    <img src={post.image} alt={post.title} className={styles.cardImage} />
                                </div>

                                <div className={styles.content}>
                                    <div className={styles.meta}>
                                        <span className={styles.date}>{post.date}</span>
                                        <span className={styles.dot}>•</span>
                                        <span className={styles.readTime}>{post.readTime}</span>
                                    </div>
                                    <h3 className={styles.cardTitle}>{post.title}</h3>
                                    <p className={styles.cardDescription}>{post.description}</p>

                                    <div className={styles.arrowWrapper}>
                                        <span className={styles.readMore}>Read article</span>
                                        <ArrowRight size={18} className={styles.arrowIcon} />
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>

                {/* Bottom pagination */}
                <div className={`${styles.paginationBar} ${styles.paginationBarBottom}`}>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </section>
    );
}
