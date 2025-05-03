import React from 'react';

const destinations = [
//   { name: 'Austria', image: 'https://images.pexels.com/photos/1493088/pexels-photo-1493088.jpeg?auto=compress&cs=tinysrgb&w=1600' },
  { name: 'Finland', image: 'https://images.pexels.com/photos/2004388/pexels-photo-2004388.jpeg?auto=compress&cs=tinysrgb&w=1600' },
  { name: 'Norway', image: 'https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&w=1600' },
  { name: 'Italy', image: 'https://images.pexels.com/photos/208701/pexels-photo-208701.jpeg?auto=compress&cs=tinysrgb&w=1600' },
  { name: 'Switzerland', image: 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=1600' },
  { name: 'France', image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=1600' },
  { name: 'United Kingdom', image: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=1600' },
  { name: 'Turkey', image: 'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&w=1600' },
  { name: 'Spain', image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1600' },
];

const ExploreWorld: React.FC = () => {
  return (
    <section className="py-16 bg-slate-100 dark:bg-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-12">Explore The World</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {destinations.map((destination) => (
            <div key={destination.name} className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-110 cursor-pointer">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                {destination.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreWorld;