import { WindowButtons } from './WindowButtons';

interface TitleBarProps {
  title: string;
  isFocused: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
}

export function TitleBar({ title, isFocused, onClose, onMinimize, onMaximize }: TitleBarProps) {
  return (
    <div
      className={`window-titlebar h-[22px] bg-aqua-titlebar flex items-center justify-between px-2 cursor-move select-none ${
        isFocused ? 'opacity-100' : 'opacity-70'
      }`}
    >
      <WindowButtons
        onClose={onClose}
        onMinimize={onMinimize}
        onMaximize={onMaximize}
        isFocused={isFocused}
      />
      <div className="flex-1 text-center text-sm font-medium text-gray-700 px-4 truncate">
        {title}
      </div>
      <div className="w-16" /> {/* Spacer to balance the buttons */}
    </div>
  );
}
