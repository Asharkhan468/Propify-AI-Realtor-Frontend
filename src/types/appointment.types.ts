export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export interface Appointment {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyImage: string;
  propertyLocation: string;
  agentName: string;
  agentPhone: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  notes?: string;
  createdAt: string;
}

export interface AppointmentRequest {
  property_id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  notes?: string;
}

export interface Lead {
  name: string;
  email: string;
  phone: string;
  message?: string;
  property_id?: string;
  budget?: number;
}
