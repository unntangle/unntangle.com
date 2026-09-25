'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import styles from './FAQ.module.css';

const faqs = [
    {
        question: "What is an AI Workflow Assessment and why should we start there?",
        answer: "An AI Workflow Assessment is a structured session — typically 1 to 2 working days — where we work with your teams to map existing processes, identify where repetitive manual effort is highest, and prioritise the workflows where AI can create the most measurable business value. We do not begin by proposing a product. We begin by understanding your business. The assessment gives you a clear, prioritised deployment roadmap before any development starts."
    },
    {
        question: "Do we need to replace our ERP, CRM or existing software?",
        answer: "No. This is one of the most important things to understand. Unntangle builds AI that connects to and works with the systems your business already uses — Tally, SAP, Zoho, Salesforce, custom ERPs, email, WhatsApp, databases and internal applications. You do not replace infrastructure. The AI operates on top of what you already have."
    },
    {
        question: "What is the difference between an AI agent and a chatbot?",
        answer: "A chatbot answers questions from a knowledge base. An AI agent takes action. For example, when an RFQ arrives, an AI Sales Agent reads the document, retrieves your product and pricing data from your ERP, prepares a draft quotation, waits for human approval and then sends it — updating your CRM automatically. It is performing a business workflow, not just responding to a message."
    },
    {
        question: "How does human approval work in an AI workflow?",
        answer: "We design every critical workflow with appropriate human controls. The level of automation is configurable — for example, an AI can prepare a quotation draft and queue it for one-click approval, or it can send low-value routine responses autonomously while escalating high-value or unusual cases to a human. You decide where the approval gates sit. AI analyses and prepares; your team approves when it matters."
    },
    {
        question: "How long does it take to go from assessment to a live AI deployment?",
        answer: "A focused workflow deployment — such as an AI that processes inbound RFQs and prepares quotation drafts — can typically go from assessment to production in 4 to 8 weeks. More complex deployments involving multiple systems, custom integrations or multi-step workflows generally take 8 to 14 weeks. We phase the rollout so your first AI workflow is live and generating value while subsequent ones are being built."
    },
    {
        question: "Is our business data secure when AI connects to our systems?",
        answer: "Yes. We architect every deployment with data security as a foundational requirement. Your data does not leave your environment or feed into shared third-party models. We use secure API integrations with credentials you own and control, role-based access permissions, and operate within your existing data governance frameworks. For regulated industries we can deploy entirely within your private cloud environment."
    },
    {
        question: "Can AI deployment start small and expand over time?",
        answer: "This is how we recommend approaching it. Start with the single highest-value workflow — the one where your team is losing the most time to repetitive manual work. Prove the value, build confidence in how the system operates, and then expand to adjacent workflows and departments. Every deployment is designed to be modular and extensible from the beginning."
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
