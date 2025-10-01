import { useState } from 'react';

interface WindowButtonsProps {
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  isFocused: boolean;
}

export function WindowButtons({ onClose, onMinimize, onMaximize, isFocused }: WindowButtonsProps) {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  const buttonBaseClass = "w-3 h-3 rounded-full transition-all cursor-pointer flex items-center justify-center";

  return (
    <div className="flex items-center space-x-2">
      {/* Close Button (Red) */}
      <button
        className={`${buttonBaseClass} ${
          isFocused ? 'bg-[#FF5F56] hover:bg-[#FF3B30]' : 'bg-gray-400'
        }`}
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        onMouseEnter={() => setHoveredButton('close')}
        onMouseLeave={() => setHoveredButton(null)}
      >
        {hoveredButton === 'close' && isFocused && (
          <span className="text-[8px] text-black/60 font-bold">×</span>
        )}
      </button>

      {/* Minimize Button (Yellow) */}
      <button
        className={`${buttonBaseClass} ${
          isFocused ? 'bg-[#FFBD2E] hover:bg-[#FFAA00]' : 'bg-gray-400'
        }`}
        onClick={(e) => {
          e.stopPropagation();
          onMinimize();
        }}
        onMouseEnter={() => setHoveredButton('minimize')}
        onMouseLeave={() => setHoveredButton(null)}
      >
        {hoveredButton === 'minimize' && isFocused && (
          <span className="text-[8px] text-black/60 font-bold">−</span>
        )}
      </button>

      {/* Maximize Button (Green) */}
      <button
        className={`${buttonBaseClass} ${
          isFocused ? 'bg-[#27C93F] hover:bg-[#1FB932]' : 'bg-gray-400'
        }`}
        onClick={(e) => {
          e.stopPropagation();
          onMaximize();
        }}
        onMouseEnter={() => setHoveredButton('maximize')}
        onMouseLeave={() => setHoveredButton(null)}
      >
        {hoveredButton === 'maximize' && isFocused && (
          <span className="text-[8px] text-black/60 font-bold">+</span>
        )}
      </button>
    </div>
  );
}
