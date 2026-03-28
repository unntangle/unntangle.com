import { blogsData } from '@/data/blogs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, Send } from 'lucide-react';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';

export async function generateStaticParams() {
    return blogsData.map((blog) => ({
        slug: blog.id,
    }));
}

type Params = Promise<{ slug: string }>;

export default async function BlogDetailPage(props: { params: Params }) {
    const params = await props.params;
    const blog = blogsData.find((b) => b.id === params.slug);

    if (!blog) {
        notFound();
    }

    return (
        <main style={{ backgroundColor: '#fff', color: '#111' }}>
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
