import type { Metadata } from "next";
import { blogsData } from '@/data/blogs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, Send } from 'lucide-react';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';

const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://unntangle.com";

export async function generateStaticParams() {
    return blogsData.map((blog) => ({
        slug: blog.id,
    }));
}

type Params = Promise<{ slug: string }>;

// Per-post metadata. Critical for blog SEO — rich previews on social,
// canonical URL per post, and unique title/description per slug.
export async function generateMetadata(props: {
    params: Params;
}): Promise<Metadata> {
    const params = await props.params;
    const blog = blogsData.find((b) => b.id === params.slug);
    if (!blog) {
        return {
            // Templated → "Article Not Found | Unntangle"
            title: "Article Not Found",
            description: "The requested article could not be found.",
        };
    }

    const url = `${SITE_URL}/blog/${blog.id}`;
    const publishedISO = (() => {
        const d = new Date(blog.date);
        return Number.isNaN(d.getTime()) ? undefined : d.toISOString();
    })();

    return {
        // Bare post title; template appends " | Unntangle".
        // e.g. "Edge Rendering Is the New Default" →
        //      "Edge Rendering Is the New Default | Unntangle"
        title: blog.title,
        description: blog.description,
        authors: [{ name: blog.author }],
        category: blog.category,
        alternates: { canonical: `/blog/${blog.id}` },
        openGraph: {
            // Explicit brand suffix here since OG titles are absolute (the
            // template doesn't apply to OG fields).
            title: `${blog.title} | Unntangle`,
            description: blog.description,
            url,
            type: "article",
            publishedTime: publishedISO,
            authors: [blog.author],
            tags: [blog.category],
            images: [
                {
                    url: blog.image,
                    width: 1200,
                    height: 630,
                    alt: blog.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: `${blog.title} | Unntangle`,
            description: blog.description,
            images: [blog.image],
        },
    };
}

export default async function BlogDetailPage(props: { params: Params }) {
    const params = await props.params;
    const blog = blogsData.find((b) => b.id === params.slug);

    if (!blog) {
        notFound();
    }

    const url = `${SITE_URL}/blog/${blog.id}`;
    const publishedISO = (() => {
        const d = new Date(blog.date);
        return Number.isNaN(d.getTime()) ? blog.date : d.toISOString();
    })();

    // Article schema → enables Google to feature the post in Top Stories /
    // Discover, with byline, image, and date. mainEntityOfPage anchors it
    // back to the canonical URL.
    const articleJsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "@id": `${url}#blogposting`,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        headline: blog.title,
        description: blog.description,
        image: [blog.image],
        datePublished: publishedISO,
        dateModified: publishedISO,
        author: {
            "@type": "Organization",
            name: blog.author,
            url: SITE_URL,
        },
        publisher: { "@id": `${SITE_URL}/#organization` },
        articleSection: blog.category,
        url,
        wordCount: blog.content.split(/\s+/).filter(Boolean).length,
    };

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            {
                "@type": "ListItem",
                position: 2,
                name: "Blog",
                item: `${SITE_URL}/blog`,
            },
            {
                "@type": "ListItem",
                position: 3,
                name: blog.title,
                item: url,
            },
        ],
    };

    return (
        <main style={{ backgroundColor: '#fff', color: '#111' }}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(articleJsonLd).replace(
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
            <Navbar />
            
            <article style={{ paddingTop: '120px', paddingBottom: '80px', minHeight: '100vh' }}>
                <div className="blog-layout" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', gap: '80px', alignItems: 'flex-start' }}>
                    
                    {/* LEFT SIDEBAR: Sticky Vertical Form */}
                    <aside className="blog-sidebar" style={{ width: '320px', flexShrink: 0, position: 'sticky', top: '120px' }}>
                        <div style={{
                            background: '#f8f9fa',
                            border: '1px solid #eaeaea',
                            borderRadius: '24px',
                            padding: '32px 24px',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
                        }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px', color: '#111' }}>Have a problem to solve?</h3>
                            <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '24px', lineHeight: 1.5 }}>
                                Let our engineers architect a deterministic solution for you.
                            </p>

                            <form className="sidebar-form" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div className="form-group">
                                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: '#444', marginBottom: '6px', letterSpacing: '0.05em' }}>Name</label>
                                    <input type="text" placeholder="John Doe" required style={{
                                        width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #d1d5db', background: '#fff', fontSize: '0.9rem', outline: 'none', transition: 'all 0.2s'
                                    }} />
                                </div>
                                <div className="form-group">
                                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: '#444', marginBottom: '6px', letterSpacing: '0.05em' }}>Work Email</label>
                                    <input type="email" placeholder="john@company.com" required style={{
                                        width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #d1d5db', background: '#fff', fontSize: '0.9rem', outline: 'none', transition: 'all 0.2s'
                                    }} />
                                </div>
                                <div className="form-group">
                                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: '#444', marginBottom: '6px', letterSpacing: '0.05em' }}>Message</label>
                                    <textarea rows={4} placeholder="Tell us about your project..." required style={{
                                        width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #d1d5db', background: '#fff', fontSize: '0.9rem', outline: 'none', transition: 'all 0.2s', resize: 'vertical'
                                    }}></textarea>
                                </div>
                                <button type="submit" style={{
                                    marginTop: '8px', width: '100%', background: '#111', color: '#fff', border: 'none', borderRadius: '12px', padding: '16px', fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'background 0.2s'
                                }}>
                                    Send Inquiry <Send size={16} />
                                </button>
                            </form>
                        </div>
                    </aside>

                    {/* RIGHT MAIN CONTENT */}
                    <div className="blog-main" style={{ flex: 1, maxWidth: '800px', width: '100%' }}>
                        <Link href="/blog" style={{ 
                            display: 'inline-flex', 
                            alignItems: 'center', 
                            gap: '8px', 
                            textDecoration: 'none', 
                            color: '#666',
                            fontSize: '0.9rem',
                            fontWeight: 500,
                            marginBottom: '32px',
                            transition: 'color 0.2s ease'
                        }}>
                            <ArrowLeft size={16} />
                            Back to Insights
                        </Link>

                        <span style={{
                            display: 'inline-block',
                            background: '#f1f3f6',
                            color: '#111',
                            padding: '6px 14px',
                            borderRadius: '999px',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            marginBottom: '20px'
                        }}>
                            {blog.category}
                        </span>

                        <h1 style={{ 
                            fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', 
                            fontWeight: 700, 
                            lineHeight: 1.1,
                            letterSpacing: '-0.03em',
                            marginBottom: '24px',
                            color: '#111827'
                        }}>
                            {blog.title}
                        </h1>

                        <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '24px',
                            paddingBottom: '32px',
                            borderBottom: '1px solid #eaeaea',
                            marginBottom: '40px',
                            color: '#6b7280',
                            fontSize: '0.95rem',
                            flexWrap: 'wrap'
                        }}>
                            <span><strong>{blog.author}</strong></span>
                            <span>{blog.date}</span>
                            <span>{blog.readTime}</span>
                        </div>

                        <div style={{ 
                            position: 'relative', 
                            width: '100%', 
                            height: '400px',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            marginBottom: '40px'
                        }}>
                            <Image 
                                src={blog.image} 
                                alt={blog.title} 
                                fill 
                                style={{ objectFit: 'cover' }}
                                priority
                            />
                        </div>

                        <div className="blog-content" style={{
                            fontSize: '1.15rem',
                            lineHeight: 1.8,
                            color: '#374151'
                        }}>
                            <MDXRemote source={blog.content} />
                        </div>

                        {/* Related Service CTA */}
                        <div style={{
                            marginTop: '64px',
                            padding: '32px',
                            background: '#f8f9fa',
                            border: '1px solid #eaeaea',
                            borderRadius: '20px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: '24px',
                            flexWrap: 'wrap'
                        }}>
                            <div>
                                <p style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '6px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    Related Service
                                </p>
                                <p style={{ fontSize: '1.15rem', color: '#111', fontWeight: 600 }}>
                                    Explore how we deliver {blog.title.split(':')[0]}
                                </p>
                            </div>
                            <Link href={`/services/${blog.serviceId}`} style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                background: '#111',
                                color: '#fff',
                                padding: '14px 24px',
                                borderRadius: '12px',
                                fontSize: '0.95rem',
                                fontWeight: 600,
                                textDecoration: 'none',
                                whiteSpace: 'nowrap'
                            }}>
                                View Service →
                            </Link>
                        </div>
                    </div>

                </div>
            </article>

            {/* Scoped CSS for responsiveness and MDX styling */}
            <style>{`
                .blog-content h1 { font-size: 2rem; margin: 2.5rem 0 1rem; color: #111; letter-spacing: -0.02em; }
                .blog-content h2 { font-size: 1.5rem; margin: 2rem 0 1rem; color: #111; letter-spacing: -0.01em; border-bottom: 2px solid #f3f4f6; padding-bottom: 8px;}
                .blog-content p { margin-bottom: 1.5rem; }
                
                .sidebar-form input:focus, .sidebar-form textarea:focus {
                    border-color: #111 !important;
                    box-shadow: 0 0 0 2px rgba(17,17,17,0.1) !important;
                }

                @media (max-width: 992px) {
                    .blog-layout {
                        flex-direction: column-reverse;
                        gap: 60px !important;
                    }
                    .blog-sidebar {
                        width: 100% !important;
                        position: static !important;
                        max-width: 600px;
                        margin: 0 auto;
                    }
                }
            `}</style>
            
            <Footer />
        </main>
    );
}
