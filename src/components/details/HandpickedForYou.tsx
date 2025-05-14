import React, { useState } from 'react';

const handpickedData = [
  {
    title: 'Agra',
    nights: '12 Nights, Toured',
    location: 'UP, India',
    state: 'UP, India',
    type: 'Accommodation',
  },
  {
    title: 'Jaipur',
    nights: '3 Nights, All Included',
    location: 'Rajasthan',
    state: 'Rajasthan',
    type: 'Sightseeing',
  },
  {
    title: 'Ladakh',
    nights: '4 Nights, All Included',
    location: 'Ladakh',
    state: 'Ladakh',
    type: 'Activity',
  },
];

const filterOptions = ['Accommodation', 'Activity', 'Sightseeing'];

const HandpickedForYou: React.FC = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleFilter = (filter: string) => {
    setSelected((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  const filteredData = selected.length
    ? handpickedData.filter((item) => selected.includes(item.type))
    : handpickedData;

  return (
      <div className="mb-8 mt-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Handpicked for You</h2>
      <div className="mb-6 flex gap-2">
        {filterOptions.map((option) => (
          <button
            key={option}
            onClick={() => toggleFilter(option)}
            className={`px-4 py-1 rounded-full border text-sm font-medium transition-colors ${
              selected.includes(option)
                ? 'bg-teal-500 text-white border-teal-500'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredData.map((item, idx) => (
          <div
            key={idx}
            className="relative rounded-xl overflow-hidden bg-gradient-to-t from-gray-300/60 to-gray-100/60 dark:from-gray-700/60 dark:to-gray-900/60 h-64 flex flex-col justify-end p-6"
          >
            <div>
              <h3 className="text-xl font-semibold text-white drop-shadow mb-1">{item.title}</h3>
              <p className="text-sm text-gray-100 mb-1">{item.nights}</p>
              <div className="flex items-center gap-1 text-gray-200 text-xs">
                <span>📍</span>
                <span>{item.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HandpickedForYou;
