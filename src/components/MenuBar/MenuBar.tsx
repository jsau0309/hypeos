import { useState, useEffect } from 'react';
import { Apple } from 'lucide-react';
import { AppleMenu } from './AppleMenu';
import { SystemIcons } from './SystemIcons';
import { useAppStore } from '../../stores/appStore';

export function MenuBar() {
  return (
    <div className="fixed top-0 left-0 right-0 h-[22px] bg-aqua-menubar z-50 flex items-center px-2 text-white text-sm shadow-md select-none">
      {/* Apple Menu */}
      <AppleMenu />

      {/* System Menus - Always visible */}
      <div className="flex items-center h-full">
        <MenuBarItem label="File" />
        <MenuBarItem label="Edit" />
        <MenuBarItem label="View" />
        <MenuBarItem label="Go" />
        <MenuBarItem label="Help" />
      </div>

      {/* System Icons (right side) */}
      <div className="ml-auto">
        <SystemIcons />
      </div>
    </div>
  );
}

interface MenuBarItemProps {
  label: string;
}

function MenuBarItem({ label }: MenuBarItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="h-full flex items-center px-3 cursor-pointer hover:bg-white/20 transition-colors"
      onClick={() => setIsOpen(!isOpen)}
    >
      {label}
    </div>
  );
}
