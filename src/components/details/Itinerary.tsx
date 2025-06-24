import React, { useState } from 'react';
import { Day } from '../../types/tripDetailsTypes';

// interface DayWithSchedule {
//   day: number;
//   title: string;
//   date?: string;
//   schedule: Schedule[];
//   transportation?: Transportation[];
// }

const Itinerary: React.FC<{ days: Day[], isMobile: boolean }> = ({ days, isMobile  }) => {
  const [activeDay, setActiveDay] = useState<number | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [orderedDays, setOrderedDays] = useState<Day[]>(days);

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
      <h2 className="text-2xl font-bold text-teal-700 dark:text-teal-300 mb-6">Itinerary</h2>
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
                {/* {day.date && <p className="text-xs text-gray-600 dark:text-gray-400">{day.date}</p>} */}
              </div>
              <span>{activeDay === index ? '▲' : '▼'}</span>
            </button>
            {activeDay === index && (
                <div className="p-4 bg-white dark:bg-gray-800">
                {/* Activities Section */}
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
                      <li key={aidx} className="flex items-start gap-3 mb-3">
                        <div className="flex-shrink-0 mt-2 w-1 h-1 rounded-full bg-gray-500" />
                        <div>
                        <div className="test-sm text-gray-800 dark:text-teal-200">{activity.title}</div>
                        {activity.description && (
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.description}</div>
                        )}
                        </div>
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

                {/* Transportation Visualization Section */}
                {day.transportation && day.transportation.length > 0 && (
                  <div className="mt-8">
                    <h5 className="text-base font-bold text-gray-800 dark:text-teal-400 mb-5">Transportation Options</h5>
                    <div className="relative ${isMobile ? '' : 'ml-4'}">
                      {day.transportation.map((transport, tIdx) => {
                        const modeIcons: Record<string, JSX.Element> = {
                          Taxi: <span className="text-xl  " role="img" aria-label="taxi">🚕</span>,
                          Bus: <span className="text-xl  " role="img" aria-label="bus">🚌</span>,
                          Scooter: <span className="text-xl  " role="img" aria-label="scooter">🛵</span>,
                          Train: <span className="text-xl  " role="img" aria-label="train">🚆</span>,
                          Flight: <span className="text-xl  " role="img" aria-label="flight">✈️</span>,
                          Walking: <span className="text-xl  " role="img" aria-label="walking">🚶‍♂️</span>,
                          "Jeep Safari": <span className="text-xl  " role="img" aria-label="jeep">🚙</span>,
                          "Rental Vehicle": <span className="text-xl  " role="img" aria-label="car">🚗</span>,
                        };

                        return (
                          <div key={tIdx} className={`mb-4 relative group ${isMobile ? '' : 'ml-6'}`}>
                            <div className={`flex sm:flex-row items-center ${isMobile ? 'gap-2' : 'flex-col gap-4'}`}>
                              {/* From */}
                              <p className="text-sm font-medium text-gray-700 dark:text-teal-100">{transport.from}</p>

                              {/* Arrow with icon */}
                              <div className={`flex items-baseline w-32 justify-center ${isMobile ? 'gap-1' : 'gap-2'}`}>
                                {/* Icon */}
                                <span className="relative group"></span>
                                  <span className="text-xl cursor-pointer">{modeIcons[transport.mode]}</span>
                                  {/* Tooltip for mobile: show on icon tap/click */}
                                  {isMobile ? (
                                    <span className="absolute left-1/2 -translate-x-1/2 mt-2 w-max px-2 py-1 rounded bg-gray-800 text-white text-xs opacity-0 group-active:opacity-100 group-focus:opacity-100 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                                      {transport.mode}
                                    </span>
                                  ) : (
                                    <span className="text-xs text-gray-500 dark:text-gray-300">{transport.mode}</span>
                                  )}
                                {/* Arrow */}
                                <span className="text-2xl text-teal-500">→</span>
                              </div>

                              {/* To */}
                              <p className="text-sm font-medium text-gray-800 dark:text-teal-100">{transport.to}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
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