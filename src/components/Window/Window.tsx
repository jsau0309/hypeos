import { useEffect, useRef } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import { useWindowStore } from '../../stores/windowStore';
import { TitleBar } from './TitleBar';
import type { WindowState } from '../../types/window';

interface WindowProps {
  window: WindowState;
  children: React.ReactNode;
}

export function Window({ window, children }: WindowProps) {
  const {
    focusWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    updateWindowPosition,
    updateWindowSize,
  } = useWindowStore();

  const nodeRef = useRef(null);

  if (window.isMinimized) {
    return null;
  }

  const handleDragStop = (_e: any, data: any) => {
    updateWindowPosition(window.id, { x: data.x, y: data.y });
  };

  const handleResize = (_e: any, data: any) => {
    updateWindowSize(window.id, { width: data.size.width, height: data.size.height });
  };

  const style: React.CSSProperties = window.isMaximized
    ? {
        position: 'fixed',
        top: '22px',
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: 'calc(100vh - 22px)',
      }
    : {
        position: 'absolute',
        zIndex: window.zIndex,
      };

  const windowContent = (
    <div
      ref={nodeRef}
      className="flex flex-col bg-aqua-window-bg rounded-lg shadow-aqua-window overflow-hidden"
      style={style}
      onClick={() => !window.isFocused && focusWindow(window.id)}
    >
      <TitleBar
        title={window.title}
        isFocused={window.isFocused}
        onClose={() => closeWindow(window.id)}
        onMinimize={() => minimizeWindow(window.id)}
        onMaximize={() => maximizeWindow(window.id)}
      />
      <div className="flex-1 overflow-auto bg-white">
        {children}
      </div>
    </div>
  );

  if (window.isMaximized) {
    return windowContent;
  }

  return (
    <Draggable
      nodeRef={nodeRef}
      handle=".window-titlebar"
      position={window.position}
      onStop={handleDragStop}
      bounds="parent"
    >
      <div style={{ position: 'absolute', zIndex: window.zIndex }}>
        <ResizableBox
          width={window.size.width}
          height={window.size.height}
          minConstraints={[400, 300]}
          maxConstraints={[1600, 1200]}
          onResizeStop={handleResize}
          resizeHandles={['se']}
        >
          {windowContent}
        </ResizableBox>
      </div>
    </Draggable>
  );
}
