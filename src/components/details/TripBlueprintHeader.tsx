import React, { useState } from 'react';
import { MapPin, Download, Share2 } from 'lucide-react';
import Filters from './Filters';

const TripBlueprintHeader: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow flex items-center px-8 py-6 mb-8">
        <MapPin className="w-6 h-6 text-teal-600 dark:text-teal-400 mr-4 mb-4" />
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Bali Trip Blueprint</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Drag and drop days to reorder your itinerary. Click on each day to see detailed activities.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded transition-colors">
            <Download className="w-6 h-6 text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400" />
          </button>
          <button className="p-2 rounded transition-colors">
            <Share2 className="w-6 h-6 text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400" />
          </button>
          <button
            className="ml-4 px-6 py-2 border border-teal-500 dark:border-teal-400 rounded-lg text-teal-700 dark:text-teal-300 font-semibold bg-white dark:bg-gray-900 hover:bg-teal-50 dark:hover:bg-teal-900 transition-colors"
            onClick={() => setShowFilters(true)}
          >
            Advance Search
          </button>
        </div>
      </div>
      {showFilters && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-2xl w-full p-6 relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 dark:hover:text-white text-2xl"
              onClick={() => setShowFilters(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <Filters />
          </div>
        </div>
      )}
    </>
  );
};

export default TripBlueprintHeader;