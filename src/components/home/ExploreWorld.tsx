import React from 'react';
import Slider from 'react-slick';

// const destinations = [
//   { name: 'Austria', image: 'https://images.pexels.com/photos/1493088/pexels-photo-1493088.jpeg?auto=compress&cs=tinysrgb&w=1600' },
  // { name: 'Finland', image: 'https://images.pexels.com/photos/2004388/pexels-photo-2004388.jpeg?auto=compress&cs=tinysrgb&w=1600' },
  // { name: 'Norway', image: 'https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&w=1600' },
  // { name: 'Italy', image: 'https://images.pexels.com/photos/208701/pexels-photo-208701.jpeg?auto=compress&cs=tinysrgb&w=1600' },
  // { name: 'Switzerland', image: 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=1600' },
  // { name: 'France', image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=1600' },
  // { name: 'United Kingdom', image: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=1600' },
  // { name: 'Turkey', image: 'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&w=1600' },
  // { name: 'Spain', image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1600' },
// ];

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

const destinations = [
  { name: 'Eiffel Tower', image: 'https://images.pexels.com/photos/532826/pexels-photo-532826.jpeg?auto=compress&cs=tinysrgb&w=600', city:"Paris, France" },
  { name: 'Statue of Liberty', image: 'https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg?auto=compress&cs=tinysrgb&w=600', city:"New York, USA" },
  { name: 'Great Wall of China', image: 'https://images.pexels.com/photos/10952316/pexels-photo-10952316.jpeg?auto=compress&cs=tinysrgb&w=600', city:"Beijing, China" },
  { name: 'Machu Picchu', image: 'https://images.pexels.com/photos/612451/pexels-photo-612451.jpeg?auto=compress&cs=tinysrgb&w=600', city:"Cusco, Peru" },
  { name: 'Colosseum', image: 'https://images.pexels.com/photos/1797161/pexels-photo-1797161.jpeg?auto=compress&cs=tinysrgb&w=600', city:"Rome, Italy" },
  { name: 'Taj Mahal', image: 'https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg?auto=compress&cs=tinysrgb&w=600', city:"Agra, India" },
  { name: 'Sydney Opera House', image: 'https://images.pexels.com/photos/1878293/pexels-photo-1878293.jpeg?auto=compress&cs=tinysrgb&w=600', city:"Sydney, Australia" },
  { name: 'Santorini', image: 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=600', city:"Santorini, Greece" },
  { name: 'Christ the Redeemer', image: 'https://images.pexels.com/photos/2818895/pexels-photo-2818895.jpeg?auto=compress&cs=tinysrgb&w=600', city:"Rio de Janeiro, Brazil" },
  { name: 'Pyramids of Giza', image: 'https://images.pexels.com/photos/71241/pexels-photo-71241.jpeg?auto=compress&cs=tinysrgb&w=600', city:"Giza, Egypt" },
  { name: 'Big Ben', image: 'https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=600', city:"London, UK" },
  { name: 'Niagara Falls', image: 'https://images.pexels.com/photos/158398/niagara-falls-waterfall-horseshoe-158398.jpeg?auto=compress&cs=tinysrgb&w=600', city:"Niagara Falls, Canada" },
  { name: 'Mount Fuji', image: 'https://images.pexels.com/photos/3408354/pexels-photo-3408354.jpeg?auto=compress&cs=tinysrgb&w=600', city:"Fujiyoshida, Japan" },
  { name: 'Stonehenge', image: 'https://images.pexels.com/photos/1448136/pexels-photo-1448136.jpeg?auto=compress&cs=tinysrgb&w=600', city:"Wiltshire, UK" },
  { name: 'Acropolis of Athens', image: 'https://images.pexels.com/photos/14557270/pexels-photo-14557270.jpeg?auto=compress&cs=tinysrgb&w=600', city:"Athens, Greece" },
  { name: 'Burj Khalifa', image: 'https://images.pexels.com/photos/162031/dubai-tower-arab-khalifa-162031.jpeg?auto=compress&cs=tinysrgb&w=600', city:"Dubai, UAE" },
  { name: 'Angkor Wat', image: 'https://images.pexels.com/photos/1534057/pexels-photo-1534057.jpeg?auto=compress&cs=tinysrgb&w=600', city:"Siem Reap, Cambodia" },
  { name: 'Grand Canyon', image: 'https://images.pexels.com/photos/33041/antelope-canyon-lower-canyon-arizona.jpg?auto=compress&cs=tinysrgb&w=600', city:"Arizona, USA" },
  { name: 'Petra', image: 'https://images.pexels.com/photos/1631665/pexels-photo-1631665.jpeg?auto=compress&cs=tinysrgb&w=600', city:"Ma'an, Jordan" },
  { name: 'Alhambra', image: 'https://images.pexels.com/photos/30359820/pexels-photo-30359820/free-photo-of-intricate-moorish-archways-in-alhambra-palace-spain.jpeg?auto=compress&cs=tinysrgb&w=600', city:"Granada, Spain" },
  { name: 'Neuschwanstein Castle', image: 'https://images.pexels.com/photos/187854/pexels-photo-187854.jpeg?auto=compress&cs=tinysrgb&w=600', city:"Bavaria, Germany" },
  { name: 'Sagrada Familia', image: 'https://images.pexels.com/photos/4946674/pexels-photo-4946674.jpeg?auto=compress&cs=tinysrgb&w=600', city:"Barcelona, Spain" },
];
const ExploreWorld: React.FC = () => {
  return (
    <section className="py-16 bg-slate-100 dark:bg-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Explore Earth's Masterpieces</h2>
        <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 mb-12">
          Discover the world's most iconic attractions with us.
          </p>
        <div className="flex flex-wrap justify-center gap-6">

          {/* <Slider {...sliderSettings}> */}
          {destinations.sort(() => 0.5 - Math.random())
            .slice(0, 8).map((destination) => (
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
          {/* </Slider> */}
        </div>
      </div>
    </section>
  );
};

export default ExploreWorld;