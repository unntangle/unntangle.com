import styles from './WorkflowScene.module.css';

/**
 * Subtle "document to structured data" animation for the Contact page panel.
 * Left: an incoming RFQ document with a soft scan line sweeping down it.
 * Right: the fields AI extracts, drawing in one by one, then a quiet
 * "Quote draft ready" confirmation. Mostly white on the dark panel with a
 * single soft lilac accent. Decorative only (aria-hidden); reduced-motion
 * shows a still, completed frame.
 */

const docLines = [
    { y: 58, w: 96 },
    { y: 72, w: 82 },
    { y: 86, w: 104 },
    { y: 100, w: 70 },
    { y: 114, w: 92 },
    { y: 128, w: 60 },
];

const fields = [
    { label: 'Customer', w: 118 },
    { label: 'Items', w: 92 },
    { label: 'Quantity', w: 58 },
    { label: 'Delivery', w: 80 },
];

export default function WorkflowScene() {
    return (
        <div className={styles.scene} aria-hidden="true">
            <svg viewBox="0 0 520 176" className={styles.svg}>
                {/* column labels */}
                <text x="20" y="14" className={styles.label}>Incoming RFQ</text>
                <text x="270" y="14" className={styles.label}>Extracted by AI</text>

                {/* ---------- document ---------- */}
                <rect x="20" y="26" width="150" height="140" rx="12" className={styles.doc} />
                <rect x="36" y="40" width="46" height="6" rx="3" className={styles.docHead} />
                {docLines.map((l, i) => (
                    <rect
                        key={l.y}
                        x="36"
                        y={l.y}
                        width={l.w}
                        height="4"
                        rx="2"
                        className={styles.docLine}
                        style={{ animationDelay: `${0.35 + i * 0.36}s` }}
                    />
                ))}
                {/* scan line */}
                <g className={styles.scan}>
                    <rect x="26" y="36" width="138" height="14" rx="4" className={styles.scanBand} />
                    <rect x="26" y="49" width="138" height="1.5" rx="0.75" className={styles.scanLine} />
                </g>

                {/* ---------- connector ---------- */}
                <line x1="186" y1="96" x2="252" y2="96" className={styles.dots} />
                <circle cx="186" cy="96" r="3" className={styles.traveller} />

                {/* ---------- extracted fields ---------- */}
                <rect x="270" y="26" width="230" height="140" rx="12" className={styles.panel} />
                {fields.map((f, i) => {
                    const y = 50 + i * 24;
                    return (
                        <g key={f.label}>
                            <text x="286" y={y + 4} className={styles.fieldLabel}>{f.label}</text>
                            <rect x="360" y={y - 2} width="124" height="7" rx="3.5" className={styles.fieldTrack} />
                            <rect
                                x="360"
                                y={y - 2}
                                width={f.w}
                                height="7"
                                rx="3.5"
                                className={styles.fieldValue}
                                style={{ animationDelay: `${i * 0.35}s` }}
                            />
                        </g>
                    );
                })}

                {/* confirmation */}
                <g className={styles.done}>
                    <line x1="286" y1="142" x2="484" y2="142" className={styles.divider} />
                    <circle cx="293" cy="155" r="7" className={styles.checkRing} />
                    <path d="M289.8 155 l2.2 2.2 l4 -4.2" className={styles.checkMark} />
                    <text x="308" y="159" className={styles.doneText}>Quote draft ready for approval</text>
                </g>
            </svg>
        </div>
    );
}
