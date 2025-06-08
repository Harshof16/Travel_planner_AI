import React from 'react';
import { BookmarkCheck, MapPin, PackageCheck } from 'lucide-react';
import { TravelTips, TravelTipsConst} from '../../types/tripDetailsTypes';

interface TravelHacksProps {
  requirements: TravelTips;
  isMobile: boolean;
}

const TripHacks: React.FC<TravelHacksProps> = ({ requirements, isMobile }) => (
  <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md mt-8 ${isMobile ? 'p-4' : 'p-6'}`}>
    <h2 className="text-2xl font-bold mb-6 text-teal-700 dark:text-teal-300">Smart Travel Hacks / Travel Tips</h2>
    <div className="">
      <ul className="space-y-6">
        {Object.entries(requirements).map(([key, value], idx) => (
            <li key={idx} className="rounded-lg py-2">
              <div className={`flex items-center bg-gray-100 dark:bg-gray-700 mb-2 ${isMobile ? 'p-2' : 'p-4'} rounded-lg`}>
                <PackageCheck className="w-6 h-6 text-gray-700 dark:text-teal-500 mr-2" />
                <span className="text-lg font-semibold text-gray-700 dark:text-teal-500 mr-2">{TravelTipsConst[key as keyof typeof TravelTipsConst]}</span>
              </div>
              <div className={`${isMobile ? 'px-2' : 'px-6'}`}>
              {value.map((hack: string, hidx: number) => (
                <li key={hidx} className="text-md text-gray-700 dark:text-gray-200 mb-2 leading-relaxed">
                  <span className="flex items-center">
                    <BookmarkCheck className={`${isMobile ? 'mr-4' : 'mr-2'}`}/> {hack}
                  </span>
                </li>
              ))}
              </div>
            </li> 
          ))}
        {/* {requirements.map((item, idx) => (
          <li key={idx} className="rounded-lg p-4">
            <div className="flex items-center bg-gray-100 dark:bg-gray-800 mb-2 p-4 rounded-lg">
              <span className="text-lg font-semibold text-teal-600 dark:text-teal-400 mr-2">{idx}</span>
            </div>
            <div className="m-2 p-2">
              {item.map(() => (
                <li key={aidx} className="text-md text-gray-700 dark:text-gray-200 mb-1 leading-relaxed">
                  {requirement}
                </li>

              )}
              <p className="text-gray-800 dark:text-gray-200 text-md mb-4">{item.visa_type}.</p>
              <p className="text-gray-800 dark:text-gray-200 text-md mb-4">With <strong>{item.validity}</strong> validity and {item.extension}.</p>
              <h4 className="text-md font-extrabold text-gray-700 dark:text-teal-500 mb-2 flex items-center tracking-wide">
                <BookmarkCheck className='mr-2'/>
                Requirements
              </h4>

            </div>
            </li> 
        ))}*/}
      </ul>
    </div>
  </div>
);

export default TripHacks;
