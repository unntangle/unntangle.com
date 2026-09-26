import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import about from '../about/About.module.css';
import btn from '../home/Home.module.css';
import { ctaGradientFor } from '../pastelPalette';

/**
 * Gradient CTA card used at the end of the About, Services, AI Workflow
 * Examples and service detail pages. `pageKey` picks this page's unique
 * CTA colour from components/pastelPalette (never shared with another
 * page, never the same as the page's own hero).
 */
export default function ServicesCTA({
    pageKey,
    title = 'Let\u2019s Find the Right Place to Start',
    text = 'Bring us a workflow that\u2019s eating your team\u2019s time, or a website, app or system you need built. We\u2019ll help you find the right next step.',
}: {
    pageKey: string;
    title?: string;
    text?: string;
}) {
    return (
        <section className={about.ctaWrap} style={{ paddingTop: 80 }}>
            <div className={about.cta} style={{ background: ctaGradientFor(pageKey) }}>
                <h2 className={about.ctaTitle}>{title}</h2>
                <p className={about.ctaText}>{text}</p>
                <div className={about.ctaActions}>
                    <Link href="/contact" className={`${btn.btn} ${btn.btnDark}`}>
                        <span className={btn.btnIcon}><ArrowRight size={16} /></span>
                        Book an AI Workflow Assessment
                    </Link>
                    <Link href="/contact" className={`${btn.btn} ${btn.btnLight}`}>
                        Discuss a Software Project
                    </Link>
                </div>
            </div>
        </section>
    );
}
