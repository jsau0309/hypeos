import { useState } from 'react';
import { motion } from 'framer-motion';
import type { App } from '../../types/app';
import * as LucideIcons from 'lucide-react';

interface DockIconProps {
  app: App;
  isRunning: boolean;
  onClick: () => void;
}

export function DockIcon({ app, isRunning, onClick }: DockIconProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Get icon component from lucide-react
  const IconComponent = (LucideIcons as any)[app.icon] || LucideIcons.Square;

  return (
    <div className="relative flex flex-col items-center">
      <motion.div
        className="relative cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
        whileHover={{ scale: 1.3 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        <div className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-300 rounded-xl shadow-lg flex items-center justify-center border border-gray-400/50">
          <IconComponent className="w-8 h-8 text-gray-700" />
        </div>

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
