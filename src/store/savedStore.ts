import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Property } from '@/types/property.types';

interface SavedStore {
  savedProperties: Property[];
  isSaved: (id: string) => boolean;
  toggleSave: (property: Property) => void;
  removeAll: () => void;
}

export const useSavedStore = create<SavedStore>()(
  persist(
    (set, get) => ({
      savedProperties: [],

      isSaved: (id) => get().savedProperties.some((p) => p.id === id),

      toggleSave: (property) =>
        set((state) => {
          const exists = state.savedProperties.some((p) => p.id === property.id);
          return {
            savedProperties: exists
              ? state.savedProperties.filter((p) => p.id !== property.id)
              : [property, ...state.savedProperties],
          };
        }),

      removeAll: () => set({ savedProperties: [] }),
    }),
    {
      name: 'saved-properties',
    }
  )
);
