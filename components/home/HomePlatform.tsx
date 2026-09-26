import Link from 'next/link';
import { ArrowRight, ClipboardCheck, Bot, Plug, UserCheck, FileText, Receipt, MessageSquare, ShoppingCart } from 'lucide-react';
import styles from './Home.module.css';

/**
 * "Why this approach" split section.
 * Left: positioning statement. Right: an illustrative approval queue.
 * Below: four capability columns linking to the service pages.
 */

const queue = [
    { icon: <FileText size={16} />, title: 'Quotation for RFQ', sub: 'Drafted by AI', status: 'Awaiting approval', tone: 'wait' },
    { icon: <Receipt size={16} />, title: 'Payment reminder batch', sub: 'Overdue invoices', status: 'Awaiting approval', tone: 'wait' },
    { icon: <ShoppingCart size={16} />, title: 'Vendor quote comparison', sub: 'Prepared by AI', status: 'Ready', tone: 'ai' },
    { icon: <MessageSquare size={16} />, title: 'Order status reply', sub: 'Routine query', status: 'Sent', tone: 'done' },
] as const;

const features = [
    {
        icon: <ClipboardCheck size={20} />,
        title: 'AI Workflow Assessment',
        text: 'We start with how your teams work, then decide where AI should go first.',
        href: '/services/ai-workflow-assessment',
    },
    {
        icon: <Bot size={20} />,
        title: 'AI Agents & Automation',
        text: 'AI that reads documents, pulls data and prepares real work \u2014 not just a chat window.',
        href: '/services/ai-agents',
    },
    {
        icon: <Plug size={20} />,
        title: 'Built Around Your Systems',
        text: 'Connected to your ERP, CRM, email, WhatsApp and databases. Nothing replaced.',
        href: '/services/ai-integration',
    },
    {
        icon: <UserCheck size={20} />,
        title: 'Your People Stay in Control',
        text: 'Approvals, permissions, audit trails and escalation designed into every workflow.',
        href: '/services/ai-agents',
    },
];

export default function HomePlatform() {
    const toneClass = {
        wait: styles.statusWait,
        ai: styles.statusAi,
        done: styles.statusDone,
    };

    return (
        <section className={`${styles.section} ${styles.bgLight}`}>
            <div className={styles.container}>
                <div className={styles.split}>
                    <div>
                        <span className={styles.eyebrow}>AI Implementation Partner</span>
                        <h2 className={styles.h2}>
                            We Don&apos;t Just Build AI. We Deploy It Inside Your Business.
                        </h2>
                        <p className={styles.lead}>
                            Every business has repetitive workflows that consume valuable time. We
                            work with your teams to find them, build the AI that handles them,
                            connect it to your systems and run it in production, with your people
                            approving where it matters.
                        </p>
                        <div style={{ marginTop: 32 }}>
                            <Link href="/contact" className={`${styles.btn} ${styles.btnDark}`}>
                                <span className={styles.btnIcon}><ArrowRight size={16} /></span>
                                Book an AI Workflow Assessment
                            </Link>
                        </div>
                    </div>

                    <div className={styles.softPanel} aria-hidden="true">
                        <div className={styles.queue}>
                            <div className={styles.queueHead}>
                                <span>Today&apos;s AI work</span>
                                <span className={`${styles.status} ${styles.statusAi}`}>Illustrative</span>
                            </div>
                            {queue.map((q) => (
                                <div key={q.title} className={styles.queueItem}>
                                    <span className={styles.queueIcon}>{q.icon}</span>
                                    <div>
                                        <div className={styles.queueTitle}>{q.title}</div>
                                        <div className={styles.queueSub}>{q.sub}</div>
                                    </div>
                                    <span className={`${styles.status} ${toneClass[q.tone]}`}>{q.status}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={styles.features}>
                    {features.map((f) => (
                        <div key={f.title} className={styles.feature}>
                            <span className={styles.featureIcon}>{f.icon}</span>
                            <h3>{f.title}</h3>
                            <p>{f.text}</p>
                            <Link href={f.href} className={styles.textLink}>
                                Learn more <ArrowRight size={14} />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
