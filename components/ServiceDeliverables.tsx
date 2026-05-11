'use client';

import { motion } from 'framer-motion';
import {
    Monitor, Smartphone, Database, BarChart3, Palette, Cpu, Bot,
    MessageSquare, FileText, Zap, CloudUpload, RefreshCw, Layers,
    ShieldCheck, LifeBuoy, Home, Lock, Sun, ArrowUpCircle, DoorOpen, Brain,
    Check,
} from 'lucide-react';
import { ServiceDeliverable } from '@/data/services';
import styles from './ServiceDeliverables.module.css';

const iconMap: Record<string, any> = {
    Monitor, Smartphone, Database, BarChart3, Palette, Cpu, Bot,
    MessageSquare, FileText, Zap, CloudUpload, RefreshCw, Layers,
    ShieldCheck, LifeBuoy, Home, Lock, Sun, ArrowUpCircle, DoorOpen, Brain,
};

interface Props {
    deliverables: ServiceDeliverable[];
}

/**
 * "What you'll receive" section — light theme, checklist layout.
 *
 * Design pattern: split layout, NOT a grid of cards. The left
 * column is a sticky framing panel; the right column is a long
 * vertical checklist with numbered ticks. Each item has an
 * inline icon + title + description, separated by hairline
 * dividers rather than boxed in cards.
 *
 * This is the "documentary / contract" visual register —
 * deliverables read as a literal list because that's what they
 * are. Cards would imply marketing; lines imply commitment.
 */
export default function ServiceDeliverables({ deliverables }: Props) {
    return (
        <section className={styles.section}>
            <div className={`container ${styles.container}`}>
                <div className={styles.layout}>
                    <aside className={styles.intro}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className={styles.eyebrow}>What You&apos;ll Receive</span>
                            <h2 className={styles.title}>
                                A contract&apos;s worth
                                <br />
                                of <em className={styles.italic}>tangible</em> deliverables.
                            </h2>
                            <p className={styles.subtitle}>
                                No vague promises — every engagement closes with a
                                concrete set of artifacts you can take, audit, and
                                hand to any future partner.
                            </p>
                            <div className={styles.countBadge}>
                                <span className={styles.countNumber}>
                                    {String(deliverables.length).padStart(2, '0')}
                                </span>
                                <span className={styles.countLabel}>
                                    artifacts delivered
                                </span>
                            </div>
                        </motion.div>
                    </aside>

                    <div className={styles.checklist}>
                        {deliverables.map((item, i) => {
                            const Icon = iconMap[item.icon] || FileText;
                            return (
                                <motion.div
                                    key={i}
                                    className={styles.row}
                                    initial={{ opacity: 0, x: 24 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: '-40px' }}
                                    transition={{
                                        duration: 0.5,
                                        delay: i * 0.06,
                                        ease: [0.16, 1, 0.3, 1],
                                    }}
                                >
                                    <div className={styles.rowIndex}>
                                        <span className={styles.indexNum}>
                                            {String(i + 1).padStart(2, '0')}
                                        </span>
                                        <span className={styles.checkBubble}>
                                            <Check size={12} strokeWidth={3} />
                                        </span>
                                    </div>

                                    <div className={styles.rowBody}>
                                        <div className={styles.rowHead}>
                                            <Icon size={18} className={styles.rowIcon} />
                                            <h3>{item.title}</h3>
                                        </div>
                                        <p>{item.description}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
