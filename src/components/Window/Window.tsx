import { useRef, useState, useEffect } from 'react';
import { useWindowStore } from '../../stores/windowStore';
import { useAppStore } from '../../stores/appStore';
import { TitleBar } from './TitleBar';
import type { WindowState } from '../../types/window';
import { LAYOUT } from '../../constants/layout';

interface WindowProps {
  window: WindowState;
  children: React.ReactNode;
}

export function Window({ window: windowState, children }: WindowProps) {
  const {
    focusWindow,
    closeWindow,
    maximizeWindow,
    updateWindowPosition,
    updateWindowSize,
  } = useWindowStore();
  const { apps } = useAppStore();

  const windowRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [localPosition, setLocalPosition] = useState(windowState.position);
  const [localSize, setLocalSize] = useState(windowState.size);

  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState<string>('');
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0, posX: 0, posY: 0 });

  const app = apps.find(a => a.id === windowState.appId);
  const isModal = app?.isModal || false;

  const MIN_WIDTH = 400;
  const MIN_HEIGHT = 300;

  // Sync local position with store when window prop changes
  useEffect(() => {
    setLocalPosition(windowState.position);
  }, [windowState.position]);

  useEffect(() => {
    setLocalSize(windowState.size);
  }, [windowState.size]);

  const handleMouseDownOnTitleBar = (e: React.MouseEvent) => {
    if (windowState.isMaximized || isModal) return;

    setIsDragging(true);
    setDragOffset({
      x: e.clientX - localPosition.x,
      y: e.clientY - localPosition.y,
    });
    e.preventDefault();
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;

      // Bounds checking - keep window within desktop area (between menu bar and dock)
      const maxX = window.innerWidth - localSize.width;
      const maxY = window.innerHeight - LAYOUT.MENU_BAR_HEIGHT - LAYOUT.DOCK_HEIGHT - localSize.height;

      const boundedX = Math.max(0, Math.min(newX, maxX));
      const boundedY = Math.max(0, Math.min(newY, maxY));

      setLocalPosition({ x: boundedX, y: boundedY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      // Update store with final position
      updateWindowPosition(windowState.id, localPosition);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, localPosition, localSize, windowState.id, updateWindowPosition]);

  const handleResizeStart = (e: React.MouseEvent, direction: string) => {
    if (isModal) return;

    e.preventDefault();
    e.stopPropagation();

    // If window is maximized, un-maximize it but keep current maximized dimensions
    if (windowState.isMaximized) {
      const currentMaximizedWidth = window.innerWidth;
      const currentMaximizedHeight = window.innerHeight - LAYOUT.MENU_BAR_HEIGHT - LAYOUT.DOCK_HEIGHT;

      // Update the window to no longer be maximized, but keep the current size
      maximizeWindow(windowState.id); // Toggle off maximize state
      updateWindowSize(windowState.id, { width: currentMaximizedWidth, height: currentMaximizedHeight });
      updateWindowPosition(windowState.id, { x: 0, y: 0 });

      // Update local state to match
      setLocalSize({ width: currentMaximizedWidth, height: currentMaximizedHeight });
      setLocalPosition({ x: 0, y: 0 });
    }

    setIsResizing(true);
    setResizeDirection(direction);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: windowState.isMaximized ? window.innerWidth : localSize.width,
      height: windowState.isMaximized ? window.innerHeight - LAYOUT.MENU_BAR_HEIGHT - LAYOUT.DOCK_HEIGHT : localSize.height,
      posX: windowState.isMaximized ? 0 : localPosition.x,
      posY: windowState.isMaximized ? 0 : localPosition.y,
    });
  };

  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - resizeStart.x;
      const deltaY = e.clientY - resizeStart.y;

      let newWidth = resizeStart.width;
      let newHeight = resizeStart.height;
      let newX = resizeStart.posX;
      let newY = resizeStart.posY;

      // Handle different resize directions
      if (resizeDirection.includes('e')) {
        newWidth = Math.max(MIN_WIDTH, resizeStart.width + deltaX);
        // Don't let it go beyond screen width
        const maxWidth = window.innerWidth - newX;
        newWidth = Math.min(newWidth, maxWidth);
      }
      if (resizeDirection.includes('w')) {
        newWidth = Math.max(MIN_WIDTH, resizeStart.width - deltaX);
        if (newWidth > MIN_WIDTH) {
          newX = resizeStart.posX + deltaX;
          // Don't let left edge go beyond screen
          newX = Math.max(0, newX);
          newWidth = resizeStart.width + (resizeStart.posX - newX);
        }
      }
      if (resizeDirection.includes('s')) {
        newHeight = Math.max(MIN_HEIGHT, resizeStart.height + deltaY);
        // Don't let bottom edge go below dock (stay above dock)
        const maxHeight = window.innerHeight - LAYOUT.MENU_BAR_HEIGHT - LAYOUT.DOCK_HEIGHT - newY;
        newHeight = Math.min(newHeight, maxHeight);
      }
      if (resizeDirection.includes('n')) {
        newHeight = Math.max(MIN_HEIGHT, resizeStart.height - deltaY);
        if (newHeight > MIN_HEIGHT) {
          newY = resizeStart.posY + deltaY;
          // Don't let top edge go above menu bar
          newY = Math.max(0, newY);
          newHeight = resizeStart.height + (resizeStart.posY - newY);
        }
      }

      setLocalSize({ width: newWidth, height: newHeight });
      setLocalPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      // Update store with final size and position
      updateWindowSize(windowState.id, localSize);
      updateWindowPosition(windowState.id, localPosition);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, resizeDirection, resizeStart, localSize, localPosition, windowState.id, updateWindowSize, updateWindowPosition]);

  const style: React.CSSProperties = windowState.isMaximized
    ? {
        position: 'fixed',
        top: `${LAYOUT.MENU_BAR_HEIGHT}px`,
        left: 0,
        right: 0,
        bottom: `${LAYOUT.DOCK_HEIGHT}px`,
        width: '100vw',
        height: `calc(100vh - ${LAYOUT.MENU_BAR_HEIGHT}px - ${LAYOUT.DOCK_HEIGHT}px)`,
      }
    : isModal
    ? {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: windowState.zIndex,
      }
    : {
        position: 'absolute',
        left: localPosition.x,
        top: localPosition.y,
        width: localSize.width,
        height: localSize.height,
        zIndex: windowState.zIndex,
        willChange: (isDragging || isResizing) ? 'transform' : 'auto',
        transition: (isDragging || isResizing) ? 'none' : 'all 0.1s ease-out',
      };

  const showResizeHandles = !isModal; // Always show resize handles except for modals

  // Don't render if window is minimized or hidden
  if (windowState.isMinimized || windowState.isHidden) {
    return null;
  }

  return (
    <div
      ref={windowRef}
      className="panther-window flex flex-col bg-aqua-window-bg rounded-lg shadow-aqua-window overflow-hidden relative"
      style={style}
      onClick={() => !windowState.isFocused && focusWindow(windowState.id)}
    >
      <TitleBar
        title={windowState.title}
        isFocused={windowState.isFocused}
        onClose={() => closeWindow(windowState.id)}
        onMinimize={() => {}} // Minimize does nothing but shows yellow
        onMaximize={() => maximizeWindow(windowState.id)}
        disabledButtons={app?.disabledButtons} // Don't disable minimize - let it show yellow
        onMouseDown={handleMouseDownOnTitleBar}
      />
      <div className="flex-1 overflow-auto bg-white">
        {children}
      </div>

      {/* Resize Handles */}
      {showResizeHandles && (
        <>
          {/* Edges */}
          <div className="resize-handle resize-handle-n" onMouseDown={(e) => handleResizeStart(e, 'n')} />
          <div className="resize-handle resize-handle-s" onMouseDown={(e) => handleResizeStart(e, 's')} />
          <div className="resize-handle resize-handle-e" onMouseDown={(e) => handleResizeStart(e, 'e')} />
          <div className="resize-handle resize-handle-w" onMouseDown={(e) => handleResizeStart(e, 'w')} />

          {/* Corners */}
          <div className="resize-handle resize-handle-ne" onMouseDown={(e) => handleResizeStart(e, 'ne')} />
          <div className="resize-handle resize-handle-nw" onMouseDown={(e) => handleResizeStart(e, 'nw')} />
          <div className="resize-handle resize-handle-se" onMouseDown={(e) => handleResizeStart(e, 'se')} />
          <div className="resize-handle resize-handle-sw" onMouseDown={(e) => handleResizeStart(e, 'sw')} />
        </>
      )}
    </div>
  );
}
