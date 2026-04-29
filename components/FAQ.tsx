'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
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
            <div className={styles.container}>
                <div className={styles.layout}>
                    {/* Left column: sticky title */}
                    <aside className={styles.titleColumn}>
                        <motion.h2
                            className={styles.mainTitle}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            Frequently Asked
                            <br />
                            Questions
                        </motion.h2>
                    </aside>

                    {/* Right column: accordion cards */}
                    <div className={styles.accordion}>
                        {faqs.map((faq, i) => {
                            const isOpen = openIndex === i;
                            return (
                                <motion.div
                                    key={i}
                                    className={`${styles.card} ${isOpen ? styles.cardOpen : ''}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.06 }}
                                >
                                    <button
                                        className={styles.questionRow}
                                        onClick={() => setOpenIndex(isOpen ? null : i)}
                                        aria-expanded={isOpen}
                                    >
                                        <span className={styles.questionText}>{faq.question}</span>
                                        <span className={styles.iconWrap} aria-hidden="true">
                                            {isOpen ? (
                                                <Minus size={18} strokeWidth={2.25} />
                                            ) : (
                                                <Plus size={18} strokeWidth={2.25} />
                                            )}
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
                                                className={styles.answerWrapper}
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
