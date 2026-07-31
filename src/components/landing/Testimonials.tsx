'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Star, Quote, Sparkles } from 'lucide-react';

const ANCARA_TESTIMONIALS = [
  {
    id: 't-1',
    name: 'Tariq Al-Mansoor',
    role: 'Private Investor',
    location: 'Dubai Marina',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    text: 'Ancara Real Estate responded instantly to my midnight inquiry about Dubai Marina luxury villas. The AI assistant gathered my specs and set up a private consultation the next morning!',
  },
  {
    id: 't-2',
    name: 'Elena Rostova',
    role: 'Penthouse Owner',
    location: 'Downtown Dubai',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
    text: 'The experience was seamless. The Ancara AI advisor provided precise pricing details for Downtown apartments and connected me directly with an executive advisor.',
  },
  {
    id: 't-3',
    name: 'Harrison Sterling',
    role: 'International Buyer',
    location: 'Palm Jumeirah',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
    text: 'Impressed by the speed and precision. Ancara captures your exact requirements and delivers a tailored luxury real estate experience unlike any traditional brokerage.',
  },
];

export function Testimonials() {
  return (
    <section className="py-24 bg-[#0A1128] text-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#111A38] text-[#F5E096] border border-[#D4AF37]/30 text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            Client Reviews
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-outfit font-black text-3xl sm:text-5xl tracking-tight"
          >
            What Our VIP Clients <span className="gradient-text">Experience</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ANCARA_TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -6 }}
              className="p-7 rounded-3xl border border-[#D4AF37]/30 bg-[#111A38]/60 backdrop-blur-md relative overflow-hidden group shadow-xl"
            >
              <Quote className="absolute top-4 right-4 w-12 h-12 text-[#D4AF37]/10 group-hover:text-[#D4AF37]/20 transition-colors" />
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-[#D4AF37] fill-current" />
                ))}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">&quot;{t.text}&quot;</p>
              <div className="flex items-center gap-3 pt-4 border-t border-[#D4AF37]/20">
                <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 border border-[#D4AF37]/40">
                  <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                </div>
                <div>
                  <div className="font-outfit font-bold text-sm text-white">{t.name}</div>
                  <div className="text-xs text-[#F5E096]">{t.role} · {t.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
