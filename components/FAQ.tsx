'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';
import styles from './FAQ.module.css';

const faqs = [
    {
        question: "How does Unntangle ensure the ethical and responsible use of AI?",
        answer: "We prioritize data privacy, algorithmic fairness, and transparency in all our AI implementations. Our models undergo rigorous bias testing and comply with industry-standard ethical guidelines."
    },
    {
        question: "How does Unntangle leverage AI in business and enterprise solutions?",
        answer: "We build custom AI agents for customer support, predictive analytics for supply chains, and intelligent automation workflows that seamlessly integrate with your existing ERP or CRM platforms."
    },
    {
        question: "What types of digital products and services does Unntangle offer?",
        answer: "From high-performance corporate websites and scalable web applications to immersive smart living ecosystems and IoT dashboards."
    },
    {
        question: "How does Unntangle approach digital transformation for legacy enterprises?",
        answer: "We start with a comprehensive tech audit, then employ an agile, phased rollout strategy to modernize infrastructure without disrupting critical daily operations."
    },
    {
        question: "How does Unntangle help with scaling existing digital products?",
        answer: "We optimize cloud architectures, implement efficient CI/CD pipelines, and refactor monolithic codebases into robust microservices for unbounded scalability."
    },
    {
        question: "Does Unntangle assist with hardware and software integration?",
        answer: "Yes, our Smart Systems division specializes in creating cohesive environments where custom software interfaces seamlessly control IoT hardware arrays."
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className={styles.faqSection}>
            <div className={`container ${styles.container}`}>
                <h2 className={styles.mainTitle}>Frequently Asked Questions</h2>

                <div className={styles.contentWrapper}>
                    {/* Accordion */}
                    <div className={styles.accordionFull}>
                        {faqs.map((faq, i) => (
                            <div key={i} className={styles.item}>
                                <button
                                    className={`${styles.question} ${openIndex === i ? styles.active : ''}`}
                                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                >
                                    <div className={styles.questionContent}>
                                        <span className={styles.faqNumber}>{i + 1}</span>
                                        <span className={styles.questionText}>{faq.question}</span>
                                    </div>
                                    {openIndex === i ? <ChevronUp size={20} className={styles.chevron} /> : <ChevronDown size={20} className={styles.chevron} />}
                                </button>
                                <AnimatePresence>
                                    {openIndex === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                                            className={styles.answerWrapper}
                                        >
                                            <div className={styles.answer}>
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
