'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    ArrowRight, ChevronDown, Mail, Phone, MapPin, Home, Building2, Hotel,
    Clock, ShieldCheck, Sparkles,
} from 'lucide-react';
import styles from './UbiqContactPage.module.css';

/* ============================================================
 * uBIQ — dedicated contact / "Book an Experience" page.
 * On-brand (purple) booking experience, distinct from the parent
 * Unntangle /contact page. Form is presentational (no backend);
 * wire to a handler / API route when ready.
 * ============================================================ */

const ease = [0.16, 1, 0.3, 1] as const;

const spaceTypes = [
    { icon: Home, label: 'Home / Villa' },
    { icon: Building2, label: 'Office / Commercial' },
    { icon: Hotel, label: 'Hotel / Hospitality' },
];

const assurances = [
    { icon: Clock, title: 'Reply within 24h', text: 'A specialist responds within one business day.' },
    { icon: ShieldCheck, title: 'No-pressure consult', text: 'A conversation about your space — not a sales pitch.' },
    { icon: Sparkles, title: 'Tailored proposal', text: 'A system designed around how you actually live and work.' },
];

export default function UbiqContactPage() {
    const [space, setSpace] = useState<string>('');
    const [phone, setPhone] = useState<string>('');

    return (
        <div className={styles.page}>
            <section className={`${styles.section} ${styles.hero}`}>
                <div className={styles.heroGlow} aria-hidden="true" />
                <div className={styles.heroGrid} aria-hidden="true" />
                <div className={`${styles.inner} ${styles.grid}`}>
                    {/* LEFT — copy + details */}
                    <motion.div
                        className={styles.left}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease }}
                    >
                        <span className={styles.eyebrow}>Book an Experience</span>
                        <h1 className={styles.h1}>
                            Let&apos;s design your <span className={styles.accent}>intelligent space.</span>
                        </h1>
                        <p className={styles.lead}>
                            Tell us about your home, workplace or project. We&apos;ll walk you through what&apos;s
                            possible and propose a system shaped entirely around how you live and work.
                        </p>

                        <div className={styles.assurances}>
                            {assurances.map((a) => {
                                const Icon = a.icon;
                                return (
                                    <div key={a.title} className={styles.assurance}>
                                        <span className={styles.assuranceIcon}><Icon size={18} strokeWidth={1.8} /></span>
                                        <div>
                                            <span className={styles.assuranceTitle}>{a.title}</span>
                                            <span className={styles.assuranceText}>{a.text}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className={styles.details}>
                            <a className={styles.detail} href="mailto:gokul@unntangle.com">
                                <span className={styles.detailIcon}><Mail size={17} /></span>
                                <div className={styles.detailText}><span>Email</span><p>gokul@unntangle.com</p></div>
                            </a>
                            <a className={styles.detail} href="tel:+917092747933">
                                <span className={styles.detailIcon}><Phone size={17} /></span>
                                <div className={styles.detailText}><span>Call</span><p>+91 70927 47933 · +91 63793 88462</p></div>
                            </a>
                            <a
                                className={styles.detail}
                                href="https://www.google.com/maps/search/?api=1&query=SBS+Office+Space+Old+No+470+New+No+700+Anna+Salai+Nandanam+Chennai+600035"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <span className={styles.detailIcon}><MapPin size={17} /></span>
                                <div className={styles.detailText}><span>Visit</span><p>SBS Office Space, Anna Salai, Nandanam, Chennai 600035.</p></div>
                            </a>
                        </div>
                    </motion.div>

                    {/* RIGHT — form */}
                    <motion.div
                        className={styles.right}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1, ease }}
                    >
                        <div className={styles.card}>
                            <h2 className={styles.cardTitle}>Tell us about your space</h2>

                            <div className={styles.field}>
                                <label className={styles.label}>What kind of space?</label>
                                <div className={styles.spaceRow}>
                                    {spaceTypes.map((s) => {
                                        const Icon = s.icon;
                                        const on = space === s.label;
                                        return (
                                            <button
                                                key={s.label}
                                                type="button"
                                                className={`${styles.spaceBtn} ${on ? styles.spaceBtnOn : ''}`}
                                                onClick={() => setSpace(s.label)}
                                                aria-pressed={on}
                                            >
                                                <Icon size={18} strokeWidth={1.8} />
                                                {s.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <form
                                className={styles.form}
                                onSubmit={(e) => e.preventDefault()}
                            >
                                <div className={styles.row}>
                                    <div className={styles.field}>
                                        <label className={styles.label}>Full name</label>
                                        <input className={styles.input} type="text" placeholder="Your name" />
                                    </div>
                                    <div className={styles.field}>
                                        <label className={styles.label}>Email*</label>
                                        <input className={styles.input} type="email" placeholder="you@email.com" required />
                                    </div>
                                </div>

                                <div className={styles.row}>
                                    <div className={styles.field}>
                                        <label className={styles.label}>Phone*</label>
                                        <input
                                            className={styles.input}
                                            type="tel"
                                            inputMode="numeric"
                                            maxLength={10}
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                            placeholder="00000 00000"
                                            required
                                        />
                                    </div>
                                    <div className={styles.field}>
                                        <label className={styles.label}>Interested in</label>
                                        <div className={styles.selectWrap}>
                                            <select className={styles.select} defaultValue="">
                                                <option value="" disabled>Select</option>
                                                <option>uBIQ Senz — adaptive intelligence</option>
                                                <option>uBIQ Twin — 3D digital twin</option>
                                                <option>uBIQ Care+ — ownership program</option>
                                                <option>Whole-space automation</option>
                                                <option>Not sure yet</option>
                                            </select>
                                            <ChevronDown size={15} className={styles.selectChev} />
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.field}>
                                    <label className={styles.label}>Tell us a little about your project</label>
                                    <textarea className={styles.textarea} rows={3} placeholder="Rooms, scale, timeline, what you'd love your space to do..." />
                                </div>

                                <button type="submit" className={styles.submit}>
                                    Book Experience <ArrowRight size={16} />
                                </button>
                                <p className={styles.formNote}>
                                    By submitting, you agree to be contacted about your enquiry. We never share your details.
                                </p>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
