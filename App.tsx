import React, { useState, useCallback, useMemo } from 'react';
import { View, Event, Calendar, User } from './types';
import { EVENTS, USERS, CALENDARS } from './constants';
import BottomNav from './components/BottomNav';
import FeedView from './components/FeedView';
import CalendarView from './components/CalendarView';
import CreateEventView from './components/CreateEventView';
import MapView from './components/MapView';
import SettingsView from './components/SettingsView';
import Sidebar from './components/Sidebar';
import SearchView from './components/SearchView';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('calendar');
  const [events, setEvents] = useState<Event[]>(EVENTS);
  const [users, setUsers] = useState(USERS);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeCalendarId, setActiveCalendarId] = useState('family');
  
  // State for controlling the calendar from other components
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [detailDrawerDate, setDetailDrawerDate] = useState<Date | null>(null);

  const [eventToEdit, setEventToEdit] = useState<Event | null>(null);

  const handleSaveEvent = useCallback((eventData: Omit<Event, 'id' | 'calendarId'>, eventId?: string) => {
    if (eventId) {
      setEvents(prevEvents =>
        prevEvents.map(event =>
          event.id === eventId ? { ...event, ...eventData, id: eventId, calendarId: event.calendarId } : event
        ).sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
      );
    } else {
      const newEvent: Event = {
        ...eventData,
        calendarId: activeCalendarId,
        id: (Math.max(...events.map(e => parseInt(e.id, 10)), 0) + 1).toString(),
      };
      setEvents(prevEvents => [...prevEvents, newEvent].sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()));
    }
    setEventToEdit(null);
    setActiveView('calendar');
  }, [events, activeCalendarId]);

  const handleEventSelect = (event: Event) => {
    const eventDate = new Date(event.startDate + 'T00:00:00');
    setCalendarDate(eventDate);
    setDetailDrawerDate(eventDate);
    setActiveView('calendar');
  };

  const handleStartEdit = (event: Event) => {
    setEventToEdit(event);
    setActiveView('create');
  };

  const handleSetActiveView = (view: View) => {
    if (activeView === 'create' && view !== 'create') {
        setEventToEdit(null);
    }
    setActiveView(view);
  };
  
  const handleSelectCalendar = (calendarId: string) => {
      setActiveCalendarId(calendarId);
      setIsSidebarOpen(false);
  };
  
  const activeCalendar = CALENDARS.find(c => c.id === activeCalendarId) || CALENDARS[0];
  const calendarEvents = events.filter(event => event.calendarId === activeCalendarId);
  
  const activeCalendarUsers = useMemo(() => {
    const participantIds = new Set(calendarEvents.flatMap(event => event.participantIds));
    const currentUser = users.find(u => u.id === 'user1');
    if (currentUser) {
        participantIds.add(currentUser.id);
    }
    return users.filter(user => participantIds.has(user.id));
  }, [calendarEvents, users]);


  const renderView = () => {
    switch (activeView) {
      case 'feed':
        return <FeedView events={calendarEvents} users={users} onEventSelect={handleEventSelect} />;
      case 'calendar':
        return (
          <CalendarView 
            events={calendarEvents} 
            users={users} 
            currentDate={calendarDate}
            setCurrentDate={setCalendarDate}
            selectedDate={detailDrawerDate}
            setSelectedDate={setDetailDrawerDate}
            onStartEdit={handleStartEdit}
            onOpenSidebar={() => setIsSidebarOpen(true)}
            onOpenSearch={() => setIsSearchOpen(true)}
            activeCalendarName={activeCalendar.name}
          />
        );
      case 'create':
        return <CreateEventView onSave={handleSaveEvent} users={users} currentUser={users[0]} setActiveView={handleSetActiveView} eventToEdit={eventToEdit} />;
      case 'map':
        return <MapView events={calendarEvents} users={activeCalendarUsers} />;
      case 'settings':
        return <SettingsView users={users} setUsers={setUsers}/>;
      default:
        return (
          <CalendarView 
            events={calendarEvents} 
            users={users} 
            currentDate={calendarDate}
            setCurrentDate={setCalendarDate}
            selectedDate={detailDrawerDate}
            setSelectedDate={setDetailDrawerDate}
            onStartEdit={handleStartEdit}
            onOpenSidebar={() => setIsSidebarOpen(true)}
            onOpenSearch={() => setIsSearchOpen(true)}
            activeCalendarName={activeCalendar.name}
          />
        );
    }
  };

  const isCalendarView = activeView === 'calendar';
  const isMapView = activeView === 'map';
  const isFullScreenView = isCalendarView || isMapView;

  const mainClassName = isMapView
    ? ""
    : isCalendarView
    ? "container mx-auto pt-4"
    : "container mx-auto px-4 pt-4";
  
  const mainLayoutClasses = isFullScreenView
    ? "flex-grow flex flex-col"
    : "flex-grow overflow-y-auto";

  return (
    <div className="min-h-screen flex flex-col">
      <Sidebar 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        calendars={CALENDARS}
        activeCalendarId={activeCalendarId}
        onSelectCalendar={handleSelectCalendar}
        currentUser={users[0]}
      />
      <main className={`${mainClassName} ${mainLayoutClasses} pb-16`}>
        {renderView()}
      </main>
      <SearchView
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        events={calendarEvents}
        onEventSelect={handleEventSelect}
      />
      <BottomNav activeView={activeView} setView={handleSetActiveView} />
    </div>
  );
};

export default App;