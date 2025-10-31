import React, { useState, useRef } from 'react';
import ChevronDownIcon from './icons/ChevronDownIcon';
import ArrowLeftIcon from './icons/ArrowLeftIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';
import { useClickOutside } from '../hooks/useClickOutside';
import { toYYYYMMDD } from '../utils/date';

interface DatePickerProps {
  value: { start: string; end?: string };
  onChange: (range: { start: string; end?: string }) => void;
  onClose: () => void;
}

type PickerMode = 'days' | 'months' | 'years';

const DatePicker: React.FC<DatePickerProps> = ({ value, onChange, onClose }) => {
  const datePickerRef = useRef<HTMLDivElement>(null);
  useClickOutside(datePickerRef, onClose);

  const initialDate = value.start ? new Date(value.start + 'T00:00:00') : new Date();
  const [displayDate, setDisplayDate] = useState(initialDate);
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [pickerMode, setPickerMode] = useState<PickerMode>('days');
  const [animationDirection, setAnimationDirection] = useState<'left' | 'right' | null>(null);

  const changeDisplayDate = (amount: number, unit: 'month' | 'year' | 'decade') => {
    const newDate = new Date(displayDate);
    if (unit === 'month') {
      setAnimationDirection(amount > 0 ? 'right' : 'left');
      newDate.setMonth(newDate.getMonth() + amount);
    } else if (unit === 'year') {
      newDate.setFullYear(newDate.getFullYear() + amount);
    } else if (unit === 'decade') {
      newDate.setFullYear(newDate.getFullYear() + amount * 10);
    }
    setDisplayDate(newDate);
  };

  const handleDayClick = (day: Date) => {
    const dateString = toYYYYMMDD(day);
    const { start, end } = value;

    if (!start || end) {
      onChange({ start: dateString, end: undefined });
    } else {
      const startDate = new Date(start + 'T00:00:00');
      if (day < startDate) {
        onChange({ start: dateString, end: undefined });
      } else {
        onChange({ start, end: dateString });
      }
    }
  };

  const goToToday = () => {
    const todayString = toYYYYMMDD(new Date());
    onChange({ start: todayString, end: todayString });
    onClose();
  };
  
  const clearDate = () => {
    onChange({ start: '', end: undefined });
    onClose();
  };

  const renderDaysGrid = () => {
    const year = displayDate.getFullYear();
    const month = displayDate.getMonth();
    
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const startDateOfMonth = new Date(firstDayOfMonth);
    startDateOfMonth.setDate(startDateOfMonth.getDate() - startDateOfMonth.getDay());
    const endDateOfMonth = new Date(lastDayOfMonth);
    if (endDateOfMonth.getDay() !== 6) {
      endDateOfMonth.setDate(endDateOfMonth.getDate() + (6 - endDateOfMonth.getDay()));
    }

    const days: Date[] = [];
    let day = new Date(startDateOfMonth);
    while (day <= endDateOfMonth) {
      days.push(new Date(day));
      day.setDate(day.getDate() + 1);
    }

    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    
    const startDateObj = value.start ? new Date(value.start + 'T00:00:00') : null;
    let endDateObj = value.end ? new Date(value.end + 'T00:00:00') : null;

    if (startDateObj && !endDateObj && hoveredDate && hoveredDate >= startDateObj) {
      endDateObj = hoveredDate;
    }

    return (
      <div 
        key={displayDate.getTime()} 
        className={animationDirection === 'right' ? 'animate-slide-in-right' : animationDirection === 'left' ? 'animate-slide-in-left' : ''}
        onAnimationEnd={() => setAnimationDirection(null)}
      >
        <div className="grid grid-cols-7 text-center text-xs text-gray-500 font-semibold">
          {dayNames.map((d, i) => (
            <div key={d} className={`py-1 ${i === 0 ? 'text-red-500' : ''} ${i === 6 ? 'text-blue-500' : ''}`}>{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 mt-2" onMouseLeave={() => setHoveredDate(null)}>
          {days.map((d, index) => {
            const dStr = toYYYYMMDD(d);
            const isCurrentMonth = d.getMonth() === month;
            const isToday = new Date().toDateString() === d.toDateString();

            const isStart = dStr === value.start;
            const isEnd = dStr === value.end;
            const isRangeEdge = isStart || isEnd;
            const isSingleDayRange = isStart && isEnd;
            const isInRange = startDateObj && endDateObj && d > startDateObj && d < endDateObj;

            let dateColorClass = isCurrentMonth ? 'text-gray-700' : 'text-gray-300';
            if (isCurrentMonth) {
               if (d.getDay() === 0) dateColorClass = 'text-red-500';
               if (d.getDay() === 6) dateColorClass = 'text-blue-500';
            }

            let containerClasses = "flex justify-center";
            let buttonClasses = `w-8 h-8 flex items-center justify-center text-sm transition-colors ${dateColorClass}`;

            if (isRangeEdge && !isSingleDayRange) {
              containerClasses += ' bg-blue-100';
              if (isStart) containerClasses += ' rounded-l-full';
              if (isEnd) containerClasses += ' rounded-r-full';
            } else if (isInRange) {
              containerClasses += ' bg-blue-100';
              if (d.getDay() === 0) containerClasses += ' rounded-l-full';
              if (d.getDay() === 6) containerClasses += ' rounded-r-full';
            }

            if(isRangeEdge) {
                buttonClasses += ' bg-blue-500 text-white font-bold rounded-full';
            } else if (isInRange) {
                buttonClasses += ' rounded-full hover:bg-blue-200';
            } else if (isToday && !isRangeEdge) {
                buttonClasses += ' bg-yellow-100 text-yellow-700 rounded-full';
            } else {
                buttonClasses += ' rounded-full hover:bg-gray-100';
            }

            return (
              <div key={index} className={containerClasses} onMouseEnter={() => setHoveredDate(d)}>
                <button
                  onClick={() => handleDayClick(d)}
                  className={buttonClasses}
                >
                  {d.getDate()}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    )
  };

  const renderMonthsGrid = () => {
    const months = Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString('ko-KR', { month: 'long' }));
    return (
      <div className="grid grid-cols-4 gap-2 py-2">
        {months.map((month, i) => (
          <button
            key={month}
            onClick={() => {
              setDisplayDate(new Date(displayDate.getFullYear(), i, 1));
              setPickerMode('days');
            }}
            className="p-3 rounded-lg hover:bg-blue-100 text-sm font-semibold text-gray-700"
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
            className={`p-3 rounded-lg text-sm font-semibold ${
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
    let onTitleClick: () => void = () => {};
    let onPrev: () => void = () => {};
    let onNext: () => void = () => {};

    if (pickerMode === 'days') {
      title = `${displayDate.getFullYear()}년 ${displayDate.getMonth() + 1}월`;
      onTitleClick = () => setPickerMode('years');
      onPrev = () => changeDisplayDate(-1, 'month');
      onNext = () => changeDisplayDate(1, 'month');
    } else if (pickerMode === 'months') {
      title = `${displayDate.getFullYear()}년`;
      onTitleClick = () => setPickerMode('years');
      onPrev = () => changeDisplayDate(-1, 'year');
      onNext = () => changeDisplayDate(1, 'year');
    } else { // years
      const startYear = Math.floor(displayDate.getFullYear() / 10) * 10;
      const endYear = startYear + 9;
      title = `${startYear} - ${endYear}`;
      onTitleClick = () => {}; // No action
      onPrev = () => changeDisplayDate(-1, 'decade');
      onNext = () => changeDisplayDate(1, 'decade');
    }

    return (
      <div className="flex items-center justify-between mb-4">
        <button onClick={onPrev} className="p-1 rounded-full hover:bg-gray-100">
            <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
        </button>
        <button 
          onClick={onTitleClick} 
          disabled={pickerMode === 'years'} 
          className="flex items-center space-x-1 font-bold disabled:cursor-default"
        >
          <span>{title}</span>
          {pickerMode !== 'years' && <ChevronDownIcon className="w-4 h-4" />}
        </button>
        <button onClick={onNext} className="p-1 rounded-full hover:bg-gray-100">
            <ChevronRightIcon className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    );
  };

  return (
    <div ref={datePickerRef} className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-40 w-72">
      <div className="p-4">
        {renderHeader()}
        <div className="relative overflow-hidden">
          {pickerMode === 'days' && renderDaysGrid()}
          {pickerMode === 'months' && renderMonthsGrid()}
          {pickerMode === 'years' && renderYearsGrid()}
        </div>
      </div>
      <div className="flex justify-between items-center bg-gray-50 px-4 py-2 border-t border-gray-200 rounded-b-lg">
        <button onClick={clearDate} className="text-sm font-semibold text-blue-600 hover:underline">삭제</button>
        <button onClick={goToToday} className="text-sm font-semibold text-blue-600 hover:underline">오늘</button>
      </div>
    </div>
  );
};

export default DatePicker;