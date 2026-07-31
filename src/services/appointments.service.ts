import axiosInstance from '@/lib/axios';
import { Appointment, AppointmentRequest } from '@/types/appointment.types';

export const appointmentsService = {
  getAppointments: async (): Promise<Appointment[]> => {
    const response = await axiosInstance.get<Appointment[]>('/appointments/');
    return response.data;
  },

  getAppointmentById: async (id: string): Promise<Appointment> => {
    const response = await axiosInstance.get<Appointment>(`/appointments/${id}/`);
    return response.data;
  },

  bookAppointment: async (data: AppointmentRequest): Promise<Appointment> => {
    const response = await axiosInstance.post<Appointment>('/appointments/', data);
    return response.data;
  },

  cancelAppointment: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/appointments/${id}/`);
  },

  submitLead: async (data: {
    name: string;
    email: string;
    phone: string;
    message?: string;
    property_id?: string;
  }): Promise<void> => {
    await axiosInstance.post('/leads/', data);
  },
};
