import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LegalPage, { LegalSection } from '@/components/LegalPage';
import styles from '@/components/LegalPage.module.css';

const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
    'https://unntangle.com';

export const metadata: Metadata = {
    // Templated → "Terms of Use | Unntangle"
    title: 'Terms of Use',
    description:
        "The terms that govern your use of Unntangle's website and services.",
    alternates: { canonical: '/terms' },
    openGraph: {
        title: 'Terms of Use | Unntangle',
        description:
            "The terms that govern your use of Unntangle's website and services.",
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
                    These Terms apply to the marketing website only. If you sign
                    up for one of our SaaS products (uVOIZ, uDYLR, uSCRIBR), or
                    purchase uSYNQ smart-living hardware, separate product or
                    purchase terms will apply on top of these.
                </p>
            </>
        ),
    },
    {
        id: 'about-unntangle',
        heading: 'About Unntangle',
        body: (
            <>
                <p>
                    Unntangle is a registered company in Chennai, India. We
                    operate as a full-stack technology and digital company
                    delivering services in technology, creative design, growth
                    marketing, and smart-living hardware.
                </p>
                <p>
                    Throughout these Terms, &quot;we&quot;, &quot;us&quot;, and
                    &quot;our&quot; refer to Unntangle. &quot;You&quot; refers to
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
                    <li>Submit project enquiries or contact us</li>
                    <li>
                        Click through to our SaaS products or uSYNQ brand pages
                    </li>
                    <li>Read our blog and other publicly-available content</li>
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
                    <strong>uDYLR</strong>, <strong>uSCRIBR</strong>, and{' '}
                    <strong>uSYNQ</strong>, along with their associated logos
                    and wordmarks, are trademarks of Unntangle. You may not use
                    them without our written permission.
                </p>
                <p>
                    You may view, share, and quote our publicly-published
                    content (blog posts, case studies once available) for
                    personal and editorial purposes, with attribution. You may
                    not republish entire articles, copy our designs, or use our
                    brand assets in your own marketing without permission.
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
                    use of the Site (excluding our SaaS products and hardware
                    purchases, which have their own contracts) is limited to
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
                        <a href="mailto:legal@unntangle.com">
                            legal@unntangle.com
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
                    lastUpdated="2026-05-10"
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
