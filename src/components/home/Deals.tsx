import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const deals = [
  {
    id: 1,
    location: 'Greece',
    discount: '30% Off',
    image: 'https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&w=1600',
    description: 'Explore the stunning islands and rich history of Greece with exclusive discounts.'
  },
  {
    id: 2,
    location: 'Africa',
    discount: '75% Off',
    image: 'https://images.pexels.com/photos/31875730/pexels-photo-31875730/free-photo-of-giraffes-walking-on-safari-path-in-nature.jpeg?auto=compress&cs=tinysrgb&w=1600',
    description: 'Embark on a thrilling safari adventure and discover Africa’s natural wonders.'
  },
  {
    id: 3,
    location: 'Maldives',
    discount: '50% Off',
    image: 'https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&w=1600',
    description: 'Relax in luxury at the pristine beaches of the Maldives.'
  },
  {
    id: 4,
    location: 'Japan',
    discount: '40% Off',
    image: 'https://images.pexels.com/photos/31863764/pexels-photo-31863764/free-photo-of-traditional-japanese-shrine-in-urban-setting.jpeg?auto=compress&cs=tinysrgb&w=1600',
    description: 'Experience the perfect blend of tradition and modernity in Japan.'
  },
  {
    id: 5,
    location: 'Australia',
    discount: '35% Off',
    image: 'https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=1600',
    description: 'Discover the vibrant cities and breathtaking landscapes of Australia.'
  }
];

const settings = {
  centerMode: true,
  centerPadding: '0',
  slidesToShow: 2,
  infinite: true,
  speed: 500,
  focusOnSelect: true,
  autoplay: true,
  autoplaySpeed: 3000,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const Deals: React.FC = () => {
  return (
    <section className="py-16 bg-slate-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">Deals Of the Month</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          From flights to accommodations and activities, we handle all the details, so you can focus on enjoying your trip.
        </p>
        <Slider {...settings} className="gap-4">
          {deals.map((deal) => (
            <div
              key={deal.id}
              className={`px-2 transition-transform duration-500`}
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <img
                  src={deal.image}
                  alt={deal.location}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <span className="inline-block px-3 py-1 bg-teal-600 text-white text-xs rounded-full mb-2">
                    {deal.location}
                  </span>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                    {deal.discount}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {deal.description}
                  </p>
                  <button className="px-4 py-2 bg-teal-600 text-white rounded-lg shadow-md hover:bg-teal-700">
                    View Trip
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Deals;