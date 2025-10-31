import React from 'react';
import type { View } from '../types';
import CalendarIcon from './icons/CalendarIcon';
import ListIcon from './icons/ListIcon';
import MapIcon from './icons/MapIcon';
import PlusIcon from './icons/PlusIcon';
import SettingsIcon from './icons/SettingsIcon';

interface BottomNavProps {
  activeView: View;
  setView: (view: View) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeView, setView }) => {
  const navItems = [
    { view: 'feed', icon: ListIcon, label: 'Feed' },
    { view: 'calendar', icon: CalendarIcon, label: 'Calendar' },
    { view: 'create', icon: PlusIcon, label: 'Create' }, // Placeholder for the button
    { view: 'map', icon: MapIcon, label: 'Map' },
    { view: 'settings', icon: SettingsIcon, label: 'Settings' },
  ] as const;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200">
      <div className="grid grid-cols-5 h-16 max-w-md mx-auto">
        {navItems.map(({ view, icon: Icon, label }) => {
          if (view === 'create') {
            return (
              <div key={view} className="relative flex justify-center">
                <button
                  onClick={() => setView('create')}
                  className="absolute -top-5 w-14 h-14 bg-blue-500 rounded-full text-white shadow-lg flex items-center justify-center transform hover:scale-105 transition-transform duration-200"
                  aria-label="Create new event"
                >
                  <PlusIcon className="w-8 h-8" />
                </button>
              </div>
            );
          }
          const isActive = activeView === view;
          return (
            <button
              key={view}
              onClick={() => setView(view)}
              className={`flex flex-col items-center justify-center w-full h-full transition-colors duration-200 ${
                isActive ? 'text-blue-500' : 'text-gray-500 hover:text-blue-500'
              }`}
              aria-label={label}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs font-medium">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;