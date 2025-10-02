import { useState, useRef } from 'react';
import { useAppStore } from '../../stores/appStore';
import { useWindowStore } from '../../stores/windowStore';
import { useDesktopStore } from '../../stores/desktopStore';
import { DockIcon } from './DockIcon';

export function Dock() {
  const { apps, runningApps, launchApp, reorderApps, hiddenFromDock, showInDock } = useAppStore();
  const { createWindow } = useWindowStore();
  const { removeDesktopIcon, desktopIcons } = useDesktopStore();
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [draggedAppId, setDraggedAppId] = useState<string | null>(null);
  const [mouseX, setMouseX] = useState<number | null>(null);
  const dockRef = useRef<HTMLDivElement>(null);

  const handleLaunchApp = (appId: string) => {
    const app = apps.find(a => a.id === appId);
    if (!app) return;

    launchApp(appId);
    createWindow(appId, app.name, {
      size: app.defaultSize || { width: 800, height: 600 },
      position: app.defaultPosition,
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const desktopIconId = e.dataTransfer.getData('application/desktop-icon-id');

    if (desktopIconId) {
      // Find the desktop icon and get its appId
      const desktopIcon = desktopIcons.find(icon => icon.id === desktopIconId);
      if (desktopIcon) {
        removeDesktopIcon(desktopIconId);
        showInDock(desktopIcon.appId); // Show back in dock
      }
    }

    setDraggedIndex(null);
  };

  const handleIconDragStart = (appId: string) => {
    const index = apps.findIndex(app => app.id === appId);
    setDraggedIndex(index);
    setDraggedAppId(appId);
  };

  const handleIconDragOver = (e: React.DragEvent, targetAppId: string) => {
    e.preventDefault();

    // Only handle reordering if we're dragging a dock icon (not from desktop)
    if (draggedIndex === null) return;

    const draggedApp = apps[draggedIndex];
    const targetApp = apps.find(app => app.id === targetAppId);
    const targetIndex = apps.findIndex(app => app.id === targetAppId);

    // Prevent moving across zones or moving pinned items
    if (draggedApp?.isPinned || !targetApp) return;
    if (draggedApp?.dockZone !== targetApp?.dockZone) return;
    if (targetApp?.isPinned) return;

    if (draggedIndex !== targetIndex) {
      reorderApps(draggedIndex, targetIndex);
      setDraggedIndex(targetIndex);
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDraggedAppId(null);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dockRef.current) {
      const rect = dockRef.current.getBoundingClientRect();
      setMouseX(e.clientX - rect.left);
    }
  };

  const handleMouseLeave = () => {
    setMouseX(null);
  };

  const dockApps = apps.filter(app => app.showInDock !== false && !hiddenFromDock.includes(app.id));
  const appZoneApps = dockApps.filter(app => app.dockZone !== 'system');
  const systemZoneApps = dockApps.filter(app => app.dockZone === 'system');

  return (
    <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-40">
      <div
        ref={dockRef}
        className="bg-white/30 backdrop-blur-xl border border-white/50 rounded-2xl px-4 py-3 shadow-aqua-dock flex items-end gap-2"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Apps Zone */}
        {appZoneApps.map((app) => (
          <DockIcon
            key={app.id}
            app={app}
            isRunning={runningApps.includes(app.id)}
            onClick={() => handleLaunchApp(app.id)}
            onDragStart={() => handleIconDragStart(app.id)}
            onDragOver={(e) => handleIconDragOver(e, app.id)}
            onDragEnd={handleDragEnd}
            mouseX={mouseX}
            dockRef={dockRef}
            isDraggingAny={draggedAppId !== null}
            isBeingDragged={draggedAppId === app.id}
          />
        ))}

        {/* Divider */}
        {systemZoneApps.length > 0 && (
          <div className="w-px h-12 bg-white/40 mx-1" />
        )}

        {/* System Zone */}
        {systemZoneApps.map((app) => (
          <DockIcon
            key={app.id}
            app={app}
            isRunning={runningApps.includes(app.id)}
            onClick={() => handleLaunchApp(app.id)}
            onDragStart={() => handleIconDragStart(app.id)}
            onDragOver={(e) => handleIconDragOver(e, app.id)}
            onDragEnd={handleDragEnd}
            mouseX={mouseX}
            dockRef={dockRef}
            isDraggingAny={draggedAppId !== null}
            isBeingDragged={draggedAppId === app.id}
          />
        ))}
      </div>
    </div>
  );
}
