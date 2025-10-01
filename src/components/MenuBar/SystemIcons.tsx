import { useState, useEffect } from 'react';
import { Volume2 } from 'lucide-react';

function getFormattedDateTime(): string {
  const now = new Date();
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const dayName = days[now.getDay()];
  const monthName = months[now.getMonth()];
  const date = now.getDate();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;

  return `${dayName} ${monthName} ${date} ${displayHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
}

export function SystemIcons() {
  const [dateTime, setDateTime] = useState(getFormattedDateTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(getFormattedDateTime());
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center space-x-3">
      {/* Volume Icon */}
      <div className="cursor-pointer hover:bg-white/20 px-1 py-0.5 rounded">
        <Volume2 className="w-4 h-4" />
      </div>

      {/* Date and Time */}
      <div className="text-xs font-medium px-2">
        {dateTime}
      </div>
    </div>
  );
}
