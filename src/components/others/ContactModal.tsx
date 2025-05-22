import axios from "axios";
import { Send } from "lucide-react";
import { useState } from "react";

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

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        query: '',
        contact: "",
        type: "query"
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send the form data to your backend
        const url = "https://hook.us2.make.com/9yrgcgtmuivj28j9q71a9qkrhbnnj0b7";
        // post this form data to the constant url
        formData.contact = formData.phone;
        formData.type = "query";
        axios.post(url, formData)
            .then(response => {
                // console.log('Form submitted successfully:', response.data);
                alert('Thank you for your message. We will get back to you soon!');
            })
            .catch(error => {
                // console.error('Error submitting the form:', error);
                alert('There was an error submitting the form. Please try again later.');
            });
        // console.log(formData);
        // Reset form
        setFormData({
            name: '',
            email: '',
            phone: '',
            query: '',
            contact: '',
            type: 'query'
        });
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
                <div className="md:w-1/2 p-6 items-center flex flex-col m-4">
                    <div className="mb-4">
                        <h2 className="text-3xl font-bold">Contact Us</h2>

                    </div>
                    <p className="text-sm mb-6">
                        Whether you have a question about our destinations, need travel advice, or want to plan your next adventure, our team is here to help. Reach out and we'll get back to you promptly.
                    </p>
                    <form>
                        <div className="gap-4 mb-4">
                            <input
                                id="name"
                                type="text"
                                name="name"
                                onChange={handleChange}
                                placeholder="Name"
                                className="w-full px-3 py-2 rounded-md focus:ring-2 focus:ring-teal-500 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                            />
                            {/* <input
                                type="text"
                                placeholder="Last Name"
                                className="w-full px-3 py-2 rounded-md focus:ring-2 focus:ring-teal-500 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                            /> */}
                        </div>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            onChange={handleChange}
                            placeholder="Email"
                            className="w-full px-3 py-2 rounded-md focus:ring-2 focus:ring-teal-500 mb-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                        />
                        <input
                            id="phone"
                            type="tel"
                            name="phone"
                            onChange={handleChange}
                            placeholder="Phone"
                            className="w-full px-3 py-2 rounded-md focus:ring-2 focus:ring-teal-500 mb-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                        />
                        <textarea
                            id="query"
                            name="query"
                            onChange={handleChange}
                            placeholder="How can we help you?"
                            className="w-full px-3 py-2 rounded-md focus:ring-2 focus:ring-teal-500 mb-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                            rows={4}
                        ></textarea>
                        <button
                            type="submit"
                            className="w-full bg-teal-400 hover:bg-teal-500 text-gray-900 font-medium rounded-md px-6 py-3 transition-colors flex items-center justify-center text-white"
                            onClick={handleSubmit}
                        >
                            <Send size={18} className="mr-2" />
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