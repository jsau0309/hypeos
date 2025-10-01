import { useState } from 'react';
import { Apple } from 'lucide-react';

export function AppleMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: 'About This Mac', action: () => console.log('About clicked') },
    { divider: true },
    { label: 'System Preferences...', action: () => console.log('Preferences clicked') },
    { divider: true },
    { label: 'Sleep', action: () => console.log('Sleep clicked') },
    { label: 'Restart...', action: () => console.log('Restart clicked') },
    { label: 'Shut Down...', action: () => console.log('Shut Down clicked') },
  ];

  return (
    <div className="relative">
      <div
        className="h-[22px] flex items-center px-3 cursor-pointer hover:bg-white/20 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Apple className="w-4 h-4" fill="white" />
      </div>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-[22px] left-0 w-56 bg-white/95 backdrop-blur-md rounded-b-lg shadow-lg border border-gray-300 z-50 py-1">
            {menuItems.map((item, index) => (
              item.divider ? (
                <div key={index} className="h-px bg-gray-300 my-1" />
              ) : (
                <div
                  key={index}
                  className="px-4 py-1.5 text-black text-sm hover:bg-aqua-blue hover:text-white cursor-pointer"
                  onClick={() => {
                    item.action?.();
                    setIsOpen(false);
                  }}
                >
                  {item.label}
                </div>
              )
            ))}
          </div>
        </>
      )}
    </div>
  );
}
