import { Database, Users, Mail, MessageCircle, FileSpreadsheet, FileText, HardDrive, Braces } from 'lucide-react';
import styles from './Home.module.css';

/**
 * Logo-row style strip. Deliberately lists system TYPES, not client or
 * vendor logos: Unntangle has no approved client logos to show yet, and
 * vendor logos would imply partnerships. Swap in real client logos (with
 * permission) when they exist.
 */
const systems = [
    { label: 'ERP', icon: <Database size={18} /> },
    { label: 'CRM', icon: <Users size={18} /> },
    { label: 'Email', icon: <Mail size={18} /> },
    { label: 'WhatsApp', icon: <MessageCircle size={18} /> },
    { label: 'Excel & Sheets', icon: <FileSpreadsheet size={18} /> },
    { label: 'PDFs & Documents', icon: <FileText size={18} /> },
    { label: 'Databases', icon: <HardDrive size={18} /> },
    { label: 'APIs', icon: <Braces size={18} /> },
];

export default function HomeSystemsStrip() {
    return (
        <section className={styles.strip}>
            <div className={styles.container}>
                <p className={styles.stripTitle}>
                    AI that works with the systems your business already runs
                </p>
                <div className={styles.stripRow}>
                    {systems.map((s) => (
                        <span key={s.label} className={styles.stripItem}>
                            {s.icon}
                            {s.label}
                        </span>
                    ))}
                </div>
                <p className={styles.stripNote}>
                    No rip-and-replace. Integrations are scoped to the systems you use.
                </p>
            </div>
        </section>
    );
}
