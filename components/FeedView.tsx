import React from 'react';
import type { Event, User } from '../types';
import ClockIcon from './icons/ClockIcon';
import MapIcon from './icons/MapIcon';

interface FeedViewProps {
  events: Event[];
  users: User[];
  onEventSelect: (event: Event) => void;
}

const FeedView: React.FC<FeedViewProps> = ({ events, users, onEventSelect }) => {
  const upcomingEvents = events
    .filter(event => {
      if (event.startTime) {
        // For timed events, compare the full date and time
        const eventDateTime = new Date(`${event.startDate}T${event.startTime}`);
        return eventDateTime >= new Date();
      } else {
        // For all-day events, check if the event's end date is today or in the future
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set time to midnight for date-only comparison
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

  const getEventColorName = (event: Event) => {
    const currentUser = users.find(u => u.id === 'user1');
    if (event.participantIds.includes(currentUser!.id)) {
      return currentUser!.color;
    }
    const firstParticipant = users.find(u => u.id === event.participantIds[0]);
    return firstParticipant?.color || 'gray';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00');
    const today = new Date();
    today.setHours(0,0,0,0);
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
    <div>
       <h1 className="text-2xl font-bold text-gray-800 mb-4">Upcoming</h1>
      <div className="space-y-4">
        {upcomingEvents.length > 0 ? (
          upcomingEvents.map(event => {
            const participants = event.participantIds.map(getUser).filter(Boolean) as User[];
            const eventColor = getEventColorName(event);
            const borderColorClass = `border-${eventColor}-500`;
            const textColorClass = `text-${eventColor}-600`;

            return (
              <button key={event.id} onClick={() => onEventSelect(event)} className={`w-full text-left bg-white p-4 rounded-lg shadow-md border-l-4 ${borderColorClass}`}>
                <p className="font-semibold text-gray-800 text-lg">{event.title}</p>
                 <p className={`font-semibold text-sm ${textColorClass} mb-2`}>{formatDate(event.startDate)}</p>
                
                <div className="text-gray-600 space-y-2 mt-3">
                  {event.startTime && (
                    <div className="flex items-center text-sm">
                      <ClockIcon className="w-4 h-4 mr-2" />
                      <span>{event.startTime} {event.endTime && `- ${event.endTime}`}</span>
                    </div>
                  )}
                  {event.description && <p className="text-sm">{event.description}</p>}
                   <div className="flex items-center pt-2">
                      {participants.map(p => (
                          <img key={p.id} src={p.avatarUrl} alt={p.name} className="w-7 h-7 rounded-full -mr-2 border-2 border-white"/>
                      ))}
                  </div>
                </div>
              </button>
            );
          })
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500">No upcoming events.</p>
            <p className="text-gray-400 text-sm">Create one from the '+' button below!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedView;