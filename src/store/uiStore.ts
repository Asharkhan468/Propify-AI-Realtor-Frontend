import { create } from 'zustand';

interface UIStore {
  sidebarOpen: boolean;
  chatSidebarOpen: boolean;
  floatingChatOpen: boolean;
  propertyView: 'grid' | 'list';
  setSidebarOpen: (val: boolean) => void;
  toggleSidebar: () => void;
  setChatSidebarOpen: (val: boolean) => void;
  toggleChatSidebar: () => void;
  setFloatingChatOpen: (val: boolean) => void;
  toggleFloatingChat: () => void;
  setPropertyView: (view: 'grid' | 'list') => void;
}

export const useUIStore = create<UIStore>((set) => ({
  sidebarOpen: false,
  chatSidebarOpen: true,
  floatingChatOpen: false,
  propertyView: 'grid',

  setSidebarOpen: (val) => set({ sidebarOpen: val }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setChatSidebarOpen: (val) => set({ chatSidebarOpen: val }),
  toggleChatSidebar: () => set((state) => ({ chatSidebarOpen: !state.chatSidebarOpen })),
  setFloatingChatOpen: (val) => set({ floatingChatOpen: val }),
  toggleFloatingChat: () => set((state) => ({ floatingChatOpen: !state.floatingChatOpen })),
  setPropertyView: (view) => set({ propertyView: view }),
}));
