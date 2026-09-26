import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import HomeAgentsTabs from '@/components/home/HomeAgentsTabs';
import WorkflowCatalog from '@/components/workflows/WorkflowCatalog';
import HomeWorkflowDemo from '@/components/home/HomeWorkflowDemo';
import HomeExamples from '@/components/home/HomeExamples';
import ServicesCTA from '@/components/services/ServicesCTA';
import { heroGradientFor } from '@/components/pastelPalette';

const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
    'https://unntangle.com';

export const metadata: Metadata = {
    // Templated → "AI Workflow Examples | Unntangle Technologies"
    title: 'AI Workflow Examples',
    description:
        'Examples of AI workflows Unntangle deploys across sales, finance, procurement, operations, customer service and management reporting, with your team in control.',
    alternates: { canonical: '/ai-workflow-examples' },
    openGraph: {
        title: 'AI Workflow Examples | Unntangle Technologies',
        description:
            'AI workers for real business work: what AI handles, where your team stays in control, and the systems it connects to.',
        url: `${SITE_URL}/ai-workflow-examples`,
        type: 'website',
    },
};

/**
 * /ai-workflow-examples — standalone page for the AI workflows linked
 * from the navbar (Services → AI Workflow Examples) and from the home
 * page's AI workers and workflow-examples sections.
 *
 *   Hero → AI workers tabs → department-by-department breakdown →
 *   step-by-step RFQ walkthrough (dark) → examples carousel → CTA
 */
export default function AIWorkflowExamplesPage() {
    return (
        <main>
            <Navbar />
            <div style={{ paddingTop: '80px' }}>
                <PageHero
                    eyebrow="AI Workflow Examples"
                    titleParts={['AI Workers for ', { accent: 'Real Business Work.' }]}
                    description="Not chatbots. AI agents and workflows that read documents, pull data from your systems and prepare real work across sales, finance, procurement, operations and customer service, with your team approving where it matters."
                    primaryCta={{ label: 'Book an AI Workflow Assessment', href: '/contact' }}
                    secondaryCta={{ label: 'See by department', href: '#by-department' }}
                    image="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1200"
                    imageAlt="A team reviewing an AI-prepared workflow"
                    imageLayout="circle"
                    pills={[
                        { text: 'Prepared by AI', variant: 'cyan', icon: true },
                        { text: 'Approved by your team', variant: 'dark' },
                    ]}
                    softBackground={heroGradientFor('ai-workflow-examples')}
                />
            </div>
            <HomeAgentsTabs seeHowHref="#by-department" />
            <WorkflowCatalog />
            <HomeWorkflowDemo />
            <HomeExamples learnMoreHref="/services/ai-agents" />
            <ServicesCTA
                pageKey="ai-workflow-examples"
                title="Which Workflow Would You Start With?"
                text="Tell us about the work that's taking your team the most time. We'll help you decide whether AI should take it on, and what a first deployment would look like."
            />
            <Footer />
        </main>
    );
}
