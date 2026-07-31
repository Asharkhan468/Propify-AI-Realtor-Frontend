'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const ANCARA_FAQS = [
  {
    q: 'How does the Ancara Real Estate AI Assistant work?',
    a: 'Ancara Real Estate can respond to every client instantly, capture more leads, and improve customer experience using AI. Simply type your preferences into the floating AI Concierge or click "Ask AI About This Property" to get instant answers.',
  },
  {
    q: 'What real estate markets does Ancara specialize in?',
    a: 'Ancara Real Estate specializes in luxury real estate, waterfront Dubai Marina villas, Downtown skyline apartments, and prime residential developments.',
  },
  {
    q: 'How do I book a consultation with an Ancara specialist?',
    a: 'You can request a VIP consultation directly through the AI chat widget or by clicking "Book Consultation". Our AI captures your schedule preference and pairs you with a dedicated property advisor.',
  },
  {
    q: 'What information does the lead capture flow collect?',
    a: 'When you express interest, our system captures your Full Name, Email, Phone Number, Property Requirement, Budget Range, and Preferred Location to match you with appropriate properties.',
  },
  {
    q: 'Is my property search data kept private?',
    a: 'Absolutely. Ancara Real Estate adheres to strict confidentiality standards for high-net-worth clients and private estate transactions.',
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-24 bg-[#0A1128] text-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#111A38] text-[#F5E096] border border-[#D4AF37]/30 text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            Client FAQ
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-outfit font-black text-3xl sm:text-5xl tracking-tight"
          >
            Frequently Asked <span className="gradient-text">Questions</span>
          </motion.h2>
        </div>

        <div className="space-y-4">
          {ANCARA_FAQS.map(({ q, a }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-[#D4AF37]/30 bg-[#111A38]/60 overflow-hidden shadow-lg"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-[#111A38] transition-colors"
                id={`faq-${i}`}
                aria-expanded={open === i}
              >
                <span className="font-outfit font-semibold text-[#F5E096] text-base">{q}</span>
                <motion.div
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0"
                >
                  <ChevronDown className={cn('w-5 h-5 text-slate-400', open === i && 'text-[#D4AF37]')} />
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="px-5 pb-5 text-slate-300 text-sm leading-relaxed border-t border-[#D4AF37]/20 pt-4 font-light">
                      {a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
