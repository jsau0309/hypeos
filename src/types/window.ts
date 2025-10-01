export interface WindowState {
  id: string;
  appId: string;
  title: string;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isMinimized: boolean;
  isMaximized: boolean;
  isFocused: boolean;
}

export interface WindowProps {
  id: string;
  appId: string;
  title: string;
  children: React.ReactNode;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onFocus?: () => void;
}
