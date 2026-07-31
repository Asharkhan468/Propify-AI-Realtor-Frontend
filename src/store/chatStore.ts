import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ChatMessage, ChatSession } from '@/types/chat.types';
import { generateId } from '@/lib/utils';

interface ChatStore {
  sessions: ChatSession[];
  activeSessionId: string | null;
  isTyping: boolean;
  showLeadModal: boolean;
  showAppointmentModal: boolean;
  selectedPropertyId: string | null;

  // Actions
  createNewSession: () => string;
  setActiveSession: (id: string) => void;
  addMessage: (sessionId: string, message: ChatMessage) => void;
  updateMessage: (sessionId: string, messageId: string, updates: Partial<ChatMessage>) => void;
  deleteSession: (id: string) => void;
  setIsTyping: (val: boolean) => void;
  setShowLeadModal: (val: boolean) => void;
  setShowAppointmentModal: (val: boolean) => void;
  setSelectedPropertyId: (id: string | null) => void;
  getActiveSession: () => ChatSession | null;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      sessions: [],
      activeSessionId: null,
      isTyping: false,
      showLeadModal: false,
      showAppointmentModal: false,
      selectedPropertyId: null,

      createNewSession: () => {
        const id = generateId();
        const newSession: ChatSession = {
          id,
          title: 'New Chat',
          messages: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        set((state) => ({
          sessions: [newSession, ...state.sessions],
          activeSessionId: id,
        }));
        return id;
      },

      setActiveSession: (id) => set({ activeSessionId: id }),

      addMessage: (sessionId, message) =>
        set((state) => ({
          sessions: state.sessions.map((session) =>
            session.id === sessionId
              ? {
                  ...session,
                  messages: [...session.messages, message],
                  title:
                    session.messages.length === 0 && message.role === 'user'
                      ? message.content.slice(0, 40)
                      : session.title,
                  updatedAt: new Date(),
                }
              : session
          ),
        })),

      updateMessage: (sessionId, messageId, updates) =>
        set((state) => ({
          sessions: state.sessions.map((session) =>
            session.id === sessionId
              ? {
                  ...session,
                  messages: session.messages.map((msg) =>
                    msg.id === messageId ? { ...msg, ...updates } : msg
                  ),
                }
              : session
          ),
        })),

      deleteSession: (id) =>
        set((state) => ({
          sessions: state.sessions.filter((s) => s.id !== id),
          activeSessionId: state.activeSessionId === id ? null : state.activeSessionId,
        })),

      setIsTyping: (val) => set({ isTyping: val }),
      setShowLeadModal: (val) => set({ showLeadModal: val }),
      setShowAppointmentModal: (val) => set({ showAppointmentModal: val }),
      setSelectedPropertyId: (id) => set({ selectedPropertyId: id }),

      getActiveSession: () => {
        const { sessions, activeSessionId } = get();
        return sessions.find((s) => s.id === activeSessionId) ?? null;
      },
    }),
    {
      name: 'chat-store',
      partialize: (state) => ({
        sessions: state.sessions,
        activeSessionId: state.activeSessionId,
      }),
    }
  )
);
