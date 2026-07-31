import axiosInstance from '@/lib/axios';

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  text: string;
  location: string;
}

export const testimonialsService = {
  getTestimonials: async (): Promise<Testimonial[]> => {
    const response = await axiosInstance.get<Testimonial[]>('/testimonials/');
    return response.data;
  },
};
