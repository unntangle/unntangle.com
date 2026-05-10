import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutStatsHero from "@/components/AboutStatsHero";
import Philosophy from "@/components/Philosophy";
import OurJourney from "@/components/OurJourney";
import OwnResponsibilities from "@/components/OwnResponsibilities";
import GroupedServices from "@/components/GroupedServices";
import DualSpotlight from "@/components/DualSpotlight";
import AboutProducts from "@/components/AboutProducts";
import BeyondWordmark from "@/components/BeyondWordmark";
import Roadmap from "@/components/Roadmap";
import Vision from "@/components/Vision";

export const metadata = {
    title: 'About | Unntangle',
    description:
        'Unntangle is a full-stack technology and digital company building products, platforms, and brands behind ambitious businesses across India and beyond.',
};

/**
 * About page composition
 *
 * Section order is the narrative arc:
 *   1. AboutStatsHero      — bold stat-led intro brick
 *   2. Philosophy          — the company's worldview
 *   3. OurJourney          — interactive timeline (2023 → present)
 *   4. OwnResponsibilities — accountability principles
 *   5. GroupedServices     — what we do (services overview)
 *   6. DualSpotlight       — twin AI / Smart Living feature cards
 *   7. AboutProducts       — product portfolio detail
 *   8. BeyondWordmark      — typographic transition / vision pivot
 *   9. Roadmap             — what's coming next
 *  10. Vision              — long-term vision close
 *
 * Hero, Journey and Wordmark are the "company story" beats; the
 * others are proof points and product context layered around them.
 */

export default function AboutPage() {
    return (
        <main>
            <Navbar />
            <div style={{ paddingTop: '80px' }}>
                <AboutStatsHero />
            </div>
            <Philosophy />
            <OurJourney />
            <OwnResponsibilities />
            <GroupedServices />
            <DualSpotlight />
            <AboutProducts />
            <BeyondWordmark />
            <Roadmap />
            <Vision />
            <Footer />
        </main>
    );
}
