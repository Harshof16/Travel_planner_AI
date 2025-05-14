import React, { useState } from 'react';

const Itinerary: React.FC = () => {
  const [activeDay, setActiveDay] = useState<number | null>(null);
  const [itineraryData, setItineraryData] = useState([
    {
      day: 1,
      title: 'Arrival and Relaxation in Bali',
      date: '1 Jun, 2025',
      activities: [
        {
          time: 'Check-in at Bella Kita Mountain Retreat & Spa',
          description: 'Arrive and settle into your luxurious accommodation with mountain views.',
        },
        {
          time: 'Visit Uluwatu Temple',
          description: 'Experience stunning ocean views and traditional Balinese architecture.',
        },
        {
          time: 'Dinner at Drifter Cafe',
          description: 'Enjoy healthy bowls and smoothies in a relaxed atmosphere.',
        },
      ],
    },
    {
      day: 2,
      title: 'Beach Day and Temple Tour',
      date: '2 Jun, 2025',
      activities: [],
    },
    {
      day: 3,
      title: 'Cultural Experience and Sunset Views',
      date: '3 Jun, 2025',
      activities: [],
    },
    {
      day: 4,
      title: 'Adventure and Wellness Day',
      date: '4 Jun, 2025',
      activities: [],
    },
    {
      day: 5,
      title: 'Adventure and Wellness Day',
      date: '5 Jun, 2025',
      activities: [],
    },
  ]);

  const toggleDay = (day: number) => {
    setActiveDay(activeDay === day ? null : day);
  };

  // Drag and drop handlers
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (index: number) => {
    if (draggedIndex === null || draggedIndex === index) return;
    const newData = [...itineraryData];
    const [removed] = newData.splice(draggedIndex, 1);
    newData.splice(index, 0, removed);
    setItineraryData(newData);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-8">
      <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">Itinerary</h2>
      <div className="space-y-4">
        {itineraryData.map((day, index) => (
          <div
            key={day.day}
            className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden"
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => { e.preventDefault(); handleDragOver(index); }}
            onDragEnd={handleDragEnd}
            style={{ cursor: 'grab', opacity: draggedIndex === index ? 0.5 : 1 }}
          >
            <button
              onClick={() => toggleDay(day.day)}
              className="w-full text-left px-4 py-3 bg-gray-100 dark:bg-gray-700 flex justify-between items-center"
            >
              <div>
                <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200">
                  Day {day.day}: {day.title}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">{day.date}</p>
              </div>
              <span>{activeDay === day.day ? '▲' : '▼'}</span>
            </button>
            {activeDay === day.day && (
              <div className="p-4 bg-white dark:bg-gray-800">
                {day.activities.length > 0 ? (
                  day.activities.map((activity, idx) => (
                    <div key={idx} className="mb-4">
                      <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200">
                        {activity.time}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {activity.description}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-600 dark:text-gray-400">No activities planned for this day.</p>
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