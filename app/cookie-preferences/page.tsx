'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LegalPage, { LegalSection } from '@/components/LegalPage';
import styles from './page.module.css';
import legalStyles from '@/components/LegalPage.module.css';

/**
 * /cookie-preferences — Cookie Preferences and Policy
 *
 * Two-in-one page:
 *   1. Interactive preference panel where the user can toggle
 *      analytics cookies on/off (essential cookies are always on).
 *   2. Read-only policy explaining what each cookie category is
 *      for, how long they persist, who serves them, etc.
 *
 * Storage: preferences are persisted in localStorage under the
 * key `unntangle:cookie-prefs` so they survive across visits.
 * Real production setup would also wire a Consent Mode v2 signal
 * into Google Tag Manager / GA4 here — for now, the preference
 * is captured and saved, and downstream tags can read it.
 *
 * Categories follow the standard ICO / EU breakdown:
 *   - Essential (always on, can't be disabled)
 *   - Analytics (opt-in)
 *   - Marketing (opt-in, currently not used but listed honestly)
 */

interface CookiePrefs {
    analytics: boolean;
    marketing: boolean;
}

const DEFAULT_PREFS: CookiePrefs = {
    analytics: false,
    marketing: false,
};

const STORAGE_KEY = 'unntangle:cookie-prefs';

function CookiePreferencePanel() {
    const [prefs, setPrefs] = useState<CookiePrefs>(DEFAULT_PREFS);
    const [savedFlash, setSavedFlash] = useState(false);
    const [hydrated, setHydrated] = useState(false);

    // Load saved prefs from localStorage on mount. The hydrated
    // flag ensures we don't render initial-state UI that
    // would mismatch what's actually saved.
    useEffect(() => {
        if (typeof window === 'undefined') return;
        try {
            const raw = window.localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw) as Partial<CookiePrefs>;
                setPrefs({
                    analytics: !!parsed.analytics,
                    marketing: !!parsed.marketing,
                });
            }
        } catch {
            // localStorage may be disabled (private mode, certain
            // browsers). Fall back to defaults rather than throwing.
        }
        setHydrated(true);
    }, []);

    const updatePref = (key: keyof CookiePrefs, value: boolean) => {
        setPrefs((prev) => ({ ...prev, [key]: value }));
    };

    const save = () => {
        if (typeof window === 'undefined') return;
        try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
            setSavedFlash(true);
            // Clear the "Saved" flash after 2.5s so the button
            // returns to its normal label and can be saved again
            // if the user changes prefs.
            setTimeout(() => setSavedFlash(false), 2500);
        } catch {
            // localStorage write failed — silently no-op. A real
            // production setup might surface this as a toast.
        }
    };

    const acceptAll = () => {
        const all: CookiePrefs = { analytics: true, marketing: true };
        setPrefs(all);
        if (typeof window !== 'undefined') {
            try {
                window.localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
                setSavedFlash(true);
                setTimeout(() => setSavedFlash(false), 2500);
            } catch {
                /* ignore */
            }
        }
    };

    const rejectAll = () => {
        const none: CookiePrefs = { analytics: false, marketing: false };
        setPrefs(none);
        if (typeof window !== 'undefined') {
            try {
                window.localStorage.setItem(STORAGE_KEY, JSON.stringify(none));
                setSavedFlash(true);
                setTimeout(() => setSavedFlash(false), 2500);
            } catch {
                /* ignore */
            }
        }
    };

    return (
        <div className={styles.panel}>
            <div className={styles.panelHeader}>
                <h3 className={styles.panelTitle}>Manage your cookies</h3>
                <p className={styles.panelDescription}>
                    Choose which cookie categories you want to allow. Essential
                    cookies are required for the site to function and can&apos;t be
                    turned off.
                </p>
            </div>

            <div className={styles.categories}>
                {/* Essential — always on, disabled toggle */}
                <div className={styles.categoryRow}>
                    <div className={styles.categoryText}>
                        <div className={styles.categoryNameRow}>
                            <span className={styles.categoryName}>Essential</span>
                            <span className={styles.alwaysOn}>Always on</span>
                        </div>
                        <p className={styles.categoryDesc}>
                            Required for the site to function — page navigation,
                            form submission, and security. Cannot be disabled.
                        </p>
                    </div>
                    <label className={`${styles.toggle} ${styles.toggleDisabled}`}>
                        <input
                            type="checkbox"
                            checked
                            disabled
                            readOnly
                            aria-label="Essential cookies (always on)"
                        />
                        <span className={styles.toggleSlider} />
                    </label>
                </div>

                {/* Analytics */}
                <div className={styles.categoryRow}>
                    <div className={styles.categoryText}>
                        <span className={styles.categoryName}>Analytics</span>
                        <p className={styles.categoryDesc}>
                            Help us understand which content is useful by
                            measuring page views, scroll depth, and similar
                            anonymous signals through Google Analytics 4.
                        </p>
                    </div>
                    <label className={styles.toggle}>
                        <input
                            type="checkbox"
                            checked={hydrated ? prefs.analytics : false}
                            onChange={(e) =>
                                updatePref('analytics', e.target.checked)
                            }
                            aria-label="Analytics cookies"
                        />
                        <span className={styles.toggleSlider} />
                    </label>
                </div>

                {/* Marketing */}
                <div className={styles.categoryRow}>
                    <div className={styles.categoryText}>
                        <span className={styles.categoryName}>Marketing</span>
                        <p className={styles.categoryDesc}>
                            Currently not used. We don&apos;t run retargeting
                            pixels or third-party ad cookies. This toggle is
                            here so your preference is recorded if we add any
                            in the future.
                        </p>
                    </div>
                    <label className={styles.toggle}>
                        <input
                            type="checkbox"
                            checked={hydrated ? prefs.marketing : false}
                            onChange={(e) =>
                                updatePref('marketing', e.target.checked)
                            }
                            aria-label="Marketing cookies"
                        />
                        <span className={styles.toggleSlider} />
                    </label>
                </div>
            </div>

            <div className={styles.actions}>
                <button
                    type="button"
                    className={`${styles.btn} ${styles.btnPrimary}`}
                    onClick={save}
                >
                    {savedFlash ? '✓ Preferences saved' : 'Save preferences'}
                </button>
                <button
                    type="button"
                    className={`${styles.btn} ${styles.btnGhost}`}
                    onClick={acceptAll}
                >
                    Accept all
                </button>
                <button
                    type="button"
                    className={`${styles.btn} ${styles.btnGhost}`}
                    onClick={rejectAll}
                >
                    Reject all (non-essential)
                </button>
            </div>
        </div>
    );
}

/* ============================================================
   POLICY SECTIONS — read-only explainer below the panel
============================================================ */

const sections: LegalSection[] = [
    {
        id: 'preferences',
        heading: 'Your Cookie Preferences',
        body: (
            <>
                <p>
                    Use the panel below to choose which cookie categories you
                    allow. Your choices are saved on this device and apply only
                    to <strong>unntangle.com</strong>.
                </p>
                <CookiePreferencePanel />
            </>
        ),
    },
    {
        id: 'what-are-cookies',
        heading: 'What Are Cookies?',
        body: (
            <>
                <p>
                    Cookies are small text files that websites place on your
                    device to remember things between visits. They&apos;re used
                    for everything from keeping you logged in to measuring how
                    many people read a particular blog post.
                </p>
                <p>
                    We use cookies and similar storage technologies (like
                    localStorage) sparingly — only what&apos;s needed to make
                    the site work and, if you opt in, to understand which
                    content is useful.
                </p>
            </>
        ),
    },
    {
        id: 'categories',
        heading: 'Cookie Categories',
        body: (
            <>
                <h3>Essential cookies</h3>
                <p>
                    Required for the site to function. They handle things like
                    routing, form security tokens, and remembering your cookie
                    preferences themselves. These can&apos;t be turned off — if
                    they were, the site wouldn&apos;t work.
                </p>

                <h3>Analytics cookies</h3>
                <p>
                    Optional. If you allow them, we use Google Analytics 4 to
                    measure things like which pages get visited, how people get
                    to the site (search, direct, referral), and where the
                    drop-off points are. Data is aggregated and IP addresses are
                    anonymised.
                </p>

                <h3>Marketing cookies</h3>
                <p>
                    Optional. We don&apos;t currently run any. The toggle exists
                    so that if we ever add retargeting pixels or third-party ad
                    cookies, your existing preference will already be recorded.
                </p>
            </>
        ),
    },
    {
        id: 'specific-cookies',
        heading: 'Specific Cookies We Use',
        body: (
            <>
                <p>
                    Below is the full list of cookies the Site sets, what
                    they&apos;re for, and how long they last.
                </p>

                <h3>Essential</h3>
                <ul>
                    <li>
                        <strong>unntangle:cookie-prefs</strong> (localStorage,
                        permanent until you clear it) — stores your choices
                        from the panel above.
                    </li>
                </ul>

                <h3>Analytics (only if you opt in)</h3>
                <ul>
                    <li>
                        <strong>_ga, _ga_*</strong> — Google Analytics 4. Used
                        to distinguish users and sessions. Expires after 2
                        years.
                    </li>
                </ul>

                <h3>Marketing</h3>
                <p>
                    None at present. If we add any, this list will be updated
                    and existing users with marketing turned off will not be
                    affected.
                </p>
            </>
        ),
    },
    {
        id: 'changing-mind',
        heading: 'Changing Your Mind',
        body: (
            <>
                <p>
                    You can update your preferences at any time by returning to
                    this page and toggling the switches in the panel above. The
                    new choice takes effect immediately and applies to future
                    visits on this device.
                </p>
                <p>
                    You can also clear your cookies entirely through your
                    browser&apos;s privacy settings. If you do, you&apos;ll see
                    the consent panel again next time you visit (once we add
                    one), and your preferences will reset to defaults.
                </p>
            </>
        ),
    },
    {
        id: 'browser-controls',
        heading: 'Browser Controls',
        body: (
            <>
                <p>
                    All major browsers let you block or delete cookies. The
                    exact steps vary by browser:
                </p>
                <ul>
                    <li>
                        <strong>Chrome:</strong> Settings → Privacy and security
                        → Cookies and other site data
                    </li>
                    <li>
                        <strong>Safari:</strong> Settings → Privacy → Manage
                        Website Data
                    </li>
                    <li>
                        <strong>Firefox:</strong> Settings → Privacy &amp;
                        Security → Cookies and Site Data
                    </li>
                    <li>
                        <strong>Edge:</strong> Settings → Cookies and site
                        permissions → Manage and delete cookies
                    </li>
                </ul>
                <p>
                    Note that blocking essential cookies will likely break parts
                    of the site (forms, navigation), so most browsers
                    block-by-category rather than universally.
                </p>
            </>
        ),
    },
    {
        id: 'contact',
        heading: 'Contact',
        body: (
            <>
                <p>
                    Questions about cookies, this preference panel, or your
                    privacy on the Site? Email us at{' '}
                    <a href="mailto:gokul@unntangle.com">
                        gokul@unntangle.com
                    </a>
                    .
                </p>
                <div className={legalStyles.contactBlock}>
                    <p>
                        <strong>Unntangle</strong>
                        <br />
                        SBS Office Space, Old No.470, New No.700,
                        <br />
                        Anna Salai, Nandanam, Chennai 600035, India
                    </p>
                </div>
            </>
        ),
    },
];

export default function CookiePreferencesPage() {
    return (
        <main>
            <Navbar />
            <div style={{ paddingTop: '80px' }}>
                <LegalPage
                    eyebrow="Legal"
                    title="Cookie Preferences"
                    lastUpdated="2026-05-10"
                    intro={
                        <p>
                            We use a small number of cookies to make this site
                            work and (optionally) to understand which content is
                            useful. You&apos;re in control of which categories
                            you allow.
                        </p>
                    }
                    sections={sections}
                />
            </div>
            <Footer />
        </main>
    );
}
