'use client';

import { motion } from 'framer-motion';
import { ChevronDown, Globe, Upload, CheckCircle2, Mail, Phone } from 'lucide-react';
import styles from './ContactHero.module.css';
import WorkflowScene from './WorkflowScene';
import { useState, type FormEvent } from 'react';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const CONTACT_EMAIL = 'gokul@unntangle.com';

export default function ContactHero() {
    const [fileSlot, setFileSlot] = useState<string | null>(null);
    const [status, setStatus] = useState<Status>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    // Sends the form (including the optional attachment) to /api/contact,
    // which emails it to the Unntangle inbox.
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        setStatus('sending');
        setErrorMsg('');
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                body: new FormData(form),
            });
            const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
            if (!res.ok || !data.ok) {
                throw new Error(data.error || 'Something went wrong.');
            }
            form.reset();
            setFileSlot(null);
            setStatus('sent');
        } catch (err) {
            setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
            setStatus('error');
        }
    };

    return (
        <section className={styles.heroSection}>
            <div className={styles.bgImageContainer}>
                <img
                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2500&auto=format&fit=crop"
                    alt="Purple and Blue Abstract Background"
                    className={styles.bgImage}
                />
                <div className={styles.bgOverlay} />
            </div>

            <div className={`container ${styles.container}`}>
                <div className={styles.content}>
                    {/* LEFT COLUMN: CONTACT FORM */}
                    <motion.div
                        className={styles.formColumn}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className={styles.formCard}>
                            <h3 className={styles.formTitle}>Book an AI Workflow Assessment</h3>

                            {status === 'sent' ? (
                                <div className={styles.formSuccess} role="status">
                                    <CheckCircle2 size={40} strokeWidth={1.5} />
                                    <h4>Thank you, we&apos;ve received your request.</h4>
                                    <p>
                                        We&apos;ve sent a confirmation to your inbox. An AI deployment
                                        specialist will get back to you shortly.
                                    </p>
                                    <button
                                        type="button"
                                        className={styles.formAgain}
                                        onClick={() => setStatus('idle')}
                                    >
                                        Send another enquiry
                                    </button>
                                </div>
                            ) : (
                            <form className={styles.contactForm} onSubmit={handleSubmit}>
                                {/* Honeypot: hidden from people, catches spam bots */}
                                <input
                                    type="text"
                                    name="company_website"
                                    className={styles.honeypot}
                                    tabIndex={-1}
                                    autoComplete="off"
                                    aria-hidden="true"
                                />
                                <div className={styles.inputRow}>
                                    <div className={styles.inputGroup}>
                                        <label htmlFor="cf-name">Full Name</label>
                                        <input id="cf-name" name="name" type="text" placeholder="John Doe" autoComplete="name" />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label htmlFor="cf-email">Work Email*</label>
                                        <input id="cf-email" name="email" type="email" placeholder="john@company.com" autoComplete="email" required />
                                    </div>
                                </div>

                                <div className={styles.inputRow}>
                                    <div className={styles.inputGroup}>
                                        <label htmlFor="cf-interest">What can we help with?</label>
                                        <div className={styles.selectWrapper}>
                                            <select id="cf-interest" name="interest" defaultValue="">
                                                <option value="" disabled>Select an option</option>
                                                <option value="assessment">AI Workflow Assessment</option>
                                                <option value="deployment">AI agent / workflow deployment</option>
                                                <option value="integration">System integration (ERP, CRM, APIs)</option>
                                                <option value="products">AI products (uVOIZ, uDYLR, uSCRIBR)</option>
                                                <option value="engineering">Software &amp; web engineering</option>
                                                <option value="other">Something else</option>
                                            </select>
                                            <ChevronDown size={14} className={styles.chevron} />
                                        </div>
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label htmlFor="cf-size">Company Size</label>
                                        <div className={styles.selectWrapper}>
                                            <select id="cf-size" name="size" defaultValue="">
                                                <option value="" disabled>Select size</option>
                                                <option value="under-50">Under 50 employees</option>
                                                <option value="50-200">50 – 200 employees</option>
                                                <option value="200-1000">200 – 1,000 employees</option>
                                                <option value="1000-plus">1,000+ employees</option>
                                            </select>
                                            <ChevronDown size={14} className={styles.chevron} />
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.inputGroup}>
                                    <label htmlFor="cf-workflow">Which workflow is taking up your team&apos;s time?</label>
                                    <textarea id="cf-workflow" name="workflow" placeholder="e.g. RFQs arrive by email and someone has to check ERP pricing and prepare a quotation by hand" rows={2} />
                                </div>

                                <div className={styles.inputRow}>
                                    <div className={styles.inputGroup}>
                                        <label htmlFor="cf-phone">Contact Number*</label>
                                        <div className={styles.phoneInput}>
                                            <div className={styles.countryPicker}>
                                                <img src="https://flagcdn.com/in.svg" alt="IN" width="18" />
                                                <span>+91</span>
                                                <ChevronDown size={12} />
                                            </div>
                                            <input
                                                id="cf-phone"
                                                name="phone"
                                                type="tel"
                                                placeholder="10-digit mobile number"
                                                autoComplete="tel-national"
                                                inputMode="numeric"
                                                pattern="[0-9]{10}"
                                                title="Please enter a 10-digit mobile number"
                                                onInput={(e) => {
                                                    // Digits only, max 10. Also cleans pasted numbers:
                                                    // "+91 98765 43210" or "098765 43210" -> "9876543210"
                                                    const el = e.currentTarget;
                                                    let d = el.value.replace(/\D/g, '');
                                                    if (d.length > 10 && d.startsWith('91')) d = d.slice(-10);
                                                    else if (d.length > 10 && d.startsWith('0')) d = d.slice(1);
                                                    el.value = d.slice(0, 10);
                                                }}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label>Attach a sample document (optional)</label>
                                        <div className={styles.fileUpload}>
                                            <input
                                                type="file"
                                                id="file-upload"
                                                name="attachment"
                                                accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.txt,.png,.jpg,.jpeg"
                                                className={styles.hiddenFile}
                                                onChange={(e) => setFileSlot(e.target.files?.[0]?.name || null)}
                                            />
                                            <label htmlFor="file-upload" className={styles.fileLabel}>
                                                <span>{fileSlot || 'Choose File (max 5 MB)'}</span>
                                                <Upload size={16} />
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {status === 'error' && (
                                    <p className={styles.formError} role="alert">
                                        {errorMsg} Please check your details and try again in a moment.
                                    </p>
                                )}

                                <div className={styles.formFooter}>
                                    <button
                                        type="submit"
                                        className={styles.submitBtn}
                                        disabled={status === 'sending'}
                                    >
                                        {status === 'sending' ? 'Sending…' : 'Request Assessment'}
                                    </button>
                                </div>
                            </form>
                            )}
                        </div>
                    </motion.div>

                    {/* RIGHT COLUMN: GLASSY DETAILS */}
                    <motion.div
                        className={styles.textColumn}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className={styles.glassPanel}>
                            <h1 className={styles.title}>
                                Find Where AI Can Work <br />
                                Inside Your Business
                            </h1>
                            <p className={styles.subtitle}>
                                Bring us a workflow that&apos;s consuming time, creating bottlenecks or
                                requiring repetitive manual work. An AI deployment specialist will get back
                                to you to talk it through and tell you honestly whether AI can automate or
                                augment it.
                            </p>

                            {/* Cartoon scene: inbox -> AI prepares -> you approve (WorkflowScene.tsx) */}
                            <WorkflowScene />

                            <div className={styles.contactDetails}>
                                {/* HIDDEN-CONTACT: email + phone (hidden at the client's request)
                                <div className={styles.contactItem}>
                                    <div className={styles.itemIcon}><Mail size={18} /></div>
                                    <div className={styles.itemText}>
                                        <span>Email</span>
                                        <p><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
                                    </div>
                                </div>
                                <div className={styles.contactItem}>
                                    <div className={styles.itemIcon}><Phone size={18} /></div>
                                    <div className={styles.itemText}>
                                        <span>Call Us</span>
                                        <p><a href="tel:+917092747933">+91 70927 47933</a></p>
                                        <p><a href="tel:+916379388462">+91 63793 88462</a></p>
                                    </div>
                                </div>
                                */}
                                {/* HIDDEN-CONTACT: office address
                                <div className={styles.contactItem}>
                                    <div className={styles.itemIcon}><Globe size={18} /></div>
                                    <div className={styles.itemText}>
                                        <span>Visit Us</span>
                                        <p>
                                            <a
                                                href="https://www.google.com/maps/search/?api=1&query=SBS+Office+Space+Old+No+470+New+No+700+Anna+Salai+Nandanam+Chennai+600035"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                SBS Office Space, Old No.470, New No.700,<br />
                                                Anna Salai, Nandanam, Chennai 600035.
                                            </a>
                                        </p>
                                    </div>
                                </div>
                                */}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
