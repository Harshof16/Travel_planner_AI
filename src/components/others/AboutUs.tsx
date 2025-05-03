const AboutUs = () => {
  return (
    <div className="relative">
      <div className="h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg')" }}>
        <div className="h-full bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">About Us</h1>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="container mx-auto px-4 py-4">
          <p className="text-gray-500 text-sm">Home &gt; About Us</p>
        </div>

        <div className="container mx-auto px-4 py-4">
          <div className="prose mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <section className="mb-6">
              <p>
                Escapenfly is your trusted travel partner, offering curated travel experiences that turn your journeys into unforgettable stories. Our mission is to make travel accessible, enjoyable, and memorable for everyone.
              </p>
            </section>

          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutUs;