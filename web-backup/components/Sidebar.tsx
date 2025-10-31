import React from 'react';
import type { Calendar, User } from '../types';
import CalendarIcon from './icons/CalendarIcon';
import XIcon from './icons/XIcon';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  calendars: Calendar[];
  activeCalendarId: string;
  onSelectCalendar: (id: string) => void;
  currentUser: User;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  onClose, 
  calendars, 
  activeCalendarId, 
  onSelectCalendar,
  currentUser
}) => {

  return (
    <div 
      className={`fixed inset-0 z-50 transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
        aria-hidden="true"
      ></div>

      {/* Sidebar Panel */}
      <div 
        className={`absolute top-0 left-0 bottom-0 w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center">
                <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-10 h-10 rounded-full mr-3" />
                <div>
                    <p className="font-semibold text-gray-800">{currentUser.name}</p>
                    <p className="text-sm text-gray-500">My Calendars</p>
                </div>
              </div>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
                <XIcon className="w-6 h-6 text-gray-600"/>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-grow p-4 space-y-2">
            {calendars.map(calendar => {
              const isActive = calendar.id === activeCalendarId;
              return (
                <button
                  key={calendar.id}
                  onClick={() => onSelectCalendar(calendar.id)}
                  className={`w-full flex items-center px-4 py-2.5 text-sm font-semibold rounded-lg transition-colors duration-200 ${
                    isActive
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <CalendarIcon className={`w-5 h-5 mr-3 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                  {calendar.name}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;