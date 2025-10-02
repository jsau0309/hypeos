import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface DockContextMenuProps {
  appId: string;
  appName: string;
  isRunning: boolean;
  hasVisibleWindow: boolean;
  hasHiddenWindow: boolean;
  position: { x: number; y: number };
  onOpen: () => void;
  onHide: () => void;
  onHardClose: () => void;
  onClose: () => void;
}

export function DockContextMenu({
  appName,
  isRunning,
  hasVisibleWindow,
  hasHiddenWindow,
  position,
  onOpen,
  onHide,
  onHardClose,
  onClose,
}: DockContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  // Estimate menu height based on number of items (each item ~32px + padding)
  let estimatedHeight = 8; // py-1 padding
  if (!isRunning) {
    estimatedHeight += 32; // Open button
  } else {
    if (hasHiddenWindow) estimatedHeight += 32; // Open
    if (hasVisibleWindow) estimatedHeight += 32; // Hide
    if (hasHiddenWindow || hasVisibleWindow) estimatedHeight += 1; // divider
    estimatedHeight += 32; // Quit
  }

  const menuHeight = menuRef.current?.offsetHeight || estimatedHeight;
  const menuWidth = 150;

  // Get zoom/scale factor
  const zoom = window.visualViewport?.scale || 1;
  const actualWidth = window.visualViewport?.width || window.innerWidth;
  const actualHeight = window.visualViewport?.height || window.innerHeight;

  // Calculate distance from bottom of viewport to top of icon
  const distanceFromBottom = actualHeight - position.y;
  const bottomPosition = distanceFromBottom + 8; // 8px gap above icon

  // Center the menu horizontally on the icon
  const leftPosition = position.x - (menuWidth / 2);

  return createPortal(
    <div
      ref={menuRef}
      className="bg-white/50 backdrop-blur-md aqua-menubar-pinstripe border border-gray-300 rounded-lg shadow-lg py-1 w-[150px] z-[9999]"
      style={{
        position: 'fixed',
        left: `${leftPosition}px`,
        bottom: `${bottomPosition}px`,
        right: 'unset',
        top: 'unset',
      }}
    >
      {/* Open - shows if window is hidden */}
      {hasHiddenWindow && (
        <button
          className="w-full px-4 py-1.5 text-left text-sm hover:bg-blue-500 hover:text-white transition-colors"
          onClick={() => {
            onOpen();
            onClose();
          }}
        >
          Open
        </button>
      )}

      {/* Hide - shows if window is visible */}
      {hasVisibleWindow && (
        <button
          className="w-full px-4 py-1.5 text-left text-sm hover:bg-blue-500 hover:text-white transition-colors"
          onClick={() => {
            onHide();
            onClose();
          }}
        >
          Hide
        </button>
      )}

      {/* Hard Close - always show if app is running */}
      {isRunning && (
        <>
          {(hasHiddenWindow || hasVisibleWindow) && (
            <div className="h-px bg-gray-300 my-1" />
          )}
          <button
            className="w-full px-4 py-1.5 text-left text-sm hover:bg-blue-500 hover:text-white transition-colors"
            onClick={() => {
              onHardClose();
              onClose();
            }}
          >
            Quit {appName}
          </button>
        </>
      )}

      {/* If not running, just show Open option */}
      {!isRunning && (
        <button
          className="w-full px-4 py-1.5 text-left text-sm hover:bg-blue-500 hover:text-white transition-colors"
          onClick={() => {
            onOpen();
            onClose();
          }}
        >
          Open
        </button>
      )}
    </div>,
    document.body
  );
}
