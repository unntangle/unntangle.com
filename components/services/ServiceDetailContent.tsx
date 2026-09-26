import type { ComponentType, ReactNode } from 'react';
import {
    Monitor, Smartphone, Database, BarChart3, Palette, Cpu, Bot, MessageSquare,
    FileText, Zap, CloudUpload, RefreshCw, Layers, ShieldCheck, LifeBuoy, Home,
    Lock, Sun, ArrowUpCircle, DoorOpen, Brain, Plus, Check, ArrowRight,
    Handshake, Receipt, ShoppingCart, Settings2, MessagesSquare, Search, Mail,
    CreditCard, Bell, WifiOff, MapPin, MessageCircle, LayoutDashboard, Package,
    ClipboardList, Factory, Wallet, Users, Megaphone, Share2, Presentation,
    Printer, Sparkles, Image as ImageIcon, Languages,
} from 'lucide-react';
import type { ServiceData } from '@/data/services';
import { serviceLayouts, type ServiceSection } from '@/data/serviceLayouts';
import about from '../about/About.module.css';
import styles from './Services.module.css';
import b from './ServiceBlocks.module.css';
import ServicesCTA from './ServicesCTA';

/**
 * Body of every /services/[slug] page, below the hero.
 *
 * Each service has its own section line-up in data/serviceLayouts.ts,
 * mixing signature blocks (timeline, checklist, bento, compare, chips,
 * flow, tiers) with shared blocks drawn from data/services.ts. The
 * overview opens every page and the CTA closes it. Backgrounds alternate
 * automatically. Services without a layout fall back to DEFAULT_LAYOUT.
 */

type IconType = ComponentType<{ size?: number; strokeWidth?: number }>;

const iconMap: Record<string, IconType> = {
    Monitor, Smartphone, Database, BarChart3, Palette, Cpu, Bot, MessageSquare,
    FileText, Zap, CloudUpload, RefreshCw, Layers, ShieldCheck, LifeBuoy, Home,
    Lock, Sun, ArrowUpCircle, DoorOpen, Brain, Handshake, Receipt, ShoppingCart,
    Settings2, MessagesSquare, Search, Mail, CreditCard, Bell, WifiOff, MapPin,
    MessageCircle, LayoutDashboard, Package, ClipboardList, Factory, Wallet, Users,
    Megaphone, Share2, Presentation, Printer, Sparkles, Image: ImageIcon, Languages,
};

const valueTones = [about.tonePeach, about.toneMint, about.toneLavender, about.toneSky, about.toneRose, about.toneButter];
const stepTones = [about.tonePeach, about.toneMint, about.toneLavender, about.toneSky];
const useTones = [styles.flat1, styles.flat2, styles.flat3, styles.flat4, styles.flat5, styles.flat6];
const tileTones = [b.t1, b.t2, b.t3, b.t4, b.t5, b.t6, b.t7, b.t8];
const barTones = [b.bar1, b.bar2, b.bar3, b.bar4];
const actorClass = { ai: b.actorAi, human: b.actorHuman, system: b.actorSystem };
const actorLabel = { ai: 'AI', human: 'Your team', system: 'System' };

const DEFAULT_LAYOUT: ServiceSection[] = [
    { type: 'capabilities', heading: 'Core', accent: 'Capabilities' },
    { type: 'approach', heading: 'How We', accent: 'Approach It' },
    { type: 'deliverables', heading: 'What You', accent: 'Receive' },
    { type: 'usecases', heading: 'Where It', accent: 'Fits' },
    { type: 'benefits', heading: 'Why It Matters' },
    { type: 'tools', heading: 'Tools We', accent: 'Build With' },
    { type: 'faq', heading: 'Questions,', accent: 'Answered' },
];

/* ---------- Helpers ---------- */

function Title({ s, className = about.h2 }: { s: { heading: string; accent?: string }; className?: string }) {
    return (
        <h2 className={className}>
            {s.heading}
            {s.accent && <> <span className={about.accent}>{s.accent}</span></>}
        </h2>
    );
}

function Head({ s, left = false }: { s: { heading: string; accent?: string; intro?: string }; left?: boolean }) {
    return (
        <div className={`${b.head} ${left ? b.headLeft : ''}`}>
            <Title s={s} />
            {s.intro && <p className={about.body} style={left ? undefined : { margin: '0 auto' }}>{s.intro}</p>}
        </div>
    );
}

function Shell({ light, children }: { light: boolean; children: ReactNode }) {
    return (
        <section className={`${about.section} ${light ? about.bgLight : ''}`}>
            <div className={about.container}>{children}</div>
        </section>
    );
}

/* ---------- Section renderer ---------- */

const SHARED_TYPES = ['capabilities', 'approach', 'deliverables', 'usecases', 'benefits', 'tools', 'faq'];

function renderSection(s: ServiceSection, serviceArg: ServiceData | undefined, light: boolean, key: number): ReactNode {
    // Shared blocks pull content from a service; without one they're skipped.
    if (SHARED_TYPES.includes(s.type) && !serviceArg) return null;
    const service = serviceArg as ServiceData;

    switch (s.type) {
        /* ===== Signature blocks ===== */
        case 'timeline':
            return (
                <Shell key={key} light={light}>
                    <div className={b.timelineWrap}>
                        <div className={b.timelineHead}>
                            <Head s={s} left />
                        </div>
                        <ol className={b.timeline}>
                            {s.items.map((it, i) => (
                                <li key={it.title} className={b.tItem}>
                                    <span className={b.tNum}>{i + 1}</span>
                                    <div>
                                        <h3 className={b.tTitle}>{it.title}</h3>
                                        <p className={b.tText}>{it.text}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>
                </Shell>
            );

        case 'checklist':
            return (
                <Shell key={key} light={light}>
                    <div className={b.checkPanel}>
                        <div>
                            <Title s={s} />
                            {s.intro && <p className={about.body}>{s.intro}</p>}
                            {s.aside && <p className={b.aside}>{s.aside}</p>}
                        </div>
                        <div className={b.checkCard}>
                            <ul className={b.checkGrid}>
                                {s.items.map((t) => (
                                    <li key={t}>
                                        <span className={b.checkMark}><Check size={13} /></span>
                                        {t}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </Shell>
            );

        case 'bento':
            return (
                <Shell key={key} light={light}>
                    <Head s={s} />
                    <div className={b.bento}>
                        {s.items.map((it, i) => {
                            const Icon = iconMap[it.icon] ?? Layers;
                            return (
                                <div key={it.title} className={`${b.tile} ${tileTones[i % tileTones.length]} ${it.wide ? b.tileWide : ''}`}>
                                    <span className={b.tileIcon} aria-hidden="true"><Icon size={22} strokeWidth={1.5} /></span>
                                    <h3 className={b.tileTitle}>{it.title}</h3>
                                    <p className={b.tileText}>{it.text}</p>
                                </div>
                            );
                        })}
                    </div>
                </Shell>
            );

        case 'compare':
            return (
                <Shell key={key} light={light}>
                    <Head s={s} />
                    <div className={b.compare}>
                        <div className={b.compareHead}>
                            <span>{s.left}</span>
                            <span>{s.right}</span>
                        </div>
                        {s.rows.map((r) => (
                            <div key={r.left} className={b.compareRow}>
                                <div>{r.left}</div>
                                <div>{r.right}</div>
                            </div>
                        ))}
                    </div>
                </Shell>
            );

        case 'chips':
            return (
                <Shell key={key} light={light}>
                    <Head s={s} />
                    <div className={b.chipGroups}>
                        {s.groups.map((g) => (
                            <div key={g.label} className={b.chipGroup}>
                                <span className={b.chipLabel}>{g.label}</span>
                                <div className={b.chips}>
                                    {g.items.map((c) => <span key={c} className={b.chip}>{c}</span>)}
                                </div>
                            </div>
                        ))}
                    </div>
                </Shell>
            );

        case 'flow':
            return (
                <Shell key={key} light={light}>
                    <Head s={s} />
                    <div className={b.flow}>
                        {s.items.map((it, i) => (
                            <FlowStep key={it.title} last={i === s.items.length - 1}>
                                <div className={b.flowCard}>
                                    <span className={`${b.actor} ${actorClass[it.actor]}`}>{actorLabel[it.actor]}</span>
                                    <h3 className={b.flowTitle}>{it.title}</h3>
                                    <p className={b.flowText}>{it.text}</p>
                                </div>
                            </FlowStep>
                        ))}
                    </div>
                </Shell>
            );

        case 'tiers':
            return (
                <Shell key={key} light={light}>
                    <Head s={s} />
                    <div className={b.tiers}>
                        {s.items.map((t, i) => (
                            <div key={t.name} className={b.tier}>
                                <div className={`${b.tierBar} ${barTones[i % barTones.length]}`} />
                                <div className={b.tierBody}>
                                    {t.tag && <span className={b.tierTag}>{t.tag}</span>}
                                    <h3 className={b.tierName}>{t.name}</h3>
                                    <p className={b.tierText}>{t.text}</p>
                                    <ul className={b.tierPoints}>
                                        {t.points.map((p) => <li key={p}><Check size={14} />{p}</li>)}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </Shell>
            );

        /* ===== Shared blocks (content from data/services.ts) ===== */
        case 'capabilities':
            return (
                <Shell key={key} light={light}>
                    <Head s={s} />
                    <div className={about.values} style={{ marginTop: 0 }}>
                        {service.features.map((f, i) => {
                            const Icon = iconMap[f.icon] ?? Layers;
                            return (
                                <div key={f.title} className={about.value}>
                                    <div className={`${about.valueIcon} ${valueTones[i % valueTones.length]}`} aria-hidden="true">
                                        <Icon strokeWidth={1.5} />
                                    </div>
                                    <h3 className={about.valueTitle}>{f.title}</h3>
                                    <p className={about.valueText}>{f.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </Shell>
            );

        case 'approach':
            return (
                <Shell key={key} light={light}>
                    <Head s={s} />
                    <div className={about.cardGrid4} style={{ marginTop: 0 }}>
                        {service.process.map((p, i) => (
                            <div key={p.step} className={`${about.journeyCard} ${stepTones[i % stepTones.length]}`}>
                                <span className={styles.stepNum}>Step {p.step}</span>
                                <h3 className={about.journeyHead}>{p.title}</h3>
                                <p className={about.journeyText}>{p.description}</p>
                            </div>
                        ))}
                    </div>
                </Shell>
            );

        case 'deliverables':
            if (!service.deliverables?.length) return null;
            return (
                <Shell key={key} light={light}>
                    <Head s={s} />
                    <div className={styles.deliverGrid} style={{ marginTop: 0 }}>
                        {service.deliverables.map((d) => {
                            const Icon = iconMap[d.icon] ?? Layers;
                            return (
                                <div key={d.title} className={styles.deliverCard}>
                                    <span className={styles.deliverIcon} aria-hidden="true"><Icon size={20} strokeWidth={1.5} /></span>
                                    <div>
                                        <h3 className={styles.deliverTitle}>{d.title}</h3>
                                        <p className={styles.deliverText}>{d.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Shell>
            );

        case 'usecases':
            if (!service.useCases?.length) return null;
            return (
                <Shell key={key} light={light}>
                    <Head s={s} />
                    <div className={styles.useGrid} style={{ marginTop: 0 }}>
                        {service.useCases.map((u, i) => (
                            <div key={u.title} className={`${styles.useCard} ${useTones[i % useTones.length]}`}>
                                <span className={styles.useTag}>{u.industry}</span>
                                <h3 className={styles.useTitle}>{u.title}</h3>
                                <p className={styles.useText}>{u.description}</p>
                            </div>
                        ))}
                    </div>
                </Shell>
            );

        case 'benefits':
            return (
                <section key={key} className={about.numbers}>
                    <div className={about.container}>
                        <h2 className={about.numbersTitle}>
                            {s.heading}{s.accent ? ` ${s.accent}` : ''}<span className={about.numberDot}>.</span>
                        </h2>
                        <div className={styles.benefitGrid}>
                            {service.benefits.map((x) => (
                                <div key={x.title} className={styles.benefit}>
                                    <h3 className={styles.benefitTitle}>{x.title}</h3>
                                    <p className={styles.benefitText}>{x.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            );

        case 'tools':
            if (!service.techStack?.length) return null;
            return (
                <Shell key={key} light={light}>
                    <Head s={s} />
                    <div className={styles.stackRow} style={{ marginTop: 0 }}>
                        {service.techStack.map((t) => (
                            <span key={t.name + (t.category ?? '')} className={styles.stackChip}>
                                {t.name}
                                {t.category && <span className={styles.stackCat}>{t.category}</span>}
                            </span>
                        ))}
                    </div>
                </Shell>
            );

        case 'faq':
            if (!service.faqs?.length) return null;
            return (
                <Shell key={key} light={light}>
                    <Head s={s} />
                    <div className={styles.faqList} style={{ marginTop: 0 }}>
                        {service.faqs.map((q, i) => (
                            <details key={q.question} className={styles.faqItem} open={i === 0}>
                                <summary>
                                    {q.question}
                                    <span className={styles.faqToggle} aria-hidden="true"><Plus size={16} /></span>
                                </summary>
                                <p className={styles.faqAnswer}>{q.answer}</p>
                            </details>
                        ))}
                    </div>
                </Shell>
            );

        default:
            return null;
    }
}

function FlowStep({ last, children }: { last: boolean; children: ReactNode }) {
    return (
        <>
            {children}
            {!last && (
                <span className={b.flowArrow} aria-hidden="true"><ArrowRight size={18} /></span>
            )}
        </>
    );
}

/* ---------- Reusable outside service pages ---------- */

/**
 * Renders a list of signature sections (timeline, checklist, bento,
 * compare, chips, flow, tiers) on any page, e.g. industry and security
 * pages. Backgrounds alternate starting from `startLight`.
 */
export function BlockSections({
    sections,
    startLight = true,
}: {
    sections: ServiceSection[];
    startLight?: boolean;
}) {
    return (
        <>
            {sections.map((s, i) =>
                renderSection(s, undefined, startLight ? i % 2 === 0 : i % 2 === 1, i),
            )}
        </>
    );
}

/* ---------- Page body ---------- */

export default function ServiceDetailContent({ service }: { service: ServiceData }) {
    const layout = serviceLayouts[service.id] ?? DEFAULT_LAYOUT;

    // Drop shared blocks that have no data for this service, so background
    // alternation stays even.
    const visible = layout.filter((s) => {
        if (s.type === 'deliverables') return !!service.deliverables?.length;
        if (s.type === 'usecases') return !!service.useCases?.length;
        if (s.type === 'tools') return !!service.techStack?.length;
        if (s.type === 'faq') return !!service.faqs?.length;
        return true;
    });

    return (
        <>
            {/* Overview opens every page */}
            <section className={about.section}>
                <div className={`${about.container} ${about.center}`}>
                    <h2 className={about.h2}>
                        What <span className={about.accent}>{service.title}</span> Covers.
                    </h2>
                    <p className={about.body}>{service.overview}</p>
                </div>
            </section>

            {visible.map((s, i) => renderSection(s, service, i % 2 === 0, i))}

            <ServicesCTA
                pageKey={service.id}
                title={`Talk to Us About ${service.title}`}
                text="Tell us what you're working on. We'll scope it with you, be honest about what it involves, and suggest the right way to deliver it."
            />
        </>
    );
}
