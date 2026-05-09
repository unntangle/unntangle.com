'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import styles from './UsynqSelect.module.css';

export interface UsynqSelectOption {
    /** The value stored in form state. */
    value: string;
    /** The visible label. */
    label: string;
}

interface UsynqSelectProps {
    /** Currently selected value. Empty string = nothing selected (placeholder shown). */
    value: string;
    onChange: (next: string) => void;
    options: UsynqSelectOption[];
    /** Shown when no value is selected. Also acts as the "clear" option in the panel. */
    placeholder?: string;
    id?: string;
    /** Disabled while the form submits. */
    disabled?: boolean;
}

/**
 * Themed single-select dropdown.
 *
 * Native <select> opens an OS-rendered panel that CSS can't style — that
 * panel uses the system's blue highlight which clashes with our design.
 * This component renders a custom panel using normal DOM, so the entire
 * UI honours the theme.
 */
export default function UsynqSelect({
    value,
    onChange,
    options,
    placeholder = 'Select an option',
    id,
    disabled = false,
}: UsynqSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Find the selected option's label so the trigger shows it.
    const selectedOption = options.find((o) => o.value === value);

    // Close on outside click and Escape.
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
            if (e.key === 'Escape') setIsOpen(false);
        };

        document.addEventListener('mousedown', onPointerDown);
        document.addEventListener('keydown', onKeyDown);

        return () => {
            document.removeEventListener('mousedown', onPointerDown);
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen]);

    const handleSelect = (optionValue: string) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    return (
        <div className={styles.wrapper} ref={wrapperRef}>
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
                        selectedOption ? styles.triggerValue : styles.triggerPlaceholder
                    }
                >
                    {selectedOption?.label ?? placeholder}
                </span>
                <ChevronDown size={16} className={styles.triggerChevron} />
            </button>

            {isOpen && (
                <div className={styles.panel} role="listbox">
                    {options.map((opt) => {
                        const selected = opt.value === value;
                        return (
                            <button
                                type="button"
                                key={opt.value || '__placeholder'}
                                className={`${styles.option} ${selected ? styles.optionSelected : ''}`}
                                onClick={() => handleSelect(opt.value)}
                                role="option"
                                aria-selected={selected}
                            >
                                <span className={styles.optionLabel}>{opt.label}</span>
                                {selected && (
                                    <Check
                                        size={14}
                                        strokeWidth={2.5}
                                        className={styles.optionCheck}
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
