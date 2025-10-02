import { WindowButtons } from './WindowButtons';

interface TitleBarProps {
  title: string;
  isFocused: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  disabledButtons?: ('minimize' | 'maximize')[];
  onMouseDown?: (e: React.MouseEvent) => void;
}

export function TitleBar({ title, isFocused, onClose, onMinimize, onMaximize, disabledButtons, onMouseDown }: TitleBarProps) {
  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!disabledButtons?.includes('maximize')) {
      onMaximize();
    }
  };

  return (
    <div
      className={`window-titlebar h-[22px] bg-aqua-titlebar aqua-titlebar-pinstripe flex items-center justify-between px-2 cursor-move select-none ${
        isFocused ? 'opacity-100' : 'opacity-70'
      }`}
      onMouseDown={onMouseDown}
      onDoubleClick={handleDoubleClick}
    >
      <WindowButtons
        onClose={onClose}
        onMinimize={onMinimize}
        onMaximize={onMaximize}
        isFocused={isFocused}
        disabledButtons={disabledButtons}
      />
      <div className="flex-1 text-center text-sm font-system text-black px-4 truncate">
        {title}
      </div>
      <div className="w-16" /> {/* Spacer to balance the buttons */}
    </div>
  );
}
