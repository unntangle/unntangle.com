import ProductShop from '@/components/Products/ProductShop';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
    title: 'uRYZE Elevators | Unntangle Shop',
    description: 'Premium elevator solutions for residential and commercial spaces.',
};

export default function UryzeShopPage() {
    return (
        <main>
            <Navbar />
            <ProductShop forcedBrand="uryze" />
            <Footer />
        </main>
    );
}
