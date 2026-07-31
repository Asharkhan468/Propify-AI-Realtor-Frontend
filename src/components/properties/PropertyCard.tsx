'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Bed, Bath, Maximize2, Heart, Eye, Calendar, Sparkles } from 'lucide-react';
import { Property } from '@/types/property.types';
import { useSavedStore } from '@/store/savedStore';
import { useUIStore } from '@/store/uiStore';
import { useChat } from '@/hooks/useChat';
import { formatPrice, formatArea, getStatusColor, getStatusLabel, cn } from '@/lib/utils';
import { toast } from 'sonner';

interface PropertyCardProps {
  property: Property;
  variant?: 'default' | 'compact' | 'chat';
  onBookVisit?: (id: string) => void;
  onViewDetails?: (id: string) => void;
}

export function PropertyCard({
  property,
  variant = 'default',
  onBookVisit,
}: PropertyCardProps) {
  const { isSaved, toggleSave } = useSavedStore();
  const { setFloatingChatOpen } = useUIStore();
  const { handleSend } = useChat();

  const saved = isSaved(property.id);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleSave(property);
    toast.success(saved ? 'Removed from saved' : 'Saved to wishlist', {
      icon: saved ? '💔' : '❤️',
    });
  };

  const handleAskAI = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFloatingChatOpen(true);
    handleSend(`Can you tell me more details about "${property.title}" located in ${property.location}? What are the pricing options and availability?`);
  };

  if (variant === 'compact' || variant === 'chat') {
    return (
      <motion.div
        whileHover={{ y: -3 }}
        className="group rounded-2xl overflow-hidden border border-[#D4AF37]/30 bg-card shadow-sm cursor-pointer"
      >
        <div className="relative h-36 overflow-hidden">
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-2 left-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#0A1128]/80 text-[#D4AF37] border border-[#D4AF37]/30">
              {getStatusLabel(property.status)}
            </span>
          </div>
        </div>
        <div className="p-3.5">
          <h3 className="font-outfit font-bold text-sm line-clamp-1 mb-1">{property.title}</h3>
          <div className="flex items-center gap-1 text-muted-foreground text-xs mb-2">
            <MapPin className="w-3 h-3 text-[#D4AF37]" />
            <span className="truncate">{property.location}</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
            {property.bedrooms > 0 && (
              <span className="flex items-center gap-1">
                <Bed className="w-3 h-3 text-[#D4AF37]" />{property.bedrooms} Bed
              </span>
            )}
            <span className="flex items-center gap-1">
              <Bath className="w-3 h-3 text-[#D4AF37]" />{property.bathrooms} Bath
            </span>
            <span className="flex items-center gap-1">
              <Maximize2 className="w-3 h-3 text-[#D4AF37]" />{formatArea(property.area)}
            </span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            <span className="font-outfit font-black text-sm text-[#D4AF37]">
              {formatPrice(property.price)}
            </span>
            <button
              onClick={handleAskAI}
              className="px-2.5 py-1 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A1128] text-[11px] font-semibold transition-all flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              Ask AI
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 250, damping: 20 }}
      className="group rounded-3xl overflow-hidden border border-[#D4AF37]/30 bg-[#0A1128]/60 backdrop-blur-md shadow-xl hover:shadow-[0_15px_40px_rgba(212,175,55,0.15)] hover:border-[#D4AF37]/60 transition-all duration-300 flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-transparent to-black/30" />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#0A1128]/90 text-[#F5E096] border border-[#D4AF37]/40 shadow-md backdrop-blur-md">
            {getStatusLabel(property.status)}
          </span>
          {property.featured && (
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-[#0A1128] shadow-md">
              ⭐ VIP Luxury
            </span>
          )}
        </div>

        {/* Save button */}
        <button
          id={`save-${property.id}`}
          onClick={handleSave}
          className={cn(
            'absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-200 shadow-md',
            saved
              ? 'bg-red-500/90 border-red-400 text-white'
              : 'bg-[#0A1128]/60 border-[#D4AF37]/30 text-white hover:bg-[#D4AF37] hover:text-[#0A1128]'
          )}
          aria-label={saved ? 'Remove from saved' : 'Save property'}
        >
          <Heart className={cn('w-4 h-4', saved ? 'fill-current' : '')} />
        </button>

        {/* Price tag */}
        <div className="absolute bottom-4 left-4">
          <div className="bg-[#0A1128]/90 border border-[#D4AF37]/50 px-4 py-1.5 rounded-2xl shadow-lg backdrop-blur-md">
            <span className="font-outfit font-black text-white text-lg sm:text-xl">
              {formatPrice(property.price)}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
        <div>
          <h3 className="font-outfit font-bold text-xl text-white line-clamp-1 mb-2 group-hover:text-[#D4AF37] transition-colors">
            {property.title}
          </h3>
          <div className="flex items-center gap-2 text-slate-300 text-sm mb-4">
            <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <span className="truncate">{property.location}</span>
          </div>

          {/* Specs */}
          <div className="grid grid-cols-3 gap-2 py-3 px-4 rounded-2xl bg-[#111A38]/80 border border-[#D4AF37]/20 text-xs text-slate-200 mb-2">
            <div className="flex items-center gap-1.5 justify-center">
              <Bed className="w-4 h-4 text-[#D4AF37]" />
              <span className="font-medium">{property.bedrooms} Beds</span>
            </div>
            <div className="flex items-center gap-1.5 justify-center border-x border-[#D4AF37]/20">
              <Bath className="w-4 h-4 text-[#D4AF37]" />
              <span className="font-medium">{property.bathrooms} Baths</span>
            </div>
            <div className="flex items-center gap-1.5 justify-center">
              <Maximize2 className="w-4 h-4 text-[#D4AF37]" />
              <span className="font-medium">{formatArea(property.area)}</span>
            </div>
          </div>
        </div>

        {/* Main Action Button: Ask AI About This Property */}
        <div className="space-y-2 pt-2 border-t border-[#D4AF37]/20">
          <button
            onClick={handleAskAI}
            id={`ask-ai-${property.id}`}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#F5E096] to-[#C5A059] text-[#0A1128] font-bold text-sm hover:brightness-110 shadow-[0_4px_20px_rgba(212,175,55,0.25)] transition-all"
          >
            <Sparkles className="w-4 h-4 fill-current" />
            <span>Ask AI About This Property</span>
          </button>

          <div className="flex gap-2">
            <Link
              href={`/properties/${property.id}`}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-border text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
              Details
            </Link>
            <button
              onClick={() => onBookVisit?.(property.id)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/20 transition-colors"
            >
              <Calendar className="w-3.5 h-3.5" />
              Visit
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
