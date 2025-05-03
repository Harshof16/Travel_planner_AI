import React from 'react';
import Slider from 'react-slick';

const partners = [
    {
      id: 1,
      name: 'Webscale',
      logo: 'https://brandfetch.com/webscale.com/logo.svg', // Official Webscale logo
    },
    {
      id: 2,
      name: 'Walmart',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Walmart_logo.svg/512px-Walmart_logo.svg.png', // Walmart logo
    },
    {
      id: 3,
      name: 'Vue.ai',
      logo: 'https://brandfetch.com/vue.ai/logo.svg', // Vue.ai logo
    },
    {
      id: 4,
      name: 'TikTok',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/TikTok_logo.svg/512px-TikTok_logo.svg.png', // TikTok logo
    },
    {
      id: 5,
      name: 'Shopify Experts',
      logo: 'https://www.kindpng.com/picc/m/298-2984234_shopify-experts-logo-hd-png-download.png', // Shopify Experts logo
    },
    {
      id: 6,
      name: 'ShipStation',
      logo: 'https://www.shipstation.com/wp-content/themes/shipstation/images/shipstation-logo.svg', // ShipStation logo
    },
    {
      id: 7,
      name: 'Buy with Prime',
      logo: 'https://m.media-amazon.com/images/G/01/BuyWithPrime/brand-assets/buy-with-prime-badge.svg', // Buy with Prime badge
    },
    {
      id: 8,
      name: 'Bonanza',
      logo: 'https://www.bonanza.com/assets/bonanza_logo-3c3b0b9e3c3b0b9e3c3b0b9e3c3b0b9e.svg', // Bonanza logo
    },
    {
      id: 9,
      name: 'BlueSnap',
      logo: 'https://developers.bluesnap.com/v8976-Tools/reference/bluesnap-logos/bluesnap_color_logo.jpg', // BlueSnap logo
    },
    {
      id: 10,
      name: 'Bing Ads',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Bing_Ads_2016_logo.svg/512px-Bing_Ads_2016_logo.svg.png', // Bing Ads logo
    },
    {
      id: 11,
      name: 'BigCommerce',
      logo: 'https://www.bigcommerce.com/assets/logos/bigcommerce-logo-dark.svg', // BigCommerce logo
    },
    {
      id: 12,
      name: 'Best Buy',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Best_Buy_Logo.svg/512px-Best_Buy_Logo.svg.png', // Best Buy logo
    },
    {
      id: 13,
      name: 'Amazon',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/512px-Amazon_logo.svg.png', // Amazon logo
    },
  ];  

const sliderSettings = {
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
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
              <div className="bg-gray-800 p-4 rounded-lg flex items-center justify-center">
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