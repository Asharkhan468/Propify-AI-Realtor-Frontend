import axiosInstance from '@/lib/axios';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  city: string;
}

export const usersService = {
  getCurrentUser: async (): Promise<User> => {
    const response = await axiosInstance.get<User>('/users/me/');
    return response.data;
  },
};
