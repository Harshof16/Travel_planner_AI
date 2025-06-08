import React from 'react';
import Slider from 'react-slick';

const partners = [
  {
    id: 1,
    name: 'Amadeus',
    logo: 'https://amadeus.com/content/dam/amadeuswebevo/brand/amadeus/logos/amadeus-logo-dark-sky.png',
    // logo: "logo/partners/amadeus_logo.png", // Assuming you have a local logo for Amadeus
  },
  {
    id: 2,
    name: 'TripAdvisor',
    logo: 'logo/partners/tripadvisor_logo.png', // Assuming you have a local logo for TripAdvisor
  },
  {
    id: 3,
    name: 'Qatar Airways',
    logo: 'logo/partners/qatar_logo.png',
  },
  {
    id: 4,
    name: 'Fly Emirates',
    logo: 'logo/partners/flyEmirates_logo.png',
  },
  {
    id: 5,
    name: 'Viator',
    logo: 'logo/partners/viator_logo.png',
  },
  {
    id: 6,
    name: 'IATA',
    logo: 'logo/partners/iata_logo.png', // Assuming you have a local logo for IATA
  },
  {
    id: 7,
    name: 'Taj Hotels',
    logo: 'logo/partners/taj_logo.png',
  },
  {
    id: 8,
    name: 'Tourism Malaysia',
    logo: 'logo/partners/malaysia_logo.png',
  },
  {
    id: 9,
    name: 'Tourism Australia',
    logo: 'logo/partners/australiya_logo.png',
  },
  {
    id: 10,
    name: 'IndiGo Airlines',
    logo: 'logo/partners/indigo_logo.png',
  },
  {
    id: 11,
    name: 'Marriott International',
    logo: 'logo/partners/marriott_logo.png',
  },
  {
    id: 12,
    name: 'Singapore Airlines',
    logo: 'logo/partners/singapore_logo.png',
  },
  {
    id: 13,
    name: 'Accor Hotels',
    logo: 'logo/partners/accor_logo.png',
  }
]; 

const sliderSettings = {
  infinite: true,
  speed: 5000,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 0,
  cssEase: 'linear',
  arrows: false,  
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const PartnersSlider: React.FC = () => {
  return (
    <section className="py-8 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-300 mb-12">Our Partners</h2>
        <Slider {...sliderSettings}>
          {partners.map((partner) => (
            <div key={partner.id} className="px-4">
              <div className="bg-gray-200 p-4 rounded-lg flex items-center justify-center">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className={`h-12 object-contain`}
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default PartnersSlider;