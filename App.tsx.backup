import React, { useState, useCallback, useMemo } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View as RNView, StyleSheet } from 'react-native';
import { View, Event, User } from './types';
import { EVENTS, USERS, CALENDARS } from './constants';

// Import components (will be created)
import FeedView from './components/FeedView';
import CalendarView from './components/CalendarView';
import CreateEventView from './components/CreateEventView';
import MapView from './components/MapView';
import SettingsView from './components/SettingsView';

// Import icons
import CalendarIcon from './components/icons/CalendarIcon';
import ListIcon from './components/icons/ListIcon';
import MapIcon from './components/icons/MapIcon';
import PlusIcon from './components/icons/PlusIcon';
import SettingsIcon from './components/icons/SettingsIcon';

const Tab = createBottomTabNavigator();

export default function App() {
  const [events, setEvents] = useState<Event[]>(EVENTS);
  const [users, setUsers] = useState(USERS);
  const [activeCalendarId, setActiveCalendarId] = useState('family');
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
  }, [events, activeCalendarId]);

  const handleEventSelect = (event: Event) => {
    const eventDate = new Date(event.startDate + 'T00:00:00');
    setCalendarDate(eventDate);
    setDetailDrawerDate(eventDate);
  };

  const handleStartEdit = (event: Event) => {
    setEventToEdit(event);
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

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: '#3B82F6',
            tabBarInactiveTintColor: '#9CA3AF',
            headerShown: false,
            tabBarStyle: styles.tabBar,
          }}
        >
          <Tab.Screen
            name="Feed"
            options={{
              tabBarIcon: ({ color, size }) => <ListIcon width={size} height={size} color={color} />,
            }}
          >
            {() => <FeedView events={calendarEvents} users={users} onEventSelect={handleEventSelect} />}
          </Tab.Screen>

          <Tab.Screen
            name="Calendar"
            options={{
              tabBarIcon: ({ color, size }) => <CalendarIcon width={size} height={size} color={color} />,
            }}
          >
            {() => (
              <CalendarView
                events={calendarEvents}
                users={users}
                currentDate={calendarDate}
                setCurrentDate={setCalendarDate}
                selectedDate={detailDrawerDate}
                setSelectedDate={setDetailDrawerDate}
                onStartEdit={handleStartEdit}
                activeCalendarName={activeCalendar.name}
              />
            )}
          </Tab.Screen>

          <Tab.Screen
            name="Create"
            options={{
              tabBarIcon: ({ color, size }) => <PlusIcon width={size} height={size} color={color} />,
              tabBarButton: (props) => (
                <RNView style={styles.createButton}>
                  {/* @ts-ignore */}
                  <RNView {...props} />
                </RNView>
              ),
            }}
          >
            {() => (
              <CreateEventView
                onSave={handleSaveEvent}
                users={users}
                currentUser={users[0]}
                eventToEdit={eventToEdit}
              />
            )}
          </Tab.Screen>

          <Tab.Screen
            name="Map"
            options={{
              tabBarIcon: ({ color, size }) => <MapIcon width={size} height={size} color={color} />,
            }}
          >
            {() => <MapView events={calendarEvents} users={activeCalendarUsers} />}
          </Tab.Screen>

          <Tab.Screen
            name="Settings"
            options={{
              tabBarIcon: ({ color, size }) => <SettingsIcon width={size} height={size} color={color} />,
            }}
          >
            {() => <SettingsView users={users} setUsers={setUsers} />}
          </Tab.Screen>
        </Tab.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    height: 60,
    paddingBottom: 5,
    paddingTop: 5,
  },
  createButton: {
    marginTop: -10,
  },
});
