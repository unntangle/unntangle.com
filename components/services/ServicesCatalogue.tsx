import Link from 'next/link';
import type { ReactNode } from 'react';
import {
    ArrowRight,
    ClipboardCheck,
    Bot,
    Plug,
    Globe,
    RefreshCw,
    Smartphone,
    Database,
    Box,
    Palette,
    Shapes,
    Image as ImageIcon,
    Layers,
} from 'lucide-react';
import { servicesData } from '@/data/services';
import about from '../about/About.module.css';
import styles from './Services.module.css';

/**
 * /services — every service, grouped by pillar, as pastel-icon cards
 * linking to each service detail page. Driven by data/services.ts, so
 * new services appear automatically.
 */

const iconProps = { size: 24, strokeWidth: 1.5 };

const serviceIcon: Record<string, ReactNode> = {
    'ai-workflow-assessment': <ClipboardCheck {...iconProps} />,
    'ai-agents': <Bot {...iconProps} />,
    'ai-integration': <Plug {...iconProps} />,
    website: <Globe {...iconProps} />,
    'website-revamp': <RefreshCw {...iconProps} />,
    app: <Smartphone {...iconProps} />,
    erp: <Database {...iconProps} />,
    'interactive-3d': <Box {...iconProps} />,
    'graphic-designing': <Palette {...iconProps} />,
    '3d-designing': <Shapes {...iconProps} />,
    'ai-rendition': <ImageIcon {...iconProps} />,
};

const groups = [
    { id: 'ai', title: 'AI Implementation & Deployment' },
    { id: 'tech', title: 'Websites, Apps & Custom Software' },
    { id: 'design', title: 'Creative Design' },
];

const tones = [
    about.tonePeach,
    about.toneMint,
    about.toneLavender,
    about.toneSky,
    about.toneRose,
    about.toneButter,
];

export default function ServicesCatalogue() {
    return (
        <section className={about.section} id="all-services">
            <div className={about.container}>
                <div className={about.center} style={{ marginBottom: 56 }}>
                    <h2 className={about.h2}>
                        Every Service, <span className={about.accent}>in One Place.</span>
                    </h2>
                    <p className={about.body}>
                        Start with AI, start with software, or combine both. Each service links
                        to what&apos;s included, how we work and the questions clients usually ask.
                    </p>
                </div>

                {groups.map((g) => {
                    const items = servicesData.filter((s) => s.categoryId === g.id);
                    if (items.length === 0) return null;
                    return (
                        <div key={g.id} className={styles.catGroup}>
                            <div className={styles.catHead}>
                                <h3 className={styles.catTitle}>{g.title}</h3>
                                <span className={styles.catCount}>
                                    {items.length} {items.length === 1 ? 'service' : 'services'}
                                </span>
                            </div>
                            <div className={styles.catGrid}>
                                {items.map((s, i) => (
                                    <Link key={s.id} href={`/services/${s.id}`} className={styles.catCard}>
                                        <span
                                            className={`${styles.catIcon} ${tones[i % tones.length]}`}
                                            aria-hidden="true"
                                        >
                                            {serviceIcon[s.id] ?? <Layers {...iconProps} />}
                                        </span>
                                        <span className={styles.catName}>{s.title}</span>
                                        <span className={styles.catDesc}>{s.shortDescription}</span>
                                        <span className={styles.catArrow} aria-hidden="true">
                                            <ArrowRight size={16} />
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
