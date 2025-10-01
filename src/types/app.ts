import { FC } from 'react';

export interface App {
  id: string;
  name: string;
  icon: string;
  component: FC;
  defaultSize?: { width: number; height: number };
  defaultPosition?: { x: number; y: number };
  resizable?: boolean;
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
