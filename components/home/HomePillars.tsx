import Link from 'next/link';
import { ArrowRight, Bot, Globe, Layers } from 'lucide-react';
import styles from './Home.module.css';

/**
 * Three pillar cards — AI implementation, websites & apps, custom
 * software. Gradient top with a small illustrative UI, then copy,
 * an Explore button and linked service chips.
 */

const pillars = [
    {
        topClass: 'pillarTopA',
        icon: <Bot size={14} />,
        miniTitle: 'AI workflow',
        miniRows: [['Read request', 'AI'], ['Check ERP data', 'AI'], ['Approve draft', 'Team']],
        title: 'AI Implementation & Deployment',
        text: 'Find repetitive workflows, build AI agents around them, connect them to your systems and run them in production.',
        href: '/services/ai-agents',
        services: [
            { label: 'AI Workflow Assessment', href: '/services/ai-workflow-assessment' },
            { label: 'AI Agents & Automation', href: '/services/ai-agents' },
            { label: 'AI & System Integration', href: '/services/ai-integration' },
        ],
    },
    {
        topClass: 'pillarTopB',
        icon: <Globe size={14} />,
        miniTitle: 'Dealer portal',
        miniRows: [['Product catalogue', 'Live'], ['Order tracking', 'Live'], ['RFQ form \u2192 CRM', 'Live']],
        title: 'Websites & Apps',
        text: 'Business websites, portals and mobile apps that are fast, secure and connected to your CRM and systems.',
        href: '/services/website',
        services: [
            { label: 'Website Development', href: '/services/website' },
            { label: 'Website Revamp', href: '/services/website-revamp' },
            { label: 'App Development', href: '/services/app' },
            { label: 'Interactive 3D', href: '/services/interactive-3d' },
        ],
    },
    {
        topClass: 'pillarTopC',
        icon: <Layers size={14} />,
        miniTitle: 'Operations system',
        miniRows: [['Orders & inventory', 'Synced'], ['Approvals', 'Routed'], ['Reports', 'Daily']],
        title: 'Custom Software & ERP',
        text: 'ERP, workflow and approval systems built around how you operate, and structured so AI can be added on top.',
        href: '/services/erp',
        services: [
            { label: 'Custom ERP', href: '/services/erp' },
            { label: 'Workflow Systems', href: '/services/erp' },
            { label: 'API Integrations', href: '/services/ai-integration' },
        ],
    },
] as const;

export default function HomePillars() {
    return (
        <section className={`${styles.section} ${styles.bgLight}`}>
            <div className={styles.container}>
                <div className={`${styles.center} ${styles.sectionHead}`}>
                    <span className={styles.eyebrow}>What We Do</span>
                    <h2 className={styles.h2}>AI, websites, apps and software, from one team</h2>
                    <p className={styles.lead}>
                        The same team that deploys your AI builds the systems it depends on, so
                        everything is designed to work together.
                    </p>
                </div>

                <div className={styles.pillars}>
                    {pillars.map((p) => (
                        <article key={p.title} className={styles.pillar}>
                            <div className={`${styles.pillarTop} ${styles[p.topClass]}`} aria-hidden="true">
                                <div className={styles.pillarMini}>
                                    <div className={styles.pillarMiniTitle}>
                                        {p.icon}
                                        {p.miniTitle}
                                    </div>
                                    {p.miniRows.map(([label, value]) => (
                                        <div key={label} className={styles.pillarMiniRow}>
                                            <span>{label}</span>
                                            <strong>{value}</strong>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={styles.pillarBody}>
                                <h3>{p.title}</h3>
                                <p>{p.text}</p>
                                <Link href={p.href} className={`${styles.btn} ${styles.btnDark} ${styles.pillarCta}`}>
                                    <span className={styles.btnIcon}><ArrowRight size={16} /></span>
                                    Explore
                                </Link>
                                <span className={styles.pillarLabel}>Services</span>
                                <div className={styles.chips}>
                                    {p.services.map((s) => (
                                        <Link key={s.label} href={s.href} className={styles.chip}>
                                            {s.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
