import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Experience {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
}

const experiences: Experience[] = [
  {
    id: 1,
    title: 'Honeymoon',
    category: 'Trip',
    image: 'https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=1600',
    description: 'Plan your romantic getaway to the most beautiful destinations.'
  },
  {
    id: 2,
    title: 'Family',
    category: 'Vacation',
    image: 'https://images.pexels.com/photos/2870167/pexels-photo-2870167.jpeg?auto=compress&cs=tinysrgb&w=1600',
    description: 'Create unforgettable memories with your loved ones.'
  },
  {
    id: 3,
    title: 'Beach',
    category: 'Holiday',
    image: 'https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&w=1600',
    description: 'Relax and unwind on the world’s most stunning beaches.'
  },
  {
    id: 4,
    title: 'Adventure',
    category: 'Trails',
    image: 'https://images.pexels.com/photos/307008/pexels-photo-307008.jpeg?auto=compress&cs=tinysrgb&w=1600',
    description: 'Embark on thrilling adventures and explore the great outdoors.'
  }
];

const ThemeTravel: React.FC = () => {
  const navigate = useNavigate();

  const handleSearch = (activeTab: string, params: object) => {
    // const params: string[] = [];
    if (activeTab === 'package' || activeTab === 'weather' || activeTab === 'hacks') {
        // params.push(`type=${activeTab}`);
        // params.push(`destination=${userInputLocation}`);
        // params.push(`no_of_days={total:5}`);
        // if (userInputMonth) {
        //     params.push(`date=${userInputMonth}`);
        // }
    } else if (activeTab === 'visa') {
        // params.push(`type=visa`);
        // if (visaLeavingFrom) params.push(`source=${visaLeavingFrom}`);
        // if (visaTravelTo) params.push(`destination=${visaTravelTo}`);
        // if (visaNationality) params.push(`nationality=${visaNationality}`);
    }
    const query = Object.entries(params)
        .map(([key, value]) => {
            if (value === undefined || value === "") {
                return "";
            }
            return `${encodeURIComponent(key)}=${encodeURIComponent(Array.isArray(value) ? JSON.stringify(value) : value)}`;
        })
        .join('&');
    
    // console.log(`Navigating to /trips?${query}`);
    
    navigate(`/trips?${query}`);
  };

  return (
    <section id="experiences" className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-teal-600 dark:text-teal-400 font-medium uppercase tracking-wider">Unforgettable moments</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Craft your Travel Experience</h2>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            Go beyond ordinary tourism with our specially crafted travel experiences.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {experiences.map((experience) => (
            <div key={experience.id} className="group cursor-pointer" onClick={() => handleSearch('package', { theme: experience.title, type: 'package' })}>
              <div className="relative overflow-hidden rounded-xl mb-4">
                <img 
                  src={experience.image} 
                  alt={experience.title}
                  className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 bg-teal-600 text-white text-xs rounded-full mb-2">
                      {experience.category}
                    </span>
                    <h3 className="text-xl font-bold text-white hover:text-teal-500">{experience.title}</h3>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {experience.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThemeTravel;