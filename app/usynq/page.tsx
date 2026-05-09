import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import UsynqHero from '@/components/UsynqHero';
import UsynqBrand from '@/components/UsynqBrand';

export const metadata = {
    title: 'uSYNQ | Smart Living by Unntangle',
    description:
        'uSYNQ is Unntangle’s smart living brand. Premium ZigBee switch panels, touch switches, retrofit modules, and biometric smart locks engineered as one ecosystem.',
};

export default function UsynqBrandPage() {
    return (
        <main>
            <Navbar />
            <div style={{ paddingTop: '80px' }}>
                <UsynqHero />
            </div>
            <UsynqBrand />
            <Footer />
        </main>
    );
}
