import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Check, FileText, Sparkles } from 'lucide-react';
import styles from './Home.module.css';

/**
 * Home hero — large rounded gradient card.
 * Left: headline, supporting line, two CTAs.
 * Right: an illustrative RFQ-to-quotation workflow built from UI cards
 * (no real customer data, no performance numbers).
 * Bottom: links into the three service pillars.
 */
export default function HomeHero() {
    return (
        <section className={styles.heroWrap}>
            <div className={styles.hero}>
                <div className={styles.heroInner}>
                    <div>
                        <span className={styles.heroEyebrow}>
                            <Sparkles size={14} /> AI Implementation &amp; Deployment
                        </span>
                        <h1 className={styles.heroTitle}>AI That Works Inside Your Business.</h1>
                        <p className={styles.heroText}>
                            Unntangle identifies repetitive business workflows, builds AI-powered
                            solutions around them, and deploys them into your existing systems. We
                            also build the websites, apps and custom software your business runs on.
                        </p>
                        <div className={styles.heroActions}>
                            <Link href="/contact" className={`${styles.btn} ${styles.btnWhite}`}>
                                <span className={styles.btnIcon}><ArrowRight size={16} /></span>
                                Book an AI Workflow Assessment
                            </Link>
                            <Link href="/services" className={`${styles.btn} ${styles.btnOutline}`}>
                                Explore Our Services
                            </Link>
                        </div>
                    </div>

                    <div className={styles.heroVisual} aria-hidden="true">
                        <div className={`${styles.uiCard} ${styles.card1}`}>
                            <span className={styles.uiLabel}>Incoming</span>
                            <div className={styles.uiCheck}>
                                <span className={styles.uiCheckIcon} style={{ background: '#eef4ff', color: '#1f6bff' }}>
                                    <FileText size={14} />
                                </span>
                                RFQ received by email
                            </div>
                            <p style={{ marginTop: 8 }}>PDF attached · 3 line items</p>
                        </div>

                        <div className={`${styles.uiCard} ${styles.card2}`}>
                            <span className={styles.uiLabel}>AI extracted</span>
                            <div className={styles.uiRow}><span>Product</span><span className={styles.uiMuted}>Matched in ERP</span></div>
                            <div className={styles.uiRow}><span>Quantity</span><span className={styles.uiMuted}>Checked</span></div>
                            <div className={styles.uiRow}><span>Pricing</span><span className={styles.uiMuted}>From price list</span></div>
                            <div className={styles.uiPills}>
                                <span className={styles.uiPill}>ERP</span>
                                <span className={styles.uiPill}>Past quotes</span>
                                <span className={styles.uiPill}>Price list</span>
                            </div>
                        </div>

                        <div className={`${styles.uiCard} ${styles.card3}`}>
                            <span className={styles.uiLabel}>Needs your approval</span>
                            <div className={styles.uiTitle}>Quotation draft ready</div>
                            <p>Prepared by AI for review before sending</p>
                            <div className={styles.uiButtons}>
                                <span className={styles.uiBtnPrimary}>Approve</span>
                                <span className={styles.uiBtnSecondary}>Edit</span>
                            </div>
                        </div>

                        <div className={`${styles.uiCard} ${styles.card4}`}>
                            <div className={styles.uiCheck}>
                                <span className={styles.uiCheckIcon}><Check size={14} /></span>
                                Sent &amp; CRM updated
                            </div>
                        </div>
                    </div>
                </div>

                <nav className={styles.heroTabs} aria-label="Our services">
                    <Link href="/services/ai-agents" className={styles.heroTab}>
                        AI Implementation <ArrowUpRight size={16} />
                    </Link>
                    <Link href="/services/website" className={styles.heroTab}>
                        Websites &amp; Apps <ArrowUpRight size={16} />
                    </Link>
                    <Link href="/services/erp" className={styles.heroTab}>
                        Custom Software &amp; ERP <ArrowUpRight size={16} />
                    </Link>
                </nav>
            </div>
        </section>
    );
}
