import { create } from 'zustand';
import type { App } from '../types/app';

interface AppStore {
  apps: App[];
  runningApps: string[];
  activeAppId: string | null;

  registerApp: (app: App) => void;
  launchApp: (appId: string) => void;
  closeApp: (appId: string) => void;
  setActiveApp: (appId: string | null) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  apps: [],
  runningApps: [],
  activeAppId: null,

  registerApp: (app) => {
    set(state => ({
      apps: [...state.apps.filter(a => a.id !== app.id), app],
    }));
  },

  launchApp: (appId) => {
    set(state => ({
      runningApps: state.runningApps.includes(appId)
        ? state.runningApps
        : [...state.runningApps, appId],
      activeAppId: appId,
    }));
  },

  closeApp: (appId) => {
    set(state => ({
      runningApps: state.runningApps.filter(id => id !== appId),
      activeAppId: state.activeAppId === appId ? null : state.activeAppId,
    }));
  },

  setActiveApp: (appId) => {
    set({ activeAppId: appId });
  },
}));
