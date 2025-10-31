import React, { useState, useEffect } from 'react';
import type { Event, User } from '../../types';
import PencilIcon from '../icons/PencilIcon';

interface DayDetailDrawerProps {
  date: Date;
  events: Event[];
  users: User[];
  currentUser: User;
  onClose: () => void;
  onStartEdit: (event: Event) => void;
}

const DayDetailDrawer: React.FC<DayDetailDrawerProps> = ({ date, events, users, currentUser, onClose, onStartEdit }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animate in after a short delay to allow the component to mount first
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Wait for the animation to finish before calling the actual close handler
    setTimeout(onClose, 300); // Duration should match the CSS transition duration
  };

  const getUser = (id: string) => users.find(u => u.id === id);

  const getEventColor = (event: Event) => {
    if (event.participantIds.includes(currentUser.id)) {
      return currentUser.color;
    }
    const firstParticipant = users.find(u => u.id === event.participantIds[0]);
    return firstParticipant?.color || 'slate';
  };
  
  const dayEvents = events.filter(event => {
    const eventStart = new Date(event.startDate + 'T00:00:00');
    const eventEnd = event.endDate ? new Date(event.endDate + 'T00:00:00') : eventStart;
    const currentDay = new Date(date);
    currentDay.setHours(0, 0, 0, 0);
    return currentDay >= eventStart && currentDay <= eventEnd;
  });

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black z-40 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${isVisible ? 'opacity-40' : 'opacity-0'}`} 
        onClick={handleClose}
        aria-hidden="true"
      ></div>
      <div className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-strong p-4 min-h-[50vh] max-h-[85vh] z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="flex-shrink-0 px-2 pb-2">
          <div className="w-10 h-1.5 bg-gray-300 rounded-full mx-auto mb-4"></div>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">
              {date.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'long' })}
            </h2>
            <button onClick={handleClose} className="p-2 rounded-full text-gray-500 hover:bg-gray-200/60 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="space-y-3 overflow-y-auto flex-grow px-2 py-2">
          {dayEvents.length > 0 ? (
            dayEvents.sort((a,b) => {
                if (a.startTime && b.startTime) return a.startTime.localeCompare(b.startTime);
                if (a.startTime) return -1;
                if (b.startTime) return 1;
                return a.title.localeCompare(b.title);
            }).map(event => {
              const participants = event.participantIds.map(getUser).filter(Boolean) as User[];
              const eventColor = getEventColor(event);
              const bgColor = `bg-${eventColor}-100`;
              const textColor = `text-${eventColor}-800`;

              return (
                <div key={event.id} className={`p-4 rounded-xl flex ${bgColor}`}>
                  <div className={`w-16 flex-shrink-0 text-sm font-bold text-center ${textColor}`}>
                    {event.startTime ? event.startTime : 'All-day'}
                  </div>
                  <div className="flex-grow pl-3">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="font-bold text-gray-900">{event.title}</p>
                            {event.description && <p className="text-sm text-gray-600 mt-1">{event.description}</p>}
                        </div>
                        <button onClick={() => onStartEdit(event)} className="p-2 rounded-full text-gray-500 hover:bg-gray-400/20 transition-colors -mr-2 -mt-2">
                            <PencilIcon className="w-5 h-5" />
                        </button>
                    </div>
                    {participants.length > 0 && (
                     <div className="flex items-center pt-3 mt-3">
                        {participants.map(p => (
                            <img key={p.id} src={p.avatarUrl} alt={p.name} className="w-6 h-6 rounded-full -mr-2 border border-white"/>
                        ))}
                    </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-gray-500 py-8 text-center">No events scheduled for this day.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default DayDetailDrawer;