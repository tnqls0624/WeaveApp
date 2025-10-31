import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { Event, User } from '../../types';

interface CalendarViewProps {
  events: Event[];
  users: User[];
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  onStartEdit: (event: Event) => void;
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
  activeCalendarName,
}) => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>{activeCalendarName}</Text>
        <Text style={styles.subtitle}>
          {currentDate.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
        </Text>
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>Calendar View</Text>
          <Text style={styles.placeholderSubtext}>Calendar grid will be implemented here</Text>
          <Text style={styles.eventsCount}>{events.length} events in this calendar</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 4,
  },
  content: {
    flex: 1,
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    marginTop: 64,
  },
  placeholderText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  placeholderSubtext: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  eventsCount: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '500',
  },
});

export default CalendarView;
