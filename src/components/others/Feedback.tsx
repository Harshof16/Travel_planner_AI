import React from 'react';

const Feedback = () => {
  return (
    <div className="relative">
      <div className="h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg')" }}>
        <div className="h-full bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">Feedback</h1>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <p className="text-gray-500">Home &gt; Feedback</p>
        <div className="prose mx-auto">
          <h2>We Value Your Feedback</h2>
          <p>
            Your feedback helps us improve and provide better services. Please share your thoughts and suggestions with us.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Feedback;