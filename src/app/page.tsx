import { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';
import IronySection from '@/components/IronySection';
import ThreeStepBlueprint from '@/components/ThreeStepBlueprint';
import FlagshipProgram from '@/components/FlagshipProgram';
import KnowledgeHubPreview from '@/components/KnowledgeHubPreview';
import TestimonialsSection from '@/components/TestimonialsSection';
import FounderSection from '@/components/FounderSection';
import NewsletterCTA from '@/components/NewsletterCTA';

const CANONICAL_ORIGIN = process.env.NEXT_PUBLIC_CANONICAL_ORIGIN || 'https://theschoolofoptions.com';

export const metadata: Metadata = {
  title: 'The School of Options - Learn Options Trading with Expert Mentorship',
  description: '90% of traders lose money in options. We simplify it. Join our 6-month mentorship program and learn from 20+ years of trading experience. Master high-probability setups, risk management, and disciplined trading.',
  keywords: 'options trading, trading mentorship, options education, trading course, financial education, options strategies, risk management',
  authors: [{ name: 'Kundan Kishore', url: `${CANONICAL_ORIGIN}/about` }],
  creator: 'The School of Options',
  publisher: 'The School of Options',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(CANONICAL_ORIGIN),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'The School of Options - Learn Options Trading with Expert Mentorship',
    description: '90% of traders lose money in options. We simplify it. Join our 6-month mentorship program and learn from 20+ years of trading experience.',
    url: CANONICAL_ORIGIN,
    siteName: 'The School of Options',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/founder-kundan-kishore.jpg',
        width: 1200,
        height: 630,
        alt: 'The School of Options - Options Trading Education',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The School of Options - Learn Options Trading with Expert Mentorship',
    description: '90% of traders lose money in options. We simplify it. Join our 6-month mentorship program.',
    images: ['/images/founder-kundan-kishore.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

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