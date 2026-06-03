import { SplashCursor } from '@/components/landing/splash-cursor'
import { Navigation } from '@/components/landing/navigation'
import { HeroSection } from '@/components/landing/hero-section'
import { InfrastructureSection } from '@/components/landing/infrastructure-section'
import { FeaturesSection } from '@/components/landing/features-section'
import { LoopVisual } from '@/components/landing/loop-visual'
import { HowItWorksSection } from '@/components/landing/how-it-works-section'
import { DevelopersSection } from '@/components/landing/developers-section'
import { BackedBySection } from '@/components/landing/backed-by-section'
import { IntegrationsSection } from '@/components/landing/integrations-section'
import { CtaSection } from '@/components/landing/cta-section'
import { FooterSection } from '@/components/landing/footer-section'

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay bg-background">
      <SplashCursor SPLAT_RADIUS={0.08} DENSITY_DISSIPATION={5} />
      <Navigation />
      <HeroSection />
      <InfrastructureSection />
      <FeaturesSection />
      <LoopVisual />
      <HowItWorksSection />
      <DevelopersSection />
      <BackedBySection />
      <IntegrationsSection />
      <CtaSection />
      <FooterSection />
    </main>
  )
}
