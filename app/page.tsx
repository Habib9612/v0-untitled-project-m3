import HeroSection from "@/components/hero-section"
import FeaturesSection from "@/components/features-section"
import LogisticsShowcase from "@/components/logistics-showcase"
import StatsSection from "@/components/stats-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <LogisticsShowcase />
      <ContactSection />
      <Footer />
    </div>
  )
}

