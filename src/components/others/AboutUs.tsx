import { aboutUs } from "../../data/aboutUs";

const AboutUs = () => {
  return (
    <div className="relative">
      <div className="h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg')" }}>
        <div className="h-full bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">About Us</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <p className="text-gray-500 text-sm">Home &gt; About Us</p>
        <div className="prose mx-auto mt-8">
          <section className="mb-6">
            <pre className="whitespace-pre-wrap break-words overflow-wrap text-lg leading-relaxed font-sans">
              {aboutUs}
            </pre>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;