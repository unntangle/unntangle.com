import { Factory, Truck, FlaskConical, Cog, Shirt, Package, Headphones, Building2 } from 'lucide-react';
import styles from './Home.module.css';

// Large outlined icons: thin stroke so they read as illustration, not UI.
const iconProps = { strokeWidth: 1.25 };

/**
 * Industries as a bento grid of pastel cards. Descriptions name the kinds
 * of workflows we look at in each industry \u2014 not claims of past
 * deployments. Anchor: #industries (navbar link).
 *
 * Layout on desktop (4 columns):
 *   [ Manufacturing (wide) ][ Logistics ][ Pharma ]
 *   [ Industrial ][ Textiles ][ Wholesale (wide)  ]
 *   [ Customer Ops (wide)  ][ Other B2B (wide)    ]
 */

const industries = [
    {
        name: 'Manufacturing',
        desc: 'RFQs, quotations, procurement, production reporting and collections.',
        icon: <Factory {...iconProps} />,
        motion: 'motionBob',
        tone: 'ind1',
        wide: true,
    },
    {
        name: 'Logistics & Distribution',
        desc: 'Order processing, documentation and customer updates.',
        icon: <Truck {...iconProps} />,
        motion: 'motionDrive',
        tone: 'ind2',
    },
    {
        name: 'Pharma & Chemicals',
        desc: 'Documentation, knowledge and compliance support.',
        icon: <FlaskConical {...iconProps} />,
        motion: 'motionSwirl',
        tone: 'ind3',
    },
    {
        name: 'Industrial & Engineering',
        desc: 'Technical documents, quotations and project workflows.',
        icon: <Cog {...iconProps} />,
        motion: 'motionSpin',
        tone: 'ind4',
    },
    {
        name: 'Textiles & Apparel',
        desc: 'Buyer communication, orders and production tracking.',
        icon: <Shirt {...iconProps} />,
        motion: 'motionSway',
        tone: 'ind5',
    },
    {
        name: 'Wholesale & Trading',
        desc: 'Dealer enquiries, order entry, stock checks, quotations and payment follow-ups.',
        icon: <Package {...iconProps} />,
        motion: 'motionBounce',
        tone: 'ind6',
        wide: true,
    },
    {
        name: 'Customer Operations',
        desc: 'High-volume calls, support and service requests connected to your CRM.',
        icon: <Headphones {...iconProps} />,
        motion: 'motionPulse',
        tone: 'ind7',
        wide: true,
    },
    {
        name: 'Other B2B Enterprises',
        desc: 'Any business where work moves across many people, documents and systems.',
        icon: <Building2 {...iconProps} />,
        motion: 'motionBob',
        tone: 'ind8',
        wide: true,
    },
];

export default function HomeIndustries() {
    return (
        <section className={styles.section} id="industries">
            <div className={styles.container}>
                <div className={styles.industryHead}>
                    <div>
                        <span className={styles.eyebrow}>Industries</span>
                        <h2 className={styles.h2}>Built for Businesses With Complex Operations</h2>
                    </div>
                    <p className={styles.lead}>
                        Mid-market and enterprise B2B organisations where orders, documents,
                        approvals and customer communication move across many people and systems.
                    </p>
                </div>

                <div className={styles.industryGrid}>
                    {industries.map((i) => (
                        <div
                            key={i.name}
                            className={`${styles.industryCard} ${styles[i.tone]} ${i.wide ? styles.industryWide : ''}`}
                        >
                            <span className={`${styles.industryBigIcon} ${styles[i.motion]}`} aria-hidden="true">{i.icon}</span>
                            <div className={styles.industryText}>
                                <h3 className={styles.industryName}>{i.name}</h3>
                                <p className={styles.industryDesc}>{i.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
