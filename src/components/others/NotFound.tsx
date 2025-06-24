export default function NotFound() {
  return (
    <div className="relative">
          <div className="h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg')" }}>
            <div className="h-full bg-black bg-opacity-50 flex items-center justify-center">
              {/* <h1 className="text-4xl font-bold text-white">About Us</h1> */}
            </div>
          </div>
    
          <div className="container mx-auto px-4 py-8 bg-slate-100 dark:bg-gray-800">
            <div className="prose mx-auto mt-8">
            <section className="mb-6 flex flex-col items-center text-center">
                <div className="mb-4">
                    {/* Exclamation triangle icon (Heroicons/Outline) */}
                    <svg
                        className="w-16 h-16 text-yellow-500 mx-auto"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v4m0 4h.01M21 19a2 2 0 01-1.73 1H4.73A2 2 0 013 19l7.29-12.29a2 2 0 013.42 0L21 19z"
                        />
                    </svg>
                </div>
                <h2 className="text-3xl font-bold mb-2">404 - Not Found</h2>
                <p className="text-md mb-4 text-gray-600 dark:text-gray-300">
                    Sorry, the page you are looking for does not exist.<br />
                    Feel free to reach out to us at our contact page.
                </p>
                <div className="flex items-center justify-center space-x-2">
                    {/* Envelope icon */}
                    <svg
                        className="w-5 h-5 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16 12l-4-4-4 4m8 0v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6"
                        />
                    </svg>
                    <a href="/contact" className="text-blue-500 underline font-medium">
                        Contact Us
                    </a>
                </div>
            </section>
            </div>
          </div>
        </div>
  );
}
