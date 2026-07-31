'use client';

import { motion } from 'framer-motion';
import { Bot, Shield, Zap, UserCheck, Calendar, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Instant 24/7 AI Response',
    description: 'Ancara Real Estate responds to every client query instantly without delay, ensuring zero dropped leads.',
    gradient: 'from-[#D4AF37] to-[#C5A059]',
    bg: 'bg-[#D4AF37]/10',
  },
  {
    icon: UserCheck,
    title: 'Automated Lead Qualification',
    description: 'Collects buyer requirements, budget ranges, and location preferences automatically to capture higher-intent leads.',
    gradient: 'from-amber-500 to-yellow-600',
    bg: 'bg-amber-500/10',
  },
  {
    icon: Calendar,
    title: 'Bespoke Consultation Booking',
    description: 'Clients can effortlessly schedule VIP property viewings and private consultations directly inside the chat interface.',
    gradient: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-500/10',
  },
  {
    icon: Bot,
    title: 'Property Match AI',
    description: 'Intelligent natural language understanding recommends matching luxury Dubai Marina villas and Downtown residences instantly.',
    gradient: 'from-blue-500 to-indigo-600',
    bg: 'bg-blue-500/10',
  },
  {
    icon: Shield,
    title: 'Verified Luxury Portfolio',
    description: 'Exclusively curated multi-million dollar luxury properties, penthouses, and private waterfront estates.',
    gradient: 'from-purple-500 to-violet-600',
    bg: 'bg-purple-500/10',
  },
  {
    icon: Sparkles,
    title: 'Elevated Client Experience',
    description: 'Provide ultra-responsive, personalized VIP luxury service that turns visitors into high-value real estate buyers.',
    gradient: 'from-[#F5E096] to-[#D4AF37]',
    bg: 'bg-[#D4AF37]/10',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function FeaturesSection() {
  return (
    <section className="py-24 bg-[#0A1128] text-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#111A38] text-[#F5E096] border border-[#D4AF37]/30 text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            AI Client Experience Engine
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-outfit font-black text-3xl sm:text-5xl mb-4 tracking-tight"
          >
            Why Choose <span className="gradient-text">Ancara AI Concierge</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-300 text-base sm:text-lg"
          >
            Ancara Real Estate can respond to every client instantly, capture more leads, and improve customer experience using AI.
          </motion.p>
        </div>

        {/* Features grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map(({ icon: Icon, title, description, bg }) => (
            <motion.div
              key={title}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className="group p-7 rounded-3xl border border-[#D4AF37]/30 bg-[#111A38]/60 hover:bg-[#111A38] hover:border-[#D4AF37] transition-all duration-300 backdrop-blur-md shadow-lg"
            >
              <div className={`w-12 h-12 rounded-2xl ${bg} border border-[#D4AF37]/30 flex items-center justify-center mb-5`}>
                <Icon className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <h3 className="font-outfit font-bold text-xl mb-2 text-white group-hover:text-[#D4AF37] transition-colors">
                {title}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
