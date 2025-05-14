import React, { useState } from 'react';

const Filters: React.FC = () => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [travelDates, setTravelDates] = useState('');
  const [travelers, setTravelers] = useState(1);
  const [activities, setActivities] = useState<string[]>([]);

  const activityOptions = [
    'Beaches',
    'Sightseeing',
    'Honeymoon',
    'Adventure',
    'Wildlife',
    'Festivals/Events',
    'Shopping',
  ];

  const toggleActivity = (activity: string) => {
    setActivities((prev) =>
      prev.includes(activity)
        ? prev.filter((a) => a !== activity)
        : [...prev, activity]
    );
  };

  return (
    <div>
      <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">Filters</h2>

      <div className="space-y-4">
        {/* Source and Destination */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Source
            </label>
            <input
              type="text"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="Enter source"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Destination
            </label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Enter destination"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            />
          </div>
        </div>

        {/* Travel Dates */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Travel Dates
          </label>
          <input
            type="date"
            value={travelDates}
            onChange={(e) => setTravelDates(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          />
        </div>

        {/* Travelers */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Number of Travelers
          </label>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setTravelers((prev) => Math.max(1, prev - 1))}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg"
            >
              -
            </button>
            <span className="text-lg font-bold text-gray-800 dark:text-gray-200">
              {travelers}
            </span>
            <button
              onClick={() => setTravelers((prev) => prev + 1)}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg"
            >
              +
            </button>
          </div>
        </div>

        {/* Activities */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Activities
          </label>
          <div className="flex flex-wrap gap-2">
            {activityOptions.map((activity) => (
              <button
                key={activity}
                onClick={() => toggleActivity(activity)}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                  activities.includes(activity)
                    ? 'bg-teal-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                }`}
              >
                {activity}
              </button>
            ))}
          </div>
        </div>

        {/* Apply Button */}
        <div className="flex justify-end gap-4">
          <button className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg">
            Cancel
          </button>
          <button className="px-6 py-2 bg-teal-500 text-white rounded-lg">
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;