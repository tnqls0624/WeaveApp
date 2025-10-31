import React, { useState } from 'react';
import CreateEventView from '../../components/CreateEventView';
import { EVENTS, USERS } from '../../constants';
import type { Event } from '../../types';
import { useRouter } from 'expo-router';

export default function CreateScreen() {
  const [events, setEvents] = useState<Event[]>(EVENTS);
  const [users] = useState(USERS);
  const router = useRouter();

  const handleSaveEvent = (eventData: Omit<Event, 'id' | 'calendarId'>, eventId?: string) => {
    if (eventId) {
      setEvents(prevEvents =>
        prevEvents.map(event =>
          event.id === eventId ? { ...event, ...eventData, id: eventId, calendarId: event.calendarId } : event
        ).sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
      );
    } else {
      const newEvent: Event = {
        ...eventData,
        calendarId: 'family',
        id: (Math.max(...events.map(e => parseInt(e.id, 10)), 0) + 1).toString(),
      };
      setEvents(prevEvents => [...prevEvents, newEvent].sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()));
    }
    
    // Navigate back to calendar
    router.push('/calendar');
  };

  return (
    <CreateEventView
      onSave={handleSaveEvent}
      users={users}
      currentUser={users[0]}
      eventToEdit={null}
    />
  );
}
