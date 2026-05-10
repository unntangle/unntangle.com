import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LegalPage, { LegalSection } from '@/components/LegalPage';
import styles from '@/components/LegalPage.module.css';

const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
    'https://unntangle.com';

export const metadata: Metadata = {
    // Templated → "Privacy Policy | Unntangle"
    title: 'Privacy Policy',
    description:
        'How Unntangle collects, uses, stores, and protects your personal data when you use our website, products, and services.',
    alternates: { canonical: '/privacy' },
    openGraph: {
        title: 'Privacy Policy | Unntangle',
        description:
            'How Unntangle collects, uses, stores, and protects your personal data when you use our website, products, and services.',
        url: `${SITE_URL}/privacy`,
        type: 'website',
    },
    robots: {
        index: true,
        follow: true,
    },
};

/**
 * /privacy — Privacy Policy
 *
 * Plain-English policy tailored to what Unntangle actually
 * collects and processes:
 *   - Marketing site form submissions (contact, project briefs,
 *     newsletter signups)
 *   - SaaS product usage (uVOIZ, future uDYLR / uSCRIBR)
 *   - uSYNQ smart-living hardware enquiries
 *
 * Written to satisfy:
 *   - India's DPDPA 2023 (Digital Personal Data Protection Act)
 *   - GDPR for EU/UK visitors
 *   - General good-faith transparency
 *
 * Not legal advice. Have a lawyer review before launching this in
 * production. The intent is to be substantively accurate and
 * honestly authored, not legally definitive.
 */

const sections: LegalSection[] = [
    {
        id: 'who-we-are',
        heading: 'Who We Are',
        body: (
            <>
                <p>
                    Unntangle is a full-stack technology and digital company
                    headquartered in Chennai, India. We build products, platforms,
                    and brands for businesses across India and beyond — including
                    our own SaaS suite (uVOIZ, uDYLR, uSCRIBR) and our smart-living
                    hardware brand uSYNQ.
                </p>
                <p>
                    This policy explains what data we collect, why we collect it,
                    and the choices you have. It applies to{' '}
                    <strong>unntangle.com</strong> and any product or service that
                    links to it.
                </p>
            </>
        ),
    },
    {
        id: 'what-we-collect',
        heading: 'What We Collect',
        body: (
            <>
                <p>We collect data in three situations:</p>

                <h3>1. When you contact us</h3>
                <p>
                    If you fill out a form on our website (contact, project
                    enquiry, uSYNQ enquiry), we collect the fields you provide —
                    typically your name, work email, phone number, company,
                    project type, and any message you write.
                </p>

                <h3>2. When you use our products</h3>
                <p>
                    Our SaaS products collect operational data needed to run the
                    service (account details, usage logs, content you create
                    inside the product). Each product has its own privacy notice
                    inside the product surface — those notices govern in-product
                    data. This page covers only the marketing site.
                </p>

                <h3>3. Automatically, when you visit</h3>
                <p>
                    Like most websites, we collect basic technical data about
                    your visit: IP address, browser type, pages viewed, referrer,
                    and approximate location (country/city level). This helps us
                    understand which content is useful and diagnose problems.
                </p>
            </>
        ),
    },
    {
        id: 'how-we-use',
        heading: 'How We Use Your Data',
        body: (
            <>
                <p>We use the data we collect to:</p>
                <ul>
                    <li>
                        Respond to your enquiries and follow up on projects you ask
                        us to scope.
                    </li>
                    <li>
                        Send you the content or quote you specifically requested
                        — we don&apos;t add you to general marketing lists without
                        a separate opt-in.
                    </li>
                    <li>
                        Improve the website (which pages people read, what
                        content&apos;s working, where things break).
                    </li>
                    <li>
                        Meet our legal obligations (tax, accounting, dispute
                        resolution if any).
                    </li>
                </ul>
                <p>
                    We <strong>do not</strong> sell your data, rent your data, or
                    share it with advertisers.
                </p>
            </>
        ),
    },
    {
        id: 'who-we-share-with',
        heading: 'Who We Share Data With',
        body: (
            <>
                <p>
                    We use a small number of third-party service providers to run
                    the website and our internal operations. The relevant ones:
                </p>
                <ul>
                    <li>
                        <strong>Cloud hosting</strong> — Amazon Web Services
                        (AWS) and Vercel. They store website assets and process
                        page requests.
                    </li>
                    <li>
                        <strong>Email</strong> — Google Workspace. Form
                        submissions and our internal team email run through
                        Gmail.
                    </li>
                    <li>
                        <strong>Analytics</strong> — Google Analytics 4 (privacy-
                        configured to anonymise IP addresses; see{' '}
                        <a href="/cookie-preferences">Cookie Preferences</a>).
                    </li>
                </ul>
                <p>
                    Each of these providers has their own privacy practices. We
                    only share the minimum data needed for them to perform their
                    function, and we have data-processing agreements with the
                    ones that handle personal data.
                </p>
            </>
        ),
    },
    {
        id: 'how-long-we-keep',
        heading: 'How Long We Keep Your Data',
        body: (
            <>
                <p>
                    We keep your data only as long as we have a reason to:
                </p>
                <ul>
                    <li>
                        <strong>Project enquiries:</strong> 24 months from your
                        last interaction, then deleted unless we&apos;re actively
                        working with you.
                    </li>
                    <li>
                        <strong>Customer records:</strong> 7 years after the
                        engagement ends, to satisfy Indian tax and accounting
                        retention rules.
                    </li>
                    <li>
                        <strong>Website analytics:</strong> aggregated and
                        anonymised after 14 months in Google Analytics.
                    </li>
                </ul>
                <p>
                    You can ask us to delete your data sooner — see{' '}
                    <a href="#your-rights">Your Rights</a> below.
                </p>
            </>
        ),
    },
    {
        id: 'your-rights',
        heading: 'Your Rights',
        body: (
            <>
                <p>
                    You have rights over your personal data. Depending on where
                    you live, these include:
                </p>
                <ul>
                    <li>
                        <strong>Access</strong> — get a copy of the data we hold
                        about you.
                    </li>
                    <li>
                        <strong>Correction</strong> — fix anything that&apos;s
                        wrong.
                    </li>
                    <li>
                        <strong>Deletion</strong> — ask us to delete your data
                        (subject to retention rules above).
                    </li>
                    <li>
                        <strong>Withdraw consent</strong> — for any data we
                        process based on your consent (e.g. newsletter
                        subscriptions).
                    </li>
                    <li>
                        <strong>Complain</strong> — file a complaint with the
                        Data Protection Board of India (under DPDPA 2023) or your
                        local data protection authority.
                    </li>
                </ul>
                <p>
                    To exercise any of these rights, email us at{' '}
                    <a href="mailto:privacy@unntangle.com">
                        privacy@unntangle.com
                    </a>
                    . We&apos;ll respond within 30 days.
                </p>
            </>
        ),
    },
    {
        id: 'security',
        heading: 'How We Protect Your Data',
        body: (
            <>
                <p>
                    We use industry-standard practices to keep your data secure:
                </p>
                <ul>
                    <li>HTTPS/TLS encryption for data in transit</li>
                    <li>Encrypted databases for data at rest</li>
                    <li>
                        Access controls and audit logging on internal tools
                    </li>
                    <li>
                        Principle of least privilege — team members only access
                        the data they need for their role
                    </li>
                </ul>
                <p>
                    No system is perfectly secure. If a breach affects your
                    personal data, we&apos;ll notify you and the relevant
                    authority within the timelines required by law.
                </p>
            </>
        ),
    },
    {
        id: 'cookies',
        heading: 'Cookies',
        body: (
            <>
                <p>
                    Our website uses cookies and similar technologies. The full
                    breakdown — what cookies we use, what they do, and how to
                    control them — is on our{' '}
                    <a href="/cookie-preferences">Cookie Preferences</a> page.
                </p>
            </>
        ),
    },
    {
        id: 'changes',
        heading: 'Changes to This Policy',
        body: (
            <>
                <p>
                    If we change this policy, we&apos;ll update the &quot;Last
                    updated&quot; date at the top. Substantive changes (new types
                    of data, new sharing) will also trigger an in-product or
                    email notice if you&apos;re an active customer.
                </p>
            </>
        ),
    },
    {
        id: 'contact',
        heading: 'Contact Us',
        body: (
            <>
                <p>
                    Questions about this policy or about your data? Reach out:
                </p>
                <div className={styles.contactBlock}>
                    <p>
                        <strong>Unntangle</strong>
                        <br />
                        SBS Office Space, Old No.470, New No.700,
                        <br />
                        Anna Salai, Nandanam, Chennai 600035, India
                    </p>
                    <p>
                        <strong>Email:</strong>{' '}
                        <a href="mailto:privacy@unntangle.com">
                            privacy@unntangle.com
                        </a>
                    </p>
                    <p>
                        <strong>Phone:</strong>{' '}
                        <a href="tel:+917092747933">+91 70927 47933</a>
                    </p>
                </div>
            </>
        ),
    },
];

export default function PrivacyPage() {
    return (
        <main>
            <Navbar />
            <div style={{ paddingTop: '80px' }}>
                <LegalPage
                    eyebrow="Legal"
                    title="Privacy Policy"
                    lastUpdated="2026-05-10"
                    intro={
                        <p>
                            We respect the data you share with us. This page
                            explains what we collect, why, and the choices you
                            have — in plain English, not legalese.
                        </p>
                    }
                    sections={sections}
                />
            </div>
            <Footer />
        </main>
    );
}
