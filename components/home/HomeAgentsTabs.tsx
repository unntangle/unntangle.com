'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
    ArrowRight,
    CheckCircle2,
    Handshake,
    Receipt,
    ShoppingCart,
    Settings2,
    MessagesSquare,
    BarChart3,
} from 'lucide-react';
import styles from './Home.module.css';

/**
 * "AI workers for real business work" — vertical tab list on the left,
 * large gradient panel on the right showing the selected agent's tasks.
 * These are EXAMPLES of workflows we deploy, not packaged products.
 * Anchor: #ai-solutions.
 */

const agents = [
    {
        name: 'AI Sales Agent',
        icon: <Handshake size={22} />,
        summary: 'Takes the repetitive load off your sales desk, from first enquiry to CRM update.',
        tasks: ['Process incoming leads', 'Analyse RFQs', 'Prepare quotation drafts', 'Follow up with prospects', 'Update CRM'],
    },
    {
        name: 'AI Finance Agent',
        icon: <Receipt size={22} />,
        summary: 'Keeps receivables and routine finance work moving without chasing spreadsheets.',
        tasks: ['Process invoices', 'Identify outstanding payments', 'Prepare collection follow-ups', 'Generate financial reports', 'Assist with reconciliation'],
    },
    {
        name: 'AI Procurement Agent',
        icon: <ShoppingCart size={22} />,
        summary: 'Turns purchase requirements and vendor responses into clear recommendations.',
        tasks: ['Analyse purchase requirements', 'Compare vendors', 'Process supplier information', 'Prepare purchase recommendations', 'Track procurement workflows'],
    },
    {
        name: 'AI Operations Agent',
        icon: <Settings2 size={22} />,
        summary: 'Watches operational data and flags what needs a person\u2019s attention.',
        tasks: ['Analyse operational data', 'Generate reports', 'Monitor workflows', 'Identify exceptions', 'Escalate issues'],
    },
    {
        name: 'AI Customer Service Agent',
        icon: <MessagesSquare size={22} />,
        summary: 'Resolves routine requests using your own knowledge, and hands off the rest.',
        tasks: ['Understand customer requests', 'Search company knowledge', 'Resolve routine queries', 'Create support tickets', 'Escalate complex issues'],
    },
    {
        name: 'AI Management Intelligence',
        icon: <BarChart3 size={22} />,
        summary: 'Brings information from across your systems into one view for decision-makers.',
        tasks: ['Combine data from business systems', 'Generate management reports', 'Summarise performance', 'Surface important exceptions', 'Support decisions'],
    },
];

export default function HomeAgentsTabs() {
    const [active, setActive] = useState(0);
    const [paused, setPaused] = useState(false);
    const agent = agents[active];

    // Auto-advance every 3 seconds. Depends on `active`, so clicking a tab
    // restarts the 3s countdown from that tab. Pauses while hovered or
    // focused, and stays off for users who prefer reduced motion.
    useEffect(() => {
        if (paused) return;
        if (typeof window !== 'undefined' &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const id = setTimeout(() => setActive((a) => (a + 1) % agents.length), 3000);
        return () => clearTimeout(id);
    }, [active, paused]);

    return (
        <section className={styles.section} id="ai-solutions">
            <div className={styles.container}>
                <div className={`${styles.center} ${styles.sectionHead}`}>
                    <span className={styles.eyebrow}>AI Solutions</span>
                    <h2 className={styles.h2}>AI workers for real business work</h2>
                    <p className={styles.lead}>
                        Not chatbots. AI agents that carry out specific tasks inside your
                        departments, and hand the final decision to your team.
                    </p>
                </div>

                <div
                    className={styles.tabsGrid}
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                    onFocus={() => setPaused(true)}
                    onBlur={() => setPaused(false)}
                >
                    <ul className={styles.tabList} role="tablist" aria-label="AI workers">
                        {agents.map((a, i) => {
                            const isActive = i === active;
                            return (
                                <li key={a.name} className={styles.tabItem}>
                                    <button
                                        type="button"
                                        role="tab"
                                        aria-selected={isActive}
                                        className={`${styles.tabButton} ${isActive ? styles.tabButtonActive : ''}`}
                                        onClick={() => setActive(i)}
                                    >
                                        {a.name}
                                        <span className={styles.tabRadio} aria-hidden="true" />
                                    </button>
                                    {isActive && (
                                        <div className={styles.tabDetail}>
                                            <p>{a.summary}</p>
                                            <Link href="/services/ai-agents" className={`${styles.btn} ${styles.btnDark}`}>
                                                <span className={styles.btnIcon}><ArrowRight size={16} /></span>
                                                See how
                                            </Link>
                                        </div>
                                    )}
                                </li>
                            );
                        })}
                    </ul>

                    <div className={styles.tabPanel} role="tabpanel">
                        <div className={styles.tabPanelCard} key={agent.name}>
                            <div className={styles.tabPanelHead}>
                                <span className={styles.tabPanelIcon}>{agent.icon}</span>
                                <div>
                                    <div className={styles.tabPanelName}>{agent.name}</div>
                                    <div className={styles.tabPanelSub}>Example workflow tasks</div>
                                </div>
                            </div>
                            <ul className={styles.taskList}>
                                {agent.tasks.map((t, i) => (
                                    <li
                                        key={t}
                                        className={styles.taskItem}
                                        style={{ animationDelay: `${i * 70}ms` }}
                                    >
                                        <CheckCircle2 size={16} />
                                        {t}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={styles.tabCaption}>Prepared by AI · Approved by your team</div>
                    </div>
                </div>

                <p className={styles.tabNote}>
                    Examples of workflows we deploy. Each one is scoped to your processes, data and
                    systems during the AI Workflow Assessment.
                </p>
            </div>
        </section>
    );
}
