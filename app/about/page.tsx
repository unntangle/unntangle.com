import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutHero from "@/components/AboutHero";
import Philosophy from "@/components/Philosophy";
import GroupedServices from "@/components/GroupedServices";
import Roadmap from "@/components/Roadmap";
import Vision from "@/components/Vision";

export default function AboutPage() {
    return (
        <main>
            <Navbar />
            <AboutHero />
            <Philosophy />
            <GroupedServices />
            <Roadmap />
            <Vision />
            <Footer />
        </main>
    );
}
