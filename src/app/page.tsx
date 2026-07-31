import { FAQ } from '@/components/landing/FAQ';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { HeroSection } from '@/components/landing/HeroSection';
import { PropertyShowcase } from '@/components/landing/PropertyShowcase';
import { Testimonials } from '@/components/landing/Testimonials';
import { WhyChooseUs } from '@/components/landing/WhyChooseUs';

export default function Home() {
  return (
    <div className="bg-background text-foreground">
      <HeroSection />
      <PropertyShowcase />
      <FeaturesSection />
      <WhyChooseUs />
      <Testimonials />
      <FAQ />
    </div>
  );
}
