import type { Metadata } from "next";
import { servicesData } from '@/data/services';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServiceDetailHero from '@/components/ServiceDetailHero';
import ServiceContent from '@/components/ServiceContent';
import ServiceDeliverables from '@/components/ServiceDeliverables';
import ServiceUseCases from '@/components/ServiceUseCases';
import ServiceStack from '@/components/ServiceStack';
import ServiceStats from '@/components/ServiceStats';
import ServiceFAQ from '@/components/ServiceFAQ';
import MarketingCTA from '@/components/MarketingCTA';
import { notFound } from 'next/navigation';

const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://unntangle.com";

export async function generateStaticParams() {
    return servicesData.map((service) => ({
        slug: service.id,
    }));
}

type Params = Promise<{ slug: string }>;

// Per-service metadata. Title is `${service.title} | Unntangle` via the
// layout template, but we explicitly set it for clarity. Description uses
// the curated `shortDescription` from the data file — already keyword-rich
// and 140-160 chars, ideal for SERP snippets.
export async function generateMetadata(props: {
    params: Params;
}): Promise<Metadata> {
    const params = await props.params;
    const service = servicesData.find((s) => s.id === params.slug);
    if (!service) {
        return {
            // Templated → "Service Not Found | Unntangle"
            title: "Service Not Found",
            description: "The requested service could not be found.",
        };
    }

    const url = `${SITE_URL}/services/${service.id}`;
    const description = service.shortDescription;
    const ogImage = service.heroImage;

    return {
        // Bare service title; template appends " | Unntangle".
        // e.g. "Web Development" → "Web Development | Unntangle"
        title: service.title,
        description,
        alternates: { canonical: `/services/${service.id}` },
        openGraph: {
            title: `${service.title} | Unntangle`,
            description,
            url,
            type: "article",
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: service.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: `${service.title} | Unntangle`,
            description,
            images: [ogImage],
        },
    };
}

export default async function ServicePage(props: { params: Params }) {
    const params = await props.params;
    const service = servicesData.find((s) => s.id === params.slug);

    if (!service) {
        notFound();
    }

    const url = `${SITE_URL}/services/${service.id}`;

    // Service schema + breadcrumb. Surfaces this as a recognized Service
    // entity with its parent provider (Organization), and gives Google
    // the breadcrumb trail it shows in mobile SERPs.
    const serviceJsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${url}#service`,
        name: service.title,
        description: service.overview,
        url,
        image: service.heroImage,
        serviceType: service.title,
        category: service.categoryLabel,
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: ["IN", "AE", "US", "GB"],
        hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: `${service.title} Features`,
            itemListElement: service.features.map((f, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: f.title,
                description: f.description,
            })),
        },
    };

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            {
                "@type": "ListItem",
                position: 2,
                name: "Services",
                item: `${SITE_URL}/services`,
            },
            {
                "@type": "ListItem",
                position: 3,
                name: service.title,
                item: url,
            },
        ],
    };

    // FAQPage JSON-LD — only emit when the service has its own FAQ block
    // (currently the 5 technology solutions). Surfaces these Q&As as
    // Google rich results, dramatically expanding our SERP real estate
    // for service-specific queries.
    const faqJsonLd = service.faqs && service.faqs.length > 0
        ? {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: service.faqs.map((f) => ({
                "@type": "Question",
                name: f.question,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: f.answer,
                },
            })),
        }
        : null;

    return (
        <main>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(serviceJsonLd).replace(
                        /</g,
                        "\\u003c"
                    ),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbJsonLd).replace(
                        /</g,
                        "\\u003c"
                    ),
                }}
            />
            {faqJsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(faqJsonLd).replace(
                            /</g,
                            "\\u003c"
                        ),
                    }}
                />
            )}
            <Navbar />
            <ServiceDetailHero service={service} />
            <ServiceContent service={service} />
            {service.deliverables && service.deliverables.length > 0 && (
                <ServiceDeliverables deliverables={service.deliverables} />
            )}
            {service.useCases && service.useCases.length > 0 && (
                <ServiceUseCases useCases={service.useCases} />
            )}
            {service.techStack && service.techStack.length > 0 && (
                <ServiceStack
                    serviceTitle={service.title}
                    techStack={service.techStack}
                />
            )}
            {service.stats && service.stats.length > 0 && (
                <ServiceStats stats={service.stats} />
            )}
            {service.faqs && service.faqs.length > 0 && (
                <ServiceFAQ faqs={service.faqs} serviceTitle={service.title} />
            )}
            <MarketingCTA />
            <Footer />
        </main>
    );
}
