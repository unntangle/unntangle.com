import Link from 'next/link';
import {
    Database, Users, Mail, MessageCircle, FileSpreadsheet, FileText, HardDrive, Braces,
    Sparkles, ArrowRight,
} from 'lucide-react';
import styles from './Home.module.css';

/**
 * "Connected systems" hub, directly under the home hero.
 * Left: heading + note + link. Right: a central Unntangle AI hub with the
 * eight system types it connects to arranged around it, joined by flowing
 * dotted lines. Collapses to a simple grid on small screens.
 *
 * Lists system TYPES, not vendor or client logos: there are no approved
 * client logos yet, and vendor logos would imply partnerships.
 */

const iconProps = { size: 18, strokeWidth: 1.6 };

const systems = [
    { label: 'ERP', icon: <Database {...iconProps} />, tone: styles.sysT1 },
    { label: 'CRM', icon: <Users {...iconProps} />, tone: styles.sysT2 },
    { label: 'Email', icon: <Mail {...iconProps} />, tone: styles.sysT3 },
    { label: 'WhatsApp', icon: <MessageCircle {...iconProps} />, tone: styles.sysT4 },
    { label: 'Excel & Sheets', icon: <FileSpreadsheet {...iconProps} />, tone: styles.sysT5 },
    { label: 'PDFs & Documents', icon: <FileText {...iconProps} />, tone: styles.sysT6 },
    { label: 'Databases', icon: <HardDrive {...iconProps} />, tone: styles.sysT7 },
    { label: 'APIs', icon: <Braces {...iconProps} />, tone: styles.sysT8 },
];

// Positions (in % of the diagram box) evenly around an ellipse, starting at the top.
const positions = systems.map((_, i) => {
    const angle = (-90 + i * (360 / systems.length)) * (Math.PI / 180);
    return {
        x: 50 + 35 * Math.cos(angle),
        y: 50 + 39 * Math.sin(angle),
    };
});

export default function HomeSystemsStrip() {
    return (
        <section className={styles.sysSection}>
            <div className={styles.container}>
                <div className={styles.sysSplit}>
                    <div className={styles.sysCopy}>
                        <span className={styles.eyebrow}>Connected Systems</span>
                        <h2 className={styles.sysTitle}>
                            AI That Works With the Systems Your Business Already Runs
                        </h2>
                        <p className={styles.sysNote}>
                            No rip-and-replace. AI connects to your ERP, CRM, inbox, documents and
                            data, with integrations scoped to the systems you actually use.
                        </p>
                        <Link href="/services/ai-integration" className={styles.textLink}>
                            How integration works <ArrowRight size={14} />
                        </Link>
                    </div>

                    <div className={styles.sysHubWrap} aria-label="Systems Unntangle AI connects to">
                        {/* Connector lines */}
                        <svg className={styles.sysLines} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                            {positions.map((p, i) => (
                                <line
                                    key={i}
                                    x1={p.x}
                                    y1={p.y}
                                    x2={50}
                                    y2={50}
                                    className={styles.sysLine}
                                    style={{ animationDelay: `${i * 0.15}s` }}
                                    vectorEffect="non-scaling-stroke"
                                />
                            ))}
                        </svg>

                        {/* Central hub */}
                        <div className={styles.sysHub}>
                            <span className={styles.sysHubRing} aria-hidden="true" />
                            <span className={styles.sysHubIcon} aria-hidden="true"><Sparkles size={20} strokeWidth={1.6} /></span>
                            <span className={styles.sysHubLabel}>Unntangle AI</span>
                        </div>

                        {/* System nodes */}
                        <ul className={styles.sysNodes}>
                            {systems.map((s, i) => (
                                <li
                                    key={s.label}
                                    className={styles.sysNode}
                                    style={{
                                        left: `${positions[i].x}%`,
                                        top: `${positions[i].y}%`,
                                        animationDelay: `${i * 0.35}s`,
                                    }}
                                >
                                    <span className={`${styles.sysNodeIcon} ${s.tone}`} aria-hidden="true">{s.icon}</span>
                                    {s.label}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
