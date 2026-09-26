'use client';

import { motion } from 'framer-motion';
import {
    Handshake,
    Receipt,
    ShoppingCart,
    Settings2,
    MessagesSquare,
    LineChart,
} from 'lucide-react';
import styles from './AIDeployment.module.css';

/**
 * Home-page "AI Workers For Real Business Work" section.
 *
 * These are EXAMPLES of workflows Unntangle can deploy — each is scoped
 * per client during the assessment. They are deliberately not presented
 * as packaged SaaS products. Anchor: #ai-solutions (navbar + hero CTA).
 */

const agents = [
    {
        icon: <Handshake size={24} />,
        name: 'AI Sales Agent',
        summary: 'Takes the repetitive load off your sales desk, from first enquiry to CRM update.',
        tasks: [
            'Process incoming leads',
            'Analyse RFQs',
            'Prepare quotation drafts',
            'Follow up with prospects',
            'Update CRM',
        ],
    },
    {
        icon: <Receipt size={24} />,
        name: 'AI Finance Agent',
        summary: 'Keeps receivables and routine finance work moving without chasing spreadsheets.',
        tasks: [
            'Process invoices',
            'Identify outstanding payments',
            'Prepare collection follow-ups',
            'Generate financial reports',
            'Assist with reconciliation workflows',
        ],
    },
    {
        icon: <ShoppingCart size={24} />,
        name: 'AI Procurement Agent',
        summary: 'Turns purchase requirements and vendor responses into clear recommendations.',
        tasks: [
            'Analyse purchase requirements',
            'Compare vendors',
            'Process supplier information',
            'Prepare purchase recommendations',
            'Track procurement workflows',
        ],
    },
    {
        icon: <Settings2 size={24} />,
        name: 'AI Operations Agent',
        summary: 'Watches operational data and flags what needs a person\u2019s attention.',
        tasks: [
            'Analyse operational data',
            'Generate reports',
            'Monitor workflows',
            'Identify exceptions',
            'Escalate issues',
        ],
    },
    {
        icon: <MessagesSquare size={24} />,
        name: 'AI Customer Service Agent',
        summary: 'Resolves routine requests using your own knowledge, and hands off the rest.',
        tasks: [
            'Understand customer requests',
            'Search company knowledge',
            'Resolve routine queries',
            'Create support tickets',
            'Escalate complex issues',
        ],
    },
    {
        icon: <LineChart size={24} />,
        name: 'AI Management Intelligence',
        summary: 'Brings information from across your systems into one view for decision-makers.',
        tasks: [
            'Combine information from business systems',
            'Generate management reports',
            'Summarise business performance',
            'Surface important exceptions',
            'Provide decision-support information',
        ],
    },
];

export default function AIWorkforce() {
    return (
        <section className={`${styles.section} ${styles.light}`} id="ai-solutions">
            <div className={styles.container}>
                <div className={styles.header}>
                    <span className="tag">AI Solutions</span>
                    <h2>AI Workers For Real Business Work</h2>
                    <p>
                        Not chatbots. AI agents and workflows that carry out specific tasks inside
                        your departments — reading documents, pulling data from your systems,
                        preparing work for review and completing it once approved.
                    </p>
                </div>

                <div className={styles.agentGrid}>
                    {agents.map((agent, i) => (
                        <motion.div
                            key={agent.name}
                            className={styles.agentCard}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45, delay: i * 0.06 }}
                        >
                            <div className={styles.agentIcon}>{agent.icon}</div>
                            <h3>{agent.name}</h3>
                            <p className={styles.agentSummary}>{agent.summary}</p>
                            <ul className={styles.bulletList}>
                                {agent.tasks.map((task) => (
                                    <li key={task}>
                                        <span className={styles.bulletDot} aria-hidden="true" />
                                        {task}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                <p className={styles.note}>
                    These are examples of workflows we deploy. Each one is scoped to your processes,
                    data and systems during the AI Workflow Assessment and built for your business —
                    not sold as an off-the-shelf product.
                </p>
            </div>
        </section>
    );
}
