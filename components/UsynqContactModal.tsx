'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, CheckCircle2 } from 'lucide-react';
import UsynqProductMultiSelect from './UsynqProductMultiSelect';
import UsynqSelect from './UsynqSelect';
import styles from './UsynqContactModal.module.css';

interface UsynqContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface FormState {
    name: string;
    email: string;
    phone: string;
    projectType: string;
    productInterest: string[];
    city: string;
    message: string;
}

const initialFormState: FormState = {
    name: '',
    email: '',
    phone: '',
    projectType: '',
    productInterest: [],
    city: '',
    message: '',
};

const projectTypes = [
    { value: 'new-home', label: 'New home / apartment' },
    { value: 'villa', label: 'Villa' },
    { value: 'renovation', label: 'Renovation' },
    { value: 'office', label: 'Office / commercial' },
    { value: 'other', label: 'Other' },
];

export default function UsynqContactModal({ isOpen, onClose }: UsynqContactModalProps) {
    const [formData, setFormData] = useState<FormState>(initialFormState);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Stable IDs for label/input pairing (avoids hydration mismatches)
    const titleId = useId();
    const firstFieldRef = useRef<HTMLInputElement>(null);

    // Lock body scroll while open + close on Escape
    useEffect(() => {
        if (!isOpen) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', onKeyDown);

        // Auto-focus the first field when the modal opens
        const focusTimer = setTimeout(() => {
            firstFieldRef.current?.focus();
        }, 100);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', onKeyDown);
            clearTimeout(focusTimer);
        };
    }, [isOpen, onClose]);

    // Reset form/submit state when the modal is closed
    useEffect(() => {
        if (!isOpen) {
            // Small delay so the user doesn't see the form reset mid-close-animation
            const t = setTimeout(() => {
                setFormData(initialFormState);
                setIsSubmitted(false);
                setIsSubmitting(false);
            }, 300);
            return () => clearTimeout(t);
        }
    }, [isOpen]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        // TODO: replace with real submit endpoint (e.g. Formspree / API route).
        // For now, simulate a network round-trip so the UX is realistic.
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Log the submission so you can see the data flow during dev work.
        // Remove this once a backend is wired up.
        console.log('[uSYNQ enquiry]', formData);

        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className={styles.backdrop}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={onClose}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby={titleId}
                >
                    <motion.div
                        className={styles.modal}
                        initial={{ opacity: 0, scale: 0.96, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 20 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
                        // Stop clicks inside the modal from propagating to the
                        // backdrop and closing it.
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            className={styles.closeButton}
                            onClick={onClose}
                            aria-label="Close"
                        >
                            <X size={18} />
                        </button>

                        {/* LEFT PANE — image with overlay text. Hidden on mobile.
                            Image: high-res Unsplash photo, woman in modern interior. */}
                        <div className={styles.imagePane}>
                            <div className={styles.imagePaneEyebrow}>
                                <span className={styles.imagePaneEyebrowDot}></span>
                                Smart Living by <span className={styles.brandName}>uSYNQ</span>
                            </div>
                            <h3 className={styles.imagePaneQuote}>
                                Your home, designed around how you live.
                            </h3>
                            <p className={styles.imagePaneCaption}>
                                From a single touch panel to a fully integrated villa,
                                our team will help you build it right the first time.
                            </p>
                        </div>

                        {/* RIGHT PANE — form */}
                        <div className={styles.formPane}>
                            {isSubmitted ? (
                                <div className={styles.successState}>
                                    <div className={styles.successIcon}>
                                        <CheckCircle2 size={32} strokeWidth={2} />
                                    </div>
                                    <h2 className={styles.successTitle}>Thanks, we'll be in touch.</h2>
                                    <p className={styles.successMessage}>
                                        Your enquiry is in. Our team will reach out within one business day
                                        with tailored recommendations for your project.
                                    </p>
                                    <button
                                        type="button"
                                        className={styles.successButton}
                                        onClick={onClose}
                                    >
                                        Close
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <h2 id={titleId} className={styles.title}>
                                        Talk to our team
                                    </h2>
                                    <p className={styles.subtitle}>
                                        Tell us a bit about your project and we'll help you pick the right
                                        uSYNQ panels, locks, and modules for your space.
                                    </p>

                                <form className={styles.form} onSubmit={handleSubmit}>
                                    <div className={`${styles.inputGroup} ${styles.inputGroupFull}`}>
                                        <label htmlFor="usynq-name" className={styles.label}>
                                            Full name <span className={styles.required}>*</span>
                                        </label>
                                        <input
                                            ref={firstFieldRef}
                                            id="usynq-name"
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Your name"
                                            required
                                            className={styles.input}
                                        />
                                    </div>

                                    <div className={styles.inputGroup}>
                                        <label htmlFor="usynq-email" className={styles.label}>
                                            Email <span className={styles.required}>*</span>
                                        </label>
                                        <input
                                            id="usynq-email"
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="you@example.com"
                                            required
                                            className={styles.input}
                                        />
                                    </div>

                                    <div className={styles.inputGroup}>
                                        <label htmlFor="usynq-phone" className={styles.label}>
                                            Phone <span className={styles.required}>*</span>
                                        </label>
                                        <input
                                            id="usynq-phone"
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+91 98765 43210"
                                            required
                                            className={styles.input}
                                        />
                                    </div>

                                    <div className={styles.inputGroup}>
                                        <label htmlFor="usynq-project" className={styles.label}>
                                            Project type
                                        </label>
                                        <UsynqSelect
                                            id="usynq-project"
                                            value={formData.projectType}
                                            onChange={(next) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    projectType: next,
                                                }))
                                            }
                                            options={projectTypes}
                                            placeholder="Select project type"
                                            disabled={isSubmitting}
                                        />
                                    </div>

                                    <div className={styles.inputGroup}>
                                        <label htmlFor="usynq-city" className={styles.label}>
                                            City
                                        </label>
                                        <input
                                            id="usynq-city"
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            placeholder="Chennai, Bengaluru, etc."
                                            className={styles.input}
                                        />
                                    </div>

                                    {/*
                                      * Product interest — multi-select with chips, search,
                                      * and category-grouped checkbox panel. Native
                                      * <select multiple> was rejected because Ctrl/Cmd+click
                                      * is undiscoverable and the mobile UX is broken.
                                      */}
                                    <div className={`${styles.inputGroup} ${styles.inputGroupFull}`}>
                                        <label htmlFor="usynq-product" className={styles.label}>
                                            Products of interest
                                        </label>
                                        <UsynqProductMultiSelect
                                            id="usynq-product"
                                            value={formData.productInterest}
                                            onChange={(next) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    productInterest: next,
                                                }))
                                            }
                                            disabled={isSubmitting}
                                        />
                                    </div>

                                    <div className={`${styles.inputGroup} ${styles.inputGroupFull}`}>
                                        <label htmlFor="usynq-message" className={styles.label}>
                                            Tell us about your project <span className={styles.required}>*</span>
                                        </label>
                                        <textarea
                                            id="usynq-message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="What are you building? Number of rooms, current stage, anything specific you're looking for..."
                                            required
                                            rows={4}
                                            className={styles.textarea}
                                        />
                                    </div>

                                    <div className={styles.submitRow}>
                                        <p className={styles.privacyNote}>
                                            We'll only use your details to respond to this enquiry.
                                        </p>
                                        <button
                                            type="submit"
                                            className={styles.submitButton}
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                'Sending...'
                                            ) : (
                                                <>
                                                    Send enquiry
                                                    <Send size={15} />
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                                </>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
