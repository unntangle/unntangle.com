'use client';

import { motion } from 'framer-motion';
import {
    Building2,
    Headphones,
    Stethoscope,
    ShoppingBag,
    GraduationCap,
    Home,
    Hotel,
    Banknote,
} from 'lucide-react';
import styles from './Industries.module.css';

/**
 * Home-page "Industries we serve" section.
 *
 * A grid of vertical-specific cards. Each card pairs a Lucide icon
 * with the industry name and a one-line description of how
 * Unntangle's three pillars (tech / design / growth) typically map
 * onto that vertical.
 *
 * Industries chosen based on Unntangle's actual product portfolio
 * and the kind of work the agency arm tends to land:
 *   - BPO / Contact Centers   → uVOIZ, uDYLR
 *   - Healthcare              → uSCRIBR
 *   - Real Estate / Hospitality → uSYNQ
 *   - D2C / Retail            → growth marketing arm
 *   - Education / EdTech      → web + ERP work
 *   - Finance / Fintech       → app dev + compliance
 */

interface Industry {
    icon: React.ReactNode;
    name: string;
    description: string;
}

const industries: Industry[] = [
    {
        icon: <Headphones size={26} />,
        name: 'BPO & Contact Centers',
        description:
            'AI telecalling, dialers, and CRM-integrated workflows that scale outbound operations.',
    },
    {
        icon: <Stethoscope size={26} />,
        name: 'Healthcare',
        description:
            'Clinical scribes, patient portals, and HIPAA-conscious infrastructure for modern practices.',
    },
    {
        icon: <Home size={26} />,
        name: 'Real Estate',
        description:
            'Smart home automation, property listings, and project micro-sites that drive bookings.',
    },
    {
        icon: <Hotel size={26} />,
        name: 'Hospitality',
        description:
            'Guest-facing apps, in-room automation, and luxury brand identities for resorts and villas.',
    },
    {
        icon: <ShoppingBag size={26} />,
        name: 'D2C & Retail',
        description:
            'High-converting storefronts, performance marketing, and creative that sells on the scroll.',
    },
    {
        icon: <Banknote size={26} />,
        name: 'Finance & Fintech',
        description:
            'Compliant app architecture, dashboards, and onboarding flows engineered for trust.',
    },
    {
        icon: <GraduationCap size={26} />,
        name: 'Education & EdTech',
        description:
            'Learning platforms, ERPs, and content-rich websites for institutions and creators.',
    },
    {
        icon: <Building2 size={26} />,
        name: 'Enterprise & B2B',
        description:
            'Internal tools, ERP integrations, and lead-gen funnels for complex sales cycles.',
    },
];

export default function Industries() {
    return (
        <section className={styles.section}>
            <div className={`container ${styles.container}`}>
                <div className={styles.header}>
                    <span className="tag">Industries</span>
                    <h2>Where we ship the work</h2>
                    <p>
                        We take on projects across verticals where digital, design, and growth
                        compound — often the same teams come back for all three.
                    </p>
                </div>

                <div className={styles.grid}>
                    {industries.map((industry, i) => (
                        <motion.div
                            key={industry.name}
                            className={styles.card}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45, delay: i * 0.05 }}
                        >
                            <div className={styles.iconWrap}>{industry.icon}</div>
                            <h3 className={styles.name}>{industry.name}</h3>
                            <p className={styles.description}>{industry.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
