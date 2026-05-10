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
    { id: 'tech', name: 'Technology Solutions' },
    { id: 'design', name: 'Creative Design' },
    { id: 'marketing', name: 'Growth Marketing' },
];

export default function ServicesPage() {
    const [activeCategoryId, setActiveCategoryId] = useState('tech');

    return (
        <main>
            <Navbar />
            <div style={{ paddingTop: '80px' }}>
                <PageHero
                    eyebrow="What we do"
                    titleParts={[
                        'Three disciplines.',
                        ' ',
                        { accent: 'Twelve services' },
                        '. One team.',
                    ]}
                    description="Technology, creative design, and growth marketing — plus smart-living hardware. Every service ships from one accountable studio, not three vendors."
                    primaryCta={{ label: 'Explore services', href: '#services' }}
                    secondaryCta={{ label: 'Start a project', href: '/contact' }}
                    image="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1000"
                    images={[
                        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
                        'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800',
                        'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800',
                        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
                    ]}
                    imageAlt="What we do at Unntangle"
                    pills={[
                        { text: 'Tech · Design · Growth — in one stack', variant: 'cyan', icon: true },
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
