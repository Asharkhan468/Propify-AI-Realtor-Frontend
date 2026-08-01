'use client';

import { useAppointments } from '@/hooks/useAppointments';
import { EmptyState } from '@/components/common/EmptyState';
import { formatDate, formatTime, getAppointmentStatusColor } from '@/lib/utils';
import { Calendar, XCircle, Phone, MessageSquare } from 'lucide-react';

export default function AppointmentsPage() {
  const { upcomingAppointments, pastAppointments, cancelAppointment } = useAppointments();

  const hasAppointments = upcomingAppointments.length > 0 || pastAppointments.length > 0;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background px-4 py-6 sm:px-6 lg:px-8">
      <div className="container mx-auto space-y-6">
        <div className="rounded-[36px] border border-border bg-card/80 p-6 glass shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-primary/80 font-semibold mb-2">
                Appointments
              </p>
              <h1 className="font-outfit text-3xl md:text-4xl font-black">
                Manage your upcoming visits.
              </h1>
            </div>
            <div className="inline-flex items-center gap-3 rounded-2xl bg-emerald-500/10 px-4 py-3 text-sm text-emerald-600 dark:text-emerald-300">
              <Calendar className="w-4 h-4" /> Quick booking and status tracking
            </div>
          </div>
        </div>

        {!hasAppointments ? (
          <EmptyState
            title="No appointments yet"
            description="Book a visit from property details or chat with the AI assistant to arrange a viewing."
            action={{ label: 'Start chat', href: '/' }}
          />
        ) : (
          <div className="grid gap-6 xl:grid-cols-2">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">Upcoming visits</p>
                  <h2 className="font-outfit text-2xl font-bold">Your next viewings</h2>
                </div>
              </div>

              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="rounded-3xl border border-border bg-background/70 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">{formatDate(appointment.date)} · {formatTime(appointment.time)}</p>
                        <h3 className="font-semibold mt-2">{appointment.propertyTitle}</h3>
                        <p className="text-sm text-muted-foreground">{appointment.propertyLocation}</p>
                      </div>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getAppointmentStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </span>
                    </div>
                    <div className="mt-4 grid gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" /> {appointment.agentPhone}
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" /> {appointment.agentName}
                      </div>
                    </div>
                    <button
                      onClick={() => cancelAppointment(appointment.id)}
                      className="mt-4 inline-flex items-center gap-2 rounded-2xl border border-destructive/30 bg-destructive/5 px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <XCircle className="w-4 h-4" /> Cancel
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm space-y-6">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">Appointment history</p>
                <h2 className="font-outfit text-2xl font-bold">Past visits</h2>
              </div>
              <div className="space-y-4">
                {pastAppointments.map((appointment) => (
                  <div key={appointment.id} className="rounded-3xl border border-border bg-background/70 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">{formatDate(appointment.date)} · {formatTime(appointment.time)}</p>
                        <h3 className="font-semibold mt-2">{appointment.propertyTitle}</h3>
                      </div>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getAppointmentStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-3">Notes: {appointment.notes || 'No notes added.'}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
