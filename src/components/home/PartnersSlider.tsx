import React from 'react';
import Slider from 'react-slick';

const partners = [
  {
    id: 1,
    name: 'Amadeus',
    logo: 'https://amadeus.com/content/dam/amadeuswebevo/brand/amadeus/logos/amadeus-logo-dark-sky.png',
  },
  {
    id: 2,
    name: 'Expedia',
    logo: 'https://www.expedia.co.in/_dms/header/logo.svg?locale=en_GB&siteid=27&2&6f9ec7db',
  },
  {
    id: 3,
    name: 'OTOAI',
    logo: 'http://otoai.org/assets/frontend/images/logo.jpg',
  },
  {
    id: 4,
    name: 'Batik Air',
    logo: 'https://cms-cdn.batikair.com/assets/66472e6388f4647bd5f90f87/common/logo-white.png',
  },
  {
    id: 5,
    name: 'Viator',
    logo: 'https://cloud.asset.cronberry.com/image_file/originalFile_1746722240958_viator_logo.png',
  },
  {
    id: 6,
    name: 'IATA',
    logo: 'https://www.iata.org/contentassets/3e83770142a040d688e269bb2f709b7b/iata-logo-header.svg?height=127&rmode=crop&v=20240116100112',
  },
  {
    id: 7,
    name: 'Dubai DET',
    logo: 'https://www.dubaidet.gov.ae/en/tourism-training/-/media/common/logos/logo-det-teal-30x50.svg?h=31&iar=0&w=52',
  },
  {
    id: 8,
    name: 'Qatar Tourism',
    logo: 'https://visitqatar.com/etc.clientlibs/visitqatar/clientlibs/clientlib-static/resources/img/logo-qatar-tourism.svg',
  },
  {
    id: 9,
    name: 'Pure New Zealand',
    logo: 'https://www.newzealand.com/resources/themes/reimagine/dist/2025.4.2/images/logos/pure-new-zealand-dual-logo.svg',
  },
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
              <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-lg flex items-center justify-center">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-12 object-contain"
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