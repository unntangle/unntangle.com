import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactHero from "@/components/ContactHero";
import BrandBar from "@/components/BrandBar";
import FAQ from "@/components/FAQ";

export default function ContactPage() {
    return (
        <main>
            <Navbar />
            <ContactHero />
            <BrandBar />
            <FAQ />
            <Footer />
        </main>
    );
}
