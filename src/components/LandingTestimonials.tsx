'use client';

import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle2 } from 'lucide-react';

export const LandingTestimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'Priya Sharma',
      position: 'Senior Physical Design Engineer at Qualcomm',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      feedback: 'RoleRadar parsed my SystemVerilog and STA timing closure skills instantly. Within 48 hours of uploading my resume, it matched me with a role at Qualcomm that I had missed on Naukri!',
      verifiedDomain: 'VLSI / Semiconductor',
      rating: 5
    },
    {
      name: 'David Chen',
      position: 'Staff MLOps Architect at Weights & Biases',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      feedback: 'The real-time job aggregator continuously harvested remote AI positions across Wellfound and LinkedIn. The 95% match breakdown score gave me complete clarity before applying.',
      verifiedDomain: 'AI / Machine Learning',
      rating: 5
    },
    {
      name: 'Elena Rostova',
      position: 'Staff Platform Engineer at Stripe',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      feedback: 'I loved the built-in Kanban application tracker. I went from uploading my resume to tracking 4 active interview rounds seamlessly.',
      verifiedDomain: 'Software Engineering',
      rating: 5
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevTestimonial = () => {
    setCurrentIndex(prev => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setCurrentIndex(prev => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const current = testimonials[currentIndex];

  return (
    <section className="py-20 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <span className="px-3.5 py-1 text-xs font-black rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 border border-primary-500/20 uppercase tracking-wider">
            Verified Candidate Placements
          </span>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            Trusted by Top Tech Engineers
          </h2>
        </div>

        {/* Testimonial Card */}
        <div className="relative rounded-3xl glass-card p-8 sm:p-10 bg-slate-50/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 shadow-2xl">
          <Quote className="w-10 h-10 text-primary-500/20 absolute top-6 right-6" />

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <img
              src={current.image}
              alt={current.name}
              className="w-20 h-20 rounded-2xl object-cover ring-4 ring-primary-500/20 shadow-md shrink-0"
            />
            <div className="space-y-4 text-center sm:text-left flex-1">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <div className="flex items-center gap-0.5">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/15 text-emerald-600 border border-emerald-500/20 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Verified Hire • {current.verifiedDomain}
                </span>
              </div>
              <p className="text-base sm:text-lg text-slate-700 dark:text-slate-200 italic leading-relaxed font-medium">
                "{current.feedback}"
              </p>
              <div>
                <h4 className="font-black text-slate-900 dark:text-white text-base">{current.name}</h4>
                <p className="text-xs text-primary-600 dark:text-primary-400 font-bold">{current.position}</p>
              </div>
            </div>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-200 dark:border-slate-700/60">
            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    idx === currentIndex ? 'w-8 bg-primary-600' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-xl bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 transition-colors shadow-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextTestimonial}
                className="p-2 rounded-xl bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 transition-colors shadow-sm"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
