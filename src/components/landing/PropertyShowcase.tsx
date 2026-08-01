'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Building2 } from 'lucide-react';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { useProperties } from '@/hooks/useProperties';
import { useChatStore } from '@/store/chatStore';

export function PropertyShowcase() {
  const { setSelectedPropertyId, setShowAppointmentModal } = useChatStore();
  // const { data, isLoading, error } = useProperties({ limit: 6, sortBy: 'newest' });
  const { data, isLoading, error } = useProperties();


  const handleBookVisit = (id: string) => {
    setSelectedPropertyId(id);
    setShowAppointmentModal(true);
  };

  return (
    // <section id="properties-showcase" className="py-24 bg-[#0A1128] relative">
    //   {/* Decorative accent grid */}
    //   <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

    //   <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    //     <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-[#D4AF37]/20 pb-8">
    //       <div>
    //         <motion.div
    //           initial={{ opacity: 0, y: 20 }}
    //           whileInView={{ opacity: 1, y: 0 }}
    //           viewport={{ once: true }}
    //           className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#111A38] text-[#F5E096] border border-[#D4AF37]/30 text-xs font-semibold uppercase tracking-wider mb-4"
    //         >
    //           <Building2 className="w-3.5 h-3.5 text-[#D4AF37]" />
    //           Exclusive Portfolio
    //         </motion.div>
    //         <motion.h2
    //           initial={{ opacity: 0, y: 20 }}
    //           whileInView={{ opacity: 1, y: 0 }}
    //           viewport={{ once: true }}
    //           transition={{ delay: 0.1 }}
    //           className="font-outfit font-black text-3xl sm:text-5xl text-white tracking-tight"
    //         >
    //           Featured Luxury <span className="gradient-text">Properties</span>
    //         </motion.h2>
    //       </div>

    //       <motion.div
    //         initial={{ opacity: 0, x: 20 }}
    //         whileInView={{ opacity: 1, x: 0 }}
    //         viewport={{ once: true }}
    //       >
    //         <Link
    //           href="/properties"
    //           className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#111A38] border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A1128] font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md"
    //         >
    //           <span>Explore Full Portfolio</span>
    //           <ArrowRight className="w-4 h-4" />
    //         </Link>
    //       </motion.div>
    //     </div>

    //     {/* Property Cards Grid - Fetched from API */}
    //     {isLoading ? (
    //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    //         {Array.from({ length: 3 }).map((_, i) => (
    //           <motion.div
    //             key={i}
    //             initial={{ opacity: 0, y: 30 }}
    //             animate={{ opacity: 1, y: 0 }}
    //             transition={{ delay: i * 0.1 }}
    //             className="h-full"
    //           >
    //             <div className="rounded-3xl border border-border bg-card p-6 shadow-sm animate-pulse">
    //               <div className="aspect-[4/3] rounded-2xl bg-muted mb-4" />
    //               <div className="h-4 bg-muted rounded mb-2" />
    //               <div className="h-4 bg-muted rounded w-2/3 mb-4" />
    //               <div className="h-6 bg-muted rounded w-1/4" />
    //             </div>
    //           </motion.div>
    //         ))}
    //       </div>
    //     ) : error ? (
    //       <div className="text-center py-12">
    //         <p className="text-muted-foreground">Unable to load featured properties at this time.</p>
    //       </div>
    //     ) : (
    //       <motion.div
    //         className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    //         initial="hidden"
    //         whileInView="visible"
    //         viewport={{ once: true }}
    //         variants={{
    //           hidden: { opacity: 0 },
    //           visible: {
    //             transition: { staggerChildren: 0.15 },
    //           },
    //         }}
    //       >
    //         {data?.properties.map((property, i) => (
    //           <motion.div
    //             key={property.id}
    //             initial={{ opacity: 0, y: 30 }}
    //             animate={{ opacity: 1, y: 0 }}
    //             transition={{ delay: i * 0.15 }}
    //             className="h-full"
    //           >
    //             <PropertyCard property={property} onBookVisit={handleBookVisit} />
    //           </motion.div>
    //         ))}
    //       </motion.div>
    //     )}
    //   </div>
    // </section>

     <section id="properties-showcase" className="py-24 bg-[#0A1128] relative">
      {/* Decorative accent grid */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-[#D4AF37]/20 pb-8">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#111A38] text-[#F5E096] border border-[#D4AF37]/30 text-xs font-semibold uppercase tracking-wider mb-4"
            >
              <Building2 className="w-3.5 h-3.5 text-[#D4AF37]" />
              Exclusive Portfolio
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-outfit font-black text-3xl sm:text-5xl text-white tracking-tight"
            >
              Featured Luxury <span className="gradient-text">Properties</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#111A38] border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A1128] font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md"
            >
              <span>Explore Full Portfolio</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* Realistic Property Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data?.properties.map((property, i) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="h-full"
            >
              <PropertyCard property={property} onBookVisit={handleBookVisit} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
