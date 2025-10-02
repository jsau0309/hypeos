import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import type { WindowState } from '../../types/window';

interface MinimizedWindowProps {
  window: WindowState;
  onClick: () => void;
  mouseX: number | null;
  dockRef: React.RefObject<HTMLDivElement | null>;
}

export function MinimizedWindow({ window, onClick, mouseX, dockRef }: MinimizedWindowProps) {
  const iconRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (mouseX === null || !iconRef.current || !dockRef.current) {
      setScale(1);
      return;
    }

    const iconRect = iconRef.current.getBoundingClientRect();
    const iconCenterX = iconRect.left + iconRect.width / 2 - dockRef.current.getBoundingClientRect().left;
    const distance = Math.abs(mouseX - iconCenterX);

    // Zoom effect based on distance
    const maxDistance = 150;
    const maxScale = 1.5;
    const minScale = 1;

    if (distance < maxDistance) {
      const scale = minScale + (maxScale - minScale) * (1 - distance / maxDistance);
      setScale(scale);
    } else {
      setScale(minScale);
    }
  }, [mouseX, dockRef]);

  return (
    <motion.div
      ref={iconRef}
      layout
      layoutId={`minimized-${window.id}`}
      className="relative cursor-pointer flex flex-col items-center"
      onClick={onClick}
      style={{
        scale,
        transformOrigin: 'bottom center',
      }}
      transition={{
        scale: { type: 'spring', stiffness: 400, damping: 25 },
        layout: { type: 'spring', stiffness: 300, damping: 30 },
      }}
    >
      {/* Minimized window thumbnail */}
      <div className="bg-white/80 backdrop-blur-sm border border-white/60 rounded shadow-md overflow-hidden"
        style={{
          width: 48,
          height: 36,
        }}
      >
        <div className="w-full h-2 bg-gradient-to-b from-blue-500 to-blue-600 flex items-center px-1 gap-0.5">
          <div className="w-1 h-1 rounded-full bg-red-500" />
          <div className="w-1 h-1 rounded-full bg-yellow-500" />
          <div className="w-1 h-1 rounded-full bg-green-500" />
        </div>
        <div className="p-1 text-[6px] text-gray-700 truncate">
          {window.title}
        </div>
      </div>
    </motion.div>
  );
}
