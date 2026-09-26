import type { ReactNode } from 'react';
import {
    Handshake,
    Receipt,
    ShoppingCart,
    Settings2,
    MessagesSquare,
    BarChart3,
    Check,
    UserCheck,
} from 'lucide-react';
import about from '../about/About.module.css';
import styles from './Workflows.module.css';

/**
 * /ai-workflow-examples — department-by-department breakdown.
 * For each AI worker: what AI handles, where your team stays in control,
 * and which systems it typically connects to. Illustrative scope only;
 * each deployment is defined during the AI Workflow Assessment.
 */

const iconProps = { size: 24, strokeWidth: 1.5 };

const workflows: {
    name: string;
    summary: string;
    icon: ReactNode;
    tone: string;
    ai: string[];
    people: string[];
    connects: string[];
}[] = [
    {
        name: 'AI Sales Agent',
        summary: 'Takes the repetitive load off your sales desk, from first enquiry to CRM update.',
        icon: <Handshake {...iconProps} />,
        tone: about.tonePeach,
        ai: [
            'Reads incoming leads and RFQs from email and forms',
            'Matches requested items to your catalogue',
            'Drafts quotations using pricing from your ERP',
            'Prepares follow-ups for open quotes',
            'Updates the CRM once a quote is sent',
        ],
        people: [
            'Approve every quotation before it is sent',
            'Handle negotiation and pricing exceptions',
        ],
        connects: ['Email', 'ERP', 'CRM', 'WhatsApp'],
    },
    {
        name: 'AI Finance Agent',
        summary: 'Keeps receivables and routine finance work moving without chasing spreadsheets.',
        icon: <Receipt {...iconProps} />,
        tone: about.toneMint,
        ai: [
            'Reads and processes incoming invoices',
            'Identifies outstanding and overdue payments',
            'Drafts collection reminders per customer',
            'Compiles routine financial reports',
            'Prepares data for reconciliation',
        ],
        people: [
            'Approve reminder batches before they go out',
            'Decide on disputes, credit and write-offs',
        ],
        connects: ['Accounting / ERP', 'Email', 'WhatsApp', 'Excel'],
    },
    {
        name: 'AI Procurement Agent',
        summary: 'Turns purchase requirements and vendor responses into clear recommendations.',
        icon: <ShoppingCart {...iconProps} />,
        tone: about.toneLavender,
        ai: [
            'Collects supplier quotations from email',
            'Extracts line items from vendor PDFs',
            'Builds side-by-side vendor comparisons',
            'Drafts a purchase recommendation',
            'Tracks purchase order status',
        ],
        people: [
            'Choose the supplier',
            'Approve purchase orders',
        ],
        connects: ['Email', 'ERP', 'Excel', 'PDFs'],
    },
    {
        name: 'AI Operations Agent',
        summary: 'Watches operational data and flags what needs a person\u2019s attention.',
        icon: <Settings2 {...iconProps} />,
        tone: about.toneSky,
        ai: [
            'Pulls data from operational systems',
            'Generates daily and weekly reports',
            'Monitors workflows against agreed rules',
            'Flags exceptions as they happen',
            'Routes escalations to the right person',
        ],
        people: [
            'Act on exceptions and escalations',
            'Set the thresholds and rules that matter',
        ],
        connects: ['ERP', 'Databases', 'Sheets', 'Email'],
    },
    {
        name: 'AI Customer Service Agent',
        summary: 'Resolves routine requests using your own knowledge, and hands off the rest.',
        icon: <MessagesSquare {...iconProps} />,
        tone: about.toneRose,
        ai: [
            'Understands incoming customer requests',
            'Looks up order status in your systems',
            'Answers routine questions from company knowledge',
            'Creates support tickets with full context',
            'Escalates complex issues to your team',
        ],
        people: [
            'Handle complaints and complex cases',
            'Approve anything outside standard policy',
        ],
        connects: ['WhatsApp', 'Email', 'CRM', 'ERP', 'Documents'],
    },
    {
        name: 'AI Management Intelligence',
        summary: 'Brings information from across your systems into one view for decision-makers.',
        icon: <BarChart3 {...iconProps} />,
        tone: about.toneButter,
        ai: [
            'Combines data from ERP, CRM and other systems',
            'Prepares a regular management briefing',
            'Summarises performance against targets',
            'Surfaces important exceptions',
            'Answers follow-up questions from the data',
        ],
        people: [
            'Make the decisions',
            'Define what matters and what to report',
        ],
        connects: ['ERP', 'CRM', 'Databases', 'Sheets'],
    },
];

export default function WorkflowCatalog() {
    return (
        <section className={`${about.section} ${about.bgLight}`} id="by-department">
            <div className={about.container}>
                <div className={about.center}>
                    <h2 className={about.h2}>
                        Workflows, <span className={about.accent}>Department by Department.</span>
                    </h2>
                    <p className={about.body}>
                        What AI takes on in each area, where your team stays in control, and the
                        systems it typically works with.
                    </p>
                </div>

                <div className={styles.grid}>
                    {workflows.map((w) => (
                        <article key={w.name} className={styles.card}>
                            <div className={styles.head}>
                                <span className={`${styles.icon} ${w.tone}`} aria-hidden="true">
                                    {w.icon}
                                </span>
                                <div>
                                    <h3 className={styles.name}>{w.name}</h3>
                                    <p className={styles.summary}>{w.summary}</p>
                                </div>
                            </div>

                            <div className={styles.cols}>
                                <div>
                                    <span className={styles.colLabel}>What AI handles</span>
                                    <ul className={styles.list}>
                                        {w.ai.map((t) => (
                                            <li key={t}><Check size={14} />{t}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <span className={styles.colLabel}>Your team stays in control</span>
                                    <ul className={styles.list}>
                                        {w.people.map((t) => (
                                            <li key={t}><UserCheck size={14} />{t}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className={styles.connects}>
                                <span className={styles.connectsLabel}>Connects to</span>
                                {w.connects.map((c) => (
                                    <span key={c} className={styles.chip}>{c}</span>
                                ))}
                            </div>
                        </article>
                    ))}
                </div>

                <p className={styles.note}>
                    Examples of workflows we deploy. The exact scope, systems and approval points
                    for your business are defined during the AI Workflow Assessment.
                </p>
            </div>
        </section>
    );
}
