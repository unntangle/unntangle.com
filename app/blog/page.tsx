import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import BlogGrid from "@/components/BlogGrid";

export const metadata = {
    title: 'Blog | Unntangle',
    description: 'Insights and expert perspectives on Digital, AI, and Cloud engineering.',
};

export default function BlogPage() {
    return (
        <main>
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
