import { useEffect } from 'react';
import { Desktop } from './components/Desktop/Desktop';
import { MenuBar } from './components/MenuBar/MenuBar';
import { Dock } from './components/Dock/Dock';
import { Window } from './components/Window/Window';
import { useWindowStore } from './stores/windowStore';
import { useAppStore } from './stores/appStore';

// Import apps
import { About } from './apps/About/About';

// App registry
import { Chrome, Music, Info } from 'lucide-react';

function App() {
  const { windows } = useWindowStore();
  const { registerApp, apps } = useAppStore();

  // Register all available apps
  useEffect(() => {
    registerApp({
      id: 'about',
      name: 'About This Mac',
      icon: 'Info',
      component: About,
      defaultSize: { width: 500, height: 400 },
    });

    registerApp({
      id: 'browser',
      name: 'Safari',
      icon: 'Chrome',
      component: () => <div className="p-8">Browser coming soon...</div>,
      defaultSize: { width: 1000, height: 700 },
    });

    registerApp({
      id: 'itunes',
      name: 'iTunes',
      icon: 'Music',
      component: () => <div className="p-8">iTunes coming soon...</div>,
      defaultSize: { width: 900, height: 600 },
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
