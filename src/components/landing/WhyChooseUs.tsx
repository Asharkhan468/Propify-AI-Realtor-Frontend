'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, TrendingUp, Users, Award, Sparkles } from 'lucide-react';

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-[#080E21] text-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#111A38] text-[#F5E096] border border-[#D4AF37]/30 text-xs font-semibold uppercase tracking-wider mb-6"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              The Ancara Advantage
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-outfit font-black text-3xl sm:text-5xl mb-6 tracking-tight"
            >
              Redefining High-End Real Estate with <span className="gradient-text">Instant AI Automation</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-300 text-base sm:text-lg mb-8 leading-relaxed font-light"
            >
              Ancara Real Estate ensures no high-value opportunity is missed. Our AI assistant engages every visiting client instantly, collects bespoke requirements, and arranges direct consultations with specialized real estate consultants.
            </motion.p>

            <motion.ul
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              {[
                'Instant response to 100% of luxury buyer inquiries',
                'Curated waterfront villas and prime skyline penthouses',
                'Automated requirement collection and budget range capture',
                'Direct 1-on-1 booking with senior property consultants',
                'Comprehensive market intelligence and private deal access',
              ].map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span className="text-slate-200 text-sm">{point}</span>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Right: Stats cards */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: TrendingUp, value: '100%', label: 'Instant Inquiry Engagement Rate', color: 'text-[#D4AF37]' },
              { icon: Users, value: '4.5x', label: 'Higher Lead Capture Conversion', color: 'text-[#F5E096]' },
              { icon: Award, value: '#1', label: 'Dubai Luxury Real Estate AI Demo', color: 'text-[#D4AF37]' },
              { icon: CheckCircle2, value: '<30s', label: 'Average Client Response Time', color: 'text-[#F5E096]' },
            ].map(({ icon: Icon, value, label, color }, i) => (
              <motion.div
                key={value}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="p-6 rounded-3xl border border-[#D4AF37]/30 bg-[#111A38]/70 backdrop-blur-md shadow-xl"
              >
                <div className="w-10 h-10 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center mb-4">
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <div className="font-outfit font-black text-3xl sm:text-4xl text-white mb-1">{value}</div>
                <div className="text-xs sm:text-sm text-slate-300 leading-snug">{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
