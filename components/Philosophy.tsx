'use client';

import { motion } from 'framer-motion';
import { Target, Zap, Shield, Sparkles } from 'lucide-react';
import styles from './Philosophy.module.css';

const values = [
    {
        title: 'Systems-First Thinking',
        icon: <Target size={24} />,
        description: 'AI is only valuable when it works inside the systems your business already runs. We start with your ERP, CRM and workflows — not a blank-slate AI prototype.'
    },
    {
        title: 'Workflow Depth',
        icon: <Zap size={24} />,
        description: 'We build agents that go beyond answering questions — they analyse data, prepare actions and execute approved workflows end-to-end inside your business processes.'
    },
    {
        title: 'Outcome Accountability',
        icon: <Sparkles size={24} />,
        description: 'Every AI deployment is scoped around measurable business outcomes — hours saved, cycle times reduced, workflows automated. We track what matters, not vanity metrics.'
    },
    {
        title: 'Radical Simplicity',
        icon: <Shield size={24} />,
        description: 'Complex workflows become simple when the right intelligence is applied. We unntangle the knots in your operations and replace manual friction with automated precision.'
    }
];

export default function Philosophy() {
    return (
        <section className={styles.philosophy}>
            <div className={`container ${styles.container}`}>
                <div className={styles.header}>
                    <span className="tag">Our Philosophy</span>
                    <h2 className={styles.title}>The Art of Unntangling</h2>
                    <p className={styles.description}>
                        At Unntangle, we are driven by a singular mission: to help businesses move from experimenting with AI to actually operating with it.
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
