import { Property } from './property.types';

export type MessageRole = 'user' | 'assistant';

export type MessageStatus = 'sending' | 'sent' | 'error';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  status?: MessageStatus;
  recommendedProperties?: Property[];
  leadRequired?: boolean;
  appointmentRequired?: boolean;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatRequest {
  message: string;
  session_id?: string;
}

export interface ChatResponse {
  success: boolean;
  reply: string;
  recommended_properties?: Property[];
  lead_required?: boolean;
  appointment_required?: boolean;
  session_id?: string;
}

export interface SuggestedPrompt {
  text: string;
  icon: string;
}
