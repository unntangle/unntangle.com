'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Twitter, Linkedin, Github } from 'lucide-react';
import styles from './Contact.module.css';

export default function Contact() {
    return (
        <section className={styles.contactSection}>
            <div className={styles.container}>
                <motion.div
                    className={styles.hero}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1>Let's Unntangle Your Future</h1>
                    <p>Have a complex problem? Let's build a deterministic solution together. Reach out to our engineering team today.</p>
                </motion.div>

                <div className={styles.content}>
                    <motion.div
                        className={styles.infoColumn}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className={styles.infoBlock}>
                            <h2>Global Headquarters</h2>
                            <div className={styles.infoDetails}>
                                <div className={styles.contactItem}>
                                    <div className={styles.iconWrapper}>
                                        <MapPin size={24} />
                                    </div>
                                    <div className={styles.itemText}>
                                        <h4>Main Office</h4>
                                        <p>123 Innovation Drive, Silicon Valley, CA 94025, USA</p>
                                    </div>
                                </div>
                                <div className={styles.contactItem}>
                                    <div className={styles.iconWrapper}>
                                        <Mail size={24} />
                                    </div>
                                    <div className={styles.itemText}>
                                        <h4>Email Us</h4>
                                        <p>contact@unntangle.com</p>
                                        <p>engineering@unntangle.com</p>
                                    </div>
                                </div>
                                <div className={styles.contactItem}>
                                    <div className={styles.iconWrapper}>
                                        <Phone size={24} />
                                    </div>
                                    <div className={styles.itemText}>
                                        <h4>Call Us</h4>
                                        <p>+1 (555) 000-UNNTANGLE</p>
                                        <p>Mon - Fri, 9am - 6pm PST</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.infoBlock}>
                            <h2>Connect With Us</h2>
                            <div className={styles.socials}>
                                <a href="#" className={styles.socialLink}><Linkedin size={20} /></a>
                                <a href="#" className={styles.socialLink}><Twitter size={20} /></a>
                                <a href="#" className={styles.socialLink}><Github size={20} /></a>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className={styles.formColumn}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <form className={styles.contactForm}>
                            <div className={styles.inputGroup}>
                                <label>First Name</label>
                                <input type="text" placeholder="John" />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Last Name</label>
                                <input type="text" placeholder="Doe" />
                            </div>
                            <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                                <label>Work Email</label>
                                <input type="email" placeholder="john@company.com" />
                            </div>
                            <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                                <label>Subject</label>
                                <input type="text" placeholder="How can we help?" />
                            </div>
                            <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                                <label>Message</label>
                                <textarea rows={6} placeholder="Tell us about your project or inquiry..."></textarea>
                            </div>
                            <button type="submit" className={styles.submitButton}>
                                <span>Send Message</span>
                                <Send size={18} />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
