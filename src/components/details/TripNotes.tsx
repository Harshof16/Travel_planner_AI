import React from 'react';

interface TripNotesProps {
  notes: string[];
}

const TripNotes: React.FC<TripNotesProps> = ({ notes }) => (
  <div className="mb-8 mt-8 shadow rounded-xl p-8 bg-white dark:bg-gray-900 border border-teal-100 dark:border-teal-900">
    <h2 className="text-2xl font-bold mb-4 text-teal-700 dark:text-teal-300 tracking-tight">Notes</h2>
    <ul className="list-disc pl-6 space-y-3 text-gray-800 dark:text-gray-200">
      {notes.map((note, idx) => (
        <li key={idx}>{note}</li>
      ))}
    </ul>
  </div>
);

export default TripNotes;
