import React, { useState } from 'react';
import FeedView from '../../components/FeedView';
import { EVENTS, USERS } from '../../constants';
import type { Event } from '../../types';
import { useRouter } from 'expo-router';

export default function FeedScreen() {
  const [events] = useState<Event[]>(EVENTS);
  const [users] = useState(USERS);
  const router = useRouter();

  const handleEventSelect = (event: Event) => {
    // Navigate to calendar with the selected date
    router.push('/calendar');
  };

  // Filter events for the active calendar (family)
  const calendarEvents = events.filter(event => event.calendarId === 'family');

  return <FeedView events={calendarEvents} users={users} onEventSelect={handleEventSelect} />;
}
