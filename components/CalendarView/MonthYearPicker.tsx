import React, { useState, useRef } from 'react';
import { useClickOutside } from '../../hooks/useClickOutside';
import ArrowLeftIcon from '../icons/ArrowLeftIcon';
import ChevronRightIcon from '../icons/ChevronRightIcon';

interface MonthYearPickerProps {
  currentDate: Date;
  onDateSelect: (date: Date) => void;
  onClose: () => void;
}

type PickerMode = 'months' | 'years';

const MonthYearPicker: React.FC<MonthYearPickerProps> = ({ currentDate, onDateSelect, onClose }) => {
  const pickerRef = useRef<HTMLDivElement>(null);
  useClickOutside(pickerRef, onClose);

  const [displayDate, setDisplayDate] = useState(new Date(currentDate));
  const [pickerMode, setPickerMode] = useState<PickerMode>('months');

  const changeDisplayDate = (amount: number, unit: 'year' | 'decade') => {
    const newDate = new Date(displayDate);
    if (unit === 'year') {
      newDate.setFullYear(newDate.getFullYear() + amount);
    } else {
      newDate.setFullYear(newDate.getFullYear() + amount * 10);
    }
    setDisplayDate(newDate);
  };

  const renderMonthsGrid = () => {
    const months = Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString('ko-KR', { month: 'long' }));
    const currentDisplayMonth = displayDate.getMonth();
    const currentActualMonth = currentDate.getMonth();
    const currentActualYear = currentDate.getFullYear();

    return (
      <div className="grid grid-cols-3 gap-2 py-2">
        {months.map((month, i) => (
          <button
            key={month}
            onClick={() => {
              const newDate = new Date(displayDate.getFullYear(), i, 1);
              onDateSelect(newDate);
            }}
            className={`p-3 rounded-lg text-sm font-semibold transition-colors ${
              i === currentActualMonth && displayDate.getFullYear() === currentActualYear ? 'bg-blue-500 text-white' : 'hover:bg-blue-100 text-gray-700'
            }`}
          >
            {month}
          </button>
        ))}
      </div>
    );
  };

  const renderYearsGrid = () => {
    const year = displayDate.getFullYear();
    const startYear = Math.floor(year / 10) * 10 - 1;
    const years = Array.from({ length: 12 }, (_, i) => startYear + i);
    return (
      <div className="grid grid-cols-4 gap-2 py-2">
        {years.map((y) => (
          <button
            key={y}
            onClick={() => {
              setDisplayDate(new Date(y, displayDate.getMonth(), 1));
              setPickerMode('months');
            }}
            className={`p-3 rounded-lg text-sm font-semibold transition-colors ${
              y === year ? 'bg-blue-500 text-white' : 'hover:bg-blue-100 text-gray-700'
            }`}
          >
            {y}
          </button>
        ))}
      </div>
    );
  };
  
  const renderHeader = () => {
    let title = '';
    let onClick: () => void = () => {};
    let onPrev: () => void = () => {};
    let onNext: () => void = () => {};

    if (pickerMode === 'months') {
      title = `${displayDate.getFullYear()}년`;
      onClick = () => setPickerMode('years');
      onPrev = () => changeDisplayDate(-1, 'year');
      onNext = () => changeDisplayDate(1, 'year');
    } else { // years
      const startYear = Math.floor(displayDate.getFullYear() / 10) * 10;
      const endYear = startYear + 9;
      title = `${startYear} - ${endYear}`;
      onPrev = () => changeDisplayDate(-1, 'decade');
      onNext = () => changeDisplayDate(1, 'decade');
    }

    return (
      <div className="flex items-center justify-between mb-2">
        <button onClick={onClick} className="font-bold text-lg p-1 hover:bg-gray-100 rounded">
          {title}
        </button>
        <div className="flex items-center space-x-1">
          <button onClick={onPrev} className="p-2 rounded-full hover:bg-gray-100">
              <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
          </button>
          <button onClick={onNext} className="p-2 rounded-full hover:bg-gray-100">
              <ChevronRightIcon className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div ref={pickerRef} className="absolute top-16 left-1/2 -translate-x-1/2 bg-white rounded-lg shadow-lg border border-gray-200 z-20 w-72 p-4">
        {renderHeader()}
        {pickerMode === 'months' && renderMonthsGrid()}
        {pickerMode === 'years' && renderYearsGrid()}
    </div>
  );
};

export default MonthYearPicker;
