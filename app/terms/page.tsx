import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LegalPage, { LegalSection } from '@/components/LegalPage';
import styles from '@/components/LegalPage.module.css';

const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
    'https://unntangle.com';

export const metadata: Metadata = {
    // Templated → "Terms of Use | Unntangle Technologies"
    title: 'Terms of Use',
    description:
        "The terms that govern your use of Unntangle Technologies's website and services.",
    alternates: { canonical: '/terms' },
    openGraph: {
        title: 'Terms of Use | Unntangle Technologies',
        description:
            "The terms that govern your use of Unntangle Technologies's website and services.",
        url: `${SITE_URL}/terms`,
        type: 'website',
    },
    robots: {
        index: true,
        follow: true,
    },
};

/**
 * /terms — Site Terms of Use
 *
 * Covers the marketing site (unntangle.com). Each SaaS product
 * has its own product-specific terms inside the product surface;
 * those govern in-product behaviour. This page handles:
 *   - General website usage
 *   - Intellectual property in our content
 *   - Acceptable conduct
 *   - Liability disclaimers
 *   - Governing law (Indian jurisdiction, Chennai)
 *
 * Not legal advice. Have a lawyer review before launching this in
 * production. The intent is to be substantively accurate and
 * honestly authored, not legally definitive.
 */

const sections: LegalSection[] = [
    {
        id: 'acceptance',
        heading: 'Acceptance of Terms',
        body: (
            <>
                <p>
                    By accessing or using <strong>unntangle.com</strong> (the
                    &quot;Site&quot;), you agree to these Terms. If you don&apos;t
                    agree, please don&apos;t use the Site.
                </p>
                <p>
                    These Terms apply to the website only. Assessments and
                    delivery projects (AI implementation, websites, apps and
                    custom software) are governed by the separate agreement or
                    statement of work for that engagement. Our AI products
                    (uVOIZ, and uDYLR and uSCRIBR when available) have their own
                    product terms, which apply on top of these.
                </p>
            </>
        ),
    },
    {
        id: 'about-unntangle',
        heading: 'About Unntangle Technologies',
        body: (
            <>
                <p>
                    Unntangle Technologies is a registered company in Chennai, India.
                    We are an AI implementation and deployment company: we help
                    businesses identify repetitive workflows and deploy AI into
                    their existing systems, and we build websites, apps and custom
                    software. We also develop our own AI products.
                </p>
                <p>
                    Throughout these Terms, &quot;we&quot;, &quot;us&quot;, and
                    &quot;our&quot; refer to Unntangle Technologies. &quot;You&quot; refers to
                    the person accessing the Site.
                </p>
            </>
        ),
    },
    {
        id: 'using-the-site',
        heading: 'Using the Site',
        body: (
            <>
                <p>You may use the Site to:</p>
                <ul>
                    <li>Read content about our services and products</li>
                    <li>
                        Request an AI Workflow Assessment, submit a project
                        enquiry, or contact us
                    </li>
                    <li>Click through to our AI products</li>
                    <li>Read articles in our Knowledge Hub</li>
                </ul>

                <p>You agree not to:</p>
                <ul>
                    <li>
                        Use the Site for any unlawful purpose, or to violate
                        anyone&apos;s rights
                    </li>
                    <li>
                        Attempt to gain unauthorised access to any part of the
                        Site, our servers, or related systems
                    </li>
                    <li>
                        Use any automated system (bots, scrapers, crawlers) to
                        access the Site in a way that places excessive load on
                        our infrastructure
                    </li>
                    <li>
                        Reverse-engineer, decompile, or attempt to extract
                        source code from any part of the Site
                    </li>
                    <li>
                        Submit false or misleading information through any form
                        on the Site
                    </li>
                    <li>
                        Upload or transmit malware, viruses, or any code
                        intended to disrupt the Site
                    </li>
                </ul>
            </>
        ),
    },
    {
        id: 'website-content',
        heading: 'Website Content Is General Information',
        body: (
            <>
                <p>
                    The workflow examples, illustrations and articles on this Site
                    describe the kinds of work we do. They are general information,
                    not a promise of specific results, timelines or prices for your
                    business, and not legal, financial or other professional advice.
                </p>
                <p>
                    Examples marked as illustrative are exactly that — they are not
                    client case studies. What a project will deliver, how long it
                    will take and what it will cost are agreed in writing for each
                    engagement.
                </p>
            </>
        ),
    },
    {
        id: 'submissions',
        heading: 'Information You Submit',
        body: (
            <>
                <p>
                    When you submit a form or attach a document on this Site, you
                    confirm that the information is accurate and that you have the
                    right to share it with us.
                </p>
                <p>
                    Please don&apos;t submit confidential or sensitive personal
                    data through the website. If an assessment or project needs
                    access to sensitive material, we&apos;ll agree how it is shared
                    and protected before you send it. How we handle what you send
                    us is described in our{' '}
                    <a href="/privacy">Privacy Policy</a>.
                </p>
            </>
        ),
    },
    {
        id: 'ai-products',
        heading: 'AI Products and Beta Features',
        body: (
            <>
                <p>
                    Some of our AI products are in beta or still in development and
                    are labelled as such on the Site. Beta products may change,
                    have limited availability, or be withdrawn, and their use is
                    governed by the product&apos;s own terms.
                </p>
                <p>
                    AI systems can make mistakes. Where our products or the
                    solutions we build produce outputs that affect customers,
                    money or contracts, they are designed to be reviewed by a
                    person before being relied on.
                </p>
            </>
        ),
    },
    {
        id: 'intellectual-property',
        heading: 'Intellectual Property',
        body: (
            <>
                <p>
                    Everything on this Site — text, graphics, logos, images,
                    code, design — is owned by Unntangle or licensed to us, and
                    is protected by Indian and international copyright and
                    trademark laws.
                </p>
                <p>
                    The names <strong>Unntangle</strong>, <strong>uVOIZ</strong>,{' '}
                    <strong>uDYLR</strong> and <strong>uSCRIBR</strong>, along
                    with their associated logos and wordmarks, are trademarks of
                    Unntangle. You may not use them without our written permission.
                </p>
                <p>
                    You may view, share, and quote our publicly-published
                    content (such as Knowledge Hub articles) for personal and
                    editorial purposes, with attribution. You may not republish
                    entire articles, copy our designs, or use our brand assets in
                    your own marketing without permission.
                </p>
            </>
        ),
    },
    {
        id: 'third-party-content',
        heading: 'Third-Party Links and Content',
        body: (
            <>
                <p>
                    The Site may link to third-party websites, products, or
                    services (for example, our SaaS products live at separate
                    subdomains, and our blog may link to external sources).
                </p>
                <p>
                    We don&apos;t control those third parties and aren&apos;t
                    responsible for their content, availability, or practices.
                    Following an external link is at your own discretion and
                    subject to that site&apos;s own terms.
                </p>
            </>
        ),
    },
    {
        id: 'no-warranty',
        heading: 'No Warranty',
        body: (
            <>
                <p>
                    The Site is provided on an &quot;as is&quot; and &quot;as
                    available&quot; basis. We work hard to keep it useful,
                    accurate, and up to date — but to the maximum extent
                    permitted by law, we make no warranties or representations
                    that:
                </p>
                <ul>
                    <li>The Site will be uninterrupted or error-free</li>
                    <li>
                        The information on the Site is complete, current, or
                        without typos
                    </li>
                    <li>
                        The Site or its servers are free of viruses or other
                        harmful components
                    </li>
                </ul>
                <p>
                    This doesn&apos;t affect any rights you have under
                    consumer-protection law that can&apos;t be waived.
                </p>
            </>
        ),
    },
    {
        id: 'limitation-of-liability',
        heading: 'Limitation of Liability',
        body: (
            <>
                <p>
                    To the maximum extent permitted by law, Unntangle is not
                    liable for any indirect, incidental, special, consequential,
                    or punitive damages arising from your use of the Site —
                    including lost profits, lost data, or business interruption,
                    even if we&apos;ve been advised of the possibility of such
                    damages.
                </p>
                <p>
                    Our total aggregate liability for any claim arising from your
                    use of the Site (excluding our AI products and client
                    engagements, which have their own contracts) is limited to
                    <strong> ₹10,000</strong> or the amount you paid us in the
                    twelve months before the claim, whichever is greater.
                </p>
            </>
        ),
    },
    {
        id: 'indemnification',
        heading: 'Indemnification',
        body: (
            <>
                <p>
                    You agree to indemnify and hold Unntangle harmless from any
                    claim, loss, or damage (including reasonable legal fees)
                    arising from:
                </p>
                <ul>
                    <li>Your use of the Site in breach of these Terms</li>
                    <li>Your violation of any law or third-party right</li>
                    <li>
                        Any content you submit through forms or other inputs on
                        the Site
                    </li>
                </ul>
            </>
        ),
    },
    {
        id: 'changes-to-terms',
        heading: 'Changes to These Terms',
        body: (
            <>
                <p>
                    We may update these Terms from time to time. When we do,
                    we&apos;ll change the &quot;Last updated&quot; date at the
                    top. Continued use of the Site after changes are posted
                    means you accept the updated Terms.
                </p>
                <p>
                    For substantive changes (e.g. new restrictions on use), we
                    may also display a notice on the Site for a reasonable
                    period.
                </p>
            </>
        ),
    },
    {
        id: 'governing-law',
        heading: 'Governing Law and Jurisdiction',
        body: (
            <>
                <p>
                    These Terms are governed by the laws of India. Any dispute
                    arising from or related to these Terms or your use of the
                    Site will be subject to the exclusive jurisdiction of the
                    courts of <strong>Chennai, Tamil Nadu, India</strong>.
                </p>
            </>
        ),
    },
    {
        id: 'contact',
        heading: 'Contact',
        body: (
            <>
                <p>Questions about these Terms? Get in touch:</p>
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
                        <a href="mailto:gokul@unntangle.com">
                            gokul@unntangle.com
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

export default function TermsPage() {
    return (
        <main>
            <Navbar />
            <div style={{ paddingTop: '80px' }}>
                <LegalPage
                    eyebrow="Legal"
                    title="Site Terms"
                    lastUpdated="2026-09-26"
                    intro={
                        <p>
                            These terms govern your use of unntangle.com.
                            We&apos;ve kept them as direct as the law allows —
                            no surprises, no fine print games.
                        </p>
                    }
                    sections={sections}
                />
            </div>
            <Footer />
        </main>
    );
}
