import React, { useState } from 'react';
import CalendarView from '../../components/CalendarView';
import { EVENTS, USERS, CALENDARS } from '../../constants';
import type { Event } from '../../types';

export default function CalendarScreen() {
  const [events] = useState<Event[]>(EVENTS);
  const [users] = useState(USERS);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [activeCalendarId] = useState('family');

  const handleStartEdit = (event: Event) => {
    // Navigate to create screen with event to edit
    console.log('Edit event:', event);
  };

  const activeCalendar = CALENDARS.find(c => c.id === activeCalendarId) || CALENDARS[0];
  const calendarEvents = events.filter(event => event.calendarId === activeCalendarId);

  return (
    <CalendarView
      events={calendarEvents}
      users={users}
      currentDate={currentDate}
      setCurrentDate={setCurrentDate}
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}
      onStartEdit={handleStartEdit}
      activeCalendarName={activeCalendar.name}
    />
  );
}
