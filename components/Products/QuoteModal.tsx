'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, Phone, Mail, Package } from 'lucide-react';
import { useState } from 'react';
import styles from './QuoteModal.module.css';

interface QuoteModalProps {
    isOpen: boolean;
    onClose: () => void;
    productName: string;
    productImage: string;
    mode?: 'quote' | 'callback';
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

export default function QuoteModal({ isOpen, onClose, productName, productImage, specs, mode = 'quote' }: QuoteModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, ''); // Remove non-digits
        if (value.length <= 10) {
            setPhoneNumber(value);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (phoneNumber.length !== 10) return;

        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setIsSuccess(true);
        setTimeout(() => {
            setIsSuccess(false);
            onClose();
        }, 2000);
    };

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
                        className={`${styles.modal} ${mode === 'callback' ? styles.compact : ''}`}
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", duration: 0.5 }}
                    >


                        {!isSuccess ? (
                            <div className={`${styles.modalContent} ${mode === 'callback' ? styles.compact : ''}`}>
                                <div className={styles.formSection}>
                                    <div className={styles.header}>
                                        <h2>{mode === 'quote' ? 'Request a Quote' : 'Request a Call Back'}</h2>
                                    </div>

                                    {mode === 'callback' && (
                                        <div className={styles.selectedProduct}>
                                            <label>Selected Product</label>
                                            <h3>{productName}</h3>
                                        </div>
                                    )}

                                    {mode === 'quote' && specs && (
                                        <div className={styles.specsHeader}>
                                            <label>Selected Product</label>
                                            <h3>{productName}</h3>
                                        </div>
                                    )}

                                    {mode === 'quote' && specs && (
                                        <div className={styles.miniSpecs}>
                                            <div className={styles.miniSpecItem}>
                                                <span>Capacity</span>
                                                <strong>{specs.capacity}</strong>
                                            </div>
                                            <div className={styles.miniSpecItem}>
                                                <span>Max Load</span>
                                                <strong>{specs.maxLoad}</strong>
                                            </div>
                                            <div className={styles.miniSpecItem}>
                                                <span>Max Rise</span>
                                                <strong>{specs.maxRise}</strong>
                                            </div>
                                            <div className={styles.miniSpecItem}>
                                                <span>Max Speed</span>
                                                <strong>{specs.maxSpeed}</strong>
                                            </div>
                                        </div>
                                    )}

                                    <form className={styles.form} onSubmit={handleSubmit}>
                                        <div className={styles.inputGroup}>
                                            <label>Full Name</label>
                                            <div className={styles.inputWrapper}>
                                                <User size={18} className={styles.inputIcon} />
                                                <input
                                                    type="text"
                                                    placeholder="John Doe"
                                                    value={fullName}
                                                    onChange={(e) => setFullName(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className={styles.inputGroup}>
                                            <label>Mobile Number</label>
                                            <div className={styles.inputWrapper}>
                                                <span className={styles.prefix}>+91</span>
                                                <input
                                                    type="tel"
                                                    placeholder="98765 43210"
                                                    value={phoneNumber}
                                                    onChange={handlePhoneChange}
                                                    required
                                                    className={styles.phoneInput}
                                                />
                                            </div>
                                        </div>

                                        {mode === 'quote' && (
                                            <div className={styles.inputGroup}>
                                                <label>Email ID</label>
                                                <div className={styles.inputWrapper}>
                                                    <Mail size={18} className={styles.inputIcon} />
                                                    <input
                                                        type="email"
                                                        placeholder="john@example.com"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            className={styles.submitButton}
                                            disabled={isSubmitting || phoneNumber.length !== 10 || !fullName.trim() || (mode === 'quote' && !email.trim())}
                                        >
                                            {isSubmitting ? (
                                                "Sending..."
                                            ) : (
                                                <>
                                                    <span>{mode === 'quote' ? 'Get My Quote' : 'Request Call Back'}</span>
                                                    <Send size={18} />
                                                </>
                                            )}
                                        </button>
                                    </form>

                                    {mode === 'quote' && specs && (
                                        <div className={styles.technicalFooter}>
                                            <div className={styles.techLabel}>Additional Specs</div>
                                            <p>{specs.driveType} • {specs.doorStyle} • {specs.material}</p>
                                        </div>
                                    )}
                                </div>

                                {mode === 'quote' && (
                                    <div className={styles.imageSection}>
                                        <img src={productImage} alt={productName} className={styles.fullImage} />
                                        <div className={styles.imageOverlay}>
                                            <h3>{productName}</h3>
                                            {specs && <span>{specs.capacity} Capacity</span>}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <motion.div
                                className={styles.success}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                <div className={styles.successIcon}>
                                    <Send size={40} />
                                </div>
                                <h3>Request Sent!</h3>
                                <p>Our team will contact you shortly regarding <strong>{productName}</strong>.</p>
                            </motion.div>
                        )}

                        <button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
                            <X size={20} />
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
