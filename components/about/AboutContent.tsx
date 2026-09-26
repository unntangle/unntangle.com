import Link from 'next/link';
import {
    ArrowRight,
    CheckCircle2,
    Target,
    Plug,
    Users,
    Rocket,
    RefreshCw,
    Layers,
} from 'lucide-react';
import styles from './About.module.css';
import btn from '../home/Home.module.css';
import { ctaGradientFor } from '../pastelPalette';

/**
 * About page body, below the hero.
 *
 * Content is carried over from the previous About sections
 * (AboutStatsHero, OurJourney, OwnResponsibilities, AboutProducts,
 * Philosophy, Roadmap, Vision) and re-laid out:
 *   What we do → Who we are / How we work / AI products (alternating
 *   rows) → At a glance (dark band) → What to expect (values) →
 *   Our journey → The road ahead → Vision → Get started CTA.
 *
 * Only facts that are true today. No client logos, leadership bios or
 * awards until there is real material for them.
 */

const iconProps = { strokeWidth: 1.5 };

const values = [
    {
        title: 'Business-First',
        icon: <Target {...iconProps} />,
        tone: styles.tonePeach,
        text: 'We start with the workflow and the business problem, not the technology, and with how your teams really work.',
    },
    {
        title: 'Built Around Your Systems',
        icon: <Plug {...iconProps} />,
        tone: styles.toneMint,
        text: 'You don\u2019t need to replace your ERP, CRM or existing software. AI connects to the systems you already depend on.',
    },
    {
        title: 'Human-Controlled',
        icon: <Users {...iconProps} />,
        tone: styles.toneLavender,
        text: 'Critical workflows include approval, escalation and oversight. AI prepares and recommends; your team decides when it matters.',
    },
    {
        title: 'Deployment Focused',
        icon: <Rocket {...iconProps} />,
        tone: styles.toneSky,
        text: 'We don\u2019t stop at prototypes. Our focus is AI running inside your real workflows, with your team alongside it.',
    },
    {
        title: 'Built To Evolve',
        icon: <RefreshCw {...iconProps} />,
        tone: styles.toneRose,
        text: 'Start with one workflow and expand across departments, step by step, without disrupting how your teams work.',
    },
    {
        title: 'AI and Software, One Team',
        icon: <Layers {...iconProps} />,
        tone: styles.toneButter,
        text: 'The same team deploys your AI and builds your websites, apps and custom software, so everything works together.',
    },
];

const journey = [
    {
        year: '2020',
        head: 'Unntangle Is Founded.',
        text: 'A small team of engineers and designers comes together in Chennai with one belief: build for the outcome, not just the deliverable. We start with websites, apps and custom software.',
        tone: styles.tonePeach,
    },
    {
        year: '2024',
        head: 'First Products Ship.',
        text: 'We launch uVOIZ, AI voice agents for routine business calls, alongside our website, app and software work.',
        tone: styles.toneMint,
    },
    {
        year: '2025',
        head: 'Focused on AI Implementation.',
        text: 'Unntangle focuses on implementing and deploying AI inside businesses, connected to the systems they already use, alongside websites, apps and custom software.',
        tone: styles.toneLavender,
    },
    {
        year: '2026',
        head: 'Expanding Our AI Products.',
        text: 'uDYLR and uSCRIBR enter development, and every system we build is designed so AI workflows can be added on top.',
        tone: styles.toneSky,
    },
];

const road = [
    { year: '2026', title: 'Assessment-Led Engagements', text: 'The AI Workflow Assessment becomes the standard starting point for every new AI engagement.' },
    { year: '2026', title: 'Production AI Deployments', text: 'AI workflows running inside sales, finance, procurement and operations, with human approval built in.' },
    { year: '2027', title: 'Reusable Integration Library', text: 'Tested connectors for common ERPs, CRMs, email and WhatsApp, so each deployment reaches production faster.' },
    { year: '2027', title: 'AI Products Mature', text: 'uVOIZ moves beyond beta, and uDYLR and uSCRIBR move into pilots with early customers.' },
    { year: '2027', title: 'AI-Ready Software by Default', text: 'Every website, app and system we build is structured so AI workflows can be added without rebuilding.' },
    { year: '2028', title: 'Wider Footprint', text: 'AI implementation and software engagements beyond India, starting with the Middle East and Southeast Asia.' },
];

export default function AboutContent() {
    return (
        <>
            {/* ---------- What we do ---------- */}
            <section className={styles.section}>
                <div className={`${styles.container} ${styles.center}`}>
                    <h2 className={styles.h2}>
                        Making AI <span className={styles.accent}>Practical</span> for Real Businesses.
                    </h2>
                    <p className={styles.body}>
                        Unntangle helps businesses turn repetitive work into AI-powered workflows
                        inside the systems they already use. We find the workflows worth
                        automating, build the AI agents and integrations around them, and deploy
                        them into production with your people in control.
                    </p>
                    <p className={styles.body}>
                        Alongside AI, we build the websites, apps and custom software businesses
                        run on, so the systems AI depends on are designed to work with it from
                        the start.
                    </p>
                    <div className={styles.links}>
                        <Link href="/services" className={styles.link}>
                            Explore our services <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ---------- Alternating rows ---------- */}
            <section className={`${styles.section} ${styles.bgLight}`}>
                <div className={styles.container}>
                    {/* Who we are */}
                    <div className={styles.row}>
                        <div className={styles.rowMedia}>
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1400"
                                alt="The Unntangle team collaborating"
                                loading="lazy"
                            />
                        </div>
                        <div>
                            <h2 className={styles.h2}>
                                The People <span className={styles.accent}>Behind the Work.</span>
                            </h2>
                            <p className={styles.body}>
                                We&apos;re a team of engineers and designers based in Chennai, India,
                                founded in 2020. We started by building websites, apps and custom
                                software, and launched our first AI product, uVOIZ, in 2024.
                            </p>
                            <p className={styles.body}>
                                Since 2025 we&apos;ve focused on implementing and deploying AI inside
                                businesses, especially B2B organisations where orders, documents and
                                approvals move across many people and systems.
                            </p>
                            <div className={styles.links}>
                                <Link href="/services" className={styles.link}>
                                    What we build <ArrowRight size={14} />
                                </Link>
                                <Link href="/blog" className={styles.link}>
                                    Read our Knowledge Hub <ArrowRight size={14} />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* How we work */}
                    <div className={`${styles.row} ${styles.rowReverse}`}>
                        <div className={styles.rowMedia}>
                            <img
                                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1400"
                                alt="The Unntangle team in a working session"
                                loading="lazy"
                            />
                            <span className={styles.mediaPill}>One team · AI &amp; Software</span>
                        </div>
                        <div>
                            <h2 className={styles.h2}>
                                How <span className={styles.accent}>We Work.</span>
                            </h2>
                            <p className={styles.body}>
                                Outcomes first, excuses never. Two principles shape every engagement.
                            </p>
                            <ul className={styles.checkList}>
                                <li><CheckCircle2 size={16} />We keep our eye on the outcome: success measures agreed before we build, and results reviewed with you after go-live.</li>
                                <li><CheckCircle2 size={16} />Working software shown early and often, not saved for a big reveal.</li>
                                <li><CheckCircle2 size={16} />We own responsibilities: when something goes wrong, we surface it, fix it and absorb the impact.</li>
                                <li><CheckCircle2 size={16} />One accountable team across AI, software and design, with transparent status and escalations.</li>
                            </ul>
                            <div className={styles.actions}>
                                <Link href="/contact" className={`${btn.btn} ${btn.btnDark}`}>
                                    <span className={btn.btnIcon}><ArrowRight size={16} /></span>
                                    Book an AI Workflow Assessment
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* AI products */}
                    <div className={styles.row}>
                        <div className={styles.rowMedia}>
                            <img
                                src="https://images.unsplash.com/photo-1587560699334-cc4ff634909a?auto=format&fit=crop&q=80&w=1400"
                                alt="AI voice agents supporting customer conversations"
                                loading="lazy"
                            />
                        </div>
                        <div>
                            <h2 className={styles.h2}>
                                Meet Our <span className={styles.accent}>AI Products.</span>
                            </h2>
                            <p className={styles.body}>
                                For workflows we see again and again, we build specialised AI
                                products, each labelled with its current stage.
                            </p>
                            <div className={styles.productList}>
                                <div className={styles.productItem}>
                                    <span>
                                        <span className={styles.productName}>uVOIZ</span>
                                        <span className={styles.productDesc}>AI voice agents for routine business calls</span>
                                    </span>
                                    <span className={styles.stage}>Beta</span>
                                </div>
                                <div className={styles.productItem}>
                                    <span>
                                        <span className={styles.productName}>uDYLR</span>
                                        <span className={styles.productDesc}>AI contact-center workflows</span>
                                    </span>
                                    <span className={styles.stage}>Coming Soon</span>
                                </div>
                                <div className={styles.productItem}>
                                    <span>
                                        <span className={styles.productName}>uSCRIBR</span>
                                        <span className={styles.productDesc}>AI clinical documentation</span>
                                    </span>
                                    <span className={styles.stage}>Coming Soon</span>
                                </div>
                            </div>
                            <div className={styles.links}>
                                <Link href="/#ai-products" className={styles.link}>
                                    Explore AI products <ArrowRight size={14} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ---------- At a glance ---------- */}
            <section className={styles.numbers}>
                <div className={styles.container}>
                    <h2 className={styles.numbersTitle}>Unntangle at a Glance</h2>
                    <div className={styles.numbersGrid}>
                        <div>
                            <div className={styles.numberValue}>3<span className={styles.numberDot}>.</span></div>
                            <p className={styles.numberLabel}>Service pillars: AI, websites &amp; apps, custom software</p>
                        </div>
                        <div>
                            <div className={styles.numberValue}>3<span className={styles.numberDot}>.</span></div>
                            <p className={styles.numberLabel}>AI products: 1 in beta, 2 coming soon</p>
                        </div>
                        <div>
                            <div className={styles.numberValue}>2020<span className={styles.numberDot}>.</span></div>
                            <p className={styles.numberLabel}>Founded in Chennai, India</p>
                        </div>
                        <div>
                            <div className={styles.numberValue}>100%<span className={styles.numberDot}>.</span></div>
                            <p className={styles.numberLabel}>In-house engineering team</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ---------- What to expect ---------- */}
            <section className={styles.section}>
                <div className={`${styles.container} ${styles.center}`}>
                    <h2 className={styles.h2}>
                        The Principles Behind <span className={styles.accent}>Every Project.</span>
                    </h2>
                    <div className={styles.values}>
                        {values.map((v) => (
                            <div key={v.title} className={styles.value}>
                                <div className={`${styles.valueIcon} ${v.tone}`} aria-hidden="true">
                                    {v.icon}
                                </div>
                                <h3 className={styles.valueTitle}>{v.title}</h3>
                                <p className={styles.valueText}>{v.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---------- Our journey ---------- */}
            <section className={`${styles.section} ${styles.bgLight}`}>
                <div className={styles.container}>
                    <div className={styles.center}>
                        <h2 className={styles.h2}>Our Journey.</h2>
                        <p className={styles.body}>From a small team in Chennai to an AI implementation partner.</p>
                    </div>
                    <div className={styles.cardGrid4}>
                        {journey.map((j) => (
                            <div key={j.year} className={`${styles.journeyCard} ${j.tone}`}>
                                <div className={styles.journeyYear}>{j.year}</div>
                                <h3 className={styles.journeyHead}>{j.head}</h3>
                                <p className={styles.journeyText}>{j.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---------- The road ahead ---------- */}
            <section className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.center}>
                        <h2 className={styles.h2}>
                            The Road <span className={styles.accent}>Ahead.</span>
                        </h2>
                        <p className={styles.body}>
                            Directional milestones for the next few years. As we reach them, they
                            move into our journey above.
                        </p>
                    </div>
                    <div className={styles.cardGrid3}>
                        {road.map((r) => (
                            <div key={r.title} className={styles.roadCard}>
                                <span className={styles.roadYear}>{r.year}</span>
                                <h3 className={styles.roadTitle}>{r.title}</h3>
                                <p className={styles.roadText}>{r.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---------- Vision ---------- */}
            <section className={`${styles.vision} ${styles.bgLight}`}>
                <div className={styles.container}>
                    <p className={styles.visionQuote}>
                        &ldquo;Every business should be able to put AI to work inside the systems it
                        already runs, practically, safely and with its people in control.&rdquo;
                    </p>
                </div>
            </section>

            {/* ---------- Get started CTA ---------- */}
            <section className={styles.ctaWrap} style={{ paddingTop: 80 }}>
                <div className={styles.cta} style={{ background: ctaGradientFor('about') }}>
                    <h2 className={styles.ctaTitle}>Let&apos;s Put AI to Work in Your Business</h2>
                    <p className={styles.ctaText}>
                        Bring us a workflow that&apos;s eating your team&apos;s time, or a website,
                        app or system you need built. We&apos;ll help you find the right next step.
                    </p>
                    <div className={styles.ctaActions}>
                        <Link href="/contact" className={`${btn.btn} ${btn.btnDark}`}>
                            <span className={btn.btnIcon}><ArrowRight size={16} /></span>
                            Book an AI Workflow Assessment
                        </Link>
                        <Link href="/contact" className={`${btn.btn} ${btn.btnLight}`}>
                            Discuss a Software Project
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
