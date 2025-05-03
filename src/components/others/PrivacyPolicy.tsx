import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="relative">
      <div className="h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://images.pexels.com/photos/3184631/pexels-photo-3184631.jpeg')" }}>
        <div className="h-full bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">Privacy Policy</h1>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <p className="text-gray-500">Home &gt; Privacy Policy</p>
        <div className="prose mx-auto">
          <h2>Our Commitment to Your Privacy</h2>
          <p>
            At Escapenfly, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;