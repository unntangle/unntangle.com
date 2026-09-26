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
    { id: 'ai', name: 'AI Implementation' },
    { id: 'web', name: 'Websites & Apps' },
    { id: 'software', name: 'Custom Software & ERP' },
];

export default function ServicesPage() {
    const [activeCategoryId, setActiveCategoryId] = useState('ai');

    return (
        <main>
            <Navbar />
            <div style={{ paddingTop: '80px' }}>
                <PageHero
                    eyebrow="Services"
                    titleParts={[
                        'AI Implementation.',
                        ' ',
                        { accent: 'Websites, Apps & Software.' },
                    ]}
                    description="We deploy AI into real business workflows, and we build the websites, apps and custom software businesses run on. One team for both — so the AI and the systems it depends on are built to work together."
                    primaryCta={{ label: 'Book an AI Workflow Assessment', href: '/contact' }}
                    secondaryCta={{ label: 'How We Deploy', href: '/#how-we-deploy' }}
                    image="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1000"
                    images={[
                        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
                        'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800',
                        'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800',
                        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
                    ]}
                    imageAlt="Unntangle AI Solutions"
                    pills={[
                        { text: 'AI · Websites · Apps · Custom Software — one team', variant: 'cyan', icon: true },
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
