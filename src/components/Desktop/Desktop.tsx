import { ReactNode } from 'react';
import { useDesktopStore } from '../../stores/desktopStore';
import { useAppStore } from '../../stores/appStore';
import { DesktopIcon } from './DesktopIcon';

interface DesktopProps {
  children?: ReactNode;
}

export function Desktop({ children }: DesktopProps) {
  const { desktopIcons, addDesktopIcon } = useDesktopStore();
  const { hideFromDock } = useAppStore();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const appId = e.dataTransfer.getData('application/app-id');

    if (appId) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left - 40; // Center the icon
      const y = e.clientY - rect.top - 22 - 40; // Adjust for menubar and center

      addDesktopIcon(appId, { x, y });
      hideFromDock(appId); // Hide from dock when added to desktop
    }
  };

  return (
    <div
      className="fixed inset-0 overflow-hidden select-none"
      style={{
        backgroundImage: 'linear-gradient(to bottom, #74B0E8, #2E7CBB)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Workspace where windows will be rendered */}
      <div
        className="absolute inset-0"
        style={{ top: '22px', bottom: '0' }}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {/* Desktop Icons */}
        {desktopIcons.map((icon) => (
          <DesktopIcon key={icon.id} desktopIcon={icon} />
        ))}

        {/* Windows */}
        {children}
      </div>
    </div>
  );
}
