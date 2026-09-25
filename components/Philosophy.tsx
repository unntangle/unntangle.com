'use client';

import { motion } from 'framer-motion';
import { Target, Plug, Users, Rocket, RefreshCw } from 'lucide-react';
import styles from './Philosophy.module.css';

const values = [
    {
        title: 'Business-First',
        icon: <Target size={24} />,
        description: 'We start with the workflow and the business problem — not the technology. Every AI deployment begins with understanding how your teams work and where the real friction is.'
    },
    {
        title: 'Built Around Your Systems',
        icon: <Plug size={24} />,
        description: 'You don\'t need to replace your ERP, CRM or existing software. Our AI connects to and works with the systems your business already depends on — no rip-and-replace required.'
    },
    {
        title: 'Human-Controlled',
        icon: <Users size={24} />,
        description: 'Critical workflows include appropriate human approval, escalation and oversight. AI analyses and recommends — your team decides when it matters. We design for accountability, not blind automation.'
    },
    {
        title: 'Deployment Focused',
        icon: <Rocket size={24} />,
        description: 'We don\'t stop at prototypes or proof-of-concept demos. Our focus is production implementation — AI running inside your real workflows, handling real work, delivering real outcomes.'
    },
    {
        title: 'Built To Evolve',
        icon: <RefreshCw size={24} />,
        description: 'Every deployment starts with one workflow and is designed to expand. As AI proves value in one area, it can be extended to adjacent workflows and departments — incrementally, without disruption.'
    }
];

export default function Philosophy() {
    return (
        <section className={styles.philosophy}>
            <div className={`container ${styles.container}`}>
                <div className={styles.header}>
                    <span className="tag">Why Unntangle</span>
                    <h2 className={styles.title}>Why Businesses Work With Us</h2>
                    <p className={styles.description}>
                        We are an AI deployment partner, not an AI product vendor. Here is what that means in practice.
                    </p>
                </div>

                <div className={styles.grid}>
                    {values.map((value, index) => (
                        <motion.div
                            key={index}
                            className={styles.card}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className={styles.iconWrapper}>{value.icon}</div>
                            <h3>{value.title}</h3>
                            <p>{value.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
