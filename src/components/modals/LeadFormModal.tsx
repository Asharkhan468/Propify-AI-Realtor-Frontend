'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, User, Mail, Phone, Building, DollarSign, MapPin, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';
import { useChatStore } from '@/store/chatStore';
import { appointmentsService } from '@/services/appointments.service';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';

const leadSchema = z.object({
  name: z.string().min(2, 'Full name is required'),
  email: z.string().email('Valid email address is required'),
  phone: z.string().min(8, 'Valid phone number is required'),
  propertyRequirement: z.string().min(2, 'Property requirement is required'),
  budgetRange: z.string().min(2, 'Budget range is required'),
  preferredLocation: z.string().min(2, 'Preferred location is required'),
});

type LeadFormData = z.infer<typeof leadSchema>;

export function LeadFormModal() {
  const { showLeadModal, setShowLeadModal } = useChatStore();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      budgetRange: '$1M - $3M',
      preferredLocation: 'Dubai Marina',
      propertyRequirement: 'Luxury Villa / Penthouse',
    },
  });

  const { mutate: submitLead, isPending, isSuccess } = useMutation({
    mutationFn: (data: LeadFormData) =>
      appointmentsService.submitLead({
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: `Requirement: ${data.propertyRequirement} | Budget: ${data.budgetRange} | Location: ${data.preferredLocation}`,
      }),
    onSuccess: () => {
      toast.success("Lead registered successfully! We'll connect you with an Ancara Real Estate specialist.", {
        icon: '👑',
        duration: 5000,
      });
      setTimeout(() => {
        reset();
        setShowLeadModal(false);
      }, 1500);
    },
    onError: () => {
      toast.error('Failed to submit details. Please try again.');
    },
  });

  return (
    <AnimatePresence>
      {showLeadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setShowLeadModal(false)}
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', bounce: 0.15 }}
            className="relative w-full max-w-lg bg-[#0A1128] text-white rounded-3xl border border-[#D4AF37]/40 shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden z-10 max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="relative p-6 pb-4 border-b border-[#D4AF37]/25 bg-gradient-to-r from-[#0A1128] via-[#111A38] to-[#0A1128]">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#C5A059] flex items-center justify-center text-[#0A1128] font-bold shadow-md">
                  <Sparkles className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <h2 className="font-outfit font-extrabold text-xl text-white">Ancara Real Estate Lead Portal</h2>
                  <p className="text-xs text-[#F5E096]">VIP Client Requirements</p>
                </div>
              </div>
              <p className="text-xs text-slate-300 mt-2">
                We&apos;ll connect you with an Ancara Real Estate specialist.
              </p>
              <button
                onClick={() => setShowLeadModal(false)}
                className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close form"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            {isSuccess ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-outfit font-bold text-xl text-white">Requirement Registered!</h3>
                <p className="text-sm text-slate-300 max-w-sm mx-auto">
                  We&apos;ll connect you with an Ancara Real Estate specialist within 15 minutes.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit((d) => submitLead(d))} className="p-6 space-y-4">
                {/* 1. Full Name */}
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 block">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]" />
                    <input
                      {...register('name')}
                      placeholder="Sheikh Mohammed"
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-[#D4AF37]/30 bg-[#111A38]/70 text-sm text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/30 outline-none transition-all"
                    />
                  </div>
                  {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>}
                </div>

                {/* 2. Email */}
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 block">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]" />
                    <input
                      {...register('email')}
                      type="email"
                      placeholder="client@ancara.com"
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-[#D4AF37]/30 bg-[#111A38]/70 text-sm text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/30 outline-none transition-all"
                    />
                  </div>
                  {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
                </div>

                {/* 3. Phone Number */}
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 block">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]" />
                    <input
                      {...register('phone')}
                      placeholder="+971 50 123 4567"
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-[#D4AF37]/30 bg-[#111A38]/70 text-sm text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/30 outline-none transition-all"
                    />
                  </div>
                  {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone.message}</p>}
                </div>

                {/* 4. Property Requirement */}
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 block">
                    Property Requirement
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]" />
                    <input
                      {...register('propertyRequirement')}
                      placeholder="e.g. 5-Bed Waterfront Villa / Luxury Penthouse"
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-[#D4AF37]/30 bg-[#111A38]/70 text-sm text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/30 outline-none transition-all"
                    />
                  </div>
                  {errors.propertyRequirement && (
                    <p className="text-xs text-red-400 mt-1">{errors.propertyRequirement.message}</p>
                  )}
                </div>

                {/* Grid: 5. Budget Range & 6. Preferred Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Budget Range */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 block">
                      Budget Range
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]" />
                      <select
                        {...register('budgetRange')}
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#D4AF37]/30 bg-[#111A38] text-sm text-white focus:border-[#D4AF37] outline-none transition-all"
                      >
                        <option value="$1M - $3M">$1M - $3M</option>
                        <option value="$3M - $5M">$3M - $5M</option>
                        <option value="$5M - $10M">$5M - $10M</option>
                        <option value="$10M+">$10M+ Ultra Luxury</option>
                      </select>
                    </div>
                  </div>

                  {/* Preferred Location */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 block">
                      Preferred Location
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]" />
                      <input
                        {...register('preferredLocation')}
                        placeholder="Dubai Marina / Downtown"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#D4AF37]/30 bg-[#111A38]/70 text-sm text-white focus:border-[#D4AF37] outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Banner message */}
                <div className="p-3 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs text-[#F5E096] text-center font-medium">
                  We&apos;ll connect you with an Ancara Real Estate specialist.
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#F5E096] to-[#C5A059] text-[#0A1128] font-bold text-sm hover:brightness-110 disabled:opacity-70 shadow-lg transition-all"
                >
                  {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                  {isPending ? 'Submitting Requirements...' : 'Connect With Ancara Specialist'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
