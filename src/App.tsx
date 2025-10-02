import { useEffect } from 'react';
import { Desktop } from './components/Desktop/Desktop';
import { MenuBar } from './components/MenuBar/MenuBar';
import { Dock } from './components/Dock/Dock';
import { Window } from './components/Window/Window';
import { useWindowStore } from './stores/windowStore';
import { useAppStore } from './stores/appStore';

// Import apps
import { About } from './apps/About/About';

function App() {
  const { windows } = useWindowStore();
  const { registerApp, apps } = useAppStore();

  // Register all available apps
  useEffect(() => {
    registerApp({
      id: 'about',
      name: 'About This Computer',
      icon: 'Info',
      component: About,
      defaultSize: { width: 500, height: 400 },
      showInDock: false,
      isModal: true,
      disabledButtons: ['minimize', 'maximize'],
    });

    registerApp({
      id: 'finder',
      name: 'Finder',
      icon: 'Folder',
      iconUrl: '/icons/finder-icon.webp',
      component: () => <div className="p-8">Finder coming soon...</div>,
      defaultSize: { width: 800, height: 600 },
      dockZone: 'apps',
      isPinned: true, // First app, always pinned like macOS
    });

    registerApp({
      id: 'browser',
      name: 'Safari',
      icon: 'Chrome',
      iconUrl: '/icons/safari-icon.webp',
      component: () => <div className="p-8">Browser coming soon...</div>,
      defaultSize: { width: 1000, height: 700 },
      dockZone: 'apps',
    });

    registerApp({
      id: 'itunes',
      name: 'iTunes',
      icon: 'Music',
      iconUrl: '/icons/itunes-logo.webp',
      component: () => <div className="p-8">iTunes coming soon...</div>,
      defaultSize: { width: 900, height: 600 },
      dockZone: 'apps',
    });

    registerApp({
      id: 'dvd',
      name: 'DVD Player',
      icon: 'Disc',
      iconUrl: '/icons/dvd-icon.webp',
      component: () => <div className="p-8">DVD Player coming soon...</div>,
      defaultSize: { width: 800, height: 600 },
      dockZone: 'apps',
    });

    registerApp({
      id: 'notes',
      name: 'Notes',
      icon: 'StickyNote',
      iconUrl: '/icons/notes-icon.webp',
      component: () => <div className="p-8">Notes coming soon...</div>,
      defaultSize: { width: 600, height: 700 },
      dockZone: 'apps',
    });

    registerApp({
      id: 'pages',
      name: 'Pages',
      icon: 'FileText',
      iconUrl: '/icons/pages-icon.webp',
      component: () => <div className="p-8">Pages coming soon...</div>,
      defaultSize: { width: 900, height: 700 },
      dockZone: 'apps',
    });

    registerApp({
      id: 'trash',
      name: 'Trash',
      icon: 'Trash2',
      iconUrl: '/icons/trash-icon.webp',
      component: () => <div className="p-8">Trash</div>,
      defaultSize: { width: 600, height: 400 },
      dockZone: 'system',
      isPinned: true, // Last system icon, cannot be moved
    });
  }, [registerApp]);

  return (
    <div className="w-screen h-screen overflow-hidden">
      <MenuBar />
      <Desktop>
        {windows.map((window) => {
          const app = apps.find(a => a.id === window.appId);
          if (!app) return null;

          const AppComponent = app.component;

          return (
            <Window key={window.id} window={window}>
              <AppComponent />
            </Window>
          );
        })}
      </Desktop>
      <Dock />
    </div>
  );
}

export default App;
