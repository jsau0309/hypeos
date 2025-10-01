import { useAppStore } from '../../stores/appStore';
import { useWindowStore } from '../../stores/windowStore';
import { DockIcon } from './DockIcon';

export function Dock() {
  const { apps, runningApps, launchApp } = useAppStore();
  const { createWindow } = useWindowStore();

  const handleLaunchApp = (appId: string) => {
    const app = apps.find(a => a.id === appId);
    if (!app) return;

    launchApp(appId);
    createWindow(appId, app.name, {
      size: app.defaultSize || { width: 800, height: 600 },
      position: app.defaultPosition,
    });
  };

  return (
    <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-40">
      <div className="bg-white/30 backdrop-blur-xl border border-white/50 rounded-2xl px-3 py-2 shadow-aqua-dock flex items-end space-x-2">
        {apps.map(app => (
          <DockIcon
            key={app.id}
            app={app}
            isRunning={runningApps.includes(app.id)}
            onClick={() => handleLaunchApp(app.id)}
          />
        ))}
      </div>
    </div>
  );
}
