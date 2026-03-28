'use client';

import { motion } from 'framer-motion';
import { ServiceData } from '@/data/services';
import styles from './ServiceContent.module.css';
import { Monitor, Smartphone, Database, BarChart3, Palette, Cpu, Bot, MessageSquare, FileText, Zap, CloudUpload, RefreshCw, Layers, ShieldCheck, LifeBuoy, Home, Lock, Sun, ArrowUpCircle, DoorOpen, Brain } from 'lucide-react';

const iconMap: Record<string, any> = {
    Monitor, Smartphone, Database, BarChart3, Palette, Cpu, Bot, MessageSquare, FileText, Zap, CloudUpload, RefreshCw, Layers, ShieldCheck, LifeBuoy, Home, Lock, Sun, ArrowUpCircle, DoorOpen, Brain
};

interface Props {
    service: ServiceData;
}

export default function ServiceContent({ service }: Props) {
    return (
        <section id="service-content" className={styles.contentSection}>
            <div className={`container ${styles.container}`}>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className={styles.topContent}
                >
                    <div className={styles.overviewBox}>
                        <span className={styles.sectionTitle}>Overview</span>
                        <h2 className={styles.overviewText}>{service.overview}</h2>
                    </div>
                </motion.div>

                <div className={styles.gridSection}>
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className={styles.featuresColumn}
                    >
                        <h3 className={styles.columnTitle}>Core Capabilities</h3>
                        <div className={styles.featuresList}>
                            {service.features.map((feature, i) => {
                                const Icon = iconMap[feature.icon as string] || Monitor;
                                return (
                                    <div key={i} className={styles.featureCard}>
                                        <div className={styles.iconWrapper}>
                                            <Icon size={24} />
                                        </div>
                                        <div className={styles.featureContent}>
                                            <h4>{feature.title}</h4>
                                            <p>{feature.description}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className={styles.processColumn}
                    >
                        <h3 className={styles.columnTitle}>Our Approach</h3>
                        <div className={styles.processList}>
                             {service.process.map((step, i) => (
                                 <div key={i} className={styles.processItem}>
                                     <div className={styles.stepNumber}>{step.step}</div>
                                     <h4>{step.title}</h4>
                                     <p>{step.description}</p>
                                 </div>
                             ))}
                        </div>
                    </motion.div>
                </div>

                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className={styles.benefitsSection}
                >
                    <h3 className={styles.benefitsTitle}>Key Benefits</h3>
                    <div className={styles.benefitsGrid}>
                        {service.benefits.map((benefit, i) => (
                            <div key={i} className={styles.benefitCard}>
                                <h4>{benefit.title}</h4>
                                <p>{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
