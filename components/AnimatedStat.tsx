'use client';

/* AnimatedStat — counts up a numeric value when scrolled into view.
 *
 * Why a custom component instead of framer-motion's useMotionValue?
 *   - Stat strings here are mixed (e.g. "5000W", "IP65"): we need to
 *     animate ONLY the numeric portion and keep prefixes/suffixes
 *     (like "IP" or "W") in place. A plain motion value gives us
 *     a number; we'd still need the splitting logic anyway.
 *   - Easing curve matters. requestAnimationFrame with an easeOutQuart
 *     curve gives a "fast-then-settle" feel that reads as confident
 *     rather than just linear-counting.
 *
 * Behaviour:
 *   - Mounts with the prefix + "0" + suffix.
 *   - When the wrapper enters the viewport (IntersectionObserver)
 *     the counter ramps from 0 to `target` over `duration` ms.
 *   - Animation runs ONCE per mount (matches the rest of the page's
 *     `viewport={{ once: true }}` reveal pattern).
 */

import { useEffect, useRef, useState } from 'react';

interface AnimatedStatProps {
    /** The full display string, e.g. "5000W", "40A", "IP65", "2". */
    value: string;
    /** Counter ramp duration in ms. Default 1600. */
    duration?: number;
    /** Optional className for the rendered <span>. */
    className?: string;
}

/**
 * Splits a stat string into [prefix, number, suffix].
 *   "5000W"  -> ["",   5000, "W"]
 *   "IP65"   -> ["IP", 65,   ""]
 *   "2"      -> ["",   2,    ""]
 *   "40A"    -> ["",   40,   "A"]
 *
 * If no number is found, returns the original string in `prefix` so
 * the component degrades gracefully (renders the value as-is).
 */
function splitStat(value: string): { prefix: string; number: number | null; suffix: string } {
    const match = value.match(/^([^\d]*)(\d+(?:\.\d+)?)([^\d]*)$/);
    if (!match) return { prefix: value, number: null, suffix: '' };
    return {
        prefix: match[1] ?? '',
        number: parseFloat(match[2]),
        suffix: match[3] ?? '',
    };
}

// easeOutQuart — fast start, gentle settle. Feels confident on a metric
// readout (vs linear which feels like a kitchen timer).
const easeOutQuart = (t: number): number => 1 - Math.pow(1 - t, 4);

export default function AnimatedStat({
    value,
    duration = 1600,
    className,
}: AnimatedStatProps) {
    const { prefix, number: target, suffix } = splitStat(value);
    const [display, setDisplay] = useState<string>(
        target === null ? value : `${prefix}0${suffix}`
    );
    const wrapperRef = useRef<HTMLSpanElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        // No numeric portion found → just render the static value.
        if (target === null) return;
        if (!wrapperRef.current) return;

        const el = wrapperRef.current;

        // Use IntersectionObserver instead of framer-motion's whileInView
        // because we need a one-shot start trigger, not a re-animatable
        // motion value. IntersectionObserver is also lighter for this case.
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasAnimated.current) {
                        hasAnimated.current = true;
                        runCount();
                        observer.disconnect();
                    }
                });
            },
            // 80px margin = start the count slightly before the band is fully in view,
            // so by the time the user's eye lands on it the numbers are mid-flight
            // instead of hitting them at zero.
            { threshold: 0.3, rootMargin: '0px 0px -80px 0px' }
        );

        observer.observe(el);

        function runCount() {
            const startTime = performance.now();
            const targetNum = target as number;
            // Decide if this is an integer counter (most are) so we don't render
            // "1234.5673..." mid-flight when the target is 5000.
            const isInteger = Number.isInteger(targetNum);

            const tick = (now: number) => {
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = easeOutQuart(progress);
                const current = targetNum * eased;
                const rendered = isInteger
                    ? Math.round(current).toString()
                    : current.toFixed(1);
                setDisplay(`${prefix}${rendered}${suffix}`);
                if (progress < 1) {
                    requestAnimationFrame(tick);
                } else {
                    // Snap to the exact target string at the end so we never
                    // show "4999W" because of float drift.
                    setDisplay(value);
                }
            };

            requestAnimationFrame(tick);
        }

        return () => observer.disconnect();
    }, [target, prefix, suffix, value, duration]);

    return (
        <span ref={wrapperRef} className={className}>
            {display}
        </span>
    );
}
