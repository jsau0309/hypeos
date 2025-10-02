import { useState, useRef } from 'react';
import { LayoutGroup } from 'framer-motion';
import { useAppStore } from '../../stores/appStore';
import { useWindowStore } from '../../stores/windowStore';
import { DockIcon } from './DockIcon';
import { MinimizedWindow } from './MinimizedWindow';
import { DockContextMenu } from './DockContextMenu';

export function Dock() {
  const { apps, runningApps, launchApp, reorderApps } = useAppStore();
  const { windows, createWindow, focusWindow, minimizeWindow, hideWindow, hardCloseWindow } = useWindowStore();
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [draggedAppId, setDraggedAppId] = useState<string | null>(null);
  const [mouseX, setMouseX] = useState<number | null>(null);
  const [lastReorderTime, setLastReorderTime] = useState<number>(0);
  const [contextMenu, setContextMenu] = useState<{ appId: string; x: number; y: number } | null>(null);
  const dockRef = useRef<HTMLDivElement>(null);

  const handleLaunchApp = (appId: string) => {
    const app = apps.find(a => a.id === appId);
    if (!app) return;

    // Check if a visible window for this app already exists
    const existingWindow = windows.find(w => w.appId === appId && !w.isMinimized && !w.isHidden);

    if (existingWindow) {
      // Just focus the existing window
      focusWindow(existingWindow.id);
      return;
    }

    // Check if there's a hidden window - restore it
    const hiddenWin = windows.find(w => w.appId === appId && w.isHidden);

    if (hiddenWin) {
      // Show the hidden window
      focusWindow(hiddenWin.id);
      return;
    }

    // Check if there's a minimized window - restore it
    const minimizedWin = windows.find(w => w.appId === appId && w.isMinimized);

    if (minimizedWin) {
      // Un-minimize by toggling the minimize state
      minimizeWindow(minimizedWin.id);
      focusWindow(minimizedWin.id);
      return;
    }

    // Create new window only if none exists
    launchApp(appId);
    createWindow(appId, app.name, {
      size: app.defaultSize || { width: 800, height: 600 },
      position: app.defaultPosition,
    });
  };

  const handleIconDragStart = (appId: string) => {
    const index = apps.findIndex(app => app.id === appId);
    setDraggedIndex(index);
    setDraggedAppId(appId);
  };

  const handleIconDragOver = (e: React.DragEvent, targetAppId: string) => {
    e.preventDefault();

    if (draggedIndex === null) return;

    const draggedApp = apps[draggedIndex];
    const targetApp = apps.find(app => app.id === targetAppId);
    const targetIndex = apps.findIndex(app => app.id === targetAppId);

    // Prevent moving across zones or moving pinned items
    if (draggedApp?.isPinned || !targetApp) return;
    if (draggedApp?.dockZone !== targetApp?.dockZone) return;
    if (targetApp?.isPinned) return;

    if (draggedIndex !== targetIndex) {
      // Throttle reordering to prevent rapid back-and-forth
      const now = Date.now();
      if (now - lastReorderTime < 100) return; // Min 100ms between reorders

      reorderApps(draggedIndex, targetIndex);
      setDraggedIndex(targetIndex);
      setLastReorderTime(now);
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

  const dockApps = apps.filter(app => app.showInDock !== false);
  const appZoneApps = dockApps.filter(app => app.dockZone !== 'system');
  const systemZoneApps = dockApps.filter(app => app.dockZone === 'system');

  // Get minimized windows
  const minimizedWindows = windows.filter(w => w.isMinimized);

  const handleRestoreWindow = (windowId: string) => {
    minimizeWindow(windowId); // This toggles the minimize state
    focusWindow(windowId);
  };

  const handleContextMenu = (e: React.MouseEvent, appId: string) => {
    e.preventDefault();
    e.stopPropagation();

    // Get the icon element's position
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const iconCenterX = rect.left + rect.width / 2;

    setContextMenu({
      appId,
      x: iconCenterX,
      y: rect.top,
    });
  };

  const handleHideApp = (appId: string) => {
    const window = windows.find(w => w.appId === appId && !w.isHidden);
    if (window) {
      hideWindow(window.id);
    }
  };

  const handleHardCloseApp = (appId: string) => {
    const window = windows.find(w => w.appId === appId);
    if (window) {
      hardCloseWindow(window.id);
    }
  };

  return (
    <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-40">
      <div
        ref={dockRef}
        className="bg-white/30 backdrop-blur-xl border border-white/50 rounded-2xl px-4 py-3 shadow-aqua-dock flex items-end gap-2"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <LayoutGroup>
          {/* Apps Zone */}
          {appZoneApps.map((app) => (
            <DockIcon
              key={app.id}
              app={app}
              isRunning={runningApps.includes(app.id)}
              onClick={() => handleLaunchApp(app.id)}
              onContextMenu={(e) => handleContextMenu(e, app.id)}
              onDragStart={() => handleIconDragStart(app.id)}
              onDragOver={(e) => handleIconDragOver(e, app.id)}
              onDragEnd={handleDragEnd}
              mouseX={mouseX}
              dockRef={dockRef}
              isDraggingAny={draggedAppId !== null}
              isBeingDragged={draggedAppId === app.id}
            />
          ))}

          {/* Divider before system zone (minimized windows + system apps) */}
          {(minimizedWindows.length > 0 || systemZoneApps.length > 0) && (
            <div className="w-px h-12 bg-white/40 mx-1" />
          )}

          {/* Minimized Windows (before Trash) */}
          {minimizedWindows.map((window) => (
            <MinimizedWindow
              key={window.id}
              window={window}
              onClick={() => handleRestoreWindow(window.id)}
              mouseX={mouseX}
              dockRef={dockRef}
            />
          ))}

          {/* System Zone */}
          {systemZoneApps.map((app) => (
            <DockIcon
              key={app.id}
              app={app}
              isRunning={runningApps.includes(app.id)}
              onClick={() => handleLaunchApp(app.id)}
              onContextMenu={(e) => handleContextMenu(e, app.id)}
              onDragStart={() => handleIconDragStart(app.id)}
              onDragOver={(e) => handleIconDragOver(e, app.id)}
              onDragEnd={handleDragEnd}
              mouseX={mouseX}
              dockRef={dockRef}
              isDraggingAny={draggedAppId !== null}
              isBeingDragged={draggedAppId === app.id}
            />
          ))}
        </LayoutGroup>
      </div>

      {/* Context Menu */}
      {contextMenu && (() => {
        const app = apps.find(a => a.id === contextMenu.appId);
        const appWindows = windows.filter(w => w.appId === contextMenu.appId);
        const hasVisibleWindow = appWindows.some(w => !w.isHidden && !w.isMinimized);
        const hasHiddenWindow = appWindows.some(w => w.isHidden);

        return (
          <DockContextMenu
            appId={contextMenu.appId}
            appName={app?.name || ''}
            isRunning={runningApps.includes(contextMenu.appId)}
            hasVisibleWindow={hasVisibleWindow}
            hasHiddenWindow={hasHiddenWindow}
            position={{ x: contextMenu.x, y: contextMenu.y }}
            onOpen={() => handleLaunchApp(contextMenu.appId)}
            onHide={() => handleHideApp(contextMenu.appId)}
            onHardClose={() => handleHardCloseApp(contextMenu.appId)}
            onClose={() => setContextMenu(null)}
          />
        );
      })()}
    </div>
  );
}
