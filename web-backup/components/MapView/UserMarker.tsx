import React from 'react';
import type { User, Location } from '../../types';

interface UserMarkerProps {
  user: User;
  location: Location;
  mapCenter: Location;
  isCurrentUser: boolean;
}

const UserMarker: React.FC<UserMarkerProps> = ({ user, location, mapCenter, isCurrentUser }) => {
  const style = {
    left: `calc(50% + ${(location.longitude - mapCenter.longitude) * 2000}px)`,
    top: `calc(50% + ${-(location.latitude - mapCenter.latitude) * 2000}px)`,
    transform: 'translate(-50%, -50%)',
  };

  return (
    <div
      className="absolute transition-all duration-1000 ease-linear"
      style={style}
      title={user.name}
    >
        <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-full shadow-lg p-0.5">
            <div className="relative">
                <img src={user.avatarUrl} alt={user.name} className={`w-9 h-9 rounded-full border-2 bg-white`} style={{ borderColor: `var(--color-${user.color}-500, #64748b)` }} />
                {isCurrentUser && (
                    <div className="absolute inset-0 rounded-full border-2 border-sky-500 animate-pulse"></div>
                )}
            </div>
            <span className="pl-1.5 pr-3 text-sm font-semibold text-gray-800 whitespace-nowrap">{user.name}</span>
        </div>
    </div>
  );
};

export default UserMarker;