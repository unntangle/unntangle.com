import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import styles from './Home.module.css';

/**
 * Closing CTA — the wide service collage (public/images/cta-banner.webp)
 * runs full-width at the top on a soft off-white background, with the
 * centred heading, supporting line and two pill buttons below it.
 */
export default function HomeFinalCTA() {
    return (
        <section className={styles.finalCta}>
            <div className={styles.finalBanner}>
                <img
                    src="/images/cta-banner.webp"
                    alt="Unntangle services: AI chatbots and automation, modern websites and 3D experiences, and ongoing support"
                    loading="lazy"
                />
            </div>

            <div className={styles.container}>
                <h2 className={styles.finalTitle}>
                    Find Where AI Can Work
                    <br />
                    Inside Your Business
                </h2>
                <p className={styles.lead} style={{ margin: '0 auto' }}>
                    Bring us a workflow that&apos;s eating your team&apos;s time, or a website, app
                    or system you need built. We&apos;ll help you work out the right next step.
                </p>
                <div className={styles.finalActions}>
                    <Link href="/contact" className={`${styles.btn} ${styles.btnDark}`}>
                        <span className={styles.btnIcon}><ArrowRight size={16} /></span>
                        Book an AI Workflow Assessment
                    </Link>
                    <Link href="/contact" className={`${styles.btn} ${styles.btnLight}`}>
                        Discuss a Software Project
                    </Link>
                </div>
            </div>
        </section>
    );
}
