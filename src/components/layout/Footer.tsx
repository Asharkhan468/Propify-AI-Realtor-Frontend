'use client';

import Link from 'next/link';
import { Building2, Mail, Phone, MapPin, Sparkles, ShieldCheck, Clock, Send } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';

export function Footer() {
  const { setFloatingChatOpen } = useUIStore();

  return (
    <footer className="bg-[#060B1A] border-t border-[#D4AF37]/20 text-slate-300 relative overflow-hidden">
      {/* Glow orb background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#D4AF37]/5 blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#D4AF37] via-[#F5E096] to-[#C5A059] flex items-center justify-center shadow-[0_4px_20px_rgba(212,175,55,0.3)]">
                <Building2 className="w-5 h-5 text-[#0A1128]" />
              </div>
              <div className="flex flex-col">
                <span className="font-outfit font-extrabold text-xl tracking-tight text-white">
                  ANCARA <span className="text-[#D4AF37]">ESTATE</span>
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#D4AF37]/80 -mt-1">
                  Luxury Real Estate Consultancy
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              Ancara Real Estate can respond to every client instantly, capture more qualified leads, and dramatically elevate customer experience using cutting-edge AI automation.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => setFloatingChatOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37]/25 text-xs font-bold uppercase tracking-wider transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Ask AI Assistant
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-outfit font-bold text-white uppercase text-xs tracking-wider mb-4 border-b border-[#D4AF37]/30 pb-2 inline-block">
              Luxury Properties
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/properties" className="hover:text-[#D4AF37] transition-colors">
                  Dubai Marina Villas
                </Link>
              </li>
              <li>
                <Link href="/properties" className="hover:text-[#D4AF37] transition-colors">
                  Downtown Penthouse Suite
                </Link>
              </li>
              <li>
                <Link href="/properties" className="hover:text-[#D4AF37] transition-colors">
                  Prime Family Residences
                </Link>
              </li>
              <li>
                <Link href="/properties" className="hover:text-[#D4AF37] transition-colors">
                  Commercial Investment
                </Link>
              </li>
            </ul>
          </div>

          {/* AI Features */}
          <div>
            <h4 className="font-outfit font-bold text-white uppercase text-xs tracking-wider mb-4 border-b border-[#D4AF37]/30 pb-2 inline-block">
              AI Concierge
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>24/7 Instant AI Inquiry</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Bespoke Matching</span>
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Instant Consultation Booking</span>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-outfit font-bold text-white uppercase text-xs tracking-wider mb-4 border-b border-[#D4AF37]/30 pb-2 inline-block">
              Headquarters
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>Level 42, Marina Plaza, Dubai Marina, UAE</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>+971 4 800 ANCARA</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>vip@ancararealestate.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Ancara Real Estate. All rights reserved. Premium AI Client Demo.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-[#D4AF37] transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-[#D4AF37] transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-[#D4AF37] transition-colors">AI Concierge Docs</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
