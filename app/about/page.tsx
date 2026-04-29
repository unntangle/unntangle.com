import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Philosophy from "@/components/Philosophy";
import GroupedServices from "@/components/GroupedServices";
import Roadmap from "@/components/Roadmap";
import AboutProducts from "@/components/AboutProducts";
import Vision from "@/components/Vision";

export const metadata = {
    title: 'About | Unntangle',
    description: 'Engineers, designers, and strategists building deterministic digital systems.',
};

export default function AboutPage() {
    return (
        <main>
            <Navbar />
            <div style={{ paddingTop: '80px' }}>
                <PageHero
                    eyebrow="About Unntangle"
                    titleParts={[
                        'Innovation for ',
                        { accent: 'experiences' },
                        ' that ',
                        { accent: 'flow' },
                        '.',
                    ]}
                    description="We converge Digital, AI, Cloud, and Smart Living into a single, deterministic architecture — unntangling complexity across every layer of the modern landscape."
                    primaryCta={{ label: 'See what we do', href: '/services' }}
                    secondaryCta={{ label: "Let's talk", href: '/contact' }}
                    image="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1000"
                    images={[
                        'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1000',
                        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000',
                    ]}
                    imageAlt="The Unntangle team"
                    pills={[
                        { text: 'Engineering meets creative', variant: 'cyan', icon: true },
                    ]}
                    gradient="green-teal"
                    imageLayout="collage"
                />
            </div>
            <Philosophy />
            <GroupedServices />
            <AboutProducts />
            <Roadmap />
            <Vision />
            <Footer />
        </main>
    );
}
