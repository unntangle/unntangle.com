import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import BlogGrid from "@/components/BlogGrid";
import { heroGradientFor } from "@/components/pastelPalette";
import { publishedBlogs as blogsData } from "@/data/blogs";

const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://unntangle.com";

export const metadata: Metadata = {
    // Bare page name; template appends " | Unntangle Technologies". Renders as:
    // "Knowledge Hub | Unntangle Technologies"
    title: "Knowledge Hub",
    description:
        "Practical perspectives from the Unntangle team on AI implementation, automation, websites, apps and custom software.",
    alternates: { canonical: "/blog" },
    openGraph: {
        title: "Knowledge Hub | Unntangle Technologies",
        description:
            "Practical perspectives on AI implementation, automation, websites, apps and custom software.",
        url: `${SITE_URL}/blog`,
        type: "website",
        images: [
            {
                url: "/images/latest_blog.png",
                width: 1200,
                height: 630,
                alt: "Unntangle Knowledge Hub",
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
    name: "Unntangle Knowledge Hub",
    description:
        "Practical perspectives on AI implementation, automation, websites, apps and custom software.",
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
                name: "Knowledge Hub",
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
                    eyebrow="Knowledge Hub"
                    titleParts={[
                        'Practical Ideas on ',
                        { accent: 'AI' },
                        ' & ',
                        { accent: 'Software' },
                        '.',
                    ]}
                    description="Perspectives from our engineers and designers on putting AI to work inside businesses, and building the websites, apps and systems they run on."
                    primaryCta={{ label: 'Read latest articles', href: '#latest' }}
                    secondaryCta={{ label: 'Talk to our team', href: '/contact' }}
                    image="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=1000"
                    imageAlt="Unntangle Knowledge Hub"
                    pills={[
                        { text: 'In an Unntangled world', variant: 'cyan' },
                        { text: 'ideas ship faster', variant: 'dark', icon: true },
                    ]}
                    softBackground={heroGradientFor('blog')}
                />
                <div id="latest">
                    <BlogGrid />
                </div>
            </div>
            <Footer />
        </main>
    );
}
