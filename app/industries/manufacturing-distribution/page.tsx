import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { BlockSections } from '@/components/services/ServiceDetailContent';
import ServicesCTA from '@/components/services/ServicesCTA';
import type { ServiceSection } from '@/data/serviceLayouts';
import { heroGradientFor } from '@/components/pastelPalette';
import about from '@/components/about/About.module.css';

const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
    'https://unntangle.com';

export const metadata: Metadata = {
    // Templated → "AI for Manufacturing & Distribution | Unntangle Technologies"
    title: 'AI for Manufacturing & Distribution',
    description:
        'AI workflows for manufacturers and distributors: RFQs to quotations, order entry, collections, procurement and order-status queries, connected to the ERP and tools you already run.',
    alternates: { canonical: '/industries/manufacturing-distribution' },
    openGraph: {
        title: 'AI for Manufacturing & Distribution | Unntangle Technologies',
        description:
            'Deploy AI into the quoting, ordering, collections and procurement work that slows manufacturers and distributors down.',
        url: `${SITE_URL}/industries/manufacturing-distribution`,
        type: 'website',
    },
};

/**
 * /industries/manufacturing-distribution — first industry landing page,
 * for the beachhead market (mid-market B2B manufacturers and distributors).
 * Practical description only: no invented results, clients or statistics.
 */

const sections: ServiceSection[] = [
    {
        type: 'checklist',
        heading: 'Does This',
        accent: 'Sound Familiar?',
        intro: 'The same patterns show up in almost every manufacturing and distribution business we talk to.',
        items: [
            'RFQs pile up in inboxes waiting to be priced',
            'Quotes are built by copying from the ERP into Excel',
            'Purchase orders are re-typed from PDFs',
            'Collections depend on someone remembering to chase',
            'Vendor quotes are compared by hand',
            'Customers call or WhatsApp to ask "where\u2019s my order?"',
        ],
        aside: 'None of this needs a new ERP. It needs the work around your ERP to move faster.',
    },
    {
        type: 'bento',
        heading: 'Workflows We',
        accent: 'Deploy First',
        intro: 'High-volume, rule-driven work where AI prepares and your team approves.',
        items: [
            { icon: 'FileText', title: 'RFQ to Quotation', text: 'AI reads the RFQ, matches items to your catalogue, checks ERP pricing and drafts the quote for approval.', wide: true },
            { icon: 'ClipboardList', title: 'Order Entry', text: 'Purchase orders from email and PDFs turned into draft sales orders.' },
            { icon: 'Wallet', title: 'Collections', text: 'Overdue invoices flagged and reminders prepared in batches.' },
            { icon: 'ShoppingCart', title: 'Procurement', text: 'Supplier quotes compared line by line with a draft recommendation.' },
            { icon: 'MessagesSquare', title: 'Order-Status Queries', text: 'Routine "where\u2019s my order?" questions answered from your own systems.' },
            { icon: 'BarChart3', title: 'Management Reporting', text: 'Sales, stock and receivables pulled together into a regular briefing for owners and managers.', wide: true },
        ],
    },
    {
        type: 'flow',
        heading: 'RFQ to Quotation,',
        accent: 'Step by Step',
        intro: 'The workflow most manufacturers start with.',
        items: [
            { title: 'RFQ Arrives', text: 'By email, often with a PDF or spreadsheet attached.', actor: 'system' },
            { title: 'Items Matched', text: 'Customer descriptions mapped to your product codes.', actor: 'ai' },
            { title: 'Pricing Checked', text: 'Price lists, stock and past quotes pulled from your ERP.', actor: 'ai' },
            { title: 'Quote Drafted', text: 'In your template, with your terms.', actor: 'ai' },
            { title: 'Sales Approves', text: 'Reviewed, edited if needed, approved.', actor: 'human' },
            { title: 'Sent and Logged', text: 'Quote sent and your CRM updated.', actor: 'system' },
        ],
    },
    {
        type: 'chips',
        heading: 'Built Around the Systems',
        accent: 'You Already Run',
        intro: 'Connections are built for the systems in your business, not a fixed list.',
        groups: [
            { label: 'ERP & Accounting', items: ['Tally', 'Zoho', 'SAP Business One', 'Odoo', 'Custom ERPs'] },
            { label: 'Communication', items: ['Email', 'WhatsApp Business', 'Web forms'] },
            { label: 'Documents & Data', items: ['PDF purchase orders', 'Excel price lists', 'Google Sheets', 'SQL databases'] },
        ],
    },
    {
        type: 'compare',
        heading: 'Before and After',
        accent: 'an AI Workflow',
        left: 'Today',
        right: 'With an AI workflow',
        rows: [
            { left: 'Each RFQ read, priced and typed up by hand', right: 'A draft quote waiting for review' },
            { left: 'Orders re-keyed from PDFs', right: 'Draft orders created for a person to confirm' },
            { left: 'Reminders sent when someone remembers', right: 'Reminder batches prepared on schedule, approved in one go' },
            { left: 'Status calls interrupt the sales team', right: 'Routine status questions answered from your data' },
        ],
    },
    {
        type: 'tiers',
        heading: 'How to',
        accent: 'Get Started',
        items: [
            { name: 'AI Workflow Assessment', tag: 'Step 1', text: 'We map your quoting, ordering, collections and procurement work and score where AI fits.', points: ['A few sessions with your team', 'Prioritised opportunity list', 'Clear first-deployment plan'] },
            { name: 'First Workflow', tag: 'Step 2', text: 'One workflow deployed into your real systems with approval built in.', points: ['Usually RFQ to quotation', 'Run alongside your process first', 'Agreed success measures'] },
            { name: 'Expand', tag: 'Step 3', text: 'Reuse the same connections for the next workflow.', points: ['Faster each time', 'Department by department', 'Monthly review of results'] },
        ],
    },
];

export default function ManufacturingDistributionPage() {
    return (
        <main>
            <Navbar />
            <div style={{ paddingTop: '80px' }}>
                <PageHero
                    eyebrow="Industries · Manufacturing & Distribution"
                    titleParts={['AI for Manufacturers ', { accent: 'and Distributors.' }]}
                    description="Quotations, orders, collections and procurement move through inboxes, spreadsheets and your ERP every day. We deploy AI into that work, connected to the systems you already run, with your team approving what goes out."
                    primaryCta={{ label: 'Book an AI Workflow Assessment', href: '/contact' }}
                    secondaryCta={{ label: 'See the workflows', href: '#workflows' }}
                    image="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200"
                    imageAlt="An engineer reviewing production data on a tablet"
                    imageLayout="circle"
                    pills={[
                        { text: 'RFQs · Orders · Collections', variant: 'cyan', icon: true },
                        { text: 'Your ERP stays', variant: 'dark' },
                    ]}
                    softBackground={heroGradientFor('manufacturing-distribution')}
                />
            </div>

            <section className={about.section}>
                <div className={`${about.container} ${about.center}`}>
                    <h2 className={about.h2}>
                        Where Time Goes in a <span className={about.accent}>B2B Business</span>
                    </h2>
                    <p className={about.body}>
                        Manufacturers and distributors run on repeatable work: requests come in,
                        someone checks the ERP, prepares a document, gets it approved and updates
                        another system. It&apos;s exactly the kind of work AI can prepare, so your
                        team spends its time on customers, pricing decisions and exceptions.
                    </p>
                    <div className={about.links}>
                        <Link href="/ai-workflow-examples" className={about.link}>
                            See AI workflow examples by department <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>
            </section>

            <div id="workflows">
                <BlockSections sections={sections} />
            </div>

            <ServicesCTA
                pageKey="manufacturing-distribution"
                title="Start With the Workflow That Costs You Most"
                text="Tell us where quotes, orders or collections slow your team down. We'll help you decide whether AI should take it on, and what a first deployment would involve."
            />
            <Footer />
        </main>
    );
}
