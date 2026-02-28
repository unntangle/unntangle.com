'use client';

import styles from './BrandBar.module.css';

const logos = [
    { name: 'Google', src: 'https://cdn.worldvectorlogo.com/logos/google-2015.svg' },
    { name: 'KFC', src: 'https://cdn.worldvectorlogo.com/logos/kfc-1.svg' },
    { name: 'Deloitte', src: 'https://cdn.worldvectorlogo.com/logos/deloitte-2.svg' },
    { name: 'BCG', src: 'https://cdn.worldvectorlogo.com/logos/boston-consulting-group.svg' },
    { name: 'Clutch', src: 'https://cdn.worldvectorlogo.com/logos/clutch-co.svg' },
];

export default function BrandBar() {
    return (
        <div className={styles.brandBar}>
            <div className={`container ${styles.container}`}>
                <div className={styles.marquee}>
                    <div className={styles.track}>
                        {[...logos, ...logos].map((logo, i) => (
                            <div key={i} className={styles.logoItem}>
                                <img src={logo.src} alt={logo.name} className={styles.logoImage} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
