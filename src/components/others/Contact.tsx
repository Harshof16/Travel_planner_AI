import axios from "axios";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import React, { useState } from "react";
import { AlertType, companyName } from "../../data/constants";
import { Alert } from "../ui/Alert";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        query: '',
        mobile: "",
        type: "query"
    });

    const [alert, setAlert] = useState<{
        type: AlertType;
        message: string;
    } | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const url = "https://marketplace.cronberry.com/api/leads/webhook/f2648659bf224f7b";
        const payload = {
            name: formData.name,
            email: formData.email,
            query: formData.query,
            mobile: formData.phone,
            type: formData.type
        };

        axios.post(url, payload)
            .then(response => {
                setAlert({
                    type: "success",
                    message: `Thank you for contacting ${companyName}. Our customer support team will get back to you within 24 hours.`
                });
            })
            .catch(error => {
                setAlert({
                    type: "error",
                    message: "Error! Please try again later."
                });
            });

        setFormData({
            name: '',
            email: '',
            phone: '',
            query: '',
            mobile: '',
            type: 'query'
        });
    };

    return (
        <div className="relative">
            <div className="h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://images.pexels.com/photos/3184297/pexels-photo-3184297.jpeg')", backgroundColor: '#1E293B' }}>
                <div className="h-full bg-black bg-opacity-50 flex items-center justify-center">
                    <h1 className="text-4xl font-bold text-white">Contact Us</h1>
                </div>
            </div>
            <div className="container mx-auto px-4 py-8">

                <div className="text-center mb-16">
                    <span className="block text-teal-600 dark:text-teal-400 font-medium mb-2">Get in Touch</span>
                    <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                        Have questions about planning your next trip? Our team of travel experts is here to assist you in creating unforgettable journeys tailored to your needs.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                    {/* Contact Information */}
                    <div className="lg:col-span-2 bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-md">
                        <h3 className="text-2xl font-bold text-teal-600 dark:text-teal-400 mb-6">Our Information</h3>

                        <div className="space-y-6">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 mt-1">
                                    <MapPin size={24} className="text-teal-600 dark:text-teal-400" />
                                </div>
                                <div className="ml-4" onClick={() => window.open('https://www.google.com/maps/place/Escapenfly/@30.6593189,76.7304745,17z/data=!4m6!3m5!1s0x390fe9e57a8ebcc3:0x6c755ac036d38fcc!8m2!3d30.6593143!4d76.7330494!16s%2Fg%2F11ts3tk59v', '_blank')}>
                                    <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300">Office Address</h4>
                                    <p className="text-gray-400 mt-1 hover:text-teal-700 cursor-pointer">
                                        Plot No.75 , 2nd Floor, Sector 82, <br />Sahibzada Ajit Singh Nagar, Punjab, India, 140308
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0 mt-1">
                                    <Mail size={24} className="text-teal-600 dark:text-teal-400" />
                                </div>
                                <div className="ml-4">
                                    <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300">Email Us</h4>
                                    <p className="text-gray-400 mt-1 hover:text-teal-700 cursor-pointer" onClick={() => window.open('mailto:enf@escapenfly.com', '_self')}>
                                        enf@escapenfly.com <br />
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0 mt-1">
                                    <Phone size={24} className="text-teal-600 dark:text-teal-400" />
                                </div>
                                <div className="ml-4">
                                    <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300">Call Us</h4>
                                    <p className="text-gray-400 mt-1 hover:text-teal-700 cursor-pointer" onClick={() => window.open('tel:+919851739851', '_self')}>
                                        +91-9851-73-9851 <br />
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Map */}
                        <div className="mt-8 h-48 bg-gray-50 dark:bg-gray-700 rounded-md overflow-hidden">
                            <img
                                src="https://images.pexels.com/photos/2901215/pexels-photo-2901215.jpeg?auto=compress&cs=tinysrgb&w=600"
                                alt="Map location"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-3 bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-md">
                        <h3 className="text-2xl font-bold text-teal-600 dark:text-teal-400 mb-6">Send us a Message</h3>
                        {alert && (
                            <Alert
                                type={alert.type}
                                message={alert.message}
                                duration={10000}
                                onClose={() => setAlert(null)}
                            />
                        )}
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-teal-400 focus:border-teal-400 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Your Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-teal-400 focus:border-teal-400 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div className="mb-6">
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Whatsapp Number
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-teal-400 focus:border-teal-400 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                                    placeholder="+91 123 4567 890"
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Your Message
                                </label>
                                <textarea
                                    id="message"
                                    name="query"
                                    value={formData.query}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full px-4 py-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-teal-400 focus:border-teal-400 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                                    placeholder="Tell us what you're looking for..."
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-teal-400 hover:bg-teal-500 text-gray-900 font-medium rounded-md px-6 py-3 transition-colors flex items-center justify-center"
                                onClick={handleSubmit}
                            >
                                <Send size={18} className="mr-2" />
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact; 