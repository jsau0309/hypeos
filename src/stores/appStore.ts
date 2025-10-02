import { create } from 'zustand';
import type { App } from '../types/app';

interface AppStore {
  apps: App[];
  runningApps: string[];
  activeAppId: string | null;
  hiddenFromDock: string[];

  registerApp: (app: App) => void;
  launchApp: (appId: string) => void;
  closeApp: (appId: string) => void;
  setActiveApp: (appId: string | null) => void;
  reorderApps: (fromIndex: number, toIndex: number) => void;
  hideFromDock: (appId: string) => void;
  showInDock: (appId: string) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  apps: [],
  runningApps: [],
  activeAppId: null,
  hiddenFromDock: [],

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

  reorderApps: (fromIndex, toIndex) => {
    set(state => {
      const newApps = [...state.apps];
      const [movedApp] = newApps.splice(fromIndex, 1);
      newApps.splice(toIndex, 0, movedApp);
      return { apps: newApps };
    });
  },

  hideFromDock: (appId) => {
    set(state => ({
      hiddenFromDock: [...state.hiddenFromDock, appId],
    }));
  },

  showInDock: (appId) => {
    set(state => ({
      hiddenFromDock: state.hiddenFromDock.filter(id => id !== appId),
    }));
  },
}));
