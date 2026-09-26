'use client';

import { useState, type CSSProperties, type ReactNode } from 'react';
import Link from 'next/link';
import {
    ArrowLeft,
    ArrowRight,
    ArrowDown,
    Check,
    FileText,
    FilePen,
    Receipt,
    Mail,
    ShoppingCart,
    BarChart3,
    MessageSquare,
    Database,
} from 'lucide-react';
import styles from './Home.module.css';

/**
 * Carousel in the "case study" slot. Unntangle has no published,
 * client-approved AI results yet, so these are clearly labelled
 * ILLUSTRATIVE workflows with qualitative before/after — no client
 * names, no metrics. The right side is an animated scene of the
 * workflow (three steps that appear in sequence and loop), in place
 * of a stock photo.
 */

type Vars = CSSProperties & Record<`--${string}`, string>;
const v = (vars: Record<string, string>) => vars as Vars;

/* Step timing in the 6s loop: stage 0 at 0s, stage 1 at 0.9s, stage 2 at 1.8s */
const D0 = v({ '--d': '0s' });
const D1 = v({ '--d': '0.9s' });
const D2 = v({ '--d': '1.8s' });

function Connector({ stage }: { stage: 1 | 2 }) {
    return (
        <div
            className={`${styles.sceneConnector} ${stage === 1 ? styles.stageC1 : styles.stageC2}`}
            aria-hidden="true"
        >
            <ArrowDown size={18} />
        </div>
    );
}

function Result({ title, sub }: { title: string; sub: string }) {
    return (
        <div className={`${styles.sceneCard} ${styles.sceneResult} ${styles.stage2}`} style={D2}>
            <div className={styles.sceneHead}>
                <span className={styles.sceneCheck}><Check size={16} /></span>
                <span>
                    {title}
                    <span className={styles.sceneSub}>{sub}</span>
                </span>
            </div>
        </div>
    );
}

/* ---------- Scenes ---------- */

function QuotesScene() {
    return (
        <>
            <div className={styles.sceneCard} style={D0}>
                <div className={styles.sceneHead}>
                    <span className={styles.sceneTile}><FileText size={15} /></span>
                    <span>
                        RFQ received
                        <span className={styles.sceneSub}>PDF attached · reading line items</span>
                    </span>
                </div>
                <div className={styles.sceneBody}>
                    <span className={styles.sceneScan} aria-hidden="true" />
                    <span className={styles.sceneLine} style={{ width: '92%' }} />
                    <span className={styles.sceneLine} style={{ width: '70%' }} />
                    <span className={styles.sceneLine} style={{ width: '84%' }} />
                </div>
            </div>
            <Connector stage={1} />
            <div className={`${styles.sceneCard} ${styles.stage1}`} style={D1}>
                <div className={styles.sceneHead}>
                    <span className={styles.sceneTile}><FilePen size={15} /></span>
                    <span>
                        Quotation draft
                        <span className={styles.sceneSub}>Pricing from your ERP</span>
                    </span>
                </div>
                <div className={styles.sceneBody}>
                    {[
                        ['Item 1', '82%'],
                        ['Item 2', '64%'],
                        ['Item 3', '74%'],
                    ].map(([label, w], i) => (
                        <div key={label} className={styles.sceneRow}>
                            <span>{label}</span>
                            <span className={styles.sceneTrack}>
                                <span className={styles.sceneFill} style={v({ '--w': w, '--dd': `${i * 0.15}s` })} />
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <Connector stage={2} />
            <Result title="Approved & sent" sub="CRM updated automatically" />
        </>
    );
}

function CollectScene() {
    return (
        <>
            <div className={styles.sceneCard} style={D0}>
                <div className={styles.sceneHead}>
                    <span className={styles.sceneTile}><Receipt size={15} /></span>
                    <span>
                        Overdue invoices found
                        <span className={styles.sceneSub}>Checked against your ledger</span>
                    </span>
                </div>
                <div className={styles.sceneChips}>
                    {['Invoice A', 'Invoice B', 'Invoice C'].map((c, i) => (
                        <span key={c} className={styles.sceneChip} style={v({ '--dd': `${0.2 + i * 0.15}s` })}>
                            {c}
                        </span>
                    ))}
                </div>
            </div>
            <Connector stage={1} />
            <div className={`${styles.sceneCard} ${styles.stage1}`} style={D1}>
                <div className={styles.sceneHead}>
                    <span className={styles.sceneTile}><Mail size={15} /></span>
                    <span>
                        Reminder drafted
                        <span className={styles.sceneSub}>In your tone, per customer</span>
                    </span>
                </div>
                <div className={styles.sceneBody}>
                    <span className={styles.sceneType} style={v({ '--w': '90%' })} />
                    <span className={styles.sceneType} style={v({ '--w': '76%', '--dd': '0.2s' })} />
                    <span className={styles.sceneType} style={v({ '--w': '58%', '--dd': '0.4s' })} />
                </div>
            </div>
            <Connector stage={2} />
            <Result title="Batch approved" sub="Reminders sent by email & WhatsApp" />
        </>
    );
}

function ProcureScene() {
    return (
        <>
            <div className={styles.sceneCard} style={D0}>
                <div className={styles.sceneHead}>
                    <span className={styles.sceneTile}><ShoppingCart size={15} /></span>
                    <span>
                        Supplier quotes in
                        <span className={styles.sceneSub}>Line items extracted from each PDF</span>
                    </span>
                </div>
                <div className={styles.sceneChips}>
                    {['Vendor A', 'Vendor B', 'Vendor C'].map((c, i) => (
                        <span key={c} className={styles.sceneChip} style={v({ '--dd': `${0.2 + i * 0.2}s` })}>
                            <FileText size={12} /> {c}
                        </span>
                    ))}
                </div>
            </div>
            <Connector stage={1} />
            <div className={`${styles.sceneCard} ${styles.stage1}`} style={D1}>
                <div className={styles.sceneHead}>
                    <span className={styles.sceneTile}><BarChart3 size={15} /></span>
                    <span>
                        Side-by-side comparison
                        <span className={styles.sceneSub}>Price, terms and delivery</span>
                    </span>
                </div>
                <div className={styles.sceneBody}>
                    {[
                        ['Vendor A', '62%'],
                        ['Vendor B', '88%'],
                        ['Vendor C', '54%'],
                    ].map(([label, w], i) => (
                        <div key={label} className={styles.sceneRow}>
                            <span>{label}</span>
                            <span className={styles.sceneTrack}>
                                <span className={styles.sceneFill} style={v({ '--w': w, '--dd': `${i * 0.15}s` })} />
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <Connector stage={2} />
            <Result title="Recommendation ready" sub="Vendor B · for your approval" />
        </>
    );
}

function QueriesScene() {
    return (
        <>
            <div className={styles.sceneCard} style={D0}>
                <div className={styles.sceneHead}>
                    <span className={styles.sceneTile}><MessageSquare size={15} /></span>
                    <span>
                        Customer message
                        <span className={styles.sceneSub}>via WhatsApp</span>
                    </span>
                </div>
                <div className={styles.sceneBody}>
                    <span className={`${styles.sceneBubble} ${styles.sceneBubbleIn}`}>
                        Hi, where is my order?
                    </span>
                </div>
            </div>
            <Connector stage={1} />
            <div className={`${styles.sceneCard} ${styles.stage1}`} style={D1}>
                <div className={styles.sceneHead}>
                    <span className={styles.sceneTile}><Database size={15} /></span>
                    <span>
                        Checking your systems
                        <span className={styles.sceneSub}>Order status from ERP</span>
                    </span>
                    <span className={`${styles.sceneDots} ${styles.sceneHeadEnd}`} aria-hidden="true">
                        <span /><span /><span />
                    </span>
                </div>
            </div>
            <Connector stage={2} />
            <div className={`${styles.sceneCard} ${styles.stage2}`} style={D2}>
                <div className={styles.sceneBody} style={{ marginTop: 0 }}>
                    <span className={`${styles.sceneBubble} ${styles.sceneBubbleOut}`}>
                        Your order was dispatched today. Tracking link below.
                    </span>
                </div>
            </div>
        </>
    );
}

/* ---------- Carousel ---------- */

const examples: {
    tab: string;
    tag: string;
    title: string;
    before: string;
    after: string;
    tone: string;
    scene: ReactNode;
}[] = [
    {
        tab: 'Quotations',
        tag: 'Manufacturing · Sales',
        title: 'RFQs turned into quotation drafts, ready for approval',
        before: 'Each RFQ read, priced and typed up by hand from several systems.',
        after: 'AI reads the RFQ, checks pricing and drafts the quote for your team to approve.',
        tone: 'sceneQuotes',
        scene: <QuotesScene />,
    },
    {
        tab: 'Collections',
        tag: 'Finance',
        title: 'Outstanding payments followed up without chasing spreadsheets',
        before: 'Ledgers checked by hand and reminder emails written one by one.',
        after: 'AI flags overdue invoices and prepares reminders; your team approves the batch.',
        tone: 'sceneCollect',
        scene: <CollectScene />,
    },
    {
        tab: 'Procurement',
        tag: 'Procurement',
        title: 'Vendor quotes compared line by line, automatically',
        before: 'Every supplier PDF opened separately and prices typed into Excel.',
        after: 'AI extracts line items into one comparison and drafts a recommendation.',
        tone: 'sceneProcure',
        scene: <ProcureScene />,
    },
    {
        tab: 'Customer queries',
        tag: 'Customer Service',
        title: 'Routine customer questions answered from your own data',
        before: 'Staff log into the ERP to look up every order status request.',
        after: 'AI answers routine questions from your systems and escalates the rest.',
        tone: 'sceneQueries',
        scene: <QueriesScene />,
    },
];

export default function HomeExamples() {
    const [index, setIndex] = useState(0);
    const ex = examples[index];
    const go = (d: number) => setIndex((i) => (i + d + examples.length) % examples.length);

    return (
        <section className={`${styles.section} ${styles.bgLight} ${styles.examplesSection}`} id="workflow-examples">
            <div className={styles.container}>
                <div className={`${styles.center} ${styles.sectionHead}`}>
                    <span className={styles.eyebrow}>Workflow Examples</span>
                    <h2 className={styles.h2}>What AI deployment looks like in practice</h2>
                </div>

                <article className={styles.slide} key={ex.tab}>
                    <div className={styles.slideText}>
                        <span className={styles.slideTag}>{ex.tag}</span>
                        <h3 className={styles.slideTitle}>{ex.title}</h3>
                        <div className={styles.compare}>
                            <div>
                                <div className={styles.compareLabel}>Before</div>
                                <p>{ex.before}</p>
                            </div>
                            <div className={styles.compareAfter}>
                                <div className={styles.compareLabel}>With AI</div>
                                <p>{ex.after}</p>
                            </div>
                        </div>
                        <Link href="/services/ai-agents" className={`${styles.textLink} ${styles.slideLink}`}>
                            Learn more <ArrowRight size={14} />
                        </Link>
                    </div>
                    <div className={`${styles.scene} ${styles[ex.tone]}`} aria-hidden="true">
                        {ex.scene}
                    </div>
                </article>

                <div className={styles.carouselNav}>
                    <div className={styles.carouselTabs} role="tablist" aria-label="Workflow examples">
                        {examples.map((e, i) => (
                            <button
                                key={e.tab}
                                type="button"
                                role="tab"
                                aria-selected={i === index}
                                className={`${styles.carouselTab} ${i === index ? styles.carouselTabActive : ''}`}
                                onClick={() => setIndex(i)}
                            >
                                {e.tab}
                            </button>
                        ))}
                    </div>
                    <div className={styles.arrows}>
                        <button type="button" className={styles.arrowBtn} onClick={() => go(-1)} aria-label="Previous example">
                            <ArrowLeft size={18} />
                        </button>
                        <button type="button" className={styles.arrowBtn} onClick={() => go(1)} aria-label="Next example">
                            <ArrowRight size={18} />
                        </button>
                    </div>
                </div>

                <p className={styles.carouselNote}>
                    Illustrative examples of workflows we deploy, not client case studies.
                </p>
            </div>
        </section>
    );
}
