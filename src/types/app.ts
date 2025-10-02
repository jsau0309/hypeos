import type { FC } from 'react';

export interface App {
  id: string;
  name: string;
  icon: string;
  iconUrl?: string; // Optional PNG icon URL
  component: FC;
  defaultSize?: { width: number; height: number };
  defaultPosition?: { x: number; y: number };
  resizable?: boolean;
  showInDock?: boolean;
  isModal?: boolean; // Fixed position, non-draggable
  disabledButtons?: ('minimize' | 'maximize')[];
  dockZone?: 'apps' | 'system'; // Which side of the dock divider
  isPinned?: boolean; // Cannot be moved or removed (Finder, Trash)
}

export interface AppMenuItem {
  label: string;
  action?: () => void;
  shortcut?: string;
  divider?: boolean;
  submenu?: AppMenuItem[];
}

export interface AppMenu {
  [key: string]: AppMenuItem[];
}
