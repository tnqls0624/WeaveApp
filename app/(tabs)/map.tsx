import React, { useState, useMemo } from 'react';
import MapView from '../../components/MapView';
import { EVENTS, USERS } from '../../constants';
import type { Event } from '../../types';

export default function MapScreen() {
  const [events] = useState<Event[]>(EVENTS);
  const [users] = useState(USERS);
  const [activeCalendarId] = useState('family');

  const calendarEvents = events.filter(event => event.calendarId === activeCalendarId);

  const activeCalendarUsers = useMemo(() => {
    const participantIds = new Set(calendarEvents.flatMap(event => event.participantIds));
    const currentUser = users.find(u => u.id === 'user1');
    if (currentUser) {
      participantIds.add(currentUser.id);
    }
    return users.filter(user => participantIds.has(user.id));
  }, [calendarEvents, users]);

  return <MapView events={calendarEvents} users={activeCalendarUsers} />;
}
