'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import styles from './BlogGrid.module.css';

const blogPosts = [
    {
        title: 'Financial services',
        image: 'https://images.unsplash.com/photo-1550565118-3a14e8d0386f?auto=format&fit=crop&q=80&w=800',
        description: 'Develop innovative and secure solutions across banking, capital markets, insurance, and payments.',
    },
    {
        title: 'Healthcare and Life Sciences',
        image: 'https://images.unsplash.com/photo-1576091160550-21735999191c?auto=format&fit=crop&q=80&w=800',
        description: 'Accelerate innovation and improve patient care with healthcare data management and security.',
    },
    {
        title: 'Government',
        image: 'https://images.unsplash.com/photo-1541829070764-84a7d30dee6d?auto=format&fit=crop&q=80&w=800',
        description: 'Solutions designed to help government agencies modernize, meet mandates, reduce costs, and deliver mission outcomes.',
    },
    {
        title: 'Telecommunications',
        image: 'https://images.unsplash.com/photo-1516383274235-5f42d6c6426d?auto=format&fit=crop&q=80&w=800',
        description: 'Accelerate innovation, scale with confidence, and add agility with cloud-based telecom solutions.',
    },
    {
        title: 'Advertising and Marketing',
        image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800',
        description: 'Turn data into customer-winning campaigns through deterministic insights and creative engineering.',
    },
    {
        title: 'Manufacturing',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
        description: 'Optimize production and speed time-to-market with smart factory solutions and IoT orchestration.',
    }
];

export default function BlogGrid() {
    return (
        <section className={styles.blogSection}>
            <div className={`container ${styles.container}`}>
                <div className={styles.header}>
                    <span className="tag">Unntangled Insights</span>
                    <h1 className={styles.title}>Blog & Industry Focus</h1>
                    <p className={styles.description}>
                        Exploring the frontier of Digital, AI, and Cloud across every sector.
                    </p>
                </div>

                <div className={styles.grid}>
                    {blogPosts.map((post, index) => (
                        <motion.div
                            key={index}
                            className={styles.blogCard}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className={styles.imageContainer}>
                                <img src={post.image} alt={post.title} className={styles.cardImage} />
                            </div>

                            <div className={styles.content}>
                                <h3 className={styles.cardTitle}>{post.title}</h3>
                                <p className={styles.cardDescription}>{post.description}</p>

                                <div className={styles.arrowWrapper}>
                                    <ArrowRight size={20} className={styles.arrowIcon} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
