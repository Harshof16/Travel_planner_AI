import React from 'react';
import { Card, CardImage, CardBody, CardFooter } from '../ui/Card';
import Button from '../ui/Button';
import { MapPin } from 'lucide-react';

interface Destination {
  id: number;
  name: string;
  location: string;
  image: string;
  description: string;
  price: string;
  rating: number;
}

const destinations: Destination[] = [
  {
    id: 1,
    name: 'Santorini',
    location: 'Greece',
    image: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=1600',
    description: 'Discover the beauty of white-washed buildings and blue domes overlooking the Aegean Sea.',
    price: '$1,299',
    rating: 4.9
  },
  {
    id: 2,
    name: 'Kyoto',
    location: 'Japan',
    image: 'https://images.pexels.com/photos/31001135/pexels-photo-31001135.jpeg?auto=compress&cs=tinysrgb&w=1600',
    description: 'Experience traditional Japanese culture among ancient temples and beautiful gardens.',
    price: '$1,599',
    rating: 4.8
  },
  {
    id: 3,
    name: 'Bali',
    location: 'Indonesia',
    image: 'https://images.pexels.com/photos/2474690/pexels-photo-2474690.jpeg?auto=compress&cs=tinysrgb&w=1600',
    description: 'Relax on pristine beaches, explore lush rice terraces, and immerse in Balinese spirituality.',
    price: '$1,099',
    rating: 4.7
  },
  {
    id: 4,
    name: 'Amalfi Coast',
    location: 'Italy',
    image: 'https://images.pexels.com/photos/2225442/pexels-photo-2225442.jpeg?auto=compress&cs=tinysrgb&w=1600',
    description: 'Drive along the stunning coastal roads and discover picturesque cliffside villages.',
    price: '$1,499',
    rating: 4.8
  }
];

const Destinations: React.FC = () => {
  return (
    <section id="destinations" className="py-20 bg-slate-100 dark:bg-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-teal-600 dark:text-teal-400 font-medium uppercase tracking-wider">Explore the world</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 ">Popular Destinations</h2>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            Discover our handpicked selection of the most breathtaking locations around the globe.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination) => (
            <Card 
              key={destination.id} 
              className="group hover:translate-y-[-8px] transition-transform duration-300"
            >
              <CardImage 
                src={destination.image} 
                alt={destination.name}
                className="h-56"
              />
              <CardBody>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold">{destination.name}</h3>
                  <span className="flex items-center text-amber-500">
                    <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {destination.rating}
                  </span>
                </div>
                <div className="flex items-center text-gray-500 dark:text-gray-400 mb-3">
                  <MapPin size={16} className="mr-1 text-teal-600 dark:text-teal-400" />
                  {destination.location}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{destination.description}</p>
                {/* <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-teal-700 dark:text-teal-400">{destination.price}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">per person</span>
                </div> */}
              </CardBody>
              <CardFooter className="flex justify-center">
                <Button variant="outline" className="w-full">View Details</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {/* <div className="text-center mt-12">
          <Button variant="primary" size="lg">
            View All Destinations
          </Button>
        </div> */}
      </div>
    </section>
  );
};

export default Destinations;