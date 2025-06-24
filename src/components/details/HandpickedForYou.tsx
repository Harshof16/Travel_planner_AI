import React, { useState, Suspense } from 'react';
import { useLocationPhoto } from '../../hooks/useLocationPhoto';
import { TopRecommendations } from '../../types/tripDetailsTypes';
import Slider from 'react-slick';

interface HandpickedForYouProps {
  recommendations: TopRecommendations,
  destinations?: string[],
}

interface TabLabels {
  hotels: string;
  restaurants: string;
  attractions: string;
}

const tabOptions = [
  { label: 'Accommodations', key: 'hotels' },
  { label: 'Restaurants', key: 'restaurants' },
  { label: 'Attractions', key: 'attractions' },
  // { label: 'Activities', key: 'activities' },
];

const sliderSettings = {
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 1500,
  arrows: false,
  dots: false,
  responsive: [
    {
      breakpoint: 1380, // <1380px
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 1024, // <1024px
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 640, // <640px
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const HandpickedForYou: React.FC<HandpickedForYouProps> = ({ recommendations, destinations }) => {
  const [activeTab, setActiveTab] = useState<keyof TabLabels>('hotels'); // Default to 'hotels'
  const [photoCache, setPhotoCache] = useState<Record<string, string | null>>({});
  const [loadingCache, setLoadingCache] = useState<Record<string, boolean>>({});
  const { fetchPhoto, getRecommendations } = useLocationPhoto();

  // Fetch photos for all visible cards in the current tab
  React.useEffect(() => {
    // recommendations[activeTab].forEach(async (location) => {
    //   if (!photoCache[location] && !loadingCache[location]) {
    //     setLoadingCache((prev) => ({ ...prev, [location]: true }));
    //     try {
    //       // Pass height/width for consistent card images
    //       const imageType = activeTab === 'accommodations' ? 'hotel' : '';
    //       const url = await fetchPhoto(location, 320, 480, imageType);
    //       // console.log('Fetched photo URL:', url);
          
    //       setPhotoCache((prev) => ({ ...prev, [location]: url ?? null }));
    //     } catch (error) {
    //       console.error('Error fetching photo:', error);
    //       setPhotoCache((prev) => ({ ...prev, [location]: null }));
    //     } finally {
    //       setLoadingCache((prev) => ({ ...prev, [location]: false }));
    //     }
    //   }
    // });
    // eslint-disable-next-line
    if (!destinations || destinations.length === 0) return;
    destinations.forEach(async (location) => {
      // the cache structure is { activeTab: { location: recommendationData } }
      const category = activeTab;
      const cacheKey = `${activeTab}_${location}`;
      if (!photoCache[cacheKey] && !loadingCache[cacheKey]) {
        setLoadingCache((prev) => ({ ...prev, [cacheKey]: true }));
        try {
          const recommendationData = await getRecommendations(location, category);
          // console.log('Fetched recommendation data:', recommendationData);
          if (!recommendationData) return;
          setPhotoCache((prev) => ({ ...prev, [cacheKey]: recommendationData ?? null }));

        } catch (error) {
          console.error('Error fetching photo:', error);
          setPhotoCache((prev) => ({ ...prev, [cacheKey]: null }));
        } finally {
          setLoadingCache((prev) => ({ ...prev, [cacheKey]: false }));
        }
      }
    });
  }, [activeTab, destinations]);

  return (
    <div className="mb-8 mt-8 pt-8">
      <h2 className="text-2xl font-bold mb-6 text-teal-700 dark:text-teal-300">Handpicked for You</h2>
      <div className="mb-6 flex gap-2">
        {tabOptions.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as keyof TabLabels)}
            className={`px-4 py-1 rounded-full border text-sm font-medium transition-colors ${activeTab === tab.key
                ? 'bg-teal-500 text-white border-teal-500'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 mt-8 pt-8">
        <Suspense fallback={<div>Loading...</div>}>
        <Slider {...sliderSettings}>

        {
          destinations && destinations.length > 0 && destinations.map((location, idx) => {
            const recommendationData = photoCache[`${activeTab}_${location}`] || null;
            const isLoading = loadingCache[`${activeTab}_${location}`];

            // console.log("recommendation:::", recommendationData);
            
            if (isLoading) {
              return (
                <div key={idx} className="group cursor-pointer px-4">
                  <div className="relative overflow-hidden rounded-xl mb-4">
                    <div className="w-full h-80 flex items-center justify-center bg-gray-200 dark:bg-gray-700 animate-pulse">Loading...</div>
                  </div>
                </div>
              );
            }
            if (!recommendationData || !Array.isArray(recommendationData) || recommendationData.length === 0) {
              // Only show the "No data available" message for the first destination
              if (idx === 0) {
                return (
                  <div key="no-data" className="group cursor-pointer px-4">
                    <div className="w-full h-80 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-500 dark:text-gray-400">
                      No data available, Try again later!
                    </div>
                  </div>
                );
              }
              // For other destinations, render nothing
              return null;
            }

            return recommendationData.length > 0 && recommendationData.map((rec: any, recIdx: number) => {
              const photoUrl = rec?.large_photos[0] || null;
              return (
               <div key={idx + "_" + recIdx} className="group cursor-pointer px-4">
                  <div className="relative overflow-hidden rounded-xl mb-4">
                    {isLoading ? (
                      <div className="w-full h-80 flex items-center justify-center bg-gray-200 dark:bg-gray-700 animate-pulse">Loading...</div>
                    ) : photoUrl ? (
                      <img src={photoUrl} alt={rec.name || location} className="object-cover w-full h-80 transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                    ) : (
                      <div className="w-full h-80 flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-400 ">
                        <img src="https://www.happydaystravelblog.com/wp-content/uploads/2024/04/Travel-collage-1140x475.png" alt={rec.name || location} className="object-cover w-full h-80 transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end" >
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-white hover:text-teal-500 ">{rec.name || rec.title || location}</h3>
                      </div>
                    </div>
                  </div>
                  {rec.rating && (
                    <div className="text-yellow-400 text-sm mt-1">
                      <img src={rec.rating_image_url} alt={`Rating for ${rec.name || rec.title || location}`} className="inline-block" />
                    </div>
                  )}
                  {rec.description && (
                  <p className="text-gray-600 dark:text-gray-300 break-words line-clamp-3">
                    {rec.description}
                  </p>
                  )}
                </div>
              );
            });
           
          })}
        {
        // recommendations[activeTab].map((item, idx) => {
          // return (
            // <div
            //   key={idx}
            //   className="group relative h-80 px-4"
            //   style={{ minHeight: '20rem' }}
            // >
            //   {/* Image background */}
            //   <div className="inset-0 z-0 overflow-hidden rounded-xl">
            //   {loadingCache[item] ? (
            //     <div className="w-full h-80 flex items-center justify-center bg-gray-200 dark:bg-gray-700 animate-pulse">Loading...</div>
            //   ) : photoCache[item] ? (
            //     <img src={photoCache[item]!} alt={item} className="object-cover w-full h-80 transition-transform duration-700 group-hover:scale-110" loading="lazy" />
            //   ) : (
            //     <div className="w-full h-80 flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-400 ">
            //     <img src="https://www.happydaystravelblog.com/wp-content/uploads/2024/04/Travel-collage-1140x475.png" alt={item} className="object-cover w-full h-80 transition-transform duration-700 group-hover:scale-110" loading="lazy" />
            //     </div>
            //   )}
            //   {/* Gradient overlay */}
            //   <div className="absolute inset-0" style={{background: 'linear-gradient(to top, rgba(17,24,39,0.85) 0%, rgba(17,24,39,0.5) 60%, rgba(17,24,39,0.1) 100%)'}} />
            //   <div className="absolute inset-0 from-black/70 to-transparent flex items-end">
            //     <div className="p-6">
            //       <h3 className="text-xl font-bold text-white hover:text-teal-500 ">{item}</h3>
            //     </div>
            //   </div>
            //   {/* Card content */}
            //   {/* <div className="px-6 justify-end h-full">
            //   <h3 className="text-xl font-semibold text-white drop-shadow mb-1">{item}</h3>
            //   </div> */}
            //   </div>
            // </div>
            // <div key={idx} className="group cursor-pointer px-4">
            //     <div className="relative overflow-hidden rounded-xl mb-4">
          //         {loadingCache[item] ? (
          //           <div className="w-full h-80 flex items-center justify-center bg-gray-200 dark:bg-gray-700 animate-pulse">Loading...</div>
          //         ) : photoCache[item] ? (
          //           <img src={photoCache[item]!} alt={item} className="object-cover w-full h-80 transition-transform duration-700 group-hover:scale-110" loading="lazy" />
          //         ) : (
          //           <div className="w-full h-80 flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-400 ">
          //           <img src="https://www.happydaystravelblog.com/wp-content/uploads/2024/04/Travel-collage-1140x475.png" alt={item} className="object-cover w-full h-80 transition-transform duration-700 group-hover:scale-110" loading="lazy" />
          //           </div>
          //         )}
          //         <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end" >
          //           <div className="p-6">
          //             <h3 className="text-xl font-bold text-white hover:text-teal-500 ">{item}</h3>
          //           </div>
          //         </div>
          //       </div>
          //     </div>
          // );
        // })
  }
        </Slider>
        </Suspense>
      </div>
    </div>
  );
};

export default HandpickedForYou;
