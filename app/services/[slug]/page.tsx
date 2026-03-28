import { servicesData } from '@/data/services';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServiceDetailHero from '@/components/ServiceDetailHero';
import ServiceContent from '@/components/ServiceContent';
import MarketingCTA from '@/components/MarketingCTA';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    return servicesData.map((service) => ({
        slug: service.id,
    }));
}

type Params = Promise<{ slug: string }>;

export default async function ServicePage(props: { params: Params }) {
    const params = await props.params;
    const service = servicesData.find((s) => s.id === params.slug);

    if (!service) {
        notFound();
    }

    return (
        <main>
            <Navbar />
            <ServiceDetailHero service={service} />
            <ServiceContent service={service} />
            <MarketingCTA />
            <Footer />
        </main>
    );
}
