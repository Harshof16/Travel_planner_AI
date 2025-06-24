

interface AboutUsProps {
  mobileView: boolean;
}

const AboutUs: React.FC<AboutUsProps> = ({ mobileView }) => {
  const proseSectionClass =
    "mb-6 bg-slate-100 dark:bg-slate-800 rounded-lg" +
    (mobileView ? " px-4 py-4 " : " p-8 text-justify");
  return (
    <div className="relative">
      <div className="h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg')" }}>
        <div className="h-full bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">About Us</h1>
        </div>
      </div>

      <div className={`container mx-auto ${mobileView ? 'px-2 py-4' : 'px-4 py-8'}`}>
        <p className="text-gray-500 text-sm">Home &gt; About Us</p>
        <div className="prose mx-auto mt-8">
            <section className={proseSectionClass}>
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Your Trusted Partner in Curated Travel Experiences</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Escapenfly is a leading Indian travel company, established in 2015 with a clear vision—to offer personalized, seamless, and meaningful travel solutions for leisure travelers, corporate clients, and global partners.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Over the years, we’ve grown into a full-service travel operator serving both B2B and B2C markets, with expertise in FIT (Free Independent Travelers), Group Tours, MICE, Incentive Travel, and Custom Experiences. Our operations span across India and international destinations, with a multilingual, passionate team dedicated to making travel smooth and unforgettable.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                From holiday planning to visa assistance, from curated sightseeing tours to flight and hotel bookings—Escapenfly is your one-stop travel solution built on trust, transparency, and tailor-made service.
              </p>

              <h3 className="text-xl font-semibold mt-8 mb-2 text-gray-800 dark:text-gray-100">Vision &amp; Philosophy</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                At Escapenfly, we believe that travel is not just about visiting new places—it's about discovering new parts of yourself. Whether it's a family vacation to Europe, a student tour to Singapore, or an incentive group to Dubai, every journey is crafted with attention to detail and care for the traveler’s unique needs.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We are not in the business of bulk packages; we are in the business of building lifelong relationships through exceptional travel experiences.
              </p>

              <h3 className="text-xl font-semibold mt-8 mb-2 text-gray-800 dark:text-gray-100">Meet the Founder – Vineet Bansal</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Escapenfly was founded by Vineet Bansal, a seasoned professional with over 18 years of experience in the travel industry. His career began with India’s most reputed travel brands—Thomas Cook, SOTC, and the Kuoni Group—where he built his foundation in world-class travel operations, client servicing, and destination management.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Having worked with thousands of travelers and corporate clients over the years, Vineet envisioned Escapenfly as a platform that brings corporate-level professionalism and startup-level personalization to Indian and global travelers.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                His personal travels across 35+ countries and his deep-rooted understanding of diverse cultures and travel trends allow Escapenfly to offer insider insights, curated experiences, and unmatched service.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Vineet continues to guide Escapenfly with a hands-on approach, ensuring the company maintains its values of integrity, flexibility, and excellence in every booking.
              </p>

              <h3 className="text-xl font-semibold mt-8 mb-2 text-gray-800 dark:text-gray-100">What We Offer</h3>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4">
                <li className="mb-1 font-semibold">End-to-End Travel Solutions</li>
                <ul className="list-disc pl-6">
                  <li>Domestic &amp; International Holiday Packages</li>
                  <li>Visa Assistance &amp; Documentation</li>
                  <li>Flight Bookings (All Major Airlines)</li>
                  <li>Group Travel &amp; Corporate Incentives</li>
                  <li>Sightseeing Tours, Activities, &amp; Guides</li>
                  <li>Hotel, Transport, Banquets, and Event Setup</li>
                </ul>
                <li className="mt-4 mb-1 font-semibold">Special Expertise in</li>
                <ul className="list-disc pl-6">
                  <li>Europe, Southeast Asia, South Africa, UAE, UK</li>
                  <li>Group Travel: Students, Weddings, Sports, Corporate</li>
                  <li>Customized Itineraries with Multilingual Support</li>
                  <li>MICE Travel: Meetings, Incentives, Conferences, Exhibitions</li>
                </ul>
                <li className="mt-4 mb-1 font-semibold">Accreditations &amp; Affiliations</li>
                <ul className="list-disc pl-6">
                  <li>IATA Certified</li>
                  <li>Recognized Australia Specialist</li>
                  <li>Certified Switzerland Specialist</li>
                  <li>Preferred Partner for Leading Global DMCs</li>
                </ul>
              </ul>

              <h3 className="text-xl font-semibold mt-8 mb-2 text-gray-800 dark:text-gray-100">Why Escapenfly?</h3>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4">
                <li>Personalized Attention – No cookie-cutter plans. Only travel made for you.</li>
                <li>On-Ground Support – From arrival to departure, our team is with you.</li>
                <li>Flexible &amp; Reliable – We adapt to your needs, even at the last minute.</li>
                <li>Global Experience – But always with a human, Indian touch.</li>
                <li>Proven Legacy – Backed by 18+ years of experience and thousands of happy travelers.</li>
              </ul>

              <p className="text-gray-600 dark:text-gray-300 mt-6 font-semibold">
                Let Escapenfly be your travel compass.<br />
                Wherever you want to go—we make it happen, beautifully.
              </p>
            </section>
          </div>
      </div>
    </div>
  );
};

export default AboutUs;