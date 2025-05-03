
const RefundPolicy = () => {
  return (
    <div className="relative">
      <div className="h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://images.pexels.com/photos/3184297/pexels-photo-3184297.jpeg')" }}>
        <div className="h-full bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">Refund Policy</h1>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <p className="text-gray-500">Home &gt; Refund Policy</p>
        <div className="prose mx-auto">
          <h2>Our Refund Policy</h2>
          <p>
            We strive to provide the best travel experiences. If you are not satisfied with our services, please review our refund policy to understand your options.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;