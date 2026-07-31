import axiosInstance from '@/lib/axios';
import { ChatRequest, ChatResponse } from '@/types/chat.types';

export const chatService = {
  sendMessage: async (data: ChatRequest): Promise<ChatResponse> => {
    const response = await axiosInstance.post<ChatResponse>('/chat/', {
      message: data.message,
      conversation_id: data.session_id,
    });
    return response.data;
  },
};
