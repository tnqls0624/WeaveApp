import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { Event, User } from '../types';
import ClockIcon from './icons/ClockIcon';

interface FeedViewProps {
  events: Event[];
  users: User[];
  onEventSelect: (event: Event) => void;
}

const FeedView: React.FC<FeedViewProps> = ({ events, users, onEventSelect }) => {
  const upcomingEvents = events
    .filter(event => {
      if (event.startTime) {
        const eventDateTime = new Date(`${event.startDate}T${event.startTime}`);
        return eventDateTime >= new Date();
      } else {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const eventEndDate = event.endDate ? new Date(event.endDate + 'T00:00:00') : new Date(event.startDate + 'T00:00:00');
        return eventEndDate >= today;
      }
    })
    .sort((a, b) => {
      const dateA = a.startTime ? new Date(`${a.startDate}T${a.startTime}`) : new Date(a.startDate + 'T00:00:00');
      const dateB = b.startTime ? new Date(`${b.startDate}T${b.startTime}`) : new Date(b.startDate + 'T00:00:00');
      return dateA.getTime() - dateB.getTime();
    });

  const getUser = (id: string) => users.find(u => u.id === id);

  const getEventColor = (event: Event) => {
    const currentUser = users.find(u => u.id === 'user1');
    if (event.participantIds.includes(currentUser!.id)) {
      return getColorHex(currentUser!.color);
    }
    const firstParticipant = users.find(u => u.id === event.participantIds[0]);
    return getColorHex(firstParticipant?.color || 'gray');
  };

  const getColorHex = (colorName: string): string => {
    const colors: { [key: string]: string } = {
      blue: '#3B82F6',
      emerald: '#10B981',
      orange: '#F97316',
      violet: '#8B5CF6',
      gray: '#6B7280',
    };
    return colors[colorName] || colors.gray;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.getTime() === today.getTime()) {
      return 'Today';
    }
    if (date.getTime() === tomorrow.getTime()) {
      return 'Tomorrow';
    }
    return date.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Upcoming</Text>
        {upcomingEvents.length > 0 ? (
          upcomingEvents.map(event => {
            const participants = event.participantIds.map(getUser).filter(Boolean) as User[];
            const eventColor = getEventColor(event);

            return (
              <TouchableOpacity
                key={event.id}
                onPress={() => onEventSelect(event)}
                style={[styles.eventCard, { borderLeftColor: eventColor }]}
              >
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text style={[styles.eventDate, { color: eventColor }]}>{formatDate(event.startDate)}</Text>

                <View style={styles.eventDetails}>
                  {event.startTime && (
                    <View style={styles.timeContainer}>
                      <ClockIcon width={16} height={16} color="#6B7280" />
                      <Text style={styles.timeText}>
                        {event.startTime} {event.endTime && `- ${event.endTime}`}
                      </Text>
                    </View>
                  )}
                  {event.description && <Text style={styles.description}>{event.description}</Text>}
                  <View style={styles.participantsContainer}>
                    {participants.map((p, index) => (
                      <Image
                        key={p.id}
                        source={{ uri: p.avatarUrl }}
                        style={[styles.avatar, { marginLeft: index > 0 ? -8 : 0 }]}
                      />
                    ))}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No upcoming events.</Text>
            <Text style={styles.emptySubtext}>Create one from the '+' button below!</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  eventCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  eventDate: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  eventDetails: {
    marginTop: 8,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  timeText: {
    fontSize: 14,
    color: '#4B5563',
    marginLeft: 8,
  },
  description: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 8,
  },
  participantsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 64,
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9CA3AF',
  },
});

export default FeedView;
