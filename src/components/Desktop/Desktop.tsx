import { ReactNode } from 'react';

interface DesktopProps {
  children?: ReactNode;
}

export function Desktop({ children }: DesktopProps) {
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
      <div className="absolute inset-0" style={{ top: '22px', bottom: '0' }}>
        {children}
      </div>
    </div>
  );
}
