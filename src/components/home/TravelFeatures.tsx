import React from 'react';

const TravelFeatures: React.FC = () => {
  const features = [
    {
      id: 1,
      title: "Plan your own Trip",
      icon: <svg
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
      description: "Effortless planning with our user-friendly platform and expert support.",
    },
    {
      id: 2,
      title: "Secure Booking",
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>,
      description: "Your payments and personal information are protected with bank-level security.",
    },
    {
      id: 3,
      title: "Flexible Dates",
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>,
      description: "Change your travel dates with no penalties up to 30 days before departure.",
    },
    {
      id: 4,
      title: "24/7 Support",
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>,
      description: "Our travel experts are available around the clock to assist you whenever needed.",
    },
  ]
  return (
    <section id="plan-trip" className="py-2 relative overflow-hidden dark:bg-gray-900 ">
      {/* Background pattern */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-around gap-8 text-center">
          {features.map((feature) => (
            <div key={feature.id} className="px-6 py-2 flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400 rounded-full flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold">{feature.title}</h3>
              {/* <p className="text-gray-600 dark:text-gray-300">
                {feature.description} 
              </p> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TravelFeatures;