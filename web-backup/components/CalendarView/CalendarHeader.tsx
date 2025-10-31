import React from 'react';
import MenuIcon from '../icons/MenuIcon';
import SearchIcon from '../icons/SearchIcon';
import ChevronDownIcon from '../icons/ChevronDownIcon';
import ChevronUpIcon from '../icons/ChevronUpIcon';

interface CalendarHeaderProps {
  currentDate: Date;
  onOpenSidebar: () => void;
  onOpenSearch: () => void;
  activeCalendarName: string;
  onTitleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isPickerOpen: boolean;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({ currentDate, onOpenSidebar, onOpenSearch, activeCalendarName, onTitleClick, isPickerOpen }) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  return (
    <div className="flex items-center justify-between py-2 px-2 mb-3">
      <button onClick={onOpenSidebar} className="p-2 text-gray-600 hover:text-green-500">
        <MenuIcon className="w-6 h-6" />
      </button>
      <div className="flex flex-col items-center">
          <button onClick={onTitleClick} className="flex items-center space-x-1">
              <h2 className="text-xl font-extrabold text-green-500">
              {`${year}년 ${month}월`}
              </h2>
              {isPickerOpen ? (
                <ChevronUpIcon className="w-5 h-5 text-green-500" />
              ) : (
                <ChevronDownIcon className="w-5 h-5 text-green-500" />
              )}
          </button>
          <p className="text-xs text-gray-400">{activeCalendarName}</p>
      </div>
      <button onClick={onOpenSearch} className="p-2 text-gray-600 hover:text-green-500">
        <SearchIcon className="w-6 h-6" />
      </button>
    </div>
  );
};

export default CalendarHeader;