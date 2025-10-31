import React, { useState } from 'react';
import type { Event, User } from '../../types';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import DayDetailDrawer from './DayDetailDrawer';
import MonthYearPicker from './MonthYearPicker';

interface CalendarViewProps {
  events: Event[];
  users: User[];
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  onStartEdit: (event: Event) => void;
  onOpenSidebar: () => void;
  onOpenSearch: () => void;
  activeCalendarName: string;
}

const CalendarView: React.FC<CalendarViewProps> = ({ 
  events, 
  users, 
  currentDate, 
  setCurrentDate, 
  selectedDate, 
  setSelectedDate,
  onStartEdit,
  onOpenSidebar,
  onOpenSearch,
  activeCalendarName
}) => {
  
  const [filteredUserIds, setFilteredUserIds] = useState<string[]>(users.map(u => u.id));
  const [isMonthPickerOpen, setIsMonthPickerOpen] = useState(false);
  const [animationDirection, setAnimationDirection] = useState<'left' | 'right' | null>(null);

  const filteredEvents = events.filter(event => 
    event.participantIds.some(id => filteredUserIds.includes(id))
  );

  const handleSelectDay = (day: Date) => {
    setSelectedDate(day);
  };

  const handleCloseDrawer = () => {
    setSelectedDate(null);
  };
  
  const handleChangeMonth = (amount: number) => {
    setAnimationDirection(amount > 0 ? 'right' : 'left');
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + amount);
    setCurrentDate(newDate);
  };

  const handleTitleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsMonthPickerOpen(prev => !prev);
  }


  return (
    <div className="flex flex-col flex-grow relative">
      <CalendarHeader 
        currentDate={currentDate} 
        onOpenSidebar={onOpenSidebar}
        onOpenSearch={onOpenSearch}
        activeCalendarName={activeCalendarName}
        onTitleClick={handleTitleClick}
        isPickerOpen={isMonthPickerOpen}
      />
      {isMonthPickerOpen && (
        <MonthYearPicker
          currentDate={currentDate}
          onDateSelect={(date) => {
            setCurrentDate(date);
            setIsMonthPickerOpen(false);
          }}
          onClose={() => setIsMonthPickerOpen(false)}
        />
      )}
      <CalendarGrid
        currentDate={currentDate}
        events={filteredEvents}
        onSelectDay={handleSelectDay}
        users={users}
        currentUser={users.find(u => u.id === 'user1')!}
        onChangeMonth={handleChangeMonth}
        animationDirection={animationDirection}
        onAnimationEnd={() => setAnimationDirection(null)}
      />
      {selectedDate && (
        <DayDetailDrawer
          date={selectedDate}
          events={filteredEvents}
          onClose={handleCloseDrawer}
          users={users}
          currentUser={users.find(u => u.id === 'user1')!}
          onStartEdit={onStartEdit}
        />
      )}
    </div>
  );
};

export default CalendarView;