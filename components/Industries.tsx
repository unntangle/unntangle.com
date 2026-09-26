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
    Building2,
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

// Descriptions name the kinds of workflows AI can take on in each
// industry. They are deliberately phrased as candidate workflows, not
// as claims of past deployments — do not add "trusted by" / client
// language here without verified engagements behind it.
const industries: Industry[] = [
    {
        icon: <Factory size={26} />,
        name: 'Manufacturing',
        description:
            'AI-powered sales, RFQ, quotation, procurement, operations and reporting workflows.',
    },
    {
        icon: <Truck size={26} />,
        name: 'Logistics & Distribution',
        description:
            'Order processing, customer communication, documentation and operational workflows.',
    },
    {
        icon: <FlaskConical size={26} />,
        name: 'Pharma & Chemicals',
        description:
            'Documentation, knowledge workflows, compliance support and operational automation.',
    },
    {
        icon: <Cog size={26} />,
        name: 'Industrial & Engineering',
        description:
            'RFQ processing, technical documentation, quotations and project workflows.',
    },
    {
        icon: <Shirt size={26} />,
        name: 'Textiles & Apparel',
        description:
            'Order management, customer communication, procurement and production workflows.',
    },
    {
        icon: <Package size={26} />,
        name: 'Wholesale & Trading',
        description:
            'Dealer enquiries, order entry, stock checks, quotations and collections follow-up.',
    },
    {
        icon: <Headphones size={26} />,
        name: 'Customer Operations',
        description:
            'High-volume calling, support and service workflows connected to your CRM.',
    },
    {
        icon: <Building2 size={26} />,
        name: 'Other B2B Enterprises',
        description:
            'AI workflow deployment based on your individual business requirements.',
    },
];

export default function Industries() {
    return (
        <section className={styles.section} id="industries">
            <div className={`container ${styles.container}`}>
                <div className={styles.header}>
                    <span className="tag">Industries</span>
                    <h2>Built for Businesses With Complex Operations</h2>
                    <p>
                        We work with mid-market and enterprise B2B organisations where orders,
                        documents, approvals and customer communication move across many people
                        and systems. These are the kinds of workflows we look at first.
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
