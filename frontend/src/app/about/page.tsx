
import AboutHero from "@/components/about/AboutHero";
import WhoWeAre from "@/components/about/WhoWeAre";
import JourneyTimeline from "@/components/about/JourneyTimeline";
import MissionVision from "@/components/about/MissionVision";
import Certifications from "@/components/about/Certifications";
import StatsBanner from "@/components/about/StatsBanner";
import FounderSection from "@/components/about/FounderSection";
import TeamSection from "@/components/about/TeamSection";
import CTASection from "@/components/about/CTASection";

export default function AboutPage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#F8FAF5]">
      <AboutHero />

      <WhoWeAre />

      <JourneyTimeline />

      <MissionVision />

      <Certifications />

      <StatsBanner />

      <FounderSection />

      <TeamSection />

      <CTASection />
    </main>
  );
}

