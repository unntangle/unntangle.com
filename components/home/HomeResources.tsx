import type { ReactNode } from 'react';
import { ArrowRight, Bot, PhoneIncoming, Stethoscope, User } from 'lucide-react';
import styles from './Home.module.css';

/**
 * "AI Products" — three product cards.
 *
 * Card design: bright, subtle gradient frame; white tile at the top with a
 * small 2D illustration of what the product does (built in HTML/CSS, no
 * images); white inner panel at the bottom with the label and product
 * name. On hover the panel slides up to reveal a description while the
 * illustration blurs behind it. On touch screens everything is shown.
 *
 * Anchor: #ai-products (navbar link).
 */

/* ---------- 2D illustrations ---------- */

// uVOIZ — an AI voice call with a live waveform and language chips
function VoizIllo() {
    const bars = Array.from({ length: 22 });
    return (
        <div className={styles.illo} aria-hidden="true">
            <div className={styles.illoRow}>
                <span className={styles.illoAvatar}><Bot size={17} /></span>
                <span>
                    <span className={styles.illoName}>AI voice agent</span>
                    <span className={styles.illoMeta}>Lead follow-up call</span>
                </span>
                <span className={styles.illoLive}>On call</span>
            </div>
            <div className={styles.wave}>
                {bars.map((_, i) => (
                    <span key={i} style={{ animationDelay: `${(i % 7) * 0.12}s` }} />
                ))}
            </div>
            <div className={styles.langs}>
                <span className={styles.lang}>English</span>
                <span className={styles.lang}>हिन्दी</span>
                <span className={styles.lang}>தமிழ்</span>
                <span className={styles.lang}>తెలుగు</span>
            </div>
        </div>
    );
}

// uDYLR — incoming call queue, routine calls to AI, complex to a person
function DylrIllo() {
    const rows: { label: string; tag: string; human?: boolean }[] = [
        { label: 'Order status', tag: 'AI' },
        { label: 'Payment query', tag: 'AI' },
        { label: 'Complaint', tag: 'Agent', human: true },
    ];
    return (
        <div className={styles.illo} aria-hidden="true">
            <div className={styles.illoRow}>
                <span className={styles.illoName}>Incoming queue</span>
                <span className={styles.illoLive}>Live</span>
            </div>
            {rows.map((r, i) => (
                <div key={r.label} className={styles.queueRow} style={{ animationDelay: `${i * 0.12}s` }}>
                    <PhoneIncoming size={13} />
                    {r.label}
                    <span className={`${styles.queueTag} ${r.human ? styles.queueTagHuman : ''}`}>
                        {r.tag}
                    </span>
                </div>
            ))}
        </div>
    );
}

// uSCRIBR — doctor/patient conversation becoming a structured note
function ScribrIllo() {
    return (
        <div className={styles.illo} aria-hidden="true">
            <div className={styles.scribe}>
                <div className={styles.bubbles}>
                    <span className={styles.bubble}>
                        <Stethoscope size={10} style={{ verticalAlign: '-1px', marginRight: 4 }} />
                        How long has it hurt?
                    </span>
                    <span className={`${styles.bubble} ${styles.bubbleAlt}`}>
                        <User size={10} style={{ verticalAlign: '-1px', marginRight: 4 }} />
                        About a week.
                    </span>
                </div>
                <span className={styles.scribeArrow}><ArrowRight size={14} /></span>
                <div className={styles.note}>
                    <span className={styles.noteHead}>Subjective</span>
                    <span className={styles.noteLine} />
                    <span className={styles.noteLine} style={{ width: '70%' }} />
                    <span className={styles.noteHead}>Plan</span>
                    <span className={styles.noteLine} />
                    <span className={styles.noteLine} style={{ width: '55%' }} />
                </div>
            </div>
        </div>
    );
}

/* ---------- Data ---------- */

const products: {
    key: string;
    badge: string;
    title: string;
    desc: string;
    href: string | null;
    tone: string;
    illo: ReactNode;
}[] = [
    {
        key: 'uvoiz',
        badge: 'Beta',
        title: 'uVOIZ: AI voice agents for routine business calls',
        desc: 'Handles lead qualification, follow-ups and first-line support calls in multiple Indian languages, and passes the conversation to your team when a person is needed.',
        href: 'https://uvoiz.unntangle.com',
        tone: 'prodPeach',
        illo: <VoizIllo />,
    },
    {
        key: 'udylr',
        badge: 'Coming Soon',
        title: 'uDYLR: AI contact-center workflows',
        desc: 'Takes repetitive customer interactions off your agents\u2019 queue, with routing and agent assist designed around your existing CRM.',
        href: null,
        tone: 'prodLavender',
        illo: <DylrIllo />,
    },
    {
        key: 'uscribr',
        badge: 'Coming Soon',
        title: 'uSCRIBR: AI clinical documentation',
        desc: 'Turns clinical conversations into structured notes for review, so healthcare professionals spend less time on paperwork.',
        href: null,
        tone: 'prodMint',
        illo: <ScribrIllo />,
    },
];

export default function HomeResources() {
    return (
        <section className={`${styles.section} ${styles.bgLight}`} id="ai-products">
            <div className={styles.container}>
                <div className={styles.resourceHead}>
                    <div>
                        <span className={styles.eyebrow}>AI Products</span>
                        <h2 className={styles.h2}>AI Products Built by Unntangle</h2>
                        <p className={styles.lead}>
                            Specialised AI products for workflows we see again and again, each
                            labelled with its current stage.
                        </p>
                    </div>
                </div>

                <div className={styles.prodGrid}>
                    {products.map((p) => {
                        const inner = (
                            <>
                                <div className={styles.prodMedia}>
                                    {p.illo}
                                </div>
                                <div className={styles.prodPanel}>
                                    <span className={styles.prodType}>AI Product</span>
                                    <span className={styles.prodTitle}>
                                        {(() => {
                                            const [name, ...rest] = p.title.split(':');
                                            return (
                                                <>
                                                    <strong className={styles.prodName}>{name}</strong>
                                                    {rest.length > 0 && `:${rest.join(':')}`}
                                                </>
                                            );
                                        })()}
                                    </span>
                                    <p className={styles.prodDesc}>{p.desc}</p>
                                    <span className={styles.prodBadgeWrap}>
                                        <span className={styles.prodBadge}>{p.badge}</span>
                                    </span>
                                    <span className={styles.prodArrow} aria-hidden="true">
                                        <ArrowRight size={18} />
                                    </span>
                                </div>
                            </>
                        );
                        const cls = `${styles.prodCard} ${styles[p.tone]}`;
                        return p.href ? (
                            <a
                                key={p.key}
                                href={p.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cls}
                            >
                                {inner}
                            </a>
                        ) : (
                            <div key={p.key} className={`${cls} ${styles.prodStatic}`}>
                                {inner}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
