'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, ChevronDown, Search, X } from 'lucide-react';
import { usynqCategories, usynqProducts } from '@/data/usynqProducts';
import styles from './UsynqProductMultiSelect.module.css';

interface UsynqProductMultiSelectProps {
    /** Selected product IDs. */
    value: string[];
    onChange: (next: string[]) => void;
    id?: string;
    /** Inputs disabled while the form submits. */
    disabled?: boolean;
}

export default function UsynqProductMultiSelect({
    value,
    onChange,
    id,
    disabled = false,
}: UsynqProductMultiSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const wrapperRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Build a lookup by id so chips can render the product name without
    // re-scanning the whole list every render.
    const productMap = useMemo(() => {
        const map = new Map<string, { name: string; sku?: string }>();
        usynqProducts.forEach((p) => map.set(p.id, { name: p.name, sku: p.sku }));
        return map;
    }, []);

    // Filter products by search query (case-insensitive, matches name or SKU).
    const filteredByCategory = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        return usynqCategories
            .map((cat) => ({
                category: cat,
                items: usynqProducts.filter((p) => {
                    if (p.category !== cat.id) return false;
                    if (!q) return true;
                    return (
                        p.name.toLowerCase().includes(q) ||
                        (p.sku?.toLowerCase().includes(q) ?? false)
                    );
                }),
            }))
            .filter((g) => g.items.length > 0);
    }, [searchQuery]);

    const totalMatches = filteredByCategory.reduce((acc, g) => acc + g.items.length, 0);

    // Close on outside click and Escape
    useEffect(() => {
        if (!isOpen) return;

        const onPointerDown = (e: MouseEvent) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(e.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', onPointerDown);
        document.addEventListener('keydown', onKeyDown);

        // Auto-focus the search input when the panel opens
        const focusTimer = setTimeout(() => searchInputRef.current?.focus(), 50);

        return () => {
            document.removeEventListener('mousedown', onPointerDown);
            document.removeEventListener('keydown', onKeyDown);
            clearTimeout(focusTimer);
        };
    }, [isOpen]);

    const toggleProduct = (productId: string) => {
        if (value.includes(productId)) {
            onChange(value.filter((v) => v !== productId));
        } else {
            onChange([...value, productId]);
        }
    };

    const clearAll = () => onChange([]);

    // Trigger label depends on selection count
    const triggerLabel = (() => {
        if (value.length === 0) return 'Select products (optional)';
        if (value.length === 1) {
            const item = productMap.get(value[0]);
            return item?.name ?? '1 product selected';
        }
        return `${value.length} products selected`;
    })();

    return (
        <div className={styles.wrapper} ref={wrapperRef}>
            {/* Selected chips above the trigger (only when there are
                multiple selections — single selection is shown in the trigger label) */}
            {value.length > 1 && (
                <div className={styles.chips}>
                    {value.map((productId) => {
                        const item = productMap.get(productId);
                        if (!item) return null;
                        return (
                            <span key={productId} className={styles.chip}>
                                <span className={styles.chipLabel}>
                                    {item.sku ? `${item.sku} ` : ''}
                                    {item.name}
                                </span>
                                <button
                                    type="button"
                                    className={styles.chipRemove}
                                    onClick={() => toggleProduct(productId)}
                                    aria-label={`Remove ${item.name}`}
                                    disabled={disabled}
                                >
                                    <X size={11} strokeWidth={2.5} />
                                </button>
                            </span>
                        );
                    })}
                </div>
            )}

            {/* Trigger button */}
            <button
                type="button"
                id={id}
                className={`${styles.trigger} ${isOpen ? styles.triggerOpen : ''}`}
                onClick={() => !disabled && setIsOpen((v) => !v)}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                disabled={disabled}
            >
                <span
                    className={
                        value.length === 0 ? styles.triggerPlaceholder : styles.triggerValue
                    }
                >
                    {triggerLabel}
                </span>
                <ChevronDown size={16} className={styles.triggerChevron} />
            </button>

            {/* Panel — search + categorised checkbox list */}
            {isOpen && (
                <div className={styles.panel} role="listbox" aria-multiselectable="true">
                    <div className={styles.searchWrap}>
                        <Search size={14} className={styles.searchIcon} />
                        <input
                            ref={searchInputRef}
                            type="text"
                            className={styles.searchInput}
                            placeholder="Search products or SKU..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {value.length > 0 && (
                        <div className={styles.actionsBar}>
                            <span className={styles.actionsCount}>
                                {value.length} selected
                            </span>
                            <button
                                type="button"
                                className={styles.actionsClear}
                                onClick={clearAll}
                            >
                                Clear all
                            </button>
                        </div>
                    )}

                    <div className={styles.list}>
                        {totalMatches === 0 ? (
                            <div className={styles.empty}>
                                No products match &ldquo;{searchQuery}&rdquo;
                            </div>
                        ) : (
                            filteredByCategory.map(({ category, items }) => (
                                <div key={category.id}>
                                    <div className={styles.groupHeader}>{category.label}</div>
                                    {items.map((product) => {
                                        const checked = value.includes(product.id);
                                        return (
                                            <button
                                                type="button"
                                                key={product.id}
                                                className={`${styles.option} ${checked ? styles.optionChecked : ''
                                                    }`}
                                                onClick={() => toggleProduct(product.id)}
                                                role="option"
                                                aria-selected={checked}
                                            >
                                                <span className={styles.checkbox}>
                                                    {checked && <Check size={11} strokeWidth={3} />}
                                                </span>
                                                <span className={styles.optionLabel}>
                                                    {product.sku && (
                                                        <span className={styles.optionSku}>
                                                            {product.sku}
                                                        </span>
                                                    )}
                                                    {product.name}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
