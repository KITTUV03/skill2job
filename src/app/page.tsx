'use client';

import React from 'react';
import { LandingHero } from '@/components/LandingHero';
import { LandingProductPreview } from '@/components/LandingProductPreview';
import { LandingComparison } from '@/components/LandingComparison';
import { LandingStats } from '@/components/LandingStats';
import { LandingTrust } from '@/components/LandingTrust';
import { LandingTestimonials } from '@/components/LandingTestimonials';
import { LandingTimeline } from '@/components/LandingTimeline';
import { Footer } from '@/components/Footer';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A]">
      {/* SECTION 1: HERO */}
      <LandingHero />

      {/* SECTION 2: REAL PRODUCT SCREENSHOTS & INTERACTIVE PROOF */}
      <LandingProductPreview />

      {/* SECTION 3: WHY ROLERADAR (COMPARISON TABLE) */}
      <LandingComparison />

      {/* SECTION 4: LIVE PLATFORM METRICS */}
      <LandingStats />

      {/* SECTION 5: TRUST & SECURITY BADGES */}
      <LandingTrust />

      {/* SECTION 6: VERIFIED CANDIDATE REVIEWS */}
      <LandingTestimonials />

      {/* SECTION 7: HOW IT WORKS (ANIMATED TIMELINE) */}
      <LandingTimeline />

      <Footer />
    </div>
  );
}
