import React from 'react';

interface Experience {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
}

const experiences: Experience[] = [
  {
    id: 1,
    title: 'Honeymoon',
    category: 'Trip',
    image: 'https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=1600',
    description: 'Plan your romantic getaway to the most beautiful destinations.'
  },
  {
    id: 2,
    title: 'Family',
    category: 'Vacation',
    image: 'https://images.pexels.com/photos/2870167/pexels-photo-2870167.jpeg?auto=compress&cs=tinysrgb&w=1600',
    description: 'Create unforgettable memories with your loved ones.'
  },
  {
    id: 3,
    title: 'Beach',
    category: 'Holiday',
    image: 'https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&w=1600',
    description: 'Relax and unwind on the world’s most stunning beaches.'
  },
  {
    id: 4,
    title: 'Adventure',
    category: 'Trails',
    image: 'https://images.pexels.com/photos/307008/pexels-photo-307008.jpeg?auto=compress&cs=tinysrgb&w=1600',
    description: 'Embark on thrilling adventures and explore the great outdoors.'
  }
];

const PersonalizedExperience: React.FC = () => {
  return (
    <section id="experiences" className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-teal-600 dark:text-teal-400 font-medium uppercase tracking-wider">Unforgettable moments</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Craft your Travel Experience</h2>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            Go beyond ordinary tourism with our specially crafted travel experiences.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {experiences.map((experience) => (
            <div key={experience.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-xl mb-4">
                <img 
                  src={experience.image} 
                  alt={experience.title}
                  className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 bg-teal-600 text-white text-xs rounded-full mb-2">
                      {experience.category}
                    </span>
                    <h3 className="text-xl font-bold text-white">{experience.title}</h3>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {experience.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* Testimonials Section */}
        {/* <div className="mt-20">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">What Our Travelers Say</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="bg-white dark:bg-gray-800 overflow-visible">
                <CardBody>
                  <div className="flex items-start gap-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-lg">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.location}</p>
                    </div>
                  </div>
                  <div className="mt-4 relative">
                    <svg className="absolute -top-4 -left-4 w-8 h-8 text-teal-500 opacity-20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <p className="text-gray-600 dark:text-gray-300 italic">
                      "{testimonial.text}"
                    </p>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button variant="secondary" size="lg">
              Read More Reviews
            </Button>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default PersonalizedExperience;