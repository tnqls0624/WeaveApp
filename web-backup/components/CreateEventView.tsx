import React, { useEffect, useState } from 'react';
import { Event, User, View, RepeatOption } from '../types';
import { parseEventFromPrompt } from '../services/geminiService';
import CheckIcon from './icons/CheckIcon';
import DatePicker from './DatePicker';
import CalendarIcon from './icons/CalendarIcon';
import { toYYYYMMDD } from '../utils/date';

interface CreateEventViewProps {
  onSave: (eventData: Omit<Event, 'id' | 'calendarId'>, eventId?: string) => void;
  users: User[];
  currentUser: User;
  setActiveView: (view: View) => void;
  eventToEdit: Event | null;
}

const CreateEventView: React.FC<CreateEventViewProps> = ({ onSave, users, currentUser, setActiveView, eventToEdit }) => {
  const [prompt, setPrompt] = useState('');
  const [isParsing, setIsParsing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(toYYYYMMDD(new Date()));
  const [endDate, setEndDate] = useState<string | undefined>(undefined);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const [participantIds, setParticipantIds] = useState<string[]>([currentUser.id]);
  const [repeat, setRepeat] = useState<RepeatOption>('none');

  const isEditing = !!eventToEdit;

  useEffect(() => {
    if (eventToEdit) {
      setTitle(eventToEdit.title);
      setDescription(eventToEdit.description || '');
      setStartDate(eventToEdit.startDate);
      setEndDate(eventToEdit.endDate);
      setParticipantIds(eventToEdit.participantIds);
      setRepeat(eventToEdit.repeat || 'none'); 
    } else {
        setTitle('');
        setDescription('');
        setStartDate(toYYYYMMDD(new Date()));
        setEndDate(undefined);
        setParticipantIds([currentUser.id]);
        setRepeat('none');
    }
  }, [eventToEdit, currentUser.id]);

  const handleParse = async () => {
    if (!prompt.trim()) return;
    setIsParsing(true);
    setError(null);
    try {
      const parsedEvent = await parseEventFromPrompt(prompt);
      if (parsedEvent) {
        setTitle(parsedEvent.title);
        setStartDate(parsedEvent.date);
        setEndDate(undefined);
      } else {
        setError("Could not parse event details. Please try being more specific or enter manually.");
      }
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setIsParsing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && startDate && participantIds.length > 0) {
      const eventData: Omit<Event, 'id' | 'calendarId'> = { 
        title, 
        description: description || undefined,
        startDate, 
        participantIds, 
        repeat,
        endDate: endDate && endDate !== startDate ? endDate : undefined,
        startTime: undefined,
        endTime: undefined,
        location: eventToEdit?.location,
      };
      onSave(eventData, eventToEdit?.id);
    } else {
      setError("Please add a title, start date, and at least one participant.");
    }
  };

  const toggleParticipant = (id: string) => {
    setParticipantIds(prev => 
      prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id]
    );
  };

  const formattedDate = (start: string, end?: string) => {
      if (!start) return '연도. 월. 일.';
      const startDate = new Date(start + 'T00:00:00');
      const formattedStart = startDate.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\.$/, '');
      if (!end || start === end) {
          return formattedStart;
      }
      const endDate = new Date(end + 'T00:00:00');
      const formattedEnd = endDate.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\.$/, '');
      return `${formattedStart} - ${formattedEnd}`;
  }

  return (
    <div className="pb-8">
      <header className="flex items-center justify-between mb-6">
        <button onClick={() => setActiveView('calendar')} className="text-blue-600 font-semibold px-4 py-2">Cancel</button>
        <h1 className="text-xl font-bold text-gray-800">{isEditing ? 'Edit Event' : 'New Event'}</h1>
        <button onClick={handleSubmit} className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-600">
          {isEditing ? 'Update' : 'Save'}
        </button>
      </header>
      
      <div className="space-y-6">
        {!isEditing && (
            <div className="bg-white p-4 rounded-lg shadow space-y-3">
            <h2 className="font-bold text-gray-700">Quick Add with AI ✨</h2>
            <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., 'Team lunch tomorrow'"
                className="w-full p-2 border border-gray-300 rounded-lg h-20 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button onClick={handleParse} disabled={isParsing} className="w-full bg-gray-800 text-white p-3 rounded-lg flex items-center justify-center space-x-2 disabled:bg-gray-400 font-semibold">
                <span>{isParsing ? 'Parsing...' : 'Fill Details'}</span>
            </button>
            </div>
        )}
        
        <div className="bg-white p-4 rounded-lg shadow space-y-4">
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Event Title" className="w-full p-3 border-b border-gray-300 focus:outline-none focus:border-blue-500" />
          
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add description..."
            className="w-full p-3 border-b border-gray-300 focus:outline-none focus:border-blue-500 h-24 resize-none"
          />

          <div className="relative">
            <div className="flex justify-between items-center border-b border-gray-300">
                <span className="p-3 text-gray-400">날짜</span>
                <button type="button" onClick={() => setIsDatePickerOpen(true)} className="flex items-center p-3">
                    <span className="mr-2">{formattedDate(startDate, endDate)}</span>
                    <CalendarIcon className="w-5 h-5 text-gray-500" />
                </button>
            </div>
            {isDatePickerOpen && (
                <DatePicker 
                    value={{ start: startDate, end: endDate }}
                    onChange={({ start, end }) => {
                        setStartDate(start);
                        setEndDate(end);
                        if (end) {
                            setIsDatePickerOpen(false);
                        }
                    }}
                    onClose={() => setIsDatePickerOpen(false)}
                />
            )}
          </div>
          
          <div>
                 <label htmlFor="repeat-select" className="block text-sm font-medium text-gray-700">Repeat</label>
                 <select
                    id="repeat-select"
                    value={repeat}
                    onChange={(e) => setRepeat(e.target.value as RepeatOption)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                    <option value="none">Does not repeat</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                </select>
            </div>

          <div>
            <h3 className="font-semibold text-gray-700 mb-3">Participants</h3>
            <div className="flex items-center space-x-3">
              {users.map(user => (
                <button key={user.id} onClick={() => toggleParticipant(user.id)} className="relative">
                  <img src={user.avatarUrl} alt={user.name} className={`w-12 h-12 rounded-full border-4 transition-all ${participantIds.includes(user.id) ? `border-blue-500` : 'border-transparent opacity-50'}`} />
                  {participantIds.includes(user.id) && (
                    <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                      <CheckIcon className="w-3 h-3 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {error && <p className="mt-4 text-center text-red-500 font-medium">{error}</p>}
    </div>
  );
};

export default CreateEventView;