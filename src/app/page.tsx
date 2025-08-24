import HeroSection from '@/components/HeroSection';
import IronySection from '@/components/IronySection';
import ThreeStepBlueprint from '@/components/ThreeStepBlueprint';
import FlagshipProgram from '@/components/FlagshipProgram';
import KnowledgeHubPreview from '@/components/KnowledgeHubPreview';
import TestimonialsSection from '@/components/TestimonialsSection';
import FounderSection from '@/components/FounderSection';
import NewsletterCTA from '@/components/NewsletterCTA';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <IronySection />
      <ThreeStepBlueprint />
      <FlagshipProgram />
      <KnowledgeHubPreview />
      <TestimonialsSection />
      <FounderSection />
      <NewsletterCTA />
    </div>
  );
}