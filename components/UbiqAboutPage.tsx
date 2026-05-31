'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    ArrowRight, Check,
    Sparkles, EyeOff, Shuffle, HeartHandshake,
    Radar, Brain, SlidersHorizontal, LifeBuoy,
    BrainCircuit, Box,
    type LucideIcon,
} from 'lucide-react';
import styles from './UbiqAboutPage.module.css';

/* ============================================================
 * uBIQ - About page body.
 * Light theme, cyan accent, alternating white / off-white bands.
 * Mirrors the brand positioning: a vendor-independent smart-space
 * brand by Unntangle that designs intelligent ecosystems rather
 * than installing devices.
 * ============================================================ */

const ease = [0.16, 1, 0.3, 1] as const;

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay, ease }}
        >
            {children}
        </motion.div>
    );
}

const stats: { num: string; label: string }[] = [
    { num: '2023', label: 'Innovating since' },
    { num: '9+', label: 'Technology categories integrated' },
    { num: '100%', label: 'Vendor-independent' },
    { num: '4', label: 'Layers - Sense / Learn / Adapt / Care' },
];

const journey: { year: string; title: string; text: string }[] = [
    { year: '2023', title: 'Unntangle is founded', text: 'An innovation studio built around immersive, interactive and intelligent technology.' },
    { year: '2024', title: 'Intelligence meets the built environment', text: 'We begin applying AI, IoT and immersive design to physical, lived-in spaces.' },
    { year: '2025', title: 'uBIQ takes shape', text: 'The smart-space brand forms around a single idea - an intelligence layer for spaces.' },
    { year: '2026', title: 'Connected ecosystems', text: 'Senz, Twin and Care+ unite adaptive automation, digital twins and lifelong care.' },
];

const philosophy: { icon: LucideIcon; title: string; text: string }[] = [
    { icon: Sparkles, title: 'Intelligence over automation', text: 'Automation reacts to commands. Intelligence anticipates needs - uBIQ adds a layer that learns and adapts.' },
    { icon: EyeOff, title: 'Invisible by design', text: 'The best technology disappears. No clutter, no friction - just a space that quietly responds.' },
    { icon: Shuffle, title: 'Vendor-independent', text: 'We choose the right system for each space, never locked to a single manufacturer or product line.' },
    { icon: HeartHandshake, title: 'Designed around people', text: 'Routines, comfort and wellbeing lead - the technology follows how you actually live and work.' },
];

const steps: { icon: LucideIcon; label: string; text: string }[] = [
    { icon: Radar, label: 'Sense', text: 'We map how a space is used and what its people need.' },
    { icon: Brain, label: 'Learn', text: 'Behaviour, occupancy and context teach the system over time.' },
    { icon: SlidersHorizontal, label: 'Adapt', text: 'Lighting, climate, media and security adjust automatically.' },
    { icon: LifeBuoy, label: 'Care', text: 'Continuous monitoring keeps the environment optimised for years.' },
];

const ecosystem: { icon: LucideIcon; name: string; mark: string; cat: string; text: string }[] = [
    { icon: BrainCircuit, name: 'uBIQ', mark: 'Senz', cat: 'Adaptive Intelligence', text: 'The behavioural engine that learns routines and personalises every space.' },
    { icon: Box, name: 'uBIQ', mark: 'Twin', cat: 'Digital Experience', text: 'An interactive digital representation that visualises and controls your space.' },
    { icon: LifeBuoy, name: 'uBIQ', mark: 'Care+', cat: 'Smart Ownership', text: 'Continuous care that keeps your intelligent environment optimised.' },
];

const differentiators: string[] = [
    'We design intelligent ecosystems - not one-off device installs.',
    'Independent of any single manufacturer or platform.',
    'Proven systems (KNX, Matter, Crestron and more) made intelligent.',
    'Backed by Unntangle\u2019s immersive-technology expertise since 2023.',
];

export default function UbiqAboutPage() {
    return (
        <>
            {/* ---------------- HERO ---------------- */}
            <section className={`${styles.section} ${styles.hero}`}>
                <div className={styles.heroGlow} />
                <div className={styles.heroGrid} />
                <div className={`${styles.inner} ${styles.heroInner}`}>
                    <span className={styles.eyebrow}>About uBIQ</span>
                    <h1 className={styles.heroTitle}>
                        We design intelligent spaces - <span className={styles.accent}>not just install devices.</span>
                    </h1>
                    <p className={styles.heroLead}>
                        uBIQ is Unntangle&apos;s smart space automation brand. We turn homes, workplaces and commercial
                        environments into connected, adaptive spaces - uniting world-class technologies into one
                        seamless intelligence layer designed around the people who use them.
                    </p>
                    <p className={styles.heroCredit}>A smart space automation brand by Unntangle &middot; Since 2023</p>
                </div>
            </section>

            {/* ---------------- WHO WE ARE ---------------- */}
            <section className={`${styles.section} ${styles.story}`}>
                <div className={styles.inner}>
                    <div className={styles.split}>
                        <Reveal>
                            <div className={styles.splitLeft}>
                                <span className={styles.tag}>Who we are</span>
                                <h2 className={styles.h2}>A smart space brand, built on an innovation studio.</h2>
                            </div>
                        </Reveal>
                        <Reveal delay={0.1}>
                            <div className={styles.splitRight}>
                                <p className={styles.p}>
                                    uBIQ exists to make spaces genuinely intelligent. Where traditional automation waits for
                                    a command, uBIQ adds a layer that senses, learns and adapts - so an environment quietly
                                    works around the way you live and work.
                                </p>
                                <p className={styles.p}>
                                    We are not a dealer or a reseller. uBIQ is a vendor-independent integrator and experience
                                    designer: we bring together the best technologies in the world and orchestrate them into
                                    one cohesive ecosystem.
                                </p>
                                <p className={styles.p}>
                                    Every uBIQ environment is composed, not assembled - designed around people first, with the
                                    technology kept quietly in the background.
                                </p>
                            </div>
                        </Reveal>
                    </div>

                    <Reveal>
                        <div className={styles.stats}>
                            {stats.map((s) => (
                                <div key={s.label} className={styles.stat}>
                                    <span className={styles.statNum}>{s.num}</span>
                                    <span className={styles.statLabel}>{s.label}</span>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ---------------- POWERED BY UNNTANGLE ---------------- */}
            <section className={`${styles.section} ${styles.parent}`}>
                <div className={styles.inner}>
                    <Reveal>
                        <div className={styles.center}>
                            <span className={styles.tag}>Powered by Unntangle</span>
                            <h2 className={styles.h2}>Backed by an innovation company.</h2>
                            <p className={styles.pCenter}>
                                Unntangle is a technology innovation company established in 2023, building immersive and
                                intelligent experiences. uBIQ channels that expertise into the built environment - applying
                                what Unntangle knows about interaction, visualisation and AI to physical spaces.
                            </p>
                            <Link href="/" className={styles.textLink}>
                                Visit Unntangle <ArrowRight size={16} />
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ---------------- INNOVATION JOURNEY ---------------- */}
            <section className={`${styles.section} ${styles.journey}`}>
                <div className={styles.inner}>
                    <Reveal>
                        <div className={styles.head}>
                            <span className={styles.tag}>Innovation journey</span>
                            <h2 className={styles.h2}>From immersive experiences to intelligent spaces.</h2>
                        </div>
                    </Reveal>
                    <div className={styles.timeline}>
                        {journey.map((j, i) => (
                            <Reveal key={j.year} delay={i * 0.08}>
                                <div className={styles.tItem}>
                                    <span className={styles.tYear}>{j.year}</span>
                                    <span className={styles.tDot} aria-hidden="true" />
                                    <div className={styles.tBody}>
                                        <h3 className={styles.tTitle}>{j.title}</h3>
                                        <p className={styles.tText}>{j.text}</p>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---------------- TECHNOLOGY PHILOSOPHY ---------------- */}
            <section className={`${styles.section} ${styles.philosophy}`}>
                <div className={styles.inner}>
                    <Reveal>
                        <div className={styles.head}>
                            <span className={styles.tag}>Technology philosophy</span>
                            <h2 className={styles.h2}>How we think about intelligence.</h2>
                        </div>
                    </Reveal>
                    <div className={styles.cardGrid}>
                        {philosophy.map((c, i) => {
                            const Icon = c.icon;
                            return (
                                <Reveal key={c.title} delay={i * 0.06}>
                                    <div className={styles.card}>
                                        <span className={styles.cardIcon}><Icon size={20} strokeWidth={1.7} /></span>
                                        <h3 className={styles.cardTitle}>{c.title}</h3>
                                        <p className={styles.cardText}>{c.text}</p>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ---------------- INTEGRATION APPROACH ---------------- */}
            <section className={`${styles.section} ${styles.approach}`}>
                <div className={styles.inner}>
                    <Reveal>
                        <div className={styles.head}>
                            <span className={styles.tag}>Integration approach</span>
                            <h2 className={styles.h2}>We make proven technology intelligent.</h2>
                            <p className={styles.pCenter}>
                                uBIQ doesn&apos;t replace the systems you trust - KNX, Matter, Crestron, Lutron and more. We
                                sit a layer above them, turning a controllable space into one that understands the people in it.
                            </p>
                        </div>
                    </Reveal>
                    <div className={styles.steps}>
                        {steps.map((s, i) => {
                            const Icon = s.icon;
                            return (
                                <Reveal key={s.label} delay={i * 0.06}>
                                    <div className={styles.step}>
                                        <span className={styles.stepIcon}><Icon size={20} strokeWidth={1.7} /></span>
                                        <span className={styles.stepNum}>0{i + 1}</span>
                                        <h3 className={styles.stepLabel}>{s.label}</h3>
                                        <p className={styles.stepText}>{s.text}</p>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ---------------- ECOSYSTEM RECAP ---------------- */}
            <section className={`${styles.section} ${styles.ecosystem}`}>
                <div className={styles.inner}>
                    <Reveal>
                        <div className={styles.head}>
                            <span className={styles.tag}>The ecosystem</span>
                            <h2 className={styles.h2}>Three layers of intelligence.</h2>
                        </div>
                    </Reveal>
                    <div className={styles.ecoGrid}>
                        {ecosystem.map((e, i) => {
                            const Icon = e.icon;
                            return (
                                <Reveal key={e.mark} delay={i * 0.06}>
                                    <div className={styles.ecoCard}>
                                        <span className={styles.cardIcon}><Icon size={20} strokeWidth={1.7} /></span>
                                        <span className={styles.ecoCat}>{e.cat}</span>
                                        <h3 className={styles.ecoName}>{e.name} <span className={styles.accent}>{e.mark}</span></h3>
                                        <p className={styles.cardText}>{e.text}</p>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                    <Reveal>
                        <div className={styles.ecoFootLink}>
                            <Link href="/ubiq#platforms" className={styles.textLink}>
                                Explore the platform <ArrowRight size={16} />
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ---------------- WHY uBIQ ---------------- */}
            <section className={`${styles.section} ${styles.why}`}>
                <div className={styles.inner}>
                    <div className={styles.split}>
                        <Reveal>
                            <div className={styles.splitLeft}>
                                <span className={styles.tag}>Why uBIQ</span>
                                <h2 className={styles.h2}>Not a device installer. An ecosystem designer.</h2>
                            </div>
                        </Reveal>
                        <Reveal delay={0.1}>
                            <ul className={styles.whyList}>
                                {differentiators.map((d) => (
                                    <li key={d} className={styles.whyItem}>
                                        <Check size={18} strokeWidth={2.4} className={styles.whyCheck} />
                                        <span>{d}</span>
                                    </li>
                                ))}
                            </ul>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ---------------- CTA ---------------- */}
            <section className={`${styles.section} ${styles.ctaSection}`}>
                <div className={styles.inner}>
                    <Reveal>
                        <div className={styles.ctaBand}>
                            <div className={styles.ctaGlow} />
                            <div className={styles.ctaContent}>
                                <span className={styles.tag}>Start the conversation</span>
                                <h2 className={styles.ctaTitle}>
                                    Design your <span className={styles.accent}>intelligent space.</span>
                                </h2>
                                <p className={styles.pCenter}>
                                    Tell us about your home, workplace or project. We&apos;ll walk you through what&apos;s
                                    possible - no pressure, no jargon.
                                </p>
                                <div className={styles.ctaActions}>
                                    <Link href="/contact" className={styles.ctaPrimary}>
                                        Book Experience <ArrowRight size={16} />
                                    </Link>
                                    <Link href="/ubiq" className={styles.ctaSecondary}>
                                        Explore uBIQ
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>
        </>
    );
}
