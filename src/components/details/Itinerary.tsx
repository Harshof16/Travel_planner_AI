import React, { useState } from 'react';
import { Schedule } from '../../types/tripDetailsTypes';

interface DayWithSchedule {
  day: number;
  title: string;
  date?: string;
  schedule: Schedule[];
}

const Itinerary: React.FC<{ days: DayWithSchedule[] }> = ({ days }) => {
  const [activeDay, setActiveDay] = useState<number | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [orderedDays, setOrderedDays] = useState<DayWithSchedule[]>(days);

  // Update orderedDays if days prop changes
  React.useEffect(() => {
    setOrderedDays(days);
  }, [days]);

  const toggleDay = (day: number) => {
    setActiveDay(activeDay === day ? null : day);
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (index: number) => {
    if (draggedIndex === null || draggedIndex === index) return;
    const newData = [...orderedDays];
    const [removed] = newData.splice(draggedIndex, 1);
    newData.splice(index, 0, removed);
    setOrderedDays(newData);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const timeOfDayIcons: Record<string, JSX.Element> = {
    Morning: <span role="img" aria-label="morning" className="mr-2">🌅</span>,
    Afternoon: <span role="img" aria-label="afternoon" className="mr-2">🌞</span>,
    Evening: <span role="img" aria-label="evening" className="mr-2">🌙</span>,
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-8">
      <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">Itinerary</h2>
      <div className="space-y-4">
        {orderedDays.map((day, index) => (
          <div
            key={index}
            className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden"
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => { e.preventDefault(); handleDragOver(index); }}
            onDragEnd={handleDragEnd}
            style={{ cursor: 'grab', opacity: draggedIndex === index ? 0.5 : 1 }}
          >
            <button
              onClick={() => toggleDay(index)}
              className="w-full text-left px-4 py-3 bg-gray-100 dark:bg-gray-700 flex justify-between items-center"
            >
              <div>
                <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200">
                  Day {index + 1}: {day.title}
                </h3>
                {day.date && <p className="text-xs text-gray-600 dark:text-gray-400">{day.date}</p>}
              </div>
              <span>{activeDay === index ? '▲' : '▼'}</span>
            </button>
            {activeDay === index && (
              <div className="p-4 bg-white dark:bg-gray-800">
                {day.schedule && day.schedule.length > 0 ? (
                  day.schedule.map((slot, idx) => (
                    <div key={idx} className="mb-5">
                      <h4 className="text-md font-extrabold text-gray-700 dark:text-teal-500 mb-2 flex items-center tracking-wide">
                        {timeOfDayIcons[slot.time_of_day] || null}
                        {slot.time_of_day}
                      </h4>
                      {slot.activities.length > 0 ? (
                        <ul className="list-disc ml-6">
                          {slot.activities.map((activity, aidx) => (
                            <li key={aidx} className="text-sm text-gray-700 dark:text-gray-200 mb-1 leading-relaxed">
                              {activity}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">No activities planned for this time.</p>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-base text-gray-600 dark:text-gray-400">No activities planned for this day.</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Itinerary;