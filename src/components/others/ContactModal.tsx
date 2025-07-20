import axios from "axios";
import { Send } from "lucide-react";
import { useState } from "react";
import { Alert } from "../ui/Alert";
import { AlertType, companyName } from "../../data/constants";

const ContactModal = ({ isMobile, isOpen, setIsOpen }: { isMobile: boolean; isOpen: boolean; setIsOpen: (value: boolean) => void }) => {
    const toggleModal = () => {
        setIsOpen(false);
    };
    
    if (!isOpen) return null;
    
    const [alert, setAlert] = useState<{
            type: AlertType;
            message: string;
        } | null>(null);
    

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
        const url = "https://marketplace.cronberry.com/api/leads/webhook/f2648659bf224f7b";
        // post this form data to the constant url
        const payload = {
            name: formData.name,
            email: formData.email,
            query: formData.query,
            mobile: formData.phone,
            type: formData.type
        };

        axios.post(url, payload)
            .then(response => {
                // console.log('Form submitted successfully:', response.data);
                setAlert({
                    type: "success",
                    message: `Thank you for contacting ${companyName}. Our customer support team will get back to you within 24 hours.`
                });
            })
            .catch(error => {
                // console.error('Error submitting the form:', error);
                setAlert({
                    type: "error",
                    message: 'There was an error submitting the form. Please try again later.'
                });
            });
        // console.log(formData);
        // Reset form
        setFormData({
            name: '',
            email: '',
            phone: '',
            query: '',
            type: 'query'
        });
    };

    return (
       <div
        id="modal-overlay"
        className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30 backdrop-blur-sm p-4 sm:p-6"
        onClick={handleOutsideClick}
    >
        <div
            className="relative w-full max-w-4xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg shadow-lg flex flex-col md:flex-row overflow-hidden max-h-[95vh]"
            onClick={(e) => e.stopPropagation()} // prevent modal close on internal click
        >
            {/* Close Button */}
            <button
                onClick={toggleModal}
                className="absolute top-4 right-4 z-50 text-4xl text-gray-400 dark:text-white hover:text-gray-500 dark:hover:text-gray-300"
            >
                &times;
            </button>

            {/* Form Section */}
            <div className={`md:w-1/2 ${isMobile ? 'px-8 py-8' : 'px-12 py-16'} flex flex-col justify-center`}>
                <div className="mb-4 text-center">
                    <span className="text-lg sm:text-3xl font-bold">Contact Us</span>
                </div>
                <p className={`text-xs mb-6 text-gray-900 dark:text-white ${isMobile ? 'hidden' : ''}`}>
                    Whether you have a question about our destinations, need travel advice, or want to plan your next adventure, our team is here to help. Reach out and we'll get back to you promptly.
                </p>
                {alert && (
                    <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} duration={10000}/>
                )}
                <form className="space-y-2">
                    <input
                        id="name"
                        type="text"
                        name="name"
                        onChange={handleChange}
                        placeholder="Name"
                        className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500"
                    />
                    <input
                        id="email"
                        type="email"
                        name="email"
                        onChange={handleChange}
                        placeholder="Email"
                        className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500"
                    />
                    <input
                        id="phone"
                        type="tel"
                        name="phone"
                        onChange={handleChange}
                        placeholder="Phone"
                        className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500"
                    />
                    <textarea
                        id="query"
                        name="query"
                        onChange={handleChange}
                        placeholder="How can we help you?"
                        rows={4}
                        className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500"
                    ></textarea>
                    <button
                        type="submit"
                        className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-md px-3 py-2 flex items-center justify-center transition-colors"
                        onClick={handleSubmit}
                    >
                        <Send size={18} className="mr-2" />
                        Submit
                    </button>
                </form>
            </div>

            {/* Image Section */}
            <div className={`md:w-1/2 w-full h-64 md:h-auto relative ${isMobile ? 'hidden' : 'block'}`}>
                <div className="absolute inset-0 bg-black bg-opacity-50 z-10 rounded-r-lg"></div>
                <img
                    src="https://images.pexels.com/photos/7504896/pexels-photo-7504896.jpeg"
                    alt="Contact Us"
                    className="w-full h-full object-cover rounded-b-lg md:rounded-b-none md:rounded-r-lg"
                />
            </div>
        </div>
    </div>

    );
};

export default ContactModal;