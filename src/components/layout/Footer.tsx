import React from 'react';
import { Instagram, Facebook, Mail, Linkedin, MapPin, Phone } from 'lucide-react';
import { companyName } from '../../data/constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 dark:bg-gray-950">
      <div className="container mx-auto px-4 pt-12 pb-8">

        <div className="border-b border-gray-800 pb-4 mb-12 ">
          {/* Newsletter */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">Newsletter</h4>
              <p className="mb-4 text-gray-400">
                Subscribe to get special offers and travel inspiration.
              </p>
            </div>
            <div>
              <form className="flex max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-2 w-full rounded-l-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-800 dark:text-white"
                />
                <button className="bg-teal-600 text-white px-4 py-2 rounded-r-md hover:bg-teal-700 transition-colors">
                  Join
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">{companyName}</h3>
            <p className="mb-4 text-gray-400">
              Discover the world with our expertly curated travel experiences.
              Where your journey becomes an unforgettable story.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">Home</a>
              </li>
              <li>
                <a href="#destinations" className="text-gray-400 hover:text-teal-500 transition-colors">Destinations</a>
              </li>
              <li>
                <a href="#experiences" className="text-gray-400 hover:text-teal-500 transition-colors">Experiences</a>
              </li>
              <li>
                <a href="#plan-trip" className="text-gray-400 hover:text-teal-500 transition-colors">Plan Trip</a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-teal-500 transition-colors">About Us</a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">About Us</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">Terms of Use</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">Refund Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">Feedback</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Contact Info
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="text-blue-400 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-300">Plot No.75 , 2nd Floor, Sector 82, Sahibzada Ajit Singh Nagar, Punjab 140308</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="text-blue-400 mr-3 flex-shrink-0" />
                <span className="text-gray-300">+91-9851-73-9851</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="text-blue-400 mr-3 flex-shrink-0" />
                <span className="text-gray-300">enf@escapenfly.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center text-gray-500">
          <p>© {new Date().getFullYear()} {companyName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;