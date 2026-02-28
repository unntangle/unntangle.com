'use client';

import { motion } from 'framer-motion';
import styles from './Team.module.css';

const team = [
    {
        name: 'Gokul Sridharan',
        role: 'Founder & Chief Architect',
        bio: 'Visionary engineer focused on simplifying complex technical landscapes and building future-ready systems.'
    },
    {
        name: 'Alex Rivera',
        role: 'Head of AI Systems',
        bio: 'Expert in deterministic AI and intelligent automation with a focus on enterprise-scale efficiency.'
    },
    {
        name: 'Sarah Chen',
        role: 'Design Director',
        bio: 'Crafting premium, high-performance digital experiences that bridge the gap between human and machine.'
    },
    {
        name: 'Marcus Thorne',
        role: 'Cloud Infrastructure Lead',
        bio: 'Architecting zero-fail, high-availability environments for the most demanding global applications.'
    }
];

export default function Team() {
    return (
        <section className={styles.team}>
            <div className={`container ${styles.container}`}>
                <div className={styles.header}>
                    <span className="tag">Our Team</span>
                    <h2 className={styles.title}>The Minds Unntangling the Future</h2>
                </div>

                <div className={styles.grid}>
                    {team.map((member, index) => (
                        <motion.div
                            key={index}
                            className={styles.card}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className={styles.imagePlaceholder}>
                                <div className={styles.initials}>{member.name.charAt(0)}</div>
                            </div>
                            <div className={styles.content}>
                                <h3>{member.name}</h3>
                                <div className={styles.role}>{member.role}</div>
                                <p>{member.bio}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
