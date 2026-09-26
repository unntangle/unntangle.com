'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import styles from './FAQ.module.css';

const faqs = [
    {
        question: "What is an AI Workflow Assessment and why should we start there?",
        answer: "An AI Workflow Assessment is a structured engagement where we work with your teams to map existing processes, identify where repetitive manual effort is highest, and prioritise the workflows where AI can create the most measurable business value. Its length depends on how many teams and workflows are in scope. We do not begin by proposing a product — we begin by understanding your business. You come away with a clear, prioritised view of what to deploy first, before any development starts."
    },
    {
        question: "Do we need to replace our ERP, CRM or existing software?",
        answer: "No. Unntangle builds AI that connects to and works with the systems your business already uses — ERP, CRM, email, WhatsApp, documents, databases and internal applications. You do not replace your infrastructure; the AI works alongside what you already have. During the assessment we confirm how each of your specific systems can be connected, whether through APIs, database access, file exports or email."
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
        answer: "It depends on the workflow — how many systems it touches, how clean the underlying data is, and how many approval steps are involved. At the end of the assessment we give you a timeline for the specific workflow we recommend starting with. We phase the rollout so your first AI workflow can go live while later ones are still being built."
    },
    {
        question: "Is our business data secure when AI connects to our systems?",
        answer: "Data security is agreed before anything is built: what the AI can access, where data is processed, which AI models and providers are used, and how activity is logged. We use integrations with credentials you control, role-based permissions, and work within your existing data governance policies. Where your requirements call for it, we can discuss deploying within your own cloud environment."
    },
    {
        question: "Can AI deployment start small and expand over time?",
        answer: "This is how we recommend approaching it. Start with the single highest-value workflow — the one where your team is losing the most time to repetitive manual work. Prove the value, build confidence in how the system operates, and then expand to adjacent workflows and departments. Every deployment is designed to be modular and extensible from the beginning."
    },
    {
        question: "Do you still build websites, apps and custom software?",
        answer: "Yes. Website development, website revamps, mobile and web apps, and custom software and ERP are core services, delivered by the same team that deploys AI. You can start with either and add the other later — for example, a new dealer portal that later gets an AI assistant, or an AI workflow that needs a small internal app alongside it."
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
