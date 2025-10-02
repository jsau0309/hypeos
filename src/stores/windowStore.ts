import { create } from 'zustand';
import type { WindowState } from '../types/window';
import { useAppStore } from './appStore';

interface WindowStore {
  windows: WindowState[];
  nextZIndex: number;
  activeWindowId: string | null;

  createWindow: (appId: string, title: string, props?: Partial<WindowState>) => string;
  focusWindow: (id: string) => void;
  closeWindow: (id: string) => void;
  hideWindow: (id: string) => void;
  hardCloseWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  updateWindowPosition: (id: string, position: { x: number; y: number }) => void;
  updateWindowSize: (id: string, size: { width: number; height: number }) => void;
}

export const useWindowStore = create<WindowStore>((set, get) => ({
  windows: [],
  nextZIndex: 100,
  activeWindowId: null,

  createWindow: (appId, title, props = {}) => {
    const id = crypto.randomUUID();
    const state = get();

    const newWindow: WindowState = {
      id,
      appId,
      title,
      zIndex: state.nextZIndex,
      position: props.position || { x: 100 + (state.windows.length * 30), y: 100 + (state.windows.length * 30) },
      size: props.size || { width: 800, height: 600 },
      isMinimized: false,
      isMaximized: false,
      isFocused: true,
      isHidden: false,
    };

    set({
      windows: [...state.windows.map(w => ({ ...w, isFocused: false })), newWindow],
      nextZIndex: state.nextZIndex + 1,
      activeWindowId: id,
    });

    return id;
  },

  focusWindow: (id) => {
    const state = get();
    const window = state.windows.find(w => w.id === id);

    if (!window) return;

    set({
      windows: state.windows.map(w => ({
        ...w,
        isFocused: w.id === id,
        isMinimized: w.id === id ? false : w.isMinimized,
        isHidden: w.id === id ? false : w.isHidden,
        zIndex: w.id === id ? state.nextZIndex : w.zIndex,
      })),
      nextZIndex: state.nextZIndex + 1,
      activeWindowId: id,
    });
  },

  closeWindow: (id) => {
    // This is now just an alias for hideWindow for backwards compatibility
    get().hideWindow(id);
  },

  hideWindow: (id) => {
    const state = get();
    const window = state.windows.find(w => w.id === id);

    if (!window) return;

    // Hide the window but keep app running
    set({
      windows: state.windows.map(w =>
        w.id === id
          ? { ...w, isHidden: true, isFocused: false }
          : w
      ),
      activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
    });
  },

  hardCloseWindow: (id) => {
    const state = get();
    const windowToClose = state.windows.find(w => w.id === id);
    const remainingWindows = state.windows.filter(w => w.id !== id);

    // Close the app completely
    if (windowToClose) {
      useAppStore.getState().closeApp(windowToClose.appId);
    }

    // Focus the top-most remaining window
    const topWindow = remainingWindows.reduce((prev, current) =>
      (current.zIndex > prev.zIndex) ? current : prev
    , remainingWindows[0]);

    set({
      windows: remainingWindows,
      activeWindowId: topWindow?.id || null,
    });
  },

  minimizeWindow: (id) => {
    const state = get();
    const window = state.windows.find(w => w.id === id);

    if (!window) return;

    // Toggle minimize state
    const newMinimizedState = !window.isMinimized;

    set({
      windows: state.windows.map(w =>
        w.id === id
          ? { ...w, isMinimized: newMinimizedState, isFocused: !newMinimizedState }
          : w
      ),
      activeWindowId: newMinimizedState && state.activeWindowId === id ? null : state.activeWindowId,
    });
  },

  maximizeWindow: (id) => {
    set(state => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
      ),
    }));
  },

  updateWindowPosition: (id, position) => {
    set(state => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, position } : w
      ),
    }));
  },

  updateWindowSize: (id, size) => {
    set(state => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, size } : w
      ),
    }));
  },
}));
