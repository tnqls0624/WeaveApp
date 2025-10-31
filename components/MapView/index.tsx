import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import type { Event, User } from '../../types';

interface MapViewComponentProps {
  events: Event[];
  users: User[];
}

const MapViewComponent: React.FC<MapViewComponentProps> = ({ events, users }) => {
  // Filter events with location
  const eventsWithLocation = events.filter(event => event.location);
  
  // Get initial region from first user with location
  const initialRegion = users.find(u => u.initialLocation)?.initialLocation || {
    latitude: 37.7749,
    longitude: -122.4194,
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: initialRegion.latitude,
          longitude: initialRegion.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {eventsWithLocation.map(event => (
          <Marker
            key={event.id}
            coordinate={{
              latitude: event.location!.latitude,
              longitude: event.location!.longitude,
            }}
            title={event.title}
            description={event.description}
          />
        ))}
        
        {users.map(user => {
          const location = user.location || user.initialLocation;
          if (!location) return null;
          
          return (
            <Marker
              key={user.id}
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title={user.name}
              pinColor={getColorHex(user.color)}
            />
          );
        })}
      </MapView>
      
      {eventsWithLocation.length === 0 && (
        <View style={styles.overlay}>
          <View style={styles.message}>
            <Text style={styles.messageText}>No events with location yet</Text>
            <Text style={styles.messageSubtext}>Add location to events to see them on the map</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'none',
  },
  message: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  messageText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  messageSubtext: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
});

export default MapViewComponent;
