'use client';

import { motion } from 'framer-motion';
import { ChevronDown, Globe, Upload, CheckCircle2, Mail, Phone } from 'lucide-react';
import styles from './ContactHero.module.css';
import { useState } from 'react';

export default function ContactHero() {
    const [fileSlot, setFileSlot] = useState<string | null>(null);

    return (
        <section className={styles.heroSection}>
            <div className={styles.bgImageContainer}>
                <img
                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2500&auto=format&fit=crop"
                    alt="Purple and Blue Abstract Background"
                    className={styles.bgImage}
                />
                <div className={styles.bgOverlay} />
            </div>

            <div className={`container ${styles.container}`}>
                <div className={styles.content}>
                    {/* LEFT COLUMN: CONTACT FORM */}
                    <motion.div
                        className={styles.formColumn}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className={styles.formCard}>
                            <h3 className={styles.formTitle}>Share Your Project's Vision</h3>

                            <form className={styles.contactForm}>
                                <div className={styles.inputRow}>
                                    <div className={styles.inputGroup}>
                                        <label>Full Name</label>
                                        <input type="text" placeholder="John Doe" />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label>Work Email*</label>
                                        <input type="email" placeholder="john@company.com" required />
                                    </div>
                                </div>

                                <div className={styles.inputRow}>
                                    <div className={styles.inputGroup}>
                                        <label>Service Interest</label>
                                        <div className={styles.selectWrapper}>
                                            <select defaultValue="">
                                                <option value="" disabled>Select a Solution</option>
                                                <option value="digital">Digital Transformation</option>
                                                <option value="ai">AI & Automation</option>
                                                <option value="cloud">Cloud Architecture</option>
                                                <option value="smart">Smart Living Systems</option>
                                            </select>
                                            <ChevronDown size={14} className={styles.chevron} />
                                        </div>
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label>Budget Range</label>
                                        <div className={styles.selectWrapper}>
                                            <select defaultValue="">
                                                <option value="" disabled>Select Range</option>
                                                <option value="small">Up to $5k</option>
                                                <option value="medium">$5k - $20k</option>
                                                <option value="large">$20k - $50k</option>
                                                <option value="enterprise">$50k+</option>
                                            </select>
                                            <ChevronDown size={14} className={styles.chevron} />
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.inputGroup}>
                                    <label>Briefly describe your requirements...</label>
                                    <textarea placeholder="Tell us what you're looking to build (e.g., custom AI agent, ERP system, etc.)" rows={2} />
                                </div>

                                <div className={styles.inputRow}>
                                    <div className={styles.inputGroup}>
                                        <label>Contact Number*</label>
                                        <div className={styles.phoneInput}>
                                            <div className={styles.countryPicker}>
                                                <img src="https://flagcdn.com/in.svg" alt="IN" width="18" />
                                                <span>+91</span>
                                                <ChevronDown size={12} />
                                            </div>
                                            <input type="tel" placeholder="Phone Number" required />
                                        </div>
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label>Attach PDF/Doc File</label>
                                        <div className={styles.fileUpload}>
                                            <input
                                                type="file"
                                                id="file-upload"
                                                className={styles.hiddenFile}
                                                onChange={(e) => setFileSlot(e.target.files?.[0]?.name || null)}
                                            />
                                            <label htmlFor="file-upload" className={styles.fileLabel}>
                                                <span>{fileSlot || 'Choose File'}</span>
                                                <Upload size={16} />
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.formFooter}>
                                    <button type="submit" className={styles.submitBtn}>
                                        Send Message
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>

                    {/* RIGHT COLUMN: GLASSY DETAILS */}
                    <motion.div
                        className={styles.textColumn}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className={styles.glassPanel}>
                            <h1 className={styles.title}>
                                Elevate Your Digital Frontier <br />
                                With Unntangle
                            </h1>
                            <p className={styles.subtitle}>
                                From bespoke software to autonomous AI agents, we provide the engineering excellence
                                needed to scale your vision.
                            </p>

                            <div className={styles.contactDetails}>
                                <div className={styles.contactItem}>
                                    <div className={styles.itemIcon}><Mail size={18} /></div>
                                    <div className={styles.itemText}>
                                        <span>Email</span>
                                        <p><a href="mailto:info@unntangle.com">info@unntangle.com</a></p>
                                    </div>
                                </div>
                                <div className={styles.contactItem}>
                                    <div className={styles.itemIcon}><Phone size={18} /></div>
                                    <div className={styles.itemText}>
                                        <span>Call Us</span>
                                        <p><a href="tel:+919789058391">+91 97890 58391</a></p>
                                        <p><a href="tel:+916379388462">+91 63793 88462</a></p>
                                    </div>
                                </div>
                                <div className={styles.contactItem}>
                                    <div className={styles.itemIcon}><Globe size={18} /></div>
                                    <div className={styles.itemText}>
                                        <span>Visit Us</span>
                                        <p>
                                            <a
                                                href="https://www.google.com/maps/search/?api=1&query=SBS+Office+Space+Old+No+470+New+No+700+Anna+Salai+Nandanam+Chennai+600035"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                SBS Office Space, Old No.470, New No.700,<br />
                                                Anna Salai, Nandanam, Chennai 600035.
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
