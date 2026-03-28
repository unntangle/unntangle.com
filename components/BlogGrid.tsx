'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { blogsData } from '@/data/blogs';
import styles from './BlogGrid.module.css';



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
                    {blogsData.map((post, index) => (
                        <Link href={`/blog/${post.id}`} key={post.id} style={{ textDecoration: 'none' }}>
                            <motion.div
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
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
