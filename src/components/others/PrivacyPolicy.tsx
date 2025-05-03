import React from 'react';
import { privacyPolicy } from '../../data/privacyPolicy';

const PrivacyPolicy = () => {
  return (
    <div className="relative">
      <div className="h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://images.pexels.com/photos/3184631/pexels-photo-3184631.jpeg')" }}>
        <div className="h-full bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">Privacy Policy</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <p className="text-gray-500 text-sm">Home &gt; Privacy Policy</p>
        <div className="prose mx-auto mt-10">
          <h2 className="text-2xl font-semibold mb-4">Our Commitment to Your Privacy</h2>
          <section className="mb-6">
            <pre className="whitespace-pre-wrap break-words overflow-wrap text-lg leading-relaxed font-sans">
              {privacyPolicy}
            </pre>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;