'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { ServiceFAQ as FAQItem } from '@/data/services';
import styles from './ServiceFAQ.module.css';

interface Props {
    faqs: FAQItem[];
    serviceTitle: string;
}

/**
 * Service-specific FAQ — light theme, two-tone split layout.
 *
 * Design pattern: left half is a dark navy panel holding the
 * title, kicker, and a contact CTA — it does double duty as
 * visual contrast and an action anchor. Right half is white
 * holding a minimal underline-style accordion: each question
 * is just a row with a bottom hairline (no boxes, no fills)
 * and a rotating Plus icon. Selected items fade their answer
 * in below the row.
 *
 * Why this layout: the previous sections are all white-ish
 * with floating elements; the FAQ deserves a stronger
 * structural break before the closing CTA. The dark left
 * panel also serves as a chromatic bookend that mirrors the
 * dark hero at the top of the page.
 *
 * The parent /[slug] page emits FAQPage JSON-LD when this
 * block has data, so the questions surface as Google rich
 * results.
 */
export default function ServiceFAQ({ faqs, serviceTitle }: Props) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className={styles.section}>
            <div className={styles.split}>
                {/* LEFT: dark panel */}
                <aside className={styles.darkPanel}>
                    <div className={styles.darkInner}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className={styles.eyebrow}>Questions, Answered</span>
                            <h2 className={styles.mainTitle}>
                                Everything you wanted to ask about{' '}
                                <span className={styles.accent}>{serviceTitle}</span>.
                            </h2>
                            <p className={styles.kicker}>
                                Still curious? Drop us a line and a real human responds
                                within a working day — no chatbots, no SDR funnel.
                            </p>
                            {/* HIDDEN-CONTACT:
                            <a href="/contact" className={styles.contactLink}>
                                Talk to the team
                                <span className={styles.contactArrow}>→</span>
                            </a>
                            */}
                        </motion.div>
                    </div>
                </aside>

                {/* RIGHT: minimal accordion */}
                <div className={styles.lightPanel}>
                    <div className={styles.accordion}>
                        {faqs.map((faq, i) => {
                            const isOpen = openIndex === i;
                            return (
                                <motion.div
                                    key={i}
                                    className={`${styles.row} ${isOpen ? styles.rowOpen : ''}`}
                                    initial={{ opacity: 0, y: 12 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.45, delay: i * 0.06 }}
                                >
                                    <button
                                        className={styles.questionBtn}
                                        onClick={() => setOpenIndex(isOpen ? null : i)}
                                        aria-expanded={isOpen}
                                        type="button"
                                    >
                                        <span className={styles.qNum}>
                                            {String(i + 1).padStart(2, '0')}
                                        </span>
                                        <span className={styles.qText}>{faq.question}</span>
                                        <span
                                            className={`${styles.plusIcon} ${isOpen ? styles.plusOpen : ''}`}
                                            aria-hidden="true"
                                        >
                                            <Plus size={18} strokeWidth={2} />
                                        </span>
                                    </button>

                                    <AnimatePresence initial={false}>
                                        {isOpen && (
                                            <motion.div
                                                key="answer"
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                                className={styles.answerWrap}
                                            >
                                                <p className={styles.answer}>{faq.answer}</p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
