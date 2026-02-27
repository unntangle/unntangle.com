'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Twitter, Linkedin, Youtube, Github, ArrowUp } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
    const scrollToTop = () => {
        if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                {/* Top Bar with Logo */}
                <div className={styles.topBar}>
                    <Link href="/" className={styles.logoLink}>
                        <Image
                            src="/images/unntangle_logo_white.png"
                            alt="Unntangle Logo"
                            width={160}
                            height={40}
                            className={styles.footerLogo}
                        />
                    </Link>
                </div>

                {/* Main Links Grid - 4 Columns */}
                <div className={styles.linksGrid}>
                    <div className={styles.column}>
                        <h4>Quick Links</h4>
                        <Link href="/about">About us</Link>
                        <Link href="/services">Services</Link>
                        <Link href="/case-studies">Case studies</Link>
                        <Link href="#">Case studies CMS</Link>
                        <Link href="/contact">Contact</Link>
                    </div>

                    <div className={styles.column}>
                        <h4>Blog</h4>
                        <Link href="/blog">Our Blog</Link>
                        <Link href="#">Blog post CMS</Link>
                        <Link href="/blog/ai">AI & Tech</Link>
                        <Link href="/blog/modernization">Modernization</Link>
                        <Link href="/blog/case-studies">Success Stories</Link>
                    </div>

                    <div className={styles.column}>
                        <h4>Contact</h4>
                        <div className={styles.contactInfo}>
                            <div className={styles.phoneNumbers}>
                                <Link href="tel:+919789058391">+91 97890-58391</Link>
                                <span> / </span>
                                <Link href="tel:+916379388462">+91 63793-88462</Link>
                            </div>
                            <Link href="mailto:info@unntangle.com">info@unntangle.com</Link>
                            <p className={styles.address}>
                                SBS Office Space, Old No.470, New No.700,<br />
                                Anna Salai, Nandanam, Chennai 600035.
                            </p>
                        </div>
                    </div>

                    <div className={styles.column}>
                        <h4>Follow us</h4>
                        <div className={styles.socialCol}>
                            <Link href="#" className={styles.socialLink}><Linkedin size={18} /> <span>LinkedIn</span></Link>
                            <Link href="#" className={styles.socialLink}><Instagram size={18} /> <span>Instagram</span></Link>
                            <Link href="#" className={styles.socialLink}><Facebook size={18} /> <span>Facebook</span></Link>
                            <Link href="#" className={styles.socialLink}><Twitter size={18} /> <span>Twitter</span></Link>
                        </div>
                    </div>
                </div>

                <div className={styles.backToTop}>
                    <button onClick={scrollToTop} aria-label="Back to top">
                        <ArrowUp size={20} />
                    </button>
                </div>

                {/* Bottom Bar */}
                <div className={styles.bottomBar}>
                    <div className={styles.splitRow}>
                        <div className={styles.legalLinks}>
                            <Link href="#">Privacy</Link>
                            <Link href="#">Site Terms</Link>
                            <Link href="#">Cookie Preferences</Link>
                        </div>

                        <p className={styles.copyright}>
                            © {new Date().getFullYear()}, <span className={styles.accent}>Unntangle Solutions</span>. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
