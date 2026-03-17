import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductsContent from './ProductsContent';

export const metadata = {
    title: 'Products | Unntangle',
    description: 'Explore our upcoming brand innovations: uRYZE, uSYNQ, and uNEST.',
};

export default function ProductsPage() {
    return (
        <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#050505' }}>
            <Navbar />
            <ProductsContent />
            <Footer />
        </main>
    );
}
