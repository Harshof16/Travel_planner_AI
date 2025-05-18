import React, { useState, Suspense } from 'react';
import { useLocationPhoto } from '../../hooks/useLocationPhoto';
import { TopRecommendations } from '../../types/tripDetailsTypes';
import Slider from 'react-slick';

interface HandpickedForYouProps {
  recommendations: TopRecommendations
}

const tabOptions = [
  { label: 'Accommodations', key: 'accommodations' },
  { label: 'Activities', key: 'activities' },
];

const sliderSettings = {
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 1500,
  arrows: false,
  dots: false,
};

const HandpickedForYou: React.FC<HandpickedForYouProps> = ({ recommendations }) => {
  const [activeTab, setActiveTab] = useState<'accommodations' | 'activities'>('accommodations');
  const [photoCache, setPhotoCache] = useState<Record<string, string | null>>({});
  const [loadingCache, setLoadingCache] = useState<Record<string, boolean>>({});
  const { fetchPhoto } = useLocationPhoto();

  // Fetch photos for all visible cards in the current tab
  React.useEffect(() => {
    recommendations[activeTab].forEach(async (location) => {
      if (!photoCache[location] && !loadingCache[location]) {
        setLoadingCache((prev) => ({ ...prev, [location]: true }));
        try {
          // Pass height/width for consistent card images
          const imageType = activeTab === 'accommodations' ? 'hotel' : '';
          const url = await fetchPhoto(location, 320, 480, imageType);
          console.log('Fetched photo URL:', url);
          
          setPhotoCache((prev) => ({ ...prev, [location]: url ?? null }));
        } catch (error) {
          console.error('Error fetching photo:', error);
          setPhotoCache((prev) => ({ ...prev, [location]: null }));
        } finally {
          setLoadingCache((prev) => ({ ...prev, [location]: false }));
        }
      }
    });
    // eslint-disable-next-line
  }, [activeTab, recommendations]);

  return (
    <div className="mb-8 mt-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Handpicked for You</h2>
      <div className="mb-6 flex gap-2">
        {tabOptions.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as 'accommodations' | 'activities')}
            className={`px-4 py-1 rounded-full border text-sm font-medium transition-colors ${activeTab === tab.key
                ? 'bg-teal-500 text-white border-teal-500'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6">
        <Suspense fallback={<div>Loading...</div>}>
        <Slider {...sliderSettings}>

        {recommendations[activeTab].map((item, idx) => {
          return (
            <div
              key={idx}
              className="group relative rounded-xl overflow-hidden h-80 flex flex-col justify-end border border-gray-300 dark:border-gray-700 shadow-sm"
              style={{ minHeight: '20rem' }}
            >
              {/* Image background */}
              <div className="absolute inset-0 z-0">
              {loadingCache[item] ? (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 animate-pulse">Loading...</div>
              ) : photoCache[item] ? (
                <img src={photoCache[item]!} alt={item} className="object-cover w-full h-full" loading="lazy" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-400">
                <img src="https://www.happydaystravelblog.com/wp-content/uploads/2024/04/Travel-collage-1140x475.png" alt={item} className="object-cover w-full h-full" loading="lazy" />
                </div>
              )}
              {/* Gradient overlay */}
              <div className="absolute inset-0" style={{background: 'linear-gradient(to top, rgba(17,24,39,0.85) 0%, rgba(17,24,39,0.5) 60%, rgba(17,24,39,0.1) 100%)'}} />
              </div>
              {/* Card content */}
              <div className="relative z-10 p-6 flex flex-col justify-end h-full">
              <h3 className="text-xl font-semibold text-white drop-shadow mb-1">{item}</h3>
              </div>
            </div>
          );
        })}
        </Slider>
        </Suspense>
      </div>
    </div>
  );
};

export default HandpickedForYou;
