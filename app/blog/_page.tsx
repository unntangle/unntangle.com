import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import BlogGrid from "@/components/BlogGrid";
import { blogsData } from "@/data/blogs";

const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://unntangle.com";

export const metadata: Metadata = {
    // Bare page name; template appends " | Unntangle". Renders as:
    // "Insights | Unntangle"
    title: "Insights",
    description:
        "Deep-dive perspectives from the engineers, designers, and growth strategists shaping how modern brands ship products, scale platforms, and capture demand.",
    alternates: { canonical: "/blog" },
    openGraph: {
        title: "Insights | Unntangle",
        description:
            "Deep-dive perspectives on Digital, AI, Cloud, design, and growth marketing.",
        url: `${SITE_URL}/blog`,
        type: "website",
        images: [
            {
                url: "/images/latest_blog.png",
                width: 1200,
                height: 630,
                alt: "Unntangle Insights",
            },
        ],
    },
};

// Blog as a CollectionPage with a sorted ItemList of all posts. Helps
// Google build the "more articles" sitelink pattern under the blog.
const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE_URL}/blog#blog`,
    url: `${SITE_URL}/blog`,
    name: "Unntangle Insights",
    description:
        "Deep-dive perspectives on Digital, AI, Cloud, design, and growth marketing.",
    publisher: { "@id": `${SITE_URL}/#organization` },
    isPartOf: { "@id": `${SITE_URL}/#website` },
    blogPost: blogsData.map((b) => ({
        "@type": "BlogPosting",
        headline: b.title,
        url: `${SITE_URL}/blog/${b.id}`,
        datePublished: b.date,
        author: { "@type": "Organization", name: b.author },
        image: b.image,
    })),
    breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            {
                "@type": "ListItem",
                position: 2,
                name: "Blog",
                item: `${SITE_URL}/blog`,
            },
        ],
    },
};

export default function BlogPage() {
    return (
        <main>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(blogJsonLd).replace(
                        /</g,
                        "\\u003c"
                    ),
                }}
            />
            <Navbar />
            <div style={{ paddingTop: '80px' }}>
                <PageHero
                    eyebrow="Unntangled Insights"
                    titleParts={[
                        'The frontier of ',
                        { accent: 'Digital, AI' },
                        ' & ',
                        { accent: 'Cloud' },
                        '.',
                    ]}
                    description="Deep-dive perspectives from the engineers, designers, and growth strategists shaping how modern brands ship products, scale platforms, and capture demand."
                    primaryCta={{ label: 'Read latest articles', href: '#latest' }}
                    secondaryCta={{ label: 'Talk to our team', href: '/contact' }}
                    image="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=1000"
                    imageAlt="Unntangle insights"
                    pills={[
                        { text: 'In an Unntangled world', variant: 'cyan' },
                        { text: 'ideas ship faster', variant: 'dark', icon: true },
                    ]}
                    gradient="purple-pink"
                />
                <div id="latest">
                    <BlogGrid />
                </div>
            </div>
            <Footer />
        </main>
    );
}
