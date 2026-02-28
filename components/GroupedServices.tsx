'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import styles from './GroupedServices.module.css';

import { useState } from 'react';

const serviceTabs = [
    {
        id: 'digital',
        label: 'Digital Ecosystems',
        title: 'Digital Engineering & Transformation',
        description: 'Building high-performance foundational architectures. We modernize legacy stacks into deterministic enterprise ecosystems.',
        features: [
            'Enterprise ERP Modernization',
            'Custom Infrastructure Engineering',
            'Legacy Debt Elimination',
            'Scalable System Architecture'
        ],
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
        tag: 'Infrastructure'
    },
    {
        id: 'ai',
        label: 'Intelligent AI',
        title: 'Frontier AI & Autonomous Agents',
        description: 'Converging data and intent through frontier agents. Resolve incidents fast and prevent future ones with autonomous optimization.',
        features: [
            'Autonomous Incident Response',
            'Predictive System Analysis',
            'Natural Language Orchestration',
            'Self-Optimizing Ecosystems'
        ],
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
        tag: 'Intelligence'
    },
    {
        id: 'cloud',
        label: 'Global Cloud',
        title: 'Sovereign Cloud & Global Scale',
        description: 'New, separate, and independent cloud with global infrastructure, independent governance, and local deterministic leadership.',
        features: [
            'Sovereign Data Governance',
            'Global Edge Orchestration',
            'Deterministic Cloud Security',
            'Multi-Region Synchronization'
        ],
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
        tag: 'Cloud'
    },
    {
        id: 'smart-living',
        label: 'Smart Living',
        title: 'IoT & Connected Landscapes',
        description: 'Integrating Digital and AI into the physical landscape for total technical harmony and seamless orchestration of spaces.',
        features: [
            'Seamless IoT Integration',
            'Smart Space Automation',
            'Physical-Digital Convergence',
            'Unified Landscape Control'
        ],
        image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=800',
        tag: 'Ecosystem'
    }
];

export default function GroupedServices() {
    const [activeTab, setActiveTab] = useState(serviceTabs[0]);

    return (
        <section className={styles.servicesSection}>
            <div className={`container ${styles.container}`}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Our Services</h2>
                    <p className={styles.description}>
                        A comprehensive architectural overview of our specialized engineering domains.
                    </p>
                </div>

                <div className={styles.tabContainer}>
                    <div className={styles.tabBar}>
                        {serviceTabs.map((tab) => (
                            <button
                                key={tab.id}
                                className={`${styles.tabButton} ${activeTab.id === tab.id ? styles.active : ''}`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <motion.div
                        key={activeTab.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className={styles.tabContent}
                    >
                        <div className={styles.detailsColumn}>
                            <span className={styles.contentTag}>{activeTab.tag}</span>
                            <h3 className={styles.contentTitle}>{activeTab.title}</h3>
                            <p className={styles.contentDescription}>{activeTab.description}</p>

                            <div className={styles.featuresList}>
                                {activeTab.features.map((feature, i) => (
                                    <div key={i} className={styles.featureItem}>
                                        <div className={styles.bullet} />
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <button className={styles.knowMoreButton}>
                                <span>Know more</span>
                                <ArrowRight size={18} />
                            </button>
                        </div>

                        <div className={styles.visualColumn}>
                            <div className={styles.imageWrapper}>
                                <img src={activeTab.image} alt={activeTab.title} className={styles.mainImage} />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
