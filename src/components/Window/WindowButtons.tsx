interface WindowButtonsProps {
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  isFocused: boolean;
  disabledButtons?: ('minimize' | 'maximize')[];
}

export function WindowButtons({ onClose, onMinimize, onMaximize, isFocused, disabledButtons = [] }: WindowButtonsProps) {
  const isMinimizeDisabled = disabledButtons.includes('minimize');
  const isMaximizeDisabled = disabledButtons.includes('maximize');

  return (
    <div className="flex items-center gap-1.5 z-10">
      {/* Close Button (Red) */}
      <button
        className="window-button window-close"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      />

      {/* Minimize Button (Yellow) */}
      <button
        className={`window-button window-minimize ${isMinimizeDisabled ? 'window-button-disabled' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          if (!isMinimizeDisabled) {
            onMinimize();
          }
        }}
        disabled={isMinimizeDisabled}
      />

      {/* Maximize Button (Green) */}
      <button
        className={`window-button window-maximize ${isMaximizeDisabled ? 'window-button-disabled' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          if (!isMaximizeDisabled) {
            onMaximize();
          }
        }}
        disabled={isMaximizeDisabled}
      />
    </div>
  );
}
