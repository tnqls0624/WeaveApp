import React, { useState, useMemo, useEffect, useRef } from 'react';
import type { Event } from '../types';
import XIcon from './icons/XIcon';
import SearchIcon from './icons/SearchIcon';
import CalendarIcon from './icons/CalendarIcon';

interface SearchViewProps {
  isOpen: boolean;
  onClose: () => void;
  events: Event[];
  onEventSelect: (event: Event) => void;
}

const SearchView: React.FC<SearchViewProps> = ({ isOpen, onClose, events, onEventSelect }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Auto-focus the input when the modal opens
      inputRef.current?.focus();
      // Reset query on open
      setQuery('');
    }
  }, [isOpen]);

  const filteredEvents = useMemo(() => {
    if (!query.trim()) {
      return [];
    }
    return events.filter(event => 
      event.title.toLowerCase().includes(query.toLowerCase())
    ).sort((a, b) => new Date(`${a.startDate}T${a.startTime}`).getTime() - new Date(`${b.startDate}T${b.startTime}`).getTime());
  }, [query, events]);

  const handleSelect = (event: Event) => {
    onEventSelect(event);
    onClose();
  };
  
  const formatEventDate = (event: Event) => {
    const date = new Date(`${event.startDate}T00:00:00`);
    const datePart = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', weekday: 'short' });
    return `${datePart} at ${event.startTime}`;
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-100/70 backdrop-blur-sm z-50 p-4 transition-opacity duration-300" onClick={onClose}>
      <div className="w-full max-w-lg mx-auto" onClick={e => e.stopPropagation()}>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <SearchIcon className="w-5 h-5 text-gray-400" />
          </div>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for events..."
            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
           <button onClick={onClose} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-800">
                <XIcon className="w-6 h-6" />
            </button>
        </div>

        <div className="bg-white rounded-b-lg shadow-sm mt-1 max-h-[70vh] overflow-y-auto">
          {query.trim() && (
            <ul>
              {filteredEvents.length > 0 ? (
                filteredEvents.map(event => (
                  <li key={event.id} className="border-t border-gray-100">
                    <button onClick={() => handleSelect(event)} className="w-full flex items-center text-left p-4 hover:bg-blue-50 transition-colors">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-100 mr-4">
                        <CalendarIcon className="w-6 h-6 text-gray-500" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{event.title}</p>
                        <p className="text-sm text-gray-500">{formatEventDate(event)}</p>
                      </div>
                    </button>
                  </li>
                ))
              ) : (
                <li className="p-6 text-center text-gray-500 border-t border-gray-100">
                  No events found for "{query}".
                </li>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchView;