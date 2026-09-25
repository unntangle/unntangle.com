'use client';

import { motion } from 'framer-motion';
import { Search, Map, Target, Hammer, Plug, Rocket, TrendingUp } from 'lucide-react';
import styles from './OurProcess.module.css';

const steps = [
    {
        number: '01',
        icon: Search,
        title: 'Discover',
        description: 'We work alongside your teams to understand how work actually happens — the day-to-day workflows, handoffs, bottlenecks and the tasks that consume the most time without requiring genuine human judgment.',
        deliverables: ['Team interviews', 'Workflow observation', 'Process documentation'],
    },
    {
        number: '02',
        icon: Map,
        title: 'Map',
        description: 'We create a detailed map of your existing workflows — who does what, what systems they use, what data moves between steps, and where manual effort is concentrated.',
        deliverables: ['Workflow diagrams', 'System inventory', 'Data flow mapping'],
    },
    {
        number: '03',
        icon: Target,
        title: 'Prioritize',
        description: 'Not every workflow is worth automating first. We score workflows against effort, frequency, error rate and strategic value — and recommend which to deploy first for maximum impact.',
        deliverables: ['Prioritization matrix', 'ROI assessment', 'Deployment roadmap'],
    },
    {
        number: '04',
        icon: Hammer,
        title: 'Build',
        description: 'We build the required AI agent or workflow — trained on your business context, your terminology, your data formats and the specific decisions it needs to support or execute.',
        deliverables: ['AI agent development', 'Prompt engineering', 'Logic configuration'],
    },
    {
        number: '05',
        icon: Plug,
        title: 'Integrate',
        description: 'We connect the AI to your existing systems — ERP, CRM, databases, email, WhatsApp and internal applications. Your infrastructure stays. AI connects to it.',
        deliverables: ['API integrations', 'System connectors', 'Data pipeline setup'],
    },
    {
        number: '06',
        icon: Rocket,
        title: 'Deploy',
        description: 'We deploy into your real production workflow with appropriate human approval controls, permissions and escalation paths. AI operates inside your real processes — not alongside them.',
        deliverables: ['Production deployment', 'Human approval gates', 'Escalation workflows'],
    },
    {
        number: '07',
        icon: TrendingUp,
        title: 'Operate & Improve',
        description: 'After deployment, we monitor performance, track outcomes and continuously improve the system. As AI proves value in one area, we expand it to adjacent workflows and departments.',
        deliverables: ['Performance monitoring', 'Continuous improvement', 'Workflow expansion'],
    },
];

export default function OurProcess() {
    return (
        <section className={styles.section}>
            <div className={`container ${styles.container}`}>
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className={styles.eyebrow}>How we deploy AI</span>
                    <h2 className={styles.title}>
                        From workflow discovery to <span className={styles.titleAccent}>production AI.</span>
                    </h2>
                    <p className={styles.subtitle}>
                        We work alongside your team from identifying the opportunity to deploying and
                        operating the solution in production. Every step is designed to de-risk the deployment
                        and ensure the AI delivers real, measurable value before we expand.
                    </p>
                </motion.div>

                <div className={styles.timeline}>
                    <div className={styles.connectorLine} aria-hidden="true" />

                    {steps.map((step, i) => {
                        const Icon = step.icon;
                        return (
                            <motion.div
                                key={step.number}
                                className={styles.stepCard}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                            >
                                <div className={styles.stepHeader}>
                                    <span className={styles.stepNumber}>{step.number}</span>
                                    <div className={styles.iconBadge}>
                                        <Icon size={20} strokeWidth={2} />
                                    </div>
                                </div>

                                <h3 className={styles.stepTitle}>{step.title}</h3>
                                <p className={styles.stepDescription}>{step.description}</p>

                                <ul className={styles.deliverables}>
                                    {step.deliverables.map((item) => (
                                        <li key={item} className={styles.deliverable}>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
