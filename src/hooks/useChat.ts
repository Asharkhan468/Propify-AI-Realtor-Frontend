import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { chatService } from '@/services/chat.service';
import { useChatStore } from '@/store/chatStore';
import { ChatMessage } from '@/types/chat.types';
import { generateId } from '@/lib/utils';

export function useChat() {
  const {
    sessions,
    activeSessionId,
    isTyping,
    createNewSession,
    setActiveSession,
    addMessage,
    updateMessage,
    setIsTyping,
    setShowLeadModal,
    setShowAppointmentModal,
    getActiveSession,
  } = useChatStore();

  const [inputValue, setInputValue] = useState('');

  const activeSession = getActiveSession();

  const { mutate: sendMessage, isPending } = useMutation({
    mutationFn: async (message: string) => {
      let sessionId = activeSessionId;
      if (!sessionId) {
        sessionId = createNewSession();
      }

      // Add user message
      const userMessage: ChatMessage = {
        id: generateId(),
        role: 'user',
        content: message,
        timestamp: new Date(),
        status: 'sent',
      };
      addMessage(sessionId, userMessage);

      // Set typing indicator
      setIsTyping(true);

      // Call API
      const response = await chatService.sendMessage({
        message,
        session_id: sessionId,
      });

      setIsTyping(false);

      // Add AI response
      const aiMessage: ChatMessage = {
        id: generateId(),
        role: 'assistant',
        content: response.reply,
        timestamp: new Date(),
        status: 'sent',
        recommendedProperties: response.recommended_properties,
        leadRequired: response.lead_required,
        appointmentRequired: response.appointment_required,
      };
      addMessage(sessionId, aiMessage);

      // Handle modals
      if (response.lead_required) {
        setShowLeadModal(true);
      }
      if (response.appointment_required) {
        setShowAppointmentModal(true);
      }

      return response;
    },
    onError: () => {
      setIsTyping(false);
      toast.error('Failed to send message. Please try again.');
    },
  });

  const handleSend = (message?: string) => {
    const msg = message || inputValue;
    if (!msg.trim()) return;
    setInputValue('');
    sendMessage(msg);
  };

  return {
    sessions,
    activeSession,
    activeSessionId,
    isTyping,
    isPending,
    inputValue,
    setInputValue,
    handleSend,
    createNewSession,
    setActiveSession,
    updateMessage,
  };
}
