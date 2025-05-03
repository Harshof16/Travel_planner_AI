import { refundPolicy } from "../../data/refundPolicy";

const RefundPolicy = () => {
  return (
    <div className="relative">
      <div className="h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://images.pexels.com/photos/3184297/pexels-photo-3184297.jpeg')" }}>
        <div className="h-full bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">Refund Policy</h1>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <p className="text-gray-500 text-sm">Home &gt; Refund Policy</p>
        <div className="prose mx-auto mt-10">
          <h2 className="text-2xl font-semibold mb-4">Our Refund Policy</h2>
          <section className="mb-6">
            <pre className="whitespace-pre-wrap break-words overflow-wrap text-lg leading-relaxed font-sans">
              {refundPolicy}
            </pre>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;