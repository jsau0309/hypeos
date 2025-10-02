import { create } from 'zustand';
import type { DesktopIcon } from '../types/desktopIcon';

interface DesktopStore {
  desktopIcons: DesktopIcon[];

  addDesktopIcon: (appId: string, position: { x: number; y: number }) => void;
  removeDesktopIcon: (id: string) => void;
  updateIconPosition: (id: string, position: { x: number; y: number }) => void;
}

export const useDesktopStore = create<DesktopStore>((set) => ({
  desktopIcons: [],

  addDesktopIcon: (appId, position) => {
    set(state => ({
      desktopIcons: [
        ...state.desktopIcons,
        {
          id: `${appId}-${Date.now()}`,
          appId,
          position,
        },
      ],
    }));
  },

  removeDesktopIcon: (id) => {
    set(state => ({
      desktopIcons: state.desktopIcons.filter(icon => icon.id !== id),
    }));
  },

  updateIconPosition: (id, position) => {
    set(state => ({
      desktopIcons: state.desktopIcons.map(icon =>
        icon.id === id ? { ...icon, position } : icon
      ),
    }));
  },
}));
