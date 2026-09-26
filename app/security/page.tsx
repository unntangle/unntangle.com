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
    // Templated → "Security & Data | Unntangle Technologies"
    title: 'Security & Data',
    description:
        'How Unntangle handles business data in AI implementation projects: agreed access, minimum permissions, human approval, logging, AI model provider review, and return or deletion at the end.',
    alternates: { canonical: '/security' },
    openGraph: {
        title: 'Security & Data | Unntangle Technologies',
        description:
            'How we handle your data when we deploy AI inside your business.',
        url: `${SITE_URL}/security`,
        type: 'website',
    },
};

/**
 * /security — Security & Data page for IT and security reviewers.
 *
 * Describes practices, not certifications. It deliberately makes no claim
 * of ISO 27001, SOC 2 or similar; add those only once they are formally
 * held. Keep this page consistent with /privacy (Client Data section) and
 * with what project agreements actually say.
 */

const sections: ServiceSection[] = [
    {
        type: 'checklist',
        heading: 'Our',
        accent: 'Commitments',
        intro: 'The principles we apply to every AI implementation project.',
        items: [
            'Data access agreed in writing before production data is used',
            'Only the data a workflow needs, nothing more',
            'Credentials your team controls and can revoke',
            'Human approval for anything customer-facing',
            'Every AI action logged and reviewable',
            'Your data is never used for our marketing',
        ],
    },
    {
        type: 'timeline',
        heading: 'How Your Data Moves',
        accent: 'Through a Project',
        items: [
            { title: 'Scoping', text: 'During the assessment we identify which systems and data a workflow needs, and record it.' },
            { title: 'Agreement', text: 'Access, processing location, AI model providers and retention are set out in the project agreement.' },
            { title: 'Access Set Up', text: 'Integrations use dedicated, least-privilege credentials owned by your IT team.' },
            { title: 'Build and Test', text: 'Development uses sample or masked data wherever possible before any production data is connected.' },
            { title: 'Run With Oversight', text: 'Live workflows keep approval steps, escalation rules and a full action log.' },
            { title: 'Return or Delete', text: 'At the end of an engagement, data we hold is returned or deleted as agreed.' },
        ],
    },
    {
        type: 'bento',
        heading: 'Controls We',
        accent: 'Build In',
        items: [
            { icon: 'Lock', title: 'Access Control', text: 'Role-based access and least-privilege integration accounts.', wide: true },
            { icon: 'ShieldCheck', title: 'Encryption', text: 'Data encrypted in transit and at rest.' },
            { icon: 'Users', title: 'Approval Steps', text: 'People sign off on outputs that matter.' },
            { icon: 'FileText', title: 'Audit Logs', text: 'What the AI read, proposed and changed.' },
            { icon: 'Cpu', title: 'Model Provider Review', text: 'Which AI providers are used, and on what data terms, agreed with you in advance.' },
            { icon: 'Bell', title: 'Monitoring', text: 'Failures and unusual behaviour surfaced to a person, not hidden.', wide: true },
        ],
    },
    {
        type: 'chips',
        heading: 'Regulations We',
        accent: 'Design Around',
        intro: 'We build to the requirements that apply to your business and your customers.',
        groups: [
            { label: 'India', items: ['Digital Personal Data Protection Act 2023'] },
            { label: 'International', items: ['GDPR (EU & UK data subjects)'] },
            { label: 'Your Policies', items: ['Internal security policies', 'IT approval processes', 'Vendor assessments'] },
        ],
    },
    {
        type: 'checklist',
        heading: 'Questions Your IT Team',
        accent: 'Can Ask Us',
        intro: 'We\u2019re happy to answer these, in writing, before any project starts.',
        items: [
            'Which of our systems will the AI access?',
            'Where will our data be processed and stored?',
            'Which AI model providers are involved?',
            'Can those providers retain or train on our data?',
            'How do we revoke access?',
            'What happens to our data when the project ends?',
        ],
    },
];

export default function SecurityPage() {
    return (
        <main>
            <Navbar />
            <div style={{ paddingTop: '80px' }}>
                <PageHero
                    eyebrow="Security & Data"
                    titleParts={['Your Data Stays ', { accent: 'Under Your Control.' }]}
                    description="Deploying AI inside a business means working with real data. Here's how we handle it: agreed access, minimum permissions, people approving what matters, and a record of everything the AI does."
                    primaryCta={{ label: 'Talk to Us About Security', href: '/contact' }}
                    secondaryCta={{ label: 'Read our Privacy Policy', href: '/privacy' }}
                    image="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1200"
                    imageAlt="Server infrastructure"
                    imageLayout="circle"
                    pills={[
                        { text: 'Least-privilege access', variant: 'cyan', icon: true },
                        { text: 'Human approval', variant: 'dark' },
                    ]}
                    softBackground={heroGradientFor('security')}
                />
            </div>

            <section className={about.section}>
                <div className={`${about.container} ${about.center}`}>
                    <h2 className={about.h2}>
                        Security Is Part of the <span className={about.accent}>Design</span>
                    </h2>
                    <p className={about.body}>
                        We decide what data a workflow can reach, where it goes and who approves the
                        output before we build, not after. That&apos;s what lets your IT team say yes
                        with confidence, and it&apos;s why data questions are part of every AI
                        Workflow Assessment.
                    </p>
                    <div className={about.links}>
                        <Link href="/privacy#client-data" className={about.link}>
                            How we handle client data (Privacy Policy) <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>
            </section>

            <BlockSections sections={sections} />

            <ServicesCTA
                pageKey="security"
                title="Have a Security Review to Complete?"
                text="Send us your questionnaire or your IT team's questions. We'll answer them in writing before any project begins."
            />
            <Footer />
        </main>
    );
}
