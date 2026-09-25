'use client';

import { useState } from 'react';
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import FeaturedServices from "@/components/FeaturedServices";
import ServiceTechStack from "@/components/ServiceTechStack";
import WhyChooseUs from "@/components/WhyChooseUs";
import OurProcess from "@/components/OurProcess";
import MarketingCTA from "@/components/MarketingCTA";
import Footer from "@/components/Footer";

const categories = [
    { id: 'ai-agents', name: 'AI Agents & Automation' },
    { id: 'tech', name: 'Technology' },
    { id: 'growth', name: 'AI-Powered Growth' },
];

export default function ServicesPage() {
    const [activeCategoryId, setActiveCategoryId] = useState('ai-agents');

    return (
        <main>
            <Navbar />
            <div style={{ paddingTop: '80px' }}>
                <PageHero
                    eyebrow="What we do"
                    titleParts={[
                        'AI Agents.',
                        ' ',
                        { accent: 'Enterprise Automation.' },
                        ' Real Outcomes.',
                    ]}
                    description="Intelligent AI agents connected to your existing systems — automating workflows across sales, finance, operations, procurement and customer service. Backed by the technology that makes AI work."
                    primaryCta={{ label: 'Book an AI Workflow Assessment', href: '/contact' }}
                    secondaryCta={{ label: 'Contact us', href: '/contact' }}
                    image="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1000"
                    images={[
                        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
                        'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800',
                        'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800',
                        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
                    ]}
                    imageAlt="Unntangle AI Solutions"
                    pills={[
                        { text: 'AI Agents · Automation · Technology — in one team', variant: 'cyan', icon: true },
                    ]}
                    gradient="orange-pink"
                    imageLayout="diamond-grid"
                />
            </div>
            <div id="services">
                <FeaturedServices
                    activeCategoryId={activeCategoryId}
                    onCategoryChange={setActiveCategoryId}
                    categories={categories}
                />
            </div>
            <ServiceTechStack />
            <WhyChooseUs />
            <OurProcess />
            <MarketingCTA />
            <Footer />
        </main>
    );
}
