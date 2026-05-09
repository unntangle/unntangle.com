import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import UsynqShowcase from '@/components/UsynqShowcase';

export const metadata = {
    title: 'uSYNQ Smart Living | Products',
    description:
        'Explore the complete uSYNQ smart home collection: TITAN switch panels, Velux & Luxeray touch switches, ZigBee retrofit modules, and biometric & face-recognition smart door locks.',
};

export default function UsynqProductsPage() {
    return (
        <main style={{ backgroundColor: '#fafafa', minHeight: '100vh' }}>
            <Navbar />
            <UsynqShowcase />
            <Footer />
        </main>
    );
}
