'use client';

import { motion } from 'framer-motion';
import {
    Factory,
    Cog,
    Truck,
    Package,
    FlaskConical,
    Shirt,
    Headphones,
    Stethoscope,
} from 'lucide-react';
import styles from './Industries.module.css';

/**
 * Home-page "Industries we serve" section.
 *
 * A grid of vertical-specific cards. Each card pairs a Lucide icon
 * with the industry name and a one-line description of how
 * Unntangle Technologies's three pillars (tech / design / growth) typically map
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
        icon: <Factory size={26} />,
        name: 'Manufacturing',
        description:
            'AI-powered workflows for RFQ processing, quotations, procurement, production reporting, quality documentation, inventory and collections.',
    },
    {
        icon: <Cog size={26} />,
        name: 'Industrial & Engineering',
        description:
            'AI for technical documentation, project proposals, quotation preparation, project workflows and customer communication.',
    },
    {
        icon: <Truck size={26} />,
        name: 'Logistics & Transportation',
        description:
            'AI for shipment tracking, documentation processing, customer updates, billing workflows and operational reporting.',
    },
    {
        icon: <Package size={26} />,
        name: 'Distribution',
        description:
            'AI for dealer enquiry management, order processing, inventory monitoring, quotations and collections follow-up.',
    },
    {
        icon: <FlaskConical size={26} />,
        name: 'Pharma & Chemicals',
        description:
            'AI for documentation workflows, compliance support, procurement processing and customer operations.',
    },
    {
        icon: <Shirt size={26} />,
        name: 'Textiles & Apparel',
        description:
            'AI for buyer communication, order processing, production tracking, quality documentation and export workflows.',
    },
    {
        icon: <Headphones size={26} />,
        name: 'BPO & Contact Centers',
        description:
            'AI voice agents, intelligent contact-center workflows and CRM-integrated automation for high-volume customer operations.',
    },
    {
        icon: <Stethoscope size={26} />,
        name: 'Healthcare',
        description:
            'AI for clinical documentation, patient communication, administrative workflows and compliance-related processes.',
    },
];

export default function Industries() {
    return (
        <section className={styles.section}>
            <div className={`container ${styles.container}`}>
                <div className={styles.header}>
                    <span className="tag">Industries</span>
                    <h2>AI for Complex B2B Operations</h2>
                    <p>
                        Established businesses in operationally complex industries have the most to gain from AI deployment. Every industry below has workflows that consume significant employee time — and are strong candidates for AI automation.
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
