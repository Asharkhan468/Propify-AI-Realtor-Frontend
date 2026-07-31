'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles, Building2 } from 'lucide-react';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { Property } from '@/types/property.types';
import { useChatStore } from '@/store/chatStore';

const DUMMY_LUXURY_PROPERTIES: Property[] = [
  {
    id: 'ancara-dubai-marina-villa',
    title: 'Luxury Villa in Dubai Marina',
    description:
      'Exquisite waterfront architectural masterpiece featuring a private infinity pool, direct marina access, state-of-the-art smart home automation, and panoramic skyline views.',
    type: 'villa',
    status: 'for_sale',
    condition: 'new',
    price: 4500000,
    area: 7500,
    bedrooms: 6,
    bathrooms: 7,
    city: 'Dubai',
    location: 'Dubai Marina, Dubai',
    address: 'Marina Walk Residence 1, Dubai Marina',
    images: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
    ],
    amenities: ['Infinity Pool', 'Private Boat Dock', 'Smart Home', 'Elevator', 'Gym', 'Sauna'],
    agent: {
      id: 'agent-ancara-1',
      name: 'Ancara Luxury Portfolio Team',
      phone: '+971-4-800-ANCARA',
      email: 'vip@ancararealestate.com',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80',
      agency: 'Ancara Real Estate Consultancy',
      properties: 42,
      rating: 4.9,
    },
    nearbyPlaces: [],
    featured: true,
    verified: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'ancara-downtown-apartment',
    title: 'Modern Apartment in Downtown',
    description:
      'Ultra-luxury high-floor apartment overlooking the iconic Burj Khalifa. Features Italian marble finishes, expansive wrap-around terrace, concierge service, and high-end built-in appliances.',
    type: 'apartment',
    status: 'for_sale',
    condition: 'new',
    price: 1850000,
    area: 2400,
    bedrooms: 3,
    bathrooms: 3,
    city: 'Dubai',
    location: 'Downtown Dubai, Dubai',
    address: 'Boulevard Heights Tower, Downtown Dubai',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80',
    ],
    amenities: ['Burj Khalifa View', 'Valet Parking', 'Concierge Service', 'Infinity Pool', 'Gym'],
    agent: {
      id: 'agent-ancara-2',
      name: 'Ancara Investment Specialist',
      phone: '+971-4-800-ANCARA',
      email: 'vip@ancararealestate.com',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80',
      agency: 'Ancara Real Estate Consultancy',
      properties: 28,
      rating: 4.9,
    },
    nearbyPlaces: [],
    featured: true,
    verified: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'ancara-prime-family-house',
    title: 'Family House in Prime Location',
    description:
      'Spacious modern estate with landscaped private gardens, gourmet chef kitchen, guest suites, and multi-car garage situated in an exclusive gated luxury community.',
    type: 'house',
    status: 'for_sale',
    condition: 'new',
    price: 2900000,
    area: 4800,
    bedrooms: 4,
    bathrooms: 5,
    city: 'Dubai',
    location: 'Palm Jumeirah, Dubai',
    address: 'Frond E, Palm Jumeirah',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
    ],
    amenities: ['Private Garden', 'Gated Security', 'Private Pool', 'Maid Quarter', 'BBQ Area'],
    agent: {
      id: 'agent-ancara-3',
      name: 'Ancara Luxury Estates Advisor',
      phone: '+971-4-800-ANCARA',
      email: 'vip@ancararealestate.com',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80',
      agency: 'Ancara Real Estate Consultancy',
      properties: 35,
      rating: 5.0,
    },
    nearbyPlaces: [],
    featured: true,
    verified: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export function PropertyShowcase() {
  const { setSelectedPropertyId, setShowAppointmentModal } = useChatStore();

  const handleBookVisit = (id: string) => {
    setSelectedPropertyId(id);
    setShowAppointmentModal(true);
  };

  return (
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
          {DUMMY_LUXURY_PROPERTIES.map((property, i) => (
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
