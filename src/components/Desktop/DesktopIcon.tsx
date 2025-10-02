import { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import { useAppStore } from '../../stores/appStore';
import { useWindowStore } from '../../stores/windowStore';
import { useDesktopStore } from '../../stores/desktopStore';
import type { DesktopIcon as DesktopIconType } from '../../types/desktopIcon';

interface DesktopIconProps {
  desktopIcon: DesktopIconType;
}

export function DesktopIcon({ desktopIcon }: DesktopIconProps) {
  const { apps, launchApp } = useAppStore();
  const { createWindow } = useWindowStore();
  const { updateIconPosition, removeDesktopIcon } = useDesktopStore();
  const [isDragging, setIsDragging] = useState(false);
  const nodeRef = useRef(null);

  const app = apps.find(a => a.id === desktopIcon.appId);
  if (!app) return null;

  const handleDoubleClick = () => {
    launchApp(app.id);
    createWindow(app.id, app.name, {
      size: app.defaultSize || { width: 800, height: 600 },
      position: app.defaultPosition,
    });
  };

  const handleDragStop = (_e: any, data: any) => {
    setIsDragging(false);
    updateIconPosition(desktopIcon.id, { x: data.x, y: data.y });
  };

  const handleNativeDragStart = (e: React.DragEvent) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('application/desktop-icon-id', desktopIcon.id);

    // Create transparent 1x1 pixel to hide drag ghost completely
    const transparentImg = new Image();
    transparentImg.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    e.dataTransfer.setDragImage(transparentImg, 0, 0);
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      position={desktopIcon.position}
      onStart={() => setIsDragging(true)}
      onStop={handleDragStop}
      bounds="parent"
    >
      <div
        ref={nodeRef}
        className={`absolute cursor-pointer flex flex-col items-center w-20 ${isDragging ? 'opacity-70' : ''}`}
        onDoubleClick={handleDoubleClick}
        draggable
        onDragStart={handleNativeDragStart}
      >
        {app.iconUrl ? (
          <img
            src={app.iconUrl}
            alt={app.name}
            className="w-16 h-16 pointer-events-none"
            draggable={false}
          />
        ) : (
          <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-300 rounded-xl shadow-lg flex items-center justify-center border border-gray-400/50">
            <div className="text-2xl">📁</div>
          </div>
        )}
        <div className="mt-1 text-white text-xs text-center font-medium drop-shadow-lg px-1 py-0.5 bg-black/20 rounded">
          {app.name}
        </div>
      </div>
    </Draggable>
  );
}
