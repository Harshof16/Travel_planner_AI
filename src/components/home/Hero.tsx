import React, { useEffect, useState } from 'react';
import TripSearchBar from './TripSearchbar';

const Hero: React.FC = () => {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="relative h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden pt-20 md:pt-24" id='home'>
      {/* Parallax Background */}
      <div 
      className="absolute inset-0 z-0"
      style={{ 
        backgroundImage: 'url("https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=1600")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transform: `translateY(${offset * 0.5}px)`,
        filter: 'brightness(0.7)'
      }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/30 to-black/60" />
      
      {/* Content */}
      <div className="container mx-auto px-4 z-20 text-center text-white relative mb-16">
      <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 transition-all duration-700 animate-fadeIn">
        <span className="block"><span className="text-teal-400">Escape</span> the Ordinary</span>
        Embrace the<span className="text-teal-400"> Extraordinary</span>
      </h1>
      
      <p className="text-sm sm:text-base md:text-lg max-w-xl mx-auto mb-6 text-gray-100">
        Epic destinations, unforgettable memories crafted just for you.
      </p>
      
      {/* Search Form */}
      <div className="relative z-30">
        <TripSearchBar />
      </div>
      </div>

      {/* Spacer to prevent collision with header on mobile */}
      <div className="absolute top-0 left-0 right-0 h-20 md:h-24 bg-transparent z-30" />
    </section>
  );
};

export default Hero;