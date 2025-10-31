import React from 'react';
import { User } from '../../types';

interface UserFilterProps {
  users: User[];
  selectedIds: string[];
  onChange: (selectedIds: string[]) => void;
}

const UserFilter: React.FC<UserFilterProps> = ({ users, selectedIds, onChange }) => {
  const handleToggle = (userId: string) => {
    const newSelectedIds = selectedIds.includes(userId)
      ? selectedIds.filter(id => id !== userId)
      : [...selectedIds, userId];
    onChange(newSelectedIds);
  };

  return (
    <div className="flex flex-wrap gap-2 my-4">
      {users.map(user => (
        <button
          key={user.id}
          onClick={() => handleToggle(user.id)}
          className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border-2 ${
            selectedIds.includes(user.id)
              ? `bg-${user.color}-100 text-${user.color}-600 border-${user.color}-600`
              : 'bg-white text-slate-600 border-slate-300 hover:border-slate-400'
          }`}
        >
          <img src={user.avatarUrl} alt={user.name} className="w-6 h-6 rounded-full" />
          <span>{user.name}</span>
        </button>
      ))}
    </div>
  );
};

export default UserFilter;
