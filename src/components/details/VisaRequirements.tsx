import React from 'react';
import { VisaRequirement } from '../../types/tripDetailsTypes';
import { BookmarkCheck, ClipboardList, LayoutList, MapPin } from 'lucide-react';

interface VisaRequirementsProps {
  requirements: VisaRequirement[];
  isMobile: boolean;
}

const VisaRequirements: React.FC<VisaRequirementsProps> = ({ requirements, isMobile }) => (
  <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md mt-8 ${isMobile ? 'p-4' : 'p-6'}`}>
    <h2 className="text-2xl font-bold mb-6 text-teal-700 dark:text-teal-300">Visa Requirements</h2>
    <div className="">
      <ul className="space-y-6">
        {requirements.map((item, idx) => (
          <li key={idx} className="leading-relaxed border border-gray-300 dark:border-gray-700 rounded-lg pb-4">
            <div className="flex items-center bg-gray-100 dark:bg-gray-700 mb-2 p-4 rounded-lg">
              <MapPin className="w-6 h-6 text-teal-600 dark:text-teal-400 mr-2" />
              <span className="text-lg font-semibold text-teal-600 dark:text-teal-400 mr-2">{item.country}</span>
            </div>
            <div className={`m-2 ${isMobile ? "p-2" : "p-4"}`}>
              <p className="text-gray-800 dark:text-gray-200 text-md mb-4">{item.visa_type} with processing of <strong>{item.processing_time}</strong> Approx.</p>
              <div className='pb-4'>
                <h4 className={`text-md font-extrabold text-gray-700 dark:text-teal-500 flex items-center tracking-wide bg-gray-100 dark:bg-gray-700 mb-2 rounded-lg ${isMobile ? 'p-2' : 'p-4'}`}>
                  <ClipboardList className='mr-2'/>
                  Steps
                </h4>
                {item.step_by_step_guide.length > 0 ? (
                    <ol className={`list-decimal ${isMobile ? "ml-3 px-1" : "ml-6 px-4"}`}>
                      {item.step_by_step_guide.map((step, aidx) => (
                        <li key={aidx} className="text-md text-gray-700 dark:text-gray-200 mb-2 leading-relaxed">
                          <strong>{step.step_title}</strong>
                          <br />
                          <span className="text-sm text-gray-600 dark:text-gray-400 justify-between">
                            {step.description} (Approx. {step.expected_duration})
                            <br />
                            <em>Note: {step.tips}</em>
                          </span>
                        </li>
                      ))}
                    </ol>
                ) : (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1"></p>
                )}
              </div>

              <div className='pb-4'>
                <h4 className={`text-md font-extrabold text-gray-700 dark:text-teal-500 flex items-center tracking-wide bg-gray-100 dark:bg-gray-700 mb-2 ${isMobile ? 'p-2' : 'p-4'} rounded-lg`}>
                  <LayoutList className='mr-2'/>
                  Required Documents
                </h4>
                {item.required_documents.length > 0 ? (
                  <ul className={`list-disc ${isMobile ? "ml-3 px-1" : "ml-6 px-4"}`}>
                    {item.required_documents.map((requirement, aidx) => (
                      <li key={aidx} className="text-md text-gray-700 dark:text-gray-200 mb-1 leading-relaxed">
                        {requirement}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1"></p>
                )}
              </div>

              <div className='pb-4'>
                <h4 className={`text-md font-extrabold text-gray-700 dark:text-teal-500 flex items-center tracking-wide bg-gray-100 dark:bg-gray-700 mb-2 ${isMobile ? 'p-2' : 'p-4'} rounded-lg`}>
                  <BookmarkCheck className='mr-2'/>
                  Special Tips
                </h4>
                {item.special_considerations && item.special_considerations.length > 0 ? (
                  <ul className={`list-disc ${isMobile ? "ml-3 px-1" : "ml-6 px-4"}`}>
                    {item.special_considerations.map((requirement, aidx) => (
                      <li key={aidx} className="text-md text-gray-700 dark:text-gray-200 mb-1 leading-relaxed">
                        {requirement}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1"></p>
                )}
              </div>

            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default VisaRequirements;
