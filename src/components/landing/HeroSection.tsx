'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { MessageSquare, Search, Sparkles, ArrowRight, Shield, Award, Clock } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';

export function HeroSection() {
  const { setFloatingChatOpen } = useUIStore();

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden py-24 bg-[#0A1128]">
      {/* Background Image Placeholder with Dark Luxury Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80"
          alt="Ancara Luxury Property Background"
          fill
          priority
          className="object-cover object-center opacity-35 scale-105 transform hover:scale-100 transition-transform duration-10000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-[#0A1128]/70 to-[#0A1128]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0A1128]/40 to-[#0A1128]" />
      </div>

      {/* Luxury Gold Accents Orbs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Ancara Luxury Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111A38]/90 border border-[#D4AF37]/40 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#F5E096] mb-8 shadow-[0_4px_25px_rgba(212,175,55,0.15)] backdrop-blur-md"
        >
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          Ancara Real Estate — AI Luxury Concierge
        </motion.div>

        {/* Hero Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-outfit font-extrabold text-4xl sm:text-6xl lg:text-7xl xl:text-8xl text-white leading-[1.08] mb-6 tracking-tight max-w-5xl mx-auto"
        >
          Find Your Perfect Property With{' '}
          <span className="gradient-text drop-shadow-[0_4px_30px_rgba(212,175,55,0.3)]">
            Ancara Real Estate
          </span>
        </motion.h1>

        {/* Hero Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-xl lg:text-2xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed font-light"
        >
          AI-powered assistance to help you discover properties, schedule consultations, and get instant answers.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-16"
        >
          {/* CTA 1: Explore Properties */}
          <a
            href="#properties-showcase"
            id="hero-explore-properties"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-slate-900/90 border border-[#D4AF37]/50 text-white font-semibold text-base hover:bg-slate-800 transition-all duration-300 hover:border-[#D4AF37] shadow-lg hover:shadow-[#D4AF37]/20"
          >
            <Search className="w-5 h-5 text-[#D4AF37]" />
            <span>Explore Properties</span>
          </a>

          {/* CTA 2: Talk With AI Assistant */}
          <button
            onClick={() => setFloatingChatOpen(true)}
            id="hero-talk-ai"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F5E096] to-[#C5A059] text-[#0A1128] font-bold text-base hover:brightness-110 shadow-[0_8px_30px_rgba(212,175,55,0.35)] transition-all duration-300 hover:scale-[1.02]"
          >
            <MessageSquare className="w-5 h-5 fill-current" />
            <span>Talk With AI Assistant</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Value Metrics / Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto pt-6 border-t border-[#D4AF37]/20"
        >
          <div className="flex items-center justify-center gap-3 bg-[#111A38]/50 p-4 rounded-2xl border border-[#D4AF37]/20 backdrop-blur-md">
            <Clock className="w-6 h-6 text-[#D4AF37] shrink-0" />
            <div className="text-left">
              <div className="font-outfit font-bold text-white text-sm">Instant AI Responses</div>
              <div className="text-xs text-slate-400">Zero wait time for inquiry</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 bg-[#111A38]/50 p-4 rounded-2xl border border-[#D4AF37]/20 backdrop-blur-md">
            <Award className="w-6 h-6 text-[#D4AF37] shrink-0" />
            <div className="text-left">
              <div className="font-outfit font-bold text-white text-sm">Luxury Portfolio</div>
              <div className="text-xs text-slate-400">Prime Dubai Marina & Downtown</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 bg-[#111A38]/50 p-4 rounded-2xl border border-[#D4AF37]/20 backdrop-blur-md">
            <Shield className="w-6 h-6 text-[#D4AF37] shrink-0" />
            <div className="text-left">
              <div className="font-outfit font-bold text-white text-sm">VIP Consultations</div>
              <div className="text-xs text-slate-400">Direct specialist pairing</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
