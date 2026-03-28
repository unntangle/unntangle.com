'use client';

import { useState } from 'react';
import Navbar from "@/components/Navbar";
import ServicesHero from "@/components/ServicesHero";
import FeaturedServices from "@/components/FeaturedServices";
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
