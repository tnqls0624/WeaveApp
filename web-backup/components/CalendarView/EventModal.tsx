
import React from 'react';
import type { Event } from '../../types';
import ClockIcon from '../icons/ClockIcon';

interface EventModalProps {
  event: Event;
  onClose: () => void;
}

const EventModal: React.FC<EventModalProps> = ({ event, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-lg p-6 w-11/12 max-w-md" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-bold mb-4">{event.title}</h2>
        <div className="flex items-center text-gray-600 mb-2">
            <ClockIcon className="w-5 h-5 mr-2" />
            <span>{event.startTime} - {event.endTime}</span>
        </div>
        <p className="text-gray-700">{event.description || "No description provided."}</p>
        <div className="mt-6 flex justify-end">
          <button onClick={onClose} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Close</button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
