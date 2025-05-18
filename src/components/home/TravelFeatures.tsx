import React from 'react';

const TravelFeatures: React.FC = () => {
  const features = [
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
    <section id="plan-trip" className="py-2 relative overflow-hidden dark:bg-gray-900 ">
      {/* Background pattern */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-around gap-8 text-center">
          {features.map((feature) => (
        <div key={feature.id} className="px-6 py-4 flex flex-col md:flex-row items-center gap-3">
          <div className="w-10 h-10 bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400 rounded-full flex items-center justify-center">
            {feature.icon}
          </div>
          <div>
            <h3 className="text-lg font-bold">{feature.title}</h3>
          </div>
        </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TravelFeatures;