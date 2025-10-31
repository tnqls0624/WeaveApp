import React, { useState } from 'react';
import { User } from '../types';
import UserIcon from './icons/UserIcon';
import BellIcon from './icons/BellIcon';
import ShieldIcon from './icons/ShieldIcon';
import LogoutIcon from './icons/LogoutIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';
import ArrowLeftIcon from './icons/ArrowLeftIcon';
import TagIcon from './icons/TagIcon';
import UserFilter from './CalendarView/UserFilter';

type SettingsPage = 'main' | 'account' | 'tags' | 'notifications' | 'privacy';

interface SettingsViewProps {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const SettingsView: React.FC<SettingsViewProps> = ({ users, setUsers }) => {
  const [page, setPage] = useState<SettingsPage>('main');
  
  const [filteredUserIds, setFilteredUserIds] = useState<string[]>(users.map(u => u.id));
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const availableColors = ['red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'];

  const handleColorChange = (userId: string, color: string) => {
    setUsers(currentUsers => currentUsers.map(u => u.id === userId ? { ...u, color } : u));
  };

  const renderMainPage = () => (
    <>
      <div className="bg-white rounded-lg shadow mb-6">
        <SettingsItem icon={UserIcon} label="Account" onClick={() => setPage('account')} />
        <SettingsItem icon={TagIcon} label="Tag Settings" onClick={() => setPage('tags')} />
        <SettingsItem icon={BellIcon} label="Notifications" onClick={() => setPage('notifications')} />
        <SettingsItem icon={ShieldIcon} label="Privacy & Security" onClick={() => setPage('privacy')} isLast={true} />
      </div>

      <div className="bg-white rounded-lg shadow">
        <button className="w-full flex items-center p-4 text-left text-red-600 transition-colors hover:bg-red-50 rounded-lg">
          <LogoutIcon className="w-6 h-6 mr-4" />
          <span className="flex-grow font-semibold">Log Out</span>
        </button>
      </div>
    </>
  );

  const renderSubPage = (title: string, children: React.ReactNode) => (
    <div>
      <button onClick={() => setPage('main')} className="flex items-center text-gray-600 font-semibold mb-4 hover:text-blue-600">
        <ArrowLeftIcon className="w-5 h-5 mr-2" />
        Back
      </button>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>
        {children}
      </div>
    </div>
  );

  const renderPage = () => {
    switch(page) {
      case 'main': return renderMainPage();
      case 'account': return renderSubPage('Account', <p className="text-gray-500">Account settings will be available here.</p>);
      case 'tags': return renderSubPage('Tag & Color Settings', (
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">User Colors</h3>
            <div className="space-y-4">
              {users.map(user => (
                <div key={user.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img src={user.avatarUrl} alt={user.name} className="w-10 h-10 rounded-full mr-3" />
                    <span className="font-medium text-gray-800">{user.name}</span>
                  </div>
                  <div className="flex items-center flex-wrap gap-2">
                    {availableColors.slice(0, 8).map(color => ( // Limit colors for better layout
                      <button key={color} onClick={() => handleColorChange(user.id, color)} className={`w-6 h-6 rounded-full border-2 ${user.color === color ? `border-${color}-500` : 'border-transparent'} bg-${color}-400`}></button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ));
      case 'notifications': return renderSubPage('Notifications', (
        <div className="flex items-center justify-between">
            <span className="font-medium text-gray-800">New Event Notifications</span>
            <button onClick={() => setNotificationsEnabled(!notificationsEnabled)} className={`w-12 h-7 rounded-full p-1 transition-colors ${notificationsEnabled ? 'bg-blue-500' : 'bg-gray-300'}`}>
                <span className={`block w-5 h-5 bg-white rounded-full shadow transform transition-transform ${notificationsEnabled ? 'translate-x-5' : 'translate-x-0'}`}></span>
            </button>
        </div>
      ));
      case 'privacy': return renderSubPage('Privacy & Security', <p className="text-gray-500">Privacy settings will be available here.</p>);
      default: return renderMainPage();
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Settings</h1>
      {renderPage()}
    </div>
  );
};

const SettingsItem: React.FC<{icon: React.FC<any>, label: string, onClick: () => void, isLast?: boolean}> = ({ icon: Icon, label, onClick, isLast }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center p-4 text-left transition-colors hover:bg-gray-50 ${!isLast && 'border-b border-gray-100'}`}
  >
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 bg-gray-100 text-gray-600`}>
        <Icon className="w-6 h-6" />
    </div>
    <span className="flex-grow text-gray-700 font-semibold">{label}</span>
    <ChevronRightIcon className="w-5 h-5 text-gray-400" />
  </button>
);

export default SettingsView;