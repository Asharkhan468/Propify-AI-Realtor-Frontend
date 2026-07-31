import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { appointmentsService } from '@/services/appointments.service';
import { AppointmentRequest } from '@/types/appointment.types';

export function useAppointments() {
  const queryClient = useQueryClient();

  const { data: appointments = [], isLoading } = useQuery({
    queryKey: ['appointments'],
    queryFn: appointmentsService.getAppointments,
    staleTime: 2 * 60 * 1000,
  });

  const { mutate: bookAppointment, isPending: isBooking } = useMutation({
    mutationFn: (data: AppointmentRequest) => appointmentsService.bookAppointment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      toast.success('Appointment booked successfully!');
    },
    onError: () => {
      toast.error('Failed to book appointment. Please try again.');
    },
  });

  const { mutate: cancelAppointment } = useMutation({
    mutationFn: (id: string) => appointmentsService.cancelAppointment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      toast.success('Appointment cancelled.');
    },
    onError: () => {
      toast.error('Failed to cancel appointment.');
    },
  });

  const upcomingAppointments = appointments.filter((a) =>
    ['pending', 'confirmed'].includes(a.status)
  );
  const pastAppointments = appointments.filter((a) =>
    ['completed', 'cancelled'].includes(a.status)
  );

  return {
    appointments,
    upcomingAppointments,
    pastAppointments,
    isLoading,
    isBooking,
    bookAppointment,
    cancelAppointment,
  };
}
