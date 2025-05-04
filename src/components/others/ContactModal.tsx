const ContactModal = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (value: boolean) => void }) => {
    const toggleModal = () => {
        setIsOpen(false);
    };

    if (!isOpen) return null;

    const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if ((e.target as HTMLElement).id === 'modal-overlay') {
            toggleModal();
        }
    };

    return (
        <div
            id="modal-overlay"
            className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30 backdrop-blur-sm"
            onClick={handleOutsideClick}
        >
            <div
                className="rounded-lg shadow-lg relative flex flex-col md:flex-row bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                style={{ width: '90vw', maxWidth: '60rem', height: '90vh', maxHeight: '40rem' }}
            >
                <button
                    onClick={toggleModal}
                    className="absolute top-4 right-4 z-50 text-2xl text-gray-400 dark:text-white hover:text-gray-500 dark:hover:text-gray-300"
                >
                    &times;
                </button>
                <div className="md:w-1/2 p-6 flex flex-col ">
                    <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
                    <p className="text-sm mb-6">
                        Whether you have a question about our destinations, need travel advice, or want to plan your next adventure, our team is here to help. Reach out and we'll get back to you promptly.
                    </p>
                    <form>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <input
                                type="text"
                                placeholder="First Name"
                                className="w-full px-3 py-2 rounded-md focus:ring-2 focus:ring-teal-500 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                className="w-full px-3 py-2 rounded-md focus:ring-2 focus:ring-teal-500 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                            />
                        </div>
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full px-3 py-2 rounded-md focus:ring-2 focus:ring-teal-500 mb-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                        />
                        <input
                            type="tel"
                            placeholder="Phone"
                            className="w-full px-3 py-2 rounded-md focus:ring-2 focus:ring-teal-500 mb-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                        />
                        <textarea
                            placeholder="How can we help you?"
                            className="w-full px-3 py-2 rounded-md focus:ring-2 focus:ring-teal-500 mb-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                            rows={4}
                        ></textarea>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 font-medium rounded-md hover:bg-teal-600 transition-colors bg-teal-500 text-white"
                        >
                            Submit
                        </button>
                    </form>
                </div>
                <div className="md:w-1/2 relative">
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-r-lg"></div>
                    <img
                        src="https://images.pexels.com/photos/7504896/pexels-photo-7504896.jpeg"
                        alt="Contact Us"
                        className="w-full h-full object-cover rounded-r-lg"
                    />
                </div>
            </div>
        </div>
    );
};

export default ContactModal;