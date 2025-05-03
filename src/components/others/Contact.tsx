
const Contact = () => {
    return (
        <div className="relative">
            <div className="h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://images.pexels.com/photos/3184297/pexels-photo-3184297.jpeg')" }}>
                <div className="h-full bg-black bg-opacity-50 flex items-center justify-center">
                    <h1 className="text-4xl font-bold text-white">Contact Us</h1>
                </div>
            </div>
            <div className="container mx-auto px-4 py-4">
                <p className="text-gray-500 text-sm">Home &gt; Contact Us</p>
            </div>

            <div className="container mx-auto px-4 py-4">
                <div className="prose mx-auto">
                    <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                    <section className="mb-6">
                        <p>
                            We strive to provide the best travel experiences. If you are not satisfied with our services, please review our refund policy to understand your options.
                        </p>
                    </section>

                </div>
            </div>
        </div>
    );
};

export default Contact;