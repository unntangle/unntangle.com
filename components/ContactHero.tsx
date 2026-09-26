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
                            <h3 className={styles.formTitle}>Book an AI Workflow Assessment</h3>

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
                                        <label>What can we help with?</label>
                                        <div className={styles.selectWrapper}>
                                            <select defaultValue="">
                                                <option value="" disabled>Select an option</option>
                                                <option value="assessment">AI Workflow Assessment</option>
                                                <option value="deployment">AI agent / workflow deployment</option>
                                                <option value="integration">System integration (ERP, CRM, APIs)</option>
                                                <option value="products">AI products (uVOIZ, uDYLR, uSCRIBR)</option>
                                                <option value="engineering">Software &amp; web engineering</option>
                                                <option value="other">Something else</option>
                                            </select>
                                            <ChevronDown size={14} className={styles.chevron} />
                                        </div>
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label>Company Size</label>
                                        <div className={styles.selectWrapper}>
                                            <select defaultValue="">
                                                <option value="" disabled>Select size</option>
                                                <option value="under-50">Under 50 employees</option>
                                                <option value="50-200">50 – 200 employees</option>
                                                <option value="200-1000">200 – 1,000 employees</option>
                                                <option value="1000-plus">1,000+ employees</option>
                                            </select>
                                            <ChevronDown size={14} className={styles.chevron} />
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.inputGroup}>
                                    <label>Which workflow is taking up your team&apos;s time?</label>
                                    <textarea placeholder="e.g. RFQs arrive by email and someone has to check ERP pricing and prepare a quotation by hand" rows={2} />
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
                                        <label>Attach a sample document (optional)</label>
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
                                        Request Assessment
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
                                Find Where AI Can Work <br />
                                Inside Your Business
                            </h1>
                            <p className={styles.subtitle}>
                                Bring us a workflow that&apos;s consuming time, creating bottlenecks or
                                requiring repetitive manual work. An AI deployment specialist will get back
                                to you to talk it through and tell you honestly whether AI can automate or
                                augment it.
                            </p>

                            <div className={styles.contactDetails}>
                                {/* HIDDEN-CONTACT: email + phone
                                <div className={styles.contactItem}>
                                    <div className={styles.itemIcon}><Mail size={18} /></div>
                                    <div className={styles.itemText}>
                                        <span>Email</span>
                                        <p><a href="mailto:gokul@unntangle.com">gokul@unntangle.com</a></p>
                                    </div>
                                </div>
                                <div className={styles.contactItem}>
                                    <div className={styles.itemIcon}><Phone size={18} /></div>
                                    <div className={styles.itemText}>
                                        <span>Call Us</span>
                                        <p><a href="tel:+917092747933">+91 70927 47933</a></p>
                                        <p><a href="tel:+916379388462">+91 63793 88462</a></p>
                                    </div>
                                </div>
                                */}
                                {/* HIDDEN-CONTACT: office address
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
                                */}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
