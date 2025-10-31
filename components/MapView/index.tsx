import React from 'react';
import type { Event, User } from '../../types';
import useGeolocation from '../../hooks/useGeolocation';
import useSimulatedUsersLocation from '../../hooks/useSimulatedUsersLocation';
import UserMarker from './UserMarker';

interface MapViewProps {
  events: Event[];
  users: User[];
}

const MapView: React.FC<MapViewProps> = ({ events, users }) => {
  const currentUser = users.find(u => u.id === 'user1')!;
  const otherUsers = users.filter(u => u.id !== 'user1');

  const { position: userPosition, error: geoError } = useGeolocation();
  const simulatedUsers = useSimulatedUsersLocation(otherUsers, userPosition);

  // Center of the map, defaults to SF or current user's initial location
  const mapCenter = userPosition || currentUser.initialLocation || { latitude: 37.7749, longitude: -122.4194 };
  
  const allUsersWithLocation = [
    { ...currentUser, location: userPosition || currentUser.initialLocation },
    ...simulatedUsers,
  ].filter(u => u.location);

  return (
    <div className="flex flex-col flex-grow">
      <h1 className="text-2xl font-bold text-slate-800 mb-4 flex-shrink-0 px-4 pt-4">Map</h1>
      <div className="relative bg-blue-50 w-full shadow-subtle overflow-hidden flex-grow">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-40">
            <svg width="100%" height="100%">
                <defs>
                    <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                        <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#e0e7ff" strokeWidth="1"/>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
        </div>
        
        {geoError && <p className="absolute top-2 left-2 bg-rose-100 text-rose-700 p-2 rounded-md text-sm z-10">{geoError}</p>}
        
        <div className="absolute inset-0 z-10">
          {allUsersWithLocation.map(user => user.location && (
            <UserMarker 
              key={user.id} 
              user={user} 
              location={user.location} 
              mapCenter={mapCenter}
              isCurrentUser={user.id === 'user1'}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapView;