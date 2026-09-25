'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import styles from './FAQ.module.css';

const faqs = [
    {
        question: "What exactly is an AI agent and how is it different from an AI chatbot?",
        answer: "An AI chatbot answers questions. An AI agent takes action. Our agents connect to your existing systems — ERP, CRM, email, WhatsApp — analyse information, prepare recommendations and execute approved workflows without your team having to do it manually each time."
    },
    {
        question: "Do we need to replace our existing ERP or CRM to use your AI agents?",
        answer: "No. Our AI agents are designed to work with the systems you already have. We integrate with your existing ERP, CRM, databases, documents and communication tools. You keep your current infrastructure and the AI operates on top of it."
    },
    {
        question: "What kinds of workflows can AI agents automate?",
        answer: "Any repetitive, rule-based or data-heavy process is a candidate. Common examples include: lead qualification and RFQ responses, invoice matching and payment follow-ups, vendor quotation comparison, purchase order preparation, shipment status updates, and customer enquiry handling across email and WhatsApp."
    },
    {
        question: "How long does it take to deploy an AI agent?",
        answer: "It depends on the complexity of the workflow and how accessible your existing systems are via APIs or integrations. Simpler deployments — like an AI that handles inbound enquiries or prepares quotation drafts — can be live in 4–6 weeks. More complex multi-system automations typically take 8–12 weeks."
    },
    {
        question: "Is our business data safe when using AI agents?",
        answer: "Yes. We architect AI deployments with data privacy as a requirement, not an afterthought. Your data does not leave your environment to train third-party models. We use secure API integrations, role-based access controls and operate within your existing data governance frameworks."
    },
    {
        question: "What is an AI Workflow Assessment and how do we get started?",
        answer: "An AI Workflow Assessment is a structured session where we review your existing processes, identify which workflows have the highest automation potential, and map out a prioritised deployment plan. It typically takes 1–2 working days and gives you a clear picture of where AI can deliver the fastest and highest-value impact. Book one via our contact page."
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
