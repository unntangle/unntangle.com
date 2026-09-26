'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import styles from './Home.module.css';

/**
 * Dark "see it work" band. Instead of a video, an interactive walk-through
 * of one illustrative workflow (RFQ → quotation). Steps auto-advance and
 * can be clicked. Pauses on hover so people can read.
 */

type Actor = 'ai' | 'human' | 'trigger';

const steps: { label: string; actor: Actor; headline: string; body: string }[] = [
    {
        label: 'RFQ received',
        actor: 'trigger',
        headline: 'A Customer Emails an RFQ.',
        body: 'The request arrives the way it always does \u2014 by email, with a PDF attached. Nothing changes for the customer.',
    },
    {
        label: 'AI reads the RFQ',
        actor: 'ai',
        headline: 'AI Reads and Understands the Request.',
        body: 'Products, quantities, delivery dates and special terms are pulled out of the document \u2014 no re-typing.',
    },
    {
        label: 'Checks product & pricing data',
        actor: 'ai',
        headline: 'It Checks Your Own Data.',
        body: 'Product codes, stock and pricing come from your ERP, price lists and past quotations \u2014 not from guesswork.',
    },
    {
        label: 'Drafts the quotation',
        actor: 'ai',
        headline: 'A Quotation Draft Is Prepared.',
        body: 'In your format, with your terms, ready for someone to review.',
    },
    {
        label: 'Human approval',
        actor: 'human',
        headline: 'Your Team Approves.',
        body: 'The right person reviews, edits or rejects the draft. Nothing critical goes out without a person saying yes.',
    },
    {
        label: 'Sent & CRM updated',
        actor: 'ai',
        headline: 'Sent, Logged and Tracked.',
        body: 'The quotation is sent, the CRM is updated, and a follow-up is scheduled \u2014 automatically, once approved.',
    },
];

const actorLabel: Record<Actor, string> = {
    ai: 'AI',
    human: 'Your team',
    trigger: 'Trigger',
};

export default function HomeWorkflowDemo() {
    const [active, setActive] = useState(0);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        if (paused) return;
        const id = setInterval(() => setActive((a) => (a + 1) % steps.length), 3200);
        return () => clearInterval(id);
    }, [paused]);

    const current = steps[active];

    return (
        <section className={`${styles.section} ${styles.bgDark}`} id="how-it-works">
            <div className={styles.container}>
                <div className={`${styles.center} ${styles.sectionHead}`}>
                    <span className={styles.eyebrow}>See it in action</span>
                    <h2 className={styles.h2}>How Repetitive Work Becomes an AI Workflow</h2>
                    <p className={styles.lead}>
                        One example, step by step: a request for quotation that used to pass through
                        several people and systems, now prepared by AI and approved by your team.
                    </p>
                </div>

                <div
                    className={styles.demoStage}
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                >
                    <div className={styles.demoApp}>
                        <div className={styles.demoAppHead}>
                            <div>
                                <span className={styles.demoAppTitle}>RFQ to quotation</span>
                                <span className={styles.demoAppSub}>Example workflow</span>
                            </div>
                            <span className={styles.demoLive}>
                                <span className={styles.demoLiveDot} aria-hidden="true" />
                                Running
                            </span>
                        </div>
                        <ol className={styles.demoSteps}>
                            {steps.map((s, i) => {
                                const cls = [
                                    styles.demoStep,
                                    i < active ? styles.demoStepDone : '',
                                    i === active ? styles.demoStepActive : '',
                                ].join(' ');
                                const dot = s.actor === 'human' ? styles.demoDotHuman : '';
                                return (
                                    <li key={s.label}>
                                        <button
                                            type="button"
                                            className={cls}
                                            onClick={() => setActive(i)}
                                            aria-current={i === active ? 'step' : undefined}
                                        >
                                            <span className={`${styles.demoDot} ${dot}`}>{i + 1}</span>
                                            {s.label}
                                        </button>
                                    </li>
                                );
                            })}
                        </ol>
                    </div>

                    <div className={styles.demoText} aria-live="polite">
                        <div className={styles.demoMeta}>
                            <span
                                className={`${styles.demoActor} ${current.actor === 'human' ? styles.demoActorHuman : ''}`}
                            >
                                {actorLabel[current.actor]}
                            </span>
                            <span className={styles.demoCounter}>
                                Step {active + 1} of {steps.length}
                            </span>
                        </div>
                        <h3 className={styles.demoHeadline}>{current.headline}</h3>
                        <p className={styles.demoBody}>{current.body}</p>
                        <div className={styles.demoProgress} aria-hidden="true">
                            {steps.map((s, i) => (
                                <span
                                    key={s.label}
                                    className={`${styles.demoBar} ${i <= active ? styles.demoBarOn : ''}`}
                                />
                            ))}
                        </div>
                        <div className={styles.demoActions}>
                            <Link href="/contact" className={`${styles.btn} ${styles.btnWhite}`}>
                                <span className={styles.btnIcon}><ArrowRight size={16} /></span>
                                Map a workflow like this
                            </Link>
                        </div>
                        <p className={styles.demoCaption}>
                            Illustrative workflow. Steps and approval points are designed around each business.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
