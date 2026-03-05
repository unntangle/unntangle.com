'use client';

import { useState } from 'react';
import Navbar from "@/components/Navbar";
import ServicesHero from "@/components/ServicesHero";
import FeaturedServices from "@/components/FeaturedServices";
import MarketingCTA from "@/components/MarketingCTA";
import Footer from "@/components/Footer";

const categories = [
    { id: 'digital', name: 'Digital Solutions' },
    { id: 'ai', name: 'AI Solutions' },
    { id: 'cloud', name: 'Cloud Solutions' },
    { id: 'property', name: 'Property Solutions' },
];

export default function ServicesPage() {
    const [activeCategoryId, setActiveCategoryId] = useState('digital');

    return (
        <main>
            <Navbar />
            <ServicesHero
                activeCategoryId={activeCategoryId}
                onCategoryChange={setActiveCategoryId}
                categories={categories}
            />
            <FeaturedServices
                activeCategoryId={activeCategoryId}
                onCategoryChange={setActiveCategoryId}
                categories={categories}
            />
            <MarketingCTA />
            <Footer />
        </main>
    );
}
