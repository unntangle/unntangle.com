import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogGrid from "@/components/BlogGrid";

export const metadata = {
    title: 'Blog | Unntangle',
    description: 'Insights and expert perspectives on Digital, AI, and Cloud engineering.',
};

export default function BlogPage() {
    return (
        <main>
            <Navbar />
            <div style={{ paddingTop: '80px' }}> {/* Space for fixed navbar */}
                <BlogGrid />
            </div>
            <Footer />
        </main>
    );
}
