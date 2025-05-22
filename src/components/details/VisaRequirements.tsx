import React from 'react';
import { VisaRequirement } from '../../types/tripDetailsTypes';
import { BookmarkCheck, MapPin } from 'lucide-react';

interface VisaRequirementsProps {
  requirements: VisaRequirement[];
}

const VisaRequirements: React.FC<VisaRequirementsProps> = ({ requirements }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-8">
    <h2 className="text-2xl font-bold mb-6 text-teal-700 dark:text-teal-300">Visa Requirements</h2>
    <div className="">
      <ul className="space-y-6">
        {requirements.map((item, idx) => (
          <li key={idx} className="rounded-lg p-4">
            <div className="flex items-center bg-gray-100 dark:bg-gray-800 mb-2 p-4 rounded-lg">
              <MapPin className="w-6 h-6 text-teal-600 dark:text-teal-400 mr-2" />
              <span className="text-lg font-semibold text-teal-600 dark:text-teal-400 mr-2">{item.country}</span>
            </div>
            <div className="m-2 p-2">
              <p className="text-gray-800 dark:text-gray-200 text-md mb-4">{item.visa_type}.</p>
              <p className="text-gray-800 dark:text-gray-200 text-md mb-4">With <strong>{item.validity}</strong> validity and {item.extension}.</p>
              <h4 className="text-md font-extrabold text-gray-700 dark:text-teal-500 mb-2 flex items-center tracking-wide">
                <BookmarkCheck className='mr-2'/>
                Requirements
              </h4>
              {item.entry_requirements.length > 0 ? (
                  <ul className="list-disc ml-6">
                    {item.entry_requirements.map((requirement, aidx) => (
                      <li key={aidx} className="text-md text-gray-700 dark:text-gray-200 mb-1 leading-relaxed">
                        {requirement}
                      </li>
                    ))}
                  </ul>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1"></p>
              )}

            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default VisaRequirements;
