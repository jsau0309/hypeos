import { useState } from 'react';
import { motion } from 'framer-motion';
import type { App } from '../../types/app';
import * as LucideIcons from 'lucide-react';

interface DockIconProps {
  app: App;
  isRunning: boolean;
  onClick: () => void;
  onDragStart?: () => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDragEnd?: () => void;
  mouseX: number | null;
  dockRef: React.RefObject<HTMLDivElement>;
  isDraggingAny: boolean;
  isBeingDragged: boolean;
}

export function DockIcon({ app, isRunning, onClick, onDragStart: onDragStartProp, onDragOver: onDragOverProp, onDragEnd: onDragEndProp, isDraggingAny, isBeingDragged }: DockIconProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Get icon component from lucide-react
  const IconComponent = (LucideIcons as any)[app.icon] || LucideIcons.Square;

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('application/app-id', app.id);

    // Create transparent 1x1 pixel to hide drag ghost completely
    const transparentImg = new Image();
    transparentImg.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    e.dataTransfer.setDragImage(transparentImg, 0, 0);

    // Call parent's onDragStart if provided (for reordering)
    onDragStartProp?.();
  };

  return (
    <div className="relative flex flex-col items-center px-1">
      <motion.div
        className="relative cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
        animate={isBeingDragged ? { scale: 1.3, y: -8 } : {}}
        whileHover={!isDraggingAny ? { scale: 1.3, y: -8 } : {}}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        draggable={!app.isPinned}
        onDragStart={handleDragStart}
        onDragOver={onDragOverProp}
        onDragEnd={onDragEndProp}
      >
        {app.iconUrl ? (
          <img
            src={app.iconUrl}
            alt={app.name}
            className="w-14 h-14 pointer-events-none"
            draggable={false}
          />
        ) : (
          <div className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-300 rounded-xl shadow-lg flex items-center justify-center border border-gray-400/50">
            <IconComponent className="w-8 h-8 text-gray-700" />
          </div>
        )}

        {/* Tooltip */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: -10 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800/90 text-white text-xs rounded whitespace-nowrap pointer-events-none"
          >
            {app.name}
          </motion.div>
        )}
      </motion.div>

      {/* Running Indicator */}
      {isRunning && (
        <div className="absolute -bottom-1 w-1 h-1 bg-gray-700 rounded-full" />
      )}
    </div>
  );
}
