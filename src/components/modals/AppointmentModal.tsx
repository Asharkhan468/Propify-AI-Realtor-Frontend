'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Calendar as CalendarIcon, Clock, User, Phone, FileText, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';
import { useChatStore } from '@/store/chatStore';
import { useAppointments } from '@/hooks/useAppointments';
import { APPOINTMENT_TIMES } from '@/lib/constants';

const appointmentSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  phone: z.string().min(8, 'Valid phone number required'),
  email: z.string().email('Valid email required'),
  date: z.string().min(1, 'Please select a date'),
  time: z.string().min(1, 'Please select a time slot'),
  notes: z.string().optional(),
});

type AppointmentFormData = z.infer<typeof appointmentSchema>;

export function AppointmentModal() {
  const { showAppointmentModal, setShowAppointmentModal, selectedPropertyId } = useChatStore();
  const { bookAppointment, isBooking } = useAppointments();
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      time: '10:00 AM',
    },
  });

  const selectedTime = watch('time');

  const onSubmit = (data: AppointmentFormData) => {
    bookAppointment({
      property_id: selectedPropertyId ?? 'ancara-consultation',
      name: data.name,
      email: data.email,
      phone: data.phone,
      date: data.date,
      time: data.time,
      notes: data.notes,
    });
    setIsSuccess(true);
    setTimeout(() => {
      reset();
      setIsSuccess(false);
      setShowAppointmentModal(false);
    }, 2500);
  };

  // Min date = tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <AnimatePresence>
      {showAppointmentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setShowAppointmentModal(false)}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', bounce: 0.15 }}
            className="relative w-full max-w-lg bg-[#0A1128] text-white rounded-3xl border border-[#D4AF37]/40 shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden z-10 max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="relative p-6 pb-4 border-b border-[#D4AF37]/25 bg-gradient-to-r from-[#0A1128] via-[#111A38] to-[#0A1128]">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#C5A059] flex items-center justify-center text-[#0A1128] font-bold shadow-md">
                  <CalendarIcon className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-outfit font-extrabold text-xl text-white">
                    Book VIP Consultation
                  </h2>
                  <p className="text-xs text-[#F5E096]">Ancara Real Estate Private Advisory</p>
                </div>
              </div>
              <p className="text-xs text-slate-300 mt-2">
                Schedule a 1-on-1 private consultation with an Ancara senior property advisor.
              </p>
              <button
                onClick={() => setShowAppointmentModal(false)}
                className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {isSuccess ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-outfit font-bold text-2xl text-white">Consultation Confirmed!</h3>
                <p className="text-sm text-slate-300 max-w-sm mx-auto">
                  Your private consultation session with Ancara Real Estate has been reserved. Check your email for confirmation details.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
                {/* Full Name */}
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 block">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]" />
                    <input
                      {...register('name')}
                      placeholder="Your Full Name"
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-[#D4AF37]/30 bg-[#111A38]/70 text-sm text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/30 outline-none transition-all"
                    />
                  </div>
                  {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>}
                </div>

                {/* Grid: Phone & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 block">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]" />
                      <input
                        {...register('phone')}
                        placeholder="+971 50 123 4567"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#D4AF37]/30 bg-[#111A38]/70 text-sm text-white focus:border-[#D4AF37] outline-none transition-all"
                      />
                    </div>
                    {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone.message}</p>}
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 block">
                      Email
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      placeholder="client@ancara.com"
                      className="w-full px-3 py-2.5 rounded-xl border border-[#D4AF37]/30 bg-[#111A38]/70 text-sm text-white focus:border-[#D4AF37] outline-none transition-all"
                    />
                    {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
                  </div>
                </div>

                {/* 1. Select Date */}
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <CalendarIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
                    Select Date
                  </label>
                  <input
                    {...register('date')}
                    type="date"
                    min={minDate}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D4AF37]/30 bg-[#111A38] text-sm text-white focus:border-[#D4AF37] outline-none transition-all"
                  />
                  {errors.date && <p className="text-xs text-red-400 mt-1">{errors.date.message}</p>}
                </div>

                {/* 2. Select Time Slots */}
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                    Select Preferred Time
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {APPOINTMENT_TIMES.slice(0, 6).map((t) => {
                      const isSelected = selectedTime === t;
                      return (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setValue('time', t)}
                          className={`py-2 px-2 text-xs font-semibold rounded-xl border transition-all ${
                            isSelected
                              ? 'bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-[#0A1128] border-[#D4AF37] shadow-md'
                              : 'bg-[#111A38] text-slate-300 border-border/40 hover:border-[#D4AF37]/50'
                          }`}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                  {errors.time && <p className="text-xs text-red-400 mt-1">{errors.time.message}</p>}
                </div>

                {/* Notes */}
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#D4AF37]" />
                    Consultation Notes (Optional)
                  </label>
                  <textarea
                    {...register('notes')}
                    placeholder="Specific questions or portfolio interests..."
                    rows={2}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#D4AF37]/30 bg-[#111A38]/70 text-sm text-white focus:border-[#D4AF37] outline-none transition-all resize-none"
                  />
                </div>

                {/* Submit Action: Confirm Consultation */}
                <button
                  type="submit"
                  disabled={isBooking}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#F5E096] to-[#C5A059] text-[#0A1128] font-bold text-sm hover:brightness-110 disabled:opacity-70 shadow-lg transition-all"
                >
                  {isBooking && <Loader2 className="w-4 h-4 animate-spin" />}
                  {isBooking ? 'Confirming Booking...' : 'Confirm Consultation'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
