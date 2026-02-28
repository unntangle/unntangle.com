'use client';

import { motion } from 'framer-motion';
import styles from './JoinTeam.module.css';

export default function JoinTeam() {
    return (
        <section className={styles.joinSection}>
            <div className={`container ${styles.container}`}>
                <div className={styles.content}>
                    <div className={styles.textContent}>
                        <h2 className={styles.title}>Join Our Team!</h2>
                        <div className={styles.actions}>
                            <button className={styles.outlineBtn}>Careers</button>
                            <button className={styles.solidBtn}>Apply Now</button>
                        </div>
                    </div>
                    <div className={styles.visualContent}>
                        <div className={styles.imageCard}>
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop"
                                alt="Unntangle Team"
                                className={styles.teamImg}
                            />
                            <div className={styles.logoOverlay}>
                                <div className={styles.unntangleA}>A</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
