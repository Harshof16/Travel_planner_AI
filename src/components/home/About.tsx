import React from 'react';
import Button from '../ui/Button';
import { Award, MapPin, Clock, Heart } from 'lucide-react';
import { companyName } from '../../data/constants';
import { useNavigate } from 'react-router-dom';

const About: React.FC = () => {
  const navigate = useNavigate();
  
  const handleNavigate = () => {
    navigate('/contact');
  };

  const stats = [
    { value: '10+', label: 'Years of Experience' },
    { value: '50+', label: 'Destinations' },
    { value: '10,000+', label: 'Happy Travelers' },
    { value: '95%', label: 'Customer Satisfaction' }
  ];

  // const values = [
  //   { 
  //     icon: <MapPin className="w-6 h-6" />,
  //     title: 'Local Expertise',
  //     description: 'Our team has in-depth knowledge of each destination we offer.'
  //   },
  //   { 
  //     icon: <Clock className="w-6 h-6" />,
  //     title: 'Time-Saving',
  //     description: 'We handle all the details so you can focus on enjoying your journey.'
  //   },
  //   { 
  //     icon: <Award className="w-6 h-6" />,
  //     title: 'Quality Service',
  //     description: 'We partner with the best local providers to ensure exceptional experiences.'
  //   },
  //   { 
  //     icon: <Heart className="w-6 h-6" />,
  //     title: 'Sustainable Travel',
  //     description: 'We prioritize eco-friendly options and support local communities.'
  //   }
  // ];
  const values = [
    {
      id: 1,
      title: "AI-Powered Itinerary Builder",
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>,
      description: "Create custom trip plans with flights, stays and sightseeing in just 60 seconds - no hassle!",
    },
    {
      id: 2,
      title: "100+ Global Destinations",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-map-pin-icon lucide-map-pin">
        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>
      </svg>,
      description: "From Landon to Bali, plan vecasssions, honeymoons, and family trips to over 100 destinations worldwide.",
    },
    {
      id: 3,
      title: "Instant Quote via WhatsApp",
      icon: 
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 16l2 2 4-4"
        />
      </svg>,
      description: "Get Quick responses, customized quotes, and real-time updates via WhatsApp.",
    },
    {
      id: 4,
      title: "Visa & Travel Support",
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>,
      description: "We handle all your travel needs, including visa applications, insurance and airport transfers - so you can just pack and go!.",
      },
  ]
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left Column - Image */}
          <div className="lg:w-1/2">
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/3184286/pexels-photo-3184286.jpeg?auto=compress&cs=tinysrgb&w=1600" 
                alt="Our Team" 
                className="rounded-lg shadow-xl w-full"
              />
              <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-700 p-4 rounded-lg shadow-lg hidden md:block">
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center px-4">
                      <p className="text-2xl font-bold text-teal-600 dark:text-teal-400">{stat.value}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Content */}
          <div className="lg:w-1/2">
            <span className="text-teal-600 dark:text-teal-400 font-medium uppercase tracking-wider">About {companyName}</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">We Create Unforgettable Travel Experiences</h2>
            
            <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              Founded in 2015, {companyName} has been crafting personalized travel experiences for adventurers from around the world. Our mission is to transform ordinary trips into extraordinary journeys that create lasting memories.
            </p>
            
            <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              Our team of experienced travel experts combines deep local knowledge with personalized service to design the perfect itinerary for your specific interests, preferences, and budget.
            </p>
            
            {/* Mobile Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8 md:hidden">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-2xl font-bold text-teal-600 dark:text-teal-400">{stat.value}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</p>
                </div>
              ))}
            </div>
            
            <Button variant="primary" size="lg" onClick={handleNavigate}>
              Contact Us
            </Button>
          </div>
        </div>
        
        {/* Values Section */}
        <div className="mt-20">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">What Sets Us Apart</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg transition-transform duration-300 hover:transform hover:-translate-y-2">
                <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  {value.icon}
                </div>
                <h4 className="text-xl font-bold mb-4">{value.title}</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;