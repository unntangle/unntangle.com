import ProductShop from '@/components/Products/ProductShop';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
    title: 'uSYNQ Smart Home | Unntangle Shop',
    description: 'Intelligent automation devices for a smarter ecosystem.',
};

export default function UsynqShopPage() {
    return (
        <main>
            <Navbar />
            <ProductShop forcedBrand="usynq" />
            <Footer />
        </main>
    );
}
