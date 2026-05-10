import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactHero from "@/components/ContactHero";
import FAQ from "@/components/FAQ";

// `BrandBar` (the "CLIENTS TRUST US" logo strip) is hidden
// because the placeholder logos (Google, KFC, Deloitte, BCG,
// Clutch) weren't real client engagements. Re-import and slot
// it back in once we have legitimate clients with logo permission.

export default function ContactPage() {
    return (
        <main>
            <Navbar />
            <ContactHero />
            <FAQ />
            <Footer />
        </main>
    );
}
