'use client';

import React from 'react';
import { LandingHero } from '@/components/LandingHero';
import { LandingFeatures } from '@/components/LandingFeatures';
import { LandingTimeline } from '@/components/LandingTimeline';
import { LandingStats } from '@/components/LandingStats';
import { LandingTestimonials } from '@/components/LandingTestimonials';
import { Footer } from '@/components/Footer';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <LandingHero />
      <LandingFeatures />
      <LandingTimeline />
      <LandingStats />
      <LandingTestimonials />
      <Footer />
    </div>
  );
}
