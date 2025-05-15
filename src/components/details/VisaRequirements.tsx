import React from 'react';
import { VisaRequirement } from '../../types/tripDetailsTypes';

interface VisaRequirementsProps {
  requirements: VisaRequirement[];
}

const VisaRequirements: React.FC<VisaRequirementsProps> = ({ requirements }) => (
  <div className="mb-8 shadow rounded-md p-6">
    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Visa Requirements</h2>
    <div className="max-w-2xl">
      <ul className="space-y-6">
        {requirements.map((item, idx) => (
          <li key={idx} className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <span className="text-lg font-semibold text-teal-600 dark:text-teal-400 mr-2">{item.country}</span>
            </div>
            <p className="text-gray-800 dark:text-gray-200 text-sm">{item.requirement}</p>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default VisaRequirements;
