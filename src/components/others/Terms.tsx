import React from 'react';

const Terms = () => {
  return (
    <div className="relative">
      {/* Hero Section */}
      <div
        className="h-64 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg')" }}
      >
        <div className="h-full bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">Terms Of Use</h1>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <p className="text-gray-500 text-sm">Home &gt; Terms Of Use</p>
      </div>

      {/* Terms Content */}
      <div className="container mx-auto px-4 py-4">
        <div className="prose mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Terms and Conditions of Service and Use</h2>

          <section className="mb-6">
            <h3 className="text-xl font-medium mb-2">1. General</h3>
            <p className="text-gray-700 leading-relaxed">
              Escapenfly hereinafter referred to as the “Company” (where such expression shall, unless repugnant to the context thereof, be deemed to include its respective legal heirs, representatives, administrators, permitted successors and assigns.) The creator of these Terms of Service ensures steady commitment to Your privacy with regard to the protection of your invaluable information. This document contains information about the Website www.escapenfly.com hereinafter collectively referred to as the “Platform”.
            </p>
          </section>

          <section className="mb-6">
            <h3 className="text-xl font-medium mb-2">2. Definition</h3>
            <p className="text-gray-700 leading-relaxed">
              For the purpose of these Terms of Use (“Terms”), wherever the context so requires...
            </p>
          </section>

          {/* Add more sections as needed */}
        </div>
      </div>
    </div>
  );
};

export default Terms;