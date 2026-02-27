'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import styles from './Work.module.css';

const projects = [
    {
        title: 'Website Development',
        description: 'A beautiful and responsive website designed to elevate online presence.',
        image: '/images/service_digital.jpg'
    },
    {
        title: 'Intelligent Home Ecosystem',
        description: 'A comprehensive smart living solution featuring automated lighting, security, and climate control.',
        image: '/images/service_smart.jpg'
    },
    {
        title: 'Renewable Solar Grid',
        description: 'A custom energy monitoring and distribution platform for sustainable communities.',
        image: '/images/service_cloud_v3.jpg'
    }
];

export default function Work() {
    return (
        <section className={styles.work}>
            <div className={`container ${styles.container}`}>
                <div className={styles.header}>
                    <div>
                        <span className="tag">Case studies</span>
                        <h2>See our work</h2>
                        <p>Welcome to the spotlight, where Unntangle's expertise touches down, turning the ordinary into the extraordinary.</p>
                    </div>
                    <button className="btn btn-primary">View all</button>
                </div>

                <div className={styles.grid}>
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            className={styles.card}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <div className={styles.imageWrapper}>
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className={styles.image}
                                />
                            </div>
                            <div className={styles.content}>
                                <h3>{project.title}</h3>
                                <p>{project.description}</p>
                                <button className={styles.viewLink}>
                                    View project <ArrowUpRight size={18} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
