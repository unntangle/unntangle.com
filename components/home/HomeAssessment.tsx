import Link from 'next/link';
import { ArrowRight, FileText, Receipt, ShoppingCart, MessageSquare, Flag } from 'lucide-react';
import styles from './Home.module.css';

/**
 * "Start with your workflow, not with AI." — the AI Workflow Assessment.
 * Left: the pitch and seven steps. Right: a stacked-document visual of
 * what the client receives. Anchor: #how-we-deploy (navbar link).
 */

const steps = ['Discover', 'Map', 'Prioritize', 'Build', 'Integrate', 'Deploy', 'Improve'];

// Illustrative scorecard — qualitative levels only, no invented numbers.
const scorecard = [
    { name: 'RFQ to quotation', icon: <FileText size={14} />, level: 'High', fill: 88 },
    { name: 'Collections follow-up', icon: <Receipt size={14} />, level: 'High', fill: 76 },
    { name: 'Vendor comparison', icon: <ShoppingCart size={14} />, level: 'Medium', fill: 58 },
    { name: 'Order status queries', icon: <MessageSquare size={14} />, level: 'Medium', fill: 46 },
];

export default function HomeAssessment() {
    return (
        <section className={styles.section} id="how-we-deploy">
            <div className={styles.container}>
                <div className={styles.docSplit}>
                    <div>
                        <span className={styles.eyebrow}>AI Workflow Assessment</span>
                        <h2 className={styles.h2}>Start with your workflow, not with AI.</h2>
                        <p className={styles.lead}>
                            We don&apos;t begin by selling you a predefined AI product. We first
                            understand how your business works, then agree with your team where AI
                            should go to work first, and what should stay with people.
                        </p>
                        <ol className={styles.stepsCompact}>
                            {steps.map((s, i) => (
                                <li key={s}>
                                    <span className={styles.stepNum}>{String(i + 1).padStart(2, '0')}</span>
                                    {s}
                                </li>
                            ))}
                        </ol>
                        <Link href="/contact" className={`${styles.btn} ${styles.btnDark}`}>
                            <span className={styles.btnIcon}><ArrowRight size={16} /></span>
                            Book an AI Workflow Assessment
                        </Link>
                    </div>

                    <div className={styles.assessPanel} aria-hidden="true">
                        <div className={styles.assessCard}>
                            <div className={styles.assessHead}>
                                <div>
                                    <span className={styles.assessTitle}>Opportunity scorecard</span>
                                    <span className={styles.assessSub}>Workflows ranked by value to automate</span>
                                </div>
                                <span className={styles.assessTag}>Example</span>
                            </div>
                            {scorecard.map((row) => (
                                <div key={row.name} className={styles.assessRow}>
                                    <span className={styles.assessRowName}>
                                        <span className={styles.assessRowIcon}>{row.icon}</span>
                                        {row.name}
                                    </span>
                                    <span className={styles.assessTrack}>
                                        <span className={styles.assessFill} style={{ width: `${row.fill}%`, display: 'block' }} />
                                    </span>
                                    <span className={styles.assessLevel}>{row.level}</span>
                                </div>
                            ))}
                        </div>

                        <div className={styles.assessNote}>
                            <span className={styles.assessNoteIcon}><Flag size={15} /></span>
                            <span>
                                <span className={styles.assessNoteLabel}>Recommended first deployment</span>
                                <span className={styles.assessNoteText}>RFQ to quotation</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
