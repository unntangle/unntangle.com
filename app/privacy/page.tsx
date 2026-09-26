import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LegalPage, { LegalSection } from '@/components/LegalPage';
import { heroGradientFor } from '@/components/pastelPalette';

const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
    'https://unntangle.com';

export const metadata: Metadata = {
    // Templated → "Privacy Policy | Unntangle Technologies"
    title: 'Privacy Policy',
    description:
        'How Unntangle collects, uses, stores, and protects your personal data when you use our website, products, and services.',
    alternates: { canonical: '/privacy' },
    openGraph: {
        title: 'Privacy Policy | Unntangle Technologies',
        description:
            'How Unntangle Technologies collects, uses, stores, and protects your personal data when you use our website, products, and services.',
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
 *   - Website form submissions (contact, AI Workflow Assessment
 *     requests, project enquiries, attached sample documents)
 *   - Client data we handle while delivering AI, software and
 *     integration projects (as a processor for the client)
 *   - AI product usage (uVOIZ beta; uDYLR / uSCRIBR coming soon)
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
                    Unntangle Technologies is an AI implementation and deployment
                    company headquartered in Chennai, India. We help businesses
                    identify repetitive workflows and deploy AI into the systems
                    they already use, and we build websites, apps and custom
                    software. We also develop our own AI products — uVOIZ (in
                    beta), uDYLR and uSCRIBR (coming soon).
                </p>
                <p>
                    This policy explains what data we collect, why we collect it,
                    how we handle client data in the projects we deliver, and the
                    choices you have. It applies to{' '}
                    <strong>unntangle.com</strong> and any service that links to it.
                </p>
            </>
        ),
    },
    {
        id: 'what-we-collect',
        heading: 'What We Collect',
        body: (
            <>
                <p>We collect data in four situations:</p>

                <h3>1. When you contact us or request an assessment</h3>
                <p>
                    If you fill out a form on our website (contact, AI Workflow
                    Assessment request, project enquiry), we collect the fields you
                    provide — typically your name, work email, phone number,
                    company, company size, the service you&apos;re interested in,
                    a description of your workflow or project, and any document
                    you choose to attach.
                </p>
                <p>
                    Please don&apos;t attach documents containing sensitive
                    personal data (for example health, financial or identity
                    information about your customers or staff) at this stage. If a
                    sample is needed, we&apos;ll agree a safe way to share it.
                </p>

                <h3>2. When we work with you on a project</h3>
                <p>
                    During an AI Workflow Assessment or a delivery project, you may
                    share information about your workflows, systems, documents and
                    data. How we handle that is covered in{' '}
                    <a href="#client-data">Client Data in AI and Software Projects</a>{' '}
                    below, and in the agreement for that engagement.
                </p>

                <h3>3. When you use our products</h3>
                <p>
                    Our AI products collect operational data needed to run the
                    service (account details, usage logs, content processed by
                    the product). Each product has its own privacy notice inside
                    the product — those notices govern in-product data. This page
                    covers the website and our services.
                </p>

                <h3>4. Automatically, when you visit</h3>
                <p>
                    Like most websites, our hosting provider records basic
                    technical data about each visit in server logs: IP address,
                    browser type, the pages requested and the time of the
                    request. These logs are used only for security and to
                    diagnose problems. We don&apos;t use analytics tools or
                    advertising trackers on this website.
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
                        Keep the website secure and fix things when they break.
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
        id: 'client-data',
        heading: 'Client Data in AI and Software Projects',
        body: (
            <>
                <p>
                    When we build or deploy AI workflows, integrations, apps or
                    software for a client, we may need access to that client&apos;s
                    business data — for example product and pricing data, customer
                    records, documents, emails or messages. In these projects the
                    client decides what data is used and why, and we process it on
                    the client&apos;s behalf.
                </p>
                <p>Our approach in every engagement:</p>
                <ul>
                    <li>
                        <strong>Agreed in writing first.</strong> What data the
                        solution can access, where it is processed and stored, and
                        how long it is kept are set out in the project agreement
                        before any production data is used.
                    </li>
                    <li>
                        <strong>Minimum access.</strong> Integrations use only the
                        data a workflow needs, through credentials the client
                        controls and can revoke.
                    </li>
                    <li>
                        <strong>AI model providers.</strong> Where a solution uses
                        AI models from third-party providers, which providers are
                        used and on what data terms are agreed with the client in
                        advance.
                    </li>
                    <li>
                        <strong>Human oversight and logging.</strong> Workflows are
                        designed with approval steps where appropriate, and actions
                        are logged so they can be reviewed.
                    </li>
                    <li>
                        <strong>No other use.</strong> We don&apos;t use a
                        client&apos;s business data for our own marketing, and we
                        don&apos;t share it with other clients.
                    </li>
                    <li>
                        <strong>Return or deletion.</strong> At the end of an
                        engagement, client data we hold is returned or deleted as
                        set out in the agreement.
                    </li>
                </ul>
                <p>
                    If you are an individual whose data is held by one of our
                    clients, please contact that business first — they decide how
                    your data is used. We&apos;ll support them in responding.
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
                        <strong>Email</strong> — Zoho Mail. Form
                        submissions and our internal team email run through
                        Zoho.
                    </li>
                    <li>
                        <strong>AI model providers</strong> — only within client
                        projects and our AI products, and only as agreed (see{' '}
                        <a href="#client-data">Client Data in AI and Software Projects</a>).
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
                        <strong>Enquiries and assessment requests:</strong> 24
                        months from your last interaction, then deleted unless
                        we&apos;re actively working with you.
                    </li>
                    <li>
                        <strong>Client project data:</strong> as set out in the
                        project agreement, and returned or deleted when the
                        engagement ends.
                    </li>
                    <li>
                        <strong>Customer records:</strong> 7 years after the
                        engagement ends, to satisfy Indian tax and accounting
                        retention rules.
                    </li>
                    <li>
                        <strong>Server logs:</strong> kept by our hosting
                        provider for a limited period for security and
                        troubleshooting, then deleted.
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
                    To exercise any of these rights, send us a request through
                    our <a href="/contact">contact form</a> and choose
                    &quot;Something else&quot;. We&apos;ll respond within 30 days.
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
                    This website doesn&apos;t use analytics, advertising or
                    tracking cookies, and we don&apos;t run third-party
                    tracking pixels. The site may use strictly necessary
                    technical storage for things like security and keeping a
                    form working while you fill it in; these can&apos;t be used
                    to track you across other websites.
                </p>
                <p>
                    If we ever add analytics or other non-essential cookies,
                    we&apos;ll update this policy first and ask for your consent
                    where the law requires it. You can also block or delete
                    cookies at any time in your browser settings.
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
];

export default function PrivacyPage() {
    return (
        <main>
            <Navbar />
            <div style={{ paddingTop: '80px' }}>
                <LegalPage
                    eyebrow="Legal"
                    title="Privacy Policy"
                    lastUpdated="2026-09-26"
                    intro={
                        <p>
                            We respect the data you share with us. This page
                            explains what we collect, why, and the choices you
                            have — in plain English, not legalese.
                        </p>
                    }
                    sections={sections}
                    heroBackground={heroGradientFor('privacy')}
                />
            </div>
            <Footer />
        </main>
    );
}
