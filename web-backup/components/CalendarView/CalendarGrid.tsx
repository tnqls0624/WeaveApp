import React, { useState } from 'react';
import type { Event, User } from '../../types';

interface CalendarGridProps {
  currentDate: Date;
  events: Event[];
  users: User[];
  currentUser: User;
  onSelectDay: (date: Date) => void;
  onChangeMonth: (amount: number) => void;
  animationDirection: 'left' | 'right' | null;
  onAnimationEnd: () => void;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ 
  currentDate, 
  events, 
  users, 
  currentUser, 
  onSelectDay,
  onChangeMonth,
  animationDirection,
  onAnimationEnd
}) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const MAX_EVENT_LEVEL = 2; // Corresponds to 3 events shown (levels 0, 1, 2)
  const [dragStartX, setDragStartX] = useState<number | null>(null);

  const handleDragStart = (clientX: number) => {
    setDragStartX(clientX);
  };

  const handleDragEnd = (clientX: number) => {
    if (dragStartX === null) return;
    const deltaX = dragStartX - clientX;
    const swipeThreshold = 50; // pixels
    if (Math.abs(deltaX) > swipeThreshold) {
      onChangeMonth(deltaX > 0 ? 1 : -1);
    }
    setDragStartX(null);
  };


  const getEventColor = (event: Event): string => {
    let colorName = 'gray';
    if (event.participantIds.includes(currentUser.id)) {
      colorName = currentUser.color;
    } else if (event.participantIds.length > 0) {
      const firstParticipant = users.find(u => u.id === event.participantIds[0]);
      if (firstParticipant) {
        colorName = firstParticipant.color;
      }
    }
    
    const colorMap: { [key: string]: string } = {
        blue: '#60a5fa',
        emerald: '#34d399',
        orange: '#fb923c',
        violet: '#a78bfa',
        red: '#f87171',
        amber: '#fbbf24',
        yellow: '#facc15',
        lime: '#a3e635',
        green: '#4ade80',
        teal: '#2dd4bf',
        cyan: '#22d3ee',
        indigo: '#818cf8',
        purple: '#c084fc',
        fuchsia: '#e879f9',
        pink: '#f472b6',
        rose: '#fb7185',
        gray: '#9ca3af',
    };
    return colorMap[colorName] || colorMap['gray'];
  };

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const startDate = new Date(firstDayOfMonth);
  startDate.setDate(startDate.getDate() - startDate.getDay());

  const endDate = new Date(lastDayOfMonth);
  if (endDate.getDay() !== 6) {
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));
  }

  const days: Date[] = [];
  let day = new Date(startDate);
  while (day <= endDate) {
    days.push(new Date(day));
    day.setDate(day.getDate() + 1);
  }

  const weeks: Date[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

  const eventLayout = weeks.map(week => {
    const weekStart = week[0];
    const weekEnd = week[6];
    
    const weeklyEvents = events.filter(e => {
      const eventStart = new Date(e.startDate + 'T00:00:00');
      const eventEnd = new Date((e.endDate || e.startDate) + 'T00:00:00');
      return eventStart <= weekEnd && eventEnd >= weekStart;
    }).sort((a, b) => {
        const durationA = (new Date((a.endDate || a.startDate)).getTime() - new Date(a.startDate).getTime());
        const durationB = (new Date((b.endDate || b.startDate)).getTime() - new Date(b.startDate).getTime());
        if (durationA !== durationB) return durationB - durationA;
        return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    });

    const layoutForWeek: { event: Event; startCol: number; span: number; level: number }[] = [];
    const occupiedLevels: (boolean)[][] = Array(7).fill(null).map(() => []);

    for (const event of weeklyEvents) {
      const eventStart = new Date(event.startDate + 'T00:00:00');
      const eventEnd = new Date((event.endDate || event.startDate) + 'T00:00:00');

      const startCol = eventStart > weekStart ? eventStart.getDay() : 0;
      const endCol = eventEnd < weekEnd ? eventEnd.getDay() : 6;
      
      let level = 0;
      while (true) {
        let isOccupied = false;
        for (let col = startCol; col <= endCol; col++) {
          if (occupiedLevels[col][level]) {
            isOccupied = true;
            break;
          }
        }
        if (!isOccupied) break;
        level++;
      }

      for (let col = startCol; col <= endCol; col++) {
        occupiedLevels[col][level] = true;
      }
      
      const span = endCol - startCol + 1;
      layoutForWeek.push({ event, startCol, span, level });
    }
    return layoutForWeek;
  });

  return (
    <div 
        className="flex flex-col flex-grow"
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
        onTouchEnd={(e) => handleDragEnd(e.changedTouches[0].clientX)}
        onMouseDown={(e) => {
          e.preventDefault();
          handleDragStart(e.clientX);
        }}
        onMouseUp={(e) => handleDragEnd(e.clientX)}
        onMouseLeave={() => setDragStartX(null)}
    >
      <div className="grid grid-cols-7 text-center text-xs text-gray-500 font-semibold border-b border-gray-200">
        {dayNames.map((d, i) => (
          <div 
            key={d} 
            className={`py-2 ${i === 0 ? 'text-red-500' : ''} ${i === 6 ? 'text-blue-500' : ''}`}
          >
            {d}
          </div>
        ))}
      </div>
       <div className="relative flex-grow overflow-hidden">
        <div
            key={currentDate.getTime()}
            onAnimationEnd={onAnimationEnd}
            className={`absolute inset-0 ${animationDirection === 'right' ? 'animate-slide-in-right' : animationDirection === 'left' ? 'animate-slide-in-left' : ''}`}
        >
            <div className="relative grid grid-cols-7 h-full" style={{ gridTemplateRows: `repeat(${weeks.length}, minmax(0, 1fr))` }}>
                {days.map((d, index) => {
                const isCurrentMonth = d.getMonth() === month;
                const isToday = new Date().toDateString() === d.toDateString();
                const dayOfWeek = d.getDay();
                const weekIndex = Math.floor(index / 7);
                
                let dateColorClass = isCurrentMonth ? 'text-gray-700' : 'text-gray-300';
                if (isCurrentMonth) {
                    if (dayOfWeek === 0) dateColorClass = 'text-red-500';
                    if (dayOfWeek === 6) dateColorClass = 'text-blue-500';
                }

                return (
                    <div
                    key={index}
                    className={`relative border-gray-200/80 p-1 text-sm ${ (index + 1) % 7 !== 0 ? 'border-r' : '' } ${ weekIndex < weeks.length - 1 ? 'border-b' : '' }`}
                    onClick={() => onSelectDay(d)}
                    >
                    <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs ${isToday ? 'bg-yellow-400 text-white font-bold' : ''} ${dateColorClass}`}>
                        {d.getDate()}
                    </span>
                    </div>
                );
                })}

                <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none grid" style={{ gridTemplateRows: `repeat(${weeks.length}, minmax(0, 1fr))`}}>
                {weeks.map((week, weekIndex) => (
                    <div key={weekIndex} className="relative overflow-hidden">
                    {eventLayout[weekIndex].map(({ event, startCol, span, level }) => {
                        if (level > MAX_EVENT_LEVEL) {
                            return null;
                        }
                        const eventStart = new Date(event.startDate + 'T00:00:00');
                        const showTitle = eventStart.getDay() === startCol || startCol === 0;

                        return (
                            <div
                                key={event.id + '-' + weekIndex}
                                className="absolute text-white text-xs font-medium px-2 py-0.5 rounded flex items-center cursor-pointer"
                                style={{
                                    backgroundColor: getEventColor(event),
                                    top: `${1.75 + level * 1.4}rem`,
                                    left: `calc(${(100 / 7) * startCol}% + 2px)`,
                                    width: `calc(${(100 / 7) * span}% - 4px)`,
                                    pointerEvents: 'auto'
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onSelectDay(new Date(event.startDate + 'T00:00:00'));
                                }}
                            >
                                <span className="truncate">{showTitle && event.title}</span>
                            </div>
                        );
                    })}
                    </div>
                ))}
                </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default CalendarGrid;