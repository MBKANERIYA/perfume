import HeroSlider from '../../components/landing/HeroSlider'
import OurCollectionSection from '../../components/landing/OurCollectionSection'
import BestsellerSection from '../../components/landing/BestsellerSection'
import RiskFreeSection from '../../components/landing/RiskFreeSection'
import FaqSection from '../../components/landing/FaqSection'
import StatsSection from '../../components/landing/StatsSection'

export default function Landing() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSlider />
      <OurCollectionSection />
      <BestsellerSection />
      <RiskFreeSection />
      <FaqSection />
      <StatsSection />
    </main>
  )
}
