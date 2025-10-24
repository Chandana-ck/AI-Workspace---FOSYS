import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MOCK_EVENTS } from '@/utils/mockData';
import { EVENT_TYPES } from '@/utils/constants';
import AddEventModal from '@/components/workspace/AddEventModal';

const ManagerPlanner = ({ user }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState(MOCK_EVENTS);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showAddEvent, setShowAddEvent] = useState(false);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleYearChange = (newYear) => {
    setCurrentDate(new Date(parseInt(newYear), month, 1));
  };

  const handleMonthChange = (newMonth) => {
    setCurrentDate(new Date(year, parseInt(newMonth), 1));
  };

  const handleDateClick = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDate(dateStr);
    setShowAddEvent(true);
  };

  const getEventsForDate = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(event => event.date === dateStr);
  };

  const handleAddEvent = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  const years = Array.from({ length: 10 }, (_, i) => year - 5 + i);

  return (
    <div className="p-8" data-testid="manager-planner-page">
      <h1 className="text-4xl font-bold text-white mb-8" style={{fontFamily: 'Work Sans'}}>Planner</h1>

      <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-6">
        {/* Calendar Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Select value={String(year)} onValueChange={handleYearChange}>
              <SelectTrigger className="w-32 bg-slate-800 border-slate-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                {years.map(y => (
                  <SelectItem key={y} value={String(y)} className="text-white">{y}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={String(month)} onValueChange={handleMonthChange}>
              <SelectTrigger className="w-40 bg-slate-800 border-slate-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                {monthNames.map((m, i) => (
                  <SelectItem key={i} value={String(i)} className="text-white">{m}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handlePrevMonth}
              variant="outline"
              size="icon"
              className="border-slate-700 text-slate-300 hover:bg-slate-800"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              onClick={handleNextMonth}
              variant="outline"
              size="icon"
              className="border-slate-700 text-slate-300 hover:bg-slate-800"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {/* Day Headers */}
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-slate-400 font-medium py-2">{day}</div>
          ))}
          
          {/* Empty cells for days before month starts */}
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square"></div>
          ))}
          
          {/* Calendar days */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dayEvents = getEventsForDate(day);
            const isToday = new Date().getDate() === day && 
                           new Date().getMonth() === month && 
                           new Date().getFullYear() === year;
            
            return (
              <button
                key={day}
                data-testid={`calendar-day-${day}`}
                onClick={() => handleDateClick(day)}
                className={`aspect-square p-2 rounded-lg border ${
                  isToday
                    ? 'border-blue-500 bg-blue-600/20'
                    : 'border-slate-700 hover:border-slate-600 bg-slate-800/50 hover:bg-slate-800'
                }`}
              >
                <div className="text-white font-medium mb-1">{day}</div>
                <div className="flex flex-wrap gap-1">
                  {dayEvents.map((event, idx) => (
                    <div
                      key={idx}
                      className={`w-2 h-2 rounded-full ${EVENT_TYPES[event.type]?.color || 'bg-slate-500'}`}
                      title={event.title}
                    ></div>
                  ))}
                </div>
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-6 pt-6 border-t border-slate-800">
          <h3 className="text-white font-medium mb-3">Event Types</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(EVENT_TYPES).map(([key, value]) => (
              <div key={key} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${value.color}`}></div>
                <span className="text-slate-300 text-sm">{value.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AddEventModal
        isOpen={showAddEvent}
        onClose={() => setShowAddEvent(false)}
        selectedDate={selectedDate}
        onAddEvent={handleAddEvent}
      />
    </div>
  );
};

export default ManagerPlanner;